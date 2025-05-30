
import React from 'react';
import { Link } from 'react-router-dom';

const serviceItems = [
  {
    title: "Clinical Homeopathy",
    description: "Comprehensive assessment and individualized homeopathic remedies based on modern diagnostic methods",
    icon: "⚕",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Chronic Disease Management",
    description: "Evidence-based homeopathic treatment for chronic conditions with regular monitoring and assessment",
    icon: "🔬",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Pediatric Homeopathy",
    description: "Safe, gentle homeopathic treatments for children's health issues with proven efficacy",
    icon: "👶",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Women's Health",
    description: "Specialized homeopathic care for women's health concerns including hormonal balance and reproductive health",
    icon: "🌸",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Lifestyle Medicine",
    description: "Integrated approach combining homeopathy with nutrition, exercise, and stress management guidance",
    icon: "💊",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Preventive Healthcare",
    description: "Proactive homeopathic treatments to strengthen immunity and prevent illness naturally",
    icon: "🛡",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-divine-cream/50 to-white">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Our Services</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Discover our range of modern homeopathic treatments and evidence-based healing approaches
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {serviceItems.map((service, index) => (
            <div 
              key={service.title} 
              className="divine-card opacity-0 animate-fade-in hover:translate-y-[-10px] hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-200`}>
                <span className={`${service.iconColor} text-2xl`}>{service.icon}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple hover:text-divine-gold transition-colors duration-200">{service.title}</h3>
              <p className="text-divine-purple-dark">{service.description}</p>
              <Link to="/services" className="inline-block mt-4 text-divine-purple font-medium hover:text-divine-gold transition-colors duration-200">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-in delay-500">
          <Link to="/appointment" className="divine-button-primary inline-block hover:scale-105 transition-transform duration-200">
            Schedule Your Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
