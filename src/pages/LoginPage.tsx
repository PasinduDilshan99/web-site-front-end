"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { COMPANY_NAME, UNIQUE_CODE_NAME } from "@/utils/constant";
import { SIGNUP_PAGE_PATH, USER_PROFILE_PAGE_PATH } from "@/utils/urls";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    setIsClient(true);
    setUniqueCode(sessionStorage.getItem(UNIQUE_CODE_NAME));
  }, []);

const handleLogin = async () => {
  try {
    setError(null);
    setIsLoading(true);
    await login(username, password);
    
    // Check if the previous page was signup
    if (document.referrer.includes('/signup')) {
      router.back(); // Go back to signup
      router.back(); // Then go back again
    } else {
      router.back(); // Normal back navigation
    }
  } catch (err: unknown) {
    console.log(err);
    setError("Invalid username or password. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (isClient && uniqueCode) {
      router.push(USER_PROFILE_PAGE_PATH);
    }
  }, [isClient, uniqueCode, router]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: "#0E9E8E" }}
          ></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (uniqueCode) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: "#0E9E8E" }}
          ></div>
          <p className="mt-4 text-gray-600">Redirecting to profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");

        :root {
          --sea-blue: #0b7ea8;
          --sea-blue-dark: #095f82;
          --sea-blue-light: #3aadd4;
          --sea-blue-pale: #e0f4fb;
          --sea-blue-border: #b3e0f2;
          --sea-green: #0e9e8e;
          --sea-green-dark: #0b7d70;
          --sea-green-light: #3dbfb1;
          --sea-gradient-start: #064e6e;
          --sea-gradient-end: #0b7d70;
        }

        .sea-input {
          border-color: var(--sea-blue-border) !important;
        }
        .sea-input:focus {
          border-color: var(--sea-blue) !important;
          box-shadow: 0 0 0 3px rgba(11, 126, 168, 0.15) !important;
        }

        .sea-btn {
          background: linear-gradient(
            135deg,
            var(--sea-blue),
            var(--sea-green)
          );
          transition: all 0.3s ease;
        }
        .sea-btn:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            var(--sea-blue-dark),
            var(--sea-green-dark)
          );
          box-shadow: 0 8px 25px rgba(11, 126, 168, 0.4);
          transform: translateY(-1px);
        }
        .sea-btn:active:not(:disabled) {
          transform: scale(0.99);
        }
      `}</style>

      <div className="min-h-[90vh] flex">
        {/* Left Side - Travel Image & Branding */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--sea-gradient-start), var(--sea-gradient-end))",
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dtzrivqye/image/upload/v1772816392/ibxlqf7rw7ew35h38yxv.webp')",
              opacity: 0.55,
            }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,78,110,0.75) 0%, rgba(11,125,112,0.65) 100%)",
            }}
          />

          {/* Ripple / wave decorative circles */}
          <div
            className="absolute bottom-[-60px] left-[-60px] w-80 h-80 rounded-full opacity-10"
            style={{ background: "var(--sea-green-light)" }}
          />
          <div
            className="absolute top-[-40px] right-[-40px] w-56 h-56 rounded-full opacity-10"
            style={{ background: "var(--sea-blue-light)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
            <h1
              className="font-serif text-6xl mb-6"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {COMPANY_NAME}
            </h1>
            <p
              className="text-xl max-w-md leading-relaxed"
              style={{ color: "#b3e8e4" }}
            >
              Travel is the only purchase that enriches you in ways beyond
              material wealth
            </p>
          </div>

          {/* Decorative wave SVG at bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 400 80"
              preserveAspectRatio="none"
              className="w-full h-16 opacity-20"
            >
              <path
                d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
          {/* Subtle sea-toned background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(11,126,168,0.06) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(14,158,142,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Decorative airplane trail */}
          <div className="absolute top-8 right-8">
            <svg className="w-32 h-16" viewBox="0 0 200 80" fill="none">
              <path
                d="M 10 40 Q 60 20, 120 30 T 190 35"
                stroke="#0B7EA8"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.45"
              />
              <path d="M 180 30 L 190 35 L 180 40 Z" fill="#0B7EA8" />
            </svg>
          </div>

          <div className="w-full max-w-md relative z-10">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <h2
                className="text-5xl font-bold mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--sea-blue), var(--sea-green))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Welcome
              </h2>
              <p className="text-gray-500">Login with username</p>
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

            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--sea-blue)" }}
                >
                  username
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
                    type="text"
                    className="sea-input w-full pl-12 pr-4 py-3.5 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--sea-blue)" }}
                >
                  Password
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
                    type={showPassword ? "text" : "password"}
                    className="sea-input w-full pl-12 pr-12 py-3.5 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                    value={password}
                    placeholder="••••••••••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
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
                        className="h-5 w-5"
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

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/password-reset"
                  className="text-sm text-gray-500 transition-colors"
                  style={
                    {
                      hover: { color: "var(--sea-blue)" },
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--sea-blue)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                className="sea-btn cursor-pointer w-full text-white font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={
                  {
                    focusRingColor: "rgba(11,126,168,0.4)",
                  } as React.CSSProperties
                }
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
              >
                {isLoading ? (
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "LOGIN"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have account?{" "}
                <Link
                  href={SIGNUP_PAGE_PATH}
                  className="font-semibold transition-colors"
                  style={{ color: "var(--sea-green)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--sea-green-dark)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--sea-green)")
                  }
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative Monuments Bottom Right */}
          <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
            <svg className="w-96 h-64" viewBox="0 0 400 300" fill="#0B7EA8">
              <ellipse cx="200" cy="280" rx="180" ry="20" opacity="0.3" />
              <rect x="160" y="180" width="80" height="100" rx="4" />
              <path d="M 200 140 L 140 180 L 260 180 Z" />
              <circle cx="200" cy="130" r="25" />
              <rect x="120" y="200" width="30" height="80" />
              <rect x="250" y="200" width="30" height="80" />
              <path d="M 135 200 L 120 180 L 150 180 Z" />
              <path d="M 265 200 L 250 180 L 280 180 Z" />
              <g transform="translate(80, 0)">
                <rect
                  x="30"
                  y="200"
                  width="20"
                  height="80"
                  transform="skewX(-5)"
                />
                <rect x="30" y="200" width="20" height="10" />
                <rect x="30" y="220" width="20" height="10" />
                <rect x="30" y="240" width="20" height="10" />
                <rect x="30" y="260" width="20" height="10" />
              </g>
              <g transform="translate(220, 0)">
                <rect x="30" y="220" width="40" height="60" rx="2" />
                <ellipse cx="50" cy="220" rx="25" ry="20" />
                <rect x="47" y="200" width="6" height="20" />
                <circle cx="50" cy="198" r="4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
