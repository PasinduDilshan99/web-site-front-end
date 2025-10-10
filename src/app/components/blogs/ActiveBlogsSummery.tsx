"use client";
import { GET_ALL_ACTIVE_BLOGS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface ImageType {
  id: number;
  image_url: string;
}

interface ReactionType {
  username: string;
  user_id: number;
  reaction_type_id: number;
}

interface ReplyType {
  username: string;
  comment: string;
  reactions: ReactionType[] | null;
  replies: ReplyType[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

interface CommentType {
  username: string;
  comment: string;
  reactions: ReactionType[] | null;
  replies: ReplyType[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

interface BlogReactionType {
  count: number;
  reaction_type_id: number;
  reaction_type_name: string;
}

interface BlogType {
  blog_id: number;
  title: string;
  subtitle: string;
  description: string;
  writer_id: number;
  writer_name: string;
  blog_status: string;
  blog_created_at: string;
  images: ImageType[];
  likeCount: number;
  comments: CommentType[];
  blog_reactions: BlogReactionType[];
}

const ActiveBlogsSummery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBlogs, setActiveBlogs] = useState<BlogType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchActiveBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_BLOGS);
        const data = await response.json();

        if (response.ok) {
          const items: BlogType[] = data.data || [];
          setActiveBlogs(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active blogs");
        }
      } catch (err) {
        console.error("Error fetching active blogs:", err);
        setError("Something went wrong while fetching active blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBlogs();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (activeBlogs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex >= activeBlogs.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000); // Increased to 5 seconds for better UX

    return () => clearInterval(interval);
  }, [activeBlogs.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to count total comments including replies
  const getTotalCommentsCount = (
    comments: CommentType[] | null | undefined
  ): number => {
    if (!comments || !Array.isArray(comments)) return 0;

    let count = 0;

    const countReplies = (replies: ReplyType[] | null) => {
      if (!replies || !Array.isArray(replies)) return;
      replies.forEach((reply) => {
        count++;
        countReplies(reply.replies);
      });
    };

    comments.forEach((comment) => {
      count++;
      countReplies(comment.replies);
    });

    return count;
  };

  // Helper function to get total reactions count
  const getTotalReactionsCount = (
    blogReactions: BlogReactionType[] | null | undefined
  ): number => {
    if (!blogReactions || !Array.isArray(blogReactions)) return 0;
    return blogReactions.reduce(
      (total, reaction) => total + (reaction.count || 0),
      0
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex >= activeBlogs.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      currentIndex <= 0 ? activeBlogs.length - 1 : currentIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible blogs based on screen size with better breakpoints
  const getVisibleBlogs = () => {
    if (typeof window === "undefined") return activeBlogs.slice(0, 1);

    const width = window.innerWidth;
    let itemsToShow = 1;

    if (width >= 1536) itemsToShow = 5; // 2xl screens
    else if (width >= 1280) itemsToShow = 4; // xl screens
    else if (width >= 1024) itemsToShow = 3; // lg screens
    else if (width >= 768) itemsToShow = 2; // md screens
    else itemsToShow = 1; // sm and xs screens

    // Return the current blog and the next ones to fill the view
    const visibleBlogs = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % activeBlogs.length;
      visibleBlogs.push(activeBlogs[index]);
    }

    return visibleBlogs;
  };

  // Get responsive image height
  const getImageHeight = () => {
    if (typeof window === "undefined") return "12rem";

    const width = window.innerWidth;
    if (width >= 1024) return "14rem"; // lg screens and above
    if (width >= 768) return "13rem"; // md screens
    return "12rem"; // mobile screens
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-orange-400 text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3">
            Our Blogs
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
            Recent Articles & Posts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-4">
            Loading our latest articles for you...
          </p>
        </div>

        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div
                className="bg-gray-200"
                style={{ height: getImageHeight() }}
              ></div>
              <div className="p-4 sm:p-6">
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded mb-2 sm:mb-3"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-3 sm:mb-4"></div>
                <div className="h-8 sm:h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
          <h3 className="text-red-800 font-semibold text-sm sm:text-base mb-2">
            Error Loading Blogs
          </h3>
          <p className="text-red-600 text-xs sm:text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const visibleBlogs = getVisibleBlogs();

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-amber-50 to-purple-50">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-4 mb-2">
          Our Blogs
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6 leading-tight px-4">
          Recent Articles & Posts
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-4 mb-4 sm:mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Arrows - Show on all screens except very small mobile */}
        {activeBlogs.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 hidden sm:flex items-center justify-center"
              aria-label="Previous blog"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 hidden sm:flex items-center justify-center"
              aria-label="Next blog"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Blog Cards Grid */}
        <div className="overflow-hidden px-2 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {visibleBlogs.map((blog, index) => {
              const totalComments = getTotalCommentsCount(blog.comments);
              const totalReactions = getTotalReactionsCount(
                blog.blog_reactions
              );
              const blogImages = blog.images || [];
              const blogReactions = blog.blog_reactions || [];

              return (
                <article
                  key={`${blog.blog_id}-${currentIndex + index}`}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Blog Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: getImageHeight() }}
                  >
                    <img
                      src={
                        blogImages[0]?.image_url ||
                        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 flex-wrap gap-1">
                      <span className="font-medium text-purple-600 text-xs sm:text-sm">
                        {blog.writer_name}
                      </span>
                      <span className="text-xs sm:text-sm">
                        {formatDate(blog.blog_created_at)}
                      </span>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="flex items-center text-xs sm:text-sm">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {totalReactions}
                        </span>
                        <span className="flex items-center text-xs sm:text-sm">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          {totalComments.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight group-hover:text-amber-600 transition-colors flex-1">
                      {truncateText(
                        blog.title,
                        window.innerWidth >= 1024
                          ? 70
                          : window.innerWidth >= 768
                          ? 60
                          : 50
                      )}
                    </h3>

                    {/* Blog Subtitle */}
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-2">
                      {truncateText(
                        blog.subtitle,
                        window.innerWidth >= 1024
                          ? 90
                          : window.innerWidth >= 768
                          ? 70
                          : 60
                      )}
                    </p>

                    {/* Blog Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
                      {truncateText(
                        blog.description,
                        window.innerWidth >= 1024
                          ? 120
                          : window.innerWidth >= 768
                          ? 100
                          : 80
                      )}
                    </p>

                    {/* Reactions Summary */}
                    {blogReactions.length > 0 && (
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-3 sm:mb-4 flex-wrap">
                        {blogReactions
                          .slice(0, window.innerWidth >= 768 ? 3 : 2)
                          .map((reaction, reactionIndex) => (
                            <span
                              key={reactionIndex}
                              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 mb-1"
                            >
                              {reaction.count} {reaction.reaction_type_name}
                            </span>
                          ))}
                        {blogReactions.length >
                          (window.innerWidth >= 768 ? 3 : 2) && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            +
                            {blogReactions.length -
                              (window.innerWidth >= 768 ? 3 : 2)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More Button */}
                    <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm transition-colors duration-200 mt-auto">
                      Read more
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators */}
        {activeBlogs.length > 1 && (
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
            {activeBlogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-purple-600"
                    : "bg-gray-300 hover:bg-amber-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation Arrows */}
      {activeBlogs.length > 1 && (
        <div className="flex justify-center space-x-4 mt-6 sm:hidden">
          <button
            onClick={prevSlide}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            aria-label="Previous blog"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            aria-label="Next blog"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-8 sm:mt-12 lg:mt-16">
        <button className="px-6 sm:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
          View All Articles
        </button>
      </div>
    </div>
  );
};

export default ActiveBlogsSummery;
