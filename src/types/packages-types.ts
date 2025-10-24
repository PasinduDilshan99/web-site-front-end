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

export interface Feature {
  featureId: number;
  featureName: string;
  featureValue: string;
  featureDescription: string;
  color: string;
  specialNote: string;
}

export interface PackageImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
}

export interface ActivePackagesType {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  pricePerPerson: number | null;
  packageStatus: string;
  createdAt: string;
  createdBy: number;
  packageTypeName: string;
  packageTypeDescription: string;
  packageTypeStatus: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourStatus: string;
  schedules: Schedule[];
  features: Feature[];
  images: PackageImage[];
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface Filters {
  search: string;
  priceRange: [number, number];
  duration: string;
  packageType: string;
  location: string;
  minPersons: string;
  maxPersons: string;
  startDate: string;
  endDate: string;
}

export interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface TourDetails {
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

export interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activitiesCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
}

// Add this extended interface
export interface ExtendedActivity extends Activity {
  destinationName: string;
  destinationId: number;
}
export interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: Activity[];
  images: DestinationImage[];
}

export interface ReviewImage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

export interface ReviewReaction {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdAt: string;
}

export interface CommentReaction {
  id: number;
  commentId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

export interface ReviewComment {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number;
  comment: string;
  status: string;
  createdAt: string;
  createdBy: number;
  reactions: CommentReaction[];
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

export interface ReviewsResponse {
  code: number;
  status: string;
  message: string;
  data: PackageReview[];
  timestamp: string;
}

export interface PackageHistory {
  packageHistoryId: number;
  packageScheduleId: number;
  packageScheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  packageInfo: {
    packageId: number;
    packageName: string;
    tourId: number;
  };

  numberOfParticipate: number;
  rating: number;
  duration: number;
  historyDescription: string;
  color: string;
  hoverColor: string;
  startDate: string;
  endDate: string;
  historyCreatedAt: string;
  createdByUser: {
    fullName: string;
    imageUrl: string | null;
  };
  historyUpdatedAt: string;
  updatedByUser: {
    fullName: string | null;
    imageUrl: string | null;
  };
  historyTerminatedAt: string | null;
  terminatedByUser: {
    fullName: string | null;
    imageUrl: string | null;
  };
  images: PackageHistoryImage[];
}

export interface PackageHistoryImage {
  imageId: number | null;
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  color: string | null;
}

export interface PackageHistoryResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistory[];
  timestamp: string;
}

// Add to packages-types.ts
