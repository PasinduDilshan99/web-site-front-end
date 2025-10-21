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

export interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
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

export interface PopularDestinationsType {
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
  data: PopularDestinationsType[];
  timestamp: string;
}

export interface Filters {
  search: string;
  priceRange: [number, number];
  duration: string;
  category: string;
  location: string;
  rating: number;
}

// Mock data for rating and popularity since they're not in the API
export interface EnhancedDestination extends PopularDestinationsType {
  rating: number;
  popularity: number;
}