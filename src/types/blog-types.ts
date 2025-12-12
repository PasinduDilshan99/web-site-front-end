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

export interface BlogDetailsData {
  title: string;
  subtitle: string;
  description: string;
  blogCategory: string; // Added this field
  views:number;
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
  isBookmarked: boolean;
  totalReactions: number;
  onLike: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

export interface BlogHeaderProps {
  blogId:number;
  title: string;
  views:number;
  subtitle: string;
  writerName: string;
  date: string;
  readTime: number;
  totalReactions: number;
  totalComments: number;
  imageCount: number;
  onShare: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
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
  formatDate: (dateString: string) => string;
}

export interface CommentItemProps {
  comment: BlogComment | BlogCommentReply;
  depth?: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
}

export interface SidebarProps {
  writerName: string;
  blogCount: number;
  relatedBlogs: any[];
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}