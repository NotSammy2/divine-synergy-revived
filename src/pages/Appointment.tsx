
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import AppointmentSidebar from '@/components/appointment/AppointmentSidebar';
import HolisticHealingSection from '@/components/appointment/HolisticHealingSection';
import { simulateSendEmail } from '@/components/appointment/EmailService';

const Appointment = () => {
  const { toast } = useToast();
  const [sendingEmail, setSendingEmail] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    
    // If the send copy to doctor checkbox is checked, send an email
    if (data.sendCopyToDoctor) {
      setSendingEmail(true);
      try {
        // This would typically be sent to a backend API
        await simulateSendEmail({
          to: "drsusmit@synergythedivine.com", // Replace with the doctor's actual email
          subject: `New Appointment: ${data.name} - ${data.service}`,
          body: `
            New appointment booking details:
            
            Patient: ${data.name}
            Contact: ${data.email} / ${data.phone}
            Service: ${data.service}
            Date: ${data.date ? format(data.date, "PPP") : "Not selected"}
            Time: ${data.time}
            
            Additional Notes:
            ${data.notes || "None provided"}
          `
        });
        
        toast({
          title: "Email Notification Sent",
          description: "A copy of this appointment has been sent to the doctor.",
        });
      } catch (error) {
        console.error("Error sending email notification:", error);
        toast({
          title: "Email Notification Failed",
          description: "Could not send the appointment copy. The booking is still received.",
          variant: "destructive",
        });
      } finally {
        setSendingEmail(false);
      }
    }
    
    // Continue with normal appointment booking flow
    toast({
      title: "Appointment Request Received!",
      description: "We'll confirm your appointment shortly via email or phone.",
    });
    
    // Reset form would be handled in the AppointmentForm component
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
