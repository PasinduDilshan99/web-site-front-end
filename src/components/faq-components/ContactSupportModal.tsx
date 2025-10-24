"use client";
import { useState, useEffect } from "react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSupportModal = ({ isOpen, onClose }: ContactSupportModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle modal open/close animations
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShowModal(false);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 300);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    onClose();
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "", category: "general" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 transition-all duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur and animation */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          showModal ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Modal Card with slide-in animation */}
      <div 
        className={`relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden border border-white/20 transform transition-all duration-300 ${
          showModal 
            ? 'translate-y-0 scale-100 opacity-100' 
            : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-4 sm:p-6 md:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white rounded-full"></div>
          </div>
          
          <div className="relative flex justify-between items-start sm:items-center">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Contact Support
              </h3>
              <p className="text-purple-100 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 leading-relaxed">
                Well get back to you within 24 hours
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 bg-white/20 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all duration-200 transform hover:scale-110 active:scale-95 ml-4 sm:ml-6 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[60vh] sm:max-h-[65vh]">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
            
            {/* Name Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg"
                placeholder="your@email.com"
              />
            </div>

            {/* Category Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-400 focus:shadow-lg appearance-none cursor-pointer"
                >
                  <option value="general" className="text-gray-900 bg-white">General Inquiry</option>
                  <option value="technical" className="text-gray-900 bg-white">Technical Issue</option>
                  <option value="billing" className="text-gray-900 bg-white">Billing Question</option>
                  <option value="feature" className="text-gray-900 bg-white">Feature Request</option>
                  <option value="bug" className="text-gray-900 bg-white">Bug Report</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg"
                placeholder="Brief description of your inquiry"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg resize-vertical"
                placeholder="Please describe your issue or question in detail..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-semibold border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 active:scale-95 hover:border-gray-400 hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-amber-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-700 text-center flex items-center justify-center space-x-1">
            <span>💬</span>
            <span>We typically respond within 2-4 hours during business days</span>
          </p>
        </div>
      </div>
    </div>
  );
};