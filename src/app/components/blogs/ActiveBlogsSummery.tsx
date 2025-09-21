"use client"
import { GET_ALL_ACTIVE_BLOGS } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';

interface ImageType {
  id: number;
  imageUrl: string;
  status?: string | null;
  createdAt?: string | null;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

interface LikeType {
  id: number;
  userId?: number | null;
  username?: string | null;
  status?: string | null;
  createdAt?: string | null;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

interface CommentType {
  id: number;
  userId?: number | null;
  username?: string | null;
  comment: string;
  commentDate: string;
  status?: string | null;
  createdAt?: string | null;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

interface BlogType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  writerId: number;
  writerName: string;
  status: string;
  createdAt: string;
  createdBy: number;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
  images: ImageType[];
  likes: LikeType[];
  comments: CommentType[];
}

const ActiveBlogsSummery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBlogs, setActiveBlogs] = useState<BlogType[]>([]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-400 text-lg font-medium mb-2">Our Blogs</p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Articles & Posts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Loading our latest articles for you...
          </p>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Blogs</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-orange-400 text-lg font-medium mb-2">Our Blogs</p>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Articles & Posts</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeBlogs.map((blog) => (
          <article key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            {/* Blog Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={blog.images[0]?.imageUrl || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop'} 
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="font-medium text-blue-600">{blog.writerName}</span>
                <span>{formatDate(blog.createdAt)}</span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {blog.comments.length.toString().padStart(2, '0')} Comment{blog.comments.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Blog Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {truncateText(blog.title, 60)}
              </h3>

              {/* Blog Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {truncateText(blog.description, 100)}
              </p>

              {/* Read More Button */}
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                Read more
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
          View All Articles
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActiveBlogsSummery;