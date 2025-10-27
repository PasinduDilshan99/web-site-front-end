// In @/types/accommodations-types/hostel-types.ts

export interface HostelSectionHostelImage {
  imageUrl: string;
  caption: string;
}

export interface HostelSectionMeal {
  mealType: string;
  mealDescription: string;
  localPrice: number;
  cuisineType: string | null;
  available: boolean;
}

export interface HostelSectionRoom {
  roomType: string;
  roomDescription: string;
  capacity: number;
  bedType: string;
  localPricePerNight: number;
  hasAirConditioning: boolean;
  hasTv: boolean;
  internetAccess: boolean;
}

export interface HostelSectionRoomAvailability {
  date: string;
  availableRooms: number | null;
}

export interface HostelSectionReview {
  rating: number;
  comment: string;
}

export interface HostelSectionReviews {
  averageRating: number | null;
  totalReviews: number;
  recentReviews: HostelSectionReview[] | null;
}

export interface HostelSectionHostel {
  hostelId: number;
  hostelName: string;
  hostelDescription: string;
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
  hostelType: string;
  latitude: number;
  longitude: number;
  googlePlaceId: string;
  hostelImages: HostelSectionHostelImage[] | null;
  meals: HostelSectionMeal[] | null;
  rooms: HostelSectionRoom[] | null;
  roomAvailability: HostelSectionRoomAvailability[] | null;
  reviews: HostelSectionReviews;
}

export interface HostelSectionApiResponse {
  code: number;
  status: string;
  message: string;
  data: HostelSectionHostel[];
  timestamp: string;
}