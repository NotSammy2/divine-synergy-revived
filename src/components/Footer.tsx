
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleWhatsAppConnect = () => {
    window.open('https://wa.me/918318494972', '_blank');
  };
  
  return (
    <footer className="py-12 bg-divine-purple text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-4 hover:scale-105 transition-transform duration-300">
              <span className="text-divine-gold">Synergy</span> The Divine
            </h2>
            <p className="mb-6 max-w-md">
              Modern homeopathic treatments combining scientific evidence with natural healing principles for optimal patient outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-all duration-300 hover:scale-110">
                <span>FB</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-all duration-300 hover:scale-110">
                <span>IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-divine-gold transition-all duration-300 hover:scale-110">
                <span>YT</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-divine-gold transition-colors duration-200">Home</a></li>
              <li><a href="/about" className="hover:text-divine-gold transition-colors duration-200">About Us</a></li>
              <li><a href="/services" className="hover:text-divine-gold transition-colors duration-200">Our Services</a></li>
              <li><a href="/#testimonials" className="hover:text-divine-gold transition-colors duration-200">Testimonials</a></li>
              <li><a href="/contact" className="hover:text-divine-gold transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Shop no. 1, Swastik Magnolia Apartment</li>
              <li>Kamla Nehru Rd, Old Katra</li>
              <li>Prayagraj, UP 211002</li>
              <li className="pt-2">drsusmit@synergythedivine.com</li>
              <li>+91 8318494972</li>
            </ul>
            
            <div className="mt-6">
              <button 
                onClick={handleWhatsAppConnect}
                className="px-6 py-2 bg-divine-gold text-white rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {currentYear} Synergy The Divine Multispecialty Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
