// app/blog/[id]/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
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
  fetchBlogTags,
} from "@/utils/blog-utils";
import { blogReact, addComment, commentReact } from "@/utils/blog-api";
import BlogHeader from "@/components/blog-components/BlogHeader";
import BlogImages from "@/components/blog-components/BlogImages";
import BlogContent from "@/components/blog-components/BlogContent";
import BlogTags from "@/components/blog-components/BlogTags";
import BlogActions from "@/components/blog-components/BlogActions";
import CommentsSection from "@/components/blog-components/CommentsSection";
import Sidebar from "@/components/blog-components/Sidebar";
import BlogLoginDialog from "@/components/blog-components/BlogLoginDialog";
import { useAuth } from "@/context/AuthContext";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const router = useRouter();
  const id = blogId;
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
      const blogDetails = await fetchBlogDetails(parseInt(id as string));

      if (blogDetails.userBlogReaction) {
        setUserReaction(blogDetails.userBlogReaction);
      }

      // Extract comment reactions
      const reactions: Record<number, string | null> = {};
      if (blogDetails.comments) {
        const extractReactions = (comments: any[]) => {
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
      setTotalComments(calculateTotalComments(blogDetails.comments));

      // Fetch related blogs based on writer or category
      const related = await fetchRelatedBlogs(
        blogDetails.writer_id,
        parseInt(id as string)
      );
      setRelatedBlogs(related);
      // const tagsData = await fetchTags();
      // setTags(tagsData);
      handleGetTags(blogId)
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

  // Handle blog reaction
  const handleBlogReact = async (reactType: string) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    if (!blogData) return;

    try {
      const response = await blogReact({
        blogId: blogData.blog_id,
        reactType: reactType,
      });

      if (response.code === 200) {
        const message = response.data?.message?.toLowerCase() || "";

        if (message.includes("add")) {
          setUserReaction(reactType);
          if (blogData) {
            const updatedData = { ...blogData };
            const existingReaction = updatedData.blog_reactions.find(
              (r) => r.reaction_type_name?.toLowerCase() === reactType
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
                (r) => r.reaction_type_name?.toLowerCase() === userReaction
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
              (r) => r.reaction_type_name?.toLowerCase() === userReaction
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
                (r) => r.reaction_type_name?.toLowerCase() === userReaction
              );
              if (oldReaction && oldReaction.count > 0) {
                oldReaction.count -= 1;
              }
            }

            const newReaction = updatedData.blog_reactions.find(
              (r) => r.reaction_type_name?.toLowerCase() === reactType
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

        setTimeout(() => {
          loadBlogData();
        }, 500);
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
      const newBookmarkState = !blogData.isBookmark;
      setBlogData({
        ...blogData,
        isBookmark: newBookmarkState,
      });

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/bookmark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogId: blogData.blog_id }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok && result.code === 200) {
        const message = result.data?.message?.toLowerCase() || "";

        if (
          (message.includes("insert") && newBookmarkState) ||
          (message.includes("remove") && !newBookmarkState)
        ) {
          console.log(
            `Bookmark ${newBookmarkState ? "added" : "removed"} successfully`
          );
        } else {
          console.warn("Server response doesn't match optimistic update");
          setBlogData({
            ...blogData,
            isBookmark: !newBookmarkState,
          });
        }
      } else {
        console.error("Bookmark API error:", result.message);
        setBlogData({
          ...blogData,
          isBookmark: !newBookmarkState,
        });
      }
    } catch (error) {
      console.error("Network error updating bookmark:", error);
      setBlogData({
        ...blogData,
        isBookmark: !blogData.isBookmark,
      });
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

      const response = await addComment({
        blogId: blogData.blog_id,
        parentId: null,
        comment: commentText,
      });

      if (response.code === 200) {
        setCommentText("");
        await loadBlogData();
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
      const response = await addComment({
        blogId: blogData.blog_id,
        parentId: parentCommentId,
        comment: replyText,
      });

      if (response.code === 200) {
        setReplyTexts({ ...replyTexts, [parentCommentId]: "" });
        setShowReplyInput(null);
        await loadBlogData();
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
      const response = await commentReact({
        commentId: commentId,
        reactType: reactType,
      });

      if (response.code === 200) {
        const message = response.data?.message?.toLowerCase() || "";

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

    const handleGetTags = async (blogId: number) => {
    if (!blogId) return;
    try {
      setLoadingTags(true);
      const blogTags = await fetchBlogTags(blogId);
      setTags(blogTags);
    } catch (error) {
      console.error("Error fetching blog tags:", error);
      try {
        const allTags = await fetchTags();
        setTags(allTags);
      } catch (fallbackError) {
        console.error("Error fetching all tags:", fallbackError);
        setTags([]);
      }
    } finally {
      setLoadingTags(false);
    }
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
            // message={error || "The blog post you're looking for doesn't exist."}
            message=""
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
                formatDate={formatDate}
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
