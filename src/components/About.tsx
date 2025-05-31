
import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

interface AboutProps {
  content?: any;
  config?: any;
}

const About: React.FC<AboutProps> = ({ content, config }) => {
  const title = content?.title || "About Dr. Susmit Kesawarni";
  const description = content?.description || "Government Medical Officer since 2005 with expertise in evidence-based homeopathy";
  const experience = content?.experience || "19+ Years";
  const qualification = content?.qualification || "BHMS";

  return (
    <section id="about" className="py-20 bg-white">
      <div className="divine-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-fade-in">
            <div className="relative hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-divine rounded-2xl opacity-20 transform rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt="Dr. Susmit Kesawarni" 
                className="relative z-10 rounded-2xl w-full h-96 object-cover shadow-xl"
              />
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in delay-200">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {title}
            </h2>
            <p className="text-xl text-divine-purple-dark mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-divine-cream rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-divine-purple rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-divine-purple-dark">{experience}</div>
                <div className="text-sm text-gray-600">Experience</div>
              </div>
              
              <div className="text-center p-4 bg-divine-cream rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-divine-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-divine-purple-dark">{qualification}</div>
                <div className="text-sm text-gray-600">Qualification</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-divine-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-divine-purple-dark">Government Medical Officer</h4>
                  <p className="text-gray-600">Serving the community since 2005 with dedication and expertise</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-divine-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-divine-purple-dark">Evidence-Based Practice</h4>
                  <p className="text-gray-600">Combining traditional homeopathic principles with modern medical understanding</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <a href="/about" className="divine-button-outline hover:scale-105 transition-transform duration-200">
                Learn More About Our Clinic
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
