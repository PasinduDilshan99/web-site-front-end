// types/reviews.ts
export interface ReviewImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus?: string;
  imageCreatedBy?: number;
  imageCreatedAt?: string;
}

export interface ReviewReaction {
  reviewReactionId?: number;
  reactionReviewId?: number;
  userId: number;
  userName: string;
  reactionType: string;
  reviewReactionStatus?: string;
  reactionCreatedAt?: string;
}

export interface CommentReaction {
  commentReactionId?: number;
  commentReactionCommentId?: number;
  userId: number;
  userName: string;
  commentReactionType: string;
  commentReactionStatus?: string;
  commentReactionCreatedBy?: number;
  commentReactionCreatedAt?: string;
}

export interface ReviewComment {
  commentId?: number;
  id?: number;
  commentReviewId?: number;
  packageReviewId?: number;
  userId: number;
  userName: string;
  parentCommentId: number | null;
  comment?: string;
  commentText?: string;
  commentStatus?: string;
  commentCreatedAt?: string;
  commentCreatedBy?: number;
  commentReactions?: CommentReaction[];
  reactions?: CommentReaction[];
}

export interface TourReview {
  reviewId: number;
  reviewerName: string;
  review: string;
  rating: number;
  reviewDescription: string;
  numberOfParticipate: number;
  reviewCreatedAt: string;
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  startLocation: string;
  endLocation: string;
  userId: number;
  userFullName: string;
  userEmail: string;
  reviewStatus: string;
  images: ReviewImage[];
}

export interface ActivityReview {
  reviewId: number;
  activityScheduleId: number;
  activityId: number;
  activityName: string;
  reviewName: string;
  review: string;
  rating: number;
  description: string;
  reviewStatus: string;
  numberOfParticipate: number;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number | null;
  reviewUpdatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface DestinationReview {
  reviewId: number;
  destinationId: number;
  destinationName: string;
  reviewUserId: number;
  reviewUserName: string;
  reviewText: string;
  reviewRating: number;
  reviewStatus: string;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number;
  reviewUpdatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface PackageReview {
  reviewId: number;
  packageId: number;
  packageScheduleId: number;
  name: string;
  review: string;
  rating: number;
  description: string;
  status: string;
  numberOfParticipate: number;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

// types/reviews.ts
// Add these interfaces to your existing reviews.ts file

export interface UserProfileReviewResponse {
  reviewId: number;
  rating: number;
  reviewDescription: string;
  reviewStatus: string;
  reviewCreatedAt: string;
  reviewUpdatedAt: string | null;
  reviewer: UserInfo;
  tour: TourInfo;
  packageInfo: PackageInfo;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface UserInfo {
  userId: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

export interface TourInfo {
  tourId: number;
  name: string;
}

export interface PackageInfo {
  packageId: number;
  name: string;
}

export interface ReviewImage {
  id: number;
  imageUrl: string;
}

export interface ReviewReaction {
  id: number;
  reactionType: string;
  reactedByUserId: number;
  reactedByUsername: string;
}

export interface ReviewComment {
  id: number;
  commentText: string;
  parentId: number | null;
  commentedBy: UserInfo;
  createdAt: string;
}


// types/wallet.ts
export interface WalletData {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  walletId: number;
  walletNumber: string;
  amount: number;
  walletStatusId: number;
  walletStatusName: string;
  walletStatusDescription: string;
  walletCreatedAt: string;
  walletUpdatedAt: string;
}

export interface WalletResponse {
  code: number;
  status: string;
  message: string;
  data: WalletData;
  timestamp: string;
}