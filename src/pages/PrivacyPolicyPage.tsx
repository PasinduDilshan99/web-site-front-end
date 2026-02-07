"use client";
import React, { useState } from "react";

const PrivacyPolicyPage = () => {
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
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
              Introduction
            </h2>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              Welcome to our Sri Lankan travel agency. We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website, book our services, or interact with us in any way.
            </p>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
              By using our services, you agree to the collection and use of
              information in accordance with this policy. We encourage you to
              read this policy carefully to understand our practices.
            </p>
          </div>
        </div>

        {/* Privacy Sections - Accordion Style */}
        <div className="space-y-4 sm:space-y-6">
          {/* Section 1: Information We Collect */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("collect")}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Information We Collect
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "collect" ? "rotate-180" : ""
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
                activeSection === "collect" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">
                    Personal Information
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>Full name and contact details (email, phone number)</li>
                    <li>Passport information and nationality</li>
                    <li>Date of birth and age</li>
                    <li>Billing and payment information</li>
                    <li>Travel preferences and special requirements</li>
                    <li>Emergency contact information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">
                    Automatically Collected Information
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">
                    Information from Third Parties
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>Social media platforms (if you connect accounts)</li>
                    <li>Travel partners and service providers</li>
                    <li>Payment processors</li>
                    <li>Marketing and analytics providers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("use")}
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  How We Use Your Information
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "use" ? "rotate-180" : ""
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
                activeSection === "use" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-3 text-sm sm:text-base">
                <p className="font-semibold text-gray-900">
                  We use your information for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Service Delivery:</strong> To process bookings,
                    arrange travel activities, and provide customer support
                  </li>
                  <li>
                    <strong>Communication:</strong> To send booking confirmations,
                    travel updates, and respond to your inquiries
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> To process payments and
                    prevent fraudulent transactions
                  </li>
                  <li>
                    <strong>Personalization:</strong> To tailor our services and
                    recommendations to your preferences
                  </li>
                  <li>
                    <strong>Marketing:</strong> To send you promotional offers,
                    newsletters, and updates (with your consent)
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with Sri Lankan
                    laws and regulations
                  </li>
                  <li>
                    <strong>Safety and Security:</strong> To ensure the safety of
                    our travelers and prevent fraudulent activities
                  </li>
                  <li>
                    <strong>Analytics:</strong> To analyze website usage and
                    improve our services
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Information Sharing */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("sharing")}
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Information Sharing & Disclosure
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "sharing" ? "rotate-180" : ""
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
                activeSection === "sharing" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4">
                <p className="text-sm sm:text-base">
                  We may share your information with:
                </p>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Service Providers
                    </h4>
                    <p className="text-sm">
                      Hotels, tour operators, transportation companies, and other
                      travel-related service providers in Sri Lanka and abroad
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Payment Processors
                    </h4>
                    <p className="text-sm">
                      Secure payment gateways to process your transactions
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Legal Authorities
                    </h4>
                    <p className="text-sm">
                      When required by Sri Lankan law or to protect our legal
                      rights
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Business Transfers
                    </h4>
                    <p className="text-sm">
                      In connection with a merger, acquisition, or sale of assets
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base mt-4 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                  <strong>Note:</strong> We do not sell your personal information
                  to third parties for marketing purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Data Security */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("security")}
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Data Security
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "security" ? "rotate-180" : ""
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
                activeSection === "security" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>SSL/TLS encryption for data transmission</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure servers and firewalls</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Regular security audits and updates</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Access controls and authentication</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Data backup and recovery systems</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Employee training on data protection</span>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mt-4">
                  <p className="text-sm">
                    <strong>Important:</strong> While we strive to protect your
                    information, no method of transmission over the internet is
                    100% secure. We cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Your Rights */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("rights")}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Your Privacy Rights
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "rights" ? "rotate-180" : ""
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
                activeSection === "rights" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>You have the following rights regarding your personal data:</p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Access:</strong> Request a copy of the personal
                      information we hold about you
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Correction:</strong> Request correction of
                      inaccurate or incomplete information
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Deletion:</strong> Request deletion of your personal
                      data (subject to legal obligations)
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Objection:</strong> Object to processing of your
                      data for marketing purposes
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Portability:</strong> Request transfer of your data
                      to another service provider
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-purple-600 text-lg">→</span>
                    <div>
                      <strong>Withdrawal:</strong> Withdraw consent for data
                      processing at any time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Cookies */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("cookies")}
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Cookies & Tracking
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "cookies" ? "rotate-180" : ""
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
                activeSection === "cookies" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  We use cookies and similar technologies to enhance your
                  experience:
                </p>
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <strong className="text-gray-900">Essential Cookies:</strong>{" "}
                    Required for website functionality and security
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <strong className="text-gray-900">
                      Performance Cookies:
                    </strong>{" "}
                    Help us analyze website performance and usage
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <strong className="text-gray-900">
                      Functionality Cookies:
                    </strong>{" "}
                    Remember your preferences and settings
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <strong className="text-gray-900">Marketing Cookies:</strong>{" "}
                    Used to deliver personalized advertisements
                  </div>
                </div>
                <p className="bg-purple-50 p-4 rounded-lg">
                  You can control cookies through your browser settings. Note that
                  disabling cookies may affect website functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Data Retention */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleSection("retention")}
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Data Retention
                </h3>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                  activeSection === "retention" ? "rotate-180" : ""
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
                activeSection === "retention" ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-700 space-y-4 text-sm sm:text-base">
                <p>
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Fulfill the purposes outlined in this privacy policy</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Maintain business records and financial documentation</li>
                </ul>
                <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 sm:p-6 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Typical Retention Periods:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      • <strong>Booking Data:</strong> 7 years (for accounting
                      and tax purposes)
                    </p>
                    <p>
                      • <strong>Marketing Data:</strong> Until you unsubscribe or
                      request deletion
                    </p>
                    <p>
                      • <strong>Website Analytics:</strong> 26 months
                    </p>
                    <p>
                      • <strong>Customer Service Records:</strong> 3 years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        {/* <div className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we
              handle your personal information, please don&apos;t hesitate to contact
              us.
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
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Email</h3>
                <p className="text-xs sm:text-sm text-white/90">
                  privacy@youragency.lk
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
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Phone</h3>
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
        </div> */}

        {/* Footer Note */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 bg-white rounded-lg p-4 sm:p-6">
          <p>
            This Privacy Policy is governed by the laws of Sri Lanka. We reserve
            the right to update this policy at any time. Changes will be posted
            on this page with an updated revision date.
          </p>
          <p className="mt-3 sm:mt-4 font-semibold text-gray-800">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;