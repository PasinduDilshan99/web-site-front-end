// app/profile/upcoming-tours/page.tsx
"use client";
import UserProfileUpcomingToursLoading from "@/components/user-profile-components/Loadings/UserProfileUpcomingToursLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { UpcomingTour } from "@/types/upcoming-tours";
import { USER_PROFILE_UPCOMING_TOURS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpcomingToursPage() {
  const [upcomingTours, setUpcomingTours] = useState<UpcomingTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "completed" | "cancelled"
  >("upcoming");
  const apiService = new UserProfileAPIService();
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_UPCOMING_TOURS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadUpcomingTours();
  }, []);

  const loadUpcomingTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUpcomingTours();
      setUpcomingTours(response.data || []);
    } catch (err) {
      console.error("Failed to load upcoming tours:", err);
      setError("Failed to load upcoming tours. Please try again later.");
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

  const formatDateTime = (dateString: string, timeString: string) => {
    return `${formatDate(dateString)} at ${formatTime(timeString)}`;
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PROCESSING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "PENDING":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "OVERDUE":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyBadge = (daysUntilTravel: number) => {
    if (daysUntilTravel < 0) {
      return {
        text: "Completed",
        color: "bg-gray-100 text-gray-800 border-gray-300",
      };
    }
    if (daysUntilTravel === 0) {
      return {
        text: "Today",
        color: "bg-red-100 text-red-800 border-red-300",
      };
    }
    if (daysUntilTravel <= 3) {
      return {
        text: "Soon",
        color: "bg-amber-100 text-amber-800 border-amber-300",
      };
    }
    if (daysUntilTravel <= 7) {
      return {
        text: "Next Week",
        color: "bg-blue-100 text-blue-800 border-blue-300",
      };
    }
    return {
      text: "Upcoming",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
  };

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case "READY":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING_DOCS":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "NOT_READY":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    window.open(documentUrl, "_blank");
  };

  const calculatePaymentProgress = (tour: UpcomingTour) => {
    const totalPaid = tour.payments
      .filter((p) => p.paymentStatus === "COMPLETED")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return Math.min((totalPaid / tour.finalAmount) * 100, 100);
  };

  const getDaysUntilText = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `${days} days`;
  };

  const getFilteredTours = () => {
    switch (activeTab) {
      case "completed":
        return upcomingTours.filter(
          (tour) => tour.bookingStatus === "COMPLETED",
        );
      case "cancelled":
        return upcomingTours.filter(
          (tour) => tour.bookingStatus === "CANCELLED",
        );
      default:
        return upcomingTours.filter(
          (tour) =>
            tour.bookingStatus !== "COMPLETED" &&
            tour.bookingStatus !== "CANCELLED",
        );
    }
  };

  if (loading) {
    return <UserProfileUpcomingToursLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
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
              onClick={loadUpcomingTours}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredTours = getFilteredTours();

  if (filteredTours.length === 0) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {activeTab === "upcoming"
                ? "No Upcoming Tours"
                : activeTab === "completed"
                  ? "No Completed Tours"
                  : "No Cancelled Tours"}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === "upcoming"
                ? "You don't have any upcoming tours planned. Start planning your next adventure!"
                : activeTab === "completed"
                  ? "You haven't completed any tours yet. Check back after your travels!"
                  : "Great! You have no cancelled tours."}
            </p>
            {activeTab === "upcoming" && (
              <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                Browse Available Tours
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                My Tours & Bookings
              </h1>
              <p className="text-gray-600">
                Manage your travel plans and upcoming adventures
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                {upcomingTours.length} Total Bookings
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 max-w-md">
            {(["upcoming", "completed", "cancelled"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 px-1.5 py-0.5 bg-gray-200 rounded text-xs">
                  {getFilteredTours().length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-sky-600">
                {upcomingTours.length}
              </div>
              <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                <span className="text-sky-600">📅</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-teal-600">
                {upcomingTours.reduce(
                  (sum, tour) => sum + tour.totalPersons,
                  0,
                )}
              </div>
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <span className="text-teal-600">👥</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Total Travelers</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-emerald-600">
                {upcomingTours.reduce(
                  (sum, tour) => sum + tour.activities.length,
                  0,
                )}
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">🎯</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-gray-800">
                {formatCurrency(
                  upcomingTours.reduce(
                    (sum, tour) => sum + tour.finalAmount,
                    0,
                  ),
                )}
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">💰</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>

        {/* Tours List */}
        <div className="space-y-6">
          {filteredTours.map((tour) => {
            const paymentProgress = calculatePaymentProgress(tour);
            const nextPayment = tour.payments.find(
              (p) => p.paymentStatus === "PENDING",
            );
            const urgencyBadge = getUrgencyBadge(tour.daysUntilTravel);

            return (
              <div
                key={tour.bookingId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Tour Header */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">
                          {tour.tourName}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyBadge.color}`}
                        >
                          {urgencyBadge.text}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tour.bookingStatus)}`}
                        >
                          {tour.bookingStatus}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">📅</span>
                          <span>
                            {formatDate(tour.travelStartDate)} -{" "}
                            {formatDate(tour.travelEndDate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">👥</span>
                          <span>{tour.totalPersons} travelers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">💰</span>
                          <span className="font-semibold">
                            {formatCurrency(tour.finalAmount)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">📍</span>
                          <span>
                            {tour.startLocation} → {tour.endLocation}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">
                        {tour.tourDescription}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-sky-50 text-sky-700 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors text-sm font-medium">
                        Contact Guide
                      </button>
                      <button
                        onClick={() => toggleBookingExpansion(tour.bookingId)}
                        className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-gray-600 transform transition-transform ${
                            expandedBooking === tour.bookingId
                              ? "rotate-180"
                              : ""
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

                  {/* Payment Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Payment Progress
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {formatCurrency(
                          tour.payments
                            .filter((p) => p.paymentStatus === "COMPLETED")
                            .reduce((sum, p) => sum + p.amount, 0),
                        )}{" "}
                        / {formatCurrency(tour.finalAmount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          paymentProgress === 100
                            ? "bg-emerald-500"
                            : "bg-sky-500"
                        }`}
                        style={{ width: `${paymentProgress}%` }}
                      ></div>
                    </div>
                    {nextPayment && (
                      <div className="mt-2 text-sm text-amber-600">
                        Next payment of {formatCurrency(nextPayment.amount)} due{" "}
                        {formatDate(nextPayment.dueDate)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedBooking === tour.bookingId && (
                  <div className="border-t border-gray-200">
                    <div className="p-6 space-y-8">
                      {/* Package & Payment Information */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-5">
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-sky-600">📦</span>
                            </span>
                            Package Details
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Package
                              </span>
                              <span className="font-medium">
                                {tour.packageName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Schedule
                              </span>
                              <span className="font-medium">
                                {tour.packageScheduleName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Price per person
                              </span>
                              <span className="font-medium">
                                {formatCurrency(tour.packagePricePerPerson)}
                              </span>
                            </div>
                            {tour.discountPercentage > 0 && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                  Discount
                                </span>
                                <span className="font-medium text-emerald-600">
                                  -{tour.discountPercentage}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-5">
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-emerald-600">💳</span>
                            </span>
                            Payment Schedule
                          </h3>
                          <div className="space-y-3">
                            {tour.payments.map((payment, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
                              >
                                <div>
                                  <div className="font-medium text-sm text-gray-800">
                                    {payment.paymentReference}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Due: {formatDate(payment.dueDate)}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-800">
                                    {formatCurrency(payment.amount)}
                                  </div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.paymentStatus)}`}
                                  >
                                    {payment.paymentStatus}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Participants */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600">👥</span>
                          </span>
                          Participants ({tour.participants.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tour.participants.map((participant, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-sky-200 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-800">
                                    {participant.firstName}{" "}
                                    {participant.lastName}
                                  </h4>
                                  <div className="text-xs text-gray-500">
                                    {participant.age} years •{" "}
                                    {participant.gender}
                                  </div>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getReadinessColor(participant.participantReadiness)}`}
                                >
                                  {participant.participantReadiness}
                                </span>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                  <span>Passport</span>
                                  <span
                                    className={
                                      participant.passportProvided
                                        ? "text-emerald-600"
                                        : "text-amber-600"
                                    }
                                  >
                                    {participant.passportProvided
                                      ? "✅ Provided"
                                      : "⏳ Pending"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Nationality</span>
                                  <span className="font-medium">
                                    {participant.nationality}
                                  </span>
                                </div>
                                {participant.allergies !== "None" && (
                                  <div className="text-amber-600 text-sm">
                                    ⚠️ Allergies: {participant.allergies}
                                  </div>
                                )}
                                {participant.medicalConditions !== "None" && (
                                  <div className="text-red-600 text-sm">
                                    🏥 Medical: {participant.medicalConditions}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      {tour.activities.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-teal-600">🎯</span>
                            </span>
                            Activities ({tour.activities.length})
                          </h3>
                          <div className="space-y-3">
                            {tour.activities.map((activity, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-teal-200 transition-colors"
                              >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                      {activity.activityName}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-2">
                                      {activity.activityDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                      <div>
                                        📅 {formatDate(activity.activityDate)}
                                      </div>
                                      <div>
                                        ⏰ {formatTime(activity.startTime)} -{" "}
                                        {formatTime(activity.endTime)}
                                      </div>
                                      <div>🕒 {activity.durationHours}h</div>
                                      <div>📍 {activity.destinationName}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-gray-800 mb-2">
                                      {formatCurrency(activity.totalPrice)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {activity.numberOfParticipants}{" "}
                                      participants
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Documents */}
                      {tour.documents.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-amber-600">📄</span>
                            </span>
                            Documents ({tour.documents.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tour.documents.map((document, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  downloadDocument(
                                    document.documentUrl,
                                    document.documentName,
                                  )
                                }
                                className="flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-sm text-left"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                                    <span className="text-sky-600">📄</span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800 text-sm">
                                      {document.documentName}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {document.documentType} •{" "}
                                      {(document.fileSize / 1024).toFixed(1)} KB
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sky-600 text-sm font-medium">
                                  View
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl border border-sky-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Need Assistance?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-3 bg-white text-sky-700 rounded-lg p-4 border border-sky-200 hover:bg-sky-50 transition-all duration-200">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <span>📞</span>
              </div>
              <span className="font-medium">24/7 Support</span>
            </button>
            <button className="flex items-center justify-center space-x-3 bg-white text-emerald-700 rounded-lg p-4 border border-emerald-200 hover:bg-emerald-50 transition-all duration-200">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span>💳</span>
              </div>
              <span className="font-medium">Make Payment</span>
            </button>
            <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span>📋</span>
              </div>
              <span className="font-medium">View Full Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
