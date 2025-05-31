
import React from 'react';
import { Stethoscope, Heart, Leaf, Brain } from 'lucide-react';

interface ServicesProps {
  content?: any;
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  const services = [
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Comprehensive homeopathic treatment for common ailments and chronic conditions",
      features: ["Respiratory disorders", "Digestive issues", "Skin conditions"]
    },
    {
      icon: Heart,
      title: "Cardiovascular Health", 
      description: "Evidence-based homeopathic approach to heart health and circulation",
      features: ["Hypertension management", "Cholesterol regulation", "Heart wellness"]
    },
    {
      icon: Leaf,
      title: "Natural Wellness",
      description: "Holistic treatment focusing on body's natural healing mechanisms",
      features: ["Immunity boosting", "Stress management", "Lifestyle counseling"]
    },
    {
      icon: Brain,
      title: "Mental Health",
      description: "Gentle homeopathic support for emotional and psychological well-being",
      features: ["Anxiety relief", "Depression support", "Sleep disorders"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-divine-cream">
      <div className="divine-container">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 divine-gradient-text">
            Our Services
          </h2>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto">
            Experience the perfect blend of traditional homeopathic wisdom and modern medical understanding
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-divine rounded-full flex items-center justify-center mb-4 mx-auto hover:rotate-12 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-divine-purple-dark mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-divine-purple-dark flex items-center">
                    <span className="w-2 h-2 bg-divine-gold rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 opacity-0 animate-fade-in delay-500">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-serif font-bold text-divine-purple-dark mb-4">
              Why Choose Homeopathy?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-divine-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-divine-purple-dark mb-2">Safe & Natural</h4>
                <p className="text-sm text-gray-600">No harmful side effects, gentle on the body</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-divine-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-divine-purple-dark mb-2">Personalized</h4>
                <p className="text-sm text-gray-600">Treatment tailored to your unique constitution</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-divine-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-divine-purple-dark mb-2">Holistic</h4>
                <p className="text-sm text-gray-600">Treats the whole person, not just symptoms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
