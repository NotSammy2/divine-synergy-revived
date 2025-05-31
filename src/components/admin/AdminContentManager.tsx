
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminContentManager = () => {
  const [pageContent, setPageContent] = useState<any>({});
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedSection, setSelectedSection] = useState('');
  const [editingContent, setEditingContent] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const pages = ['home', 'about', 'services', 'contact'];

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    const { data } = await supabase
      .from('page_content')
      .select('*')
      .order('page_name, section_name');

    if (data) {
      const contentObj: any = {};
      data.forEach(item => {
        if (!contentObj[item.page_name]) {
          contentObj[item.page_name] = {};
        }
        const contentValue = typeof item.content_value === 'object' ? item.content_value : {};
        contentObj[item.page_name][item.section_name] = {
          ...(contentValue || {}),
          id: item.id,
          content_type: item.content_type
        };
      });
      setPageContent(contentObj);
    }
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    const content = pageContent[selectedPage]?.[section];
    if (content && typeof content === 'object') {
      setEditingContent({ ...content });
    } else {
      setEditingContent({});
    }
  };

  const handleSave = async () => {
    if (!selectedSection) return;
    
    setLoading(true);
    
    try {
      const { id, content_type, ...contentData } = editingContent;
      
      await supabase
        .from('page_content')
        .upsert({
          page_name: selectedPage,
          section_name: selectedSection,
          content_type: content_type || 'json',
          content_value: contentData,
          is_active: true
        });

      toast({
        title: "Content Updated",
        description: "Page content has been saved successfully.",
      });
      
      fetchPageContent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const renderContentEditor = () => {
    if (!selectedSection) {
      return <p className="text-gray-500">Select a section to edit content</p>;
    }

    const content = editingContent || {};
    
    return (
      <div className="space-y-4">
        {Object.keys(content).filter(key => !['id', 'content_type'].includes(key)).map((key) => (
          <div key={key}>
            <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
            {key.includes('description') || key.includes('story') || key.includes('content') ? (
              <Textarea
                id={key}
                value={content[key] || ''}
                onChange={(e) => setEditingContent({...content, [key]: e.target.value})}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id={key}
                value={content[key] || ''}
                onChange={(e) => setEditingContent({...content, [key]: e.target.value})}
              />
            )}
          </div>
        ))}
        
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-divine-purple hover:bg-divine-purple-dark"
        >
          {loading ? 'Saving...' : 'Save Content'}
        </Button>
      </div>
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Select Page & Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Page</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map(page => (
                  <SelectItem key={page} value={page} className="capitalize">
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Section</Label>
            <div className="space-y-2">
              {pageContent[selectedPage] ? Object.keys(pageContent[selectedPage]).map(section => (
                <Button
                  key={section}
                  variant={selectedSection === section ? "default" : "outline"}
                  onClick={() => handleSectionSelect(section)}
                  className="w-full justify-start"
                  size="sm"
                >
                  {section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              )) : (
                <p className="text-sm text-gray-500">No sections available</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Edit Content</CardTitle>
        </CardHeader>
        <CardContent>
          {renderContentEditor()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManager;
