
import React from 'react';
import { Link } from 'react-router-dom';

const serviceItems = [
  {
    title: "Homeopathic Consultation",
    description: "Comprehensive assessment and individualized homeopathic remedies tailored to your unique health profile",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Chronic Disease Management",
    description: "Long-term holistic care for chronic conditions, focusing on improving quality of life and reducing dependence on conventional medications",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Pediatric Homeopathy",
    description: "Gentle, effective treatments for children's health issues without the side effects of conventional medicine",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Women's Health",
    description: "Specialized care for women's health concerns including hormonal imbalances, reproductive health, and pregnancy support",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Lifestyle Counseling",
    description: "Guidance on nutrition, exercise, stress management, and other lifestyle factors that impact your overall health and wellbeing",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Preventative Care",
    description: "Strengthening your body's natural defenses and maintaining optimal health to prevent future illnesses",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-divine-cream/50 to-white">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Our Services</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Discover our range of homeopathic treatments and holistic healing approaches
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {serviceItems.map((service, index) => (
            <div 
              key={service.title} 
              className="divine-card opacity-0 animate-fade-in hover:translate-y-[-5px]"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
                <span className={`${service.iconColor} text-2xl`}>{service.icon}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">{service.title}</h3>
              <p className="text-divine-purple-dark">{service.description}</p>
              <Link to="/services" className="inline-block mt-4 text-divine-purple font-medium hover:text-divine-gold transition-colors">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-in delay-500">
          <Link to="/appointment" className="divine-button-primary inline-block">
            Schedule Your Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
