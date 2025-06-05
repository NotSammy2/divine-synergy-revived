
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    tagline: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      fetchSettings();
    }
  }, [session]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_config')
        .select('*')
        .eq('config_key', 'site_settings')
        .maybeSingle();

      if (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: "Error",
          description: "Failed to load settings.",
          variant: "destructive"
        });
        return;
      }

      if (data && data.config_value && typeof data.config_value === 'object' && !Array.isArray(data.config_value)) {
        const settingsData = data.config_value as Record<string, any>;
        if (settingsData.siteName && settingsData.tagline && settingsData.contactEmail && settingsData.contactPhone) {
          setSettings(settingsData as SiteSettings);
        }
      }
    } catch (error) {
      console.error('Error in fetchSettings:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading settings.",
        variant: "destructive"
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('website_config')
        .upsert({
          config_key: 'site_settings',
          config_value: settings as any,
          created_by: session?.user?.id
        });

      if (error) {
        console.error('Error saving settings:', error);
        toast({
          title: "Error",
          description: "Failed to update settings. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Settings Updated",
        description: "Site settings have been saved successfully.",
      });
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
            Please sign in to access site settings.
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
            <span className="ml-2">Loading settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings (Testing Mode)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            placeholder="Divine Homeopathy"
          />
        </div>
        
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={settings.tagline}
            onChange={(e) => setSettings({...settings, tagline: e.target.value})}
            placeholder="Holistic Healing Solutions"
          />
        </div>
        
        <div>
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
            placeholder="info@divinehomeopathy.com"
          />
        </div>
        
        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={settings.contactPhone}
            onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
            placeholder="+1-234-567-8900"
          />
        </div>
        
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
            'Save Settings'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
