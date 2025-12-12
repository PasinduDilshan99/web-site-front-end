// app/blog/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  User,
  MessageCircle,
  Heart,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
  ThumbsUp,
  Send,
  MapPin,
  Globe,
  Tag,
  TrendingUp,
} from "lucide-react";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { Blog } from "@/types/blog-types";

// Define Blog Details Types
interface BlogImage {
  id: number;
  image_url: string;
}

interface CommentReaction {
  username: string;
  user_id: number;
  reaction_type_id: number;
}

interface CommentReply {
  username: string;
  comment: string;
  reactions: CommentReaction[];
  replies: CommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

interface Comment {
  username: string;
  comment: string;
  reactions: CommentReaction[];
  replies: CommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

interface BlogReaction {
  count: number;
  reaction_type_id: number;
  reaction_type_name: string;
}

interface BlogDetailsData {
  title: string;
  subtitle: string;
  description: string;
  images: BlogImage[];
  likeCount: number;
  comments: Comment[] | null; // Can be null
  blog_id: number;
  writer_id: number;
  writer_name: string;
  blog_status: string;
  blog_created_at: string;
  blog_reactions: BlogReaction[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: BlogDetailsData;
  timestamp: string;
}

// Define Tag Type
interface BlogTag {
  id: number;
  name: string;
  description: string;
  statusId: number;
  statusName: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  terminatedAt: string | null;
  terminatedBy: string | null;
}

interface TagsApiResponse {
  code: number;
  status: string;
  message: string;
  data: BlogTag[];
  timestamp: string;
}

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const router = useRouter();
  const id = blogId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogData, setBlogData] = useState<BlogDetailsData | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);

  // Calculate total comments including replies - FIXED with null handling
  const calculateTotalComments = (comments: Comment[] | null): number => {
    if (!comments || !Array.isArray(comments)) return 0;

    let total = comments.length;

    const countReplies = (replies: CommentReply[] | null): number => {
      if (!replies || !Array.isArray(replies)) return 0;

      let count = replies.length;
      replies.forEach((reply) => {
        if (reply.replies && Array.isArray(reply.replies)) {
          count += countReplies(reply.replies);
        }
      });
      return count;
    };

    comments.forEach((comment) => {
      total += countReplies(comment.replies);
    });

    return total;
  };

  // Calculate total reactions - FIXED with null handling
  const calculateTotalReactions = (reactions: BlogReaction[] | null): number => {
    if (!reactions || !Array.isArray(reactions)) return 0;
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  };

