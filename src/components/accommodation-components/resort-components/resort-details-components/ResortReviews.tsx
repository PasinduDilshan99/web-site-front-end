// components/resort/ResortReviews.tsx
import React from 'react';
import { Star, Award, ThumbsUp, Users, TrendingUp, Heart } from 'lucide-react';
import { Review, Statistics } from '@/types/accommodations-types/service-provider-types';

interface ResortReviewsProps {
  reviews: Review[];
  statistics: Statistics;
}

const ResortReviews: React.FC<ResortReviewsProps> = ({ reviews, statistics }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-teal-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Guest Reviews
        </h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full">
          <Award className="w-5 h-5" />
          <span className="font-semibold">Highly Rated</span>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-1">{statistics.averageRating}</div>
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
        
        <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.totalReviews}</div>
          <div className="text-sm opacity-90 flex items-center justify-center gap-1">
            <Users className="w-4 h-4" />
            Total Reviews
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.occupancyRate}%</div>
          <div className="text-sm opacity-90 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Occupancy Rate
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{statistics.totalBookings}+</div>
          <div className="text-sm opacity-90">Total Bookings</div>
        </div>
      </div>
      
      {/* Guest Reviews */}
      <div className="space-y-6">
        {reviews.slice(0, 4).map((review) => (
          <div key={review.reviewId} className="border-2 border-teal-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.firstName[0]}{review.lastName[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {review.firstName} {review.lastName}
                  </div>
                  <div className="text-sm text-gray-500">@{review.username}</div>
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
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{review.title}</h4>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">{review.comment}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              {review.ratingCategories.slice(0, 4).map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-700">{category.categoryName}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < category.categoryRating 
                            ? 'fill-teal-500 text-teal-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
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
          <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
            <Heart className="w-5 h-5" />
            Read All {reviews.length} Reviews
          </button>
        </div>
      )}
      
      {/* Review Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Guest Feedback Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Service Quality</span>
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
            <span className="text-gray-600">Room Comfort</span>
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
            <span className="text-gray-600">Location</span>
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
            <span className="text-gray-600">Amenities</span>
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