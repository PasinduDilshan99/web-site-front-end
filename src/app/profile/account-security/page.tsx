// app/profile/account-security/page.tsx
"use client";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import {
  AccountSecurityData,
  EmailVerification,
  MobileVerification,
} from "@/types/account-security";
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
    // Show only last 4 digits for security
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
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
      setMobileNumber(""); // Clear input after successful request
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
      // Reload data to get updated verification status
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
      setEmail(""); // Clear input after successful request
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
      // Reload data to get updated verification status
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
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gradient-to-r from-amber-100 to-purple-100 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Security Settings
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadAccountSecurityDetails}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Security Data Found
            </h3>
            <p className="text-gray-600">
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
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Account Security
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your contact information and verification status
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Verify{" "}
                {activeVerification.type === "mobile"
                  ? "Mobile Number"
                  : "Email Address"}
              </h3>

              {activeVerification.step === "request" ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelVerification}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {sendingOtp ? "Sending..." : "Send Code"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Enter the verification code sent to your{" "}
                    {activeVerification.type}:
                  </p>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-mono"
                    maxLength={6}
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={cancelVerification}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {verifying ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Numbers Section */}
        {/* <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-6 text-white">
            <h2 className="text-xl font-bold flex items-center">
              <span className="mr-3">📱</span>
              Mobile Numbers
            </h2>
            <p className="text-amber-100 text-sm mt-1">
              Secure your account with verified mobile numbers
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Primary Mobile Number
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {maskMobileNumber(securityData.mobileNumber1)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        primaryMobileVerification.statusName
                      )}`}
                    >
                      {primaryMobileVerification.statusName}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {primaryMobileVerification.statusDescription}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setActiveVerification({
                      type: "mobile",
                      which: "primary",
                      step: "request",
                    })
                  }
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 text-sm font-semibold"
                >
                  {primaryMobileVerification.statusName === "Verified"
                    ? "Re-verify"
                    : "Verify"}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Secondary Mobile Number
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {securityData.mobileNumber2
                      ? maskMobileNumber(securityData.mobileNumber2)
                      : "Not set"}
                  </p>
                  {securityData.mobileNumber2 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          secondaryMobileVerification.statusName
                        )}`}
                      >
                        {secondaryMobileVerification.statusName}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {secondaryMobileVerification.statusDescription}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() =>
                    setActiveVerification({
                      type: "mobile",
                      which: "secondory",
                      step: "request",
                    })
                  }
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-semibold"
                >
                  {securityData.mobileNumber2 ? "Verify" : "Add Number"}
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Email Addresses Section */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg border border-purple-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-amber-600 p-4 sm:p-5 md:p-6 text-white">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-lg sm:text-xl">📧</div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Email Addresses
                </h2>
                <p className="text-purple-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
                  Keep your email addresses verified for important updates
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Primary Email */}
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Primary Email Address
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 truncate">
                    {securityData.email}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        primaryEmailVerification.statusName,
                      )}`}
                    >
                      {primaryEmailVerification.statusName}
                    </span>
                    <span className="text-gray-500 text-xs truncate">
                      {primaryEmailVerification.statusDescription}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setActiveVerification({
                      type: "email",
                      which: "primary",
                      step: "request",
                    })
                  }
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap w-full sm:w-auto"
                >
                  {primaryEmailVerification.statusName === "Verified"
                    ? "Re-verify"
                    : "Verify Now"}
                </button>
              </div>
            </div>

            {/* Secondary Email */}
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Secondary Email Address
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Add a secondary email for backup and recovery
                  </p>
                  {secondaryEmailVerification.statusName !== "Not Verified" && (
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          secondaryEmailVerification.statusName,
                        )}`}
                      >
                        {secondaryEmailVerification.statusName}
                      </span>
                      <span className="text-gray-500 text-xs truncate">
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
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap w-full sm:w-auto"
                >
                  {secondaryEmailVerification.statusName === "Not Verified"
                    ? "Add & Verify"
                    : "Manage"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-amber-600 text-lg mr-2">🔐</span>
            Security Tips
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Keep your email addresses updated</p>
            <p>• Verify all contact methods for account recovery</p>
            <p>• Use a secondary email for backup</p>
            <p>• Never share your verification codes with anyone</p>
          </div>
        </div>
      </div>
    </div>
  );
}
