// utils/blog-utils.ts
import {
  BlogDetailsData,
  BlogTag,
  ApiResponse,
  TagsApiResponse,
  BlogComment,
  BlogCommentReply,
  BlogReaction,
  BlogComment as CommentType,
} from "@/types/blog-types";

// Format date with better error handling
export const formatDate = (dateString: string): string => {
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
export const getReadTime = (text: string | null | undefined): number => {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

// Calculate total comments including replies - with null handling
export const calculateTotalComments = (comments: BlogComment[] | null): number => {
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
};

// Calculate total reactions - with null handling
export const calculateTotalReactions = (
  reactions: BlogReaction[] | null
): number => {
  if (!reactions || !Array.isArray(reactions)) return 0;
  return reactions.reduce((total, reaction) => total + reaction.count, 0);
};

// Helper function to find user reaction in comments
const findUserReactionInComments = (
  comments: CommentType[] | null,
  userId: number
): Record<number, string> => {
  const reactionsMap: Record<number, string> = {};
  
  if (!comments) return reactionsMap;
  
  const traverseComments = (commentList: CommentType[]) => {
    commentList.forEach(comment => {
      if (comment.reactions) {
        const userReaction = comment.reactions.find(reaction => reaction.user_id === userId);
        if (userReaction && userReaction.reaction_type_name) {
          reactionsMap[comment.comment_id] = userReaction.reaction_type_name.toLowerCase();
        }
      }
      
      if (comment.replies) {
        traverseReplies(comment.replies);
      }
    });
  };
  
  const traverseReplies = (replies: BlogCommentReply[]) => {
    replies.forEach(reply => {
      if (reply.reactions) {
        const userReaction = reply.reactions.find(reaction => reaction.user_id === userId);
        if (userReaction && userReaction.reaction_type_name) {
          reactionsMap[reply.comment_id] = userReaction.reaction_type_name.toLowerCase();
        }
      }
      
      if (reply.replies) {
        traverseReplies(reply.replies);
      }
    });
  };
  
  traverseComments(comments);
  return reactionsMap;
};

// Fetch blog details
// export const fetchBlogDetails = async (
//   id: number
// ): Promise<BlogDetailsData> => {
//   const response = await fetch(
//     "http://localhost:8080/felicita/v0/api/blog/blog-details",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const apiResponse: ApiResponse = await response.json();

//   if (apiResponse.code === 200 && apiResponse.data) {
//     const data = apiResponse.data;

//     // Normalize null values to empty arrays
//     return {
//       ...data,
//       comments: data.comments || [],
//       blog_reactions: data.blog_reactions || [],
//       images: data.images || [],
//       likeCount: data.likeCount || 0,
//       title: data.title || "Untitled Blog",
//       description: data.description || "",
//       subtitle: data.subtitle || "",
//       writer_name: data.writer_name || "Unknown Author",
//       blog_created_at: data.blog_created_at || new Date().toISOString(),
//     };
//   } else {
//     throw new Error(apiResponse.message || "Failed to fetch blog details");
//   }
// };

// Fetch related blogs
// export const fetchRelatedBlogs = async (
//   writerId: number,
//   currentBlogId: number
// ): Promise<BlogDetailsData[]> => {
//   try {
//     const response = await fetch(
//       "http://localhost:8080/felicita/v0/api/blog/active",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );

//     if (!response.ok) {
//       return [];
//     }

//     const result = await response.json();
//     if (result.code === 200 && result.data) {
//       // Filter blogs by same writer, excluding current blog
//       const related = result.data
//         .filter(
//           (blog: BlogDetailsData) =>
//             blog.writer_id === writerId && blog.blog_id !== currentBlogId
//         )
//         .slice(0, 3); // Show max 3 related blogs

//       // If not enough same-writer blogs, get random blogs
//       if (related.length < 3) {
//         const randomBlogs = result.data
//           .filter((blog: BlogDetailsData) => blog.blog_id !== currentBlogId)
//           .slice(0, 3 - related.length);
//         return [...related, ...randomBlogs];
//       }

//       return related;
//     }

//     return [];
//   } catch (err) {
//     console.error("Error fetching related blogs:", err);
//     return [];
//   }
// };

// Fetch tags
// export const fetchTags = async (): Promise<BlogTag[]> => {
//   try {
//     const response = await fetch(
//       "http://localhost:8080/felicita/v0/api/blog/tags",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result: TagsApiResponse = await response.json();
//     if (result.code === 200 && result.data) {
//       // Filter only active tags and sort by name
//       return result.data
//         .filter((tag) => tag.statusName === "ACTIVE")
//         .sort((a, b) => a.name.localeCompare(b.name));
//     }

//     return [];
//   } catch (err) {
//     console.error("Error fetching tags:", err);
//     return [];
//   }
// };


// In blog-utils.ts
// export const fetchBlogTags = async (blogId: number): Promise<BlogTag[]> => {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/felicita/v0/api/blog/tags/${blogId}`,
//       {
//         credentials: 'include',
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch blog tags: ${response.status}`);
//     }

//     const result = await response.json();

//     if (result.code === 200) {
//       return result.data || [];
//     } else {
//       throw new Error(result.message || 'Failed to fetch blog tags');
//     }
//   } catch (error) {
//     console.error('Error fetching blog tags:', error);
//     throw error;
//   }
// };