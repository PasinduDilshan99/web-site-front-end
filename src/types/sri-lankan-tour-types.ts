export interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

export interface ActiveToursType {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourTypeName: string;
  tourTypeDescription: string;
  tourCategoryName: string;
  tourCategoryDescription: string;
  seasonName: string;
  seasonDescription: string;
  statusName: string;
  schedules: Schedule[];
  images: TourImage[];
}

export interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveToursType[];
  timestamp: string;
}

export interface TourFilters {
  search: string;
  priceRange: [number, number];
  duration: string;
  tourType: string;
  tourCategory: string;
  season: string;
  location: string;
}


// types/sri-lankan-tour-types.ts
export interface ReviewImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
  isPrimary?: boolean;
}

export interface ReviewReaction {
  reviewReactionId: number;
  reactionReviewId: number;
  reactionUserId: number;
  reactionUserName: string;
  reactionType: string;
  reviewReactionStatus: string;
  reactionCreatedAt: string;
}

export interface CommentReaction {
  commentReactionId: number;
  commentReactionCommentId: number;
  commentReactionUserId: number;
  commentReactionUserName: string;
  commentReactionType: string;
  commentReactionStatus: string;
  commentReactionCreatedBy: number;
  commentReactionCreatedAt: string;
}

export interface ReviewComment {
  commentId: number;
  commentReviewId: number;
  commentUserId: number;
  commentUserName: string;
  parentCommentId: number | null;
  comment: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface TourReview {
  reviewId: number;
  tourScheduleId: number;
  tourId: number;
  tourName: string;
  reviewName: string;
  review: string;
  rating: number;
  reviewDescription: string;
  reviewStatus: string;
  numberOfParticipate: number;
  reviewCreatedBy: number;
  reviewCreatedUser: string;
  reviewCreatedAt: string;
  reviewUpdatedBy: number | null;
  reviewUpdatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface ReviewsResponse {
  code: number;
  status: string;
  message: string;
  data: TourReview[];
  timestamp: string;
}

export interface TourHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageColor: string;
  imageStatus: number;
}

export interface TourScheduleTour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourDuration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourStatus: number;
  tourType: number;
  tourCategory: number;
  season: number;
}

export interface TourSchedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
  scheduleStatus: number;
  tour: TourScheduleTour;
  images: TourHistoryImage[];
}

export interface TourHistory {
  historyId: number;
  historyName: string;
  historyDescription: string;
  numberOfParticipate: number;
  rating: number;
  historyDuration: number;
  startDate: string;
  endDate: string;
  vehicleNumber: string;
  driverId: number;
  guideId: number;
  historyColor: string;
  hoverColor: string;
  historyStatus: number;
  tourSchedule: TourSchedule;
}

export interface TourHistoryResponse {
  code: number;
  status: string;
  message: string;
  data: TourHistory[];
  timestamp: string;
}


export interface TourHistoryImage {
  imageId: number;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  status: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

export interface TourHistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: TourHistoryImage[];
  timestamp: string;
}