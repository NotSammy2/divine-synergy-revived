
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
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

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-purple-light/20 to-white">
        <div className="divine-container">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-center opacity-0 animate-fade-in">
            About <span className="divine-gradient-text">Synergy</span> The Divine Clinic
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            A journey of healing, compassion, and holistic wellness in Prayagraj
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-fade-in delay-200">
              <img 
                src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Dr. Susmit Kesawarni's Clinic" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <h2 className="text-3xl font-serif font-bold mb-6 text-divine-purple">Our Story</h2>
              <p className="mb-4 text-lg">
                Synergy – The Divine Clinic was established by Dr. Susmit Kesawarni with a vision to create a peaceful sanctuary for holistic healing in Prayagraj, Uttar Pradesh. Drawing from her extensive background as a Government Medical Officer since 2005 and her passion for homeopathic medicine, Dr. Kesawarni created a space where patients could receive personalized care that addresses the root causes of their health concerns.
              </p>
              <p className="mb-4 text-lg">
                The clinic's name "Synergy" reflects our philosophy that true healing comes from the harmonious integration of physical, emotional, and spiritual wellbeing. We believe in treating the whole person, not just isolated symptoms, and empowering our patients with the knowledge and tools they need for lifelong health.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-divine-cream/30">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in">Our Vision & Mission</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="divine-card opacity-0 animate-fade-in delay-100">
              <div className="w-20 h-20 bg-divine-purple-light rounded-full flex items-center justify-center mb-6">
                <span className="text-divine-purple text-3xl">✧</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Our Vision</h3>
              <p className="text-lg text-divine-purple-dark">
                To be the leading center for homeopathic and holistic healthcare in Uttar Pradesh, recognized for exceptional patient outcomes, compassionate care, and innovative approaches to natural healing.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-200">
              <div className="w-20 h-20 bg-divine-gold-light rounded-full flex items-center justify-center mb-6">
                <span className="text-divine-gold text-3xl">✦</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Our Mission</h3>
              <p className="text-lg text-divine-purple-dark">
                To provide gentle, effective homeopathic treatments that address the root cause of illness while empowering patients with knowledge and tools for maintaining optimal health and wellbeing in all aspects of their lives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in">Meet Dr. Susmit Kesawarni</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center mt-16">
            <div className="md:w-1/3 opacity-0 animate-fade-in delay-100">
              <div className="relative">
                <div className="absolute inset-0 bg-divine-purple/10 rounded-full transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                  alt="Dr. Susmit Kesawarni" 
                  className="rounded-full w-full aspect-square object-cover border-4 border-white shadow-lg relative z-10"
                />
              </div>
            </div>
            
            <div className="md:w-2/3 opacity-0 animate-fade-in delay-200">
              <h3 className="text-3xl font-serif font-bold mb-6 text-divine-purple">About Dr. Kesawarni</h3>
              <p className="mb-4 text-lg">
                Dr. Susmit Kesawarni has been a dedicated Government Medical Officer since 2005, currently serving at Lal Bahadur Shastri Medical College, Prayagraj. With over 19 years of medical experience, she brings deep clinical insight and compassionate care to every patient.
              </p>
              <p className="mb-4 text-lg">
                Her journey into homeopathic medicine began with her own healing experience, which inspired her to explore natural and holistic approaches to healthcare. Dr. Kesawarni completed extensive training in homeopathy, combining this knowledge with her conventional medical background to offer patients the best of both worlds.
              </p>
              <p className="mb-4 text-lg">
                Known for her patient-centered approach, Dr. Kesawarni takes the time to listen deeply to each person's story, understanding that physical symptoms often connect to emotional and lifestyle factors. This comprehensive perspective allows her to create truly personalized treatment plans that address the unique needs of each individual.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg">
                  <span className="font-bold mr-2">Education:</span> MBBS, MD
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg">
                  <span className="font-bold mr-2">Experience:</span> 19+ Years
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg">
                  <span className="font-bold mr-2">Specialization:</span> Homeopathy
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg">
                  <span className="font-bold mr-2">Languages:</span> Hindi, English
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-white to-divine-purple-light/10">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in">Our Approach to Healing</h2>
          <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
            Discover the principles that guide our holistic treatment philosophy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="divine-card opacity-0 animate-fade-in delay-200">
              <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-purple text-2xl">✧</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Treating the Whole Person</h3>
              <p className="text-divine-purple-dark">
                We see each patient as a unique individual with physical, emotional, and spiritual dimensions that all contribute to health and wellbeing.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-300">
              <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-gold text-2xl">✦</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Finding Root Causes</h3>
              <p className="text-divine-purple-dark">
                Rather than suppressing symptoms, we aim to identify and address the underlying imbalances that lead to illness.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-400">
              <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-purple text-2xl">✧</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Gentle, Natural Healing</h3>
              <p className="text-divine-purple-dark">
                Our homeopathic remedies work with your body's natural healing mechanisms without harsh side effects.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
