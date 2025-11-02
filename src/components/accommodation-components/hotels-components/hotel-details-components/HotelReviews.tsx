// components/hotel/HotelReviews.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface HotelReviewsProps {
  reviews: Review[];
  statistics: Statistics;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews, statistics }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="text-2xl font-bold text-amber-600">{statistics.averageRating}</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{statistics.totalReviews}</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="text-2xl font-bold text-amber-600">{statistics.occupancyRate}%</div>
          <div className="text-sm text-gray-600">Occupancy Rate</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{statistics.totalBookings}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.reviewId} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.overallRating 
                      ? 'fill-amber-500 text-amber-500' 
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
    </div>
  );
};

export default HotelReviews;