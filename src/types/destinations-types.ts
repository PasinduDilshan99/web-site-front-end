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

// Add to existing types in destinations-types.ts

export interface User {
  userId: number;
  username: string;
}

export interface Status {
  id: number;
  name: string;
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

export interface HistoryApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationHistoryType[];
  timestamp: string;
}

// Add to existing types in destinations-types.ts

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
