// app/profile/destination-reviews/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { DestinationReview } from '@/types/user-profile';
import { useState, useEffect } from 'react';

export default function DestinationReviewsPage() {
  const [destinationReviews, setDestinationReviews] = useState<DestinationReview[]>([]);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

  useEffect(() => {
    loadDestinationReviews();
  }, []);

  const loadDestinationReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDestinationReviews();
      setDestinationReviews(response.data || []);
    } catch (error) {
      console.error('Failed to load destination reviews:', error);
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
              className={`w-5 h-5 ${
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

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Destination Reviews
          </h1>
          <p className="text-gray-600 mt-2">Your reviews for travel destinations</p>
        </div>

        {destinationReviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🏝️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Destination Reviews Yet</h3>
            <p className="text-gray-600">You havent reviewed any destinations yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinationReviews.map((review) => (
              <div
                key={review.reviewId}
                className="bg-white rounded-2xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {review.destinationName}
                      </h3>
                      <StarRating rating={review.reviewRating} />
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {review.reactions?.length || 0} reactions
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">{review.reviewText}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="mb-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {review.images.map((image) => (
                          <div
                            key={image.imageId}
                            className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden"
                          >
                            <img
                              src={image.imageUrl}
                              alt={image.imageName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(review.reviewCreatedAt).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                        {review.reviewStatus}
                      </span>
                      <span>{review.comments?.length || 0} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}