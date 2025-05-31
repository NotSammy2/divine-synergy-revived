
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ColorConfig {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  background: string;
}

interface FontConfig {
  headingFont: string;
  bodyFont: string;
}

const AdminColorConfig = () => {
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#8B5A6B',
    primaryLight: '#C4A5B0',
    primaryDark: '#6E4C57',
    accent: '#B8860B',
    accentLight: '#DDD1A0',
    background: '#F5F2E8'
  });
  const [fonts, setFonts] = useState<FontConfig>({
    headingFont: 'Playfair Display',
    bodyFont: 'Poppins'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentConfig();
  }, []);

  const fetchCurrentConfig = async () => {
    const { data } = await supabase
      .from('website_config')
      .select('*')
      .in('config_key', ['theme_colors', 'typography']);

    if (data) {
      data.forEach(item => {
        if (item.config_key === 'theme_colors' && typeof item.config_value === 'object') {
          setColors(item.config_value as ColorConfig);
        }
        if (item.config_key === 'typography' && typeof item.config_value === 'object') {
          const typographyData = item.config_value as any;
          setFonts({
            headingFont: typographyData.headingFont || 'Playfair Display',
            bodyFont: typographyData.bodyFont || 'Poppins'
          });
        }
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Update colors
      await supabase
        .from('website_config')
        .upsert({
          config_key: 'theme_colors',
          config_value: colors
        });

      // Update typography
      await supabase
        .from('website_config')
        .upsert({
          config_key: 'typography',
          config_value: {
            headingFont: fonts.headingFont,
            bodyFont: fonts.bodyFont,
            headingSize: 'text-4xl',
            bodySize: 'text-base'
          }
        });

      toast({
        title: "Settings Updated",
        description: "Color scheme and typography have been saved successfully.",
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
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary"
                  type="color"
                  value={colors.primary}
                  onChange={(e) => setColors({...colors, primary: e.target.value})}
                  className="w-16 h-10"
                />
                <Input
                  value={colors.primary}
                  onChange={(e) => setColors({...colors, primary: e.target.value})}
                  placeholder="#8B5A6B"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="primaryLight">Primary Light</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryLight"
                  type="color"
                  value={colors.primaryLight}
                  onChange={(e) => setColors({...colors, primaryLight: e.target.value})}
                  className="w-16 h-10"
                />
                <Input
                  value={colors.primaryLight}
                  onChange={(e) => setColors({...colors, primaryLight: e.target.value})}
                  placeholder="#C4A5B0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent"
                  type="color"
                  value={colors.accent}
                  onChange={(e) => setColors({...colors, accent: e.target.value})}
                  className="w-16 h-10"
                />
                <Input
                  value={colors.accent}
                  onChange={(e) => setColors({...colors, accent: e.target.value})}
                  placeholder="#B8860B"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="background">Background</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={colors.background}
                  onChange={(e) => setColors({...colors, background: e.target.value})}
                  className="w-16 h-10"
                />
                <Input
                  value={colors.background}
                  onChange={(e) => setColors({...colors, background: e.target.value})}
                  placeholder="#F5F2E8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headingFont">Heading Font</Label>
            <Input
              id="headingFont"
              value={fonts.headingFont}
              onChange={(e) => setFonts({...fonts, headingFont: e.target.value})}
              placeholder="Playfair Display"
            />
          </div>
          
          <div>
            <Label htmlFor="bodyFont">Body Font</Label>
            <Input
              id="bodyFont"
              value={fonts.bodyFont}
              onChange={(e) => setFonts({...fonts, bodyFont: e.target.value})}
              placeholder="Poppins"
            />
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-divine-purple hover:bg-divine-purple-dark"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminColorConfig;
