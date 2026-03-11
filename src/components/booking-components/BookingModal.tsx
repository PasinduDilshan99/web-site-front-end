// components/booking/BookingModal.tsx
import React, { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, User, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/utils/urls";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  packageName?: string;
  packageId?: number;
  tourId: number;
  user?: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobileNumber1: string;
    id: number;
  } | null;
  onSubmit: (data: BookingFormData) => Promise<void>;
  loading: boolean;
}

export interface BookingFormData {
  userId?: number;
  tourId: number;
  tourName: string;
  packageId?: number;
  packageName?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  country?: string;
  agreeTerms: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  tourName,
  packageName,
  packageId,
  tourId,
  user,
  onSubmit,
  loading,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    tourId,
    tourName,
    packageId,
    packageName,
    userId: user?.id,
    name: user ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    contactNumber: user?.mobileNumber1 || "",
    country: "",
    agreeTerms: false,
  });

  const [mode, setMode] = useState<"signedIn" | "guest" | "authChoice">(
    user ? "signedIn" : "authChoice",
  );

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        tourId,
        tourName,
        packageId,
        packageName,
        userId: user?.id,
        name: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        contactNumber: user?.mobileNumber1 || "",
        country: "",
        agreeTerms: false,
      });
      setMode(user ? "signedIn" : "authChoice");
    }
  }, [isOpen, user, tourId, tourName, packageId, packageName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (user) {
      formData.userId = user.id;
    }

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  const renderAuthChoice = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
          How would you like to book?
        </h4>
        <p className="text-sm sm:text-base text-gray-600">
          Choose an option to proceed with your booking
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Login Option */}
        <button
          onClick={() => {
            router.push(SIGNUP_PAGE_PATH);
          }}
          className="cursor-pointer group relative p-4 sm:p-5 md:p-6 border-2 border-sky-100 rounded-xl sm:rounded-2xl hover:border-sky-500 hover:bg-gradient-to-br hover:from-sky-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center">
            <div className="p-2 sm:p-2.5 md:p-3 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors">
              <LogIn className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-sky-600" />
            </div>
          </div>
          <div className="font-bold text-base sm:text-lg text-sky-700 mb-1 sm:mb-2">
            Login
          </div>
          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Already have an account? Sign in to book faster
          </p>
          <p className="text-xs text-gray-600 sm:hidden">Existing users</p>
        </button>

        {/* Sign Up Option */}
        <button
          onClick={() => {
            router.push(LOGIN_PAGE_PATH);
          }}
          className="cursor-pointer group relative p-4 sm:p-5 md:p-6 border-2 border-teal-100 rounded-xl sm:rounded-2xl hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center">
            <div className="p-2 sm:p-2.5 md:p-3 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-teal-600" />
            </div>
          </div>
          <div className="font-bold text-base sm:text-lg text-teal-700 mb-1 sm:mb-2">
            Sign Up
          </div>
          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Create new account for future bookings
          </p>
          <p className="text-xs text-gray-600 sm:hidden">New user</p>
        </button>

        {/* Guest Option */}
        <button
          onClick={() => setMode("guest")}
          className="cursor-pointer group relative p-4 sm:p-5 md:p-6 border-2 border-gray-100 rounded-xl sm:rounded-2xl hover:border-gray-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center">
            <div className="p-2 sm:p-2.5 md:p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
              <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-600" />
            </div>
          </div>
          <div className="font-bold text-base sm:text-lg text-gray-700 mb-1 sm:mb-2">
            Continue as Guest
          </div>
          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Book without creating an account
          </p>
          <p className="text-xs text-gray-600 sm:hidden">No account needed</p>
        </button>
      </div>

      {/* Back button on mobile */}
      <div className="sm:hidden flex justify-center mt-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderSignedInForm = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* User Information Card */}
      <div className="bg-gradient-to-r from-sky-50 to-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-sky-100">
        <h4 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
          Your Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">
                Full Name:
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">
                Username:
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {user?.username}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">Email:</span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {user?.email}
              </span>
            </div>
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">Phone:</span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {user?.mobileNumber1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="bg-gradient-to-r from-cyan-50 to-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-cyan-100">
        <h4 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4">
          Booking Details
        </h4>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">Tour:</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-sky-700 truncate">
              {tourName}
            </span>
          </div>
          {packageName && (
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">Package:</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-teal-700 truncate">
                {packageName}
              </span>
            </div>
          )}
          <div className="pt-2 sm:pt-3 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">
              Our team will contact you to confirm dates and finalize
              arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Change booking mode link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode("authChoice")}
          className="text-xs sm:text-sm text-sky-600 hover:text-sky-700 underline"
        >
          Change booking option
        </button>
      </div>
    </div>
  );

  const renderGuestForm = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Booking Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-100">
        <h4 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4">
          Booking Details
        </h4>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">Tour:</span>
            <span className="text-sm sm:text-base font-bold text-gray-800 truncate">
              {tourName}
            </span>
          </div>
          {packageName && (
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">Package:</span>
              <span className="text-sm sm:text-base font-bold text-gray-800 truncate">
                {packageName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information Form */}
      <div className="space-y-3 sm:space-y-4">
        <h4 className="font-bold text-lg sm:text-xl text-gray-800">
          Your Contact Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      {/* Change booking mode link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode("authChoice")}
          className="text-xs sm:text-sm text-sky-600 hover:text-sky-700 underline"
        >
          Login or Sign up instead
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px) saturate(180%)",
          WebkitBackdropFilter: "blur(8px) saturate(180%)",
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform transition-all duration-300"
          style={{
            animation: isOpen ? "modalSlideIn 0.3s ease-out" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Responsive padding */}
          <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 sm:p-5 md:p-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white pr-8">
                {mode === "authChoice"
                  ? "Book This Tour"
                  : "Confirm Your Booking"}
              </h2>
              <button
                onClick={onClose}
                className="cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-red-200 transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-full"
                disabled={loading}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="mt-1 sm:mt-2 text-white/90 text-xs sm:text-sm md:text-base pr-8">
              {mode === "authChoice" && "Choose how you'd like to proceed"}
              {mode === "signedIn" && "Review your information and submit"}
              {mode === "guest" && "Enter your details to book"}
            </div>
          </div>

          {/* Content - Scrollable with responsive padding */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit}>
              {mode === "authChoice" && renderAuthChoice()}
              {mode === "signedIn" && user && renderSignedInForm()}
              {mode === "guest" && renderGuestForm()}

              {/* Terms and Conditions - Only show when not in authChoice */}
              {mode !== "authChoice" && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="cursor-pointer mt-1 w-4 h-4 sm:w-5 sm:h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 flex-shrink-0"
                      required
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="cursor-pointer text-xs sm:text-sm text-gray-700"
                    >
                      I agree to the terms and conditions and confirm that the
                      information provided is accurate. By submitting this form,
                      I understand that our team will contact me within 24 hours
                      to confirm availability, discuss payment options, and
                      finalize the booking.
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button - Only show when not in authChoice */}
              {mode !== "authChoice" && (
                <>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="cursor-pointer flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.agreeTerms}
                      className="cursor-pointer flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        "Submit Booking Request"
                      )}
                    </button>
                  </div>

                  {/* Note */}
                  <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                    You&apos;ll receive a confirmation email once our team
                    processes your request
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default BookingModal;
