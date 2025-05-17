
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-divine-cream/50">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">About Our Clinic</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Dedicated to holistic healing and treating the root cause, not just the symptoms
        </p>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
          <div className="relative opacity-0 animate-fade-in delay-200">
            <div className="absolute inset-0 bg-divine-purple/10 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
              alt="Dr. Susmit Kesawarni's clinic" 
              className="rounded-2xl shadow-lg relative z-10"
            />
          </div>
          
          <div className="opacity-0 animate-fade-in delay-300">
            <h3 className="text-3xl font-serif font-bold mb-6 text-divine-purple">Meet Dr. Susmit Kesawarni</h3>
            
            <p className="mb-4 text-lg">
              Dr. Susmit Kesawarni has been a dedicated Government Medical Officer since 2005, currently serving at Lal Bahadur Shastri Medical College, Prayagraj. With over 19 years of medical experience, she brings deep clinical insight and compassionate care to every patient.
            </p>
            
            <p className="mb-8 text-lg">
              A few years ago, she established Synergy – The Divine Clinic in Prayagraj, Uttar Pradesh, to provide specialized homeopathic treatment in a peaceful, patient-centric environment. The clinic focuses on holistic healing, treating the root cause—not just symptoms.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-divine-purple text-2xl">✧</span>
                </div>
                <h4 className="font-serif font-medium mb-2">Patient-Centric Care</h4>
                <p className="text-sm text-divine-purple-dark">Personalized treatment plans for your unique health needs</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-divine-gold text-2xl">✧</span>
                </div>
                <h4 className="font-serif font-medium mb-2">Holistic Approach</h4>
                <p className="text-sm text-divine-purple-dark">Treating the whole person, not just isolated symptoms</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/about" className="divine-button-outline inline-block">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
