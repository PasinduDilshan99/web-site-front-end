// app/blog/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { BlogDetailsData, BlogTag } from "@/types/blog-types";
import {
  fetchBlogDetails,
  fetchRelatedBlogs,
  fetchTags,
  calculateTotalComments,
  calculateTotalReactions,
  getReadTime,
  formatDate,
} from "@/utils/blog-utils";
import BlogHeader from "@/components/blog-components/BlogHeader";
import BlogImages from "@/components/blog-components/BlogImages";
import BlogContent from "@/components/blog-components/BlogContent";
import BlogTags from "@/components/blog-components/BlogTags";
import BlogActions from "@/components/blog-components/BlogActions";
import CommentsSection from "@/components/blog-components/CommentsSection";
import Sidebar from "@/components/blog-components/Sidebar";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const router = useRouter();
  const id = blogId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogData, setBlogData] = useState<BlogDetailsData | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogDetailsData[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!id || isNaN(parseInt(id as string))) {
        throw new Error("Invalid blog ID");
      }

      const blogDetails = await fetchBlogDetails(parseInt(id as string));
      setBlogData(blogDetails);
      setTotalComments(calculateTotalComments(blogDetails.comments));

      // Fetch related blogs based on writer or category
      const related = await fetchRelatedBlogs(
        blogDetails.writer_id,
        parseInt(id as string)
      );
      setRelatedBlogs(related);

      // Fetch tags
      const tagsData = await fetchTags();
      setTags(tagsData);
    } catch (err) {
      console.error("Error loading blog data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while loading the blog"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle bookmark update from BlogHeader
  const handleBookmarkUpdate = (isBookmarked: boolean) => {
    // Update local state if needed
    if (blogData) {
      setBlogData({
        ...blogData,
        isBookmark: isBookmarked,
      });
    }
    // You can also trigger a refetch if needed
    // loadBlogData();
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
        const newComment = {
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
      const newReply = {
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
        prev === 0 ? blogData.images.length - 1 : prev - 1
      );
    }
  };

  // Handle tag click - navigate to blog search with tag
  const handleTagClick = (tagName: string) => {
    router.push(`/blogs?search=${encodeURIComponent(tagName)}`);
  };

  useEffect(() => {
    if (id) {
      loadBlogData();
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
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-purple-200">
                <BlogHeader
                  blogId={blogData.blog_id}
                  title={blogData.title}
                  views={blogData.views}
                  isBookmark={blogData.isBookmark}
                  subtitle={blogData.subtitle}
                  writerName={blogData.writer_name}
                  date={blogData.blog_created_at}
                  readTime={readTime}
                  totalReactions={totalReactions}
                  totalComments={totalComments}
                  imageCount={blogData.images?.length || 0}
                  onShare={handleShare}
                  onBookmarkUpdate={handleBookmarkUpdate}
                />

                <BlogImages
                  images={blogData.images || []}
                  currentIndex={currentImageIndex}
                  onNext={nextImage}
                  onPrev={prevImage}
                  onSelectImage={setCurrentImageIndex}
                  title={blogData.title}
                />

                <BlogContent description={blogData.description} />

                <BlogTags
                  tags={tags}
                  loadingTags={loadingTags}
                  onTagClick={handleTagClick}
                />

                <BlogActions
                  isLiked={isLiked}
                  isBookmarked={blogData.isBookmark}
                  totalReactions={totalReactions}
                  onLike={handleLike}
                  onShare={handleShare}
                  onBookmark={() => {}}
                />
              </div>

              <CommentsSection
                comments={blogData.comments || []}
                totalComments={totalComments}
                commentText={commentText}
                setCommentText={setCommentText}
                isSubmittingComment={isSubmittingComment}
                replyTexts={replyTexts}
                setReplyTexts={setReplyTexts}
                showReplyInput={showReplyInput}
                setShowReplyInput={setShowReplyInput}
                onSubmitComment={handleSubmitComment}
                onSubmitReply={handleSubmitReply}
                formatDate={formatDate}
              />
            </div>

            {/* Sidebar */}
            <Sidebar
              writerName={blogData.writer_name}
              blogCount={blogData.comments?.length || 0}
              relatedBlogs={relatedBlogs}
              tags={tags}
              loadingTags={loadingTags}
              onTagClick={handleTagClick}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailsPage;