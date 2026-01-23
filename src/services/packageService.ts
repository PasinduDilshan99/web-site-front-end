import {
  Package,
  PackagesApiResponse,
  PackageExtraDetailsData,
  PackageExtraDetailsApiResponse,
  PackageSchedulesData,
  PackageSchedulesApiResponse,
} from "@/types/package-types";
import { GET_PACKAGE_DETAILS_BY_TOUR_ID_DATA_FE, GET_PACKAGE_EXTRA_DETAILS_BY_TOUR_ID_DATA_FE, GET_PACKAGE_SCHEDULES_DETAILS_BY_TOUR_ID_DATA_FE } from "@/utils/frontEndConstant";

export class PackageService {
  // Get packages for a tour
  static async getTourPackages(tourId: string): Promise<{
    data: Package[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_PACKAGE_DETAILS_BY_TOUR_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PackagesApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch packages",
        };
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Get package extra details
  static async getPackageExtraDetails(tourId: string): Promise<{
    data: PackageExtraDetailsData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_PACKAGE_EXTRA_DETAILS_BY_TOUR_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PackageExtraDetailsApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch package extra details",
        };
      }
    } catch (err) {
      console.error("Error fetching package extra details:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Get package schedules
  static async getPackageSchedules(tourId: string): Promise<{
    data: PackageSchedulesData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_PACKAGE_SCHEDULES_DETAILS_BY_TOUR_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PackageSchedulesApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch package schedules",
        };
      }
    } catch (err) {
      console.error("Error fetching package schedules:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }
}