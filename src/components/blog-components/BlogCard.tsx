// components/blog-components/BlogCard.tsx
"use client";
import React from 'react';
import { Calendar, User, MessageCircle, Heart, Clock, ArrowRight } from 'lucide-react';
import { BlogCommentReply, BlogDetailsData } from '@/types/blog-types';

interface BlogCardProps {
  blog: BlogDetailsData;
  onClick?: (blogId: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Calculate read time
  const getReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const wordCount = description?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Get total reactions
  const getTotalReactions = () => {
    // Use likeCount if available, otherwise calculate from blog_reactions
    if (blog.likeCount !== undefined) {
      return blog.likeCount;
    }
    
    if (!blog.blog_reactions || !Array.isArray(blog.blog_reactions)) {
      return 0;
    }
    return blog.blog_reactions.reduce((total, reaction) => total + (reaction.count || 0), 0);
  };

  // Get total comments (including replies)
  const getTotalComments = () => {
    if (!blog.comments || !Array.isArray(blog.comments)) {
      return 0;
    }

    let total = blog.comments.length;
    
    // Count replies recursively
    const countReplies = (replies: BlogCommentReply[]): number => {
      if (!replies || !Array.isArray(replies)) return 0;
      
      let count = replies.length;
      replies.forEach(reply => {
        if (reply.replies && Array.isArray(reply.replies)) {
          count += countReplies(reply.replies);
        }
      });
      return count;
    };

    blog.comments.forEach(comment => {
      if (comment.replies && Array.isArray(comment.replies)) {
        total += countReplies(comment.replies);
      }
    });

    return total;
  };

  // Determine category from content
  const getCategoryFromContent = () => {
    const title = blog.title?.toLowerCase() || '';
    const description = blog.description?.toLowerCase() || '';
    
    if (title.includes('food') || description.includes('food') || description.includes('cuisine')) {
      return 'Food & Dining';
    } else if (title.includes('adventure') || description.includes('adventure') || description.includes('hiking')) {
      return 'Adventure';
    } else if (title.includes('culture') || description.includes('culture') || description.includes('heritage')) {
      return 'Culture';
    } else if (title.includes('beach') || description.includes('beach') || description.includes('sea')) {
      return 'Beach';
    } else if (title.includes('city') || description.includes('city') || description.includes('urban')) {
      return 'City Life';
    } else if (title.includes('tips') || description.includes('tips') || description.includes('guide')) {
      return 'Travel Tips';
    } else if (title.includes('budget') || description.includes('budget') || description.includes('cheap')) {
      return 'Budget';
    } else if (title.includes('luxury') || description.includes('luxury') || description.includes('premium')) {
      return 'Luxury';
    } else if (title.includes('family') || description.includes('family') || description.includes('kids')) {
      return 'Family';
    }
    return 'Travel';
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(blog.blog_id);
    }
  };

  // Calculations
  const readTime = getReadTime(blog.description);
  const totalReactions = getTotalReactions();
  const totalComments = getTotalComments();
  const category = getCategoryFromContent();
  
  // Get main image or fallback
  const mainImage = blog.images && blog.images.length > 0 
    ? blog.images[0].image_url 
    : '';

  // Handle image URL
  const getImageUrl = () => {
    if (!mainImage) {
      return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    }
    
    if (mainImage.startsWith('http')) {
      return mainImage;
    }
    
    return `http://localhost:8080${mainImage}`;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-teal-100 cursor-pointer hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {category}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-medium rounded-full shadow-sm">
            {formatDate(blog.blog_created_at)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Writer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-teal-800">{blog.writer_name}</div>
            <div className="text-xs text-gray-500">Travel Writer</div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-teal-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
          {blog.subtitle && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {blog.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 line-clamp-3 text-sm leading-relaxed">
          {blog.description}
        </p>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {/* Reactions */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center group-hover/stat:bg-teal-100 transition-colors">
                <Heart className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-teal-700">{totalReactions}</div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover/stat:bg-blue-100 transition-colors">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-700">{totalComments}</div>
                <div className="text-xs text-gray-500">Comments</div>
              </div>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-700">{readTime}</div>
                <div className="text-xs text-gray-500">min read</div>
              </div>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-teal-600 group-hover:text-blue-600 transition-colors">
            <span className="text-sm font-semibold">Read</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center group-hover:from-teal-200 group-hover:to-blue-200 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;