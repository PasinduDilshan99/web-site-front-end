// types/blog-types.ts

export interface BlogImage {
  id: number;
  image_url: string;
}

export interface CommentReaction {
  username: string;
  user_id: number;
  reaction_type: string;
  reaction_type_name?: string;
}

export interface BlogCommentReply {
  username: string;
  comment: string;
  reactions: CommentReaction[] | null;
  replies: BlogCommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
  parent_id?: number;
  userReacted?: boolean;
  userReactionType?: string;
}

export interface BlogComment {
  username: string;
  comment: string;
  reactions: CommentReaction[] | null;
  replies: BlogCommentReply[] | null;
  comment_id: number;
  user_id: number;
  comment_date: string;
  userReacted?: boolean;
  userReactionType?: string;
}

export interface BlogReaction {
  count: number;
  reaction_type_id: number;
  reaction_type_name: string;
}

export interface BlogDetailsData {
  title: string;
  subtitle: string;
  description: string;
  blogCategory: string;
  views: number;
  isBookmark: boolean;
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
  userBlogReaction?: string | null;
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

export interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: BlogDetailsData;
  timestamp: string;
}

export interface BlogTag {
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

export interface TagsApiResponse {
  code: number;
  status: string;
  message: string;
  data: BlogTag[];
  timestamp: string;
}

export interface BlogActionsProps {
  isLiked: boolean;
  userReaction: string | null;
  isBookmarked: boolean;
  totalReactions: number;
  onReact: (reactType: string) => void;
  onShare: () => void;
  onBookmark: () => void;
  onNeedLogin?: () => void;
}

export interface BlogHeaderProps {
  blogId: number;
  title: string;
  views: number;
  subtitle: string;
  writerName: string;
  date: string;
  readTime: number;
  totalReactions: number;
  totalComments: number;
  imageCount: number;
  onShare: () => void;
  onBookmark: () => void;
  isBookmark: boolean;
  onNeedLogin?: () => void;
}

export interface BlogImagesProps {
  images: BlogImage[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
  title: string;
}

export interface BlogContentProps {
  description: string;
}

export interface BlogTagsProps {
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

export interface CommentsSectionProps {
  comments: BlogComment[];
  totalComments: number;
  commentText: string;
  setCommentText: (text: string) => void;
  isSubmittingComment: boolean;
  replyTexts: Record<number, string>;
  setReplyTexts: (texts: Record<number, string>) => void;
  showReplyInput: number | null;
  setShowReplyInput: (id: number | null) => void;
  onSubmitComment: () => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  commentReactions: Record<number, string | null>;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

export interface CommentItemProps {
  comment: BlogComment | BlogCommentReply;
  depth?: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  userReaction?: string | null;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

export interface SidebarProps {
  writerName: string;
  blogCount: number;
  relatedBlogs: any[];
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

// API Request Interfaces
export interface BlogReactRequest {
  blogId: number;
  reactType: string;
}

export interface CommentRequest {
  blogId: number;
  parentId?: number | null;
  comment: string;
}

export interface CommentReactRequest {
  commentId: number;
  reactType: string;
}

// Reaction types
export const REACTION_TYPES = {
  LIKE: 'like',
  LOVE: 'love',
  HAHA: 'haha',
  WOW: 'wow',
  SAD: 'sad',
  ANGRY: 'angry'
} as const;

export type ReactionType = typeof REACTION_TYPES[keyof typeof REACTION_TYPES];