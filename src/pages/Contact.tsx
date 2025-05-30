
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { simulateSendEmail } from '@/components/appointment/EmailService';

const Contact = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await simulateSendEmail({
        to: "drsusmit@synergythedivine.com",
        subject: `Contact Form: ${data.subject}`,
        body: `
          New contact form submission:
          
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone}
          Subject: ${data.subject}
          
          Message:
          ${data.message}
        `
      });
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppConnect = () => {
    window.open('https://wa.me/918318494972', '_blank');
  };

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
            Contact <span className="divine-gradient-text">Us</span>
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            We're here to answer your questions and provide support for your homeopathic treatment journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="opacity-0 animate-fade-in delay-200">
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="transition-all duration-200 focus:scale-105" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} className="transition-all duration-200 focus:scale-105" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" type="tel" {...field} className="transition-all duration-200 focus:scale-105" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Message subject" {...field} className="transition-all duration-200 focus:scale-105" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px] transition-all duration-200 focus:scale-105"
                              placeholder="Your message" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <button type="submit" className="divine-button-primary w-full hover:scale-105 transition-transform duration-200">
                      Send Message
                    </button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start hover:scale-105 transition-transform duration-200">
                    <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Phone className="text-divine-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Phone</h3>
                      <p className="text-divine-purple-dark">+91 8318494972</p>
                      <p className="text-divine-purple-dark">+91 8004987057</p>
                      <p className="text-divine-purple-dark">+91 6387905240</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:scale-105 transition-transform duration-200">
                    <div className="w-12 h-12 bg-divine-gold-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Mail className="text-divine-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Email</h3>
                      <p className="text-divine-purple-dark">drsusmit@synergythedivine.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:scale-105 transition-transform duration-200">
                    <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="text-divine-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Address</h3>
                      <p className="text-divine-purple-dark">
                        Synergy - The Divine Multispecialty Clinic<br />
                        Shop no. 1, Swastik Magnolia Apartment<br />
                        Kamla Nehru Rd, Old Katra<br />
                        Prayagraj, Uttar Pradesh 211002<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:scale-105 transition-transform duration-200">
                    <div className="w-12 h-12 bg-divine-gold-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Clock className="text-divine-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Clinic Hours</h3>
                      <p className="text-divine-purple-dark">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-divine-purple-dark">Sunday: Closed (Emergencies only)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={handleWhatsAppConnect}
                    className="divine-button-secondary w-full hover:scale-105 transition-transform duration-200"
                  >
                    Connect on WhatsApp
                  </button>
                </div>
              </div>
              
              <div className="rounded-2xl shadow-lg overflow-hidden h-72 opacity-0 animate-fade-in delay-400 hover:scale-105 transition-transform duration-300">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.2742688789627!2d81.84660391536!3d25.459887783757595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb996bea3815%3A0xe7f9c8408b074f21!2sSynergy%20The%20Divine%20Multispeciality%20Clinic!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Clinic Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
