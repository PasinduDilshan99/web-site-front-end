"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthService, SecretQuestion } from "@/services/authService";
import { COMPANY_NAME } from "@/utils/constant";
import { LOGIN_PAGE_PATH } from "@/utils/urls";

export default function PasswordResetPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState("");
  const [secretQuestions, setSecretQuestions] = useState<SecretQuestion[]>([]);
  const [formData, setFormData] = useState({
    secretQuestion1: 0,
    secretQuestion1Answer: "",
    secretQuestion2: 0,
    secretQuestion2Answer: "",
    secretQuestion3: 0,
    secretQuestion3Answer: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await AuthService.getSecretQuestions();
        setSecretQuestions(questions);
      } catch (err) {
        setError("Failed to load security questions. Please try again.");
      }
    };
    fetchQuestions();
  }, []);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setError("Please enter your username"); return; }
    setError(null);
    setStep(2);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.secretQuestion1 || !formData.secretQuestion2 || !formData.secretQuestion3) {
      setError("Please select all three security questions"); return;
    }
    if (!formData.secretQuestion1Answer || !formData.secretQuestion2Answer || !formData.secretQuestion3Answer) {
      setError("Please answer all three security questions"); return;
    }
    if (formData.newPassword.length < 6) { setError("Password must be at least 6 characters long"); return; }
    if (formData.newPassword !== formData.confirmPassword) { setError("Passwords do not match"); return; }

    const selectedQuestions = [formData.secretQuestion1, formData.secretQuestion2, formData.secretQuestion3];
    if (new Set(selectedQuestions).size !== 3) { setError("Please select three different security questions"); return; }

    setLoading(true);
    try {
      const message = await AuthService.resetPassword({ username, ...formData });
      setSuccess(message || "Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to reset password. Please check your answers and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getAvailableQuestions = (excludeQuestion: number) => {
    const selectedQuestions = [formData.secretQuestion1, formData.secretQuestion2, formData.secretQuestion3]
      .filter((q) => q !== 0 && q !== excludeQuestion);
    return secretQuestions.filter((q) => !selectedQuestions.includes(q.questionId));
  };

  const EyeOffIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        :root {
          --sea-blue: #0B7EA8;
          --sea-blue-dark: #095f82;
          --sea-blue-light: #3aadd4;
          --sea-blue-pale: #e0f4fb;
          --sea-blue-border: #b3e0f2;
          --sea-green: #0E9E8E;
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
        .sea-select {
          border-color: var(--sea-blue-border) !important;
        }
        .sea-select:focus {
          border-color: var(--sea-blue) !important;
          box-shadow: 0 0 0 3px rgba(11, 126, 168, 0.15) !important;
        }

        .sea-btn {
          background: linear-gradient(135deg, var(--sea-blue), var(--sea-green));
          transition: all 0.3s ease;
        }
        .sea-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--sea-blue-dark), var(--sea-green-dark));
          box-shadow: 0 8px 25px rgba(11, 126, 168, 0.4);
          transform: translateY(-1px);
        }
        .sea-btn:active:not(:disabled) {
          transform: scale(0.99);
        }
      `}</style>

      <div className="min-h-[75vh] flex">
        {/* Left Side */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--sea-gradient-start), var(--sea-gradient-end))" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dtzrivqye/image/upload/v1772824247/s9o932sqqnciy4j6oo2n.jpg')",
              opacity: 0.55,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(6,78,110,0.75) 0%, rgba(11,125,112,0.65) 100%)" }}
          />

          {/* Decorative circles */}
          <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 rounded-full opacity-10" style={{ background: "var(--sea-green-light)" }} />
          <div className="absolute top-[-40px] right-[-40px] w-56 h-56 rounded-full opacity-10" style={{ background: "var(--sea-blue-light)" }} />

          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
            <h1 className="font-serif text-6xl mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {COMPANY_NAME}
            </h1>
            <p className="text-xl max-w-md leading-relaxed mb-8" style={{ color: "#b3e8e4" }}>
              Secure your account and continue your adventure
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Secure password recovery",
                  icon: <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />,
                },
                {
                  label: "Answer security questions",
                  icon: <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />,
                },
                {
                  label: "Create new password",
                  icon: <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />,
                },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">{icon}</svg>
                  </div>
                  <span className="text-lg">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-16 opacity-20">
              <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-y-auto">
          {/* Subtle background tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(11,126,168,0.06) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(14,158,142,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Airplane trail */}
          <div className="absolute top-8 right-8">
            <svg className="w-32 h-16" viewBox="0 0 200 80" fill="none">
              <path d="M 10 40 Q 60 20, 120 30 T 190 35" stroke="#0B7EA8" strokeWidth="2" strokeDasharray="4 4" opacity="0.45" />
              <path d="M 180 30 L 190 35 L 180 40 Z" fill="#0B7EA8" />
            </svg>
          </div>

          <div className="w-full max-w-md py-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: "var(--sea-blue-pale)" }}
              >
                <svg className="w-8 h-8" style={{ color: "var(--sea-blue)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2
                className="text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, var(--sea-blue), var(--sea-green))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Reset Password
              </h2>
              <p className="text-gray-500">
                {step === 1 ? "Enter your username to begin" : "Answer security questions to reset your password"}
              </p>

              {/* Step indicator */}
              <div className="flex items-center justify-center mt-4 space-x-2">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: step === s ? "2rem" : "0.5rem",
                      background: step >= s
                        ? "linear-gradient(90deg, var(--sea-blue), var(--sea-green))"
                        : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Success */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Step 1: Username */}
            {step === 1 && (
              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--sea-blue)" }}>Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="sea-input w-full pl-12 pr-4 py-3.5 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="cursor-pointer sea-btn w-full text-white font-semibold py-4 px-6 rounded-xl focus:outline-none shadow-lg">
                  Continue →
                </button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--sea-blue)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sea-green)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sea-blue)")}
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            )}

            {/* Step 2: Security Questions */}
            {step === 2 && (
              <form onSubmit={handleResetSubmit} className="space-y-5">
                {/* Security Questions */}
                {([1, 2, 3] as const).map((num) => {
                  const questionKey = `secretQuestion${num}` as keyof typeof formData;
                  const answerKey = `secretQuestion${num}Answer` as keyof typeof formData;
                  return (
                    <div key={num}>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--sea-blue)" }}>
                        Security Question {num} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData[questionKey] as number}
                        onChange={(e) => handleChange(questionKey, Number(e.target.value))}
                        className="sea-select w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all mb-3"
                        required
                      >
                        <option value={0}>Select a question</option>
                        {getAvailableQuestions(formData[questionKey] as number).map((q) => (
                          <option key={q.questionId} value={q.questionId}>{q.question}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData[answerKey] as string}
                        onChange={(e) => handleChange(answerKey, e.target.value)}
                        className="sea-input w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                        placeholder="Your answer"
                        required
                        disabled={!(formData[questionKey] as number)}
                      />
                    </div>
                  );
                })}

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--sea-blue)" }}>
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => handleChange("newPassword", e.target.value)}
                      className="sea-input w-full pl-12 pr-12 py-3 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                      placeholder="Enter new password"
                      required
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--sea-blue)" }}>
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className="sea-input w-full pl-12 pr-12 py-3 text-gray-900 bg-white border-2 rounded-xl outline-none transition-all"
                      placeholder="Confirm new password"
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer sea-btn w-full text-white font-semibold py-4 px-6 rounded-xl focus:outline-none shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Resetting Password...
                      </span>
                    ) : (
                      "RESET PASSWORD"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="cursor-pointer w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none border-2 text-gray-600 hover:bg-gray-50"
                    style={{ borderColor: "var(--sea-blue-border)" }}
                  >
                    ← Back
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={LOGIN_PAGE_PATH}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--sea-blue)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sea-green)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sea-blue)")}
                  >
                    Remember your password? Sign in
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Decorative Monuments */}
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
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}