  // Format date with better error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Unknown date";
      
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    } catch (error) {
      return "Unknown date";
    }
  };

  // Calculate read time with null handling
  const getReadTime = (text: string | null | undefined) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Fetch blog details
  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate id
      if (!id || isNaN(parseInt(id as string))) {
        throw new Error("Invalid blog ID");
      }

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/blog-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
          },
          body: JSON.stringify({ id: parseInt(id as string) }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const data = apiResponse.data;
        
        // Normalize null values to empty arrays
        const normalizedData = {
          ...data,
          comments: data.comments || [],
          blog_reactions: data.blog_reactions || [],
          images: data.images || [],
          likeCount: data.likeCount || 0,
          title: data.title || "Untitled Blog",
          description: data.description || "",
          subtitle: data.subtitle || "",
          writer_name: data.writer_name || "Unknown Author",
          blog_created_at: data.blog_created_at || new Date().toISOString(),
        };

        setBlogData(normalizedData);
        setTotalComments(calculateTotalComments(normalizedData.comments));

        // Fetch related blogs based on writer or category
        fetchRelatedBlogs(normalizedData.writer_id);
        
        // Fetch tags
        fetchTags();
      } else {
        throw new Error(apiResponse.message || "Failed to fetch blog details");
      }
    } catch (err) {
      console.error("Error fetching blog details:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred while loading the blog"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch related blogs
  const fetchRelatedBlogs = async (writerId: number) => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/active",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.code === 200 && result.data) {
          // Filter blogs by same writer, excluding current blog
          const related = result.data
            .filter(
              (blog: Blog) =>
                blog.writer_id === writerId && blog.blog_id !== parseInt(id as string)
            )
            .slice(0, 3); // Show max 3 related blogs

          // If not enough same-writer blogs, get random blogs
          if (related.length < 3) {
            const randomBlogs = result.data
              .filter((blog: Blog) => blog.blog_id !== parseInt(id as string))
              .slice(0, 3 - related.length);
            setRelatedBlogs([...related, ...randomBlogs]);
          } else {
            setRelatedBlogs(related);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching related blogs:", err);
      // Don't set error state for related blogs fetch failure
    }
  };

  // Fetch tags
  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/tags",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TagsApiResponse = await response.json();
      if (result.code === 200 && result.data) {
        // Filter only active tags and sort by name
        const activeTags = result.data
          .filter(tag => tag.statusName === "ACTIVE")
          .sort((a, b) => a.name.localeCompare(b.name));
        setTags(activeTags);
      }
    } catch (err) {
      console.error("Error fetching tags:", err);
      // Don't set error state for tags fetch failure
    } finally {
      setLoadingTags(false);
    }
  };

  // Handle comment submission
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      setIsSubmittingComment(true);
      // TODO: Implement comment submission API call
      // For now, simulate successful submission
      setTimeout(() => {
        // Add new comment to state
        const newComment: Comment = {
          username: "Current User", // Replace with actual user
          comment: commentText,
          reactions: [],
          replies: null,
          comment_id: Date.now(), // Temporary ID
          user_id: 1, // Replace with actual user ID
          comment_date: new Date().toISOString(),
        };

        if (blogData) {
          const updatedData = {
            ...blogData,
            comments: [...(blogData.comments || []), newComment],
          };
          setBlogData(updatedData);
          setTotalComments(calculateTotalComments(updatedData.comments));
        }

        setCommentText("");
        setIsSubmittingComment(false);
      }, 1000);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setIsSubmittingComment(false);
    }
  };

  // Handle reply submission
  const handleSubmitReply = async (commentId: number) => {
    const replyText = replyTexts[commentId];
    if (!replyText?.trim()) return;

    try {
      // TODO: Implement reply submission API call
      // For now, simulate successful submission
      const newReply: CommentReply = {
        username: "Current User", // Replace with actual user
        comment: replyText,
        reactions: [],
        replies: null,
        comment_id: Date.now(), // Temporary ID
        user_id: 1, // Replace with actual user ID
        comment_date: new Date().toISOString(),
      };

      if (blogData && blogData.comments) {
        const updatedComments = blogData.comments.map((comment) => {
          if (comment.comment_id === commentId) {
            return {
              ...comment,
              replies: comment.replies ? [...comment.replies, newReply] : [newReply],
            };
          }
          return comment;
        });

        const updatedData = {
          ...blogData,
          comments: updatedComments,
        };
        setBlogData(updatedData);
        setTotalComments(calculateTotalComments(updatedData.comments));
        setReplyTexts({ ...replyTexts, [commentId]: "" });
        setShowReplyInput(null);
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
    }
  };

  // Handle like action
  const handleLike = async () => {
    try {
      // TODO: Implement like API call
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  // Handle bookmark action
  const handleBookmark = async () => {
    try {
      // TODO: Implement bookmark API call
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Error bookmarking blog:", err);
    }
  };

  // Handle share action
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blogData?.title || "Blog Post",
          text: blogData?.subtitle || "Check out this blog post",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Navigate images
  const nextImage = () => {
    if (blogData?.images && blogData.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === blogData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (blogData?.images && blogData.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (blogData.images.length - 1) : prev - 1
      );
    }
  };

  // Handle tag click - navigate to blog search with tag
  const handleTagClick = (tagName: string) => {
    router.push(`/blogs?search=${encodeURIComponent(tagName)}`);
  };

  // Render comment with replies recursively
  const renderComment = (comment: Comment | CommentReply, depth = 0) => {
    const isReply = depth > 0;
    const commentData = comment as Comment;

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
                        showReplyInput === comment.comment_id ? null : comment.comment_id
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
                  value={replyTexts[comment.comment_id] || ""}
                  onChange={(e) =>
                    setReplyTexts({
                      ...replyTexts,
                      [comment.comment_id]: e.target.value,
                    })
                  }
                  placeholder="Write a reply..."
                  className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitReply(comment.comment_id);
                    }
                  }}
                />
                <button
                  onClick={() => handleSubmitReply(comment.comment_id)}
                  disabled={!replyTexts[comment.comment_id]?.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg hover:from-purple-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Render Replies */}
          {commentData.replies &&
            commentData.replies.map((reply) => renderComment(reply, depth + 1))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Loading message="Loading blog post..." variant="spinner" size="lg" />
    );
  }

  if (error || !blogData) {
    return (
      <>
        <LinkBar />
        <NavBar />
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-amber-50 flex items-center justify-center px-4">
          <ErrorState
            title="Blog Not Found"
            message={error || "The blog post you're looking for doesn't exist."}
            icon="alert"
            variant="error"
            size="lg"
            actionLabel="Back to Blogs"
            onAction={() => router.push("/blogs")}
          />
        </div>
        <Footer />
      </>
    );
  }

  const totalReactions = calculateTotalReactions(blogData.blog_reactions);
  const readTime = getReadTime(blogData.description);
  const currentImage = blogData.images?.[currentImageIndex];
  
  // Safe image URL handling
  const getImageUrl = () => {
    if (!currentImage?.image_url) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
    }
    
    if (currentImage.image_url.startsWith("http")) {
      return currentImage.image_url;
    }
    
    return `http://localhost:8080${currentImage.image_url}`;
  };

  const imageUrl = getImageUrl();

  return (
    <>
      <LinkBar />
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-amber-50">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 text-purple-700 hover:text-amber-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Blogs
          </button>
        </div>

        <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          {/* Blog Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Blog Header */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-purple-200">
                {/* Category & Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      Travel Blog
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      1.2k views
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                    <button
                      onClick={handleBookmark}
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
                  {blogData.title}
                </h1>

                {/* Subtitle */}
                {blogData.subtitle && (
                  <h2 className="text-xl md:text-2xl text-amber-600 mb-6 font-medium">
                    {blogData.subtitle}
                  </h2>
                )}

                {/* Author & Date */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900">
                        {blogData.writer_name}
                      </h4>
                      <p className="text-sm text-gray-600">Travel Writer</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <span>{formatDate(blogData.blog_created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-amber-500" />
                      <span>{readTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image with Navigation */}
                {blogData.images && blogData.images.length > 0 ? (
                  <div className="relative mb-8 rounded-2xl overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={imageUrl}
                        alt={`${blogData.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Image Navigation */}
                      {blogData.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                          >
                            <ChevronLeft className="w-6 h-6 text-purple-900" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                          >
                            <ChevronRight className="w-6 h-6 text-purple-900" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    {blogData.images.length > 1 && (
                      <div className="flex gap-2 p-4 bg-white">
                        {blogData.images.map((image, index) => (
                          <button
                            key={image.id}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? "border-amber-500"
                                : "border-transparent"
                            }`}
                          >
                            <img
                              src={
                                image.image_url.startsWith("http")
                                  ? image.image_url
                                  : `http://localhost:8080${image.image_url}`
                              }
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative mb-8 rounded-2xl overflow-hidden">
                    <div className="aspect-video relative bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <User className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-xl">No images available</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {totalReactions}
                    </div>
                    <div className="text-sm text-gray-600">Reactions</div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-amber-700">
                      {totalComments}
                    </div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {readTime}
                    </div>
                    <div className="text-sm text-gray-600">Min Read</div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gray-700">
                      {blogData.images?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Images</div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed text-lg space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: blogData.description.replace(/\n/g, "<br />") || "<p>No content available.</p>",
                    }}
                  />
                </div>

                {/* Tags - Now using API tags */}
                <div className="mt-8 pt-8 border-t border-purple-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      Popular Tags:
                    </span>
                    {loadingTags ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-500">Loading tags...</span>
                      </div>
                    ) : tags.length > 0 ? (
                      tags.slice(0, 8).map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => handleTagClick(tag.name)}
                          className="px-3 py-1 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 rounded-full text-sm hover:from-purple-100 hover:to-amber-100 transition-colors cursor-pointer border border-purple-200"
                        >
                          #{tag.name}
                        </button>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No tags available</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-8 border-t border-purple-100 flex flex-wrap gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      isLiked
                        ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    {isLiked ? "Liked" : "Like"} ({totalReactions})
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-purple-300 text-purple-700 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      isBookmarked
                        ? "bg-amber-50 text-amber-700 border border-amber-300"
                        : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                    />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-purple-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-purple-900">
                    Comments ({totalComments})
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Most recent first
                  </div>
                </div>

                {/* Add Comment */}
                <div className="mb-8">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts on this blog..."
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none h-32"
                        rows={4}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-sm text-gray-500">
                          Share your experience or ask questions
                        </div>
                        <button
                          onClick={handleSubmitComment}
                          disabled={!commentText.trim() || isSubmittingComment}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg hover:from-purple-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                          {isSubmittingComment ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Post Comment
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {blogData.comments && blogData.comments.length > 0 ? (
                    blogData.comments.map((comment) => renderComment(comment))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-purple-200 top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">
                    {blogData.writer_name}
                  </h3>
                  <p className="text-gray-600 mb-4">Travel Writer & Explorer</p>
                  <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                      Follow
                    </button>
                    <button className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm">
                      Message
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span>Based in Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <span>Travels worldwide</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                    <span>{blogData.comments?.length || 0} Blogs written</span>
                  </div>
                </div>
              </div>

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-6">
                    More from {blogData.writer_name}
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((blog) => (
                      <div
                        key={blog.blog_id}
                        onClick={() => router.push(`/blogs/${blog.blog_id}`)}
                        className="group cursor-pointer p-4 rounded-xl border border-purple-100 hover:border-amber-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          {blog.images && blog.images.length > 0 && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  blog.images[0].image_url.startsWith("http")
                                    ? blog.images[0].image_url
                                    : `http://localhost:8080${blog.images[0].image_url}`
                                }
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-purple-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(blog.blog_created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push(`/blogs?writer=${blogData.writer_name}`)}
                    className="w-full mt-6 py-3 text-center text-purple-700 font-medium hover:text-amber-600 transition-colors border border-purple-300 rounded-xl hover:border-amber-300"
                  >
                    View All Blogs →
                  </button>
                </div>
              )}

              {/* Popular Tags - Updated with API tags */}
              <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-6">
                  Popular Tags
                </h3>
                {loadingTags ? (
                  <div className="text-center py-4">
                    <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Loading tags...</p>
                  </div>
                ) : tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.name)}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 rounded-full text-sm hover:from-purple-100 hover:to-amber-100 transition-colors cursor-pointer border border-purple-200"
                      >
                        #{tag.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No tags available
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailsPage;