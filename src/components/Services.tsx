
import React from 'react';

const serviceItems = [
  {
    title: "Energy Healing",
    description: "Restore balance and remove blockages through powerful energy work that harmonizes your subtle body systems",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Spiritual Coaching",
    description: "Receive personalized guidance to navigate your unique spiritual path and overcome obstacles with grace",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Meditation Journeys",
    description: "Experience guided meditations that elevate consciousness and connect you with higher dimensions of being",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Sacred Ceremonies",
    description: "Participate in transformative rituals that mark important transitions and invite divine presence",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  },
  {
    title: "Akashic Records",
    description: "Access your soul's library of information for profound healing and personal growth insights",
    icon: "✧",
    color: "bg-divine-purple-light",
    iconColor: "text-divine-purple"
  },
  {
    title: "Divine Integration",
    description: "Learn practical tools to integrate spiritual awakening into daily life and relationships",
    icon: "✦",
    color: "bg-divine-gold-light",
    iconColor: "text-divine-gold"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-divine-cream/50 to-white">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Divine Offerings</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Explore our transformative services designed to awaken your highest potential and bring harmony to your life
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
              <a href="#contact" className="inline-block mt-4 text-divine-purple font-medium hover:text-divine-gold transition-colors">
                Learn more →
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-in delay-500">
          <a href="#contact" className="divine-button-primary inline-block">
            Schedule Your Divine Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
