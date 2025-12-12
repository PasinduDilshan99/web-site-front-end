// app/blog/[id]/components/BlogHeader.tsx
import React from "react";
import { Calendar, User, Clock, Eye, Share2, Bookmark } from "lucide-react";
import { formatDate } from "@/utils/blog-utils";

interface BlogHeaderProps {
    blogId:number;
  title: string;
  views:number;
  subtitle: string;
  writerName: string;
  date: string;
  readTime: number;
  totalReactions: number;
  totalComments: number;
  imageCount: number;
  onShare: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
    blogId,
  title,
  views,
  subtitle,
  writerName,
  date,
  readTime,
  totalReactions,
  totalComments,
  imageCount,
  onShare,
  onBookmark,
  isBookmarked,
}) => {

    console.log('====================================');
    console.log(views);
    console.log('====================================');
  return (
    <>
      {/* Category & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
            Travel Blog
          </span>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            {/* <Eye className="w-4 h-4" /> */}
            {views} views
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={onBookmark}
            className={`p-2 rounded-lg ${
              isBookmarked
                ? "bg-amber-50 text-amber-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            } transition-colors`}
          >
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
            />
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
    </>
  );
};

export default BlogHeader;