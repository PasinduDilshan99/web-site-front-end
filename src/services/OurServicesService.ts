import { OurServiceDataType } from "@/types/our-services-types";
import { GET_ACTIVE_OUR_SERVICES_DATA_FE } from "@/utils/frontEndConstant";

export class OurServicesService {
  static async fetchOurServicesData(): Promise<{
    data: OurServiceDataType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_OUR_SERVICES_DATA_FE);
      const data = await response.json();

      if (response.ok) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.error || "Failed to fetch services",
        };
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      return {
        data: [],
        error: "Something went wrong while fetching services",
      };
    }
  }
}