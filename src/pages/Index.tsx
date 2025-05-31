
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';

const Index = () => {
  const { config, pageContent, loading } = useWebsiteContent();

  useEffect(() => {
    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.opacity-0').forEach(elem => {
      observer.observe(elem);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Apply dynamic CSS custom properties when config changes
  useEffect(() => {
    if (config?.theme_colors) {
      const root = document.documentElement;
      const colors = config.theme_colors;
      
      root.style.setProperty('--divine-purple', colors.primary);
      root.style.setProperty('--divine-purple-light', colors.primaryLight);
      root.style.setProperty('--divine-purple-dark', colors.primaryDark);
      root.style.setProperty('--divine-gold', colors.accent);
      root.style.setProperty('--divine-gold-light', colors.accentLight);
      root.style.setProperty('--divine-cream', colors.background);
    }
  }, [config]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-divine-purple mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <Hero content={pageContent?.home?.hero} config={config} />
      <About content={pageContent?.home?.about_preview} config={config} />
      <Services content={pageContent?.home?.services} />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
