"use client";
import { useState, useEffect } from "react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  optionId: number;
  optionKey: string;
  optionValue: string;
  optionType: string;
  optionTypeDescription: string;
  optionDescription: string;
  commonStatusName: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number | null;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Option[];
  timestamp: string;
}

interface ValidationError {
  id: number;
  field: string;
  value: string;
}

interface InsertFAQSuccessResponseType {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

interface InsertFAQErrorResponseType {
  code: number;
  status: string;
  message: string;
  data: ValidationError[];
  timestamp: string;
}

export const ContactSupportModal = ({
  isOpen,
  onClose,
}: ContactSupportModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [responseTime, setResponseTime] = useState("24");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      if (!isOpen) return;

      setIsLoadingCategories(true);
      try {
        const response = await fetch(
          "http://localhost:8080/felicita/v0/api/faq/options"
        );
        const result: ApiResponse = await response.json();

        if (result.code === 200 && result.data) {
          // Find the contact_form_categories option
          const categoriesOption = result.data.find(
            (option) => option.optionKey === "contact_form_categories"
          );
          const responseTimeOption = result.data.find(
            (option) => option.optionKey === "response_time_hours"
          );

          if (categoriesOption && categoriesOption.optionValue) {
            try {
              const parsedCategories = JSON.parse(categoriesOption.optionValue);
              if (
                Array.isArray(parsedCategories) &&
                parsedCategories.length > 0
              ) {
                setCategories(parsedCategories);
                // Set default category to first available category
                setFormData((prev) => ({
                  ...prev,
                  category: parsedCategories[0],
                }));
              }
            } catch (error) {
              console.error("Error parsing categories:", error);
              // Fallback to default categories if parsing fails
              setCategories([
                "general",
                "technical",
                "billing",
                "feature",
                "bug",
              ]);
            }
          }

          if (responseTimeOption) {
            setResponseTime(responseTimeOption.optionValue);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to default categories if API fails
        setCategories(["general", "technical", "billing", "feature", "bug"]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  // Handle modal open/close animations
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
      // Reset errors and success message when modal opens
      setErrors([]);
      setSuccessMessage("");
    } else {
      setShowModal(false);
      setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 300);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/faq/insert-faq-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketNumber: "",
          name: formData.name,
          email: formData.email,
          category: formData.category,
          subject: formData.subject,
          message: formData.message,
          ipAddress: "192.168.0.1", // You might want to get the actual IP address
          userId: 1, // You might want to get the actual user ID from your auth system
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success case
        const successData = result as InsertFAQSuccessResponseType;
        setSuccessMessage(
          successData.data.message || "Message sent successfully!"
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: categories[0] || "general",
        });

        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Error cases
        if (Array.isArray(result.data)) {
          // Validation errors (400 status)
          const errorData = result as InsertFAQErrorResponseType;
          setErrors(errorData.data);
        } else {
          // Generic errors
          setErrors([
            {
              id: 0,
              field: "general",
              value: result.error || "Failed to send message",
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors([
        {
          id: 0,
          field: "general",
          value: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear errors for this field when user starts typing
    if (errors.length > 0) {
      setErrors(errors.filter((error) => error.field !== e.target.name));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to get error message for a specific field
  const getFieldError = (fieldName: string): string | null => {
    const error = errors.find((error) => error.field === fieldName);
    return error ? error.value : null;
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 z-50 transition-all duration-300 ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur and animation */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          showModal ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Card with slide-in animation */}
      <div
        className={`relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden border border-white/20 transform transition-all duration-300 ${
          showModal
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-4 sm:p-6 md:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white rounded-full"></div>
          </div>

          <div className="relative flex justify-between items-start sm:items-center">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Contact Support
              </h3>
              <p className="text-purple-100 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 leading-relaxed">
                Well get back to you within {responseTime} hours
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 bg-white/20 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all duration-200 transform hover:scale-110 active:scale-95 ml-4 sm:ml-6 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg mx-4 sm:mx-6 md:mx-8 mt-4 sm:mt-6 p-3 sm:p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-800 text-sm sm:text-base font-medium">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* General Error Message */}
        {getFieldError("general") && (
          <div className="bg-red-50 border border-red-200 rounded-lg mx-4 sm:mx-6 md:mx-8 mt-4 sm:mt-6 p-3 sm:p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800 text-sm sm:text-base font-medium">
                {getFieldError("general")}
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[60vh] sm:max-h-[65vh]">
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Name Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg ${
                  getFieldError("name") ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {getFieldError("name") && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg ${
                  getFieldError("email") ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {getFieldError("email") && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Category
              </label>
              <div className="relative">
                {isLoadingCategories ? (
                  <div className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-500 border border-gray-300 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm">
                    Loading categories...
                  </div>
                ) : (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-400 focus:shadow-lg appearance-none cursor-pointer ${
                      getFieldError("category")
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="text-gray-900 bg-white capitalize"
                      >
                        {category.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                )}
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
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
              </div>
              {getFieldError("category") && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("category")}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg ${
                  getFieldError("subject")
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Brief description of your inquiry"
              />
              {getFieldError("subject") && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("subject")}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 hover:border-gray-400 focus:shadow-lg resize-vertical ${
                  getFieldError("message")
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Please describe your issue or question in detail..."
              />
              {getFieldError("message") && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("message")}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-semibold border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 active:scale-95 hover:border-gray-400 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingCategories}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-amber-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <span className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-700 text-center flex items-center justify-center space-x-1">
            <span>💬</span>
            <span>
              We typically respond within {responseTime} hours during business
              days
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
