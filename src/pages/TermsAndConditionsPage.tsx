"use client";
import React, { useState } from "react";

const TermsAndConditionsPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const lastUpdated = "February 1, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            By accessing and using our website or services, you acknowledge that
            you have read, understood, and agree to be bound by these Terms and
            Conditions.
          </p>
          <ul className="space-y-1.5">
            {[
              "You must be at least 18 years old to book our services",
              "You agree to provide accurate and complete information",
              "You are responsible for maintaining the confidentiality of your account",
              "You accept all risks associated with travel activities",
            ].map((item) => (
              <li key={item} className="flex items-start space-x-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--sea-green)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div
            className="p-4 rounded-xl border-l-4 text-sm font-medium"
            style={{
              borderColor: "var(--sea-blue)",
              background: "var(--sea-blue-pale)",
              color: "var(--sea-blue-dark)",
            }}
          >
            <strong>Important:</strong> If you are booking on behalf of others,
            you confirm that you have their authority to accept these Terms on
            their behalf.
          </div>
        </div>
      ),
    },
    {
      id: "booking",
      title: "Booking & Reservations",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
      content: (
        <div className="space-y-5 text-sm sm:text-base text-gray-600">
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Making a Booking
            </h4>
            <ul className="space-y-1.5">
              {[
                "All bookings are subject to availability and confirmation",
                "A booking is confirmed only when you receive written confirmation from us",
                "You must provide accurate personal and travel information",
                "Prices are quoted in the currency specified at the time of booking",
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
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Deposit and Payment
            </h4>
            <div
              className="rounded-xl p-4 space-y-2 border"
              style={{
                background: "rgba(14,158,142,0.05)",
                borderColor: "var(--sea-blue-border)",
              }}
            >
              {[
                {
                  label: "Deposit",
                  desc: "A non-refundable deposit of 30% is required to confirm your booking.",
                },
                {
                  label: "Full Payment",
                  desc: "The balance must be paid at least 30 days before the travel date.",
                },
                {
                  label: "Late Bookings",
                  desc: "Bookings made within 30 days of travel require full payment immediately.",
                },
              ].map(({ label, desc }) => (
                <p key={label} className="text-sm">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--sea-green-dark)" }}
                  >
                    {label}:
                  </span>{" "}
                  {desc}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Payment Methods
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Credit / Debit Cards",
                "Bank Transfer",
                "Online Payment Gateways",
                "Cash (at office)",
              ].map((method) => (
                <div
                  key={method}
                  className="flex items-center space-x-2 p-3 rounded-lg border text-sm"
                  style={{
                    borderColor: "var(--sea-blue-border)",
                    background: "var(--sea-blue-pale)",
                  }}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--sea-blue)" }}
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
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cancellation",
      title: "Cancellation & Refunds",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <h4
            className="font-semibold"
            style={{ color: "var(--sea-blue-dark)" }}
          >
            Cancellation Policy
          </h4>
          <div className="space-y-2">
            {[
              {
                period: "More than 60 days before travel",
                refund: "50% refund (deposit is non-refundable)",
                color: "var(--sea-green)",
              },
              {
                period: "30–60 days before travel",
                refund: "25% refund",
                color: "var(--sea-blue)",
              },
              {
                period: "15–29 days before travel",
                refund: "10% refund",
                color: "#f59e0b",
              },
              {
                period: "Less than 15 days before travel",
                refund: "No refund",
                color: "#ef4444",
              },
            ].map(({ period, refund, color }) => (
              <div
                key={period}
                className="flex items-start p-3 rounded-xl border-l-4"
                style={{
                  borderColor: color,
                  background: "rgba(11,126,168,0.03)",
                }}
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {period}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">{refund}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-xl border"
            style={{
              background: "rgba(14,158,142,0.05)",
              borderColor: "var(--sea-blue-border)",
            }}
          >
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-green-dark)" }}
            >
              Special Circumstances
            </h4>
            <ul className="space-y-1.5">
              {[
                "Cancellations due to force majeure may be eligible for rescheduling",
                "Medical emergencies require proper documentation",
                "Refunds will be processed within 14–21 business days",
                "Travel insurance is highly recommended for all bookings",
              ].map((item) => (
                <li key={item} className="flex items-start space-x-2 text-sm">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sea-green)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "documents",
      title: "Travel Documents & Requirements",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <h4
            className="font-semibold"
            style={{ color: "var(--sea-blue-dark)" }}
          >
            Your Responsibilities
          </h4>
          <ul className="space-y-1.5">
            {[
              "Valid passport (minimum 6 months validity from travel date)",
              "Appropriate visa for Sri Lanka (if required for your nationality)",
              "Necessary travel insurance coverage",
              "Required vaccinations and health certificates (if applicable)",
              "Compliance with Sri Lankan customs and immigration laws",
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
            className="p-4 rounded-xl border-l-4 space-y-2"
            style={{ borderColor: "#f59e0b", background: "#fffbeb" }}
          >
            <h4 className="font-semibold text-amber-800">Important Notes</h4>
            {[
              "We are not responsible for any issues arising from invalid or missing travel documents.",
              "Entry into Sri Lanka is at the discretion of immigration authorities.",
              "Check with your local embassy for the latest travel requirements.",
            ].map((note) => (
              <p key={note} className="text-sm text-amber-700">
                ⚠ {note}
              </p>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "liability",
      title: "Liability & Insurance",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
      content: (
        <div className="space-y-5 text-sm sm:text-base text-gray-600">
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Our Liability
            </h4>
            <p className="mb-2">
              We act as an intermediary between you and service providers. Our
              liability is limited to:
            </p>
            <ul className="space-y-1.5">
              {[
                "Arranging bookings and reservations as requested",
                "Providing accurate information to the best of our knowledge",
                "Selecting reputable service providers",
              ].map((item) => (
                <li key={item} className="flex items-start space-x-2">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sea-green)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Limitations of Liability
            </h4>
            <div
              className="p-4 rounded-xl border"
              style={{
                background: "rgba(14,158,142,0.05)",
                borderColor: "var(--sea-blue-border)",
              }}
            >
              <p
                className="font-medium text-sm mb-2"
                style={{ color: "var(--sea-green-dark)" }}
              >
                We are NOT liable for:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Acts of third-party service providers",
                  "Force majeure events (natural disasters, pandemics, political unrest)",
                  "Personal injury, illness, or death during activities",
                  "Loss or damage to personal property",
                  "Delays or cancellations by transport providers",
                  "Changes in service quality by third parties",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#ef4444" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Travel Insurance
            </h4>
            <div
              className="p-4 rounded-xl border-l-4"
              style={{
                borderColor: "var(--sea-blue)",
                background: "var(--sea-blue-pale)",
              }}
            >
              <p
                className="font-semibold text-sm mb-2"
                style={{ color: "var(--sea-blue-dark)" }}
              >
                HIGHLY RECOMMENDED
              </p>
              <p className="text-sm mb-2">
                We strongly recommend all travelers purchase comprehensive
                travel insurance covering:
              </p>
              <ul className="space-y-1">
                {[
                  "Trip cancellation and interruption",
                  "Medical expenses and emergency evacuation",
                  "Lost or delayed baggage",
                  "Personal liability",
                  "Adventure activities (if applicable)",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--sea-blue)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes & Modifications",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      ),
      content: (
        <div className="space-y-5 text-sm sm:text-base text-gray-600">
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Changes by You
            </h4>
            <ul className="space-y-1.5">
              {[
                "Changes must be requested in writing (email)",
                "Subject to availability and third-party policies",
                "Amendment fees apply (minimum LKR 5,000 per booking)",
                "Additional costs incurred by service providers will be charged",
                "Changes within 15 days of travel may not be possible",
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
          </div>
          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Changes by Us
            </h4>
            <p className="mb-3">
              We reserve the right to make changes to your itinerary due to:
            </p>
            <div className="space-y-2">
              {[
                {
                  label: "Force Majeure",
                  desc: "Natural disasters, political unrest, pandemics",
                  color: "var(--sea-blue)",
                },
                {
                  label: "Service Provider Issues",
                  desc: "Cancellations or changes by hotels/operators",
                  color: "var(--sea-green)",
                },
                {
                  label: "Safety Concerns",
                  desc: "Weather conditions, security advisories",
                  color: "var(--sea-blue)",
                },
              ].map(({ label, desc, color }) => (
                <div
                  key={label}
                  className="p-3 rounded-lg border-l-4 text-sm"
                  style={{
                    borderColor: color,
                    background: "rgba(11,126,168,0.03)",
                  }}
                >
                  <span className="font-semibold text-gray-800">{label}: </span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <div
              className="mt-3 p-4 rounded-xl text-sm"
              style={{
                background: "rgba(14,158,142,0.06)",
                color: "var(--sea-green-dark)",
              }}
            >
              In such cases, we will provide alternative arrangements of similar
              or better standard where possible, or offer a refund for affected
              services.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "conduct",
      title: "Traveler Conduct & Behavior",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>All travelers are expected to:</p>
          <ul className="space-y-1.5">
            {[
              "Respect local customs, traditions, and cultural sensitivities",
              "Follow all local laws and regulations in Sri Lanka",
              "Treat service providers and other travelers with respect",
              "Follow safety instructions from guides and operators",
              "Be punctual for scheduled activities and pickups",
              "Take care of property and the environment",
            ].map((item) => (
              <li key={item} className="flex items-start space-x-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--sea-green)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-xl border-l-4 bg-red-50 border-red-400">
            <h4 className="font-semibold text-red-800 mb-2">
              Prohibited Behavior
            </h4>
            <p className="text-sm text-red-700 mb-2">
              The following may result in immediate termination of services
              without refund:
            </p>
            <ul className="space-y-1">
              {[
                "Illegal activities or possession of prohibited items",
                "Aggressive, abusive, or threatening behavior toward staff or others",
                "Damage to property or the environment",
                "Being under the influence of alcohol or drugs during activities",
                "Disregard for safety instructions",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start space-x-2 text-sm text-red-700"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
      content: (
        <div className="space-y-3 text-sm sm:text-base text-gray-600">
          <p>
            All content on our website — including text, images, logos,
            graphics, and designs — is the property of our travel agency and is
            protected by copyright and intellectual property laws.
          </p>
          <ul className="space-y-1.5">
            {[
              "You may not copy, reproduce, or distribute our content without permission",
              "Our itineraries and tour designs are proprietary information",
              "Unauthorized commercial use of our materials is prohibited",
              "You may use content for personal, non-commercial purposes",
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
        </div>
      ),
    },
    {
      id: "law",
      title: "Governing Law & Disputes",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      ),
      content: (
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <p>
            These Terms and Conditions are governed by the laws of Sri Lanka.
            Any disputes arising from these Terms or your use of our services
            shall be subject to the exclusive jurisdiction of the courts of
            Colombo, Sri Lanka.
          </p>
          <div
            className="p-4 rounded-xl border-l-4"
            style={{
              borderColor: "var(--sea-blue)",
              background: "var(--sea-blue-pale)",
            }}
          >
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Dispute Resolution
            </h4>
            <p className="text-sm">
              We encourage customers to contact us directly to resolve any
              concerns. If a dispute cannot be resolved amicably, it will be
              settled through arbitration in accordance with Sri Lankan law.
            </p>
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
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-10 bg-white" />
          <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 rounded-full opacity-10 bg-white" />

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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services and
              booking your adventures in Sri Lanka.
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
                Welcome to Our Travel Agency
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              These Terms and Conditions govern your use of our website and
              services provided by our Sri Lankan travel agency. By accessing
              our website or booking any of our services, you agree to be bound
              by these Terms.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
              Please read these Terms carefully. If you do not agree with any
              part of these Terms, you should not use our services or website.
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
              By using our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
            <p
              className="mt-3 font-semibold"
              style={{ color: "var(--sea-blue-dark)" }}
            >
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              We reserve the right to modify these terms at any time. Continued
              use of our services constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
