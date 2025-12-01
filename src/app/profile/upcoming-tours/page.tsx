// app/profile/upcoming-tours/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { UpcomingTour } from '@/types/upcoming-tours';
import { useState, useEffect } from 'react';

export default function UpcomingToursPage() {
  const [upcomingTours, setUpcomingTours] = useState<UpcomingTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load upcoming tours:', err);
      setError('Failed to load upcoming tours');
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
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'IMMINENT':
        return 'bg-red-500 text-white';
      case 'SOON':
        return 'bg-amber-500 text-white';
      case 'FUTURE':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'READY':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_DOCS':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'NOT_READY':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleBookingExpansion = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadDocument = (documentUrl: string, documentName: string) => {
    console.log('Downloading:', documentUrl);
    window.open(documentUrl, '_blank');
  };

  const calculatePaymentProgress = (tour: UpcomingTour) => {
    const totalPaid = tour.payments
      .filter(p => p.paymentStatus === 'COMPLETED')
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    return (totalPaid / tour.finalAmount) * 100;
  };

  const getDaysUntilText = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `In ${days} days`;
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
            <div className="text-red-500 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Upcoming Tours</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadUpcomingTours}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (upcomingTours.length === 0) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Upcoming Tours</h3>
            <p className="text-gray-600 mb-6">You dont have any upcoming tours planned. Start your next adventure!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Book a Tour
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
            Upcoming Tours
          </h1>
          <p className="text-gray-600 mt-2">Your future adventures and travel preparations</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{upcomingTours.length}</div>
            <div className="text-sm text-gray-600">Upcoming Tours</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {upcomingTours.reduce((sum, tour) => sum + tour.totalPersons, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Travelers</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {upcomingTours.reduce((sum, tour) => sum + tour.activities.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Planned Activities</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(upcomingTours.reduce((sum, tour) => sum + tour.finalAmount, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Booked</div>
          </div>
        </div>

        {/* Upcoming Tours List */}
        <div className="space-y-6">
          {upcomingTours.map((tour) => {
            const paymentProgress = calculatePaymentProgress(tour);
            const nextPayment = tour.payments.find(p => p.paymentStatus === 'PENDING');
            
            return (
              <div key={tour.bookingId} className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
                {/* Tour Header */}
                <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-xl font-bold">{tour.tourName}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(tour.travelUrgency)}`}>
                          {tour.countdown}
                        </span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {tour.bookingStatus}
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
                          <span>📍</span>
                          <span>{tour.startLocation} → {tour.endLocation}</span>
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

                  {/* Payment Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Payment Progress</span>
                      <span className="text-sm font-semibold">
                        {formatCurrency(tour.payments.filter(p => p.paymentStatus === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0))} / {formatCurrency(tour.finalAmount)}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${paymentProgress}%` }}
                      ></div>
                    </div>
                    {nextPayment && (
                      <div className="mt-2 text-sm">
                        Next payment: {formatCurrency(nextPayment.amount)} due {formatDate(nextPayment.dueDate)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedBooking === tour.bookingId && (
                  <div className="p-6 space-y-6">
                    {/* Preparation Checklist */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-blue-600 mr-2">✅</span>
                        Preparation Checklist
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full ${paymentProgress === 100 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            <span>Complete Payments ({paymentProgress.toFixed(0)}%)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full ${
                              tour.participants.every(p => p.passportProvided) ? 'bg-green-500' : 'bg-amber-500'
                            }`}></span>
                            <span>Passport Documents</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full ${
                              tour.documents.some(d => d.documentCategory === 'TRAVEL_DOCS') ? 'bg-green-500' : 'bg-amber-500'
                            }`}></span>
                            <span>Travel Itinerary</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full ${
                              tour.participants.every(p => p.participantReadiness === 'READY') ? 'bg-green-500' : 'bg-amber-500'
                            }`}></span>
                            <span>Participant Readiness</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full ${
                              tour.daysUntilTravel > 30 ? 'bg-green-500' : tour.daysUntilTravel > 7 ? 'bg-amber-500' : 'bg-red-500'
                            }`}></span>
                            <span>Travel Readiness</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded-full bg-amber-500"></span>
                            <span>Emergency Contacts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Package & Payment Information */}
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
                          <span className="text-purple-600 mr-2">💳</span>
                          Payment Status
                        </h3>
                        <div className="space-y-3">
                          {tour.payments.map((payment, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-sm">
                                  {payment.paymentReference} (Installment {payment.installmentNumber})
                                </div>
                                <div className="text-xs text-gray-600">
                                  Due: {formatDate(payment.dueDate)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.paymentStatus)}`}>
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
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getReadinessColor(participant.participantReadiness)}`}>
                                {participant.participantReadiness}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>Age: {participant.age} • {participant.gender}</div>
                              <div className="flex items-center space-x-1">
                                <span>Passport:</span>
                                <span className={participant.passportProvided ? 'text-green-600' : 'text-amber-600'}>
                                  {participant.passportProvided ? '✅ Provided' : '❌ Pending'}
                                </span>
                              </div>
                              <div>Nationality: {participant.nationality}</div>
                              {participant.allergies !== 'None' && (
                                <div className="text-amber-600">Allergies: {participant.allergies}</div>
                              )}
                              {participant.medicalConditions !== 'None' && (
                                <div className="text-red-600">Medical: {participant.medicalConditions}</div>
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
                        Planned Activities ({tour.activities.length})
                      </h3>
                      <div className="space-y-3">
                        {tour.activities.map((activity, index) => (
                          <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{activity.activityName}</h4>
                                <p className="text-gray-600 text-sm">{activity.activityDescription}</p>
                              </div>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                {formatCurrency(activity.totalPrice)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div>📅 {formatDate(activity.activityDate)}</div>
                              <div>⏰ {formatTime(activity.startTime)} - {formatTime(activity.endTime)}</div>
                              <div>🕒 {activity.durationHours}h</div>
                              <div>📍 {activity.destinationName}</div>
                              <div>👥 {activity.numberOfParticipants} participants</div>
                              <div className={activity.daysUntilActivity < 0 ? 'text-amber-600' : 'text-gray-600'}>
                                {getDaysUntilText(activity.daysUntilActivity)}
                              </div>
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
                          Travel Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tour.documents.map((document, index) => (
                            <button
                              key={index}
                              onClick={() => downloadDocument(document.documentUrl, document.documentName)}
                              className="flex items-center justify-between bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg p-3 transition-colors text-left"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-amber-600">📄</span>
                                <div>
                                  <div className="font-medium text-gray-800 text-sm">{document.documentName}</div>
                                  <div className="text-xs text-gray-500">
                                    {document.documentType} • {(document.fileSize / 1024).toFixed(1)} KB
                                  </div>
                                </div>
                              </div>
                              <span className="text-amber-600 text-sm font-medium">Download</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-4 transition-colors">
              <span>📞</span>
              <span>Contact Support</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 transition-colors">
              <span>💳</span>
              <span>Make Payment</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 transition-colors">
              <span>📋</span>
              <span>View Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}