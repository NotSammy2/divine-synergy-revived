
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const Contact = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // In a real app, you would send this data to your backend
    form.reset();
    alert('Thank you for your message. We will get back to you soon!');
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
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-center opacity-0 animate-fade-in">
            Contact <span className="divine-gradient-text">Us</span>
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            We're here to answer your questions and provide support on your healing journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="opacity-0 animate-fade-in delay-200">
              <div className="bg-white rounded-2xl shadow-lg p-8">
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
                              <Input placeholder="Your name" {...field} />
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
                              <Input placeholder="Your email" type="email" {...field} />
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
                            <Input placeholder="Your phone number" type="tel" {...field} />
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
                            <Input placeholder="Message subject" {...field} />
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
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                              placeholder="Your message" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <button type="submit" className="divine-button-primary w-full">
                      Send Message
                    </button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Phone className="text-divine-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Phone</h3>
                      <p className="text-divine-purple-dark">+91 98765 43210</p>
                      <p className="text-divine-purple-dark">+91 76543 21098</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-divine-gold-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Mail className="text-divine-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Email</h3>
                      <p className="text-divine-purple-dark">info@synergythedivine.com</p>
                      <p className="text-divine-purple-dark">appointment@synergythedivine.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-divine-purple-light rounded-full flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="text-divine-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold mb-1">Address</h3>
                      <p className="text-divine-purple-dark">
                        Synergy - The Divine Clinic<br />
                        123 Civil Lines, Near High Court<br />
                        Prayagraj, Uttar Pradesh 211001<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
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
              </div>
              
              <div className="rounded-2xl shadow-lg overflow-hidden h-72 opacity-0 animate-fade-in delay-400">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57813.249844175455!2d81.79972965976655!3d25.44538498388668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398535a8e27ba98d%3A0x3cfba1d0a67c6d4a!2sCivil%20Lines%2C%20Prayagraj%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1653395610211!5m2!1sen!2sus" 
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
