import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import AppointmentSidebar from '@/components/appointment/AppointmentSidebar';
import HolisticHealingSection from '@/components/appointment/HolisticHealingSection';
import { sendAppointmentEmail } from '@/components/appointment/EmailService';

const Appointment = () => {
  const { toast } = useToast();
  const [sendingEmail, setSendingEmail] = useState(false);

  const onSubmit = async (data: any) => {
    console.log('Appointment data:', data);
    
    setSendingEmail(true);
    
    try {
      // Send appointment confirmation email to patient
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date ? format(data.date, "PPP") : "Not selected",
        time: data.time,
        service: data.service,
        notes: data.notes
      };

      await sendAppointmentEmail(appointmentData);
      
      toast({
        title: "Appointment Request Confirmed!",
        description: "A confirmation email has been sent to you. We'll contact you shortly to finalize your appointment.",
      });
      
      // Reset form would be handled in the AppointmentForm component
    } catch (error) {
      console.error("Error sending appointment email:", error);
      toast({
        title: "Appointment Received",
        description: "Your appointment request has been received. We'll contact you shortly via phone.",
        variant: "default",
      });
    } finally {
      setSendingEmail(false);
    }
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
              <AppointmentForm onFormSubmit={onSubmit} sendingEmail={sendingEmail} />
            </div>
            
            <div className="opacity-0 animate-fade-in delay-300">
              <AppointmentSidebar />
            </div>
          </div>
        </div>
      </section>
      
      <HolisticHealingSection />
      
      <Footer />
    </div>
  );
};

export default Appointment;
