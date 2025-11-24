// app/profile/reviews/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { UserProfileReviewResponse } from '@/types/user-profile';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<UserProfileReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

  const reviewTypes = [
    {
      title: 'Tour Reviews',
      description: 'Your reviews for complete tour experiences',
      icon: '🚌',
      path: '/profile/tour-reviews',
      color: 'from-blue-500 to-purple-600',
      count: 0 // We'll update this based on actual data
    },
    {
      title: 'Activity Reviews',
      description: 'Your reviews for individual activities',
      icon: '🎯',
      path: '/profile/activity-reviews',
      color: 'from-green-500 to-amber-600',
      count: 0
    },
    {
      title: 'Destination Reviews',
      description: 'Your reviews for travel destinations',
      icon: '🏝️',
      path: '/profile/destination-reviews',
      color: 'from-amber-500 to-orange-600',
      count: 0
    },
    {
      title: 'Package Reviews',
      description: 'Your reviews for travel packages',
      icon: '📦',
      path: '/profile/package-reviews',
      color: 'from-purple-500 to-pink-600',
      count: 0
    }
  ];

  useEffect(() => {
    loadAllReviews();
  }, []);

  const loadAllReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllReviews();
      setAllReviews(response.data || []);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
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
        <span className="text-sm font-semibold text-purple-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const ReviewCard = ({ review }: { review: UserProfileReviewResponse }) => {
    return (
      <div className="bg-white rounded-xl shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300 p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              {review.reviewer.username}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <StarRating rating={review.rating} />
              <span className="text-xs text-gray-500">
                {new Date(review.reviewCreatedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-2 line-clamp-2">
              {review.reviewDescription}
            </p>
          </div>
        </div>

        {/* Tour and Package Info */}
        <div className="flex flex-wrap gap-2 mb-3">
          {review.tour && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
              🚌 {review.tour.name}
            </span>
          )}
          {review.packageInfo && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 border border-amber-200">
              📦 {review.packageInfo.name}
            </span>
          )}
        </div>

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto mb-3">
            {review.images.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.imageUrl}
                  alt="Review image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex space-x-3">
            <span>{review.reactions?.length || 0} reactions</span>
            <span>{review.comments?.length || 0} comments</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            review.reviewStatus === 'ACTIVE' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {review.reviewStatus}
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-8"></div>
            
            {/* Categories Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-amber-100 to-purple-100 rounded-2xl"></div>
              ))}
            </div>

            {/* Reviews Loading */}
            <div className="h-6 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 bg-gradient-to-r from-amber-100 to-purple-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            My Reviews
          </h1>
          <p className="text-gray-600 mt-2">Manage and view all your travel reviews</p>
        </div>

        {/* Review Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewTypes.map((type) => (
              <Link
                key={type.title}
                href={type.path}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center text-2xl text-white`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                      View Reviews →
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-2.5 py-1 rounded-full">
                      {type.count}+
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Reviews Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              All Reviews ({allReviews.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                {allReviews.filter(r => r.reviewStatus === 'ACTIVE').length} Active
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {allReviews.length} Total
              </span>
            </div>
          </div>

          {allReviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
              <div className="text-amber-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-4">You havent written any reviews yet.</p>
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Start Reviewing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allReviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {allReviews.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">{allReviews.length}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {(allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {allReviews.filter(r => r.reviewStatus === 'ACTIVE').length}
                </div>
                <div className="text-sm text-gray-600">Active Reviews</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {allReviews.reduce((acc, review) => acc + (review.images?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Photos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}