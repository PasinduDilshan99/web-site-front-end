"use client";
import React from "react";
import Image from "next/image";
import { COMPANY_NAME } from "@/utils/constant";

// Footer data interfaces
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Footer data
const footerData: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Home", href: "/" },
      { label: "Tour Packages", href: "/tour-packages" },
      { label: "Destinations", href: "/destinations" },
      { label: "Activities", href: "/activities" },
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Unlock Sri Lanka", href: "/unlock-sri-lanka" },
      { label: "Marvellous Sri Lanka", href: "/marvellous-sri-lanka" },
      { label: "Romantic Sri Lanka", href: "/romantic-sri-lanka" },
      { label: "Booking Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-3">
                {/* Logo placeholder - replace with actual logo */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">{COMPANY_NAME}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    TRAVELS
                  </div>
                </div>
              </div>
            </div>

            {/* Company Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Ceylon Empire Travels a leading travel agents in Sri Lanka
              offering Sri Lanka Tour Packages.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348s-1.051 2.348-2.348 2.348z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {footerData[0].links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData[1].links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Contacts</h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed">
                  colombo
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a
                  href="tel:+94770441887"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  +94 11111111
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <a
                  href="mailto:isurika@ceylonempireretr​avels.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm break-all"
                >
                  felicita@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright Text */}
            <div className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} {COMPANY_NAME}. All rights reserved.
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
