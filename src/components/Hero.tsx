import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface HeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
  };
  config?: any;
}

const Hero: React.FC<HeroProps> = ({ content, config }) => {
  const title = content?.title || "Modern";
  const subtitle = content?.subtitle || "Homeopathic Medicine";
  const description = content?.description || "Experience evidence-based homeopathic treatment with Dr. Susmit Kesawarni at Synergy - The Divine Multispecialty Clinic in Prayagraj";
  const buttonText = content?.buttonText || "Book An Appointment";

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-gradient-to-b from-divine-purple-light/20 to-white pt-20"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-divine-gold/10 top-32 right-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-divine-purple/10 bottom-10 -left-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-40 h-40 rounded-full bg-divine-gold/20 top-1/2 left-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="divine-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 opacity-0 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 hover:scale-105 transition-transform duration-300">
              {title} <span className="divine-gradient-text">{subtitle}</span>
            </h1>
            <p className="text-xl md:text-2xl text-divine-purple-dark mb-8 max-w-lg">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment" className="divine-button-primary text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200">
                <Calendar size={18} />
                {buttonText}
              </Link>
              <Link to="/about" className="divine-button-outline text-center hover:scale-105 transition-transform duration-200">
                Learn More About Us
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center opacity-0 animate-fade-in delay-200">
            <div className="relative hover:scale-105 transition-transform duration-500">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-divine opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1651008376799-c6e1c9f6c2d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt="Modern homeopathic medicine" 
                className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover border-4 border-white shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
