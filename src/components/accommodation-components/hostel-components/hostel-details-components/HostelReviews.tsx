// components/hostel/HostelReviews.tsx
import React from 'react';
import { Star, Users, TrendingUp, Award } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface HostelReviewsProps {
  reviews: Review[] | null | undefined;
  statistics: Statistics | null | undefined;
}

const HostelReviews: React.FC<HostelReviewsProps> = ({ reviews, statistics }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-amber-600';
    return 'text-red-600';
  };

  // Handle null/undefined reviews
  const safeReviews = reviews || [];
  const hasReviews = safeReviews.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className={`text-2xl font-bold ${getRatingColor(statistics?.averageRating || 0)}`}>
            {statistics?.averageRating?.toFixed(1) || 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
          <div className="flex justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(statistics?.averageRating || 0)
                    ? 'fill-blue-500 text-blue-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <div className="text-2xl font-bold text-indigo-600">
            {statistics?.totalReviews || 0}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
          <Users className="w-4 h-4 text-indigo-500 mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {statistics?.occupancyRate ? `${statistics.occupancyRate}%` : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Occupancy Rate</div>
          <TrendingUp className="w-4 h-4 text-green-500 mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="text-2xl font-bold text-amber-600">
            {statistics?.totalBookings || 0}
          </div>
          <div className="text-sm text-gray-600">Total Bookings</div>
          <Award className="w-4 h-4 text-amber-500 mx-auto mt-1" />
        </div>
      </div>
      
      {/* Recent Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Reviews {!hasReviews && '(No reviews yet)'}
        </h3>
        
        {hasReviews ? (
          <>
            {safeReviews.slice(0, 3).map((review) => (
              <div key={review.reviewId} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (review.overallRating || 0)
                            ? 'fill-blue-500 text-blue-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="font-semibold text-gray-900">
                      {(review.overallRating || 0).toFixed(1)}/5
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'Date not available'}
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">
                  {review.title || 'No Title'}
                </h4>
                <p className="text-gray-600 mb-3">
                  {review.comment || 'No comment provided.'}
                </p>
                
                {/* Rating Categories */}
                {review.ratingCategories && review.ratingCategories.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    {review.ratingCategories.slice(0, 3).map((category, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{category.categoryName}:</span>
                        <span className="font-semibold text-blue-600">
                          {category.categoryRating}/5
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  By {review.firstName || 'Anonymous'} {review.lastName || ''} • {review.username || 'Unknown User'}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Reviews Yet</h4>
            <p className="text-gray-500">Be the first to share your experience at this hostel!</p>
          </div>
        )}
      </div>

      {/* Review Summary */}
      {hasReviews && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">What Guests Love</h4>
          <div className="flex flex-wrap gap-2">
            {['Friendly Staff', 'Great Location', 'Clean Rooms', 'Social Atmosphere', 'Good Value'].map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm border border-blue-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {safeReviews.length > 3 && (
        <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          View All {safeReviews.length} Reviews
        </button>
      )}
    </div>
  );
};

export default HostelReviews;