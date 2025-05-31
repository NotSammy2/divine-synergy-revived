
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
        configObj[item.config_key] = item.config_value;
      });
      setConfig(configObj);
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
        contentObj[item.page_name][item.section_name] = item.content_value;
      });
      setPageContent(contentObj);
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      await Promise.all([fetchConfig(), fetchPageContent()]);
      setLoading(false);
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
