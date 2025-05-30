
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { simulateSendEmail } from './appointment/EmailService';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await simulateSendEmail({
        to: "drsusmit@synergythedivine.com",
        subject: `New Contact Message from ${formData.name}`,
        body: `
          New message from your website contact form:
          
          Name: ${formData.name}
          Email: ${formData.email}
          Service Interest: ${formData.service}
          
          Message:
          ${formData.message}
        `
      });
      
      toast({
        title: "Message Received",
        description: "Thank you for reaching out. We'll connect with you soon regarding your homeopathic treatment.",
      });
      
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Message Send Failed",
        description: "There was an issue sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleWhatsAppConnect = () => {
    window.open('https://wa.me/918318494972', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-divine-purple-light/20 to-white">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300">Connect With Us</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Take the first step towards natural healing with modern homeopathic treatments
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="opacity-0 animate-fade-in delay-200 order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-divine-purple-dark mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50 transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-divine-purple-dark mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-divine-purple-dark mb-2">Service Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50 transition-all duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="Clinical Homeopathy">Clinical Homeopathy</option>
                    <option value="Chronic Disease Management">Chronic Disease Management</option>
                    <option value="Pediatric Homeopathy">Pediatric Homeopathy</option>
                    <option value="Women's Health">Women's Health</option>
                    <option value="Lifestyle Medicine">Lifestyle Medicine</option>
                    <option value="Preventive Healthcare">Preventive Healthcare</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-divine-purple-dark mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50 transition-all duration-200"
                    placeholder="How can we assist you with your health concerns?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="divine-button-primary w-full flex items-center justify-center hover:scale-105 transition-transform duration-200" 
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="mr-2">Sending...</span>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in delay-300 order-1 md:order-2">
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Get in Touch</h3>
              
              <p className="mb-8 text-lg text-divine-purple-dark">
                We're here to support you on your health journey. Reach out to us with any questions or to schedule a consultation for modern homeopathic treatments.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
                  <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-purple">📧</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Email Us</h4>
                    <p className="text-divine-purple-dark">drsusmit@synergythedivine.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
                  <div className="w-12 h-12 bg-divine-gold-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-gold">📞</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Call Us</h4>
                    <p className="text-divine-purple-dark">+91 8318494972</p>
                    <p className="text-divine-purple-dark">+91 8004987057</p>
                    <p className="text-divine-purple-dark">+91 6387905240</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
                  <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-purple">📍</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Visit Our Clinic</h4>
                    <p className="text-divine-purple-dark">Shop no. 1, Swastik Magnolia Apartment, Kamla Nehru Rd, Old Katra, Prayagraj, Uttar Pradesh 211002</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={handleWhatsAppConnect}
                    className="divine-button-secondary hover:scale-105 transition-transform duration-200"
                  >
                    Connect on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
