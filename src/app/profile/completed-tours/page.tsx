// app/profile/completed-tours/page.tsx
"use client";
import UserProfileCompletedToursLoading from "@/components/user-profile-components/Loadings/UserProfileCompletedToursLoading";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { CompletedTour } from "@/types/completed-tours";
import { USER_PROFILE_COMPLETED_TOURS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { USER_PROFILE_PAGE_PATH } from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CompletedToursPage() {
  const [completedTours, setCompletedTours] = useState<CompletedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const { user } = useAuth();
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: number]: boolean;
  }>({});

  // Add this function to toggle description
  const toggleDescription = (bookingId: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_COMPLETED_TOURS_VIEW_PRIVILEGE)
    ) {
      router.push(USER_PROFILE_PAGE_PATH);
    }
  }, [user, router]);

  useEffect(() => {
    loadCompletedTours();
  }, []);

  const loadCompletedTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCompletedTours();
      setCompletedTours(response.data || []);
    } catch (err) {
      console.error("Failed to load completed tours:", err);
      setError("Failed to load completed tours. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "PROCESSING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "PENDING":
        return "bg-sky-100 text-sky-800 border-sky-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    window.open(documentUrl, "_blank");
  };

  if (loading) {
    return <UserProfileCompletedToursLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Tours
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadCompletedTours}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (completedTours.length === 0) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              No Completed Tours
            </h3>
            <p className="text-gray-600 mb-6">
              Start your journey and complete your first tour to see it here.
            </p>
            <button
              onClick={() => router.push("/tours")}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full"
            >
              Explore Available Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Completed Tours
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Your travel history and completed adventures
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                {completedTours.length} Tour
                {completedTours.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-sky-600 mb-1">
              {completedTours.length}
            </div>
            <div className="text-sm text-gray-600">Total Tours</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">
              {completedTours.reduce((sum, tour) => sum + tour.totalPersons, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Travelers</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
              {completedTours.reduce(
                (sum, tour) => sum + tour.activities.length,
                0,
              )}
            </div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
              {formatPrice(
                completedTours.reduce((sum, tour) => sum + tour.finalAmount, 0),
              )}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>

        {/* Completed Tours List */}
        <div className="space-y-4 md:space-y-6">
          {completedTours.map((tour) => (
            <div
              key={tour.bookingId}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 md:p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                      <h2 className="text-lg md:text-xl font-bold truncate">
                        {tour.tourName}
                      </h2>
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                        {tour.bookingStatus.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sky-100 text-sm md:text-base">
                        {expandedDescriptions[tour.bookingId]
                          ? tour.tourDescription
                          : tour.tourDescription.substring(0, 200) +
                            (tour.tourDescription.length > 200 ? "..." : "")}
                      </p>
                      {tour.tourDescription.length > 200 && (
                        <button
                          onClick={() => toggleDescription(tour.bookingId)}
                          className="cursor-pointer text-sky-200 hover:text-sky-100 text-xs underline mt-1 transition-colors"
                        >
                          {expandedDescriptions[tour.bookingId]
                            ? "Show Less"
                            : "Show More"}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {formatDate(tour.travelStartDate)} -{" "}
                          {formatDate(tour.travelEndDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{tour.totalPersons} travelers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{formatPrice(tour.finalAmount)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingExpansion(tour.bookingId)}
                    className="cursor-pointer bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors self-start md:self-center"
                  >
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-200 ${
                        expandedBooking === tour.bookingId ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedBooking === tour.bookingId && (
                <div className="p-4 md:p-6 space-y-4 md:space-y-6 border-t border-gray-200">
                  {/* Package & Payment Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-sky-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Package Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Package:</span>
                          <span className="font-semibold text-gray-800 truncate ml-2">
                            {tour.packageName}
                          </span>
                        </div>
                        {tour.packageScheduleName && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Schedule:</span>
                            <span className="font-semibold text-gray-800 truncate ml-2">
                              {tour.packageScheduleName}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">
                            Price per person:
                          </span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(tour.packagePricePerPerson)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-emerald-600">
                            {tour.discountPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-teal-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Payment Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(tour.totalAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-emerald-600">
                            -{formatPrice(tour.discountAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">
                            Tax & Insurance:
                          </span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(tour.taxAmount + tour.insuranceAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 pt-2 border-t border-gray-300">
                          <span className="text-gray-800 font-semibold">
                            Final Amount:
                          </span>
                          <span className="font-bold text-teal-600">
                            {formatPrice(tour.finalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants Section */}
                  {tour.participants.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a6 6 0 01-9 5.197"
                          />
                        </svg>
                        Participants ({tour.participants.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {tour.participants.map((participant, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:border-sky-200 transition-colors"
                          >
                            <h4 className="font-semibold text-gray-800 mb-2 truncate">
                              {participant.firstName} {participant.lastName}
                            </h4>
                            <div className="space-y-1 text-xs md:text-sm text-gray-600">
                              <div className="flex items-center">
                                <span className="w-20 text-gray-500">Age:</span>
                                <span>
                                  {participant.age} • {participant.gender}
                                </span>
                              </div>
                              {participant.passportNumber && (
                                <div className="flex items-center">
                                  <span className="w-20 text-gray-500">
                                    Passport:
                                  </span>
                                  <span className="truncate">
                                    {participant.passportNumber}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <span className="w-20 text-gray-500">
                                  Nationality:
                                </span>
                                <span>{participant.nationality}</span>
                              </div>
                              {participant.allergies !== "None" && (
                                <div className="flex items-center text-amber-600">
                                  <span className="w-20 text-gray-500">
                                    Allergies:
                                  </span>
                                  <span className="truncate">
                                    {participant.allergies}
                                  </span>
                                </div>
                              )}
                              {participant.emergencyContactName && (
                                <div className="flex items-center">
                                  <span className="w-20 text-gray-500">
                                    Emergency:
                                  </span>
                                  <span className="truncate">
                                    {participant.emergencyContactName} (
                                    {participant.emergencyContactRelationship})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities Section */}
                  {tour.activities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Activities ({tour.activities.length})
                      </h3>
                      <div className="space-y-3 md:space-y-4">
                        {tour.activities.map((activity, index) => (
                          <div
                            key={index}
                            className="bg-emerald-50 rounded-lg p-3 md:p-4 border border-emerald-200"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-2">
                              <h4 className="font-semibold text-gray-800 truncate">
                                {activity.activityName}
                              </h4>
                              <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap">
                                {formatPrice(activity.totalPrice)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                              {activity.activityDescription}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs md:text-sm text-gray-600">
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>{formatDate(activity.activityDate)}</span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400"
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
                                <span>
                                  {formatTime(activity.startTime)} -{" "}
                                  {formatTime(activity.endTime)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400"
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
                                <span>{activity.durationHours}h</span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400"
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
                                </svg>
                                <span className="truncate">
                                  {activity.destinationName}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payments Section */}
                  {tour.payments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Payment History
                      </h3>
                      <div className="space-y-3">
                        {tour.payments.map((payment, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:border-purple-200 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-1 truncate">
                                  {payment.paymentReference}
                                </h4>
                                <p className="text-gray-600 text-xs md:text-sm">
                                  {payment.paymentMethod.replace("_", " ")} •
                                  Installment {payment.installmentNumber}/
                                  {payment.totalInstallments}
                                </p>
                              </div>
                              <div className="flex flex-col items-start md:items-end gap-1">
                                <div className="font-bold text-purple-600 text-sm md:text-base">
                                  {formatPrice(payment.amount)}
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.paymentStatus)}`}
                                >
                                  {payment.paymentStatus}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs md:text-sm text-gray-600">
                              {payment.paymentDate && (
                                <div className="flex items-center">
                                  <span className="text-gray-500">Paid:</span>
                                  <span className="ml-2">
                                    {formatDate(payment.paymentDate)}
                                  </span>
                                </div>
                              )}
                              {payment.dueDate && (
                                <div className="flex items-center">
                                  <span className="text-gray-500">Due:</span>
                                  <span className="ml-2">
                                    {formatDate(payment.dueDate)}
                                  </span>
                                </div>
                              )}
                              {payment.transactionId && (
                                <div className="flex items-center truncate">
                                  <span className="text-gray-500">
                                    Transaction:
                                  </span>
                                  <span className="ml-2 truncate">
                                    {payment.transactionId}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents Section */}
                  {tour.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Documents ({tour.documents.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tour.documents.map((document, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              downloadDocument(
                                document.documentUrl,
                                document.documentName,
                              )
                            }
                            className="flex items-center justify-between bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg p-3 md:p-4 transition-all duration-200 hover:shadow-sm"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <div className="text-left">
                                <span className="text-xs md:text-sm font-medium text-gray-800 block truncate">
                                  {document.documentName}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(document.fileSize / 1024).toFixed(1)} KB
                                </span>
                              </div>
                            </div>
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
