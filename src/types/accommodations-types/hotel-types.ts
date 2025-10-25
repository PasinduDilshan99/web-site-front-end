// hotel-types.ts
export interface HotelSectionHotelImage {
  imageUrl: string;
  caption: string;
}

export interface HotelSectionMeal {
  mealType: string;
  mealDescription: string;
  localPrice: number;
  cuisineType: string;
  available: boolean;
}

export interface HotelSectionRoom {
  roomType: string;
  roomDescription: string;
  capacity: number;
  bedType: string;
  localPricePerNight: number;
  hasAirConditioning: boolean;
  hasTv: boolean;
  internetAccess: boolean;
}

export interface HotelSectionRoomAvailability {
  date: string;
  availableRooms: number;
}

export interface HotelSectionReview {
  rating: number;
  comment: string;
}

export interface HotelSectionReviews {
  averageRating: number;
  totalReviews: number;
  recentReviews: HotelSectionReview[];
}

export interface HotelSectionHotel {
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
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
  hotelType: string;
  latitude: number;
  longitude: number;
  googlePlaceId: string;
  hotelImages: HotelSectionHotelImage[];
  meals: HotelSectionMeal[];
  rooms: HotelSectionRoom[];
  roomAvailability: HotelSectionRoomAvailability[];
  reviews: HotelSectionReviews;
}

export interface HotelSectionApiResponse {
  code: number;
  status: string;
  message: string;
  data: HotelSectionHotel[];
  timestamp: string;
}
