// components/PasswordValidationModal.tsx
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-white to-sky-50 rounded-2xl shadow-2xl border border-sky-300 w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
              <h3 className="text-xl font-bold text-white">
                Security Verification
              </h3>
              <p className="text-sky-100 text-sm">
                Please confirm your identity
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6 bg-gradient-to-r from-sky-100 to-teal-100 rounded-xl p-4 border border-sky-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt="user image"
                  width={400}
                  height={400}
                  className="rounded-full "
                />
              </div>
              <div>
                <p className="text-sm text-sky-600">Username</p>
                <p className="font-semibold text-sky-900">{username}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-800 mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-sky-300 bg-sky-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-sky-900"
                  placeholder="Enter your password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
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
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors duration-200 font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-sky-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-sky-500">
              This extra step ensures your security questions are protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordValidationModal;
