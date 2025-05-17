
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const AppointmentSidebar = () => {
  return (
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
  );
};

export default AppointmentSidebar;
