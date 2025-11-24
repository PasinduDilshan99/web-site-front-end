// app/profile/activity-reviews/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { ActivityReview } from '@/types/user-profile';
import { useState, useEffect } from 'react';

export default function ActivityReviewsPage() {
  const [activityReviews, setActivityReviews] = useState<ActivityReview[]>([]);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

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

  const ReactionIcon = ({ type }: { type: string }) => {
    const icons: { [key: string]: string } = {
      LIKE: '👍',
      LOVE: '❤️',
      WOW: '😮',
      LAUGH: '😂',
    };
    return <span>{icons[type] || '👍'}</span>;
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg"></div>
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
            Activity Reviews
          </h1>
          <p className="text-gray-600 mt-2">Your reviews for individual activities</p>
        </div>

        {activityReviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Activity Reviews Yet</h3>
            <p className="text-gray-600">You havent reviewed any activities yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activityReviews.map((review) => (
              <div
                key={review.reviewId}
                className="bg-white rounded-2xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {review.reviewName}
                      </h3>
                      <p className="text-purple-600 font-semibold mb-2">{review.activityName}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {review.numberOfParticipate} participants
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{review.review}</p>

                  {/* Reactions */}
                  {review.reactions && review.reactions.length > 0 && (
                    <div className="flex items-center space-x-4 mb-4 p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-700">Reactions:</span>
                        <div className="flex space-x-1">
                          {review.reactions.map((reaction) => (
                            <div
                              key={reaction.reviewReactionId}
                              className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full border border-amber-200"
                              title={`${reaction.userName} reacted with ${reaction.reactionType}`}
                            >
                              <ReactionIcon type={reaction.reactionType} />
                              <span className="text-xs text-gray-600">{reaction.userName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Photos</h4>
                      <div className="flex space-x-2 overflow-x-auto">
                        {review.images.map((image) => (
                          <div
                            key={image.imageId}
                            className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden"
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

                  {/* Comments */}
                  {review.comments && review.comments.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Comments ({review.comments.length})
                      </h4>
                      <div className="space-y-3">
                        {review.comments.slice(0, 3).map((comment) => (
                          <div key={comment.commentId} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold text-purple-600 text-sm">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.commentCreatedAt!).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.comment || comment.commentText}</p>
                            {comment.commentReactions && comment.commentReactions.length > 0 && (
                              <div className="flex space-x-1 mt-2">
                                {comment.commentReactions.map((reaction) => (
                                  <div
                                    key={reaction.commentReactionId}
                                    className="text-xs text-gray-500"
                                    title={`${reaction.userName} reacted with ${reaction.commentReactionType}`}
                                  >
                                    <ReactionIcon type={reaction.commentReactionType} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {review.comments.length > 3 && (
                          <button className="text-amber-600 text-sm font-semibold hover:text-amber-700">
                            View {review.comments.length - 3} more comments
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>Reviewed on {new Date(review.reviewCreatedAt).toLocaleDateString()}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                      {review.reviewStatus}
                    </span>
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