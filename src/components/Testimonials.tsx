
import React from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "Dr. Kesawarni's homeopathic treatment helped me overcome my chronic migraines when nothing else worked. Her approach is thorough and she really listens to understand the root cause.",
    author: "Priya M.",
    role: "Patient"
  },
  {
    quote: "After years of digestive issues, the homeopathic remedies prescribed by Dr. Kesawarni have significantly improved my quality of life. I appreciate her holistic approach to healthcare.",
    author: "Rahul S.",
    role: "Patient"
  },
  {
    quote: "My daughter's eczema improved dramatically under Dr. Kesawarni's care. We're grateful to have found a gentle, effective treatment without harsh steroids or side effects.",
    author: "Anjali P.",
    role: "Parent of Patient"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-divine-purple-light/20">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Patient Testimonials</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Read about the healing experiences of those who have benefited from our homeopathic treatments
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
            Ready to begin your healing journey?
          </p>
          <Link to="/appointment" className="divine-button-primary inline-block">
            Book Your Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
