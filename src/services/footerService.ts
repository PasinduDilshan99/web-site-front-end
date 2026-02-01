import { GET_ACTIVE_FOOTER_DATA_FE } from "@/utils/frontEndConstant";
import { FooterApiResponse, FooterData } from "@/types/footer-types";

export class FooterService {
  static async fetchFooterData(): Promise<{
    data: FooterData | null;
    error: string | null;
    code?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_FOOTER_DATA_FE);
      const result: FooterApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        return {
          data: result.data,
          error: null,
          code: result.code,
          message: result.message,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to fetch footer data",
          code: result.code,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching footer data:", err);
      return {
        data: null,
        error: "Something went wrong while fetching footer data",
      };
    }
  }
}