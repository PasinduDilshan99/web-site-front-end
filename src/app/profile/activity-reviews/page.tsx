// app/profile/activity-reviews/page.tsx
"use client"
import { useAuth } from '@/context/AuthContext';
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { ActivityReview } from '@/types/user-profile';
import { USER_PROFILE_TOUR_ACTIVITY_VIEW_PRIVILEGE } from '@/utils/privileges';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ActivityReviewsPage() {
  const [activityReviews, setActivityReviews] = useState<ActivityReview[]>([]);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

  const {user} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_TOUR_ACTIVITY_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadActivityReviews();
  }, []);

  const loadActivityReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.getActivityReviews();
      setActivityReviews(response.data || []);
    } catch (error) {
      console.error('Failed to load activity reviews:', error);
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
                  ? 'text-sky-500 fill-current'
                  : star === Math.ceil(rating) && rating % 1 !== 0
                  ? 'text-sky-500 fill-current'
                  : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-teal-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const ReactionIcon = ({ type }: { type: string }) => {
    const icons: { [key: string]: string } = {
      LIKE: '👍',
      LOVE: '❤️',
      WOW: '😮',
      LAUGH: '😂',
    };
    return <span className="text-sm">{icons[type] || '👍'}</span>;
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-sky-200 to-teal-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 bg-gradient-to-r from-sky-100 to-teal-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-sky-25 to-teal-25 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Activity Reviews
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Your reviews for individual activities
          </p>
          
          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 border border-sky-100">
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-sky-700">{activityReviews.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border border-teal-100">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-teal-700">
                {activityReviews.length > 0 
                  ? (activityReviews.reduce((acc, curr) => acc + curr.rating, 0) / activityReviews.length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activityReviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-sky-200 p-8 md:p-12 text-center">
            <div className="text-sky-400 text-6xl md:text-7xl mb-6">🎯</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">No Activity Reviews Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven&apos;t reviewed any activities yet. Your reviews help others make better decisions.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
              Explore Activities
            </button>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {activityReviews.map((review) => (
              <div
                key={review.reviewId}
                className="bg-white rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Review Header - Responsive Layout */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-sky-600 font-bold text-lg">A</span>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                            {review.reviewName}
                          </h3>
                          <p className="text-teal-600 font-semibold text-sm sm:text-base">{review.activityName}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="bg-teal-100 text-teal-800 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                        {review.numberOfParticipate} participants
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {new Date(review.reviewCreatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{review.review}</p>
                  </div>

                  {/* Reactions Section */}
                  {review.reactions && review.reactions.length > 0 && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl border border-sky-100">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Reactions:</span>
                        <div className="flex flex-wrap gap-2">
                          {review.reactions.map((reaction) => (
                            <div
                              key={reaction.reviewReactionId}
                              className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-sky-200 hover:border-sky-300 transition-colors duration-200"
                              title={`${reaction.userName} reacted with ${reaction.reactionType}`}
                            >
                              <ReactionIcon type={reaction.reactionType} />
                              <span className="text-xs sm:text-sm text-gray-700 font-medium">{reaction.userName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Images Grid - Responsive */}
                  {review.images && review.images.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-700">Photos</h4>
                        <span className="text-xs text-gray-500">{review.images.length} photos</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                        {review.images.slice(0, 5).map((image) => (
                          <div
                            key={image.imageId}
                            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
                          >
                            <Image
                              src={image.imageUrl}
                              alt={image.imageName || 'Review image'}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                          </div>
                        ))}
                        {review.images.length > 5 && (
                          <div className="relative aspect-square bg-gradient-to-br from-sky-100 to-teal-100 rounded-lg overflow-hidden flex items-center justify-center">
                            <span className="text-sky-600 font-bold text-lg">+{review.images.length - 5}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  {review.comments && review.comments.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-700">
                          Comments ({review.comments.length})
                        </h4>
                        {review.comments.length > 3 && (
                          <button className="text-sky-600 text-sm font-semibold hover:text-sky-700 transition-colors duration-200">
                            View all comments
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {review.comments.slice(0, 3).map((comment) => (
                          <div key={comment.commentId} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-sky-200 to-teal-200 rounded-full"></div>
                                <span className="font-semibold text-teal-600 text-sm">
                                  {comment.userName}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.commentCreatedAt!).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.comment || comment.commentText}</p>
                            {comment.commentReactions && comment.commentReactions.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {comment.commentReactions.map((reaction) => (
                                  <div
                                    key={reaction.commentReactionId}
                                    className="text-xs text-gray-500 hover:text-sky-500 transition-colors duration-200"
                                    title={`${reaction.userName} reacted with ${reaction.commentReactionType}`}
                                  >
                                    <ReactionIcon type={reaction.commentReactionType} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.reviewStatus === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {review.reviewStatus}
                      </span>
                      <span className="text-xs text-gray-500">
                        {/* Review #{review.reviewId.slice(0, 8)} */}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200">
                        Share Review
                      </button>
                      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200">
                        Edit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (if needed) */}
        {activityReviews.length > 5 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}