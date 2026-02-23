// app/blog/[id]/components/BlogActions.tsx
import React, { useState } from "react";
import { Heart, Share2, Bookmark, ThumbsUp, Smile, Frown, Laugh, Zap, Heart as HeartIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { REACTION_TYPES, ReactionType } from "@/types/blog-types";

interface BlogActionsProps {
  userReaction: string | null;
  isBookmarked: boolean;
  totalReactions: number;
  onReact: (reactType: string) => void;
  onShare: () => void;
  onBookmark: () => void;
  onNeedLogin?: () => void;
}

const BlogActions: React.FC<BlogActionsProps> = ({
  userReaction,
  isBookmarked,
  totalReactions,
  onReact,
  onShare,
  onBookmark,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const [showReactions, setShowReactions] = useState(false);
  const [isReacting, setIsReacting] = useState(false);

  const handleReactionClick = async (reactType: ReactionType) => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    
    if (isReacting) return;
    
    try {
      setIsReacting(true);
      await onReact(reactType);
    } finally {
      setIsReacting(false);
      setShowReactions(false);
    }
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return <ThumbsUp className="w-5 h-5" />;
      case REACTION_TYPES.LOVE: return <HeartIcon className="w-5 h-5" />;
      case REACTION_TYPES.HAHA: return <Laugh className="w-5 h-5" />;
      case REACTION_TYPES.WOW: return <Zap className="w-5 h-5" />;
      case REACTION_TYPES.SAD: return <Frown className="w-5 h-5" />;
      case REACTION_TYPES.ANGRY: return <Frown className="w-5 h-5" style={{ color: '#e53e3e' }} />;
      default: return <ThumbsUp className="w-5 h-5" />;
    }
  };

  const getReactionLabel = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return "Like";
      case REACTION_TYPES.LOVE: return "Love";
      case REACTION_TYPES.HAHA: return "Haha";
      case REACTION_TYPES.WOW: return "Wow";
      case REACTION_TYPES.SAD: return "Sad";
      case REACTION_TYPES.ANGRY: return "Angry";
      default: return "Like";
    }
  };

  const getReactionColor = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return "text-blue-600";
      case REACTION_TYPES.LOVE: return "text-red-500";
      case REACTION_TYPES.HAHA: return "text-yellow-500";
      case REACTION_TYPES.WOW: return "text-teal-500";
      case REACTION_TYPES.SAD: return "text-blue-400";
      case REACTION_TYPES.ANGRY: return "text-red-600";
      default: return "text-teal-600";
    }
  };

  const handleBookmarkClick = () => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    onBookmark();
  };

  return (
    <div className="mt-8 pt-8 border-t border-teal-100 flex flex-wrap gap-4 relative">
      {/* Reaction Button */}
      <div className="relative">
        <button
          onClick={() => setShowReactions(!showReactions)}
          disabled={isReacting}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            userReaction
              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg"
              : "bg-teal-50 text-teal-700 hover:bg-teal-100"
          }`}
        >
          {isReacting ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : userReaction ? (
            <>
              <span className={getReactionColor(userReaction)}>
                {getReactionIcon(userReaction)}
              </span>
              {getReactionLabel(userReaction)} ({totalReactions})
            </>
          ) : (
            <>
              <ThumbsUp className="w-5 h-5" />
              React ({totalReactions})
            </>
          )}
        </button>
        
        {/* Reaction Picker */}
        {showReactions && (
          <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-2xl p-2 border border-gray-200 z-50 flex gap-1">
            {Object.values(REACTION_TYPES).map((type) => (
              <button
                key={type}
                onClick={() => handleReactionClick(type)}
                disabled={isReacting}
                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 ${
                  userReaction === type ? 'bg-gray-100' : ''
                }`}
                title={getReactionLabel(type)}
              >
                <div className={`w-8 h-8 flex items-center justify-center ${getReactionColor(type)}`}>
                  {getReactionIcon(type)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-teal-300 text-teal-700 rounded-xl font-medium hover:bg-teal-50 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
      <button
        onClick={handleBookmarkClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
          isBookmarked
            ? "bg-blue-50 text-blue-700 border border-blue-300"
            : "bg-white border border-teal-300 text-teal-700 hover:bg-teal-50"
        }`}
        title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        <Bookmark
          className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
        />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
};

export default BlogActions;