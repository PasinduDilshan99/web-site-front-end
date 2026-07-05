import { InquiryRequest, InquiryResponse } from "@/types/inquiry-types";
import { ADD_INQUIRY_DATA_FE } from "@/utils/frontEndConstant";

export class InquiryService {

  // Create a new inquiry
  static async createInquiry(
    inquiryData: InquiryRequest,
    authToken?: string
  ): Promise<{
    data: InquiryResponse | null;
    error: string | null;
  }> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const response = await fetch(ADD_INQUIRY_DATA_FE, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(inquiryData),
      });

      const result: InquiryResponse = await response.json();

      if (response.ok && result.code === 200) {
        return {
          data: result,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to create inquiry",
        };
      }
    } catch (err) {
      console.error("Error creating inquiry:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create inquiry",
      };
    }
  }


}