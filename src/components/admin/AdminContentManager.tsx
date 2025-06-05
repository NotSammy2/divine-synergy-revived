import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminContentManager = () => {
  const [pageContent, setPageContent] = useState<any>({});
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedSection, setSelectedSection] = useState('');
  const [editingContent, setEditingContent] = useState<any>({});
  const [newSectionName, setNewSectionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useAuth();

  const pages = ['home', 'about', 'services', 'contact'];

  const defaultSections = {
    home: ['hero', 'about_preview', 'services_preview'],
    about: ['story', 'team', 'mission'],
    services: ['overview', 'treatments', 'approach'],
    contact: ['info', 'location', 'hours']
  };

  useEffect(() => {
    if (session) {
      fetchPageContent();
    }
  }, [session]);

  const fetchPageContent = async () => {
    setFetchLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_name, section_name');

      if (error) {
        console.error('Error fetching content:', error);
        toast({
          title: "Error",
          description: "Failed to load page content.",
          variant: "destructive"
        });
        return;
      }

      const contentObj: any = {};
      
      // Initialize with default sections
      pages.forEach(page => {
        contentObj[page] = {};
        defaultSections[page as keyof typeof defaultSections]?.forEach(section => {
          contentObj[page][section] = {
            title: '',
            description: '',
            content_type: 'json'
          };
        });
      });

      // Override with existing data
      if (data) {
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
      }
      
      setPageContent(contentObj);
      
      // Auto-select first section if none selected
      if (!selectedSection && contentObj[selectedPage]) {
        const firstSection = Object.keys(contentObj[selectedPage])[0];
        if (firstSection) {
          handleSectionSelect(firstSection);
        }
      }
    } catch (error) {
      console.error('Error in fetchPageContent:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading content.",
        variant: "destructive"
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    const content = pageContent[selectedPage]?.[section];
    if (content && typeof content === 'object') {
      setEditingContent({ ...content });
    } else {
      setEditingContent({
        title: '',
        description: '',
        buttonText: '',
        content_type: 'json'
      });
    }
  };

  const handleCreateSection = async () => {
    if (!newSectionName.trim()) return;
    
    const newContent = {
      title: '',
      description: '',
      buttonText: ''
    };
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('page_content')
        .insert({
          page_name: selectedPage,
          section_name: newSectionName,
          content_type: 'json',
          content_value: newContent,
          is_active: true,
          created_by: session?.user?.id
        });

      if (error) {
        console.error('Error creating section:', error);
        toast({
          title: "Error",
          description: "Failed to create section. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Section Created",
        description: `New section "${newSectionName}" has been created.`,
      });
      
      setNewSectionName('');
      fetchPageContent();
    } catch (error) {
      console.error('Error in handleCreateSection:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleSave = async () => {
    if (!selectedSection) return;
    
    setLoading(true);
    
    try {
      const { id, content_type, ...contentData } = editingContent;
      
      const { error } = await supabase
        .from('page_content')
        .upsert({
          page_name: selectedPage,
          section_name: selectedSection,
          content_type: content_type || 'json',
          content_value: contentData,
          is_active: true,
          created_by: session?.user?.id
        });

      if (error) {
        console.error('Error saving content:', error);
        toast({
          title: "Error",
          description: "Failed to update content. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Content Updated",
        description: "Page content has been saved successfully.",
      });
      
      fetchPageContent();
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Please sign in to access content management.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (fetchLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading content...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderContentEditor = () => {
    if (!selectedSection) {
      return <p className="text-gray-500">Select a section to edit content</p>;
    }

    const content = editingContent || {};
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => setEditingContent({...content, title: e.target.value})}
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => setEditingContent({...content, description: e.target.value})}
            className="min-h-[100px]"
            placeholder="Enter section description"
          />
        </div>

        {(selectedSection.includes('hero') || selectedSection.includes('button')) && (
          <div>
            <Label htmlFor="buttonText">Button Text</Label>
            <Input
              id="buttonText"
              value={content.buttonText || ''}
              onChange={(e) => setEditingContent({...content, buttonText: e.target.value})}
              placeholder="Enter button text"
            />
          </div>
        )}

        {selectedSection.includes('about') && (
          <>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={content.experience || ''}
                onChange={(e) => setEditingContent({...content, experience: e.target.value})}
                placeholder="e.g., 19+ Years"
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={content.qualification || ''}
                onChange={(e) => setEditingContent({...content, qualification: e.target.value})}
                placeholder="e.g., BHMS"
              />
            </div>
          </>
        )}
        
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-divine-purple hover:bg-divine-purple-dark"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Content'
          )}
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
            <Select value={selectedPage} onValueChange={(value) => {
              setSelectedPage(value);
              setSelectedSection('');
              setEditingContent({});
            }}>
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
            <Label>Sections</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pageContent[selectedPage] ? Object.keys(pageContent[selectedPage]).map(section => (
                <Button
                  key={section}
                  variant={selectedSection === section ? "default" : "outline"}
                  onClick={() => handleSectionSelect(section)}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  {section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              )) : (
                <p className="text-sm text-gray-500">Loading sections...</p>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <Label>Create New Section</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Section name"
                  className="text-sm"
                />
                <Button
                  onClick={handleCreateSection}
                  disabled={!newSectionName.trim() || loading}
                  size="sm"
                  className="shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus size={16} />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            Edit Content {selectedSection && `- ${selectedSection.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderContentEditor()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManager;
