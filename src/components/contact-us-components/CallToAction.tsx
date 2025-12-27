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
    <div className="relative py-12 px-4 md:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Plane className="w-32 h-32 text-blue-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Plane className="w-32 h-32 text-teal-400 transform rotate-45" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-8 shadow-xl">
            <Plane className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Ready to Begin Your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
              Adventure?
            </span>
          </h2>
          
          <div className="relative inline-block mb-8">
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              <span className="relative">
                <span className="relative z-10">
                  Let&apos;s plan your next journey together!&quot;
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-amber-200 to-yellow-200 opacity-50 rounded-full z-0"></span>
              </span>
            </p>
            <div className="flex justify-center">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full mb-12"></div>
          
          {/* Primary CTA Button */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button
              onClick={scrollToForm}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-lg rounded-full hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              Send Us a Message
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              Chat on WhatsApp
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Don&apos;t Wait for Tomorrow&apos;s Adventure
              </h3>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Every great journey begins with a single step. Our team of travel experts 
                is ready to help you take that step today. Whether you&apos;re dreaming of a 
                beach getaway, cultural exploration, or luxury retreat, we&apos;ll make it happen.
              </p>
              
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-lg rounded-full hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
                >
                  <Plane className="w-6 h-6 group-hover:animate-ping" />
                  Start Planning Now
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                
                <a
                  href="tel:+94112345678"
                  className="px-10 py-4 border-2 border-blue-500 text-blue-600 font-bold text-lg rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center gap-3 group"
                >
                  <Phone className="w-6 h-6 group-hover:animate-bounce" />
                  Call for Quick Quote
                </a>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  No commitment required for initial consultation. Let&apos;s just chat about your travel dreams!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button (Mobile) */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <a
            href="https://wa.me/94771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;