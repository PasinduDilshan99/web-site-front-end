// app/profile/completed-tours/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { CompletedTour } from '@/types/completed-tours';
import { useState, useEffect } from 'react';

export default function CompletedToursPage() {
  const [completedTours, setCompletedTours] = useState<CompletedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load completed tours:', err);
      setError('Failed to load completed tours');
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

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    // In a real application, this would trigger the download
    console.log('Downloading:', documentUrl);
    // You can implement actual download logic here
    window.open(documentUrl, '_blank');
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Completed Tours</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadCompletedTours}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Completed Tours Yet</h3>
            <p className="text-gray-600 mb-6">You havent completed any tours yet. Start your journey today!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Explore Tours
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
            Completed Tours
          </h1>
          <p className="text-gray-600 mt-2">Your travel history and completed adventures</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{completedTours.length}</div>
            <div className="text-sm text-gray-600">Total Tours</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {completedTours.reduce((sum, tour) => sum + tour.totalPersons, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Travelers</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {completedTours.reduce((sum, tour) => sum + tour.activities.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(completedTours.reduce((sum, tour) => sum + tour.finalAmount, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>

        {/* Completed Tours List */}
        <div className="space-y-6">
          {completedTours.map((tour) => (
            <div key={tour.bookingId} className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold">{tour.tourName}</h2>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {tour.bookingStatus.replace('_', ' ')}
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
                        <span>⏰</span>
                        <span>{tour.completionTime}</span>
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
                  {/* Package Information */}
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
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {participant.firstName} {participant.lastName}
                          </h4>
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
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-green-600 mr-2">🎯</span>
                      Activities ({tour.activities.length})
                    </h3>
                    <div className="space-y-3">
                      {tour.activities.map((activity, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{activity.activityName}</h4>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              {formatCurrency(activity.totalPrice)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{activity.activityDescription}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>📅 {formatDate(activity.activityDate)}</div>
                            <div>⏰ {formatTime(activity.startTime)} - {formatTime(activity.endTime)}</div>
                            <div>🕒 {activity.durationHours}h</div>
                            <div>📍 {activity.destinationName}</div>
                            <div>👥 {activity.numberOfParticipants} participants</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payments */}
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
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.paymentStatus)}`}>
                                {payment.paymentStatus}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {payment.paymentDate && (
                              <div>Paid: {formatDate(payment.paymentDate)}</div>
                            )}
                            <div>Due: {formatDate(payment.dueDate)}</div>
                            {payment.transactionId && (
                              <div>Transaction: {payment.transactionId}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  {tour.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-amber-600 mr-2">📄</span>
                        Documents
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {tour.documents.map((document, index) => (
                          <button
                            key={index}
                            onClick={() => downloadDocument(document.documentUrl, document.documentName)}
                            className="flex items-center space-x-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg px-4 py-2 transition-colors"
                          >
                            <span>📄</span>
                            <span className="text-sm font-medium text-gray-800">{document.documentName}</span>
                            <span className="text-xs text-gray-500">({(document.fileSize / 1024).toFixed(1)} KB)</span>
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