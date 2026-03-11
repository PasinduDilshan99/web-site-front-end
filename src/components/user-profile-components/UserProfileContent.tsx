// components/UserProfileContent.tsx
"use client";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { UserProfile, UserProfileResponse } from "@/types/sidebar";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UserDetailsLoading from "./UserDetailsLoading";
import {
  LOGIN_PAGE_PATH,
  PASSWORD_CHANGE_PAGE_PATH,
  USER_PROFILE_UPDATE_PAGE_PATH,
} from "@/utils/urls";

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
    router.push(LOGIN_PAGE_PATH);
  }

  if (loading) {
    return <UserDetailsLoading />;
  }

  if (!userProfile) {
    return (
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500"
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
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Profile Unavailable
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
              We couldn&apos;t load your profile information at this time.
            </p>
            <button
              onClick={loadUserProfile}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto text-xs sm:text-sm md:text-base"
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
      className={`bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-sky-200 p-3 sm:p-4 md:p-5 ${className}`}
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
    <div className={`mb-3 sm:mb-4 last:mb-0 ${className}`}>
      <label className="block text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
        {label}
      </label>
      <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base leading-relaxed truncate">
        {value || "Not provided"}
      </p>
    </div>
  );

  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
        <span className="text-white text-base sm:text-lg md:text-xl font-medium">
          {icon}
        </span>
      </div>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
        {title}
      </h2>
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
      <div className="flex flex-col items-center text-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border bg-white hover:shadow-sm transition-all duration-200">
        <span className="text-[10px] sm:text-xs font-medium text-gray-500 mb-0.5 sm:mb-1">
          {label}
        </span>
        <span
          className={`text-xs sm:text-sm md:text-base font-semibold px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border ${colorClasses[color]}`}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Profile Information
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                View and manage your personal details
              </p>
            </div>
            <div className="flex items-center">
              <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-sky-50 text-sky-700 rounded-lg text-[10px] sm:text-xs font-medium border border-sky-200 whitespace-nowrap">
                Updated:{" "}
                {new Date(userProfile.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8">
              <SectionHeader title="Personal Information" icon="👤" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
                    value={
                      userProfile.dateOfBirth
                        ? new Date(userProfile.dateOfBirth).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "Not provided"
                    }
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
                    label="Nationality"
                    value={userProfile.countryName || "Not specified"}
                  />
                </InfoCard>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8">
              <SectionHeader title="Contact Information" icon="📞" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8">
              <SectionHeader title="Address Information" icon="🏠" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                <InfoCard className="sm:col-span-2 lg:col-span-1">
                  <InfoField
                    label="Complete Address"
                    value={
                      `${userProfile.addressNumber || ""} ${userProfile.addressLine1 || ""} ${userProfile.addressLine2 || ""}`.trim() ||
                      "Address not provided"
                    }
                  />
                </InfoCard>

                <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <InfoField
                      label="Postal Code"
                      value={userProfile.postalCode || "Not provided"}
                    />
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
                        Verified Status
                      </label>
                      <span className="inline-flex items-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>

          {/* Right Column - Identification & Stats */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            {/* Identification Cards */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6">
              <SectionHeader title="Identification" icon="🆔" />

              <div className="space-y-3 sm:space-y-4 md:space-y-5">
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

            {/* Account Status */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6">
              <SectionHeader title="Account Status" icon="📊" />

              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <StatBadge
                  label="User Type"
                  value={userProfile.userType}
                  color="sky"
                />
                <StatBadge
                  label="Status"
                  value={userProfile.userStatus}
                  color="green"
                />
                <div className="col-span-2">
                  <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">
                      Member Since
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
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
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-teal-200 p-4 sm:p-5 md:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-teal-600"
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
              <div className="space-y-2 sm:space-y-3">
                <Link
                  href={USER_PROFILE_UPDATE_PAGE_PATH}
                  className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white text-sky-700 rounded-lg border border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200 text-xs sm:text-sm font-medium flex items-center justify-center"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
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
                  href={PASSWORD_CHANGE_PAGE_PATH}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-xs sm:text-sm font-medium flex items-center justify-center"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
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
