"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { UNIQUE_CODE_NAME } from "@/utils/constant";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);

  const handleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await login(username, password);
      router.back();
    } catch (err: unknown) {
      console.log(err);
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (uniqueCode) {
    router.push("/profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-amber-100 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out;
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>

      <div className="w-full max-w-[95%] xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl relative z-10">
        {/* Card Container with animation */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-in-up hover:shadow-amber-200/50 transition-shadow duration-500">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-purple-600 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>

            {/* Floating Icon */}
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full mx-auto mb-3 sm:mb-4 md:mb-5 flex items-center justify-center shadow-lg animate-float">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-50 drop-shadow">
                Sign in to continue your journey
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {error && (
              <div className="mb-4 sm:mb-5 md:mb-6 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-start animate-slide-in-up shadow-md">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs sm:text-sm md:text-base">{error}</span>
              </div>
            )}

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Username Input */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-amber-500">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-9 sm:pl-11 md:pl-12 text-black pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-purple-500">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-9 sm:pl-11 md:pl-12 pr-10 sm:pr-12 text-black py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 hover:border-purple-300 bg-gray-50 focus:bg-white"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm md:text-base text-purple-600 hover:text-purple-800 font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Forgot password? →
                </Link>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-purple-600 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 lg:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg hover:from-amber-600 hover:via-amber-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg active:scale-95 relative overflow-hidden group"
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                {isLoading ? (
                  <span className="flex items-center justify-center relative z-10">
                    <svg
                      className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Signing in...
                  </span>
                ) : (
                  <span className="relative z-10">Sign In</span>
                )}
              </button>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-br from-gray-50 to-amber-50/30 border-t border-gray-200">
            <p className="text-center text-xs sm:text-sm md:text-base text-gray-600">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 transition-all duration-300 inline-block hover:scale-105"
              >
                Sign up now →
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base text-gray-600 animate-pulse">
          🔒 Secure login • ✈️ Your adventure awaits
        </p>
      </div>
    </div>
  );
}
