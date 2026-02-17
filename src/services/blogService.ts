// services/blog-service.ts
import {
  ADD_BLOG_BOOKMARK_DATA_FE,
  ADD_BLOG_COMMENT_DATA_FE,
  ADD_BLOG_COMMENT_REACT_DATA_FE,
  ADD_BLOG_DATA_FE,
  ADD_BLOG_REACT_DATA_FE,
  GET_ACTIVE_BLOGS_DETAILS_DATA_FE,
  GET_BLOGS_DERAILS_BY_BLOG_ID_DATA_FE,
  GET_BLOGS_DERAILS_BY_TAG_NAME_DATA_FE,
  GET_BLOGS_DERAILS_BY_WRITER_NAME_DATA_FE,
  GET_BLOGS_TAG_BY_BLOG_ID_DATA_FE,
  GET_BLOGS_TAG_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";
import {
  ActiveBlogsResponse,
  BlogCreateRequest,
  BlogCreateResponse,
  BlogDetailsData,
  BlogListApiResponse,
  BlogReactRequest,
  CommentRequest,
  CommentReactRequest,
  BlogReactApiResponse,
  BlogCommentApiResponse,
  BlogCommentReactApiResponse,
  BlogTagAPIResponse,
  BlogTag,
  ApiResponse,
  TagsApiResponse,
  BlogComment,
  BlogCommentReply,
  BlogReaction,
  BlogComment as CommentType,
} from "@/types/blog-types";

// const API_BASE_URL = 'http://localhost:8080/felicita/api/v0/blog';

export class BlogService {
  // Helper function to get headers
  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    return headers;
  }

  // ========== Utility Methods (Moved from blog-utils.ts) ==========

  /**
   * Format date with better error handling
   */
  static formatDate(dateString: string): string {
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
  }

  /**
   * Calculate read time with null handling
   */
  static getReadTime(text: string | null | undefined): number {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  /**
   * Calculate total comments including replies - with null handling
   */
  static calculateTotalComments(comments: BlogComment[] | null): number {
    if (!comments || !Array.isArray(comments)) return 0;

    let total = comments.length;

    const countReplies = (replies: BlogCommentReply[] | null): number => {
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
  }

  /**
   * Calculate total reactions - with null handling
   */
  static calculateTotalReactions(reactions: BlogReaction[] | null): number {
    if (!reactions || !Array.isArray(reactions)) return 0;
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  }

  /**
   * Helper function to find user reaction in comments
   */
  static findUserReactionInComments(
    comments: CommentType[] | null,
    userId: number,
  ): Record<number, string> {
    const reactionsMap: Record<number, string> = {};

    if (!comments) return reactionsMap;

    const traverseComments = (commentList: CommentType[]) => {
      commentList.forEach((comment) => {
        if (comment.reactions) {
          const userReaction = comment.reactions.find(
            (reaction) => reaction.user_id === userId,
          );
          if (userReaction && userReaction.reaction_type_name) {
            reactionsMap[comment.comment_id] =
              userReaction.reaction_type_name.toLowerCase();
          }
        }

        if (comment.replies) {
          this.traverseReplies(comment.replies, reactionsMap, userId);
        }
      });
    };

    traverseComments(comments);
    return reactionsMap;
  }

  /**
   * Helper method to traverse replies
   */
  private static traverseReplies(
    replies: BlogCommentReply[],
    reactionsMap: Record<number, string>,
    userId: number,
  ): void {
    replies.forEach((reply) => {
      if (reply.reactions) {
        const userReaction = reply.reactions.find(
          (reaction) => reaction.user_id === userId,
        );
        if (userReaction && userReaction.reaction_type_name) {
          reactionsMap[reply.comment_id] =
            userReaction.reaction_type_name.toLowerCase();
        }
      }

      if (reply.replies) {
        this.traverseReplies(reply.replies, reactionsMap, userId);
      }
    });
  }

  // ========== API Methods ==========

  /**
   * Fetch blog details
   */
  static async fetchBlogDetails(id: number): Promise<{
    data: BlogDetailsData | null;
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_BLOGS_DERAILS_BY_BLOG_ID_DATA_FE, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ id }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const apiResponse: ApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const data = apiResponse.data;

        // Normalize null values to empty arrays
        const normalizedData: BlogDetailsData = {
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

        return {
          data: normalizedData,
          error: null,
          message: apiResponse.message,
        };
      } else {
        return {
          data: null,
          error: apiResponse.message || "Failed to fetch blog details",
          message: apiResponse.message,
        };
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      return {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching blog details",
      };
    }
  }

  /**
   * Fetch related blogs
   */
  static async fetchRelatedBlogs(
    writerId: number,
    currentBlogId: number,
  ): Promise<{
    data: BlogDetailsData[];
    error: string | null;
  }> {
    try {
      // First fetch all active blogs
      const { data: allBlogs, error } = await this.fetchActiveBlogs();

      if (error) {
        return { data: [], error };
      }

      // Filter blogs by same writer, excluding current blog
      const sameWriterBlogs = allBlogs.filter(
        (blog) => blog.writer_id === writerId && blog.blog_id !== currentBlogId,
      );

      // Show max 3 related blogs
      const related = sameWriterBlogs.slice(0, 3);

      // If not enough same-writer blogs, get random blogs
      if (related.length < 3) {
        const randomBlogs = allBlogs
          .filter((blog) => blog.blog_id !== currentBlogId)
          .slice(0, 3 - related.length);
        return {
          data: [...related, ...randomBlogs],
          error: null,
        };
      }

      return {
        data: related,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      return {
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch related blogs",
      };
    }
  }

  /**
   * Fetch all tags
   */
  static async fetchTags(): Promise<{
    data: BlogTag[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_BLOGS_TAG_DETAILS_DATA_FE, {
        method: "GET",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result: TagsApiResponse = await response.json();

      if (result.code === 200 && result.data) {
        // Filter only active tags and sort by name
        const activeTags = result.data
          .filter((tag) => tag.statusName === "ACTIVE")
          .sort((a, b) => a.name.localeCompare(b.name));

        return {
          data: activeTags,
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to fetch tags",
          message: result.message,
        };
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      return {
        data: [],
        error: error instanceof Error ? error.message : "Failed to fetch tags",
      };
    }
  }

  /**
   * Fetch tags for a specific blog
   */
  static async fetchBlogTags(blogId: number): Promise<{
    data: BlogTag[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_BLOGS_TAG_BY_BLOG_ID_DATA_FE, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result = await response.json();

      if (result.code === 200) {
        return {
          data: result.data || [],
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to fetch blog tags",
          message: result.message,
        };
      }
    } catch (error) {
      console.error("Error fetching blog tags:", error);
      return {
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch blog tags",
      };
    }
  }

  // ========== Reaction & Comment API Methods ==========

  /**
   * Blog reaction API
   */
  static async blogReact(data: BlogReactRequest): Promise<{
    data: BlogReactApiResponse | null;
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(ADD_BLOG_REACT_DATA_FE, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result: BlogReactApiResponse = await response.json();
      return {
        data: result,
        error: null,
        message: result.message,
      };
    } catch (error) {
      console.error("Error reacting to blog:", error);
      return {
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to react to blog",
      };
    }
  }

  /**
   * Comment API (for both comments and replies)
   */
  static async addComment(data: CommentRequest): Promise<{
    data: BlogCommentApiResponse | null;
    error: string | null;
    message?: string;
  }> {
    try {
      // If parentId is undefined, send null
      const requestData = {
        ...data,
        parentId: data.parentId === undefined ? null : data.parentId,
      };

      const response = await fetch(ADD_BLOG_COMMENT_DATA_FE, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(requestData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result: BlogCommentApiResponse = await response.json();
      return {
        data: result,
        error: null,
        message: result.message,
      };
    } catch (error) {
      console.error("Error adding comment:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to add comment",
      };
    }
  }

  /**
   * Comment reaction API
   */
  static async commentReact(data: CommentReactRequest): Promise<{
    data: BlogCommentReactApiResponse | null;
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(ADD_BLOG_COMMENT_REACT_DATA_FE, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result: BlogCommentReactApiResponse = await response.json();
      return {
        data: result,
        error: null,
        message: result.message,
      };
    } catch (error) {
      console.error("Error reacting to comment:", error);
      return {
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to react to comment",
      };
    }
  }

  /**
   * Bookmark API with enhanced error handling
   */
  static async toggleBookmark(blogId: number): Promise<{
    success: boolean;
    data: BlogTagAPIResponse | null;
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(ADD_BLOG_BOOKMARK_DATA_FE, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ blogId }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result: BlogTagAPIResponse = await response.json();

      if (result.code === 200) {
        return {
          success: true,
          data: result,
          error: null,
          message: result.message,
        };
      } else {
        return {
          success: false,
          data: result,
          error: result.message || "Bookmark operation failed",
          message: result.message,
        };
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      return {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "Failed to toggle bookmark",
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Enhanced bookmark method with validation
   */
  static async toggleBookmarkWithValidation(
    blogId: number,
    currentState: boolean,
  ): Promise<{
    success: boolean;
    newState: boolean;
    message: string;
    error: string | null;
  }> {
    try {
      const { success, data, error, message } =
        await this.toggleBookmark(blogId);

      if (!success) {
        return {
          success: false,
          newState: currentState,
          message: error || "Operation failed",
          error: error,
        };
      }

      if (data?.code === 200) {
        const serverMessage = data?.message.toLowerCase() || "";
        const isInsert = serverMessage.includes("insert");
        const isRemove = serverMessage.includes("remove");

        // Validate response matches expected state change
        if ((isInsert && !currentState) || (isRemove && currentState)) {
          return {
            success: true,
            newState: isInsert, // true if inserted, false if removed
            message: serverMessage,
            error: null,
          };
        } else {
          return {
            success: false,
            newState: currentState,
            message: "Server response mismatch",
            error: "Server response does not match expected operation",
          };
        }
      }

      return {
        success: false,
        newState: currentState,
        message: message || "Operation failed",
        error: error,
      };
    } catch (error) {
      console.error("Error in toggleBookmarkWithValidation:", error);
      return {
        success: false,
        newState: currentState,
        message:
          error instanceof Error ? error.message : "Failed to toggle bookmark",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // ========== Existing Blog Methods ==========

  static async fetchActiveBlogs(): Promise<{
    data: BlogDetailsData[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_BLOGS_DETAILS_DATA_FE);
      const result: ActiveBlogsResponse = await response.json();

      if (response.ok) {
        return {
          data: result.data || [],
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to fetch active blogs",
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching active blogs:", err);
      return {
        data: [],
        error: "Something went wrong while fetching active blogs",
      };
    }
  }

  static async fetchRandomActiveBlogs(limit: number = 6): Promise<{
    data: BlogDetailsData[];
    error: string | null;
  }> {
    try {
      const { data: allBlogs, error } = await this.fetchActiveBlogs();

      if (error) {
        return { data: [], error };
      }

      // Get random blogs
      const randomBlogs = allBlogs
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);

      return {
        data: randomBlogs,
        error: null,
      };
    } catch (err) {
      console.error("Error fetching random blogs:", err);
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to fetch random blogs",
      };
    }
  }

  static async fetchBlogsByWriter(writerName: string): Promise<{
    data: BlogDetailsData[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(
        `${GET_BLOGS_DERAILS_BY_WRITER_NAME_DATA_FE}/${encodeURIComponent(writerName)}`,
      );
      const result: BlogListApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        return {
          data: result.data || [],
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || `Failed to fetch blogs by ${writerName}`,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching blogs by writer:", err);
      return {
        data: [],
        error: "Something went wrong while fetching blogs by writer",
      };
    }
  }

  static async fetchBlogsByTag(tag: string): Promise<{
    data: BlogDetailsData[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(
        `${GET_BLOGS_DERAILS_BY_TAG_NAME_DATA_FE}/${encodeURIComponent(tag)}`,
      );
      const result: BlogListApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        return {
          data: result.data || [],
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || `Failed to fetch blogs with tag ${tag}`,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching blogs by tag:", err);
      return {
        data: [],
        error: "Something went wrong while fetching blogs by tag",
      };
    }
  }

  static async createBlog(blogData: BlogCreateRequest): Promise<{
    success: boolean;
    message: string;
    data?: { message: string };
    error?: string;
  }> {
    try {
      const response = await fetch(ADD_BLOG_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: BlogCreateResponse = await response.json();

      if (apiResponse.code === 200) {
        return {
          success: true,
          message: apiResponse.data.message || "Blog created successfully!",
          data: apiResponse.data,
        };
      } else {
        return {
          success: false,
          message: apiResponse.message || "Failed to create blog",
          error: apiResponse.message,
        };
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      return {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "An error occurred while creating the blog",
        error: err instanceof Error ? err.message : "Unknown error occurred",
      };
    }
  }
}
