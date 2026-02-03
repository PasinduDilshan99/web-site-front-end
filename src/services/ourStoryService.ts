import { OurStoryApiResponse, OurStoryData } from "@/types/our-story-types";
import { GET_OUR_STORY_DETAILS_DATA_FE } from "@/utils/frontEndConstant";

export class OurStoryService {
  // Get our story details
  static async fetchOurStoryData(): Promise<{
    data: OurStoryData | null;
    error: string | null;
    code?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_OUR_STORY_DETAILS_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: OurStoryApiResponse = await response.json();

      if (result.code === 200 && result.data) {
        const sortedTimelines = [...result.data.timelines].sort(
          (a, b) => a.orderNo - b.orderNo,
        );
        const sortedCoreValues = [...result.data.coreValues].sort(
          (a, b) => a.orderNo - b.orderNo,
        );

        return {
          data: {
            timelines: sortedTimelines,
            coreValues: sortedCoreValues,
          },
          error: null,
          code: result.code,
          message: result.message,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to fetch data",
          code: result.code,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching Our Story data:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An unknown error occurred",
      };
    }
  }
}
