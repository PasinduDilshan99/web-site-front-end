// app/profile/cancelled-tours/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { CancelledTour } from '@/types/cancelled-tours';
import { useState, useEffect } from 'react';

export default function CancelledToursPage() {
  const [cancelledTours, setCancelledTours] = useState<CancelledTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load cancelled tours:', err);
      setError('Failed to load cancelled tours');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PARTIAL':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCancellationStageColor = (stage: string) => {
    switch (stage) {
      case 'ADVANCED_CANCELLATION':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'STANDARD_CANCELLATION':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'LATE_CANCELLATION':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'NO_SHOW':
        return 'bg-red-200 text-red-900 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCancellationReasonText = (reason: string | null) => {
    if (!reason) return 'Not specified';
    return reason.replace('_', ' ');
  };

  const getDaysBeforeTravelColor = (days: number) => {
    if (days > 30) return 'text-green-600';
    if (days > 14) return 'text-amber-600';
    if (days > 0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPenaltyPercentageColor = (percentage: number) => {
    if (percentage === 0) return 'text-green-600';
    if (percentage <= 25) return 'text-amber-600';
    if (percentage <= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    window.open(documentUrl, '_blank');
  };

  const downloadCancellationReceipt = (tour: CancelledTour) => {
    // In a real app, this would generate/retrieve a cancellation receipt
    alert(`Downloading cancellation receipt for ${tour.bookingReference}`);
  };

  const filteredTours = cancelledTours.filter(tour => {
    if (filterStatus === 'ALL') return true;
    return tour.refundStatus === filterStatus;
  });

  const refundStats = {
    total: cancelledTours.length,
    processing: cancelledTours.filter(t => t.refundStatus === 'PROCESSING').length,
    completed: cancelledTours.filter(t => t.refundStatus === 'COMPLETED').length,
    pending: cancelledTours.filter(t => t.refundStatus === 'PENDING').length,
    totalRefunded: cancelledTours.reduce((sum, tour) => sum + tour.refundedAmount, 0),
    totalCancellationFees: cancelledTours.reduce((sum, tour) => sum + tour.cancellationFee, 0),
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 bg-gradient-to-r from-amber-100 to-purple-100 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Cancelled Tours</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadCancelledTours}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Cancelled Tours</h3>
            <p className="text-gray-600 mb-6">You haven&apos;t cancelled any tours yet.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              View Current Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Cancelled Tours
          </h1>
          <p className="text-gray-600 mt-2">Your cancelled bookings and refund status</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{refundStats.total}</div>
            <div className="text-sm text-gray-600">Total Cancellations</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(refundStats.totalRefunded)}</div>
            <div className="text-sm text-gray-600">Total Refunded</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(refundStats.totalCancellationFees)}</div>
            <div className="text-sm text-gray-600">Cancellation Fees</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{refundStats.processing}</div>
            <div className="text-sm text-gray-600">Processing Refunds</div>
          </div>
        </div>

        {/* Refund Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'ALL' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All ({refundStats.total})
            </button>
            <button
              onClick={() => setFilterStatus('PROCESSING')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'PROCESSING' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Processing ({refundStats.processing})
            </button>
            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'COMPLETED' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Completed ({refundStats.completed})
            </button>
            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'PENDING' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Pending ({refundStats.pending})
            </button>
          </div>
        </div>

        {/* Cancelled Tours List */}
        <div className="space-y-6">
          {filteredTours.map((tour) => (
            <div key={tour.bookingId} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold line-through">{tour.tourName}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCancellationStageColor(tour.cancellationStage)}`}>
                        {tour.cancellationStage.replace('_', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRefundStatusColor(tour.refundStatus)}`}>
                        {tour.refundStatus}
                      </span>
                    </div>
                    <p className="text-gray-200 mb-2">{tour.tourDescription}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>Was scheduled: {formatDate(tour.travelStartDate)} - {formatDate(tour.travelEndDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>{tour.totalPersons} travelers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💰</span>
                        <span>Original: {formatCurrency(tour.finalAmount)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💸</span>
                        <span>Refund: {formatCurrency(tour.refundedAmount)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingExpansion(tour.bookingId)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  >
                    <svg 
                      className={`w-6 h-6 transform transition-transform ${
                        expandedBooking === tour.bookingId ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedBooking === tour.bookingId && (
                <div className="p-6 space-y-6">
                  {/* Cancellation Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-red-600 mr-2">❌</span>
                        Cancellation Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancellation Date:</span>
                          <span className="font-semibold">{formatDateTime(tour.cancellationDate || '')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reason:</span>
                          <span className="font-semibold">{getCancellationReasonText(tour.cancellationReason)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Days Before Travel:</span>
                          <span className={`font-semibold ${getDaysBeforeTravelColor(tour.daysBeforeTravel)}`}>
                            {tour.daysBeforeTravel} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancellation Fee:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(tour.cancellationFee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Penalty Percentage:</span>
                          <span className={`font-semibold ${getPenaltyPercentageColor(tour.cancellationPenaltyPercentage)}`}>
                            {tour.cancellationPenaltyPercentage}%
                          </span>
                        </div>
                        {tour.cancellationNotes && (
                          <div className="mt-2 pt-2 border-t border-red-200">
                            <span className="text-gray-600">Notes:</span>
                            <p className="text-gray-800 text-sm mt-1">{tour.cancellationNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-green-600 mr-2">💸</span>
                        Refund Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Refund Status:</span>
                          <span className={`px-2 py-1 rounded-full border ${getRefundStatusColor(tour.refundStatus)}`}>
                            {tour.refundStatus}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Original Amount:</span>
                          <span className="font-semibold">{formatCurrency(tour.finalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancellation Fee:</span>
                          <span className="font-semibold text-red-600">-{formatCurrency(tour.cancellationFee)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <span className="text-gray-800 font-semibold">Refund Amount:</span>
                          <span className="font-bold text-green-600">{formatCurrency(tour.refundAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Refunded Amount:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(tour.refundedAmount)}</span>
                        </div>
                        {tour.refundProcessedDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Processed Date:</span>
                            <span className="font-semibold">{formatDateTime(tour.refundProcessedDate)}</span>
                          </div>
                        )}
                        {tour.refundStatus === 'COMPLETED' && (
                          <button
                            onClick={() => downloadCancellationReceipt(tour)}
                            className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <span>📄</span>
                            <span>Download Refund Receipt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tour & Package Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-amber-600 mr-2">🏔️</span>
                        Tour Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tour:</span>
                          <span className="font-semibold">{tour.tourName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">{tour.tourDuration} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-semibold">{tour.tourType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-semibold">{tour.tourCategory}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">📦</span>
                        Package Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package:</span>
                          <span className="font-semibold">{tour.packageName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Schedule:</span>
                          <span className="font-semibold">{tour.packageScheduleName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per person:</span>
                          <span className="font-semibold">{formatCurrency(tour.packagePricePerPerson)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-green-600">{tour.discountPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants */}
                  {tour.participants.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-blue-600 mr-2">👥</span>
                        Participants ({tour.participants.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tour.participants.map((participant, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">
                                {participant.firstName} {participant.lastName}
                              </h4>
                              {participant.refundIssued && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  Refund Issued
                                </span>
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>Age: {participant.age} • {participant.gender}</div>
                              <div>Passport: {participant.passportNumber}</div>
                              <div>Nationality: {participant.nationality}</div>
                              {participant.participantRefundAmount > 0 && (
                                <div className="text-green-600 font-medium">
                                  Refund: {formatCurrency(participant.participantRefundAmount)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cancelled Activities */}
                  {tour.activities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-red-600 mr-2">❌</span>
                        Cancelled Activities ({tour.activities.length})
                      </h3>
                      <div className="space-y-3">
                        {tour.activities.map((activity, index) => (
                          <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{activity.activityName}</h4>
                                <p className="text-gray-600 text-sm mb-1">{activity.activityDescription}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-gray-700 line-through">{formatCurrency(activity.totalPrice)}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  {activity.activityRefundable ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                      Refundable
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                      Non-refundable
                                    </span>
                                  )}
                                  {activity.activityRefundAmount > 0 && (
                                    <span className="text-green-600 text-sm">
                                      +{formatCurrency(activity.activityRefundAmount)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div>📅 Was scheduled: {formatDate(activity.activityDate)}</div>
                              <div>⏰ Time: {formatTime(activity.startTime)} - {formatTime(activity.endTime)}</div>
                              <div>🕒 Duration: {activity.durationHours}h</div>
                              <div>📍 Destination: {activity.destinationName}</div>
                              <div>👥 Participants: {activity.numberOfParticipants}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment History */}
                  {tour.payments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">💳</span>
                        Payment History
                      </h3>
                      <div className="space-y-3">
                        {tour.payments.map((payment, index) => (
                          <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{payment.paymentReference}</h4>
                                <p className="text-gray-600 text-sm">
                                  {payment.paymentMethod.replace('_', ' ')} • 
                                  Installment {payment.installmentNumber}/{payment.totalInstallments}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-purple-600">{formatCurrency(payment.amount)}</div>
                                <span className={`px-2 py-1 rounded-full text-xs border ${getRefundStatusColor(payment.paymentStatus)}`}>
                                  {payment.paymentStatus}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              {payment.paymentDate && (
                                <div>
                                  <span className="text-gray-500">Paid:</span>
                                  <div className="font-medium">{formatDateTime(payment.paymentDate)}</div>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500">Invoice:</span>
                                <div className="font-medium">{payment.invoiceNumber}</div>
                              </div>
                              {payment.refundReference && (
                                <div>
                                  <span className="text-gray-500">Refund Ref:</span>
                                  <div className="font-medium">{payment.refundReference}</div>
                                </div>
                              )}
                              {payment.refundAmount && payment.refundAmount > 0 && (
                                <div>
                                  <span className="text-gray-500">Refund:</span>
                                  <div className="font-medium text-green-600">{formatCurrency(payment.refundAmount)}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {tour.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-gray-600 mr-2">📄</span>
                        Archived Documents ({tour.documents.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tour.documents.map((document, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => downloadDocument(document.documentUrl, document.documentName)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 truncate">{document.documentName}</h4>
                                <p className="text-gray-600 text-sm">{document.documentType}</p>
                              </div>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                ARCHIVED
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>{(document.fileSize / 1024).toFixed(1)} KB</span>
                              {document.cancellationRelated && (
                                <span className="text-red-600 font-medium">Cancellation Related</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-blue-600 mr-2">📊</span>
                      Cancellation Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">{formatCurrency(tour.cancellationFee)}</div>
                        <div className="text-sm text-gray-600">Cancellation Fee</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(tour.refundAmount)}</div>
                        <div className="text-sm text-gray-600">Eligible Refund</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-purple-600">{formatCurrency(tour.refundedAmount)}</div>
                        <div className="text-sm text-gray-600">Actual Refund</div>
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