export interface Schedule {
  id: number;
  name: string;
  description: string;
  status: number;
  assume_start_date: string;
  assume_end_date: string;
  duration_hours_start: number;
  duration_hours_end: number;
  special_note: string;
}

export interface Requirement {
  id: number;
  name: string;
  value: string;
  description: string;
  color: string;
  status: number;
}

export interface ActivityImage {
  id: number;
  name: string;
  description: string;
  status: number;
  image_url: string;
}

export interface ActivityCategoryWithPrimary {
  id: number;
  name: string;
  description: string;
  is_primary: boolean;
}

export interface ActiveActivitiesType {
  id: number;
  name: string;
  description: string;
  season: string;
  status: string;
  schedules: Schedule[];
  requirements: Requirement[];
  images: ActivityImage[];
  destination_id: number;
  activities_category: ActivityCategoryWithPrimary[];
  duration_hours: number;
  available_from: string;
  available_to: string;
  price_local: number;
  price_foreigners: number;
  min_participate: number;
  max_participate: number;
  created_at: string;
  updated_at: string;
  // category_name: string;
  // category_description: string;
  wish: boolean;
}

export interface CategoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

export interface ActiveActivitiesCategoriesType {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
  numberOfActivities: number;
  color: string;
  hoverColor: string;
  images: CategoryImage[];
}

export interface ActivityCategoriesApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveActivitiesCategoriesType[];
  timestamp: string;
}

export interface ActivityListResponse {
  activityCount: number;
  activityResponseDtos: ActiveActivitiesType[];
}

export interface PaginatedActivityResponse {
  code: number;
  status: string;
  message: string;
  data: ActivityListResponse | null;
  timestamp: string;
}

// Review types
export interface CommentReaction {
  commentReactionId: number;
  commentReactionCommentId: number;
  userId: number;
  userName: string;
  commentReactionType: string;
  commentReactionStatus: string;
  commentReactionCreatedBy: number;
  commentReactionCreatedAt: string;
}

export interface Comment {
  commentId: number;
  commentReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number | null;
  comment: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface Reaction {
  reviewReactionId: number;
  reactionReviewId: number;
  userId: number;
  userName: string;
  reactionType: string;
  reviewReactionStatus: string;
  reactionCreatedAt: string;
}

export interface ReviewImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
}

export interface Review {
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
  reactions: Reaction[];
  comments: Comment[];
}

export interface ActivityHistory {
  historyId: number;
  activity: Activity;
  schedule: Schedule;
  history: History;
  images: ActivityHistoryImage[];
}

export interface Destination {
  destinationId: string;
  destinationName: string;
  destinationDescription: string;
  destinationLocation: string;
  latitude: number;
  longitude: number;
}

export interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activityCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
  destination: Destination;
}

export interface Schedule {
  scheduleId: number;
  scheduleName: string;
  scheduleDescription: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationHoursStart: number;
  durationHoursEnd: number;
  specialNote: string;
}

export interface History {
  historyName: string;
  historyDescription: string;
  numberOfParticipate: number;
  activityStart: string;
  activityEnd: string;
  rating: number;
  specialNote: string;
  statusName: string;
  createdByUsername: string;
  updatedByUsername: string | null;
  terminatedByUsername: string | null;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

export interface ActivityHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatusName: string;
  imageCreatedByUsername: string;
  imageUpdatedByUsername: string | null;
  imageTerminatedByUsername: string | null;
  imageCreatedAt: string;
  imageUpdatedAt: string;
  imageTerminatedAt: string | null;
  history: {
    historyId: number;
    historyName: string;
    historyDescription: string;
    numberOfParticipate: number;
    activityStart: string;
    activityEnd: string;
    rating: number;
    historySpecialNote: string;
    historyStatusName: string;
  };
  schedule: {
    scheduleId: number;
    scheduleName: string;
    scheduleDescription: string;
    assumeStartDate: string;
    assumeEndDate: string;
    durationHoursStart: number;
    durationHoursEnd: number;
    scheduleSpecialNote: string;
  };
  activity: {
    activityId: number;
    activityName: string;
    activityDescription: string;
    activityCategory: string;
    durationHours: number;
    priceLocal: number;
    priceForeigners: number;
    minParticipate: number;
    maxParticipate: number;
  };
}

export interface HistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: ActivityHistoryImage[];
}

export interface ReviewsResponse {
  code: number;
  status: string;
  message: string;
  data: Review[];
}

export interface HistoryResponse {
  code: number;
  status: string;
  message: string;
  data: ActivityHistory[];
}

export interface ActivitySearchRequest {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  duration: number | null;
  activityCategory: string | null;
  season: string | null;
  status: string | null;
  pageSize: number;
  pageNumber: number;
}

export interface ActivityFilters {
  search: string;
  priceRange: [number, number];
  duration: string;
  category: string;
  season: string;
  participants: string;
  status: string;
}

export interface ActivityData {
  id: number;
  name: string;
  description: string;
  season: string;
  seasonId: number;
  status: string;
  schedules: Schedule[];
  requirements: Requirement[];
  images: ActivityImage[];
  destination_id: number;
  activities_category: ActivityCategory[];
  duration_hours: number;
  available_from: string;
  available_to: string;
  price_local: number;
  price_foreigners: number;
  min_participate: number;
  max_participate: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_description: string;
}

export interface ActivityCategory {
  id: number;
  name: string;
  description: string;
  is_primary: boolean;
}
