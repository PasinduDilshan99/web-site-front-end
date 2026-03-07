// types/wishlist.ts
export interface PackageWishItem {
  packageId: number;
  packageName: string;
  packageDescription: string;
  packageDate: string;
  packageImages: string[];
  packagePrice: number;
  packageColor: string;
  packageUrl: string;
  tourName: string;
  discount: number;
  status: string;
  createdAt: string;
}

export interface TourWishItem {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourStartLocation: string;
  tourEndLocation: string;
  tourImages: string[];
  season: string;
  tourUrl: string;
  status: string;
  createdAt: string;
}

export interface DestinationWishItem {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationLocation: string;
  // destinationCategory: string;
  destinationImages: string[];
  destinationUrl: string;
  status: string;
  createdAt: string;
}

export interface ActivityWishItem {
  activityId: number;
  activityName: string;
  activityDescription: string;
  // activitiesCategory: string;
  season: string;
  activityImages: string[];
  activityUrl: string;
  activityDuration: number;
  status: string;
  createdAt: string;
}

export interface WishListResponse {
  code: number;
  status: string;
  message: string;
  data: {
    packageWishResponseDtos: PackageWishItem[];
    tourWishResponsesDtos: TourWishItem[];
    destinationWishResponseDtos: DestinationWishItem[];
    activityWishResponseDtos: ActivityWishItem[];
  };
  timestamp: string;
}