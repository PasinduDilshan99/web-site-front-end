"use client";
import { useState } from "react";
import { ContactSupportModal } from "./ContactSupportModal";

interface FaqFooterProps {
  displayedCount: number;
  totalCount: number;
  hasMoreFaqs: boolean;
  showAll: boolean;
  onViewAll?: () => void;
}

export const FaqFooter = ({
  displayedCount,
  totalCount,
  hasMoreFaqs,
  showAll,
  onViewAll,
}: FaqFooterProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const goToFaqPage = () => {
    window.location.href = "/faq";
  };

  return (
    <>
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        {/* Contact Support Section - Full width below FAQ list */}
        <div className="w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-teal-100 bg-gradient-to-br from-white to-teal-50 transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700">
                  Can&apos;t find what you&apos;re looking for? Our support team
                  is here to help you with any questions.
                </p>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="cursor-pointer w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-semibold rounded-full sm:rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative flex items-center gap-2">
                    Contact Support
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactSupportModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};
