
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Image, AlertCircle } from 'lucide-react';

const AdminMediaManager = () => {
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [usageContext, setUsageContext] = useState('');
  const [bucketExists, setBucketExists] = useState(false);
  const [checkingBucket, setCheckingBucket] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAndCreateBucket();
  }, []);

  const checkAndCreateBucket = async () => {
    setCheckingBucket(true);
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucket = buckets?.find(b => b.name === 'website-media');
      
      if (bucket) {
        setBucketExists(true);
        fetchMediaAssets();
      } else {
        setBucketExists(false);
      }
    } catch (error) {
      console.error('Error checking bucket:', error);
      setBucketExists(false);
    }
    setCheckingBucket(false);
  };

  const createBucket = async () => {
    try {
      const { error } = await supabase.storage.createBucket('website-media', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/*']
      });

      if (error) {
        throw error;
      }

      setBucketExists(true);
      toast({
        title: "Storage Setup Complete",
        description: "Media storage has been configured successfully.",
      });
      
      fetchMediaAssets();
    } catch (error: any) {
      toast({
        title: "Setup Error",
        description: error.message || "Failed to setup media storage.",
        variant: "destructive"
      });
    }
  };

  const fetchMediaAssets = async () => {
    if (!bucketExists) return;
    
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10485760) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !bucketExists) return;

    setUploading(true);
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('website-media')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('media_assets')
        .insert({
          file_name: selectedFile.name,
          file_path: filePath,
          file_type: selectedFile.type,
          alt_text: altText || selectedFile.name,
          usage_context: usageContext || 'general'
        });

      if (dbError) throw dbError;

      toast({
        title: "File Uploaded",
        description: "Media file has been uploaded successfully.",
      });

      // Reset form
      setSelectedFile(null);
      setAltText('');
      setUsageContext('');
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchMediaAssets();
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive"
      });
    }
    
    setUploading(false);
  };

  const handleDelete = async (asset: any) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('website-media')
        .remove([asset.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_assets')
        .delete()
        .eq('id', asset.id);

      if (dbError) throw dbError;

      toast({
        title: "File Deleted",
        description: "Media file has been deleted successfully.",
      });

      fetchMediaAssets();
    } catch (error: any) {
      toast({
        title: "Delete Error",
        description: error.message || "Failed to delete file.",
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

  if (checkingBucket) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-divine-purple mx-auto mb-4"></div>
          <p>Setting up media storage...</p>
        </div>
      </div>
    );
  }

  if (!bucketExists) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Media Storage Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-6">
            Media storage needs to be configured before you can upload files.
          </p>
          <Button 
            onClick={createBucket}
            className="bg-divine-purple hover:bg-divine-purple-dark"
          >
            Setup Media Storage
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file">Select Image File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="altText">Alt Text (for accessibility)</Label>
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
              placeholder="e.g., hero, about, services, testimonials"
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
          <CardTitle>Media Library ({mediaAssets.length} files)</CardTitle>
        </CardHeader>
        <CardContent>
          {mediaAssets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No media files uploaded yet.</p>
              <p className="text-sm">Upload your first image above to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaAssets.map((asset) => (
                <div key={asset.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={getImageUrl(asset.file_path)}
                      alt={asset.alt_text}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate" title={asset.file_name}>
                      {asset.file_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate" title={asset.usage_context}>
                      {asset.usage_context || 'No context'}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => navigator.clipboard.writeText(getImageUrl(asset.file_path))}
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        Copy URL
                      </Button>
                      <Button
                        onClick={() => handleDelete(asset)}
                        variant="destructive"
                        size="sm"
                        className="px-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMediaManager;
