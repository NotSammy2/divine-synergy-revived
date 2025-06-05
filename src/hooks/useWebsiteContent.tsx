
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
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('website_config')
        .select('*');
      
      if (error) {
        console.error('Error fetching config:', error);
        setError(error.message);
        return;
      }
      
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
    } catch (error) {
      console.error('Error in fetchConfig:', error);
      setError('Failed to fetch configuration');
    }
  };

  const fetchPageContent = async (pageName?: string) => {
    try {
      let query = supabase
        .from('page_content')
        .select('*')
        .eq('is_active', true);
      
      if (pageName) {
        query = query.eq('page_name', pageName);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching page content:', error);
        setError(error.message);
        return;
      }
      
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
    } catch (error) {
      console.error('Error in fetchPageContent:', error);
      setError('Failed to fetch page content');
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        setError(null);
        await Promise.all([fetchConfig(), fetchPageContent()]);
      } catch (error) {
        console.error('Error loading website content:', error);
        setError('Failed to load website content');
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchConfig(), fetchPageContent()]);
    } catch (error) {
      console.error('Error refetching content:', error);
      setError('Failed to refresh content');
    } finally {
      setLoading(false);
    }
  };

  return {
    config,
    pageContent,
    loading,
    error,
    refetch
  };
};
