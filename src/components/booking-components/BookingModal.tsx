// components/booking/BookingModal.tsx
import React, { useState } from "react";
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
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">
          How would you like to book?
        </h4>
        <p className="text-gray-600">
          Choose an option to proceed with your booking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <button
          onClick={() => {
            router.push(SIGNUP_PAGE_PATH);
          }}
          className="cursor-pointer group relative p-6 border-2 border-sky-100 rounded-2xl hover:border-sky-500 hover:bg-gradient-to-br hover:from-sky-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors">
              <LogIn className="w-8 h-8 text-sky-600" />
            </div>
          </div>
          <div className="font-bold text-lg text-sky-700 mb-2">Login</div>
          <p className="text-sm text-gray-600">
            Already have an account? Sign in to book faster
          </p>
        </button>

        <button
          onClick={() => {
            router.push(LOGIN_PAGE_PATH);
          }}
          className="cursor-pointer group relative p-6 border-2 border-teal-100 rounded-2xl hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
              <UserPlus className="w-8 h-8 text-teal-600" />
            </div>
          </div>
          <div className="font-bold text-lg text-teal-700 mb-2">Sign Up</div>
          <p className="text-sm text-gray-600">
            Create new account for future bookings
          </p>
        </button>

        <button
          onClick={() => setMode("guest")}
          className="cursor-pointer group relative p-6 border-2 border-gray-100 rounded-2xl hover:border-gray-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
              <User className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          <div className="font-bold text-lg text-gray-700 mb-2">
            Continue as Guest
          </div>
          <p className="text-sm text-gray-600">
            Book without creating an account
          </p>
        </button>
      </div>
    </div>
  );

  const renderSignedInForm = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-50 to-white p-6 rounded-2xl border border-sky-100">
        <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-sky-600" />
          Your Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-semibold text-gray-800">{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Username:</span>
              <span className="font-semibold text-gray-800">
                {user?.username}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-800">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold text-gray-800">
                {user?.mobileNumber1}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-white p-6 rounded-2xl border border-cyan-100">
        <h4 className="font-bold text-xl text-gray-800 mb-4">
          Booking Details
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tour:</span>
            <span className="font-bold text-lg text-sky-700">
              {tourName}
            </span>
          </div>
          {packageName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Package:</span>
              <span className="font-bold text-lg text-teal-700">
                {packageName}
              </span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Our team will contact you to confirm dates and finalize
              arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuestForm = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-xl text-gray-800 mb-4">
          Booking Details
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tour:</span>
            <span className="font-bold text-lg text-gray-800">{tourName}</span>
          </div>
          {packageName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Package:</span>
              <span className="font-bold text-lg text-gray-800">
                {packageName}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-xl text-gray-800">
          Your Contact Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="United States"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 z-[100] backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300"
          style={{
            animation: isOpen ? "modalSlideIn 0.3s ease-out" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {mode === "authChoice"
                  ? "Book This Tour"
                  : "Confirm Your Booking"}
              </h2>
              <button
                onClick={onClose}
                className="cursor-pointer text-white hover:text-red-600 transition-colors p-2 hover:bg-red-600/10 rounded-full"
                disabled={loading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-2 text-white/90">
              {mode === "authChoice" && "Choose how you'd like to book"}
              {mode === "signedIn" && "Review your information and submit"}
              {mode === "guest" && "Enter your details to book"}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit}>
              {mode === "authChoice" && renderAuthChoice()}
              {mode === "signedIn" && user && renderSignedInForm()}
              {mode === "guest" && renderGuestForm()}

              {/* Terms and Conditions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="cursor-pointer mt-1 w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                    required
                  />
                  <label htmlFor="agreeTerms" className="cursor-pointer text-sm text-gray-700">
                    I agree to the terms and conditions and confirm that the
                    information provided is accurate. By submitting this form, I
                    understand that our team will contact me within 24 hours to
                    confirm availability, discuss payment options, and finalize
                    the booking. All information will be kept confidential and
                    used only for booking purposes.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.agreeTerms}
                  className="cursor-pointer flex-1 px-6 py-4 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </button>
              </div>

              {/* Note */}
              <p className="mt-6 text-center text-sm text-gray-500">
                You&apos;ll receive a confirmation email once our team processes
                your request
              </p>
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

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .max-h-\[90vh\] {
            max-height: 95vh;
          }

          .max-h-\[calc\(90vh-140px\)\] {
            max-height: calc(95vh - 140px);
          }
        }

        /* Custom scrollbar for modal */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default BookingModal;