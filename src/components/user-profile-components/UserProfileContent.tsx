// components/UserProfileContent.tsx
"use client";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { UserProfile, UserProfileResponse } from "@/types/sidebar";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserProfileContentProps {
  profileData?: UserProfileResponse;
}

export default function UserProfileContent({
  profileData,
}: UserProfileContentProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiService = new UserProfileAPIService();

  const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);

  useEffect(() => {
    if (profileData && profileData.data) {
      setUserProfile(profileData.data);
    } else {
      loadUserProfile();
    }
  }, [profileData]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUserProfile();
      setUserProfile(response.data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!uniqueCode) {
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div>
              <div className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl"></div>
                  <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Profile Unavailable
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t load your profile information at this time.
            </p>
            <button
              onClick={loadUserProfile}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full md:w-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-sky-200 p-5 ${className}`}
    >
      {children}
    </div>
  );

  const InfoField = ({
    label,
    value,
    className = "",
  }: {
    label: string;
    value: string;
    className?: string;
  }) => (
    <div className={`mb-4 last:mb-0 ${className}`}>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      <p className="text-gray-800 font-medium text-sm lg:text-base leading-relaxed truncate">
        {value || "Not provided"}
      </p>
    </div>
  );

  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <div className="flex items-center space-x-4 mb-8">
      <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
        <span className="text-white text-lg font-medium">{icon}</span>
      </div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  const StatBadge = ({
    label,
    value,
    color = "sky",
  }: {
    label: string;
    value: string;
    color?: "sky" | "teal" | "green" | "gray";
  }) => {
    const colorClasses = {
      sky: "bg-sky-50 text-sky-700 border-sky-200",
      teal: "bg-teal-50 text-teal-700 border-teal-200",
      green: "bg-emerald-50 text-emerald-700 border-emerald-200",
      gray: "bg-gray-100 text-gray-700 border-gray-300",
    };

    return (
      <div className="flex flex-col items-center text-center p-4 rounded-xl border bg-white hover:shadow-sm transition-all duration-200">
        <span className="text-xs font-medium text-gray-500 mb-1">{label}</span>
        <span
          className={`text-lg font-semibold px-3 py-1 rounded-lg border ${colorClasses[color]}`}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Profile Information
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                View and manage your personal details
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                Last updated:{" "}
                {new Date(userProfile.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <SectionHeader title="Personal Information" icon="👤" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
                <InfoCard>
                  <InfoField
                    label="Full Name"
                    value={`${userProfile.firstName} ${userProfile.middleName || ""} ${userProfile.lastName}`.trim()}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField label="Username" value={userProfile.username} />
                </InfoCard>

                <InfoCard>
                  <InfoField label="Email Address" value={userProfile.email} />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Date of Birth"
                    value={userProfile.dateOfBirth || "Not provided"}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Gender"
                    value={userProfile.gender || "Not specified"}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Religion"
                    value={userProfile.religion || "Not specified"}
                  />
                </InfoCard>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <SectionHeader title="Contact Information" icon="📞" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <InfoCard>
                  <InfoField
                    label="Primary Mobile"
                    value={userProfile.mobileNumber1 || "Not provided"}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Secondary Mobile"
                    value={userProfile.mobileNumber2 || "Not provided"}
                  />
                </InfoCard>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <SectionHeader title="Address Information" icon="🏠" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
                <InfoCard className="sm:col-span-2 lg:col-span-1">
                  <InfoField
                    label="Complete Address"
                    value={
                      `${userProfile.addressNumber || ""} ${userProfile.addressLine1 || ""}, ${userProfile.addressLine2 || ""}`.trim() ||
                      "Address not provided"
                    }
                  />
                </InfoCard>

                <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-5 md:gap-6">
                  <InfoCard>
                    <InfoField
                      label="City"
                      value={userProfile.city || "Not specified"}
                    />
                  </InfoCard>

                  <InfoCard>
                    <InfoField
                      label="District"
                      value={userProfile.district || "Not specified"}
                    />
                  </InfoCard>

                  <InfoCard>
                    <InfoField
                      label="Province"
                      value={userProfile.province || "Not specified"}
                    />
                  </InfoCard>

                  <InfoCard>
                    <InfoField
                      label="Country"
                      value={userProfile.countryName || "Not specified"}
                    />
                  </InfoCard>
                </div>

                <InfoCard className="sm:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoField
                      label="Postal Code"
                      value={userProfile.postalCode || "Not provided"}
                    />
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Verified Status
                      </label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>

          {/* Right Column - Identification & Stats */}
          <div className="space-y-6 lg:space-y-8">
            {/* Identification Cards */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <SectionHeader title="Identification" icon="🆔" />

              <div className="space-y-5">
                <InfoCard>
                  <InfoField
                    label="National ID (NIC)"
                    value={userProfile.nic || "Not provided"}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Passport Number"
                    value={userProfile.passportNumber || "Not provided"}
                  />
                </InfoCard>

                <InfoCard>
                  <InfoField
                    label="Driving License"
                    value={userProfile.drivingLicenseNumber || "Not provided"}
                  />
                </InfoCard>
              </div>
            </div>

            {/* Benefits & Stats */}
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg border border-sky-200 p-6">
              <SectionHeader title="Benefits" icon="💰" />

              <div className="space-y-6">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    {userProfile.benefitsPointsCount}
                  </div>
                  <p className="text-sm text-gray-600">Reward Points</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Earn more points with every booking
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl p-4 border border-sky-100">
                    <div className="text-lg font-semibold text-sky-700 mb-1">
                      Available
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {userProfile.benefitsPointsCount}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                    <div className="text-lg font-semibold text-teal-700 mb-1">
                      Value
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      LKR{" "}
                      {(userProfile.benefitsPointsCount * 10).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <SectionHeader title="Account Status" icon="📊" />

              <div className="grid grid-cols-2 gap-4">
                <StatBadge
                  label="User Type"
                  value={userProfile.userType}
                  color="sky"
                />
                <StatBadge
                  label="Account Status"
                  value={userProfile.userStatus}
                  color="green"
                />
                <div className="col-span-2">
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Member Since
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {new Date(userProfile.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl shadow-lg border border-teal-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-teal-600"
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
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/profile/user/update"
                  className="block w-full px-4 py-3 bg-white text-sky-700 rounded-lg border border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200 text-sm font-medium flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Update Profile
                </Link>
                <Link
                  href="/password-change"
                  className="w-full px-4 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
