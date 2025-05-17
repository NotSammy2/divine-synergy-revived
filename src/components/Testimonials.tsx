
import React from 'react';

const testimonials = [
  {
    quote: "My spiritual journey took a profound turn after working with Divine Synergy. The energy healing sessions unlocked aspects of myself I never knew existed.",
    author: "Rebecca A.",
    role: "Spiritual Seeker"
  },
  {
    quote: "The meditation journeys have given me tools to navigate life's challenges with grace and ease. I feel more connected to my higher self than ever before.",
    author: "Michael T.",
    role: "Life Coach"
  },
  {
    quote: "The Akashic Records reading was incredibly accurate and provided the clarity I needed during a difficult transition. I'm forever grateful.",
    author: "Sarah L.",
    role: "Wellness Practitioner"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-divine-purple-light/20">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Divine Reflections</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Read about the transformative experiences of those who have embarked on their spiritual journey with us
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 0.15}s` }}
            >
              <div className="divine-card h-full flex flex-col">
                <div className="mb-6">
                  <span className="text-5xl text-divine-gold opacity-60">"</span>
                </div>
                <p className="italic text-divine-purple-dark mb-6 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="border-t border-divine-purple/10 pt-4 mt-auto">
                  <p className="font-serif font-bold text-divine-purple">{testimonial.author}</p>
                  <p className="text-sm text-divine-purple-dark">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-3xl mx-auto opacity-0 animate-fade-in delay-500">
          <p className="text-xl md:text-2xl font-serif text-divine-purple mb-6">
            Ready to begin your own transformative journey?
          </p>
          <a href="#contact" className="divine-button-primary inline-block">
            Connect With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
