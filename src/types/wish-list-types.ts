// wish-list-types.ts

export interface InsertWishListRequest {
  activityId?: number;
  destinationId?: number;
  packageId?: number;
  tourId?: number;
}

export interface InsertResponseData {
  message: string;
}

export interface WishListApiResponse {
  code: number;
  status: string;
  message: string;
  data: InsertResponseData;
  timestamp: string;
}
