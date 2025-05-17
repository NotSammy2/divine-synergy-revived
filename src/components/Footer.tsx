
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-divine-purple text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-4">
              <span className="text-divine-gold">Divine</span> Synergy
            </h2>
            <p className="mb-6 max-w-md">
              Guiding seekers on the path to spiritual awakening and self-realization through divine wisdom and sacred practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-colors">
                <span>FB</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-colors">
                <span>IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-colors">
                <span>YT</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-divine-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-divine-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-divine-gold transition-colors">Our Services</a></li>
              <li><a href="#testimonials" className="hover:text-divine-gold transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-divine-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>123 Spiritual Way, Serenity Valley</li>
              <li>connect@divinesynergy.com</li>
              <li>(555) 123-4567</li>
            </ul>
            
            <div className="mt-6">
              <a href="#contact" className="px-6 py-2 bg-divine-gold text-white rounded-full hover:bg-opacity-90 transition-colors">
                Connect Now
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {currentYear} Divine Synergy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
