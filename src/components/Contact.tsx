
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
      // Here you would normally send the data to your backend
      await simulateSendEmail({
        to: "drsusmit@synergythedivine.com", // Replace with your actual email
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
        description: "Thank you for reaching out. We'll connect with you soon on your spiritual journey.",
      });
      
      // Reset form
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
  
  // This function simulates sending an email
  const simulateSendEmail = async ({ to, subject, body }: { to: string; subject: string; body: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Email would be sent to:", to);
    console.log("Subject:", subject);
    console.log("Body:", body);
    
    // In a real implementation, you would make an API call to your backend here
    // For now just return success
    return { success: true };
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-divine-purple-light/20 to-white">
      <div className="divine-container">
        <h2 className="section-title text-center opacity-0 animate-fade-in">Connect With Us</h2>
        <p className="section-subtitle text-center opacity-0 animate-fade-in delay-100">
          Take the first step on your divine journey by reaching out for guidance and support
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="opacity-0 animate-fade-in delay-200 order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
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
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50"
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
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50"
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
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50"
                  >
                    <option value="">Select a service</option>
                    <option value="Energy Healing">Energy Healing</option>
                    <option value="Spiritual Coaching">Spiritual Coaching</option>
                    <option value="Meditation Journeys">Meditation Journeys</option>
                    <option value="Sacred Ceremonies">Sacred Ceremonies</option>
                    <option value="Akashic Records">Akashic Records</option>
                    <option value="Divine Integration">Divine Integration</option>
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
                    className="w-full px-4 py-3 rounded-lg border border-divine-purple/20 focus:outline-none focus:ring-2 focus:ring-divine-purple/50"
                    placeholder="How can we assist you on your spiritual journey?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="divine-button-primary w-full flex items-center justify-center" 
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
              <h3 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Divine Connection</h3>
              
              <p className="mb-8 text-lg text-divine-purple-dark">
                We're here to support you on your spiritual journey. Reach out to us with any questions or to schedule a consultation for any of our divine services.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-purple">✉</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Email Us</h4>
                    <p className="text-divine-purple-dark">connect@divinesynergy.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-divine-gold-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-gold">☏</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Call Us</h4>
                    <p className="text-divine-purple-dark">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-divine-purple">⌖</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium mb-1">Visit Our Sanctuary</h4>
                    <p className="text-divine-purple-dark">123 Spiritual Way, Serenity Valley, CA 94123</p>
                  </div>
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
