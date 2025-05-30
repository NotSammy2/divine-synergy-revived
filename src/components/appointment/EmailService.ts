import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_je14nbd';
const EMAILJS_TEMPLATE_ID = 'template_2xkodip';
const EMAILJS_PUBLIC_KEY = 'oW2Whl6LrwltKvwep';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendAppointmentEmail = async (appointmentData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
}) => {
  try {
    const templateParams = {
      to_email: appointmentData.email,
      patient_name: appointmentData.name,
      patient_email: appointmentData.email,
      patient_phone: appointmentData.phone,
      appointment_date: appointmentData.date,
      appointment_time: appointmentData.time,
      service_type: appointmentData.service,
      additional_notes: appointmentData.notes || 'None provided',
      clinic_name: 'Synergy - The Divine Multispecialty Clinic',
      clinic_address: 'Shop no. 1, Swastik Magnolia Apartment, Kamla Nehru Rd, Old Katra, Prayagraj, Uttar Pradesh 211002',
      clinic_phone: '+91 8318494972',
      doctor_email: 'drsusmit@synergythedivine.com'
    };

    console.log('Sending appointment confirmation email...');
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// This file contains the email sending functionality
export const simulateSendEmail = async ({ to, subject, body }: { to: string; subject: string; body: string }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Email would be sent to:", to);
  console.log("Subject:", subject);
  console.log("Body:", body);
  
  // For now just return success
  return { success: true };
};
