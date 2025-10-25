// In @/types/accommodations-types/restaurant-types.ts

export interface RestaurantSectionRestaurantImage {
  imageUrl: string;
  caption: string;
}

export interface RestaurantSectionDiningOption {
  mealType: string;
  mealDescription: string;
  localPrice: number;
  cuisineType: string;
  available: boolean;
}

export interface RestaurantSectionFacility {
  facilityName: string;
  description: string;
  isAvailable: boolean;
}

export interface RestaurantSectionReview {
  rating: number;
  comment: string;
  guestName: string | null;
}

export interface RestaurantSectionGuestReviews {
  averageRating: number | null;
  totalReviews: number;
  recentReviews: RestaurantSectionReview[] | null;
}

export interface RestaurantSectionRestaurant {
  restaurantId: number;
  restaurantName: string;
  restaurantDescription: string;
  address: string;
  contactNumber: string;
  email: string;
  websiteUrl: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  starRating: number;
  currencyCode: string;
  cancellationPolicy: string | null;
  totalRooms: number | null;
  parkingFacility: boolean;
  wifiAvailable: boolean;
  petFriendly: boolean;
  resortType: string;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  restaurantImages: RestaurantSectionRestaurantImage[] | null;
  diningOptions: RestaurantSectionDiningOption[] | null;
  accommodations: null;
  availability: null;
  restaurantFacilities: RestaurantSectionFacility[] | null;
  amenities: null;
  guestReviews: RestaurantSectionGuestReviews;
}

export interface RestaurantSectionApiResponse {
  code: number;
  status: string;
  message: string;
  data: RestaurantSectionRestaurant[];
  timestamp: string;
}