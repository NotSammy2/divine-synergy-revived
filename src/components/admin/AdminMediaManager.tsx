
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Image } from 'lucide-react';

const AdminMediaManager = () => {
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [usageContext, setUsageContext] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMediaAssets();
  }, []);

  const fetchMediaAssets = async () => {
    const { data } = await supabase
      .from('media_assets')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (data) {
      setMediaAssets(data);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('website-media')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      await supabase
        .from('media_assets')
        .insert({
          file_name: selectedFile.name,
          file_path: filePath,
          file_type: selectedFile.type,
          alt_text: altText,
          usage_context: usageContext
        });

      toast({
        title: "File Uploaded",
        description: "Media file has been uploaded successfully.",
      });

      // Reset form
      setSelectedFile(null);
      setAltText('');
      setUsageContext('');
      fetchMediaAssets();
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message,
        variant: "destructive"
      });
    }
    
    setUploading(false);
  };

  const handleDelete = async (asset: any) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('website-media')
        .remove([asset.file_path]);

      // Delete from database
      await supabase
        .from('media_assets')
        .delete()
        .eq('id', asset.id);

      toast({
        title: "File Deleted",
        description: "Media file has been deleted successfully.",
      });

      fetchMediaAssets();
    } catch (error: any) {
      toast({
        title: "Delete Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('website-media')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
          
          <div>
            <Label htmlFor="altText">Alt Text</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image"
            />
          </div>
          
          <div>
            <Label htmlFor="usageContext">Usage Context</Label>
            <Input
              id="usageContext"
              value={usageContext}
              onChange={(e) => setUsageContext(e.target.value)}
              placeholder="e.g., hero, about, services"
            />
          </div>
          
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full bg-divine-purple hover:bg-divine-purple-dark"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="border rounded-lg overflow-hidden">
                {asset.file_type.startsWith('image/') ? (
                  <img
                    src={getImageUrl(asset.file_path)}
                    alt={asset.alt_text}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{asset.file_name}</p>
                  <p className="text-xs text-gray-500 truncate">{asset.usage_context}</p>
                  <Button
                    onClick={() => handleDelete(asset)}
                    variant="destructive"
                    size="sm"
                    className="w-full mt-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMediaManager;
