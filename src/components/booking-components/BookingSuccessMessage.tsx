// components/booking/BookingSuccessMessage.tsx
import React from "react";
import { CheckCircle, Mail, Phone, Calendar, Clock } from "lucide-react";
import { COMPANY_CONTACT_NUMBER } from "@/utils/constant";

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
        className="fixed inset-0 z-[200] transition-all duration-300"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px) saturate(180%)',
          WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        }}
        onClick={onClose}
      />
      
      {/* Success Message */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4">
        <div 
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto transform transition-all duration-300 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 sm:p-6 md:p-8">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-4 sm:mb-6">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                Booking Request Submitted!
              </h3>
              
              {/* Content */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Thank you for your interest in our tour. Our team will contact you shortly.
                </p>
                
                {/* Next Steps Card */}
                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 sm:p-5 rounded-xl border border-sky-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
                    What happens next?
                  </h4>
                  <ul className="text-left text-gray-600 space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span>You&apos;ll receive a confirmation email with your booking reference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span>Our travel specialist will contact you within 2 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span>We&apos;ll discuss available dates, payment options, and special requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span>Final confirmation will be sent once everything is arranged</span>
                    </li>
                  </ul>
                </div>
                
                {/* Contact Reminders */}
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 justify-center items-center text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 flex-shrink-0" />
                    <span>Check your email</span>
                  </div>
                  <div className="hidden xs:block text-gray-300">•</div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                    <span>Keep phone handy</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="cursor-pointer w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-sky-700 hover:to-teal-700 transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Back to Tour Details
              </button>
              
              {/* Contact Info */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Need immediate assistance? Call us at {COMPANY_CONTACT_NUMBER}
              </p>
            </div>
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

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};

export default BookingSuccessMessage;