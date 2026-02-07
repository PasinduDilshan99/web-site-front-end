// app/profile/tours/page.tsx
"use client"
import { useAuth } from '@/context/AuthContext';
import { USER_PROFILE_TOURS_VIEW_PRIVILEGE } from '@/utils/privileges';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Import API service and types
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { CompletedTour, CompletedToursResponse } from '@/types/completed-tours';
import { CancelledTour, CancelledToursResponse } from '@/types/cancelled-tours';
import { RequestedTour, RequestedToursResponse } from '@/types/requested-tours';
import { UpcomingTour, UpcomingToursResponse } from '@/types/upcoming-tours';

// Combined Tour type for display
interface DisplayTour {
  id: string;
  title: string;
  description: string;
  status: 'REQUESTED' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  location: string;
  tourType: string;
  price: number;
  participants: number;
  rating?: number;
  images?: string[];
  bookingReference: string;
  bookingId: number;
  bookingStatus: string;
  packageName: string;
  totalPersons: number;
  finalAmount: number;
  originalData: CompletedTour | CancelledTour | RequestedTour | UpcomingTour;
}

// Tour category type
interface TourCategory {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  count: number;
}

export default function ToursPage() {
  const [allTours, setAllTours] = useState<DisplayTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'requested' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([
    {
      title: 'Requested Tours',
      description: 'Tours you have requested and pending confirmation',
      icon: '📝',
      path: '/profile/requested-tours',
      color: 'from-sky-500 to-blue-600',
      count: 0
    },
    {
      title: 'Upcoming Tours',
      description: 'Tours that are confirmed and coming soon',
      icon: '🗓️',
      path: '/profile/upcoming-tours',
      color: 'from-teal-500 to-emerald-600',
      count: 0
    },
    {
      title: 'Completed Tours',
      description: 'Tours you have successfully completed',
      icon: '✅',
      path: '/profile/completed-tours',
      color: 'from-cyan-500 to-blue-600',
      count: 0
    },
    {
      title: 'Cancelled Tours',
      description: 'Tours that have been cancelled or declined',
      icon: '❌',
      path: '/profile/cancelled-tours',
      color: 'from-rose-500 to-pink-600',
      count: 0
    }
  ]);

  const { user } = useAuth();
  const router = useRouter();
  const [apiService] = useState(() => new UserProfileAPIService());

  useEffect(() => {
    if (user && !user.privileges.includes(USER_PROFILE_TOURS_VIEW_PRIVILEGE)) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadAllTours();
  }, []);

  const loadAllTours = async () => {
    try {
      setLoading(true);
      
      // Fetch all tour types in parallel
      const [completedResponse, cancelledResponse, requestedResponse, upcomingResponse] = await Promise.all([
        apiService.getCompletedTours(),
        apiService.getCancelledTours(),
        apiService.getRequestedTours(),
        apiService.getUpcomingTours()
      ]);

      // Process and combine all tours
      const allToursData: DisplayTour[] = [];

      // Process completed tours
      const completedTours: DisplayTour[] = [];
      if (completedResponse?.data) {
        completedTours.push(...completedResponse.data.map((tour: CompletedTour) => ({
          id: `completed_${tour.bookingId}`,
          title: tour.tourName,
          description: tour.tourDescription,
          status: 'COMPLETED' as const,
          startDate: tour.travelStartDate,
          endDate: tour.travelEndDate,
          location: tour.startLocation,
          tourType: tour.tourType,
          price: tour.finalAmount,
          participants: tour.totalPersons,
          images: tour.documents?.filter(doc => doc.documentType === 'IMAGE')
            .map(doc => doc.documentUrl) || [],
          bookingReference: tour.bookingReference,
          bookingId: tour.bookingId,
          bookingStatus: tour.bookingStatus,
          packageName: tour.packageName,
          totalPersons: tour.totalPersons,
          finalAmount: tour.finalAmount,
          originalData: tour
        })));
        allToursData.push(...completedTours);
      }

      // Process cancelled tours
      const cancelledTours: DisplayTour[] = [];
      if (cancelledResponse?.data) {
        cancelledTours.push(...cancelledResponse.data.map((tour: CancelledTour) => ({
          id: `cancelled_${tour.bookingId}`,
          title: tour.tourName,
          description: tour.tourDescription,
          status: 'CANCELLED' as const,
          startDate: tour.travelStartDate,
          endDate: tour.travelEndDate,
          location: tour.startLocation,
          tourType: tour.tourType,
          price: tour.finalAmount,
          participants: tour.totalPersons,
          images: tour.documents?.filter(doc => doc.documentType === 'IMAGE')
            .map(doc => doc.documentUrl) || [],
          bookingReference: tour.bookingReference,
          bookingId: tour.bookingId,
          bookingStatus: tour.bookingStatus,
          packageName: tour.packageName,
          totalPersons: tour.totalPersons,
          finalAmount: tour.finalAmount,
          originalData: tour
        })));
        allToursData.push(...cancelledTours);
      }

      // Process requested tours
      const requestedTours: DisplayTour[] = [];
      if (requestedResponse?.data) {
        requestedTours.push(...requestedResponse.data.map((tour: RequestedTour) => ({
          id: `requested_${tour.bookingId}`,
          title: tour.tourName,
          description: tour.tourDescription,
          status: 'REQUESTED' as const,
          startDate: tour.travelStartDate,
          endDate: tour.travelEndDate,
          location: tour.startLocation,
          tourType: tour.tourType,
          price: tour.finalAmount,
          participants: tour.totalPersons,
          images: tour.documents?.filter(doc => doc.documentType === 'IMAGE')
            .map(doc => doc.documentUrl) || [],
          bookingReference: tour.bookingReference,
          bookingId: tour.bookingId,
          bookingStatus: tour.bookingStatus,
          packageName: tour.packageName,
          totalPersons: tour.totalPersons,
          finalAmount: tour.finalAmount,
          originalData: tour
        })));
        allToursData.push(...requestedTours);
      }

      // Process upcoming tours
      const upcomingTours: DisplayTour[] = [];
      if (upcomingResponse?.data) {
        upcomingTours.push(...upcomingResponse.data.map((tour: UpcomingTour) => ({
          id: `upcoming_${tour.bookingId}`,
          title: tour.tourName,
          description: tour.tourDescription,
          status: 'UPCOMING' as const,
          startDate: tour.travelStartDate,
          endDate: tour.travelEndDate,
          location: tour.startLocation,
          tourType: tour.tourType,
          price: tour.finalAmount,
          participants: tour.totalPersons,
          images: tour.documents?.filter(doc => doc.documentCategory === 'IMAGE')
            .map(doc => doc.documentUrl) || [],
          bookingReference: tour.bookingReference,
          bookingId: tour.bookingId,
          bookingStatus: tour.bookingStatus,
          packageName: tour.packageName,
          totalPersons: tour.totalPersons,
          finalAmount: tour.finalAmount,
          originalData: tour
        })));
        allToursData.push(...upcomingTours);
      }

      setAllTours(allToursData);
      
      // Update tour categories with counts
      setTourCategories(prev => prev.map(category => {
        if (category.title === 'Requested Tours') {
          return { ...category, count: requestedTours.length };
        }
        if (category.title === 'Upcoming Tours') {
          return { ...category, count: upcomingTours.length };
        }
        if (category.title === 'Completed Tours') {
          return { ...category, count: completedTours.length };
        }
        if (category.title === 'Cancelled Tours') {
          return { ...category, count: cancelledTours.length };
        }
        return category;
      }));
      
    } catch (error) {
      console.error('Failed to load tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTours = allTours.filter(tour => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'requested') return tour.status === 'REQUESTED';
    if (activeFilter === 'upcoming') return tour.status === 'UPCOMING';
    if (activeFilter === 'completed') return tour.status === 'COMPLETED';
    if (activeFilter === 'cancelled') return tour.status === 'CANCELLED';
    return true;
  });

  const StarRating = ({ rating }: { rating?: number }) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${
                star <= Math.floor(rating)
                  ? 'text-amber-500 fill-current'
                  : star === Math.ceil(rating) && rating % 1 !== 0
                  ? 'text-amber-500 fill-current'
                  : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs sm:text-sm font-semibold text-amber-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const TourCard = ({ tour }: { tour: DisplayTour }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'REQUESTED': return 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-800 border border-sky-200';
        case 'UPCOMING': return 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 border border-teal-200';
        case 'COMPLETED': return 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-800 border border-cyan-200';
        case 'CANCELLED': return 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 border border-rose-200';
        default: return 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border border-gray-200';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'REQUESTED': return '📝';
        case 'UPCOMING': return '🗓️';
        case 'COMPLETED': return '✅';
        case 'CANCELLED': return '❌';
        default: return '📍';
      }
    };

    // Get additional info from original data
    const getAdditionalInfo = () => {
      switch (tour.status) {
        case 'UPCOMING':
          const upcomingData = tour.originalData as UpcomingTour;
          return (
            <div className="mt-2 flex items-center space-x-2 text-xs">
              <span className="flex items-center space-x-1 px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                <span>⏰</span>
                <span>{upcomingData.daysUntilTravel} days</span>
              </span>
              <span className={`px-2 py-1 rounded-full ${
                upcomingData.travelUrgency === 'URGENT' 
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : upcomingData.travelUrgency === 'HIGH'
                  ? 'bg-orange-50 text-orange-700 border border-orange-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {upcomingData.travelUrgency}
              </span>
            </div>
          );
        
        case 'REQUESTED':
          const requestedData = tour.originalData as RequestedTour;
          return (
            <div className="mt-2 flex items-center space-x-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                requestedData.approvalStatus === 'PENDING'
                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  : requestedData.approvalStatus === 'APPROVED'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {requestedData.approvalStatus}
              </span>
              <span className="flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <span>⏱️</span>
                <span>{requestedData.requestAge}</span>
              </span>
            </div>
          );
        
        case 'CANCELLED':
          const cancelledData = tour.originalData as CancelledTour;
          return (
            <div className="mt-2 flex items-center space-x-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                cancelledData.refundStatus === 'REFUNDED'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : cancelledData.refundStatus === 'PENDING'
                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                Refund: {cancelledData.refundStatus}
              </span>
              {cancelledData.refundedAmount > 0 && (
                <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  ${cancelledData.refundedAmount}
                </span>
              )}
            </div>
          );
        
        case 'COMPLETED':
          const completedData = tour.originalData as CompletedTour;
          return (
            <div className="mt-2 flex items-center space-x-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                Completed {new Date(completedData.completionTime).toLocaleDateString()}
              </span>
              {completedData.payments?.length > 0 && (
                <span className={`px-2 py-1 rounded-full ${
                  completedData.payments.every(p => p.paymentStatus === 'PAID')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {completedData.payments.every(p => p.paymentStatus === 'PAID') ? 'Paid' : 'Payment Due'}
                </span>
              )}
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all duration-300 p-4 sm:p-5 h-full group">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="mb-4 flex-1">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 pr-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                    {tour.bookingReference}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StarRating rating={tour.rating} />
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date(tour.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} - {new Date(tour.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {tour.description}
                </p>
                
                {getAdditionalInfo()}
              </div>
            </div>

            {/* Location and Tour Type */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-gray-50 to-slate-100 text-gray-800 border border-gray-200 font-medium">
                <span className="mr-1.5">📍</span>
                <span className="truncate max-w-[120px] sm:max-w-[150px]">{tour.location}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-sky-50 to-teal-50 text-sky-800 border border-sky-200 font-medium">
                <span className="mr-1.5">🎯</span>
                <span className="truncate max-w-[120px] sm:max-w-[150px]">{tour.tourType}</span>
              </span>
              {tour.packageName && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-purple-50 to-pink-50 text-purple-800 border border-purple-200 font-medium">
                  <span className="mr-1.5">📦</span>
                  <span className="truncate max-w-[120px] sm:max-w-[150px]">{tour.packageName}</span>
                </span>
              )}
            </div>

            {/* Images */}
            {tour.images && tour.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
                {tour.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-sky-50 to-teal-50 rounded-lg overflow-hidden border border-sky-100"
                  >
                    <img 
                      src={image} 
                      alt={`Tour ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/150/93c5fd/1e3a8a?text=Tour+${index + 1}`;
                      }}
                    />
                  </div>
                ))}
                {tour.images.length > 3 && (
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-sky-100 to-teal-100 rounded-lg flex items-center justify-center border border-sky-200">
                    <span className="text-sky-700 font-bold text-sm sm:text-base">+{tour.images.length - 3}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="w-5 h-5">👥</span>
                  <span className="font-medium">{tour.participants}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="w-5 h-5">💰</span>
                  <span className="font-medium">${tour.price.toLocaleString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(tour.status)}`}>
                <span className="mr-1.5">{getStatusIcon(tour.status)}</span>
                <span className="hidden sm:inline">{tour.status.charAt(0) + tour.status.slice(1).toLowerCase()}</span>
                <span className="sm:hidden">{tour.status.charAt(0)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Loading */}
          <div className="animate-pulse mb-8">
            <div className="h-8 sm:h-10 md:h-12 bg-gradient-to-r from-sky-200 to-teal-200 rounded-lg w-48 sm:w-64 mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-sky-100 to-teal-100 rounded w-64 sm:w-80"></div>
          </div>
          
          {/* Categories Loading */}
          <div className="mb-8 sm:mb-12">
            <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-sky-200 to-teal-200 rounded w-40 sm:w-48 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 sm:h-36 md:h-40 bg-gradient-to-r from-sky-100 to-teal-100 rounded-xl sm:rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Tours Loading */}
          <div className="h-6 sm:h-7 md:h-8 bg-gradient-to-r from-sky-200 to-teal-200 rounded w-48 sm:w-56 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 sm:h-56 md:h-60 bg-gradient-to-r from-sky-100 to-teal-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            My Tours
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
            Manage and view all your travel tours in one place
          </p>
        </div>

        {/* Tour Categories - Responsive Grid */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Tour Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6">
            {tourCategories.map((type) => (
              <Link
                key={type.title}
                href={type.path}
                className="block group transform transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${type.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl text-white flex-shrink-0`}>
                        {type.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 truncate">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-sky-600 font-semibold text-sm sm:text-base group-hover:text-sky-700 transition-colors flex items-center">
                        View Tours
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                        {type.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filter Tabs and Stats */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                All Tours <span className="text-sky-600">({filteredTours.length})</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Filter and manage your tour collection
              </p>
            </div>
            
            {/* Filter Buttons - Responsive */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                All ({allTours.length})
              </button>
              <button
                onClick={() => setActiveFilter('requested')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'requested'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                Requested ({tourCategories[0].count})
              </button>
              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'upcoming'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-teal-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                Upcoming ({tourCategories[1].count})
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'completed'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50'
                }`}
              >
                Completed ({tourCategories[2].count})
              </button>
              <button
                onClick={() => setActiveFilter('cancelled')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'cancelled'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-rose-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                Cancelled ({tourCategories[3].count})
              </button>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-sky-200 p-6 sm:p-8 text-center">
            <div className="text-sky-400 text-5xl sm:text-6xl mb-4">🗺️</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">No Tours Found</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
              {activeFilter === 'all' 
                ? "You haven't booked any tours yet. Start exploring new destinations!"
                : `No ${activeFilter} tours found. Try changing the filter.`
              }
            </p>
            <button 
              onClick={() => router.push('/tours')}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-sky-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
            >
              Browse Tours
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Load More Button */}
            {filteredTours.length > 12 && (
              <div className="mt-8 sm:mt-12 text-center">
                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-sky-600 font-medium rounded-lg border border-sky-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 text-sm sm:text-base">
                  Load More Tours
                </button>
              </div>
            )}
          </>
        )}

        {/* Quick Stats - Only show if there are tours */}
        {allTours.length > 0 && (
          <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-sky-200 p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Tour Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <div className="text-2xl sm:text-3xl font-bold text-sky-600">{allTours.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Tours</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                <div className="text-2xl sm:text-3xl font-bold text-teal-600">
                  ${allTours.reduce((acc, tour) => acc + tour.price, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Spent</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-600">
                  {allTours.reduce((acc, tour) => acc + tour.participants, 0)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Total People</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {allTours.filter(t => t.originalData && 'rating' in t.originalData && t.originalData.rating).length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Rated Tours</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}