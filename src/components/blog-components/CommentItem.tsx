// app/blog/[id]/components/CommentItem.tsx
import React, { useState } from "react";
import { User, Send, ThumbsUp } from "lucide-react";
import { BlogCommentReply,BlogComment } from "@/types/blog-types";
import ReplyItem from "./ReplyItem";

interface CommentItemProps {
  comment: BlogComment | BlogCommentReply;
  depth?: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  replyTexts,
  showReplyInput,
  onReplyTextChange,
  onSubmitReply,
  setShowReplyInput,
  formatDate,
}) => {
  const isReply = depth > 0;
  const [localReplyText, setLocalReplyText] = useState(
    replyTexts[comment.comment_id] || ""
  );

  const handleReplyTextChange = (text: string) => {
    setLocalReplyText(text);
    onReplyTextChange(comment.comment_id, text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmitReply(comment.comment_id);
    }
  };

  const commentData = comment as BlogComment;

  return (
    <div
      key={comment.comment_id}
      className={`${isReply ? "ml-8 md:ml-12" : ""} ${
        depth > 0 ? "border-l-2 border-amber-200 pl-4" : ""
      }`}
    >
      <div className="bg-white rounded-xl p-4 md:p-6 mb-4 shadow-sm border border-purple-100">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="font-semibold text-purple-900">
                  {comment.username}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.comment_date)}
                </p>
              </div>
              {!isReply && (
                <button
                  onClick={() =>
                    setShowReplyInput(
                      showReplyInput === comment.comment_id
                        ? null
                        : comment.comment_id
                    )
                  }
                  className="text-sm text-purple-600 hover:text-amber-600 font-medium flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                  Reply
                </button>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.comment}</p>

            {/* Reactions */}
            {comment.reactions && comment.reactions.length > 0 && (
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <ThumbsUp className="w-4 h-4 text-purple-500" />
                  <span>{comment.reactions.length} likes</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reply Input */}
        {showReplyInput === comment.comment_id && (
          <div className="mt-4 pl-12">
            <div className="flex gap-2">
              <input
                type="text"
                value={localReplyText}
                onChange={(e) => handleReplyTextChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={() => onSubmitReply(comment.comment_id)}
                disabled={!localReplyText.trim()}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg hover:from-purple-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Render Replies */}
        {commentData.replies &&
          commentData.replies.map((reply) => (
            <ReplyItem
              key={reply.comment_id}
              reply={reply}
              depth={depth + 1}
              replyTexts={replyTexts}
              showReplyInput={showReplyInput}
              onReplyTextChange={onReplyTextChange}
              onSubmitReply={onSubmitReply}
              setShowReplyInput={setShowReplyInput}
              formatDate={formatDate}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;