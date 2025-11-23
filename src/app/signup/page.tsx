"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber1: "",
    mobileNumber2: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        middleName: formData.middleName || undefined,
        mobileNumber2: formData.mobileNumber2 || undefined,
      };

      await signup(submitData);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };

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
          0%, 100% {
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
          0%, 100% {
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
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
        }
      `}</style>

      <div className="w-full max-w-[95%] xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl relative z-10">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-in-up hover:shadow-amber-200/50 transition-shadow duration-500">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-purple-600 p-6 sm:p-8 md:p-10 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
            
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Start Your Journey
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-50 drop-shadow">
                Create an account to explore amazing destinations
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

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* First Name */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Middle Name */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Middle Name <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 hover:border-purple-300 bg-gray-50 focus:bg-white"
                    placeholder="Middle name"
                  />
                </div>
              </div>

              {/* Username and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* Username */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 hover:border-purple-300 bg-gray-50 focus:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-amber-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* Primary Mobile */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Primary Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      id="mobileNumber1"
                      name="mobileNumber1"
                      type="tel"
                      required
                      value={formData.mobileNumber1}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 hover:border-purple-300 bg-gray-50 focus:bg-white"
                      placeholder="0771234567"
                    />
                  </div>
                </div>

                {/* Secondary Mobile */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Secondary Mobile <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      id="mobileNumber2"
                      name="mobileNumber2"
                      type="tel"
                      value={formData.mobileNumber2}
                      onChange={handleChange}
                      className="text-black w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-gray-50 focus:bg-white"
                      placeholder="0711234567"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-purple-600 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 lg:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg hover:from-amber-600 hover:via-amber-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg active:scale-95 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                {loading ? (
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
                    Creating Account...
                  </span>
                ) : (
                  <span className="relative z-10">Create Account</span>
                )}
              </button>
            </form>
          </div>

          {/* Login Section */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-br from-gray-50 to-amber-50/30 border-t border-gray-200">
            <p className="text-center text-xs sm:text-sm md:text-base text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 transition-all duration-300 inline-block hover:scale-105"
              >
                Sign in here →
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base text-gray-600 animate-pulse">
          🔒 Secure registration • ✈️ Join thousands of travelers
        </p>
      </div>
    </div>
  );
}