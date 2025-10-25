// In @/types/accommodations-types/villa-types.ts

export interface VillaSectionVillaImage {
  imageUrl: string;
  caption: string;
}

export interface VillaSectionRoom {
  roomType: string;
  roomDescription: string;
  capacity: number;
  bedType: string;
  localPricePerNight: number;
  hasAirConditioning: boolean;
  hasTv: boolean;
  internetAccess: boolean;
}

export interface VillaSectionRoomAvailability {
  date: string;
  availableRooms: number | null;
}

export interface VillaSectionReview {
  rating: number;
  comment: string;
}

export interface VillaSectionReviews {
  averageRating: number | null;
  totalReviews: number;
  recentReviews: VillaSectionReview[] | null;
}

export interface VillaSectionVilla {
  villaId: number;
  villaName: string;
  villaDescription: string;
  address: string;
  contactNumber: string;
  email: string;
  websiteUrl: string;
  checkInTime: string;
  checkOutTime: string;
  starRating: number;
  currencyCode: string;
  cancellationPolicy: string;
  totalRooms: number;
  parkingFacility: boolean;
  wifiAvailable: boolean;
  petFriendly: boolean;
  villaType: string;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  villaImages: VillaSectionVillaImage[] | null;
  meals: null;
  rooms: VillaSectionRoom[] | null;
  roomAvailability: VillaSectionRoomAvailability[] | null;
  reviews: VillaSectionReviews;
}

export interface VillaSectionApiResponse {
  code: number;
  status: string;
  message: string;
  data: VillaSectionVilla[];
  timestamp: string;
}