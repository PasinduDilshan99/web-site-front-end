import { ActiveImagesType, GalleryApiResponse } from "@/types/gallery-types";
import { GET_ACTIVE_GALLERY_IMAGES_DATA_FE } from "@/utils/frontEndConstant";

export class GalleryService {
  static async fetchOpenImages(): Promise<{
    data: ActiveImagesType[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_GALLERY_IMAGES_DATA_FE);
      const result: GalleryApiResponse = await response.json();

      if (response.ok) {
        return {
          data: result.data || [],
          error: null,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to fetch open images",
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching open images:", err);
      return {
        data: [],
        error: "Something went wrong while fetching open images",
      };
    }
  }
}