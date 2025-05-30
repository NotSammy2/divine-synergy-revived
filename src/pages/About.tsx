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
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">
            About <span className="divine-gradient-text">Synergy</span> The Divine Clinic
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            A center of excellence for modern homeopathic medicine and evidence-based natural healing in Prayagraj
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-fade-in delay-200 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Dr. Susmit Kesawarni's Modern Clinic" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <h2 className="text-3xl font-serif font-bold mb-6 text-divine-purple">Our Story</h2>
              <p className="mb-4 text-lg">
                Synergy – The Divine Multispecialty Clinic was established by Dr. Susmit Kesawarni to bridge the gap between traditional homeopathic wisdom and modern medical science. Located in Prayagraj, Uttar Pradesh, our clinic represents a new paradigm in natural healthcare.
              </p>
              <p className="mb-4 text-lg">
                With Dr. Kesawarni's extensive background as a Government Medical Officer since 2005 and her dedication to evidence-based homeopathy, we provide treatments that are both scientifically validated and naturally effective.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-divine-cream/30">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Our Vision & Mission</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="divine-card opacity-0 animate-fade-in delay-100 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-divine-purple-light rounded-full flex items-center justify-center mb-6">
                <span className="text-divine-purple text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Our Vision</h3>
              <p className="text-lg text-divine-purple-dark">
                To be the leading center for evidence-based homeopathic healthcare in Uttar Pradesh, recognized for clinical excellence, scientific approach, and outstanding patient outcomes.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-200 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-divine-gold-light rounded-full flex items-center justify-center mb-6">
                <span className="text-divine-gold text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Our Mission</h3>
              <p className="text-lg text-divine-purple-dark">
                To provide modern, evidence-based homeopathic treatments that combine scientific validation with natural healing principles, ensuring safe and effective healthcare for all patients.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Meet Dr. Susmit Kesawarni</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center mt-16">
            <div className="md:w-1/3 opacity-0 animate-fade-in delay-100">
              <div className="relative hover:scale-105 transition-transform duration-500">
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
                Dr. Susmit Kesawarni has been a dedicated Government Medical Officer since 2005, currently serving at Lal Bahadur Shastri Medical College, Prayagraj. With over 19 years of medical experience, she brings deep clinical insight and evidence-based approach to homeopathic medicine.
              </p>
              <p className="mb-4 text-lg">
                Her expertise lies in combining conventional medical knowledge with modern homeopathic principles, ensuring that each treatment is both scientifically sound and naturally effective. Dr. Kesawarni is committed to advancing the field of homeopathy through research and clinical excellence.
              </p>
              <p className="mb-4 text-lg">
                Known for her thorough diagnostic approach and personalized treatment plans, Dr. Kesawarni has successfully treated thousands of patients, helping them achieve optimal health through natural healing methods.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg hover:scale-105 transition-transform duration-200">
                  <span className="font-bold mr-2">Education:</span> BHMS
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg hover:scale-105 transition-transform duration-200">
                  <span className="font-bold mr-2">Experience:</span> 19+ Years
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg hover:scale-105 transition-transform duration-200">
                  <span className="font-bold mr-2">Specialization:</span> Modern Homeopathy
                </div>
                <div className="flex items-center p-3 bg-divine-purple-light/20 rounded-lg hover:scale-105 transition-transform duration-200">
                  <span className="font-bold mr-2">Languages:</span> Hindi, English
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-white to-divine-purple-light/10">
        <div className="divine-container">
          <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Our Approach to Modern Homeopathy</h2>
          <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
            Discover the principles that guide our evidence-based treatment philosophy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="divine-card opacity-0 animate-fade-in delay-200 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-purple text-2xl">⚕</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Scientific Validation</h3>
              <p className="text-divine-purple-dark">
                Every treatment is backed by scientific research and clinical evidence, ensuring proven effectiveness and safety.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-300 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-gold text-2xl">🔬</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Modern Diagnostics</h3>
              <p className="text-divine-purple-dark">
                We use contemporary diagnostic methods combined with traditional case-taking for comprehensive patient assessment.
              </p>
            </div>
            
            <div className="divine-card opacity-0 animate-fade-in delay-400 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
                <span className="text-divine-purple text-2xl">💊</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-divine-purple">Personalized Medicine</h3>
              <p className="text-divine-purple-dark">
                Each patient receives individualized treatment plans based on their unique constitution and health profile.
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
