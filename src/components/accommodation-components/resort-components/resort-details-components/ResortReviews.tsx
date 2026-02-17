// components/resort/ResortReviews.tsx
import React from 'react';
import { Star, Award, ThumbsUp, Users, TrendingUp, Heart, Waves } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface ResortReviewsProps {
  reviews: Review[];
  statistics: Statistics;
}

const ResortReviews: React.FC<ResortReviewsProps> = ({ reviews, statistics }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-xl">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A2F44]">Guest Reviews</h2>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full">
          <Award className="w-5 h-5" />
          <span className="font-semibold">Highly Rated</span>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-br from-[#0A2F44] to-[#144A5E] text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-1">{statistics.averageRating.toFixed(1)}</div>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(statistics.averageRating) 
                    ? 'fill-current' 
                    : 'text-blue-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm opacity-90">Average Rating</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-[#144A5E] to-[#1F5F72] text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.totalReviews}</div>
          <div className="text-sm opacity-90 flex items-center justify-center gap-1">
            <Users className="w-4 h-4" />
            Total Reviews
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-[#1F5F72] to-[#0A2F44] text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.occupancyRate}%</div>
          <div className="text-sm opacity-90 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Occupancy Rate
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-[#0A2F44] to-[#1F5F72] text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.totalBookings}+</div>
          <div className="text-sm opacity-90">Total Bookings</div>
        </div>
      </div>
      
      {/* Guest Reviews */}
      <div className="space-y-6">
        {reviews.slice(0, 4).map((review) => (
          <div key={review.reviewId} className="border border-[#0A2F44]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-[#F0F7FA]">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.firstName[0]}{review.lastName[0]}
                </div>
                <div>
                  <div className="font-semibold text-[#0A2F44]">
                    {review.firstName} {review.lastName}
                  </div>
                  <div className="text-sm text-[#144A5E]">@{review.username}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.overallRating 
                          ? 'fill-amber-500 text-amber-500' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-amber-600">{review.overallRating}/5</span>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold text-[#0A2F44] mb-3">{review.title}</h4>
            <p className="text-[#144A5E] mb-4 text-lg leading-relaxed">{review.comment}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              {review.ratingCategories.slice(0, 4).map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-sm font-medium text-[#0A2F44]">{category.categoryName}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < category.categoryRating 
                            ? 'fill-[#1F5F72] text-[#1F5F72]' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-[#144A5E]">
                Reviewed on {new Date(review.reviewDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {review.isApproved && (
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <ThumbsUp className="w-4 h-4" />
                  Verified Stay
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {reviews.length > 4 && (
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] hover:from-[#052230] hover:to-[#144A5E] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
            <Heart className="w-5 h-5" />
            Read All {reviews.length} Reviews
          </button>
        </div>
      )}
      
      {/* Review Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-2xl border border-[#0A2F44]/10">
        <h3 className="text-xl font-semibold text-[#0A2F44] mb-3">Guest Feedback Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#144A5E]">Service Quality</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#144A5E]">Room Comfort</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 5 ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#144A5E]">Location</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 5 ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#144A5E]">Amenities</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortReviews;