// In @/types/accommodations-types/resort-types.ts

export interface ResortSectionResortImage {
  imageUrl: string;
  caption: string;
}

export interface ResortSectionDiningOption {
  mealType: string;
  mealDescription: string;
  localPrice: number;
  cuisineType: string;
  available: boolean;
}

export interface ResortSectionAccommodation {
  roomType: string;
  roomDescription: string;
  capacity: number;
  bedType: string;
  localPricePerNight: number;
  hasAirConditioning: boolean;
  hasTv: boolean;
  internetAccess: boolean;
  hasBalcony: boolean | null;
  viewType: string | null;
}

export interface ResortSectionAvailability {
  date: string;
  availableRooms: number | null;
}

export interface ResortSectionFacility {
  facilityName: string;
  description: string;
  isAvailable: boolean;
}

export interface ResortSectionAmenity {
  name: string;
  description: string;
  localAdditionalCharge: number;
}

export interface ResortSectionReview {
  rating: number;
  comment: string;
  guestName: string | null;
}

export interface ResortSectionGuestReviews {
  averageRating: number | null;
  totalReviews: number;
  recentReviews: ResortSectionReview[] | null;
}

export interface ResortSectionResort {
  resortId: number;
  resortName: string;
  resortDescription: string;
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
  resortType: string;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  resortImages: ResortSectionResortImage[] | null;
  diningOptions: ResortSectionDiningOption[] | null;
  accommodations: ResortSectionAccommodation[] | null;
  availability: ResortSectionAvailability[] | null;
  resortFacilities: ResortSectionFacility[] | null;
  amenities: ResortSectionAmenity[] | null;
  guestReviews: ResortSectionGuestReviews;
}

export interface ResortSectionApiResponse {
  code: number;
  status: string;
  message: string;
  data: ResortSectionResort[];
  timestamp: string;
}