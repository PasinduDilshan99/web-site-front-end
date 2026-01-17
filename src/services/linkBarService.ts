import { LinkBarApiResponse, LinkBarItem } from "@/types/link-bar-types";
import { GET_ACTIVE_LINK_BAR_DATA } from "@/utils/backEndConstant";

export class LinkBarService {
  static async fetchAllLinkBarData(): Promise<{
    data: LinkBarItem[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_LINK_BAR_DATA);
      const data : LinkBarApiResponse = await response.json();

      if (response.ok) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: "Failed to fetch link bar items",
        };
      }
    } catch (err) {
      console.error("Error fetching LinkBar items:", err);
      return {
        data: [],
        error: "Something went wrong while fetching LinkBar items",
      };
    }
  }
}