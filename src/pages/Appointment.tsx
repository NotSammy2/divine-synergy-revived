
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '2:00 PM', '2:30 PM', '3:00 PM',
  '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

const servicesOptions = [
  'Homeopathic Consultation',
  'Chronic Disease Management',
  'Pediatric Homeopathy',
  'Women\'s Health',
  'Lifestyle Counseling',
  'Preventative Care',
  'Acute Care',
  'Mental & Emotional Health'
];

const Appointment = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: undefined,
      time: '',
      service: '',
      notes: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // In a real app, you would send this data to your backend
    
    toast({
      title: "Appointment Request Received!",
      description: "We'll confirm your appointment shortly via email or phone.",
    });
    
    form.reset();
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
            Book Your <span className="divine-gradient-text">Appointment</span>
          </h1>
          <p className="text-xl text-divine-purple-dark max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in delay-100">
            Take the first step on your healing journey by scheduling a consultation with Dr. Susmit Kesawarni
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 opacity-0 animate-fade-in delay-200">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Book Your Appointment</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User size={16} />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" required {...field} />
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
                            <FormLabel className="flex items-center gap-2">
                              <Mail size={16} />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your email address" type="email" required {...field} />
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
                          <FormLabel className="flex items-center gap-2">
                            <Phone size={16} />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" type="tel" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2">
                              <CalendarIcon size={16} />
                              Preferred Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    setDate(date);
                                  }}
                                  disabled={(date) => {
                                    const day = date.getDay();
                                    // Disable Sundays (0) and past dates
                                    return date < new Date(new Date().setHours(0,0,0,0)) || day === 0;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Clock size={16} />
                              Preferred Time
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {servicesOptions.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText size={16} />
                            Additional Notes (Optional)
                          </FormLabel>
                          <FormControl>
                            <textarea 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                              placeholder="Please provide any additional details about your health concerns or questions" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <button type="submit" className="divine-button-primary w-full">
                      Book Appointment
                    </button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 sticky top-24">
                <h2 className="text-2xl font-serif font-bold mb-6 text-divine-purple">Appointment Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif font-bold mb-2 text-divine-purple">Clinic Hours</h3>
                    <div className="space-y-1 text-divine-purple-dark">
                      <p className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday:</span>
                        <span>9:00 AM - 2:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-divine-purple/10 pt-6">
                    <h3 className="font-serif font-bold mb-2 text-divine-purple">What to Expect</h3>
                    <ul className="space-y-2 text-divine-purple-dark">
                      <li className="flex items-start">
                        <span className="text-divine-gold mr-2">✦</span>
                        <span>Initial consultations typically last 60-90 minutes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-divine-gold mr-2">✦</span>
                        <span>Please arrive 15 minutes before your scheduled time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-divine-gold mr-2">✦</span>
                        <span>Bring any relevant medical records or test results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-divine-gold mr-2">✦</span>
                        <span>List of current medications and supplements</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-divine-purple/10 pt-6">
                    <h3 className="font-serif font-bold mb-2 text-divine-purple">Other Ways to Book</h3>
                    <div className="space-y-3 text-divine-purple-dark">
                      <p className="flex items-center">
                        <Phone size={16} className="mr-2" />
                        <span>+91 98765 43210</span>
                      </p>
                      <p className="flex items-center">
                        <Mail size={16} className="mr-2" />
                        <span>appointment@synergythedivine.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
      
      <Footer />
    </div>
  );
};

export default Appointment;
