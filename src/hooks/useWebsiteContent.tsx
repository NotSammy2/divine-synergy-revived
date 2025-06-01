
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteConfig {
  theme_colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingSize: string;
    bodySize: string;
  };
  site_settings: {
    siteName: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
  };
}

interface PageContent {
  [key: string]: any;
}

export const useWebsiteContent = () => {
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    const { data } = await supabase
      .from('website_config')
      .select('*');
    
    if (data) {
      const configObj: any = {};
      data.forEach(item => {
        try {
          configObj[item.config_key] = item.config_value;
        } catch (error) {
          console.error('Error parsing config:', item.config_key, error);
        }
      });
      setConfig(configObj);
      
      // Apply theme colors to CSS variables
      if (configObj.theme_colors) {
        const colors = configObj.theme_colors;
        const root = document.documentElement;
        root.style.setProperty('--divine-purple', colors.primary || '#8B5A6B');
        root.style.setProperty('--divine-purple-light', colors.primaryLight || '#C4A5B0');
        root.style.setProperty('--divine-purple-dark', colors.primaryDark || '#6E4C57');
        root.style.setProperty('--divine-gold', colors.accent || '#B8860B');
        root.style.setProperty('--divine-gold-light', colors.accentLight || '#DDD1A0');
        root.style.setProperty('--divine-cream', colors.background || '#F5F2E8');
      }
    }
  };

  const fetchPageContent = async (pageName?: string) => {
    let query = supabase
      .from('page_content')
      .select('*')
      .eq('is_active', true);
    
    if (pageName) {
      query = query.eq('page_name', pageName);
    }
    
    const { data } = await query;
    
    if (data) {
      const contentObj: any = {};
      data.forEach(item => {
        if (!contentObj[item.page_name]) {
          contentObj[item.page_name] = {};
        }
        try {
          contentObj[item.page_name][item.section_name] = item.content_value;
        } catch (error) {
          console.error('Error parsing content:', item.page_name, item.section_name, error);
          contentObj[item.page_name][item.section_name] = {};
        }
      });
      setPageContent(contentObj);
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        await Promise.all([fetchConfig(), fetchPageContent()]);
      } catch (error) {
        console.error('Error loading website content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);

  return {
    config,
    pageContent,
    loading,
    refetch: () => Promise.all([fetchConfig(), fetchPageContent()])
  };
};
