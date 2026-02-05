// components/booking/BookingSuccessMessage.tsx
import React from "react";
import { CheckCircle, Mail, Phone, Calendar } from "lucide-react";

interface BookingSuccessMessageProps {
  onClose: () => void;
}

const BookingSuccessMessage: React.FC<BookingSuccessMessageProps> = ({
  onClose,
}) => {
  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 z-[200] backdrop-blur-md"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      />
      
      {/* Success Message */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 transform transition-all duration-300 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Booking Request Submitted!
            </h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-600 text-lg">
                Thank you for your interest in our tour. Our team will contact you shortly.
              </p>
              
              <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 rounded-xl border border-sky-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-sky-600" />
                  What happens next?
                </h4>
                <ul className="text-left text-gray-600 space-y-2 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                    <span>You&apos;ll receive a confirmation email with your booking reference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Our travel specialist will contact you within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                    <span>We&apos;ll discuss available dates, payment options, and special requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Final confirmation will be sent once everything is arranged</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>Check your email for updates</span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Keep your phone handy</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold rounded-xl hover:from-sky-700 hover:to-teal-700 transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
            >
              Back to Tour Details
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Need immediate assistance? Call us at +1-800-TOUR-HELP
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @media (max-width: 640px) {
          .max-w-lg {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default BookingSuccessMessage;