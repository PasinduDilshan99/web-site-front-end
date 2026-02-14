// app/profile/pending-tours/page.tsx
"use client";
import UserProfilePendingToursLoading from "@/components/user-profile-components/Loadings/UserProfilePendingToursLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { PendingTour } from "@/types/pending-tours";
import { USER_PROFILE_PENDING_TOURS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PendingToursPage() {
  const [pendingTours, setPendingTours] = useState<PendingTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_PENDING_TOURS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadPendingTours();
  }, []);

  const loadPendingTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPendingTours();
      setPendingTours(response.data || []);
    } catch (err) {
      console.error("Failed to load pending tours:", err);
      setError("Failed to load pending tours");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "CONFIRMED":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTourTypeColor = (type: string) => {
    switch (type) {
      case "ADVENTURE":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "LEISURE":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "CULTURAL":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "WILDLIFE":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "BEACH":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const handleCancelRequest = async (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this pending tour?")) {
      try {
        // Implement cancel API call here
        console.log("Cancelling booking:", bookingId);
        await loadPendingTours();
      } catch (error) {
        console.error("Failed to cancel request:", error);
        alert("Failed to cancel request. Please try again.");
      }
    }
  };

  if (loading) {
    return <UserProfilePendingToursLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-50 to-teal-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-red-500 text-5xl md:text-6xl mb-4">🚫</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Pending Tours
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">{error}</p>
            <button
              onClick={loadPendingTours}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (pendingTours.length === 0) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-50 to-teal-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-sky-400 text-5xl md:text-6xl mb-4">🌊</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              No Pending Tours
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              You don&apos;t have any pending tours at the moment. Dive into our tours and start your adventure!
            </p>
            <button
              onClick={() => router.push("/tours")}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base"
            >
              Browse Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-50 to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Pending Tours
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Tours awaiting confirmation - prices shown are starting from rates
          </p>
        </div>

        {/* Statistics - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-sky-600">
              {pendingTours.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Total Pending
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-teal-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-teal-600">
              {formatCurrency(
                pendingTours.reduce((sum, tour) => sum + tour.packageTotalPrice, 0),
              )}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Total Package Value*
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-cyan-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-cyan-600">
              {pendingTours.reduce((sum, tour) => sum + tour.tourDuration, 0)}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Total Days
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-emerald-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-emerald-600">
              {new Set(pendingTours.map(t => t.tourType)).size}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Tour Types
            </div>
          </div>
        </div>

        {/* Pending Tours List */}
        <div className="space-y-4 md:space-y-6">
          {pendingTours.map((tour) => (
            <div
              key={tour.bookingId}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 overflow-hidden"
            >
              {/* Tour Header - Responsive Layout */}
              <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 md:p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                      <h2 className="text-base md:text-lg lg:text-xl font-bold truncate">
                        {tour.tourName}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getBookingStatusColor(tour.bookingStatus)}`}
                      >
                        {tour.bookingStatus}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getTourTypeColor(tour.tourType)}`}
                      >
                        {tour.tourType}
                      </span>
                    </div>
                    <p className="text-sky-100 text-sm md:text-base mb-3 line-clamp-2">
                      {tour.tourDescription}
                    </p>

                    {/* Mobile: Stacked info */}
                    <div className="space-y-2 md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span className="text-xs">
                            {formatDate(tour.bookingDate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span className="text-xs">{tour.startLocation}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span>💰</span>
                          <span className="text-xs">
                            From {formatCurrency(tour.packagePricePerPerson)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>⏱️</span>
                          <span className="text-xs">
                            {tour.tourDuration} days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Horizontal info */}
                    <div className="hidden md:flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>Booked: {formatDate(tour.bookingDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📍</span>
                        <span>{tour.startLocation} → {tour.endLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💰</span>
                        <span>From {formatCurrency(tour.packagePricePerPerson)}/person</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{tour.tourDuration} days</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🏷️</span>
                        <span>{tour.tourCategory}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingExpansion(tour.bookingId)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors self-start"
                  >
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 transform transition-transform ${
                        expandedBooking === tour.bookingId ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedBooking === tour.bookingId && (
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Status and Action Bar - Responsive */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-100">
                    <div className="space-y-2 sm:space-y-0 sm:space-x-4 flex flex-wrap">
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">
                          Booking Ref:
                        </span>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                          {tour.bookingReference}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">
                          Booking Date:
                        </span>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                          {formatDate(tour.bookingDate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">
                          Duration:
                        </span>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                          {tour.tourDuration} days
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => handleCancelRequest(tour.bookingId)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Cancel Request
                      </button>
                    </div>
                  </div>

                  {/* Tour Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Package Information */}
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-sky-600 mr-2">📦</span>
                        Package Details
                      </h3>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package Name:</span>
                          <span className="font-semibold text-right">
                            {tour.packageName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Description:</span>
                          <span className="font-semibold text-right max-w-[200px]">
                            {tour.packageDescription}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-sky-200 pt-2 mt-2">
                          <span className="text-gray-600">Starting from:</span>
                          <span className="font-semibold text-sky-600">
                            {formatCurrency(tour.packagePricePerPerson)}/person
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total package value:</span>
                          <span className="font-semibold text-teal-600">
                            {formatCurrency(tour.packageTotalPrice)}
                          </span>
                        </div>
                        {tour.discountPercentage > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Discount:</span>
                            <span className="font-semibold text-emerald-600">
                              {tour.discountPercentage}%
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-3 italic">
                        *Final price may vary based on selected options and number of travelers
                      </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-teal-600 mr-2">📞</span>
                        Contact Information
                      </h3>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-semibold text-right">
                            {tour.userFullName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Username:</span>
                          <span className="font-semibold text-right">
                            {tour.username}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-semibold text-right break-all">
                            {tour.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mobile:</span>
                          <span className="font-semibold text-right">
                            {tour.mobileNumber1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour Information */}
                  <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                      <span className="text-cyan-600 mr-2">🌊</span>
                      Tour Information
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                      <div>
                        <span className="text-gray-600 block mb-1">Tour ID:</span>
                        <span className="font-semibold text-gray-800">
                          {tour.tourId}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Type:</span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getTourTypeColor(tour.tourType)}`}>
                          {tour.tourType}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Category:</span>
                        <span className="font-semibold text-gray-800">
                          {tour.tourCategory}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">From:</span>
                        <span className="font-semibold text-gray-800">
                          {tour.startLocation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">To:</span>
                        <span className="font-semibold text-gray-800">
                          {tour.endLocation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Duration:</span>
                        <span className="font-semibold text-gray-800">
                          {tour.tourDuration} days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={() => router.push(`/sri-lankan-tours/${tour.tourId}`)}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm"
                    >
                      View Tour Details
                    </button>
                    <button
                      onClick={() => handleCancelRequest(tour.bookingId)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Price Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            * All prices shown are starting from rates. Final pricing will be confirmed upon booking completion.
          </p>
        </div>
      </div>
    </div>
  );
}