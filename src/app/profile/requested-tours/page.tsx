// app/profile/requested-tours/page.tsx
"use client";
import UserProfileRequestedToursLoading from "@/components/user-profile-components/Loadings/UserProfileRequestedToursLoading";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/bookingService";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { RequestedTour } from "@/types/requested-tours";
import { PENDING_BOOKING_STATUS } from "@/utils/constant";
import { USER_PROFILE_REQUESTED_TOURS_VIEW_PRIVILEGE } from "@/utils/privileges";
import {
  EMPLOYEE_PAGE_PATH,
  SRI_LANKAN_TOUR_PAGE_PATH,
  USER_PROFILE_PAGE_PATH,
} from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RequestedToursPage() {
  const [requestedTours, setRequestedTours] = useState<RequestedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();
  const router = useRouter();
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: number]: boolean;
  }>({});

  // ── Custom cancel-confirmation modal state ──
  const [cancelModal, setCancelModal] = useState<{
    open: boolean;
    bookingId: number | null;
  }>({ open: false, bookingId: null });
  const [cancelling, setCancelling] = useState(false);

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
      !user.privileges.includes(USER_PROFILE_REQUESTED_TOURS_VIEW_PRIVILEGE)
    ) {
      router.push(USER_PROFILE_PAGE_PATH);
    }
  }, [user, router]);

  useEffect(() => {
    loadRequestedTours();
  }, []);

  const loadRequestedTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getRequestedTours();
      setRequestedTours(response.data || []);
    } catch (err) {
      console.error("Failed to load requested tours:", err);
      setError("Failed to load requested tours");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "USD",
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

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "URGENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "PENDING_APPROVAL":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "UNDER_REVIEW":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case "AWAITING_APPROVAL":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "PROCESSING":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "DOCUMENTS_REQUIRED":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "INITIATED":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "PENDING":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "FAILED":
        return "bg-red-100 text-red-800 border-red-200";
      case "PARTIAL":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "PENDING_VERIFICATION":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "UPLOADED":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
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

  const getDaysColor = (days: number) => {
    if (days < 0) return "text-red-600 font-semibold";
    if (days <= 7) return "text-red-600 font-semibold";
    if (days <= 14) return "text-orange-600 font-semibold";
    if (days <= 30) return "text-amber-600 font-semibold";
    return "text-emerald-600 font-semibold";
  };

  // ── Open modal instead of window.confirm ──
  const handleCancelRequest = (bookingId: number) => {
    setCancelModal({ open: true, bookingId });
  };

  // ── Called when user confirms in the modal ──
  const confirmCancel = async () => {
    if (cancelModal.bookingId === null) return;
    try {
      setCancelling(true);
      const response = await bookingService.cancelBookingInquiry({
        bookingId: cancelModal.bookingId,
        bookingStatus: PENDING_BOOKING_STATUS,
      });
      if (response.code === 200) {
        setCancelModal({ open: false, bookingId: null });
        await loadRequestedTours();
      } else {
        alert("Failed to cancel request.");
      }
    } catch (error) {
      console.error("Failed to cancel request:", error);
      alert("Failed to cancel request. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const dismissCancelModal = () => {
    if (!cancelling) setCancelModal({ open: false, bookingId: null });
  };

  const handleSubmitDocument = (bookingId: number) => {
    alert(`Submit documents for booking ${bookingId}`);
  };

  if (loading) {
    return <UserProfileRequestedToursLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-red-500 text-5xl md:text-6xl mb-4">🚫</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Requested Tours
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">{error}</p>
            <button
              onClick={loadRequestedTours}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requestedTours.length === 0) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-sky-200 p-6 md:p-8 text-center">
            <div className="text-sky-400 text-5xl md:text-6xl mb-4">📋</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              No Tour Requests
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              You haven&apos;t requested any tours yet. Start planning your next
              adventure!
            </p>
            <button
              onClick={() => router.push(SRI_LANKAN_TOUR_PAGE_PATH)}
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
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      {/* ── Cancel Confirmation Modal ── */}
      {cancelModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm"
          onClick={dismissCancelModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border border-red-100">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              Cancel Tour Request?
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Are you sure you want to cancel this tour request? This action
              cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={dismissCancelModal}
                disabled={cancelling}
                className="cursor-pointer flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium disabled:opacity-50"
              >
                Keep Request
              </button>
              <button
                onClick={confirmCancel}
                disabled={cancelling}
                className="cursor-pointer flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-semibold disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Requested Tours
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Your tour requests and booking status
          </p>
        </div>

        {/* Statistics - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-sky-600">
              {requestedTours.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Total Requests
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-teal-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-teal-600">
              {
                requestedTours.filter(
                  (t) => t.approvalStatus === "PENDING_APPROVAL",
                ).length
              }
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Pending Approval
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-red-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">
              {
                requestedTours.filter((t) => t.requestUrgency === "URGENT")
                  .length
              }
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Urgent Requests
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-cyan-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-cyan-600">
              {formatCurrency(
                requestedTours.reduce((sum, tour) => sum + tour.finalAmount, 0),
              )}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              Total Amount
            </div>
          </div>
        </div>

        {/* Requested Tours List */}
        <div className="space-y-4 md:space-y-6">
          {requestedTours.map((tour) => (
            <div
              key={tour.bookingId}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-sky-200 overflow-hidden"
            >
              {/* Tour Header - Responsive Layout */}
              <div className="bg-gradient-to-r from-sky-700 to-teal-600 p-4 md:p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                      <h2 className="text-base md:text-lg lg:text-xl font-bold truncate">
                        {tour.tourName}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRequestStatusColor(tour.requestStatus)}`}
                      >
                        {tour.requestStatus.replace("_", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getApprovalStatusColor(tour.approvalStatus)}`}
                      >
                        {tour.approvalStatus.replace("_", " ")}
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

                    {/* Mobile: Stacked info */}
                    <div className="space-y-2 md:hidden">
                      <div className="flex items-center justify-between">
                        {tour.travelStartDate && (
                          <div className="flex items-center space-x-1">
                            <span>📅</span>
                            <span className="text-xs">
                              {formatDate(tour.travelStartDate)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <span>👥</span>
                          <span className="text-xs">
                            {tour.totalPersons} travelers
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span>💰</span>
                          <span className="text-xs">
                            {formatCurrency(tour.finalAmount)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span
                            className={`text-xs ${getDaysColor(tour.daysUntilTravel)}`}
                          >
                            {tour.daysUntilTravel > 0
                              ? `${tour.daysUntilTravel}d`
                              : `${Math.abs(tour.daysUntilTravel)}d ago`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Horizontal info */}
                    <div className="hidden md:flex flex-wrap gap-4 text-sm">
                      {tour.travelStartDate && (
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>
                            {formatDate(tour.travelStartDate)} -{" "}
                            {formatDate(tour.travelEndDate)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>
                          {tour.totalPersons === 0 ? 1 : tour.totalPersons}{" "}
                          traveler
                          {tour.totalPersons > 1 && "s"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💰</span>
                        <span>{formatCurrency(tour.finalAmount)}</span>
                      </div>
                      {
                        <div className="flex items-center space-x-1">
                          <span>⏳</span>
                          <span className={getDaysColor(tour.daysUntilTravel)}>
                            {tour.daysUntilTravel > 0
                              ? `${tour.daysUntilTravel} days to go`
                              : `Started ${Math.abs(tour.daysUntilTravel)} days ago`}
                          </span>
                        </div>
                      }
                      <div className="flex items-center space-x-1">
                        <span>🏷️</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(tour.requestUrgency)}`}
                        >
                          {tour.requestUrgency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingExpansion(tour.bookingId)}
                    className="cursor-pointer bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors self-start"
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
                          Requested:
                        </span>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                          {formatDate(tour.bookingDate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 block mb-1">
                          Travel Dates:
                        </span>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                          {formatDate(tour.travelStartDate)} -{" "}
                          {formatDate(tour.travelEndDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() =>
                          router.push(
                            `${EMPLOYEE_PAGE_PATH}/${tour.assignTo}?name=${tour.assignToName}`,
                          )
                        }
                        className="cursor-pointer px-4 py-2 bg-sky-50 text-sky-700 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors text-sm font-medium"
                      >
                        Contact Guide
                      </button>
                      {tour.documents.some(
                        (doc) =>
                          doc.requiredForApproval &&
                          doc.documentStatus === "PENDING_VERIFICATION",
                      ) && (
                        <button
                          onClick={() => handleSubmitDocument(tour.bookingId)}
                          className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                        >
                          Upload Docs
                        </button>
                      )}
                      {tour.approvalStatus === "PENDING_APPROVAL" && (
                        <button
                          onClick={() => handleCancelRequest(tour.bookingId)}
                          className="cursor-pointer px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Cancel Tour
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Package & Payment Info - Responsive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-sky-600 mr-2">📦</span>
                        Package Details
                      </h3>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package:</span>
                          <span className="font-semibold text-gray-600">
                            {tour.packageName}
                          </span>
                        </div>
                        {tour.packageScheduleName && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Schedule:</span>
                            <span className="font-semibold text-gray-600">
                              {tour.packageScheduleName}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 ">
                            Price per person:
                          </span>
                          <span className="font-semibold text-gray-600">
                            {formatCurrency(tour.packagePricePerPerson)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-emerald-600">
                            {tour.discountPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-teal-600 mr-2">🧾</span>
                        Payment Summary
                      </h3>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-semibold text-gray-600">
                            {formatCurrency(tour.totalAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-emerald-600 text-gray-600">
                            -{formatCurrency(tour.discountAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Tax & Insurance:
                          </span>
                          <span className="font-semibold text-gray-600">
                            {formatCurrency(
                              tour.taxAmount + tour.insuranceAmount,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <span className="text-gray-800 font-semibold">
                            Final Amount:
                          </span>
                          <span className="font-bold text-teal-600">
                            {formatCurrency(tour.finalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants - Responsive Grid */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                      <span className="text-cyan-600 mr-2">👥</span>
                      Participants ({tour.participants.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {tour.participants.map((participant, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                              {participant.firstName} {participant.lastName}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(participant.documentStatus)}`}
                            >
                              {participant.documentStatus}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs md:text-sm text-gray-600">
                            <div>
                              Age: {participant.age} • {participant.gender}
                            </div>
                            <div>Passport: {participant.passportNumber}</div>
                            <div>Nationality: {participant.nationality}</div>
                            {participant.allergies !== "None" && (
                              <div className="text-amber-600 text-xs">
                                Allergies: {participant.allergies}
                              </div>
                            )}
                            {participant.emergencyContactName && (
                              <div className="text-xs">
                                Emergency: {participant.emergencyContactName} (
                                {participant.emergencyContactRelationship})
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities - Responsive */}
                  {tour.activities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-emerald-600 mr-2">🎯</span>
                        Requested Activities ({tour.activities.length})
                      </h3>
                      <div className="space-y-3">
                        {tour.activities.map((activity, index) => (
                          <div
                            key={index}
                            className="bg-emerald-50 rounded-lg p-3 md:p-4 border border-emerald-200"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                                  {activity.activityName}
                                </h4>
                                <p className="text-gray-600 text-xs md:text-sm mb-1 line-clamp-2">
                                  {activity.activityDescription}
                                </p>
                              </div>
                              <div className="flex justify-between md:flex-col md:items-end gap-2">
                                <div className="font-bold text-emerald-600 text-sm md:text-base">
                                  {formatCurrency(activity.totalPrice)}
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(activity.activityStatus)}`}
                                >
                                  {activity.activityStatus}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <span>📅</span>
                                <span>{formatDate(activity.activityDate)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>⏰</span>
                                <span>
                                  {formatTime(activity.startTime)} -{" "}
                                  {formatTime(activity.endTime)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>🕒</span>
                                <span>{activity.durationHours}h</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>📍</span>
                                <span>{activity.destinationName}</span>
                              </div>
                              <div
                                className={`px-2 py-1 rounded-full border text-xs ${
                                  activity.availabilityStatus === "AVAILABLE"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                                }`}
                              >
                                {activity.availabilityStatus}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payments - Responsive */}
                  {tour.payments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-purple-600 mr-2">💳</span>
                        Payment Details
                      </h3>
                      <div className="space-y-3">
                        {tour.payments.map((payment, index) => (
                          <div
                            key={index}
                            className="bg-purple-50 rounded-lg p-3 md:p-4 border border-purple-200"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                                  {payment.paymentReference}
                                </h4>
                                <p className="text-gray-600 text-xs md:text-sm">
                                  {payment.paymentMethod.replace("_", " ")} •
                                  Installment {payment.installmentNumber}/
                                  {payment.totalInstallments}
                                </p>
                              </div>
                              <div className="flex justify-between md:flex-col md:items-end gap-2">
                                <div className="font-bold text-purple-600 text-sm md:text-base">
                                  {formatCurrency(payment.amount)}
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs border ${getPaymentStatusColor(payment.paymentStatus)}`}
                                >
                                  {payment.paymentStatus}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                              {payment.paymentDate && (
                                <div>
                                  <span className="text-gray-500 block mb-1">
                                    Paid:
                                  </span>
                                  <div className="font-medium truncate">
                                    {formatDateTime(payment.paymentDate)}
                                  </div>
                                </div>
                              )}
                              {payment.dueDate && (
                                <div>
                                  <span className="text-gray-500 block mb-1">
                                    Due:
                                  </span>
                                  <div className="font-medium">
                                    {formatDate(payment.dueDate)}
                                  </div>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500 block mb-1">
                                  Invoice:
                                </span>
                                <div className="font-medium truncate">
                                  {payment.invoiceNumber}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 block mb-1">
                                  Priority:
                                </span>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs inline-block ${getUrgencyColor(payment.paymentPriority)}`}
                                >
                                  {payment.paymentPriority.replace("_", " ")}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents - Responsive Grid */}
                  {tour.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-amber-600 mr-2">📄</span>
                        Documents ({tour.documents.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                        {tour.documents.map((document, index) => (
                          <div
                            key={index}
                            className="bg-amber-50 rounded-lg p-3 md:p-4 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                            onClick={() =>
                              downloadDocument(
                                document.documentUrl,
                                document.documentName,
                              )
                            }
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm truncate">
                                  {document.documentName}
                                </h4>
                                <p className="text-gray-600 text-xs">
                                  {document.documentType}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(document.documentStatus)}`}
                              >
                                {document.documentStatus.replace("_", " ")}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>
                                {(document.fileSize / 1024).toFixed(1)} KB
                              </span>
                              {document.requiredForApproval && (
                                <span className="text-red-600 font-medium text-xs">
                                  Required
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
                      <span className="text-cyan-600 mr-2">📞</span>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                      <div>
                        <span className="text-gray-600 block mb-1">
                          Full Name:
                        </span>
                        <div className="font-semibold text-gray-800 truncate">
                          {tour.userFullName}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Email:</span>
                        <div className="font-semibold text-gray-800 truncate">
                          {tour.email}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">
                          Mobile:
                        </span>
                        <div className="font-semibold text-gray-800">
                          {tour.mobileNumber1}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">
                          Username:
                        </span>
                        <div className="font-semibold text-gray-800">
                          {tour.username}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
