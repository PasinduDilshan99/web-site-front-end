// app/blog/[id]/components/BlogActions.tsx
import React from "react";
import { Heart, Share2, Bookmark } from "lucide-react";

interface BlogActionsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  totalReactions: number;
  onLike: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

const BlogActions: React.FC<BlogActionsProps> = ({
  isLiked,
  isBookmarked,
  totalReactions,
  onLike,
  onShare,
  onBookmark,
}) => {
  return (
    <div className="mt-8 pt-8 border-t border-purple-100 flex flex-wrap gap-4">
      <button
        onClick={onLike}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
          isLiked
            ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
            : "bg-purple-50 text-purple-700 hover:bg-purple-100"
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        {isLiked ? "Liked" : "Like"} ({totalReactions})
      </button>
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-purple-300 text-purple-700 rounded-xl font-medium hover:bg-purple-50 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
      <button
        onClick={onBookmark}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
          isBookmarked
            ? "bg-amber-50 text-amber-700 border border-amber-300"
            : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-50"
        }`}
        disabled={true} // Disabled because BlogHeader handles it
        title="Bookmark handled in header"
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