// components/villa/VillaReviews.tsx
import React from 'react';
import { Star, Award, Trophy, Heart, ThumbsUp, CheckCircle } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface VillaReviewsProps {
  reviews: Review[];
  statistics: Statistics | null;
}

const VillaReviews: React.FC<VillaReviewsProps> = ({ reviews, statistics }) => {
  // Default statistics if null
  const safeStatistics = statistics || {
    statsId: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
    occupancyRate: 0,
    lastUpdated: new Date().toISOString()
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-teal-600';
    if (rating >= 3.5) return 'text-amber-600';
    return 'text-gray-600';
  };

  const getRatingIcon = (rating: number) => {
    if (rating >= 4.5) return <Trophy className="w-5 h-5" />;
    if (rating >= 4.0) return <Award className="w-5 h-5" />;
    return <ThumbsUp className="w-5 h-5" />;
  };

  // Safe reviews array
  const safeReviews = reviews || [];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-7 h-7 text-emerald-600" />
        <h2 className="text-3xl font-bold text-gray-900">Guest Experiences</h2>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            {getRatingIcon(safeStatistics.averageRating)}
            <div className={`text-3xl font-bold ${getRatingColor(safeStatistics.averageRating)}`}>
              {safeStatistics.averageRating > 0 ? safeStatistics.averageRating : 'N/A'}
            </div>
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
          <div className="flex justify-center mt-2">
            {safeStatistics.averageRating > 0 ? (
              [...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(safeStatistics.averageRating)
                      ? 'fill-emerald-500 text-emerald-500'
                      : 'text-gray-300'
                  }`}
                />
              ))
            ) : (
              <span className="text-sm text-gray-400">No ratings yet</span>
            )}
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200">
          <div className="text-3xl font-bold text-teal-600">
            {safeStatistics.totalReviews > 0 ? safeStatistics.totalReviews : '0'}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
          <div className="text-xs text-teal-600 font-semibold mt-2">
            {safeStatistics.totalReviews > 0 ? 'Verified Guests' : 'Be the first to review'}
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
          <div className="text-3xl font-bold text-emerald-600">
            {safeStatistics.occupancyRate > 0 ? `${safeStatistics.occupancyRate}%` : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Occupancy Rate</div>
          <div className="text-xs text-emerald-600 font-semibold mt-2">
            {safeStatistics.occupancyRate > 0 ? 'Highly Popular' : 'New Property'}
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200">
          <div className="text-3xl font-bold text-teal-600">
            {safeStatistics.totalBookings > 0 ? `${safeStatistics.totalBookings}+` : '0'}
          </div>
          <div className="text-sm text-gray-600">Total Bookings</div>
          <div className="text-xs text-teal-600 font-semibold mt-2">
            {safeStatistics.totalBookings > 0 ? 'Happy Guests' : 'New Listing'}
          </div>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {safeReviews.length > 0 ? (
          safeReviews.slice(0, 4).map((review) => (
            <div key={review.reviewId} className="border-2 border-emerald-200 rounded-2xl p-6 hover:shadow-lg transition-all group">
              {/* Review Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {review.firstName?.[0] || 'G'}{review.lastName?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {review.firstName || 'Guest'} {review.lastName || 'User'}
                    </div>
                    <div className="text-sm text-gray-500">Verified Guest</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (review.overallRating || 0) 
                            ? 'fill-emerald-500 text-emerald-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-emerald-600">
                    {(review.overallRating || 0)}/5
                  </span>
                </div>
              </div>
              
              {/* Review Content */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-lg mb-2">
                  {review.title || 'Great Experience'}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment || 'No review content available.'}
                </p>
              </div>
              
              {/* Rating Categories */}
              {review.ratingCategories && review.ratingCategories.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {review.ratingCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        {category.categoryName || 'Category'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-emerald-600">
                          {category.categoryRating || 0}
                        </span>
                        <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Review Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-emerald-200">
                <div className="text-sm text-gray-500">
                  Stayed on {review.reviewDate ? 
                    new Date(review.reviewDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Recently'
                  }
                </div>
                {review.isApproved && (
                  <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Verified Stay
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500">Be the first to share your experience at this villa!</p>
          </div>
        )}
      </div>
      
      {safeReviews.length > 4 && (
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200">
            Read All {safeReviews.length} Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default VillaReviews;