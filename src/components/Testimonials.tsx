
import React from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "Dr. Kesawarni's modern approach to homeopathy helped me overcome my chronic migraines. Her detailed case analysis and scientific methodology gave me confidence in the treatment.",
    author: "Priya M.",
    role: "Software Engineer",
    rating: 5
  },
  {
    quote: "After years of digestive issues, the homeopathic remedies prescribed by Dr. Kesawarni have significantly improved my quality of life. Her evidence-based approach is remarkable.",
    author: "Rahul S.",
    role: "Business Owner",
    rating: 5
  },
  {
    quote: "My daughter's eczema improved dramatically under Dr. Kesawarni's care. The gentle yet effective treatment without side effects has been a blessing for our family.",
    author: "Anjali P.",
    role: "Teacher",
    rating: 5
  },
  {
    quote: "Dr. Kesawarni's combination of medical expertise and homeopathic knowledge helped me manage my arthritis pain naturally. Highly recommend her modern approach.",
    author: "Suresh K.",
    role: "Retired Bank Manager",
    rating: 5
  },
  {
    quote: "The clinic's professional environment and Dr. Kesawarni's thorough consultation process impressed me. My anxiety issues have improved significantly with her treatment.",
    author: "Meera T.",
    role: "College Student",
    rating: 5
  },
  {
    quote: "As a healthcare professional myself, I appreciate Dr. Kesawarni's scientific approach to homeopathy. Her treatments for my hypertension have been very effective.",
    author: "Dr. Anil V.",
    role: "Dentist",
    rating: 5
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-divine-gold' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-divine-purple-light/20">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Patient Testimonials</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Read about the healing experiences of those who have benefited from our modern homeopathic treatments
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${(index + 2) * 0.15}s` }}
            >
              <div className="divine-card h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-4xl text-divine-gold opacity-60">"</span>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
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
        
        <div className="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-3xl mx-auto opacity-0 animate-fade-in delay-500 hover:scale-105 transition-transform duration-300">
          <p className="text-xl md:text-2xl font-serif text-divine-purple mb-6">
            Ready to begin your healing journey with modern homeopathy?
          </p>
          <Link to="/appointment" className="divine-button-primary inline-block hover:scale-105 transition-transform duration-200">
            Book Your Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
