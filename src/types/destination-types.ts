// types/destination-types.ts

// Destination Categories Types
export interface ImageType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

export interface DestinationCategoryType {
  categoryId: number;
  category: string;
  categoryDescription: string;
  categoryStatus: string;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
}

export interface DestinationCategoryApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationCategoryType[];
  timestamp: string;
}

// Main Destination Types
export interface ActivityData {
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

export interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface DestinationData {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: ActivityData[];
  images: DestinationImage[];
}

export interface DestinationApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationData[];
  timestamp: string;
}

export interface PopularDestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

export interface PopularDestinationsType {
  popularId: number;
  rating: number;
  popularity: number;
  popularCreatedAt: string;
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  destinationStatus: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  images: PopularDestinationImage[];
}

// new destinations
export interface NewDestinationsType {
  popularId: number;
  rating: number;
  popularity: number;
  popularCreatedAt: string;
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  destinationStatus: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  images: ImageType[];
}

export interface NewDestinationsApiResponse {
  code: number;
  status: string;
  message: string;
  data: NewDestinationsType[];
  timestamp: string;
}

// Trending Destinations Types
export interface TrendingDestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

export interface TrendingActivity {
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

export interface TrendingDestinationType {
  popularId: number;
  rating: number;
  popularity: number;
  popularCreatedAt: string;
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  destinationStatus: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  images: TrendingDestinationImage[];
  activities: TrendingActivity[];
}

export interface TrendingDestinationsApiResponse {
  code: number;
  status: string;
  message: string;
  data: TrendingDestinationType[];
  timestamp: string;
}


// types/tour-map-types.ts

// Tour Map Types
export interface TourMapDestinationImage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
}

export interface TourMapDestination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  destinationCategory: string;
  destinationCategoryStatus: string;
  destinationLocation: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationCreatedAt: string;
  destinationCreatedBy: number;
  destinationImagesForTourMapDtos: TourMapDestinationImage[];
  destinationCategoryImageForTourMapDtos: TourMapDestinationImage[];
}

export interface TourMapCategory {
  id: string;
  name: string;
  color: string;
  image?: string;
}

export interface TourMapApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourMapDestination[];
  timestamp: string;
}

// Place interface for transformed data
export interface TourMapPlace {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
  location: string;
  images: TourMapDestinationImage[];
}

// Leaflet Types
export interface TourMapLeafletMap {
  remove: () => void;
  setView: (coords: [number, number], zoom: number) => TourMapLeafletMap;
  removeLayer: (layer: unknown) => void;
  fitBounds: (bounds: unknown) => void;
}

export interface TourMapLeafletMarker {
  bindPopup: (content: string) => TourMapLeafletMarker;
  addTo: (map: TourMapLeafletMap) => TourMapLeafletMarker;
  on: (event: string, handler: () => void) => TourMapLeafletMarker;
  openPopup: () => void;
  closePopup: () => void;
}

export interface TourMapLeafletControl {
  L: {
    map: (element: HTMLElement) => TourMapLeafletMap;
    tileLayer: (url: string, options: unknown) => { addTo: (map: TourMapLeafletMap) => unknown };
    marker: (coords: [number, number], options: unknown) => TourMapLeafletMarker;
    divIcon: (options: unknown) => unknown;
    featureGroup: (markers: TourMapLeafletMarker[]) => { getBounds: () => { pad: (padding: number) => unknown } };
  };
}

export interface ActivityByTourId {
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

export interface ExtendedActivityByTourId extends ActivityByTourId {
  destinationName: string;
  destinationId: number;
}

export interface DestinationImageByTourId {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface DestinationByTourId {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: ActivityByTourId[];
  images: DestinationImageByTourId[];
}

export interface ApiResponseByTourId<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
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

export interface Comment {
  commentId: number;
  commentReviewId: number;
  commentUserId: number;
  commentUserName: string;
  parentCommentId: number | null;
  commentText: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface Review {
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
  images: Image[];
  reactions: ReviewReaction[];
  comments: Comment[];
}

export interface DestinationSearchRequest {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  duration: number | null;
  destinationCategory: string | null;
  season: string | null;
  status: string | null;
  pageSize: number;
  pageNumber: number;
}

export interface DestinationListResponse {
  destinationCount: number;
  destinationResponseDtos: PopularDestinationsDetailsType[];
}

export interface PaginatedDestinationResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationListResponse | null;
  timestamp: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface PopularDestinationsDetailsType {
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
  wish:boolean;
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

export interface HistoryImage {
  imageId: number;
  name: string;
  description: string;
  imageUrl: string;
  imageStatus: Status;
  createdBy: User;
  updatedBy: User | null;
  terminatedBy: User | null;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

export interface HistoryApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationHistoryType[];
  timestamp: string;
}

export interface DestinationHistoryType {
  historyId: number;
  destination: {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  eventDate: string;
  historyStatus: Status;
  createdBy: User;
  updatedBy: User | null;
  terminatedBy: User | null;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
  images: HistoryImage[];
}

export interface User {
  userId: number;
  username: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface HistoryImageUser {
  username: string;
}

export interface HistoryImageHistory {
  historyId: number;
  title: string;
  description: string;
  eventDate: string;
  historyStatusName: string;
}

export interface HistoryImageDestination {
  destinationId: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface DestinationHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatusName: string;
  imageCreatedAt: string;
  imageUpdatedAt: string;
  imageTerminatedAt: string | null;
  imageCreatedBy: HistoryImageUser;
  imageUpdatedBy: HistoryImageUser | null;
  imageTerminatedBy: HistoryImageUser | null;
  history: HistoryImageHistory;
  destination: HistoryImageDestination;
}

export interface HistoryImagesApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationHistoryImage[];
  timestamp: string;
}

export interface EnhancedDestination extends PopularDestinationsDetailsType {
  rating: number;
  popularity: number;
}

export interface Filters {
  search: string;
  priceRange: [number, number];
  duration: string;
  category: string;
  location: string;
  rating: number;
}
