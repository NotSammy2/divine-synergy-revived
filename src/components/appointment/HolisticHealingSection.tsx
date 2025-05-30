
import React from 'react';

const HolisticHealingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-divine-cream/30">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Understanding Modern Homeopathy</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="divine-card opacity-0 animate-fade-in delay-100 hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-purple text-2xl">⚕</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Evidence-Based Approach</h3>
            <p className="text-divine-purple-dark">
              Our homeopathic treatments are based on scientific research and clinical evidence, ensuring effective and safe therapeutic outcomes for our patients.
            </p>
          </div>
          
          <div className="divine-card opacity-0 animate-fade-in delay-200 hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-gold text-2xl">🔬</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Scientific Methods</h3>
            <p className="text-divine-purple-dark">
              We combine traditional homeopathic principles with modern diagnostic tools and scientific validation to provide comprehensive healthcare solutions.
            </p>
          </div>
          
          <div className="divine-card opacity-0 animate-fade-in delay-300 hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-purple text-2xl">💊</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Individualized Treatment</h3>
            <p className="text-divine-purple-dark">
              Every patient receives a personalized treatment plan based on detailed case analysis, constitutional assessment, and evidence-based remedy selection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolisticHealingSection;
