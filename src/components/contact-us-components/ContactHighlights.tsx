"use client";
import React, { useState, useEffect } from "react";
import { ContactService } from "@/services/contactService";
import { ContactMethod } from "@/types/contact-types";
import ContactHighlightsLoading from "./ContactHighlightsLoading";

const ContactHighlights = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContactMethods();
  }, []);

  const fetchContactMethods = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: methods, error } =
        await ContactService.fetchContactMethods();

      if (error) {
        throw new Error(error);
      }

      setContactMethods(methods || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching contact methods:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "phone":
        return (
          <svg
            className="w-6 h-6"
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
        );

      case "clock":
        return (
          <svg
            className="w-6 h-6"
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
        );

      case "location":
        return (
          <svg
            className="w-6 h-6"
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
        );

      case "email":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );

      case "whatsapp":
        return (
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-green-500"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
            </svg>
          </div>
        );

      case "emergency":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );

      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        );
    }
  };

  const handleContactAction = (method: ContactMethod) => {
    if (method.link) {
      if (method.action === "whatsapp" || method.action === "location") {
        window.open(method.link, "_blank");
      } else {
        window.location.href = method.link;
      }
    } else if (method.action === "email") {
      copyToClipboard(method.value, "email");
    } else if (method.action === "hours") {
      console.log("Working hours clicked");
    }
  };

  const getActionButton = (method: ContactMethod) => {
    switch (method.action) {
      case "call":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Now
          </button>
        );

      case "whatsapp":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-lg hover:from-green-600 hover:to-teal-500 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            Chat on WhatsApp
          </button>
        );

      case "email":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {copied === "email" ? "Copied!" : "Copy Email"}
          </button>
        );

      case "location":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Get Directions
          </button>
        );

      case "emergency":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg animate-pulse"
          >
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
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Emergency Call
          </button>
        );

      case "hours":
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-400 text-white rounded-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Hours
          </button>
        );

      default:
        return (
          <button
            onClick={() => handleContactAction(method)}
            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
          >
            Contact
          </button>
        );
    }
  };

  if (loading) {
    return <ContactHighlightsLoading />;
  }

  if (error) {
    return (
      <div className="py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">
            Error loading contact information
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchContactMethods}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const emergencyContact = contactMethods.find(
    (method) => method.action === "emergency",
  );
  const mainPhoneContact = contactMethods.find(
    (method) => method.action === "call",
  );
  const whatsappContact = contactMethods.find(
    (method) => method.action === "whatsapp",
  );

  return (
    <div className="py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Quick Contact Options
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-md lg:text-lg">
            Choose your preferred way to get in touch with our travel experts.
            We&apos;re available through multiple channels for your convenience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className={`relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                method.highlight
                  ? "bg-gradient-to-br from-red-50 to-white border-2 border-red-200"
                  : "bg-white border border-blue-100"
              }`}
            >
              {/* Highlight Badge */}
              {method.highlight && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 sm:px-4 py-0.5 sm:py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full animate-pulse shadow-md">
                    24/7 Available
                  </span>
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`inline-flex p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                  method.highlight
                    ? "bg-gradient-to-r from-red-100 to-red-50 text-red-600"
                    : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600"
                } shadow-md`}
              >
                {getIconComponent(method.icon)}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                {method.title}
              </h3>

              {/* Value */}
              <div className="mb-2">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {method.value}
                </p>
                {method.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {method.description}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4 sm:mt-5 md:mt-6">
                {getActionButton(method)}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-blue-100 text-md lg:text-lg">
                Our travel consultants are standing by to help you plan your
                perfect journey.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {mainPhoneContact && (
                <a
                  href={mainPhoneContact.link || "#"}
                  className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
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
                  Call Now
                </a>
              )}
              {whatsappContact && (
                <a
                  href={whatsappContact.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold rounded-lg hover:from-green-600 hover:to-teal-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Timezone Information */}
        <div className="mt-8 text-center text-gray-600">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full shadow-sm">
            <svg
              className="w-5 h-5 text-blue-600"
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
            <span className="text-sm font-medium text-blue-800">
              Sri Lanka Time (GMT+5:30) • We respond within 15 minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHighlights;
