// components/user-profile-components/PasswordValidationModal.tsx
"use client";
import React, { useState } from "react";
import { AuthService } from "@/services/authService";
import Image from "next/image";

interface PasswordValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  username: string;
  imageUrl: string;
}

const PasswordValidationModal: React.FC<PasswordValidationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  username,
  imageUrl,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const isValid = await AuthService.validateUsernamePassword(
        username,
        password,
      );

      if (isValid) {
        onSuccess();
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Validation error:", err);
      setError("Validation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Responsive */}
      <div className="relative bg-gradient-to-b from-white to-sky-50 rounded-xl sm:rounded-2xl shadow-2xl border border-sky-300 w-full max-w-md mx-auto overflow-hidden transform transition-all duration-300 animate-fadeIn">
        {/* Header - Responsive */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                Security Verification
              </h3>
              <p className="text-sky-100 text-xs sm:text-sm">
                Please confirm your identity
              </p>
            </div>
          </div>
        </div>

        {/* Body - Responsive */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* User Info */}
          <div className="mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-sky-100 to-teal-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-sky-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="user"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-sky-600">Username</p>
                <p className="font-semibold text-sky-900 text-sm sm:text-base truncate">
                  {username}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-sky-800 mb-1 sm:mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-sky-300 bg-sky-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-sky-900 text-sm sm:text-base"
                  placeholder="Enter your password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-2.5 sm:p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg flex items-start gap-1.5 sm:gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-700 text-xs sm:text-sm">{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors duration-200 font-medium text-xs sm:text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-sky-200 transition-all duration-200 font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
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
                      <span className="hidden xs:inline">Verifying...</span>
                      <span className="xs:hidden">...</span>
                    </span>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-4 sm:mt-5 text-center">
            <p className="text-[10px] sm:text-xs text-sky-500">
              <span className="hidden xs:inline">This extra step ensures your security questions are protected</span>
              <span className="xs:hidden">Extra security step</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordValidationModal;