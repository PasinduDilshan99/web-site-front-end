import { 
  FaqApiResponse, 
  FaqItem, 
  InsertFAQErrorResponseType, 
  InsertFAQRequestType, 
  InsertFAQSuccessResponseType, 
  OptionsApiResponse, 
  UpdateViewCountResponse, 
  ValidationError
} from "@/types/faq-types";
import { ADD_FAQ_REQUEST_DATA_FE, GET_ACTIVE_FAQ_DATA_FE, GET_FAQ_OPTIONS_DATA_FE, UPDATE_FAQ_VIEW_COUNT_DATA_FE } from "@/utils/frontEndConstant";

export class FaqService {
  // Fetch all FAQ data
  static async fetchAllFaqs(): Promise<{
    data: FaqItem[];
    error: string | null;
    code?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_FAQ_DATA_FE);
      const result: FaqApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        const activeFaqs = result.data.filter(
          (item) =>
            item.faqStatus === "VISIBLE" && item.faqStatusStatus === "ACTIVE"
        );

        return {
          data: activeFaqs,
          error: null,
          code: result.code,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to fetch FAQ items",
          code: result.code,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching FAQ items:", err);
      return {
        data: [],
        error: "Something went wrong while fetching FAQ items",
      };
    }
  }

  // Update FAQ view count
  static async updateViewCount(faqId: number): Promise<{
    success: boolean;
    viewCount?: number;
    error?: string;
    message?: string;
  }> {
    try {
      const response = await fetch(UPDATE_FAQ_VIEW_COUNT_DATA_FE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faqId }),
      });

      // Handle non-JSON responses
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const text = await response.text();
          // Try to parse as JSON
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        return {
          success: false,
          error: errorMessage,
        };
      }

      const result: UpdateViewCountResponse = await response.json();

      if (result.code === 200) {
        return {
          success: true,
          viewCount: result.data?.viewCount,
          message: result.message,
        };
      } else {
        return {
          success: false,
          error: result.message || "Failed to update view count",
          message: result.message,
        };
      }
    } catch (err) {
      console.error("Error updating FAQ view count:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to update view count",
      };
    }
  }

   static async incrementViewCount(faqId: number): Promise<boolean> {
    try {
      const result = await this.updateViewCount(faqId);
      return result.success;
    } catch (err) {
      console.error("Error incrementing view count:", err);
      return false;
    }
  }

    // === Contact Support Methods ===
  static async fetchContactOptions(): Promise<{
    categories: string[];
    responseTime: string;
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_FAQ_OPTIONS_DATA_FE);
      const result: OptionsApiResponse = await response.json();

      if (result.code === 200 && result.data) {
        let categories: string[] = ["general", "technical", "billing", "feature", "bug"];
        let responseTime = "2";

        // Find the contact_form_categories option
        const categoriesOption = result.data.find(
          (option) => option.optionKey === "contact_form_categories"
        );
        const responseTimeOption = result.data.find(
          (option) => option.optionKey === "response_time_hours"
        );

        if (categoriesOption && categoriesOption.optionValue) {
          try {
            const parsedCategories = JSON.parse(categoriesOption.optionValue);
            if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
              categories = parsedCategories;
            }
          } catch (error) {
            console.error("Error parsing categories:", error);
          }
        }

        if (responseTimeOption) {
          responseTime = responseTimeOption.optionValue;
        }

        return {
          categories,
          responseTime,
          error: null,
        };
      } else {
        return {
          categories: ["general", "technical", "billing", "feature", "bug"],
          responseTime: "2",
          error: result.message || "Failed to fetch options",
        };
      }
    } catch (err) {
      console.error("Error fetching contact options:", err);
      return {
        categories: ["general", "technical", "billing", "feature", "bug"],
        responseTime: "2",
        error: err instanceof Error ? err.message : "Failed to fetch options",
      };
    }
  }

  static async submitContactRequest(
    formData: InsertFAQRequestType
  ): Promise<{
    success: boolean;
    message?: string;
    errors?: ValidationError[];
    error?: string;
  }> {
    try {
      const response = await fetch(ADD_FAQ_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const successData = result as InsertFAQSuccessResponseType;
        return {
          success: true,
          message: successData.data.message || "Message sent successfully!",
        };
      } else {
        if (Array.isArray(result.data)) {
          const errorData = result as InsertFAQErrorResponseType;
          return {
            success: false,
            errors: errorData.data,
            message: errorData.message,
          };
        } else {
          return {
            success: false,
            error: result.error || "Failed to send message",
          };
        }
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      };
    }
  }

  // Get filtered FAQs (for display with limits)
  static async getFilteredFaqs(
    showAll: boolean = false, 
    displayLimit?: number
  ): Promise<{
    data: FaqItem[];
    totalCount: number;
    error: string | null;
  }> {
    try {
      const { data: allFaqs, error } = await this.fetchAllFaqs();
      
      if (error) {
        return { data: [], totalCount: 0, error };
      }

      const displayedFaqs = showAll 
        ? allFaqs 
        : displayLimit 
          ? allFaqs.slice(0, displayLimit)
          : allFaqs.slice(0, 7);

      return {
        data: displayedFaqs,
        totalCount: allFaqs.length,
        error: null,
      };
    } catch (err) {
      console.error("Error getting filtered FAQs:", err);
      return {
        data: [],
        totalCount: 0,
        error: err instanceof Error ? err.message : "Failed to get filtered FAQs",
      };
    }
  }
}