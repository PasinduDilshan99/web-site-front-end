// types/blog-types.ts

export interface BlogImage {
  id: number;
  image_url: string;
}

export interface CommentReaction {
  username: string;
  user_id: number;
  reaction_type_id: number;
}

export interface BlogCommentReply {
  username: string;
  comment: string;
  reactions: CommentReaction[] | null;
  replies: BlogCommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

export interface BlogComment {
  username: string;
  comment: string;
  reactions: CommentReaction[] | null;
  replies: BlogCommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
}

export interface BlogReaction {
  count: number;
  reaction_type_id: number;
  reaction_type_name: string;
}

export interface Blog {
  title: string;
  subtitle: string;
  description: string;
  blogCategory: string; // Added this field
  images: BlogImage[];
  likeCount: number;
  comments: BlogComment[] | null;
  blog_id: number;
  writer_id: number;
  writer_name: string;
  blog_status: string;
  blog_created_at: string;
  blog_reactions: BlogReaction[];
  commentCount?: number;
  totalReactions?: number;
}

export interface BlogFilters {
  search: string;
  writer: string;
  category: string;
  dateRange: [string, string];
  sortBy: 'recent' | 'likes' | 'comments' | 'date-asc' | 'date-desc';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}