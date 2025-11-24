// components/UserProfileContent.tsx
"use client";
import { ApiService } from "@/services/apiService";
import { UserProfile } from "@/types/sidebar";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserProfileContentProps {
  profileData?: any;
}

export default function UserProfileContent({
  profileData,
}: UserProfileContentProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiService = new ApiService();

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
      <div className="flex-1 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center text-gray-500">
          Failed to load user profile
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Profile Information
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-gray-800">
                  {userProfile.firstName} {userProfile.middleName || ""}{" "}
                  {userProfile.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Username
                </label>
                <p className="text-gray-800">{userProfile.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-gray-800">{userProfile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date of Birth
                </label>
                <p className="text-gray-800">{userProfile.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Gender
                </label>
                <p className="text-gray-800">{userProfile.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Religion
                </label>
                <p className="text-gray-800">{userProfile.religion}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Mobile Number 1
                </label>
                <p className="text-gray-800">{userProfile.mobileNumber1}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Mobile Number 2
                </label>
                <p className="text-gray-800">
                  {userProfile.mobileNumber2 || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Address
                </label>
                <p className="text-gray-800">
                  {userProfile.addressNumber} {userProfile.addressLine1},{" "}
                  {userProfile.addressLine2}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  City
                </label>
                <p className="text-gray-800">{userProfile.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  District
                </label>
                <p className="text-gray-800">{userProfile.district}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Province
                </label>
                <p className="text-gray-800">{userProfile.province}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Country
                </label>
                <p className="text-gray-800">{userProfile.countryName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Postal Code
                </label>
                <p className="text-gray-800">{userProfile.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Identification & Wallet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Identification
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    NIC
                  </label>
                  <p className="text-gray-800">{userProfile.nic}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Passport Number
                  </label>
                  <p className="text-gray-800">{userProfile.passportNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Driving License
                  </label>
                  <p className="text-gray-800">
                    {userProfile.drivingLicenseNumber}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Wallet & Benefits
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Wallet Number
                  </label>
                  <p className="text-gray-800">{userProfile.walletNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Wallet Amount
                  </label>
                  <p className="text-gray-800">
                    LKR {userProfile.walletAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Benefits Points
                  </label>
                  <p className="text-gray-800">
                    {userProfile.benefitsPointsCount} points
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Wallet Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userProfile.walletStatus === "Open"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {userProfile.walletStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
