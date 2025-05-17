
import React from 'react';

const HolisticHealingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-divine-cream/30">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Understanding Holistic Healing</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="divine-card opacity-0 animate-fade-in delay-100">
            <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-purple text-2xl">✧</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Holistic Approach</h3>
            <p className="text-divine-purple-dark">
              Our homeopathic treatments consider your entire being—physical, mental, emotional, and spiritual aspects—to create a truly personalized healing plan that addresses the root cause of your health concerns.
            </p>
          </div>
          
          <div className="divine-card opacity-0 animate-fade-in delay-200">
            <div className="w-16 h-16 bg-divine-gold-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-gold text-2xl">✦</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Natural Healing</h3>
            <p className="text-divine-purple-dark">
              Homeopathic remedies work with your body's natural healing mechanisms, stimulating your innate ability to restore balance and health without the side effects often associated with conventional medications.
            </p>
          </div>
          
          <div className="divine-card opacity-0 animate-fade-in delay-300">
            <div className="w-16 h-16 bg-divine-purple-light rounded-full flex items-center justify-center mb-4">
              <span className="text-divine-purple text-2xl">✧</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-divine-purple">Personalized Care</h3>
            <p className="text-divine-purple-dark">
              Every patient receives individualized attention and care, with treatments tailored to your unique constitution, health history, and specific symptoms—because no two people are exactly alike, even with similar conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolisticHealingSection;
