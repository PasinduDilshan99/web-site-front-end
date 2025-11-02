// components/restaurant/RestaurantReviews.tsx
import React from 'react';
import { Star, Utensils, Heart, Clock } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface RestaurantReviewsProps {
  reviews: Review[];
  statistics: Statistics | null;
}

const RestaurantReviews: React.FC<RestaurantReviewsProps> = ({ reviews, statistics }) => {
  // Safe defaults for statistics
  const safeStatistics = {
    averageRating: statistics?.averageRating || 0,
    totalReviews: statistics?.totalReviews || 0,
    occupancyRate: statistics?.occupancyRate || 0,
    totalBookings: statistics?.totalBookings || 0,
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      {/* Statistics Grid with Safe Values */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-rose-50 rounded-xl border border-rose-200">
          <div className="text-2xl font-bold text-rose-600">
            {safeStatistics.averageRating > 0 ? safeStatistics.averageRating.toFixed(1) : '0.0'}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {safeStatistics.totalReviews}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="text-center p-4 bg-rose-50 rounded-xl border border-rose-200">
          <div className="text-2xl font-bold text-rose-600">
            {safeStatistics.occupancyRate}%
          </div>
          <div className="text-sm text-gray-600">Satisfaction Rate</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {safeStatistics.totalBookings}
          </div>
          <div className="text-sm text-gray-600">Total Visitors</div>
        </div>
      </div>
      
      {/* Reviews Section */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.reviewId} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.overallRating 
                        ? 'fill-orange-500 text-orange-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-semibold text-gray-900">{review.overallRating}/5</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
              <p className="text-gray-600 mb-3">{review.comment}</p>
              <div className="text-sm text-gray-500">
                By {review.firstName} {review.lastName} • {new Date(review.reviewDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">Be the first to review this restaurant!</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantReviews;