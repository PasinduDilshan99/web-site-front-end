// app/profile/user/update/page.tsx
"use client";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { UserProfile } from "@/types/sidebar";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { UserUpdateRequest } from "@/types/user-profile-types";
import PasswordValidationModal from "@/components/user-profile-components/PasswordValidationModal";
import Image from "next/image";
import UpdateUserProfileLoading from "@/components/user-profile-components/Loadings/UpdateUserProfileLoading";
import { OtherService } from "@/services/otherService";
import { SECRET_QUESTIONS_CHANGE_PAGE_PATH, USER_PROFILE_USER_PAGE_PATH } from "@/utils/urls";

const UserProfileUpdatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [mobileNumber1, setMobileNumber1] = useState("");
  const [mobileNumber2, setMobileNumber2] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [countryName, setCountryName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const apiService = new UserProfileAPIService();

  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    if (!uniqueCode) {
      router.push("/login");
      return;
    }
    loadUserProfile();
  }, [router]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserProfile();
      const profile = response.data;
      setUserProfile(profile);

      // Set form values
      setFirstName(profile.firstName || "");
      setMiddleName(profile.middleName || "");
      setLastName(profile.lastName || "");
      setNic(profile.nic || "");
      setPassportNumber(profile.passportNumber || "");
      setDrivingLicenseNumber(profile.drivingLicenseNumber || "");
      setEmail(profile.email || "");
      setMobileNumber1(profile.mobileNumber1 || "");
      setMobileNumber2(profile.mobileNumber2 || "");
      setDateOfBirth(
        profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
      );
      setGender(profile.gender || "");
      setCountry(profile.countryName || "");
      setAddressNumber(profile.addressNumber || "");
      setAddressLine1(profile.addressLine1 || "");
      setAddressLine2(profile.addressLine2 || "");
      setCity(profile.city || "");
      setDistrict(profile.district || "");
      setProvince(profile.province || "");
      setCountryName(profile.countryName || "");
      setPostalCode(profile.postalCode || "");
      setImageUrl(profile.imageUrl || "");
      if (profile.imageUrl) {
        setPreviewImage(profile.imageUrl);
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError(null);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      const result = await OtherService.uploadImage(file);
      setImageUrl(result.data.secure_url);

      setSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload image:", err);
      setError("Failed to upload image. Please try again.");
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(null);
      setImageUrl("");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, GIF, WEBP).");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }

      handleImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    if (previewImage && previewImage !== imageUrl) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const prepareUpdateRequest = (): UserUpdateRequest => {
    const request: UserUpdateRequest = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    if (middleName.trim()) request.middleName = middleName.trim();
    if (nic.trim()) request.nic = nic.trim();
    if (passportNumber.trim()) request.passportNumber = passportNumber.trim();
    if (drivingLicenseNumber.trim())
      request.drivingLicenseNumber = drivingLicenseNumber.trim();
    if (email.trim()) request.email = email.trim();
    if (mobileNumber1.trim()) request.mobileNumber1 = mobileNumber1.trim();
    if (mobileNumber2.trim()) request.mobileNumber2 = mobileNumber2.trim();
    if (dateOfBirth.trim()) request.dateOfBirth = dateOfBirth.trim();
    if (imageUrl.trim()) request.imageUrl = imageUrl.trim();
    if (gender.trim()) request.gender = gender.trim();
    if (country.trim()) request.country = country.trim();
    if (addressNumber.trim()) request.addressNumber = addressNumber.trim();
    if (addressLine1.trim()) request.addressLine1 = addressLine1.trim();
    if (addressLine2.trim()) request.addressLine2 = addressLine2.trim();
    if (city.trim()) request.city = city.trim();
    if (district.trim()) request.district = district.trim();
    if (province.trim()) request.province = province.trim();
    if (postalCode.trim()) request.postalCode = postalCode.trim();

    return request;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updateRequest = prepareUpdateRequest();
      const response = await apiService.updateAccount(updateRequest);

      if (response.message) {
        setSuccess("Profile updated successfully!");
      }

      setTimeout(() => {
        loadUserProfile();
      }, 1500);
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(USER_PROFILE_USER_PAGE_PATH);
  };

  const handleUpdateSecretQuestions = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordValidationSuccess = () => {
    setShowPasswordModal(false);
    router.push(SECRET_QUESTIONS_CHANGE_PAGE_PATH);
  };

  if (loading) {
    return <UpdateUserProfileLoading />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-sky-200 p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-red-500"
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
            <h3 className="text-lg sm:text-xl font-semibold text-sky-800 mb-2">
              Profile Not Found
            </h3>
            <p className="text-sky-600 text-sm sm:text-base mb-4 sm:mb-6">
              We couldn&apos;t load your profile information.
            </p>
            <button
              onClick={() => router.push("/profile/user")}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                Update Profile
              </h1>
              <p className="text-sky-600 text-sm sm:text-base">
                Edit your personal information
              </p>
            </div>
            <div>
              <button
                onClick={handleCancel}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-all duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5"
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
                <span className="text-red-700 text-sm sm:text-base">{error}</span>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-700 text-sm sm:text-base">{success}</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload Section - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-sky-800">
                Profile Picture
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 md:gap-6">
              {/* Profile Image Preview */}
              <div className="flex flex-col items-center mx-auto sm:mx-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-sky-100">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-sky-100 to-teal-100 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-sky-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-sky-700 mb-1.5 sm:mb-2">
                      Upload Profile Picture
                    </label>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="profile-image"
                      />
                      <label
                        htmlFor="profile-image"
                        className="cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md flex items-center justify-center text-xs sm:text-sm"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Choose Image
                      </label>

                      {uploadingImage && (
                        <div className="flex items-center text-sky-600 text-xs sm:text-sm">
                          <svg
                            className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2"
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
                          <span className="hidden xs:inline">Uploading...</span>
                          <span className="xs:hidden">...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-sky-600 bg-sky-50 p-2.5 sm:p-3 rounded-lg border border-sky-200">
                    <p className="flex items-start">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0"
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
                      <span className="hidden xs:inline">Supported formats: JPEG, PNG, GIF, WEBP. Max size: 5MB.</span>
                      <span className="xs:hidden">Max 5MB: JPG, PNG, GIF, WEBP</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-sky-800">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  required
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  placeholder="Enter middle name"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  required
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter gender"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Religion
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter religion"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Identification - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-sky-800">
                Identification
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  NIC Number
                </label>
                <input
                  type="text"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  placeholder="Enter NIC number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Enter passport number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Driving License
                </label>
                <input
                  type="text"
                  value={drivingLicenseNumber}
                  onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                  placeholder="Enter driving license number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Contact Information - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
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
              <h2 className="text-base sm:text-lg font-semibold text-sky-800">
                Contact Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter primary email"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Primary Mobile
                </label>
                <input
                  type="text"
                  value={mobileNumber1}
                  onChange={(e) => setMobileNumber1(e.target.value)}
                  placeholder="Enter primary mobile number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Secondary Mobile
                </label>
                <input
                  type="text"
                  value={mobileNumber2}
                  onChange={(e) => setMobileNumber2(e.target.value)}
                  placeholder="Enter secondary mobile number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Address Information - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-sky-800">
                Address Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Address Number
                </label>
                <input
                  type="text"
                  value={addressNumber}
                  onChange={(e) => setAddressNumber(e.target.value)}
                  placeholder="Enter address number"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Enter address line 1"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Enter address line 2"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  District
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Enter district"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Province
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Enter province"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Country
                </label>
                <input
                  type="text"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="Enter country"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-sky-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter postal code"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-sky-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex flex-col xs:flex-row justify-end gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="cursor-pointer px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 disabled:opacity-50 transition-all duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md text-sm sm:text-base"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    <span className="hidden xs:inline">Saving...</span>
                    <span className="xs:hidden">...</span>
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Secret Questions Update Card - Responsive */}
        <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-sky-800 mb-1">
                Security Questions
              </h3>
              <p className="text-sky-600 text-xs sm:text-sm">
                Update your secret questions for enhanced security
              </p>
            </div>
            <button
              onClick={handleUpdateSecretQuestions}
              className="cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md flex items-center justify-center text-xs sm:text-sm"
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
              <span className="hidden xs:inline">Update Secret Questions</span>
              <span className="xs:hidden">Update Security</span>
            </button>
          </div>
          <div className="text-xs sm:text-sm text-sky-600 bg-sky-100 p-2.5 sm:p-3 rounded-lg border border-sky-200">
            <p className="flex items-start gap-1.5 sm:gap-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L6.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span className="hidden xs:inline">You will be asked to re-enter your password for security verification.</span>
              <span className="xs:hidden">Password required for security verification.</span>
            </p>
          </div>
        </div>

        {/* Helper Text - Responsive */}
        <div className="text-center text-xs sm:text-sm text-sky-500">
          <p>
            <span className="hidden xs:inline">Note:</span> Some fields may require additional verification after update
          </p>
        </div>
      </div>

      {/* Password Validation Modal */}
      <PasswordValidationModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordValidationSuccess}
        username={userProfile.username}
        imageUrl={userProfile.imageUrl}
      />
    </div>
  );
};

export default UserProfileUpdatePage;