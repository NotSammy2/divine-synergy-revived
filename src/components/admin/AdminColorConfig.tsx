
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';

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

  // Apply colors to CSS variables whenever colors change
  useEffect(() => {
    applyColorsToCSSVariables();
  }, [colors]);

  const applyColorsToCSSVariables = () => {
    const root = document.documentElement;
    root.style.setProperty('--divine-purple', colors.primary);
    root.style.setProperty('--divine-purple-light', colors.primaryLight);
    root.style.setProperty('--divine-purple-dark', colors.primaryDark);
    root.style.setProperty('--divine-gold', colors.accent);
    root.style.setProperty('--divine-gold-light', colors.accentLight);
    root.style.setProperty('--divine-cream', colors.background);
    
    // Also update Tailwind CSS custom properties
    root.style.setProperty('--color-divine-purple', colors.primary);
    root.style.setProperty('--color-divine-purple-light', colors.primaryLight);
    root.style.setProperty('--color-divine-purple-dark', colors.primaryDark);
    root.style.setProperty('--color-divine-gold', colors.accent);
    root.style.setProperty('--color-divine-gold-light', colors.accentLight);
    root.style.setProperty('--color-divine-cream', colors.background);
  };

  const fetchCurrentConfig = async () => {
    const { data } = await supabase
      .from('website_config')
      .select('*')
      .in('config_key', ['theme_colors', 'typography']);

    if (data) {
      data.forEach(item => {
        if (item.config_key === 'theme_colors' && item.config_value) {
          try {
            const colorData = item.config_value as Record<string, any>;
            if (colorData && typeof colorData === 'object' && !Array.isArray(colorData)) {
              setColors(prev => ({ ...prev, ...colorData }));
            }
          } catch (error) {
            console.error('Error parsing theme colors:', error);
          }
        }
        if (item.config_key === 'typography' && item.config_value) {
          try {
            const typographyData = item.config_value as Record<string, any>;
            if (typographyData && typeof typographyData === 'object' && !Array.isArray(typographyData)) {
              setFonts({
                headingFont: typographyData.headingFont || 'Playfair Display',
                bodyFont: typographyData.bodyFont || 'Poppins'
              });
            }
          } catch (error) {
            console.error('Error parsing typography:', error);
          }
        }
      });
    }
  };

  const handleColorChange = (colorKey: keyof ColorConfig, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Save colors
      const { error: colorError } = await supabase
        .from('website_config')
        .upsert({
          config_key: 'theme_colors',
          config_value: colors as any
        });

      if (colorError) throw colorError;

      // Save typography
      const { error: typographyError } = await supabase
        .from('website_config')
        .upsert({
          config_key: 'typography',
          config_value: {
            headingFont: fonts.headingFont,
            bodyFont: fonts.bodyFont,
            headingSize: 'text-4xl',
            bodySize: 'text-base'
          } as any
        });

      if (typographyError) throw typographyError;

      // Apply colors immediately
      applyColorsToCSSVariables();

      toast({
        title: "Settings Saved",
        description: "Color scheme and typography have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const resetToDefaults = () => {
    const defaultColors = {
      primary: '#8B5A6B',
      primaryLight: '#C4A5B0',
      primaryDark: '#6E4C57',
      accent: '#B8860B',
      accentLight: '#DDD1A0',
      background: '#F5F2E8'
    };
    setColors(defaultColors);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Color Scheme</CardTitle>
            <Button
              onClick={resetToDefaults}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="primary">Primary Color (Divine Purple)</Label>
              <div className="flex gap-2">
                <Input
                  id="primary"
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  placeholder="#8B5A6B"
                  className="font-mono"
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
                  onChange={(e) => handleColorChange('primaryLight', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.primaryLight}
                  onChange={(e) => handleColorChange('primaryLight', e.target.value)}
                  placeholder="#C4A5B0"
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="primaryDark">Primary Dark</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryDark"
                  type="color"
                  value={colors.primaryDark}
                  onChange={(e) => handleColorChange('primaryDark', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.primaryDark}
                  onChange={(e) => handleColorChange('primaryDark', e.target.value)}
                  placeholder="#6E4C57"
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent">Accent Color (Divine Gold)</Label>
              <div className="flex gap-2">
                <Input
                  id="accent"
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  placeholder="#B8860B"
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accentLight">Accent Light</Label>
              <div className="flex gap-2">
                <Input
                  id="accentLight"
                  type="color"
                  value={colors.accentLight}
                  onChange={(e) => handleColorChange('accentLight', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.accentLight}
                  onChange={(e) => handleColorChange('accentLight', e.target.value)}
                  placeholder="#DDD1A0"
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="background">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  placeholder="#F5F2E8"
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-6 p-4 rounded-lg border-2" style={{ backgroundColor: colors.background }}>
            <h3 className="font-serif text-lg mb-2" style={{ color: colors.primary }}>
              Preview
            </h3>
            <p className="text-sm mb-3" style={{ color: colors.primaryDark }}>
              This is how your colors will look on the website.
            </p>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 rounded text-white text-sm"
                style={{ backgroundColor: colors.primary }}
              >
                Primary Button
              </button>
              <button 
                className="px-3 py-1 rounded text-white text-sm"
                style={{ backgroundColor: colors.accent }}
              >
                Accent Button
              </button>
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

          {/* Typography Preview */}
          <div className="mt-6 p-4 rounded-lg border-2" style={{ backgroundColor: colors.background }}>
            <h3 
              className="text-2xl mb-2"
              style={{ 
                fontFamily: fonts.headingFont,
                color: colors.primary 
              }}
            >
              Heading Example
            </h3>
            <p 
              style={{ 
                fontFamily: fonts.bodyFont,
                color: colors.primaryDark 
              }}
            >
              This is body text using your selected fonts. It will be used for paragraphs and general content throughout the website.
            </p>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-divine-purple hover:bg-divine-purple-dark"
            >
              {loading ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminColorConfig;
