// app/blog/[id]/components/CommentItem.tsx
import React, { useState } from "react";
import { User, Send, ThumbsUp, Heart, Laugh, Zap, Frown, ChevronDown, ChevronUp } from "lucide-react";
import { BlogComment, BlogCommentReply, REACTION_TYPES, ReactionType } from "@/types/blog-types";
import { useAuth } from "@/context/AuthContext";

interface CommentItemProps {
  comment: BlogComment | BlogCommentReply;
  depth?: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  userReaction?: string | null;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  replyTexts,
  showReplyInput,
  onReplyTextChange,
  onSubmitReply,
  onCommentReact,
  userReaction,
  setShowReplyInput,
  formatDate,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const isReply = depth > 0;
  const [localReplyText, setLocalReplyText] = useState(
    replyTexts[comment.comment_id] || ""
  );
  const [showReactions, setShowReactions] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

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

  const handleCommentReaction = async (reactType: ReactionType) => {
    if (!user && onNeedLogin) {
      onNeedLogin?.();
      return;
    }
    
    if (isReacting) return;
    
    try {
      setIsReacting(true);
      await onCommentReact(comment.comment_id, reactType);
    } finally {
      setIsReacting(false);
      setShowReactions(false);
    }
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return <ThumbsUp className="w-4 h-4" />;
      case REACTION_TYPES.LOVE: return <Heart className="w-4 h-4" />;
      case REACTION_TYPES.HAHA: return <Laugh className="w-4 h-4" />;
      case REACTION_TYPES.WOW: return <Zap className="w-4 h-4" />;
      case REACTION_TYPES.SAD: return <Frown className="w-4 h-4" />;
      case REACTION_TYPES.ANGRY: return <Frown className="w-4 h-4" style={{ color: '#e53e3e' }} />;
      default: return <ThumbsUp className="w-4 h-4" />;
    }
  };

  const getReactionColor = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return "text-blue-600";
      case REACTION_TYPES.LOVE: return "text-red-500";
      case REACTION_TYPES.HAHA: return "text-yellow-500";
      case REACTION_TYPES.WOW: return "text-purple-500";
      case REACTION_TYPES.SAD: return "text-blue-400";
      case REACTION_TYPES.ANGRY: return "text-red-600";
      default: return "text-purple-600";
    }
  };

  const commentData = comment as BlogComment;
  const hasReplies = commentData.replies && commentData.replies.length > 0;
  const reactionCount = comment.reactions ? comment.reactions.length : 0;

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
              <div className="flex items-center gap-2">
                {!isReply && hasReplies && (
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-sm text-gray-500 hover:text-purple-700"
                    title={showReplies ? "Hide replies" : "Show replies"}
                  >
                    {showReplies ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
                
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
                
                {/* Reaction Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowReactions(!showReactions)}
                    disabled={isReacting}
                    className={`text-sm flex items-center gap-1 px-2 py-1 rounded disabled:opacity-50 ${
                      userReaction
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-600 hover:text-purple-700 hover:bg-gray-50"
                    }`}
                  >
                    {isReacting ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : userReaction ? (
                      <span className={getReactionColor(userReaction)}>
                        {getReactionIcon(userReaction)}
                      </span>
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                    {reactionCount > 0 && (
                      <span className="text-xs">{reactionCount}</span>
                    )}
                  </button>
                  
                  {/* Reaction Picker */}
                  {showReactions && (
                    <div className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-lg p-2 border border-gray-200 z-50 flex gap-1">
                      {Object.values(REACTION_TYPES).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleCommentReaction(type)}
                          disabled={isReacting}
                          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 ${
                            userReaction === type ? 'bg-gray-100' : ''
                          }`}
                          title={type}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center ${getReactionColor(type)}`}>
                            {getReactionIcon(type)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
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
        {showReplies && commentData.replies && commentData.replies.length > 0 && (
          <div className="mt-4">
            {commentData.replies.map((reply) => (
              <CommentItem
                key={reply.comment_id}
                comment={reply}
                depth={depth + 1}
                replyTexts={replyTexts}
                showReplyInput={showReplyInput}
                onReplyTextChange={onReplyTextChange}
                onSubmitReply={onSubmitReply}
                onCommentReact={onCommentReact}
                userReaction={userReaction}
                setShowReplyInput={setShowReplyInput}
                formatDate={formatDate}
                onNeedLogin={onNeedLogin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;