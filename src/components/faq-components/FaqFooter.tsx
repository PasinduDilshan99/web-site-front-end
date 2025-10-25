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
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between lg:gap-8 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        {/* Show More Button Section */}
        {hasMoreFaqs && !showAll && (
          <div className="flex-1">
            <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-purple-100 bg-gradient-to-br from-white to-purple-50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 mb-4 sm:mb-6 leading-relaxed">
                Showing{" "}
                <span className="font-semibold text-purple-600">
                  {displayedCount}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-amber-600">
                  {totalCount}
                </span>{" "}
                questions
              </p>
              <button
                onClick={onViewAll || goToFaqPage}
                className="w-full px-4 sm:px-6 py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-semibold rounded-full sm:rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">
                  <span className="sm:hidden">View All ({totalCount})</span>
                  <span className="hidden sm:inline md:hidden">
                    View All FAQs ({totalCount})
                  </span>
                  <span className="hidden md:inline">
                    View All FAQs ({totalCount} questions)
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Contact Support Section */}
        <div className={`flex-1 ${hasMoreFaqs && !showAll ? 'mt-6 lg:mt-0' : ''}`}>
          <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-purple-100 bg-gradient-to-br from-white to-amber-50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-6 leading-relaxed">
                Cant find what youre looking for? Our support team is here to help you with any questions.
              </p>
            </div>
            
            {/* Contact Support Button */}
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="w-full px-4 sm:px-6 py-3 text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-semibold rounded-full sm:rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 relative overflow-hidden group"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative">Contact Support</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
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