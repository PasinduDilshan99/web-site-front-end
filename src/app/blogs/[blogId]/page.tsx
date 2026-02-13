// app/blog/[id]/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/components/common-components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { BlogComment, BlogDetailsData, BlogTag } from "@/types/blog-types";
import { useAuth } from "@/context/AuthContext";
import { BlogService } from "@/services/blogService";
import BlogHeader from "@/components/blog-components/BlogHeader";
import BlogImages from "@/components/blog-components/BlogImages";
import CommentsSection from "@/components/blog-components/CommentsSection";
import BlogActions from "@/components/blog-components/BlogActions";
import BlogContent from "@/components/blog-components/BlogContent";
import BlogTags from "@/components/blog-components/BlogTags";
import BlogLoginDialog from "@/components/blog-components/BlogLoginDialog";
import Sidebar from "@/components/blog-components/Sidebar";

const BlogDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.blogId;
  const { user } = useAuth();

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
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [totalComments, setTotalComments] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [commentReactions, setCommentReactions] = useState<
    Record<number, string | null>
  >({});

  // Ref to prevent multiple simultaneous bookmark API calls
  const isBookmarkProcessing = useRef(false);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!id || isNaN(parseInt(id as string))) {
        throw new Error("Invalid blog ID");
      }
      
      const blogId = parseInt(id as string);
      
      // Fetch blog details using BlogService
      const { data: blogDetails, error: detailsError } = await BlogService.fetchBlogDetails(blogId);
      
      if (detailsError || !blogDetails) {
        throw new Error(detailsError || "Failed to fetch blog details");
      }

      // Extract user reaction
      if (blogDetails.userBlogReaction) {
        setUserReaction(blogDetails.userBlogReaction);
      }

      // Extract comment reactions
      const reactions: Record<number, string | null> = {};
      if (blogDetails.comments) {
        const extractReactions = (comments: BlogComment[]) => {
          comments.forEach((comment) => {
            if (comment.userReactionType) {
              reactions[comment.comment_id] = comment.userReactionType;
            }
            if (comment.replies) {
              extractReactions(comment.replies);
            }
          });
        };
        extractReactions(blogDetails.comments);
      }

      setCommentReactions(reactions);
      setBlogData(blogDetails);
      setTotalComments(BlogService.calculateTotalComments(blogDetails.comments));

      // Fetch related blogs
      const { data: related, error: relatedError } = await BlogService.fetchRelatedBlogs(
        blogDetails.writer_id,
        blogId,
      );
      
      if (!relatedError) {
        setRelatedBlogs(related);
      }
      
      // Fetch tags for this blog
      handleGetTags(blogId);
      
    } catch (err) {
      console.error("Error loading blog data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while loading the blog",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle blog reaction
  const handleBlogReact = async (reactType: string) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    if (!blogData) return;

    try {
      const { data: response, error: reactError } = await BlogService.blogReact({
        blogId: blogData.blog_id,
        reactType: reactType,
      });

      if (!reactError && response) {
        const message = response.message?.toLowerCase() || "";

        if (message.includes("add")) {
          setUserReaction(reactType);
          if (blogData) {
            const updatedData = { ...blogData };
            const existingReaction = updatedData.blog_reactions.find(
              (r) => r.reaction_type_name?.toLowerCase() === reactType,
            );

            if (existingReaction) {
              existingReaction.count += 1;
            } else {
              updatedData.blog_reactions.push({
                reaction_type_id: 1,
                reaction_type_name: reactType,
                count: 1,
              });
            }

            if (userReaction && userReaction !== reactType) {
              const prevReaction = updatedData.blog_reactions.find(
                (r) => r.reaction_type_name?.toLowerCase() === userReaction,
              );
              if (prevReaction && prevReaction.count > 0) {
                prevReaction.count -= 1;
              }
            }

            setBlogData(updatedData);
          }
        } else if (message.includes("remove")) {
          setUserReaction(null);
          if (blogData && userReaction) {
            const updatedData = { ...blogData };
            const reaction = updatedData.blog_reactions.find(
              (r) => r.reaction_type_name?.toLowerCase() === userReaction,
            );
            if (reaction && reaction.count > 0) {
              reaction.count -= 1;
            }
            setBlogData(updatedData);
          }
        } else if (message.includes("change")) {
          setUserReaction(reactType);
          if (blogData) {
            const updatedData = { ...blogData };

            if (userReaction) {
              const oldReaction = updatedData.blog_reactions.find(
                (r) => r.reaction_type_name?.toLowerCase() === userReaction,
              );
              if (oldReaction && oldReaction.count > 0) {
                oldReaction.count -= 1;
              }
            }

            const newReaction = updatedData.blog_reactions.find(
              (r) => r.reaction_type_name?.toLowerCase() === reactType,
            );
            if (newReaction) {
              newReaction.count += 1;
            } else {
              updatedData.blog_reactions.push({
                reaction_type_id: 1,
                reaction_type_name: reactType,
                count: 1,
              });
            }

            setBlogData(updatedData);
          }
        }

        // Refresh data after a short delay
        setTimeout(() => {
          loadBlogData();
        }, 500);
      } else {
        console.error("Error reacting to blog:", reactError);
        // Revert optimistic update
        loadBlogData();
      }
    } catch (error) {
      console.error("Error reacting to blog:", error);
      // Revert optimistic update
      loadBlogData();
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    
    if (!blogData || isBookmarkProcessing.current) return;
    
    try {
      isBookmarkProcessing.current = true;
      const originalState = blogData.isBookmark;
      const newBookmarkState = !originalState;
      
      // Optimistic update
      setBlogData({
        ...blogData,
        isBookmark: newBookmarkState,
      });

      // Use the enhanced bookmark method with validation
      const { success, newState, error: bookmarkError } = await BlogService.toggleBookmarkWithValidation(
        blogData.blog_id,
        originalState
      );

      if (!success) {
        console.error("Bookmark API error:", bookmarkError);
        // Revert optimistic update
        setBlogData({
          ...blogData,
          isBookmark: originalState,
        });
      } else if (newState !== newBookmarkState) {
        // Update to server state if different
        setBlogData({
          ...blogData,
          isBookmark: newState,
        });
      }
    } catch (error) {
      console.error("Network error updating bookmark:", error);
      // Revert optimistic update
      setBlogData(prev => prev ? {
        ...prev,
        isBookmark: !prev.isBookmark,
      } : null);
    } finally {
      setTimeout(() => {
        isBookmarkProcessing.current = false;
      }, 500);
    }
  };

  // Handle comment submission
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    if (!blogData) return;

    try {
      setIsSubmittingComment(true);

      const { data: response, error: commentError } = await BlogService.addComment({
        blogId: blogData.blog_id,
        parentId: null,
        comment: commentText,
      });

      if (!commentError) {
        setCommentText("");
        await loadBlogData();
      } else {
        console.error("Error submitting comment:", commentError);
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle reply submission
  const handleSubmitReply = async (parentCommentId: number) => {
    const replyText = replyTexts[parentCommentId];
    if (!replyText?.trim()) return;
    
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    
    if (!blogData) return;
    
    try {
      const { data: response, error: replyError } = await BlogService.addComment({
        blogId: blogData.blog_id,
        parentId: parentCommentId,
        comment: replyText,
      });

      if (!replyError) {
        setReplyTexts({ ...replyTexts, [parentCommentId]: "" });
        setShowReplyInput(null);
        await loadBlogData();
      } else {
        console.error("Error submitting reply:", replyError);
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
    }
  };

  const handleCommentReact = async (commentId: number, reactType: string) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    try {
      const { data: response, error: reactError } = await BlogService.commentReact({
        commentId: commentId,
        reactType: reactType,
      });

      if (!reactError && response) {
        const message = response.message?.toLowerCase() || "";

        // Update local state
        if (message.includes("add")) {
          setCommentReactions({
            ...commentReactions,
            [commentId]: reactType,
          });
        } else if (message.includes("remove")) {
          setCommentReactions({
            ...commentReactions,
            [commentId]: null,
          });
        } else if (message.includes("change")) {
          setCommentReactions({
            ...commentReactions,
            [commentId]: reactType,
          });
        }

        // Reload blog data to get updated reaction counts
        setTimeout(() => {
          loadBlogData();
        }, 500);
      } else {
        console.error("Error reacting to comment:", reactError);
      }
    } catch (error) {
      console.error("Error reacting to comment:", error);
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
        prev === blogData.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (blogData?.images && blogData.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? blogData.images.length - 1 : prev - 1,
      );
    }
  };

  // Handle tag click - navigate to blog search with tag
  const handleTagClick = (tagName: string) => {
    router.push(`/blogs?search=${encodeURIComponent(tagName)}`);
  };

  const handleGetTags = async (blogId: number) => {
    try {
      setLoadingTags(true);

      // Fetch tags for this specific blog
      const { data: blogTags, error: blogTagsError } = await BlogService.fetchBlogTags(blogId);
      
      if (!blogTagsError && blogTags.length > 0) {
        setTags(blogTags);
      } else {
        // If no specific blog tags, fetch all tags as fallback
        const { data: allTags, error: allTagsError } = await BlogService.fetchTags();
        
        if (!allTagsError) {
          setTags(allTags);
        } else {
          setTags([]);
        }
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    if (id) {
      const blogId = parseInt(id as string);
      if (!isNaN(blogId)) {
        loadBlogData();
      }
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
            message="The blog post you're looking for doesn't exist."
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

  const totalReactions = BlogService.calculateTotalReactions(blogData.blog_reactions);
  const readTime = BlogService.getReadTime(blogData.description);

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
                  onBookmark={handleBookmark}
                  onNeedLogin={() => setShowLoginDialog(true)}
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
                  userReaction={userReaction}
                  isBookmarked={blogData.isBookmark}
                  totalReactions={totalReactions}
                  onReact={handleBlogReact}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  onNeedLogin={() => setShowLoginDialog(true)}
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
                onCommentReact={handleCommentReact}
                commentReactions={commentReactions}
                formatDate={BlogService.formatDate} // Updated to use BlogService
                onNeedLogin={() => setShowLoginDialog(true)}
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

      {/* Login Dialog */}
      <BlogLoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        message="You need to login to interact with this blog and access other features."
      />
    </>
  );
};

export default BlogDetailsPage;