// components/hotel/HotelReviews.tsx
import React from 'react';
import { Star, Users, TrendingUp, Award, Heart } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface HotelReviewsProps {
  reviews: Review[];
  statistics: Statistics;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews, statistics }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-[#1D4F6E]';
    if (rating >= 4.0) return 'text-[#2A6F97]';
    if (rating >= 3.5) return 'text-[#3F8AB2]';
    return 'text-[#54A5CC]';
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
          <div className={`text-2xl font-bold ${getRatingColor(statistics.averageRating)}`}>
            {statistics.averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-[#3F8AB2]">Average Rating</div>
          <div className="flex justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(statistics.averageRating)
                    ? 'fill-[#2A6F97] text-[#2A6F97]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center p-4 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
          <div className="text-2xl font-bold text-[#2A6F97]">{statistics.totalReviews}</div>
          <div className="text-sm text-[#3F8AB2]">Total Reviews</div>
          <Users className="w-4 h-4 text-[#54A5CC] mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
          <div className="text-2xl font-bold text-[#2A6F97]">{statistics.occupancyRate}%</div>
          <div className="text-sm text-[#3F8AB2]">Occupancy Rate</div>
          <TrendingUp className="w-4 h-4 text-[#54A5CC] mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-[#F0F7FF] rounded-xl border border-[#2A6F97]/10">
          <div className="text-2xl font-bold text-[#2A6F97]">{statistics.totalBookings}</div>
          <div className="text-sm text-[#3F8AB2]">Total Bookings</div>
          <Award className="w-4 h-4 text-[#54A5CC] mx-auto mt-1" />
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.reviewId} className="border border-[#2A6F97]/10 rounded-xl p-4 hover:shadow-md transition-all bg-white">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.overallRating 
                      ? 'fill-[#2A6F97] text-[#2A6F97]' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="font-semibold text-[#1D4F6E]">{review.overallRating}/5</span>
            </div>
            <h4 className="font-semibold text-[#1D4F6E] mb-1">{review.title}</h4>
            <p className="text-[#3F8AB2] mb-3">{review.comment}</p>
            <div className="text-sm text-[#54A5CC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2A6F97] rounded-full"></span>
              By {review.firstName} {review.lastName} • {new Date(review.reviewDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button className="w-full mt-6 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
          View All {reviews.length} Reviews
        </button>
      )}
    </>
  );
};

export default HotelReviews;