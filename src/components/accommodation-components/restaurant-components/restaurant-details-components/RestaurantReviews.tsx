// components/restaurant/RestaurantReviews.tsx
import React from 'react';
import { Star, Utensils, Heart, Clock, Waves } from 'lucide-react';
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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl">
      <h2 className="text-2xl font-bold text-[#3A9B9B] mb-6 flex items-center gap-2">
        <Waves className="w-6 h-6" />
        Guest Experiences
      </h2>
      
      {/* Statistics Grid with Safe Values */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="text-2xl font-bold text-[#3A9B9B]">
            {safeStatistics.averageRating > 0 ? safeStatistics.averageRating.toFixed(1) : '0.0'}
          </div>
          <div className="text-sm text-[#5FB3B3]">Average Rating</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="text-2xl font-bold text-[#5FB3B3]">
            {safeStatistics.totalReviews}
          </div>
          <div className="text-sm text-[#5FB3B3]">Total Reviews</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="text-2xl font-bold text-[#84CACA]">
            {safeStatistics.occupancyRate}%
          </div>
          <div className="text-sm text-[#5FB3B3]">Satisfaction Rate</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="text-2xl font-bold text-[#3A9B9B]">
            {safeStatistics.totalBookings}
          </div>
          <div className="text-sm text-[#5FB3B3]">Total Visitors</div>
        </div>
      </div>
      
      {/* Reviews Section */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.reviewId} className="border border-[#3A9B9B]/10 rounded-xl p-4 hover:shadow-lg transition-all bg-white">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.overallRating 
                        ? 'fill-[#84CACA] text-[#84CACA]' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-semibold text-[#3A9B9B]">{review.overallRating}/5</span>
              </div>
              <h4 className="font-semibold text-[#3A9B9B] mb-1">{review.title}</h4>
              <p className="text-[#5FB3B3] mb-3">{review.comment}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  By {review.firstName} {review.lastName} • {new Date(review.reviewDate).toLocaleDateString()}
                </div>
                <span className="text-xs text-[#84CACA]">Verified Diner</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl">
          <Utensils className="w-12 h-12 text-[#3A9B9B]/30 mx-auto mb-3" />
          <p className="text-[#5FB3B3] font-medium">No reviews yet</p>
          <p className="text-sm text-[#84CACA] mt-1">Be the first to review this coastal restaurant!</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantReviews;