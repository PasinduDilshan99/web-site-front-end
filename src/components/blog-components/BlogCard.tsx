"use client";
import React from 'react';
import { Blog } from '@/types/blog-types';
import { Calendar, Heart, MessageSquare, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  onClick?: (blogId: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const wordCount = description.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(blog.blog_id);
    }
  };

  const readTime = getReadTime(blog.description);
  const totalReactions = blog.blog_reactions?.reduce((total, reaction) => total + reaction.count, 0) || 0;
  const commentCount = blog.comments?.length || 0;
  const mainImage = blog.images?.[0]?.image_url || '';

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
        {mainImage ? (
          <img
            src={mainImage.startsWith('http') ? mainImage : `http://localhost:8080${mainImage}`}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Writer Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
            {blog.writer_name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span className="text-xs sm:text-sm text-gray-600">{formatDate(blog.blog_created_at)}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {blog.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {blog.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3">
          {blog.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">{totalReactions}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">{commentCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{readTime} min</span>
            </div>
          </div>

          {/* Read More Arrow */}
          <div className="text-purple-600 group-hover:text-purple-700 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
