"use client";
import React from 'react';
import { Plane, MessageCircle, Phone, Sparkles } from 'lucide-react';

const CallToAction = () => {

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white z-0"></div>
      
      {/* Decorative Elements */}
      <div className="hidden lg:block absolute top-10 left-10 opacity-10">
        <Plane className="w-24 h-24 lg:w-32 lg:h-32 text-blue-400" />
      </div>
      <div className="hidden lg:block absolute bottom-10 right-10 opacity-10">
        <Plane className="w-24 h-24 lg:w-32 lg:h-32 text-teal-400 transform rotate-45" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Main CTA Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-5 sm:mb-6 md:mb-8 shadow-xl">
            <Plane className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white animate-pulse" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 leading-tight px-4">
            Ready to Begin Your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mt-2">
              Adventure?
            </span>
          </h2>
          
          <div className="relative inline-block mb-6 sm:mb-7 md:mb-8 px-4">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4 max-w-3xl mx-auto">
              <span className="relative">
                <span className="relative z-10">
                  Let&apos;s plan your next journey together!
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-amber-200 to-yellow-200 opacity-50 rounded-full z-0"></span>
              </span>
            </p>
            <div className="flex justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          
          <div className="w-24 sm:w-28 md:w-32 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full mb-8 sm:mb-10 md:mb-12"></div>
          
          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-4">
            <button
              onClick={scrollToForm}
              className="group px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm sm:text-base rounded-full hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce flex-shrink-0" />
              <span>Send Us a Message</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm sm:text-base rounded-full hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce flex-shrink-0" />
              <span>Chat on WhatsApp</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="relative px-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-4 sm:mb-5 md:mb-6">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 px-4">
                Don&apos;t Wait for Tomorrow&apos;s Adventure
              </h3>
              
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                Every great journey begins with a single step. Our team of travel experts 
                is ready to help you take that step today. Whether you&apos;re dreaming of a 
                beach getaway, cultural exploration, or luxury retreat, we&apos;ll make it happen.
              </p>
              
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
                <button
                  onClick={scrollToForm}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm sm:text-base rounded-full hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 sm:gap-3 group"
                >
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-ping flex-shrink-0" />
                  <span>Start Planning Now</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                
                <a
                  href="tel:+94112345678"
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border-2 border-blue-500 text-blue-600 font-bold text-sm sm:text-base rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce flex-shrink-0" />
                  <span className="hidden xs:inline">Call for Quick Quote</span>
                  <span className="xs:hidden">Call Us</span>
                </a>
              </div>
              
              <div className="mt-6 sm:mt-7 md:mt-8 pt-5 sm:pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-xs sm:text-sm px-4">
                  No commitment required for initial consultation. Let&apos;s just chat about your travel dreams!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button (Mobile & Tablet) */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 lg:hidden">
          <a
            href="https://wa.me/94771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;