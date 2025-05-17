
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-divine-cream/50">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Our Divine Mission</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          We guide seekers on their journey to spiritual awakening through ancient wisdom and modern healing practices
        </p>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
          <div className="relative opacity-0 animate-fade-in delay-200">
            <div className="absolute inset-0 bg-divine-purple/10 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Divine energy work" 
              className="rounded-2xl shadow-lg relative z-10"
            />
          </div>
          
          <div className="opacity-0 animate-fade-in delay-300">
            <h3 className="text-3xl font-serif font-bold mb-6 text-divine-purple">Our Sacred Journey</h3>
            
            <p className="mb-4 text-lg">
              Divine Synergy was born from a profound awakening and a vision to create a sanctuary where souls can reconnect with their divine essence. We believe in the power of holistic transformation that touches every aspect of your being.
            </p>
            
            <p className="mb-8 text-lg">
              Our practices blend ancient wisdom traditions with modern therapeutic approaches, creating a unique path that honors both the timeless and the contemporary. Every service we offer is designed to elevate your consciousness and bring you into alignment with your highest potential.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-divine-purple text-2xl">✧</span>
                </div>
                <h4 className="font-serif font-medium mb-2">Divine Wisdom</h4>
                <p className="text-sm text-divine-purple-dark">Channeling ancient knowledge for modern transformation</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-divine-gold text-2xl">✧</span>
                </div>
                <h4 className="font-serif font-medium mb-2">Sacred Healing</h4>
                <p className="text-sm text-divine-purple-dark">Energy work that transcends conventional boundaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
