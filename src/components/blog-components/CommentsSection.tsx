// app/blog/[id]/components/CommentsSection.tsx
import React from "react";
import { User, Send, TrendingUp, MessageCircle } from "lucide-react";
import CommentItem from "./CommentItem";
import { BlogComment } from "@/types/blog-types";

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
  formatDate: (dateString: string) => string;
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
  formatDate,
}) => {
  const handleReplyTextChange = (commentId: number, text: string) => {
    setReplyTexts({ ...replyTexts, [commentId]: text });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-purple-900">
          Comments ({totalComments})
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          Most recent first
        </div>
      </div>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this blog..."
              className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none h-32"
              rows={4}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-500">
                Share your experience or ask questions
              </div>
              <button
                onClick={onSubmitComment}
                disabled={!commentText.trim() || isSubmittingComment}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg hover:from-purple-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
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

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              replyTexts={replyTexts}
              showReplyInput={showReplyInput}
              onReplyTextChange={handleReplyTextChange}
              onSubmitReply={onSubmitReply}
              setShowReplyInput={setShowReplyInput}
              formatDate={formatDate}
            />
          ))
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