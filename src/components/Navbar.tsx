import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={cn(
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">
            <span className="divine-gradient-text">Synergy</span> The Divine Clinic
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-divine-purple-dark hover:text-divine-purple transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/appointment" className="divine-button-primary flex items-center gap-2">
            <Calendar size={18} />
            Book Appointment
          </Link>
          <Link to="/admin" className="text-divine-purple-dark hover:text-divine-purple transition-colors">
            <Settings size={20} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-divine-purple-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-5 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-divine-purple-dark hover:text-divine-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/appointment" 
              className="divine-button-primary text-center flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={18} />
              Book Appointment
            </Link>
            <Link 
              to="/admin"
              className="text-divine-purple-dark hover:text-divine-purple transition-colors font-medium py-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings size={18} />
              Manage Website
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;