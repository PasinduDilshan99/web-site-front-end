// wishListService.ts

import { InsertWishListRequest, WishListApiResponse } from "@/types/wish-list-types";


const API_BASE = "/api/wish-list";

async function postWishList(endpoint: string, body: InsertWishListRequest): Promise<WishListApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include", // sends cookies along with request
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return response.json();
  } catch (err) {
    console.error(`Error posting to ${endpoint}:`, err);
    throw err;
  }
}

export const WishListService = {
  addActivityWishList: (body: InsertWishListRequest) => postWishList("insert-activity-wish-list", body),
  addDestinationWishList: (body: InsertWishListRequest) => postWishList("insert-destination-wish-list", body),
  addPackageWishList: (body: InsertWishListRequest) => postWishList("insert-package-wish-list", body),
  addTourWishList: (body: InsertWishListRequest) => postWishList("insert-tour-wish-list", body),
};
