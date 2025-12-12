// app/blog/[id]/components/BlogHeader.tsx
import React, { useState, useEffect } from "react";
import { Calendar, User, Clock, Eye, Share2, Bookmark } from "lucide-react";
import { formatDate } from "@/utils/blog-utils";
import { useAuth } from "@/context/AuthContext";
import BlogLoginDialog from "./BlogLoginDialog";
import { log } from "console";

interface BlogHeaderProps {
  blogId: number;
  title: string;
  views: number;
  isBookmark: boolean; // Initial bookmark status from API
  subtitle: string;
  writerName: string;
  date: string;
  readTime: number;
  totalReactions: number;
  totalComments: number;
  imageCount: number;
  onShare: () => void;
  onBookmarkUpdate?: (isBookmarked: boolean) => void; // Callback to update parent
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  blogId,
  title,
  views,
  isBookmark,
  subtitle,
  writerName,
  date,
  readTime,
  totalReactions,
  totalComments,
  imageCount,
  onShare,
  onBookmarkUpdate,
}) => {
    console.log('====================================');
    console.log(isBookmark);
    console.log('====================================');
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmark);

  // Update local state when isBookmark prop changes
  useEffect(() => {
    setLocalIsBookmarked(isBookmark);
  }, [isBookmark]);

  // Function to handle bookmark API call
  const handleBookmarkToggle = async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    try {
      setIsLoading(true);
      
      // Optimistically update UI
      const optimisticUpdate = !localIsBookmarked;
      setLocalIsBookmarked(optimisticUpdate);
      
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/bookmark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
          },
          body: JSON.stringify({ blogId }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok && result.code === 200) {
        // Check the message to determine if it was added or removed
        const message = result.data?.message?.toLowerCase() || "";
        
        let finalState = localIsBookmarked; // Default to current state
        
        if (message.includes("insert")) {
          // Successfully bookmarked
          finalState = true;
          console.log("Bookmark added successfully");
        } else if (message.includes("remove")) {
          // Successfully removed bookmark
          finalState = false;
          console.log("Bookmark removed successfully");
        }
        
        // Update state with server response
        setLocalIsBookmarked(finalState);
        
        // Notify parent about bookmark update
        if (onBookmarkUpdate) {
          onBookmarkUpdate(finalState);
        }
      } else {
        // Revert optimistic update if API fails
        setLocalIsBookmarked(!optimisticUpdate);
        console.error("Bookmark error:", result.message);
        // Show error message
        // toast.error("Failed to update bookmark");
      }
    } catch (error) {
      // Revert optimistic update on network error
      setLocalIsBookmarked(!localIsBookmarked);
      console.error("Error updating bookmark:", error);
      // toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Get bookmark tooltip text
  const getBookmarkTooltip = () => {
    if (!user) return "Login to bookmark this blog";
    if (localIsBookmarked) return "Remove from bookmarks";
    return "Add to bookmarks";
  };

  return (
    <>
      {/* Category & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
            Travel Blog
          </span>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views} views
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            title="Share this blog"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={handleBookmarkToggle}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-all flex items-center gap-1 group relative ${
              localIsBookmarked
                ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={getBookmarkTooltip()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Bookmark
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    localIsBookmarked ? "fill-current" : ""
                  }`}
                />
                {/* Tooltip for desktop */}
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {getBookmarkTooltip()}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <h2 className="text-xl md:text-2xl text-amber-600 mb-6 font-medium">
          {subtitle}
        </h2>
      )}

      {/* Author & Date */}
      <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-purple-900">{writerName}</h4>
            <p className="text-sm text-gray-600">Travel Writer</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-700">
            {totalReactions}
          </div>
          <div className="text-sm text-gray-600">Reactions</div>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-amber-700">{totalComments}</div>
          <div className="text-sm text-gray-600">Comments</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-700">{readTime}</div>
          <div className="text-sm text-gray-600">Min Read</div>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-gray-700">{imageCount}</div>
          <div className="text-sm text-gray-600">Images</div>
        </div>
      </div>

      {/* Login Dialog */}
      <BlogLoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        message="You need to login to bookmark this blog and access other features."
      />
    </>
  );
};

export default BlogHeader;