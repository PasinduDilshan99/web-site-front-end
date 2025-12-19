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

export interface TourListResponse {
  totalTours: number;
  tourResponseDtoList: ActiveToursType[];
}

export interface PaginatedTourResponse {
  code: number;
  status: string;
  message: string;
  data: TourListResponse | null;
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

export interface TourSearchRequest {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  duration: number | null;
  tourType: string | null;
  tourCategory: string | null;
  season: string | null;
  location: string | null;
  pageNumber: number;
  pageSize: number;
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


// Add these interfaces to your existing types file

export interface Accommodation {
  day: number;
  breakfast: boolean;
  breakfastDescription: string | null;
  lunch: boolean;
  lunchDescription: string | null;
  dinner: boolean;
  dinnerDescription: string | null;
  morningTea: boolean;
  morningTeaDescription: string | null;
  eveningTea: boolean;
  eveningTeaDescription: string | null;
  snacks: boolean;
  snackNote: string | null;
  hotel: Hotel | null;
  transport: Transport | null;
  otherNotes: string | null;
}

export interface Hotel {
  hotelId: number;
  hotelName: string;
  hotelType: string | null;
  hotelCategory: string;
  longitude: number;
  latitude: number;
  location: string;
  description: string;
  facilities: string | null;
}

export interface Transport {
  transportId: number;
  transportType: string;
  vehicleModel: string;
  seatCount: number;
  airConditioned: boolean;
  driverIncluded: boolean | null;
  fuelIncluded: boolean | null;
  description: string | null;
}

export interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string | null;
}

export interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string | null;
  category: string;
  categoryDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  createdBy: string;
  createrImageUrl: string;
  updatedAt: string | null;
  updatedBy: string | null;
  updaterImageUrl: string | null;
  images: DestinationImage[];
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

export interface Activity {
  id: number;
  destinationId: number;
  name: string;
  description: string;
  activitiesCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  categoryDescription: string;
  requirements: Requirement[];
  images: ActivityImage[];
}

export interface DestinationWithActivities {
  destination: Destination;
  activities: Activity[];
}

export interface DayDetails {
  dayNumber: number;
  accommodations: Accommodation;
  destinations: DestinationWithActivities[];
}

export interface TourDetailsApiResponse {
  code: number;
  status: string;
  message: string;
  data: DayDetails[];
  timestamp: string;
}

export interface Inclusion {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface Exclusion {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface Condition {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface TravelTip {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  status: string;
}

export interface TourExtraDetailsData {
  inclusions: Inclusion[];
  exclusions: Exclusion[];
  conditions: Condition[];
  travelTips: TravelTip[];
}

export interface TourExtraDetailsApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourExtraDetailsData;
  timestamp: string;
}

export interface TourExtraDetailItem {
  id: number;
  description?: string;
  title?: string;
  displayOrder: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TourExtraDetails {
  inclusions: TourExtraDetailItem[];
  exclusions: TourExtraDetailItem[];
  conditions: TourExtraDetailItem[];
  travelTips: TourExtraDetailItem[];
}