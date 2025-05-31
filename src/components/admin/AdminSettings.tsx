
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('website_config')
      .select('*')
      .eq('config_key', 'site_settings')
      .single();

    if (data) {
      setSettings(data.config_value);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await supabase
        .from('website_config')
        .upsert({
          config_key: 'site_settings',
          config_value: settings
        });

      toast({
        title: "Settings Updated",
        description: "Site settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            placeholder="Synergy - The Divine Clinic"
          />
        </div>
        
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={settings.tagline}
            onChange={(e) => setSettings({...settings, tagline: e.target.value})}
            placeholder="Modern Homeopathic Excellence"
          />
        </div>
        
        <div>
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
            placeholder="info@synergydivineclinic.com"
          />
        </div>
        
        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={settings.contactPhone}
            onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
            placeholder="+91-XXXXXXXXXX"
          />
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-divine-purple hover:bg-divine-purple-dark"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
