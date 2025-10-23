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
  activities: Activity[];
  images: DestinationImage[];
}

export interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationData;
  timestamp: string;
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
  images: unknown[];
  reactions: unknown[];
  comments: unknown[];
}
