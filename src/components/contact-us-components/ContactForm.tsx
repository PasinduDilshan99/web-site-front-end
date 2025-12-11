"use client";
import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  preferredDestination: string;
  travelDate: string;
  numberOfTravelers: number;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    preferredDestination: '',
    travelDate: '',
    numberOfTravelers: 1,
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'tour_package', label: 'Tour Package' },
    { value: 'hotel_booking', label: 'Hotel Booking' },
    { value: 'visa', label: 'Visa Assistance' },
    { value: 'custom_tour', label: 'Custom Tour' },
    { value: 'transport', label: 'Transportation' },
    { value: 'flight', label: 'Flight Booking' },
    { value: 'group_tour', label: 'Group Tour' },
    { value: 'other', label: 'Other' }
  ];

  const destinations = [
    { value: '', label: 'Select Destination' },
    { value: 'colombo', label: 'Colombo & West Coast' },
    { value: 'galle', label: 'Galle & South Coast' },
    { value: 'kandy', label: 'Kandy & Hill Country' },
    { value: 'anuradhapura', label: 'Anuradhapura & Cultural Triangle' },
    { value: 'trincomalee', label: 'Trincomalee & East Coast' },
    { value: 'ella', label: 'Ella & Tea Country' },
    { value: 'jaffna', label: 'Jaffna & North' },
    { value: 'multiple', label: 'Multiple Destinations' },
    { value: 'custom', label: 'Custom Itinerary' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details of your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfTravelers') {
      const numValue = parseInt(value);
      setFormData(prev => ({
        ...prev,
        [name]: numValue > 0 ? numValue : 1
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make your actual API call
      // const response = await fetch('http://localhost:8080/felicita/v0/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      //   credentials: 'include'
      // });

      // if (response.ok) {
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          inquiryType: '',
          preferredDestination: '',
          travelDate: '',
          numberOfTravelers: 1,
          message: ''
        });
        
        // Scroll to success message
        setTimeout(() => {
          const successElement = document.getElementById('success-message');
          if (successElement) {
            successElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      // } else {
      //   throw new Error('Submission failed');
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: '',
      preferredDestination: '',
      travelDate: '',
      numberOfTravelers: 1,
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-4">
                  Fill out the form below and one of our travel experts will contact you within 24 hours.
                </p>
                <div className="w-16 h-1 bg-teal-500 rounded-full"></div>
              </div>

              {isSubmitted ? (
                <div 
                  id="success-message"
                  className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 md:p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. One of our travel consultants will get back to you within 24 hours.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">We usually respond within 24 hours</span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.fullName && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">For faster response, include your WhatsApp number</p>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white ${
                          errors.inquiryType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Inquiry Type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && (
                        <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>
                      )}
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Travel Details (Optional)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Preferred Destination */}
                      <div>
                        <label htmlFor="preferredDestination" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Destination
                        </label>
                        <select
                          id="preferredDestination"
                          name="preferredDestination"
                          value={formData.preferredDestination}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                        >
                          {destinations.map((dest) => (
                            <option key={dest.value} value={dest.value}>
                              {dest.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Travel Date */}
                      <div>
                        <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Travel Date
                        </label>
                        <input
                          type="date"
                          id="travelDate"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          min={getMinDate()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>

                      {/* Number of Travelers */}
                      <div>
                        <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Travelers
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="numberOfTravelers"
                            name="numberOfTravelers"
                            value={formData.numberOfTravelers}
                            onChange={handleChange}
                            min="1"
                            max="50"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                          <div className="absolute right-3 top-3 text-gray-500">
                            <span className="text-sm">people</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message / Inquiry Details <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please provide details about your travel plans, budget, special requirements, etc."
                      />
                      {errors.message && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Include as much detail as possible for a faster response
                      </p>
                      <span className={`text-xs ${
                        formData.message.length > 1000 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-blue-600">We usually respond within 24 hours.</span> 
                            {' '}For urgent inquiries, please call us at{' '}
                            <a href="tel:+94112345678" className="text-teal-600 font-medium hover:text-teal-700">
                              +94 11 234 5678
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Contact Tips */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips for Quick Response
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-teal-600">1</span>
                  </div>
                  <span className="text-gray-700">Include your phone number for faster response</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-teal-600">2</span>
                  </div>
                  <span className="text-gray-700">Specify your travel dates and budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-teal-600">3</span>
                  </div>
                  <span className="text-gray-700">Mention special requirements (family, luxury, adventure)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-teal-600">4</span>
                  </div>
                  <span className="text-gray-700">Check your email spam folder for our response</span>
                </li>
              </ul>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Response Time</h4>
                  <p className="text-sm text-gray-600">We value your time</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Within 1 hour:</span>
                  <span className="font-semibold text-green-600">WhatsApp</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Within 4 hours:</span>
                  <span className="font-semibold text-blue-600">Phone Calls</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Within 24 hours:</span>
                  <span className="font-semibold text-purple-600">Email/Form</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Working Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Emergency:</span>
                    <a href="tel:+94771234567" className="text-red-600 font-bold hover:text-red-700">
                      +94 77 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sri Lanka Time (GMT+5:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;