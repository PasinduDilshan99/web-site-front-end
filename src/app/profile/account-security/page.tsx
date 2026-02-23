// app/profile/account-security/page.tsx
"use client";
import UserProfileAccountSecurityLoading from "@/components/user-profile-components/Loadings/UserProfileAccountSecurityLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import {
  AccountSecurityData,
  EmailVerification,
  MobileVerification,
} from "@/types/account-security";
import { USER_PROFILE_ACCOUNT_SECURITY_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AccountSecurityPage() {
  const [securityData, setSecurityData] = useState<AccountSecurityData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVerification, setActiveVerification] = useState<{
    type: "mobile" | "email";
    which: "primary" | "secondary" | "secondory";
    step: "request" | "verify";
  } | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_ACCOUNT_SECURITY_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadAccountSecurityDetails();
  }, []);

  const loadAccountSecurityDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAccountSecurityDetails();
      setSecurityData(response.data);
    } catch (err) {
      console.error("Failed to load account security details:", err);
      setError("Failed to load account security information");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const maskMobileNumber = (number: string): string => {
    if (!number) return "Not set";
    return `••••••${number.slice(-4)}`;
  };

  const getMobileVerificationStatus = (
    verifications: MobileVerification[],
    type: "primary" | "secondory",
  ) => {
    const verification = verifications.find((v) => v.whichMobile === type);
    return (
      verification || {
        statusName: "Not Verified",
        statusDescription: "Not verified yet",
      }
    );
  };

  const getEmailVerificationStatus = (
    verifications: EmailVerification[],
    type: "primary" | "secondary",
  ) => {
    const verification = verifications.find((v) => v.whichEmail === type);
    return (
      verification || {
        statusName: "Not Verified",
        statusDescription: "Not verified yet",
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-sky-100 text-sky-700 border-sky-200";
      case "not verified":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return (
          <svg
            className="w-4 h-4 mr-1.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
    }
  };

  const handleRequestMobileOtp = async (
    whichMobile: "primary" | "secondory",
  ) => {
    if (!mobileNumber.trim()) {
      showMessage("error", "Please enter your mobile number");
      return;
    }

    try {
      setSendingOtp(true);
      await apiService.requestMobileVerification({
        mobileNumber: mobileNumber.trim(),
        whichMobile,
      });

      setActiveVerification({
        type: "mobile",
        which: whichMobile,
        step: "verify",
      });
      showMessage("success", "OTP sent to your mobile number");
      setMobileNumber("");
    } catch (err) {
      console.error("Failed to send mobile OTP:", err);
      showMessage("error", "Failed to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (!otpCode.trim() || !activeVerification) {
      showMessage("error", "Please enter the OTP code");
      return;
    }

    try {
      setVerifying(true);
      await apiService.verifyMobileCode({
        code: otpCode.trim(),
        whichMobile: activeVerification.which as "primary" | "secondory",
      });

      showMessage("success", "Mobile number verified successfully!");
      setActiveVerification(null);
      setOtpCode("");
      await loadAccountSecurityDetails();
    } catch (err) {
      console.error("Failed to verify mobile OTP:", err);
      showMessage("error", "Invalid OTP code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleRequestEmailOtp = async (whichEmail: "primary" | "secondary") => {
    const emailToVerify =
      whichEmail === "primary" ? securityData?.email : email;

    if (!emailToVerify?.trim()) {
      showMessage("error", "Please enter your email address");
      return;
    }

    try {
      setSendingOtp(true);
      await apiService.requestEmailVerification({
        email: emailToVerify.trim(),
        whichEmail,
      });

      setActiveVerification({
        type: "email",
        which: whichEmail,
        step: "verify",
      });
      showMessage("success", "Verification email sent!");
      setEmail("");
    } catch (err) {
      console.error("Failed to send email verification:", err);
      showMessage(
        "error",
        "Failed to send verification email. Please try again.",
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!otpCode.trim()) {
      showMessage("error", "Please enter the verification code");
      return;
    }

    try {
      setVerifying(true);
      await apiService.verifyEmailCode({
        code: otpCode.trim(),
      });

      showMessage("success", "Email verified successfully!");
      setActiveVerification(null);
      setOtpCode("");
      await loadAccountSecurityDetails();
    } catch (err) {
      console.error("Failed to verify email:", err);
      showMessage("error", "Invalid verification code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const cancelVerification = () => {
    setActiveVerification(null);
    setOtpCode("");
    setMobileNumber("");
    setEmail("");
  };

  if (loading) {
    return <UserProfileAccountSecurityLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
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
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Security Settings Unavailable
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadAccountSecurityDetails}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!securityData) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-50 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-sky-500"
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Security Data Found
            </h3>
            <p className="text-gray-600 mb-6">
              Unable to load your account security information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const primaryMobileVerification = getMobileVerificationStatus(
    securityData.mobileVerifications,
    "primary",
  );
  const secondaryMobileVerification = getMobileVerificationStatus(
    securityData.mobileVerifications,
    "secondory",
  );
  const primaryEmailVerification = getEmailVerificationStatus(
    securityData.emailVerifications,
    "primary",
  );
  const secondaryEmailVerification = getEmailVerificationStatus(
    securityData.emailVerifications,
    "secondary",
  );

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Account Security
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Secure your account with verified contact information
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg mr-2">
                  {message.type === "success" ? "✅" : "❌"}
                </span>
                {message.text}
              </div>
              <button
                onClick={() => setMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Verification Modal */}
        {activeVerification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Verify{" "}
                  {activeVerification.type === "mobile"
                    ? "Mobile Number"
                    : "Email Address"}
                </h3>
                <button
                  onClick={cancelVerification}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {activeVerification.step === "request" ? (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Enter your {activeVerification.type} to receive a
                    verification code:
                  </p>
                  <input
                    type={
                      activeVerification.type === "mobile" ? "tel" : "email"
                    }
                    value={
                      activeVerification.type === "mobile"
                        ? mobileNumber
                        : email
                    }
                    onChange={(e) =>
                      activeVerification.type === "mobile"
                        ? setMobileNumber(e.target.value)
                        : setEmail(e.target.value)
                    }
                    placeholder={
                      activeVerification.type === "mobile"
                        ? "Enter mobile number"
                        : "Enter email address"
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelVerification}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        activeVerification.type === "mobile"
                          ? handleRequestMobileOtp(
                              activeVerification.which as
                                | "primary"
                                | "secondory",
                            )
                          : handleRequestEmailOtp(
                              activeVerification.which as
                                | "primary"
                                | "secondary",
                            )
                      }
                      disabled={sendingOtp}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                    >
                      {sendingOtp ? "Sending..." : "Send Code"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Enter the verification code sent to your{" "}
                    {activeVerification.type}:
                  </p>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center text-lg font-mono tracking-wider"
                    maxLength={6}
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelVerification}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        activeVerification.type === "mobile"
                          ? handleVerifyMobileOtp
                          : handleVerifyEmailOtp
                      }
                      disabled={verifying || !otpCode.trim()}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                    >
                      {verifying ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Email Addresses Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-5 md:p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Email Verification</h2>
                <p className="text-sky-100 text-sm mt-0.5">
                  Secure your account with verified email addresses
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Primary Email */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 text-base md:text-lg">
                      Primary Email
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
                      Primary
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="text-gray-600 text-sm font-medium truncate">
                      {securityData.email}
                    </p>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          primaryEmailVerification.statusName,
                        )}`}
                      >
                        {getStatusIcon(primaryEmailVerification.statusName)}
                        {primaryEmailVerification.statusName}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    {primaryEmailVerification.statusDescription}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setActiveVerification({
                      type: "email",
                      which: "primary",
                      step: "request",
                    })
                  }
                  className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-semibold whitespace-nowrap w-full md:w-auto mt-3 md:mt-0"
                >
                  {primaryEmailVerification.statusName === "Verified"
                    ? "Re-verify"
                    : "Verify Now"}
                </button>
              </div>
            </div>

            {/* Secondary Email */}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 text-base md:text-lg">
                      Secondary Email
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                      Backup
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Add a secondary email for account recovery
                  </p>
                  {secondaryEmailVerification.statusName !== "Not Verified" && (
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          secondaryEmailVerification.statusName,
                        )}`}
                      >
                        {getStatusIcon(secondaryEmailVerification.statusName)}
                        {secondaryEmailVerification.statusName}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {secondaryEmailVerification.statusDescription}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() =>
                    setActiveVerification({
                      type: "email",
                      which: "secondary",
                      step: "request",
                    })
                  }
                  className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-semibold whitespace-nowrap w-full md:w-auto mt-3 md:mt-0"
                >
                  {secondaryEmailVerification.statusName === "Not Verified"
                    ? "Add & Verify"
                    : "Manage"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips & Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Security Tips */}
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl md:rounded-2xl border border-sky-200 p-5 md:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Security Best Practices
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sky-600 text-xs">✓</span>
                </div>
                <p>Keep email addresses updated and verified</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sky-600 text-xs">✓</span>
                </div>
                <p>Use a secondary email for account recovery</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sky-600 text-xs">✓</span>
                </div>
                <p>Never share verification codes with anyone</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sky-600 text-xs">✓</span>
                </div>
                <p>Regularly update your contact information</p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Account Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-600">
                  Overall Security
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                  Secure
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Verified
                  </div>
                  <div className="text-lg font-bold text-emerald-600">1</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Pending
                  </div>
                  <div className="text-lg font-bold text-sky-600">1</div>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-sky-50 to-teal-50 text-sky-700 rounded-lg border border-sky-200 hover:border-sky-300 hover:shadow-sm transition-all duration-200 text-sm font-medium">
                View Security Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
