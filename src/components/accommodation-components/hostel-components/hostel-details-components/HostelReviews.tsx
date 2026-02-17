// components/hostel/HostelReviews.tsx
import React from 'react';
import { Star, Users, TrendingUp, Award, Heart } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface HostelReviewsProps {
  reviews: Review[] | null | undefined;
  statistics: Statistics | null | undefined;
}

const HostelReviews: React.FC<HostelReviewsProps> = ({ reviews, statistics }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-[#2D4F43]';
    if (rating >= 4.0) return 'text-[#3A9B9B]';
    if (rating >= 3.5) return 'text-[#5A8F7A]';
    return 'text-[#5A8F7A]';
  };

  // Handle null/undefined reviews
  const safeReviews = reviews || [];
  const hasReviews = safeReviews.length > 0;

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
          <div className={`text-2xl font-bold ${getRatingColor(statistics?.averageRating || 0)}`}>
            {statistics?.averageRating?.toFixed(1) || 'N/A'}
          </div>
          <div className="text-sm text-[#5A8F7A]">Average Rating</div>
          <div className="flex justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(statistics?.averageRating || 0)
                    ? 'fill-[#B5E5D4] text-[#B5E5D4]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#C9EFE3]">
          <div className="text-2xl font-bold text-[#2D4F43]">
            {statistics?.totalReviews || 0}
          </div>
          <div className="text-sm text-[#5A8F7A]">Total Reviews</div>
          <Users className="w-4 h-4 text-[#3A9B9B] mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#DDF9F2]">
          <div className="text-2xl font-bold text-[#2D4F43]">
            {statistics?.occupancyRate ? `${statistics.occupancyRate}%` : 'N/A'}
          </div>
          <div className="text-sm text-[#5A8F7A]">Occupancy Rate</div>
          <TrendingUp className="w-4 h-4 text-[#3A9B9B] mx-auto mt-1" />
        </div>
        
        <div className="text-center p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
          <div className="text-2xl font-bold text-[#2D4F43]">
            {statistics?.totalBookings || 0}
          </div>
          <div className="text-sm text-[#5A8F7A]">Total Bookings</div>
          <Award className="w-4 h-4 text-[#3A9B9B] mx-auto mt-1" />
        </div>
      </div>
      
      {/* Recent Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2D4F43] mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#B5E5D4]" />
          Recent Reviews {!hasReviews && '(No reviews yet)'}
        </h3>
        
        {hasReviews ? (
          <>
            {safeReviews.slice(0, 3).map((review) => (
              <div key={review.reviewId} className="border border-[#B5E5D4] rounded-xl p-4 hover:shadow-md transition-all bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (review.overallRating || 0)
                            ? 'fill-[#B5E5D4] text-[#B5E5D4]' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="font-semibold text-[#2D4F43]">
                      {(review.overallRating || 0).toFixed(1)}/5
                    </span>
                  </div>
                  <div className="text-sm text-[#5A8F7A]">
                    {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'Date not available'}
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#2D4F43] mb-2">
                  {review.title || 'No Title'}
                </h4>
                <p className="text-[#5A8F7A] mb-3">
                  {review.comment || 'No comment provided.'}
                </p>
                
                {/* Rating Categories */}
                {review.ratingCategories && review.ratingCategories.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    {review.ratingCategories.slice(0, 3).map((category, index) => (
                      <div key={index} className="flex items-center justify-between text-sm bg-[#F5FDFA] p-2 rounded-lg border border-[#B5E5D4]">
                        <span className="text-[#5A8F7A]">{category.categoryName}:</span>
                        <span className="font-semibold text-[#2D4F43]">
                          {category.categoryRating}/5
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-sm text-[#5A8F7A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#B5E5D4] rounded-full"></span>
                  By {review.firstName || 'Anonymous'} {review.lastName || ''}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-8 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
            <div className="text-[#B5E5D4] text-6xl mb-4">💬</div>
            <h4 className="text-lg font-semibold text-[#2D4F43] mb-2">No Reviews Yet</h4>
            <p className="text-[#5A8F7A]">Be the first to share your experience at this hostel!</p>
          </div>
        )}
      </div>

      {/* Review Summary */}
      {hasReviews && (
        <div className="mt-6 p-4 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
          <h4 className="font-semibold text-[#2D4F43] mb-3">What Guests Love</h4>
          <div className="flex flex-wrap gap-2">
            {['Friendly Staff', 'Great Location', 'Clean Rooms', 'Social Atmosphere', 'Good Value'].map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white text-[#2D4F43] rounded-full text-sm border border-[#B5E5D4] hover:shadow-sm transition-all"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {safeReviews.length > 3 && (
        <button className="w-full mt-6 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 border border-[#B5E5D4]">
          View All {safeReviews.length} Reviews
        </button>
      )}
    </>
  );
};

export default HostelReviews;