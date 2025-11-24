// components/UserProfileContent.tsx
"use client";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
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
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-lg p-8">
            <div className="text-red-500 text-xl font-semibold mb-4">
              Failed to load user profile
            </div>
            <button
              onClick={loadUserProfile}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-all duration-300 p-4 ${className}`}>
      {children}
    </div>
  );

  const InfoField = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
    <div className={`mb-3 last:mb-0 ${className}`}>
      <label className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
        {label}
      </label>
      <p className="text-gray-800 font-medium">{value || "N/A"}</p>
    </div>
  );

  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">{icon}</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Profile Information
          </h1>
          <p className="text-gray-600 mt-2">Manage and view your personal details</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Personal Information */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg border border-amber-200 p-6 md:p-8">
              <SectionHeader title="Personal Information" icon="👤" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <InfoCard>
                  <InfoField label="Full Name" value={`${userProfile.firstName} ${userProfile.middleName || ''} ${userProfile.lastName}`} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Username" value={userProfile.username} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Email" value={userProfile.email} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Date of Birth" value={userProfile.dateOfBirth} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Gender" value={userProfile.gender} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Religion" value={userProfile.religion} />
                </InfoCard>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-purple-200 p-6 md:p-8 mt-6">
              <SectionHeader title="Contact Information" icon="📞" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <InfoCard>
                  <InfoField label="Mobile Number 1" value={userProfile.mobileNumber1} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Mobile Number 2" value={userProfile.mobileNumber2} />
                </InfoCard>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg border border-amber-200 p-6 md:p-8 mt-6">
              <SectionHeader title="Address Information" icon="🏠" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <InfoCard className="sm:col-span-2">
                  <InfoField 
                    label="Full Address" 
                    value={`${userProfile.addressNumber} ${userProfile.addressLine1}, ${userProfile.addressLine2}`} 
                  />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="City" value={userProfile.city} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="District" value={userProfile.district} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Province" value={userProfile.province} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Country" value={userProfile.countryName} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Postal Code" value={userProfile.postalCode} />
                </InfoCard>
              </div>
            </div>
          </div>

          {/* Sidebar - Identification & Wallet */}
          <div className="space-y-6 lg:space-y-8">
            {/* Identification */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-purple-200 p-6">
              <SectionHeader title="Identification" icon="🆔" />
              
              <div className="space-y-4">
                <InfoCard>
                  <InfoField label="NIC" value={userProfile.nic} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Passport Number" value={userProfile.passportNumber} />
                </InfoCard>
                
                <InfoCard>
                  <InfoField label="Driving License" value={userProfile.drivingLicenseNumber} />
                </InfoCard>
              </div>
            </div>

            {/* Wallet & Benefits */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-200 p-6">
              <SectionHeader title="Wallet & Benefits" icon="💰" />
              
              <div className="space-y-4">
                <InfoCard>
                  <InfoField label="Wallet Number" value={userProfile.walletNumber} />
                </InfoCard>
                
                <InfoCard>
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                      Wallet Amount
                    </label>
                    <p className="text-2xl font-bold text-purple-600">
                      LKR {userProfile.walletAmount.toLocaleString()}
                    </p>
                  </div>
                </InfoCard>
                
                <InfoCard>
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                      Benefits Points
                    </label>
                    <p className="text-xl font-bold text-amber-600">
                      {userProfile.benefitsPointsCount} points
                    </p>
                  </div>
                </InfoCard>
                
                <InfoCard>
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                      Wallet Status
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      userProfile.walletStatus === "Open" 
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {userProfile.walletStatus}
                    </span>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl shadow-lg border border-purple-200 p-6">
              <SectionHeader title="Account Status" icon="📊" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-100">
                  <span className="text-sm font-medium text-gray-600">User Type</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                    {userProfile.userType}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-purple-100">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {userProfile.userStatus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-100">
                  <span className="text-sm font-medium text-gray-600">Member Since</span>
                  <span className="text-sm font-semibold text-purple-600">
                    {new Date(userProfile.createdAt).getFullYear()}
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