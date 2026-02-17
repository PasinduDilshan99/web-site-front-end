// app/blog/[id]/components/CommentsSection.tsx
import React, { useState, useEffect } from "react";
import {
  User,
  Send,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CommentItem from "./CommentItem";
import { BlogComment } from "@/types/blog-types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface CommentsSectionProps {
  comments: BlogComment[];
  totalComments: number;
  commentText: string;
  setCommentText: (text: string) => void;
  isSubmittingComment: boolean;
  replyTexts: Record<number, string>;
  setReplyTexts: (texts: Record<number, string>) => void;
  showReplyInput: number | null;
  setShowReplyInput: (id: number | null) => void;
  onSubmitComment: () => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  commentReactions: Record<number, string | null>;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  totalComments,
  commentText,
  setCommentText,
  isSubmittingComment,
  replyTexts,
  setReplyTexts,
  showReplyInput,
  setShowReplyInput,
  onSubmitComment,
  onSubmitReply,
  onCommentReact,
  commentReactions,
  formatDate,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // Reset visible count when comments change
  useEffect(() => {
    setVisibleCount(3);
  }, [comments]);

  const handleReplyTextChange = (commentId: number, text: string) => {
    setReplyTexts({ ...replyTexts, [commentId]: text });
  };

  const handleCommentSubmit = () => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    onSubmitComment();
  };

  const handleShowMore = () => {
    if (!isExpanding) {
      setIsLoadingMore(true);
      setIsExpanding(true);

      // Smooth loading with delay
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 3, comments.length));
        setIsLoadingMore(false);
        setIsExpanding(false);
      }, 300);
    }
  };

  const handleShowLess = () => {
    if (!isExpanding) {
      setIsExpanding(true);
      // Smooth collapse animation
      setTimeout(() => {
        setVisibleCount(3);
        setIsExpanding(false);
      }, 300);
    }
  };

  const visibleComments = comments.slice(0, visibleCount);
  const hasMoreComments = comments.length > visibleCount;
  const hasLessComments = visibleCount > 3;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-teal-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-teal-800">
          Comments ({totalComments})
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Most recent first
        </div>
      </div>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {user?.imageUrl ? (
              <Image
                src={user?.imageUrl}
                alt="Writer"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}{" "}
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this blog..."
              className="text-teal-700 w-full px-4 py-3 border border-teal-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none h-32"
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleCommentSubmit();
                }
              }}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-500">
                Share your experience or ask questions (Ctrl+Enter to submit)
              </div>
              <button
                onClick={handleCommentSubmit}
                disabled={!commentText.trim() || isSubmittingComment}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {isSubmittingComment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List with Lazy Loading */}
      <div className="space-y-4">
        {visibleComments.length > 0 ? (
          <>
            {/* Comments List with smooth transition */}
            <div
              className={`space-y-4 transition-all duration-300 ease-in-out ${isExpanding ? "opacity-80" : "opacity-100"}`}
            >
              {visibleComments.map((comment) => (
                <CommentItem
                  key={comment.comment_id}
                  comment={comment}
                  replyTexts={replyTexts}
                  showReplyInput={showReplyInput}
                  onReplyTextChange={handleReplyTextChange}
                  onSubmitReply={onSubmitReply}
                  onCommentReact={onCommentReact}
                  userReaction={commentReactions[comment.comment_id]}
                  setShowReplyInput={setShowReplyInput}
                  formatDate={formatDate}
                  onNeedLogin={onNeedLogin}
                />
              ))}
            </div>

            {/* Show More/Less Buttons */}
            <div className="flex justify-center mt-6">
              {hasMoreComments && (
                <button
                  onClick={handleShowMore}
                  disabled={isLoadingMore || isExpanding}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      <span>
                        Show More Comments ({comments.length - visibleCount}{" "}
                        more)
                      </span>
                    </>
                  )}
                </button>
              )}

              {hasLessComments && !hasMoreComments && (
                <button
                  onClick={handleShowLess}
                  disabled={isExpanding}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-400 text-white rounded-full hover:from-gray-600 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronUp className="w-5 h-5" />
                  <span>Show Less</span>
                </button>
              )}
            </div>

            {/* Comments Count Indicator */}
            <div className="text-center text-gray-500 text-sm mt-4 pt-4 border-t border-gray-100">
              Showing {visibleComments.length} of {comments.length} comments
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
