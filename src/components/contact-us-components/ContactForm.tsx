"use client";
import React, { useState, useEffect, useRef } from "react";
import ContactWorkingHours from "./ContactWorkingHours";
import ContactTimeZone from "./ContactTimeZone";
import ContactResponseTime from "./ContactResponseTime";
import ContactTipsForQuickResponse from "./ContactTipsForQuickResponse";
import { countries, Country } from "@/utils/countries";
import Inquire from "@/app/components/inquire/Inquire";
import LocationDetails from "@/app/components/inquire/LocationDetails";
import { COMPANY_CONTACT_NUMBER } from "@/utils/constant";
import { InquiryService } from "@/services/inquiryService"; // Import service
import { 
  InquiryFormData, 
  InquiryFormErrors 
} from "@/types/inquiry-types"; // Import types

interface FormData extends InquiryFormData {
  fullName: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  preferredContactMethod: string | null;
  preferredDestination: string | null;
  adults: number;
  kids: number;
  arrivalDate: string;
  departureDate: string;
  message: string;
}

interface FormErrors extends InquiryFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredContactMethod?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    preferredContactMethod: "",
    preferredDestination: "",
    adults: 1,
    kids: 0,
    arrivalDate: "",
    departureDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Country selector states
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const contactMethods = [
    { value: "", label: "Select Preferred Contact Method" },
    { value: "WHATSAPP", label: "WhatsApp" },
    { value: "EMAIL", label: "Email" },
    { value: "CALL", label: "Phone Call" },
  ];

  const destinations = [
    { value: "", label: "Select Destination" },
    { value: "colombo", label: "Colombo & West Coast" },
    { value: "galle", label: "Galle & South Coast" },
    { value: "kandy", label: "Kandy & Hill Country" },
    { value: "anuradhapura", label: "Anuradhapura & Cultural Triangle" },
    { value: "trincomalee", label: "Trincomalee & East Coast" },
    { value: "ella", label: "Ella & Tea Country" },
    { value: "jaffna", label: "Jaffna & North" },
    { value: "multiple", label: "Multiple Destinations" },
    { value: "custom", label: "Custom Itinerary" },
  ];

  const adultOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const kidOptions = Array.from({ length: 11 }, (_, i) => i);

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set selected country when country code changes in formData
  useEffect(() => {
    if (formData.country) {
      const country = countries.find((c) => c.code === formData.country);
      setSelectedCountry(country || null);
      if (country) {
        setSearchTerm(country.name);
      }
    } else {
      setSelectedCountry(null);
      setSearchTerm("");
    }
  }, [formData.country]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showCountryDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showCountryDropdown]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name is always required
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation based on preferred contact method
    if (formData.preferredContactMethod === "EMAIL") {
      if (!formData.email?.trim()) {
        newErrors.email =
          "Email is required when selecting email as contact method";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Phone validation based on preferred contact method
    if (
      formData.preferredContactMethod === "WHATSAPP" ||
      formData.preferredContactMethod === "CALL"
    ) {
      if (!formData.phone?.trim()) {
        newErrors.phone =
          "Phone number is required for WhatsApp or Phone Call contact methods";
      }
    }

    // If no contact method selected, require either email or phone
    if (!formData.preferredContactMethod) {
      if (!formData.email?.trim() && !formData.phone?.trim()) {
        newErrors.email =
          "Please provide either email or phone number when no contact method is selected";
        newErrors.phone =
          "Please provide either email or phone number when no contact method is selected";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "adults" || name === "kids") {
      const numValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue >= 0 ? numValue : name === "adults" ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCountrySearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!showCountryDropdown && value.length > 0) {
      setShowCountryDropdown(true);
    }

    // Clear selected country if search doesn't match
    if (
      selectedCountry &&
      !value.toLowerCase().includes(selectedCountry.name.toLowerCase())
    ) {
      setSelectedCountry(null);
      setFormData((prev) => ({ ...prev, country: "" }));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchTerm(country.name);
    setFormData((prev) => ({
      ...prev,
      country: country.code,
    }));
    setShowCountryDropdown(false);
  };

  const handleCountryInputFocus = () => {
    if (!showCountryDropdown && searchTerm.length > 0) {
      setShowCountryDropdown(true);
    }
  };

  const prepareInquiryData = () => {
    // Get country name from selected country or use the code if not found
    let countryName = "";
    if (selectedCountry) {
      countryName = selectedCountry.name;
    } else if (formData.country) {
      const country = countries.find((c) => c.code === formData.country);
      countryName = country ? country.name : formData.country;
    }

    // Format phone number - remove country code if present and use only digits
    let phoneNumber = formData.phone?.replace(/\D/g, ""); // Remove all non-digits

    // If we have a selected country with phone code, remove it from the beginning
    if (selectedCountry?.phoneCode) {
      const countryCode = selectedCountry.phoneCode.replace(/\D/g, "");
      if (phoneNumber?.startsWith(countryCode)) {
        phoneNumber = phoneNumber.substring(countryCode.length);
      }
    }

    return {
      name: formData.fullName.trim(),
      email: formData.email?.trim() || null,
      phoneNumber: phoneNumber || null,
      country: countryName || null,
      preferredContactMethod: formData.preferredContactMethod || null,
      preferredDestination: formData.preferredDestination || null,
      adults: formData.adults,
      kids: formData.kids,
      arrivalDate: formData.arrivalDate.trim() || null,
      departureDate: formData.departureDate.trim() || null,
      message: formData.message.trim() || null,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const inquiryData = prepareInquiryData();

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { data: result, error } = await InquiryService.createInquiry(inquiryData);

      if (error) {
        throw new Error(error);
      }

      console.log("Inquiry created successfully:", result);
      setIsSubmitted(true);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        preferredContactMethod: "",
        preferredDestination: "",
        adults: 1,
        kids: 0,
        arrivalDate: "",
        departureDate: "",
        message: "",
      });
      setSelectedCountry(null);
      setSearchTerm("");

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.getElementById("success-message");
        if (successElement) {
          successElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "There was an error submitting your form. Please try again.",
      );

      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      preferredContactMethod: "",
      preferredDestination: "",
      adults: 1,
      kids: 0,
      arrivalDate: "",
      departureDate: "",
      message: "",
    });
    setSelectedCountry(null);
    setSearchTerm("");
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    return today.toISOString().split("T")[0];
  };

  // Check if email should be required based on contact method
  const isEmailRequired = formData.preferredContactMethod === "EMAIL";

  // Check if phone should be required based on contact method
  const isPhoneRequired =
    formData.preferredContactMethod === "WHATSAPP" ||
    formData.preferredContactMethod === "CALL";

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pb-12 pt-6 lg:pb-16 lg:pt-8 xl:pb-20 xl:pt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <div className="mb-8">
                <h2 className="text-md lg:text-3xl font-bold text-gray-800 mb-3">
                  Send Us a Message
                </h2>
                <p className="text-sm lg:text-2xl text-gray-600 mb-4">
                  Fill out the form below and one of our travel experts will
                  contact you through your preferred method.
                </p>
                <div className="w-16 h-1 bg-teal-500 rounded-full"></div>
              </div>

              {/* Error Message */}
              {submitError && !isSubmitted && (
                <div
                  id="error-message"
                  className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-red-700 font-medium mb-1">
                        Submission Error
                      </h4>
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              {isSubmitted ? (
                <div
                  id="success-message"
                  className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 md:p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-md lg:text-2xl font-bold text-gray-800 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-md lg:text-2xl text-gray-600 mb-6">
                    Thank you for contacting us. One of our travel consultants
                    will get back to you through your preferred contact method.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-md lg:text-2xl font-medium">
                        We usually respond within 24 hours
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors text-md lg:text-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm lg:text-lg">
                    {/* Full Name - Always Required */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`text-gray-500 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.fullName && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Country - Search Input with Dropdown */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Country
                      </label>
                      <div className="relative" ref={countryDropdownRef}>
                        {/* Search Input */}
                        <div className="relative">
                          <input
                            ref={searchInputRef}
                            type="text"
                            id="country"
                            value={searchTerm}
                            onChange={handleCountrySearchChange}
                            onFocus={handleCountryInputFocus}
                            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white pr-10"
                            placeholder="Type to search countries..."
                          />
                          {/* Search Icon */}
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Country Dropdown */}
                        {showCountryDropdown &&
                          filteredCountries.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                              <div className="py-1">
                                {filteredCountries.map((country) => (
                                  <button
                                    type="button"
                                    key={country.code}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between ${
                                      selectedCountry?.code === country.code
                                        ? "bg-teal-50 text-teal-700"
                                        : "text-gray-700"
                                    }`}
                                    onClick={() => handleCountrySelect(country)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span
                                        className={`text-sm ${
                                          selectedCountry?.code === country.code
                                            ? "font-semibold"
                                            : ""
                                        }`}
                                      >
                                        {country.name}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-xs px-2 py-1 rounded ${
                                        selectedCountry?.code === country.code
                                          ? "bg-teal-100 text-teal-700"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {country.phoneCode}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* No Results Message */}
                        {showCountryDropdown &&
                          searchTerm.trim() !== "" &&
                          filteredCountries.length === 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                              <div className="px-4 py-6 text-center text-gray-500">
                                <svg
                                  className="w-8 h-8 mx-auto mb-2 text-gray-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <p className="text-sm">
                                  No countries found for {searchTerm}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Try a different search term
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Type country name to search and select
                      </p>
                    </div>

                    {/* Email - Required only if email is selected as contact method */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address{" "}
                        {isEmailRequired && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className={`text-gray-500 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                      {!isEmailRequired && (
                        <p className="mt-1 text-xs text-gray-500">
                          Optional unless you select email as preferred contact
                          method
                        </p>
                      )}
                    </div>

                    {/* Phone - Required only if WhatsApp/Call is selected as contact method */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number{" "}
                        {isPhoneRequired && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <div className="flex">
                          {selectedCountry && (
                            <div className="flex-shrink-0 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 text-sm flex items-center">
                              {selectedCountry.phoneCode}
                            </div>
                          )}
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            className={`text-gray-500 flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            } ${selectedCountry ? "rounded-l-none" : ""}`}
                            placeholder={
                              selectedCountry
                                ? "77 123 4567"
                                : "+94 77 123 4567"
                            }
                          />
                        </div>
                        {errors.phone && (
                          <div className="absolute right-3 top-3 text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Include area code for better service
                      </p>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="md:col-span-2">
                      <label
                        htmlFor="preferredContactMethod"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContactMethod"
                        name="preferredContactMethod"
                        value={formData.preferredContactMethod || ""}
                        onChange={handleChange}
                        className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                      >
                        {contactMethods.map((method) => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Select how you&apos;d prefer us to contact you. This
                        helps us provide better service.
                      </p>
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="bg-gray-50 rounded-xl lg:p-6 text-sm lg:text-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-teal-600"
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
                      Travel Details (Optional)
                    </h3>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Preferred Destination */}
                        <div>
                          <label
                            htmlFor="preferredDestination"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Preferred Destination
                          </label>
                          <select
                            id="preferredDestination"
                            name="preferredDestination"
                            value={formData.preferredDestination || ""}
                            onChange={handleChange}
                            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                          >
                            {destinations.map((dest) => (
                              <option key={dest.value} value={dest.value}>
                                {dest.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Number of Travelers - Adults & Kids */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="adults"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Adults
                            </label>
                            <select
                              id="adults"
                              name="adults"
                              value={formData.adults}
                              onChange={handleChange}
                              className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                            >
                              {adultOptions.map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="kids"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Kids
                            </label>
                            <select
                              id="kids"
                              name="kids"
                              value={formData.kids}
                              onChange={handleChange}
                              className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                            >
                              {kidOptions.map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Arrival Date */}
                        <div>
                          <label
                            htmlFor="arrivalDate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            id="arrivalDate"
                            name="arrivalDate"
                            value={formData.arrivalDate}
                            onChange={handleChange}
                            min={getMinDate()}
                            max={getMaxDate()}
                            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>

                        {/* Departure Date */}
                        <div>
                          <label
                            htmlFor="departureDate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Departure Date
                          </label>
                          <input
                            type="date"
                            id="departureDate"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            min={formData.arrivalDate || getMinDate()}
                            max={getMaxDate()}
                            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message - Optional */}
                  <div className="text-sm lg:text-lg">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message / Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
                      placeholder="Any special requirements, budget considerations, or additional information you'd like to share..."
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Optional - but helpful for us to understand your needs
                        better
                      </p>
                      <span
                        className={`text-xs ${
                          formData.message.length > 1000
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200 text-sm lg:text-lg">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
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
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 ">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-blue-600 mt-0.5"
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
                        </div>
                        <div className="text-sm lg:text-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-blue-600">
                              We&apos;ll contact you through your preferred
                              method.
                            </span>{" "}
                            For urgent inquiries, please call us at{" "}
                            <a
                              href={`tel:${COMPANY_CONTACT_NUMBER}`}
                              className="text-teal-600 font-medium hover:text-teal-700"
                            >
                              {COMPANY_CONTACT_NUMBER}
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
            <div className="hidden lg:flex">
              <ContactTipsForQuickResponse />
            </div>

            {/* Response Time */}
            <div className="hidden lg:flex">
              <ContactResponseTime />
            </div>

            {/* Working Hours */}
            {/* <ContactWorkingHours /> */}

            {/* Timezone */}
            {/* <ContactTimeZone /> */}
            <div>
              <LocationDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;