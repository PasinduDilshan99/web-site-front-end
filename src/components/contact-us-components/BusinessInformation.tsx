"use client";
import React from "react";
import { Shield, Award, FileCheck } from "lucide-react";

interface Certification {
  name: string;
  authority: string;
  number: string;
  icon: React.ReactNode;
}

const BusinessInformation = () => {
  const certifications: Certification[] = [
    {
      name: "Tourism License",
      authority: "Sri Lanka Tourism Development Authority",
      number: "SLTDA/LIC/2023/12345",
      icon: <Award className="w-5 h-5 text-blue-600" />,
    },
    {
      name: "IATA Accreditation",
      authority: "International Air Transport Association",
      number: "IATA/2024/56789",
      icon: <FileCheck className="w-5 h-5 text-green-600" />,
    },
    {
      name: "Business Registration",
      authority: "Department of Registrar of Companies",
      number: "DRC/COL/2010/78901",
      icon: <Shield className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted Travel Partner
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are a fully licensed and accredited travel agency committed to
            providing exceptional service and peace of mind for all your travel
            needs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Official Business Information */}
          <div className="space-y-8">
            {/* Business Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Official Business Information
              </h3>

              <div className="space-y-6">
                {/* Registered Business Name */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Registered Business Name
                    </h4>
                    <p className="text-gray-700 text-lg font-medium">
                      Felicita Travel & Tours (Pvt) Ltd
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Incorporated in 2010
                    </p>
                  </div>
                </div>

                {/* Company Registration */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Company Registration Number
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        PB 1234567
                      </span>
                      <span className="text-gray-700 font-medium">
                        Department of Registrar of Companies, Sri Lanka
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legal Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Legal Business Address
                    </h4>
                    <p className="text-gray-700">
                      123 Galle Road, Colombo 03, Sri Lanka
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Registered office for all legal correspondence
                    </p>
                  </div>
                </div>

                {/* VAT Registration */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Tax & VAT Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          VAT No: 123456789
                        </span>
                        <span className="text-gray-700">
                          Registered for VAT
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          TIN: 0987654321
                        </span>
                        <span className="text-gray-700">
                          Tax Identification Number
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Message */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">
                      Your Trust is Our Priority
                    </h4>
                    <p className="text-gray-700">
                      We are committed to providing transparent, reliable, and
                      professional travel services. All our operations are fully
                      compliant with Sri Lankan tourism regulations and
                      international travel standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Certifications & Licenses */}
          <div className="space-y-8">
            {/* Certifications & Licenses Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Certifications & Licenses
              </h3>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-lg group-hover:bg-white">
                        {cert.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {cert.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {cert.authority}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {cert.number}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">
                        Valid through 2025
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification Note */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-amber-800 text-sm">
                    All licenses and certifications can be verified with
                    respective authorities. For verification, please contact us
                    for official documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;