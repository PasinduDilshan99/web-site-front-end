// app/profile/cancelled-tours/page.tsx
"use client";
import UserProfileCancelledToursLoading from "@/components/user-profile-components/Loadings/UserProfileCancelledToursLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { CancelledTour } from "@/types/cancelled-tours";
import { USER_PROFILE_CANCELLED_TOURS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CancelledToursPage() {
  const [cancelledTours, setCancelledTours] = useState<CancelledTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_CANCELLED_TOURS_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadCancelledTours();
  }, []);

  const loadCancelledTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCancelledTours();
      setCancelledTours(response.data || []);
    } catch (err) {
      console.error("Failed to load cancelled tours:", err);
      setError("Failed to load cancelled tours");
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
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return "N/A";
    return new Date(dateTimeString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "PROCESSING":
        return "bg-sky-100 text-sky-800 border border-sky-200";
      case "PENDING":
        return "bg-cyan-100 text-cyan-800 border border-cyan-200";
      case "FAILED":
        return "bg-red-100 text-red-800 border border-red-200";
      case "PARTIAL":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getCancellationStageColor = (stage: string) => {
    switch (stage) {
      case "ADVANCED_CANCELLATION":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "STANDARD_CANCELLATION":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "LATE_CANCELLATION":
        return "bg-red-100 text-red-800 border border-red-200";
      case "NO_SHOW":
        return "bg-red-200 text-red-900 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getCancellationReasonText = (reason: string | null) => {
    if (!reason) return "Not specified";
    return reason.replace("_", " ");
  };

  const getDaysBeforeTravelColor = (days: number) => {
    if (days > 30) return "text-emerald-600 font-semibold";
    if (days > 14) return "text-amber-600 font-semibold";
    if (days > 0) return "text-orange-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const getPenaltyPercentageColor = (percentage: number) => {
    if (percentage === 0) return "text-emerald-600 font-semibold";
    if (percentage <= 25) return "text-amber-600 font-semibold";
    if (percentage <= 50) return "text-orange-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    window.open(documentUrl, "_blank");
  };

  const downloadCancellationReceipt = (tour: CancelledTour) => {
    // In a real app, this would generate/retrieve a cancellation receipt
    alert(`Downloading cancellation receipt for ${tour.bookingReference}`);
  };

  const filteredTours = cancelledTours.filter((tour) => {
    if (filterStatus === "ALL") return true;
    return tour.refundStatus === filterStatus;
  });

  const refundStats = {
    total: cancelledTours.length,
    processing: cancelledTours.filter((t) => t.refundStatus === "PROCESSING")
      .length,
    completed: cancelledTours.filter((t) => t.refundStatus === "COMPLETED")
      .length,
    pending: cancelledTours.filter((t) => t.refundStatus === "PENDING").length,
    totalRefunded: cancelledTours.reduce(
      (sum, tour) => sum + tour.refundedAmount,
      0,
    ),
    totalCancellationFees: cancelledTours.reduce(
      (sum, tour) => sum + tour.cancellationFee,
      0,
    ),
  };

  if (loading) {
    return <UserProfileCancelledToursLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 text-center">
            <div className="text-red-500 text-5xl mb-4">🚫</div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
              Unable to Load Cancelled Tours
            </h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={loadCancelledTours}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cancelledTours.length === 0) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 text-center">
            <div className="text-slate-400 text-5xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
              No Cancelled Tours
            </h3>
            <p className="text-slate-600 mb-6">
              You haven&apos;t cancelled any tours yet.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 shadow-md hover:shadow-lg">
              View Current Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Cancelled Tours
          </h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">
            Your cancelled bookings and refund status
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-slate-200 p-3 md:p-4 text-center">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800">
              {refundStats.total}
            </div>
            <div className="text-xs md:text-sm text-slate-600 mt-1">
              Total Cancellations
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-emerald-200 p-3 md:p-4 text-center">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-emerald-600">
              {formatCurrency(refundStats.totalRefunded)}
            </div>
            <div className="text-xs md:text-sm text-slate-600 mt-1">
              Total Refunded
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-red-200 p-3 md:p-4 text-center">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-red-600">
              {formatCurrency(refundStats.totalCancellationFees)}
            </div>
            <div className="text-xs md:text-sm text-slate-600 mt-1">
              Cancellation Fees
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-sky-200 p-3 md:p-4 text-center">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-sky-600">
              {refundStats.processing}
            </div>
            <div className="text-xs md:text-sm text-slate-600 mt-1">
              Processing Refunds
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              {
                status: "ALL",
                label: `All (${refundStats.total})`,
                color: "bg-slate-200",
              },
              {
                status: "PROCESSING",
                label: `Processing (${refundStats.processing})`,
                color: "bg-sky-100",
              },
              {
                status: "COMPLETED",
                label: `Completed (${refundStats.completed})`,
                color: "bg-emerald-100",
              },
              {
                status: "PENDING",
                label: `Pending (${refundStats.pending})`,
                color: "bg-cyan-100",
              },
            ].map(({ status, label, color }) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                  filterStatus === status
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md"
                    : `${color} text-slate-700 hover:bg-slate-300`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cancelled Tours List */}
        <div className="space-y-4 md:space-y-6">
          {filteredTours.map((tour) => (
            <div
              key={tour.bookingId}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 md:p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                      <h2 className="text-lg md:text-xl font-bold line-through truncate">
                        {tour.tourName}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getCancellationStageColor(tour.cancellationStage)}`}
                        >
                          {tour.cancellationStage.replace("_", " ")}
                        </span>
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getRefundStatusColor(tour.refundStatus)}`}
                        >
                          {tour.refundStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      {tour.tourDescription}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs md:text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">📅</span>
                        <span>
                          Scheduled: {formatDate(tour.travelStartDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">👥</span>
                        <span>{tour.totalPersons} travelers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">💰</span>
                        <span>
                          Original: {formatCurrency(tour.finalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">💸</span>
                        <span className="text-emerald-300">
                          Refund: {formatCurrency(tour.refundedAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingExpansion(tour.bookingId)}
                    className="self-start bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
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
                <div className="p-4 md:p-6 space-y-6">
                  {/* Two Column Grid for Desktop, Stacked for Mobile */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Cancellation Details */}
                    <div className="bg-red-50/50 rounded-xl p-4 border border-red-200">
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-red-500 mr-2">❌</span>
                        Cancellation Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-sm">
                        <div>
                          <div className="text-xs text-slate-600">
                            Cancellation Date
                          </div>
                          <div className="font-medium">
                            {formatDateTime(tour.cancellationDate || "")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Reason</div>
                          <div className="font-medium">
                            {getCancellationReasonText(tour.cancellationReason)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">
                            Days Before Travel
                          </div>
                          <div
                            className={`font-medium ${getDaysBeforeTravelColor(tour.daysBeforeTravel)}`}
                          >
                            {tour.daysBeforeTravel} days
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">
                            Cancellation Fee
                          </div>
                          <div className="font-medium text-red-600">
                            {formatCurrency(tour.cancellationFee)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">
                            Penalty Percentage
                          </div>
                          <div
                            className={`font-medium ${getPenaltyPercentageColor(tour.cancellationPenaltyPercentage)}`}
                          >
                            {tour.cancellationPenaltyPercentage}%
                          </div>
                        </div>
                        {tour.cancellationNotes && (
                          <div className="sm:col-span-2 mt-2 pt-3 border-t border-red-200">
                            <div className="text-xs text-slate-600 mb-1">
                              Notes
                            </div>
                            <p className="text-slate-800 text-sm">
                              {tour.cancellationNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Refund Details */}
                    <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200">
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-emerald-500 mr-2">💸</span>
                        Refund Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Refund Status</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getRefundStatusColor(tour.refundStatus)}`}
                          >
                            {tour.refundStatus}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-slate-600">
                              Original Amount
                            </div>
                            <div className="font-medium">
                              {formatCurrency(tour.finalAmount)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600">
                              Cancellation Fee
                            </div>
                            <div className="font-medium text-red-600">
                              -{formatCurrency(tour.cancellationFee)}
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-emerald-200 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-800 font-semibold">
                              Refund Amount
                            </span>
                            <span className="font-bold text-emerald-600 text-lg">
                              {formatCurrency(tour.refundAmount)}
                            </span>
                          </div>
                        </div>
                        {tour.refundStatus === "COMPLETED" && (
                          <button
                            onClick={() => downloadCancellationReceipt(tour)}
                            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <span>📄</span>
                            <span>Download Refund Receipt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tour & Package Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-slate-600 mr-2">🏔️</span>
                        Tour Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-slate-600">
                            Tour Name
                          </div>
                          <div className="font-medium truncate">
                            {tour.tourName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Duration</div>
                          <div className="font-medium">
                            {tour.tourDuration} days
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Type</div>
                          <div className="font-medium">{tour.tourType}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Category</div>
                          <div className="font-medium">{tour.tourCategory}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-200">
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-cyan-600 mr-2">📦</span>
                        Package Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-slate-600">
                            Package Name
                          </div>
                          <div className="font-medium truncate">
                            {tour.packageName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Schedule</div>
                          <div className="font-medium">
                            {tour.packageScheduleName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">
                            Price per person
                          </div>
                          <div className="font-medium">
                            {formatCurrency(tour.packagePricePerPerson)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">Discount</div>
                          <div className="font-medium text-emerald-600">
                            {tour.discountPercentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants */}
                  {tour.participants.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-blue-500 mr-2">👥</span>
                        Participants ({tour.participants.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tour.participants.map((participant, index) => (
                          <div
                            key={index}
                            className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-slate-800 truncate">
                                {participant.firstName} {participant.lastName}
                              </h4>
                              {participant.refundIssued && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs">
                                  Refund Issued
                                </span>
                              )}
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                              <div className="flex items-center gap-2">
                                <span>Age: {participant.age}</span>
                                <span>•</span>
                                <span>{participant.gender}</span>
                              </div>
                              <div className="truncate">
                                Passport: {participant.passportNumber || "N/A"}
                              </div>
                              <div>Nationality: {participant.nationality}</div>
                              {participant.participantRefundAmount > 0 && (
                                <div className="text-emerald-600 font-medium text-sm">
                                  Refund:{" "}
                                  {formatCurrency(
                                    participant.participantRefundAmount,
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment History */}
                  {tour.payments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                        <span className="text-sky-600 mr-2">💳</span>
                        Payment History ({tour.payments.length})
                      </h3>
                      <div className="space-y-3">
                        {tour.payments.map((payment, index) => (
                          <div
                            key={index}
                            className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-800">
                                  {payment.paymentReference}
                                </h4>
                                <p className="text-slate-600 text-xs">
                                  {payment.paymentMethod.replace("_", " ")} •
                                  Installment {payment.installmentNumber}/
                                  {payment.totalInstallments}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-sky-600">
                                  {formatCurrency(payment.amount)}
                                </div>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs border ${getRefundStatusColor(payment.paymentStatus)}`}
                                >
                                  {payment.paymentStatus}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-600">
                              {payment.paymentDate && (
                                <div>
                                  <div className="text-slate-500">Paid</div>
                                  <div className="font-medium">
                                    {formatDateTime(payment.paymentDate)}
                                  </div>
                                </div>
                              )}
                              {payment.invoiceNumber && (
                                <div>
                                  <div className="text-slate-500">Invoice</div>
                                  <div className="font-medium">
                                    {payment.invoiceNumber}
                                  </div>
                                </div>
                              )}
                              {payment.refundReference && (
                                <div>
                                  <div className="text-slate-500">
                                    Refund Ref
                                  </div>
                                  <div className="font-medium">
                                    {payment.refundReference}
                                  </div>
                                </div>
                              )}
                              {payment.refundAmount &&
                                payment.refundAmount > 0 && (
                                  <div>
                                    <div className="text-slate-500">
                                      Refund Amount
                                    </div>
                                    <div className="font-medium text-emerald-600">
                                      {formatCurrency(payment.refundAmount)}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary Cards */}
                  <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl p-4 border border-sky-200">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                      <span className="text-slate-600 mr-2">📊</span>
                      Cancellation Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white rounded-lg border border-red-200 shadow-sm">
                        <div className="text-lg md:text-xl font-bold text-red-600">
                          {formatCurrency(tour.cancellationFee)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Cancellation Fee
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-emerald-200 shadow-sm">
                        <div className="text-lg md:text-xl font-bold text-emerald-600">
                          {formatCurrency(tour.refundAmount)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Eligible Refund
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-sky-200 shadow-sm">
                        <div className="text-lg md:text-xl font-bold text-sky-600">
                          {formatCurrency(tour.refundedAmount)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Actual Refund
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
