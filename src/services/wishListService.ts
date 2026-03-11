// wishListService.ts

import {
  InsertWishListRequest,
  WishListApiResponse,
} from "@/types/wish-list-types";
import {
  ADD_ACTIVITY_WISH_LIST_DATA_FE,
  ADD_DESTINATION_WISH_LIST_DATA_FE,
  ADD_PACKAGE_WISH_LIST_DATA_FE,
  ADD_TOUR_WISH_LIST_DATA_FE,
} from "@/utils/frontEndConstant";

async function postWishList(
  endpoint: string,
  body: InsertWishListRequest,
): Promise<WishListApiResponse> {
  try {
    const response = await fetch(endpoint, {
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
  addActivityWishList: (body: InsertWishListRequest) =>
    postWishList(ADD_ACTIVITY_WISH_LIST_DATA_FE, body),
  addDestinationWishList: (body: InsertWishListRequest) =>
    postWishList(ADD_DESTINATION_WISH_LIST_DATA_FE, body),
  addPackageWishList: (body: InsertWishListRequest) =>
    postWishList(ADD_PACKAGE_WISH_LIST_DATA_FE, body),
  addTourWishList: (body: InsertWishListRequest) =>
    postWishList(ADD_TOUR_WISH_LIST_DATA_FE, body),
};
