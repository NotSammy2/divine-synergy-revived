
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
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

  const mainServices = [
    {
      id: 'homeopathic-consultation',
      title: 'Homeopathic Consultation',
      description: 'Our comprehensive homeopathic consultations involve a detailed assessment of your physical, mental, and emotional health. Dr. Kesawarni takes the time to understand your unique constitution and health concerns before prescribing individualized homeopathic remedies that stimulate your body\'s natural healing response.',
      image: 'https://images.unsplash.com/photo-1576671414121-aa0c81c869e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      details: [
        'Initial consultation (60-90 minutes)',
        'Detailed health history review',
        'Personalized remedy selection',
        'Treatment plan development',
        'Follow-up appointments to monitor progress'
      ]
    },
    {
      id: 'chronic-disease-management',
      title: 'Chronic Disease Management',
      description: 'For conditions that have persisted for months or years, our homeopathic approach offers gentle yet effective relief by addressing the underlying imbalances. We work with patients dealing with arthritis, asthma, allergies, skin conditions, digestive disorders, and many other chronic health issues.',
      image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      details: [
        'Long-term care planning',
        'Gradual reduction of dependency on conventional medications (in consultation with your primary physician)',
        'Management of symptoms and underlying causes',
        'Lifestyle modifications to support healing',
        'Regular follow-ups to adjust treatment as needed'
      ]
    },
    {
      id: 'pediatric-homeopathy',
      title: 'Pediatric Homeopathy',
      description: 'Children respond beautifully to homeopathic treatment. Our gentle approach is ideal for addressing common childhood ailments, developmental concerns, behavioral issues, and chronic conditions without the side effects often associated with conventional medications.',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      details: [
        'Child-friendly consultation process',
        'Treatment for acute conditions like colds, ear infections, and digestive issues',
        'Support for ADHD, anxiety, and other behavioral concerns',
        'Management of allergies and asthma',
        'Immune system strengthening'
      ]
    },
    {
      id: 'womens-health',
      title: 'Women\'s Health',
      description: 'Our specialized women\'s health services address the unique health concerns women face throughout their lives. From menstrual disorders to menopause, pregnancy support to hormonal imbalances, our homeopathic treatments offer natural relief and restored balance.',
      image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      details: [
        'Hormonal balancing',
        'Menstrual irregularities and PMS',
        'Fertility support',
        'Pregnancy and postpartum care',
        'Menopause symptom management'
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Lifestyle Counseling",
      description: "Guidance on nutrition, exercise, stress management, and other lifestyle factors that impact your overall health and wellbeing.",
      icon: "✧",
      color: "bg-divine-purple-light",
      iconColor: "text-divine-purple"
    },
    {
      title: "Preventative Care",
      description: "Strengthening your body's natural defenses and maintaining optimal health to prevent future illnesses.",
      icon: "✦",
      color: "bg-divine-gold-light",
      iconColor: "text-divine-gold"
    },
    {
      title: "Acute Care",
      description: "Fast-acting homeopathic remedies for sudden illnesses, injuries, and temporary health concerns.",
      icon: "✧",
      color: "bg-divine-purple-light",
      iconColor: "text-divine-purple"
    },
    {
      title: "Mental & Emotional Health",
      description: "Support for anxiety, depression, stress, and other emotional challenges through gentle homeopathic treatment.",
      icon: "✦",
      color: "bg-divine-gold-light",
      iconColor: "text-divine-gold"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-purple-light/20 to-white">
        <div className="divine-container">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-center opacity-0 animate-fade-in">
            Our <span className="divine-gradient-text">Services</span>
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            Comprehensive homeopathic care for the whole family, addressing a wide range of health concerns
          </p>
          
          <div className="grid grid-cols-1 gap-24">
            {mainServices.map((service, index) => (
              <div 
                key={service.id}
                id={service.id} 
                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 opacity-0 animate-fade-in`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-divine-purple/10 rounded-2xl transform ${index % 2 !== 0 ? 'rotate-3' : 'rotate-[-3deg]'}`}></div>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="rounded-2xl shadow-lg relative z-10 w-full"
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-serif font-bold mb-6 text-divine-purple">{service.title}</h2>
                  <p className="mb-8 text-lg text-divine-purple-dark">
                    {service.description}
                  </p>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                    <h3 className="font-serif font-bold mb-4 text-divine-purple">What's Included:</h3>
                    <ul className="space-y-2">
                      {service.details.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-divine-gold mr-2">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-divine-cream/30">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in">Additional Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {additionalServices.map((service, index) => (
              <div 
                key={service.title} 
                className="divine-card opacity-0 animate-fade-in hover:translate-y-[-5px]"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${service.iconColor} text-2xl`}>{service.icon}</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-divine-purple">{service.title}</h3>
                <p className="text-divine-purple-dark">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in">Understanding Homeopathy</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="opacity-0 animate-fade-in delay-100">
              <h3 className="text-3xl font-serif font-bold mb-6 text-divine-purple">What is Homeopathy?</h3>
              <p className="mb-4 text-lg">
                Homeopathy is a natural system of medicine that has been used worldwide for more than 200 years. It's based on the principle of "like cures like" – that is, a substance that causes symptoms in a healthy person can be used in a highly diluted form to treat similar symptoms in a sick person.
              </p>
              <p className="mb-4 text-lg">
                Homeopathic remedies are derived from natural substances and are prepared through a specific process of dilution and succussion (vigorous shaking). This process is believed to enhance the healing properties of the substance while removing any toxic effects.
              </p>
              <p className="mb-4 text-lg">
                At Synergy – The Divine Clinic, we use homeopathy as part of a holistic approach to healthcare that considers your physical symptoms alongside your emotional state, mental wellbeing, lifestyle, and unique constitution.
              </p>
            </div>
            
            <div className="opacity-0 animate-fade-in delay-200">
              <img 
                src="https://images.unsplash.com/photo-1565071783280-719b01b29912?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Homeopathic medicine bottles" 
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
          
          <div className="mt-16 text-center bg-divine-purple-light/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-3xl mx-auto opacity-0 animate-fade-in delay-300">
            <p className="text-xl md:text-2xl font-serif text-divine-purple mb-6">
              Ready to experience the benefits of homeopathic healing?
            </p>
            <Link to="/appointment" className="divine-button-primary inline-block">
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
