// app/profile/requested-tours/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { RequestedTour } from '@/types/requested-tours';
import { useState, useEffect } from 'react';

export default function RequestedToursPage() {
  const [requestedTours, setRequestedTours] = useState<RequestedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load requested tours:', err);
      setError('Failed to load requested tours');
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_APPROVAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'AWAITING_APPROVAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DOCUMENTS_REQUIRED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'INITIATED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PARTIAL':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_VERIFICATION':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'UPLOADED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    window.open(documentUrl, '_blank');
  };

  const getDaysColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 7) return 'text-red-600';
    if (days <= 14) return 'text-orange-600';
    if (days <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleCancelRequest = async (bookingId: number) => {
    if (window.confirm('Are you sure you want to cancel this tour request?')) {
      try {
        // Implement cancel request API call here
        console.log('Cancelling booking:', bookingId);
        // Refresh the list after cancellation
        await loadRequestedTours();
      } catch (error) {
        console.error('Failed to cancel request:', error);
        alert('Failed to cancel request. Please try again.');
      }
    }
  };

  const handleSubmitDocument = (bookingId: number) => {
    // Implement document submission logic
    alert(`Submit documents for booking ${bookingId}`);
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Requested Tours</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadRequestedTours}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tour Requests</h3>
            <p className="text-gray-600 mb-6">You havent requested any tours yet. Start planning your next adventure!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Browse Tours
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
            Requested Tours
          </h1>
          <p className="text-gray-600 mt-2">Your tour requests and booking status</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{requestedTours.length}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {requestedTours.filter(t => t.approvalStatus === 'PENDING_APPROVAL').length}
            </div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {requestedTours.filter(t => t.requestUrgency === 'URGENT').length}
            </div>
            <div className="text-sm text-gray-600">Urgent Requests</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(requestedTours.reduce((sum, tour) => sum + tour.finalAmount, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Amount</div>
          </div>
        </div>

        {/* Requested Tours List */}
        <div className="space-y-6">
          {requestedTours.map((tour) => (
            <div key={tour.bookingId} className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold">{tour.tourName}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRequestStatusColor(tour.requestStatus)}`}>
                        {tour.requestStatus.replace('_', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getApprovalStatusColor(tour.approvalStatus)}`}>
                        {tour.approvalStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-amber-100 mb-2">{tour.tourDescription}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>{formatDate(tour.travelStartDate)} - {formatDate(tour.travelEndDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>{tour.totalPersons} travelers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💰</span>
                        <span>{formatCurrency(tour.finalAmount)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏳</span>
                        <span className={getDaysColor(tour.daysUntilTravel)}>
                          {tour.daysUntilTravel > 0 ? `${tour.daysUntilTravel} days to go` : `Started ${Math.abs(tour.daysUntilTravel)} days ago`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🏷️</span>
                        <span className={`px-2 py-1 rounded-full border ${getUrgencyColor(tour.requestUrgency)}`}>
                          {tour.requestUrgency}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🗓️</span>
                        <span>{tour.requestAge}</span>
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
                  {/* Status and Action Bar */}
                  <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Booking Reference:</span>
                        <span className="font-semibold text-gray-800">{tour.bookingReference}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Requested On:</span>
                        <span className="font-semibold text-gray-800">{formatDate(tour.bookingDate)}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Travel Dates:</span>
                        <span className="font-semibold text-gray-800">
                          {formatDate(tour.travelStartDate)} to {formatDate(tour.travelEndDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {tour.documents.some(doc => doc.requiredForApproval && doc.documentStatus === 'PENDING_VERIFICATION') && (
                        <button
                          onClick={() => handleSubmitDocument(tour.bookingId)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Upload Documents
                        </button>
                      )}
                      {tour.approvalStatus === 'PENDING_APPROVAL' && (
                        <button
                          onClick={() => handleCancelRequest(tour.bookingId)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Package & Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-amber-600 mr-2">📦</span>
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

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">🧾</span>
                        Payment Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-semibold">{formatCurrency(tour.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-semibold text-green-600">-{formatCurrency(tour.discountAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax & Insurance:</span>
                          <span className="font-semibold">{formatCurrency(tour.taxAmount + tour.insuranceAmount)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <span className="text-gray-800 font-semibold">Final Amount:</span>
                          <span className="font-bold text-purple-600">{formatCurrency(tour.finalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants */}
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
                            <span className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(participant.documentStatus)}`}>
                              {participant.documentStatus}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>Age: {participant.age} • {participant.gender}</div>
                            <div>Passport: {participant.passportNumber}</div>
                            <div>Nationality: {participant.nationality}</div>
                            {participant.allergies !== 'None' && (
                              <div className="text-amber-600">Allergies: {participant.allergies}</div>
                            )}
                            {participant.emergencyContactName && (
                              <div className="text-sm">
                                Emergency: {participant.emergencyContactName} ({participant.emergencyContactRelationship})
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
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-green-600 mr-2">🎯</span>
                        Requested Activities ({tour.activities.length})
                      </h3>
                      <div className="space-y-3">
                        {tour.activities.map((activity, index) => (
                          <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{activity.activityName}</h4>
                                <p className="text-gray-600 text-sm mb-1">{activity.activityDescription}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-green-600">{formatCurrency(activity.totalPrice)}</div>
                                <span className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(activity.activityStatus)}`}>
                                  {activity.activityStatus}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div>📅 {formatDate(activity.activityDate)}</div>
                              <div>⏰ {formatTime(activity.startTime)} - {formatTime(activity.endTime)}</div>
                              <div>🕒 {activity.durationHours}h</div>
                              <div>📍 {activity.destinationName}</div>
                              <div>👥 {activity.numberOfParticipants} participants</div>
                              <div className={`px-2 py-1 rounded-full border ${
                                activity.availabilityStatus === 'AVAILABLE' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }`}>
                                {activity.availabilityStatus}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payments */}
                  {tour.payments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">💳</span>
                        Payment Details
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
                                <span className={`px-2 py-1 rounded-full text-xs border ${getPaymentStatusColor(payment.paymentStatus)}`}>
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
                                <span className="text-gray-500">Due Date:</span>
                                <div className="font-medium">{formatDate(payment.dueDate)}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Invoice:</span>
                                <div className="font-medium">{payment.invoiceNumber}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Priority:</span>
                                <div className={`px-2 py-1 rounded-full text-xs inline-block ${getUrgencyColor(payment.paymentPriority)}`}>
                                  {payment.paymentPriority.replace('_', ' ')}
                                </div>
                              </div>
                            </div>
                            {payment.depositRequired && (
                              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                                <span className="text-amber-700 font-medium">Deposit Required:</span>
                                <span className="ml-2">{formatCurrency(payment.depositAmount)}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {tour.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-amber-600 mr-2">📄</span>
                        Documents ({tour.documents.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tour.documents.map((document, index) => (
                          <div 
                            key={index} 
                            className="bg-amber-50 rounded-lg p-4 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                            onClick={() => downloadDocument(document.documentUrl, document.documentName)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 truncate">{document.documentName}</h4>
                                <p className="text-gray-600 text-sm">{document.documentType}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs border ${getDocumentStatusColor(document.documentStatus)}`}>
                                {document.documentStatus.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>{(document.fileSize / 1024).toFixed(1)} KB</span>
                              {document.requiredForApproval && (
                                <span className="text-red-600 font-medium">Required for Approval</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-blue-600 mr-2">📞</span>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Full Name:</span>
                        <div className="font-semibold text-gray-800">{tour.userFullName}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <div className="font-semibold text-gray-800">{tour.email}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Mobile:</span>
                        <div className="font-semibold text-gray-800">{tour.mobileNumber1}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Username:</span>
                        <div className="font-semibold text-gray-800">{tour.username}</div>
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