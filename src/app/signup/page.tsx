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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Travel Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200')",
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-blue-600/60" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <h1 className="font-serif text-6xl mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Felicita Trips
          </h1>
          <p className="text-xl text-blue-100 max-w-md leading-relaxed mb-8">
            Travel is the only purchase that enriches you in ways beyond material wealth
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-lg">Discover amazing destinations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-lg">Exclusive travel packages</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-lg">24/7 customer support</span>
            </div>
          </div>
        </div>

        {/* Decorative Monuments */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <svg className="w-64 h-64" viewBox="0 0 200 200" fill="currentColor">
            <rect x="80" y="120" width="40" height="80" />
            <polygon points="100,100 70,120 130,120" />
          </svg>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-y-auto">
        {/* Decorative airplane trail */}
        <div className="absolute top-8 right-8">
          <svg className="w-32 h-16" viewBox="0 0 200 80" fill="none">
            <path 
              d="M 10 40 Q 60 20, 120 30 T 190 35" 
              stroke="#0EA5E9" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <path 
              d="M 180 30 L 190 35 L 180 40 Z" 
              fill="#0EA5E9"
            />
          </svg>
        </div>

        <div className="w-full max-w-2xl py-8">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-blue-500 mb-2">Create Account</h2>
            <p className="text-gray-500">Join us and start your journey</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="John"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Middle Name <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="Middle"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="Doe"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Username and Email - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="johndoe"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-500 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                  placeholder="Create a strong password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Numbers - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Mobile */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Primary Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                  </div>
                  <input
                    id="mobileNumber1"
                    name="mobileNumber1"
                    type="tel"
                    required
                    value={formData.mobileNumber1}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="0771234567"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Secondary Mobile */}
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-2">
                  Secondary Mobile <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                  </div>
                  <input
                    id="mobileNumber2"
                    name="mobileNumber2"
                    type="tel"
                    value={formData.mobileNumber2}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                    placeholder="0711234567"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                "CREATE ACCOUNT"
              )}
            </button>

            {/* Divider */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div> */}

            {/* Social Signup */}
            {/* <div className="grid grid-cols-3 gap-4">
              <button type="button" className="flex items-center justify-center py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              
              <button type="button" className="flex items-center justify-center py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              
              <button type="button" className="flex items-center justify-center py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
            </div> */}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Monuments Bottom Right */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <svg className="w-96 h-64" viewBox="0 0 400 300" fill="#0EA5E9">
            <ellipse cx="200" cy="280" rx="180" ry="20" opacity="0.3"/>
            <rect x="160" y="180" width="80" height="100" rx="4"/>
            <path d="M 200 140 L 140 180 L 260 180 Z"/>
            <circle cx="200" cy="130" r="25"/>
            <rect x="120" y="200" width="30" height="80"/>
            <rect x="250" y="200" width="30" height="80"/>
            <path d="M 135 200 L 120 180 L 150 180 Z"/>
            <path d="M 265 200 L 250 180 L 280 180 Z"/>
            <g transform="translate(80, 0)">
              <rect x="30" y="200" width="20" height="80" transform="skewX(-5)"/>
              <rect x="30" y="200" width="20" height="10"/>
              <rect x="30" y="220" width="20" height="10"/>
              <rect x="30" y="240" width="20" height="10"/>
              <rect x="30" y="260" width="20" height="10"/>
            </g>
            <g transform="translate(220, 0)">
              <rect x="30" y="220" width="40" height="60" rx="2"/>
              <ellipse cx="50" cy="220" rx="25" ry="20"/>
              <rect x="47" y="200" width="6" height="20"/>
              <circle cx="50" cy="198" r="4"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Add Dancing Script font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </div>
  );
}