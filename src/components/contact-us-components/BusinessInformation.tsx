"use client";
import React from 'react';
import { Shield, Award, Users, Clock, FileCheck, CheckCircle } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

interface Certification {
  name: string;
  authority: string;
  number: string;
  icon: React.ReactNode;
}

const BusinessInformation = () => {
  const stats: StatItem[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "5,000+",
      label: "Happy Travelers",
      description: "Served since 2010"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "14+",
      label: "Years Experience",
      description: "Expert travel planning"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      value: "99%",
      label: "Satisfaction Rate",
      description: "Based on customer reviews"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: "24/7",
      label: "Support Available",
      description: "Emergency assistance"
    }
  ];

  const certifications: Certification[] = [
    {
      name: "Tourism License",
      authority: "Sri Lanka Tourism Development Authority",
      number: "SLTDA/LIC/2023/12345",
      icon: <Award className="w-5 h-5 text-blue-600" />
    },
    {
      name: "IATA Accreditation",
      authority: "International Air Transport Association",
      number: "IATA/2024/56789",
      icon: <FileCheck className="w-5 h-5 text-green-600" />
    },
    {
      name: "Business Registration",
      authority: "Department of Registrar of Companies",
      number: "DRC/COL/2010/78901",
      icon: <Shield className="w-5 h-5 text-purple-600" />
    }
  ];

  const awards = [
    "Best Travel Agency 2023 - Sri Lanka Tourism Awards",
    "Excellence in Customer Service 2022",
    "Top Sustainable Tourism Operator 2021"
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
            We are a fully licensed and accredited travel agency committed to providing 
            exceptional service and peace of mind for all your travel needs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Business Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Business Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Official Business Information
              </h3>
              
              <div className="space-y-6">
                {/* Registered Business Name */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Registered Business Name</h4>
                    <p className="text-gray-700 text-lg font-medium">Felicita Travel & Tours (Pvt) Ltd</p>
                    <p className="text-gray-600 text-sm mt-1">Incorporated in 2010</p>
                  </div>
                </div>

                {/* Company Registration */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Company Registration Number</h4>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        PB 1234567
                      </span>
                      <span className="text-gray-700 font-medium">Department of Registrar of Companies, Sri Lanka</span>
                    </div>
                  </div>
                </div>

                {/* Legal Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Legal Business Address</h4>
                    <p className="text-gray-700">123 Galle Road, Colombo 03, Sri Lanka</p>
                    <p className="text-gray-600 text-sm mt-1">Registered office for all legal correspondence</p>
                  </div>
                </div>

                {/* VAT Registration */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Tax & VAT Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          VAT No: 123456789
                        </span>
                        <span className="text-gray-700">Registered for VAT</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          TIN: 0987654321
                        </span>
                        <span className="text-gray-700">Tax Identification Number</span>
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
                      We are committed to providing transparent, reliable, and professional 
                      travel services. All our operations are fully compliant with Sri Lankan 
                      tourism regulations and international travel standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Licenses */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
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
                        <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                        <p className="text-gray-600 text-sm">{cert.authority}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {cert.number}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">Valid through 2025</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification Note */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-amber-800 text-sm">
                    All licenses and certifications can be verified with respective authorities. 
                    For verification, please contact us for official documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Awards */}
          <div className="space-y-8">
            {/* Statistics */}
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Our Track Record
              </h3>
              
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                      <div className="font-medium">{stat.label}</div>
                      {stat.description && (
                        <div className="text-sm text-blue-100 opacity-90">
                          {stat.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Message */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">
                    Trusted travel partner serving 5,000+ happy travelers
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Verified by thousands of satisfied customers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Awards & Recognition
              </h3>
              
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all group"
                  >
                    <div className="p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg group-hover:from-amber-200 group-hover:to-yellow-200">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{award}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium">
                          Awarded
                        </span>
                        <span className="text-gray-500 text-xs">Tourism Excellence</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership Logos */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Our Partners</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">IATA</div>
                      <div className="text-xs text-gray-600">Accredited Agent</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">SLTDA</div>
                      <div className="text-xs text-gray-600">Licensed Operator</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Why Choose Felicita Travel?
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fully licensed and insured travel agency</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">24/7 customer support and emergency assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Financial protection for your payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Professional liability coverage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto border border-blue-100">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Travel With Confidence
              </h3>
            </div>
            <p className="text-gray-600 max-w-2xl">
              When you choose Felicita Travel, you're choosing a partner you can trust. 
              Our licenses, certifications, and 14+ years of experience ensure your 
              journey is safe, reliable, and unforgettable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                View Our Certificates
              </button>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
                Read Testimonials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;