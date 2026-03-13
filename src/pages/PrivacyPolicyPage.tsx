"use client";
import React, { useState } from "react";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const lastUpdated = "February 1, 2026";

  const sections = [
    {
      id: "collect",
      title: "Information We Collect",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
      content: (
        <div className="space-y-5">
          {[
            {
              title: "Personal Information",
              items: [
                "Full name and contact details (email, phone number)",
                "Passport information and nationality",
                "Date of birth and age",
                "Billing and payment information",
                "Travel preferences and special requirements",
                "Emergency contact information",
              ],
            },
            {
              title: "Automatically Collected Information",
              items: [
                "IP address and device information",
                "Browser type and version",
                "Pages visited and time spent on our website",
                "Referring website addresses",
                "Cookies and similar tracking technologies",
              ],
            },
            {
              title: "Information from Third Parties",
              items: [
                "Social media platforms (if you connect accounts)",
                "Travel partners and service providers",
                "Payment processors",
                "Marketing and analytics providers",
              ],
            },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4
                className="font-semibold text-base sm:text-lg mb-2"
                style={{ color: "var(--sea-blue-dark)" }}
              >
                {title}
              </h4>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start space-x-2 text-sm sm:text-base text-gray-600"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--sea-green)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "use",
      title: "How We Use Your Information",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      content: (
        <div className="space-y-3 text-sm sm:text-base text-gray-600">
          <p
            className="font-semibold"
            style={{ color: "var(--sea-blue-dark)" }}
          >
            We use your information for the following purposes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                label: "Service Delivery",
                desc: "Process bookings, arrange travel activities, and provide customer support",
              },
              {
                label: "Communication",
                desc: "Send booking confirmations, travel updates, and respond to inquiries",
              },
              {
                label: "Payment Processing",
                desc: "Process payments and prevent fraudulent transactions",
              },
              {
                label: "Personalization",
                desc: "Tailor our services and recommendations to your preferences",
              },
              {
                label: "Marketing",
                desc: "Send promotional offers and newsletters (with your consent)",
              },
              {
                label: "Legal Compliance",
                desc: "Comply with Sri Lankan laws and regulations",
              },
              {
                label: "Safety & Security",
                desc: "Ensure traveler safety and prevent fraudulent activities",
              },
              {
                label: "Analytics",
                desc: "Analyze website usage and continuously improve our services",
              },
            ].map(({ label, desc }) => (
              <div
                key={label}
                className="p-3 rounded-lg border"
                style={{
                  borderColor: "var(--sea-blue-border)",
                  background: "var(--sea-blue-pale)",
                }}
              >
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--sea-blue)" }}
                >
                  {label}
                </p>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "Information Sharing & Disclosure",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>We may share your information with the following parties:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Service Providers",
                desc: "Hotels, tour operators, transportation companies, and other travel-related providers in Sri Lanka and abroad.",
              },
              {
                title: "Payment Processors",
                desc: "Secure payment gateways used to process your transactions safely.",
              },
              {
                title: "Legal Authorities",
                desc: "When required by Sri Lankan law or to protect our legal rights and obligations.",
              },
              {
                title: "Business Transfers",
                desc: "In connection with a merger, acquisition, or sale of company assets.",
              },
            ].map(({ title, desc }, i) => (
              <div
                key={title}
                className="p-4 rounded-xl border-l-4"
                style={{
                  borderColor:
                    i % 2 === 0 ? "var(--sea-blue)" : "var(--sea-green)",
                  background:
                    i % 2 === 0
                      ? "rgba(11,126,168,0.04)"
                      : "rgba(14,158,142,0.04)",
                }}
              >
                <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-xl border-l-4 font-medium text-sm"
            style={{
              borderColor: "var(--sea-green)",
              background: "rgba(14,158,142,0.06)",
              color: "var(--sea-green-dark)",
            }}
          >
            We do not sell your personal information to third parties for
            marketing purposes.
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Data Security",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "SSL/TLS encryption for data transmission",
              "Secure servers and firewalls",
              "Regular security audits and updates",
              "Access controls and authentication",
              "Data backup and recovery systems",
              "Employee training on data protection",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start space-x-3 p-3 rounded-lg"
                style={{ background: "rgba(11,126,168,0.04)" }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "var(--sea-green)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-400 text-sm text-amber-800">
            <strong>Important:</strong> While we strive to protect your
            information, no method of transmission over the internet is 100%
            secure. We cannot guarantee absolute security.
          </div>
        </div>
      ),
    },
    {
      id: "rights",
      title: "Your Privacy Rights",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      content: (
        <div className="space-y-3 text-sm sm:text-base text-gray-600">
          <p>You have the following rights regarding your personal data:</p>
          <div className="space-y-2">
            {[
              {
                right: "Access",
                desc: "Request a copy of the personal information we hold about you.",
              },
              {
                right: "Correction",
                desc: "Request correction of inaccurate or incomplete information.",
              },
              {
                right: "Deletion",
                desc: "Request deletion of your personal data (subject to legal obligations).",
              },
              {
                right: "Objection",
                desc: "Object to processing of your data for marketing purposes.",
              },
              {
                right: "Portability",
                desc: "Request transfer of your data to another service provider.",
              },
              {
                right: "Withdrawal",
                desc: "Withdraw consent for data processing at any time.",
              },
            ].map(({ right, desc }) => (
              <div
                key={right}
                className="flex items-start space-x-3 p-3 rounded-lg border"
                style={{ borderColor: "var(--sea-blue-border)" }}
              >
                <span
                  className="font-bold text-sm px-2 py-0.5 rounded-md text-white flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--sea-blue), var(--sea-green))",
                  }}
                >
                  {right}
                </span>
                <span className="text-gray-600 text-sm">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience:
          </p>
          <div className="space-y-2">
            {[
              {
                type: "Essential Cookies",
                desc: "Required for website functionality and security.",
                color: "var(--sea-blue)",
              },
              {
                type: "Performance Cookies",
                desc: "Help us analyze website performance and usage patterns.",
                color: "var(--sea-green)",
              },
              {
                type: "Functionality Cookies",
                desc: "Remember your preferences and personalized settings.",
                color: "var(--sea-blue)",
              },
              {
                type: "Marketing Cookies",
                desc: "Used to deliver relevant and personalized advertisements.",
                color: "var(--sea-green)",
              },
            ].map(({ type, desc, color }) => (
              <div
                key={type}
                className="flex items-start space-x-3 border-l-4 pl-4 py-2"
                style={{ borderColor: color }}
              >
                <div>
                  <span className="font-semibold text-gray-800">{type}: </span>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-xl text-sm"
            style={{
              background: "var(--sea-blue-pale)",
              color: "var(--sea-blue-dark)",
            }}
          >
            You can control cookies through your browser settings. Note that
            disabling certain cookies may affect website functionality.
          </div>
        </div>
      ),
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            We retain your personal information for as long as necessary to:
          </p>
          <ul className="space-y-1.5">
            {[
              "Fulfill the purposes outlined in this privacy policy",
              "Comply with legal and regulatory requirements",
              "Resolve disputes and enforce our agreements",
              "Maintain business records and financial documentation",
            ].map((item) => (
              <li key={item} className="flex items-start space-x-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--sea-blue)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div
            className="rounded-xl p-5 mt-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,126,168,0.06), rgba(14,158,142,0.06))",
              border: "1px solid var(--sea-blue-border)",
            }}
          >
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Typical Retention Periods
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                { label: "Booking Data", period: "7 years (accounting & tax)" },
                {
                  label: "Marketing Data",
                  period: "Until unsubscription or deletion request",
                },
                { label: "Website Analytics", period: "26 months" },
                { label: "Customer Service Records", period: "3 years" },
              ].map(({ label, period }) => (
                <div key={label} className="flex items-start space-x-2">
                  <span className="font-semibold text-gray-700 flex-shrink-0">
                    {label}:
                  </span>
                  <span className="text-gray-600">{period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --sea-blue: #0b7ea8;
          --sea-blue-dark: #095f82;
          --sea-blue-light: #3aadd4;
          --sea-blue-pale: #e0f4fb;
          --sea-blue-border: #b3e0f2;
          --sea-green: #0e9e8e;
          --sea-green-dark: #0b7d70;
          --sea-green-light: #3dbfb1;
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #f0f9ff 0%, #e0f4fb 40%, #e6faf8 100%)",
        }}
      >
        {/* Hero */}
        <div
          className="text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #064e6e 0%, #0B7EA8 50%, #0E9E8E 100%)",
          }}
        >
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 opacity-20">
            <svg
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              className="w-full h-10"
            >
              <path
                d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
                fill="white"
              />
            </svg>
          </div>
          {/* Decorative circles */}
          <div
            className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-10"
            style={{ background: "white" }}
          />
          <div
            className="absolute bottom-[-20px] left-[-20px] w-48 h-48 rounded-full opacity-10"
            style={{ background: "white" }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-5 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and
              protect your personal information.
            </p>
            <div className="mt-5 inline-flex items-center space-x-2 text-sm text-white/70 bg-white/10 px-4 py-2 rounded-full">
              <svg
                className="w-4 h-4"
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
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Introduction */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-10 mb-8 border"
            style={{ borderColor: "var(--sea-blue-border)" }}
          >
            <div className="flex items-center space-x-3 mb-5">
              <div
                className="w-1 h-8 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--sea-blue), var(--sea-green))",
                }}
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Introduction
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Welcome to our Sri Lankan travel agency. We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website, book our services, or interact with us in any way.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
              By using our services, you agree to the collection and use of
              information in accordance with this policy. We encourage you to
              read this policy carefully to understand our practices.
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border"
                style={{
                  borderColor:
                    activeSection === section.id
                      ? "var(--sea-blue-border)"
                      : "transparent",
                }}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(135deg, var(--sea-blue), var(--sea-blue-light))"
                            : "linear-gradient(135deg, var(--sea-green), var(--sea-green-light))",
                      }}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {section.icon}
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        activeSection === section.id
                          ? "var(--sea-blue-pale)"
                          : "#f3f4f6",
                      transform:
                        activeSection === section.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{
                        color:
                          activeSection === section.id
                            ? "var(--sea-blue)"
                            : "#6b7280",
                      }}
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
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${activeSection === section.id ? "max-h-[3000px]" : "max-h-0"}`}
                >
                  <div className="px-6 sm:px-8 pb-7 pt-2">
                    <div
                      className="h-px w-full mb-5"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--sea-blue-border), transparent)",
                      }}
                    />
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div
            className="mt-10 text-center text-xs sm:text-sm text-gray-500 bg-white rounded-xl p-5 sm:p-6 border"
            style={{ borderColor: "var(--sea-blue-border)" }}
          >
            <p className="leading-relaxed">
              This Privacy Policy is governed by the laws of Sri Lanka. We
              reserve the right to update this policy at any time. Changes will
              be posted on this page with an updated revision date.
            </p>
            <p
              className="mt-3 font-semibold"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
