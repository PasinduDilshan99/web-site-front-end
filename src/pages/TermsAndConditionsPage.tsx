"use client";
import React, { useState } from "react";

const TermsAndConditionsPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const lastUpdated = "February 1, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full backdrop-blur-sm">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Please read these terms carefully before using our services and
            booking your adventures in Sri Lanka.
          </p>
          <div className="mt-4 sm:mt-6 text-sm sm:text-base text-white/80">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 lg:mb-10">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Welcome to Our Travel Agency
            </h2>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              These Terms and Conditions Terms govern your use of our
              website and services provided by our Sri Lankan travel agency
              we, us or our. By accessing our website or booking any
              of our services, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
              Please read these Terms carefully. If you do not agree with any
              part of these Terms, you should not use our services or website.
            </p>
          </div>
        </div>

        {/* Terms Sections - Accordion Style */}
        <div className="space-y-4 sm:space-y-6">
          {/* Section 1: Acceptance of Terms */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("acceptance")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Acceptance of Terms
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "acceptance" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "acceptance" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  By accessing and using our website or services, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these Terms and Conditions.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    You must be at least 18 years old to book our services
                  </li>
                  <li>
                    You agree to provide accurate and complete information
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account
                  </li>
                  <li>
                    You accept all risks associated with travel activities
                  </li>
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 mt-4">
                  <p className="text-sm">
                    <strong>Important:</strong> If you are booking on behalf of
                    others, you confirm that you have their authority to accept
                    these Terms on their behalf.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Booking & Reservations */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("booking")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Booking & Reservations
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "booking" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "booking" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Making a Booking
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    All bookings are subject to availability and confirmation
                  </li>
                  <li>
                    A booking is confirmed only when you receive written
                    confirmation from us
                  </li>
                  <li>
                    You must provide accurate personal and travel information
                  </li>
                  <li>
                    Prices are quoted in the currency specified at the time of
                    booking
                  </li>
                </ul>

                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mt-6">
                  Deposit and Payment
                </h4>
                <div className="bg-amber-50 p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Deposit:</strong> A non-refundable deposit of 30%
                    is required to confirm your booking
                  </p>
                  <p>
                    <strong>Full Payment:</strong> The balance must be paid at
                    least 30 days before the travel date
                  </p>
                  <p>
                    <strong>Late Bookings:</strong> Bookings made within 30
                    days of travel require full payment immediately
                  </p>
                </div>

                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mt-6">
                  Payment Methods
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Credit/Debit Cards</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Online Payment Gateways</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Cash (at office)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Cancellation & Refunds */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("cancellation")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Cancellation & Refunds
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "cancellation" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "cancellation" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Cancellation Policy
                </h4>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-gray-900 mb-1">
                      More than 60 days before travel
                    </p>
                    <p className="text-sm">
                      50% refund (deposit is non-refundable)
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-gray-900 mb-1">
                      30-60 days before travel
                    </p>
                    <p className="text-sm">25% refund</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="font-semibold text-gray-900 mb-1">
                      15-29 days before travel
                    </p>
                    <p className="text-sm">10% refund</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold text-gray-900 mb-1">
                      Less than 15 days before travel
                    </p>
                    <p className="text-sm">No refund</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Special Circumstances
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      Cancellations due to force majeure may be eligible for
                      rescheduling
                    </li>
                    <li>Medical emergencies require proper documentation</li>
                    <li>
                      Refunds will be processed within 14-21 business days
                    </li>
                    <li>
                      Travel insurance is highly recommended for all bookings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Travel Documents & Requirements */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("documents")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Travel Documents & Requirements
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "documents" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "documents" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Your Responsibilities
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Valid passport (minimum 6 months validity from travel date)
                  </li>
                  <li>
                    Appropriate visa for Sri Lanka (if required for your
                    nationality)
                  </li>
                  <li>Necessary travel insurance coverage</li>
                  <li>
                    Required vaccinations and health certificates (if
                    applicable)
                  </li>
                  <li>Compliance with Sri Lankan customs and immigration laws</li>
                </ul>

                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Important Notes:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      ⚠️ We are not responsible for any issues arising from
                      invalid or missing travel documents
                    </p>
                    <p>
                      ⚠️ Entry into Sri Lanka is at the discretion of
                      immigration authorities
                    </p>
                    <p>
                      ⚠️ Check with your local embassy for the latest travel
                      requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Liability & Insurance */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("liability")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Liability & Insurance
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "liability" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "liability" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Our Liability
                </h4>
                <p>
                  We act as an intermediary between you and service providers
                  (hotels, transport companies, activity operators, etc.). Our
                  liability is limited to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Arranging bookings and reservations as requested</li>
                  <li>
                    Providing accurate information to the best of our knowledge
                  </li>
                  <li>Selecting reputable service providers</li>
                </ul>

                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mt-6">
                  Limitations of Liability
                </h4>
                <div className="bg-amber-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm">
                    We are NOT liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Acts of third-party service providers</li>
                    <li>Force majeure events (natural disasters, pandemics, political unrest)</li>
                    <li>Personal injury, illness, or death during activities</li>
                    <li>Loss or damage to personal property</li>
                    <li>Delays or cancellations by transport providers</li>
                    <li>Changes in service quality by third parties</li>
                  </ul>
                </div>

                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mt-6">
                  Travel Insurance
                </h4>
                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="font-semibold text-gray-900 mb-2">
                    HIGHLY RECOMMENDED
                  </p>
                  <p className="text-sm">
                    We strongly recommend that all travelers purchase
                    comprehensive travel insurance covering:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Trip cancellation and interruption</li>
                    <li>Medical expenses and emergency evacuation</li>
                    <li>Lost or delayed baggage</li>
                    <li>Personal liability</li>
                    <li>Adventure activities (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Changes & Modifications */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("changes")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Changes & Modifications
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "changes" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "changes" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Changes by You
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Changes must be requested in writing (email)</li>
                  <li>Subject to availability and third-party policies</li>
                  <li>
                    Amendment fees apply (minimum LKR 5,000 per booking)
                  </li>
                  <li>
                    Additional costs incurred by service providers will be
                    charged
                  </li>
                  <li>Changes within 15 days of travel may not be possible</li>
                </ul>

                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mt-6">
                  Changes by Us
                </h4>
                <p>
                  We reserve the right to make changes to your itinerary due to:
                </p>
                <div className="space-y-3 mt-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Force Majeure:</strong> Natural disasters, political unrest, pandemics
                    </p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Service Provider Issues:</strong> Cancellations or changes by hotels/operators
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Safety Concerns:</strong> Weather conditions, security advisories
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-4 bg-amber-50 p-4 rounded-lg">
                  In such cases, we will provide alternative arrangements of
                  similar or better standard where possible, or offer a refund
                  for affected services.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Conduct & Behavior */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("conduct")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Traveler Conduct & Behavior
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "conduct" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "conduct" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>All travelers are expected to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Respect local customs, traditions, and cultural sensitivities
                  </li>
                  <li>Follow all local laws and regulations in Sri Lanka</li>
                  <li>Treat service providers and other travelers with respect</li>
                  <li>Follow safety instructions from guides and operators</li>
                  <li>Be punctual for scheduled activities and pickups</li>
                  <li>Take care of property and the environment</li>
                </ul>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Prohibited Behavior
                  </h4>
                  <p className="text-sm mb-2">
                    The following may result in immediate termination of services
                    without refund:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Illegal activities or possession of prohibited items</li>
                    <li>
                      Aggressive, abusive, or threatening behavior toward staff
                      or others
                    </li>
                    <li>Damage to property or environment</li>
                    <li>
                      Being under the influence of alcohol/drugs during
                      activities
                    </li>
                    <li>Disregard for safety instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Intellectual Property */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("intellectual")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Intellectual Property
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "intellectual" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "intellectual" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  All content on our website, including but not limited to text,
                  images, logos, graphics, and designs, is the property of our
                  travel agency and is protected by copyright and intellectual
                  property laws.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    You may not copy, reproduce, or distribute our content
                    without permission
                  </li>
                  <li>
                    Our itineraries and tour designs are proprietary information
                  </li>
                  <li>
                    Unauthorized commercial use of our materials is prohibited
                  </li>
                  <li>You may use content for personal, non-commercial purposes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 9: Governing Law */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("law")}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Governing Law & Disputes
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "law" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === "law" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  These Terms and Conditions are governed by the laws of Sri
                  Lanka. Any disputes arising from these Terms or your use of our
                  services shall be subject to the exclusive jurisdiction of the
                  courts of Colombo, Sri Lanka.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Dispute Resolution
                  </h4>
                  <p className="text-sm">
                    We encourage customers to contact us directly to resolve any
                    concerns. If a dispute cannot be resolved amicably, it will
                    be settled through arbitration in accordance with Sri Lankan
                    law.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Questions About Our Terms?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
              If you have any questions about these Terms and Conditions, please
              contact us.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                  Email
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  info@youragency.lk
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                  Phone
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  +94 11 234 5678
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                  Address
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  Colombo, Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 bg-white rounded-lg p-4 sm:p-6">
          <p>
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
          <p className="mt-3 sm:mt-4 font-semibold text-gray-800">
            Last Updated: {lastUpdated}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            We reserve the right to modify these terms at any time. Continued
            use of our services constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;