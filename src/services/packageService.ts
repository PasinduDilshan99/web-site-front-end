import { PackageComparison } from '@/types/package-comparison-types';
import {
  Package,
  PackagesApiResponse,
  PackageExtraDetailsData,
  PackageExtraDetailsApiResponse,
  PackageSchedulesData,
  PackageSchedulesApiResponse,
  ActivePackagesType,
  ApiResponse,
  PackageSearchRequest,
  PaginatedPackageResponse,
  PackageReview,
  ReviewsResponse,
  PackageHistory,
  PackageHistoryResponse,
  PackageHistoryImage,
  HistoryImagesResponse,
  TourDetails,
  PackageHistoryImagesResponse,
  PackageScheduleDetails,
  PackageSchedule,
  PackageScheduleApiResponse,
  ActivePackagesForFilters,
} from "@/types/package-types";
import { GET_ACTIVE_PACKAGE_DETAILS_DATA_FE, GET_PACKAGE_ALL_DETAILS_BY_ID_DATA_FE, GET_PACKAGE_DETAILS_BY_ID_DATA_FE, GET_PACKAGE_DETAILS_BY_TOUR_ID_DATA_FE, GET_PACKAGE_DETAILS_FOR_COMPARE_BY_TOUR_ID_DATA_FE, GET_PACKAGE_EXTRA_DETAILS_BY_TOUR_ID_DATA_FE, GET_PACKAGE_HISTORY_DETAILS_DATA_FE, GET_PACKAGE_HISTORY_IMAGES_DETAILS_DATA_FE, GET_PACKAGE_REVIEWS_DETAILS_DATA_FE, GET_PACKAGE_SCHEDULES_DETAILS_BY_PACKAGE_ID_DATA_FE, GET_PACKAGE_SCHEDULES_DETAILS_BY_TOUR_ID_DATA_FE, GET_PACKAGES_DETAILS_FOR_REQUEST_DATA_FE } from "@/utils/frontEndConstant";

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

  static async fetchActivePackages(): Promise<{
    data: ActivePackagesForFilters[];
    error: string | null;
    code?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_PACKAGE_DETAILS_DATA_FE);
      const data: ApiResponse<ActivePackagesForFilters[]> = await response.json();

      if (response.ok && data.code === 200) {
        return {
          data: data.data || [],
          error: null,
          code: data.code,
          message: data.message,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch packages",
          code: data.code,
          message: data.message,
        };
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      return {
        data: [],
        error: "Something went wrong while fetching packages",
      };
    }
  }

static async fetchFilterOptions(): Promise<{
    packageTypes: string[];
    locations: string[];
    durations: number[];
    error: string | null;
  }> {
    try {
      const requestBody: PackageSearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        packageType: null,
        location: null,
        minGroupSize: null,
        maxGroupSize: null,
        fromDate: null,
        toDate: null,
        pageSize: 100,
        pageNumber: 1,
      };

      const response = await fetch(GET_PACKAGES_DETAILS_FOR_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result: PaginatedPackageResponse = await response.json();

      if (result.code === 200 && result.data) {
        const types = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.packageTypeName)
          ),
        ];
        const locationsList = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.startLocation)
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.duration)
          ),
        ].sort((a, b) => a - b);

        return {
          packageTypes: types,
          locations: locationsList,
          durations: durationsList,
          error: null,
        };
      } else {
        return {
          packageTypes: [],
          locations: [],
          durations: [],
          error: result.message || "Failed to fetch filter options",
        };
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
      return {
        packageTypes: [],
        locations: [],
        durations: [],
        error: err instanceof Error ? err.message : "Failed to fetch filter options",
      };
    }
  }

  // Fetch packages with filters - main API call function
  static async fetchPackagesWithFilters(
    filters: PackageSearchRequest,
    pageSize: number,
    pageNumber: number
  ): Promise<{
    packages: ActivePackagesForFilters[];
    totalPackages: number;
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_PACKAGES_DETAILS_FOR_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters, pageSize, pageNumber }),
      });

      const result: PaginatedPackageResponse = await response.json();

      if (result.code === 200) {
        if (result.data) {
          return {
            packages: result.data.packageResponseDtos,
            totalPackages: result.data.packageCount,
            error: null,
          };
        } else {
          return {
            packages: [],
            totalPackages: 0,
            error: null,
          };
        }
      } else {
        return {
          packages: [],
          totalPackages: 0,
          error: result.message || "Failed to fetch packages",
        };
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      return {
        packages: [],
        totalPackages: 0,
        error: err instanceof Error ? err.message : "Failed to fetch packages",
      };
    }
  }

  // Fetch package reviews
  static async fetchReviews(): Promise<{
    reviews: PackageReview[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_PACKAGE_REVIEWS_DETAILS_DATA_FE);
      const result: ReviewsResponse = await response.json();

      if (result.code === 200) {
        return {
          reviews: result.data,
          error: null,
        };
      } else {
        return {
          reviews: [],
          error: result.message || "Failed to fetch reviews",
        };
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return {
        reviews: [],
        error: err instanceof Error ? err.message : "Failed to fetch reviews",
      };
    }
  }

  // Fetch package history
  static async fetchHistory(): Promise<{
    history: PackageHistory[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_PACKAGE_HISTORY_DETAILS_DATA_FE);
      const result: PackageHistoryResponse = await response.json();

      if (result.code === 200) {
        return {
          history: result.data,
          error: null,
        };
      } else {
        return {
          history: [],
          error: result.message || "Failed to fetch history",
        };
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      return {
        history: [],
        error: err instanceof Error ? err.message : "Failed to fetch history",
      };
    }
  }

  // Fetch package history images
  static async fetchHistoryImages(): Promise<{
    historyImages: PackageHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_PACKAGE_HISTORY_IMAGES_DETAILS_DATA_FE);
      const result: HistoryImagesResponse = await response.json();

      if (result.code === 200) {
        return {
          historyImages: result.data,
          error: null,
        };
      } else {
        return {
          historyImages: [],
          error: result.message || "Failed to fetch history images",
        };
      }
    } catch (err) {
      console.error("Error fetching history images:", err);
      return {
        historyImages: [],
        error: err instanceof Error ? err.message : "Failed to fetch history images",
      };
    }
  }

  // Helper to build PackageSearchRequest from Filters
  static buildSearchRequest(filters: {
    search: string;
    priceRange: [number, number];
    duration: string;
    packageType: string;
    location: string;
    minPersons: string;
    maxPersons: string;
    startDate: string;
    endDate: string;
  }): PackageSearchRequest {
    return {
      name: filters.search || null,
      minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
      maxPrice: filters.priceRange[1] < 100000 ? filters.priceRange[1] : null,
      duration: filters.duration ? parseInt(filters.duration) : null,
      packageType: filters.packageType || null,
      location: filters.location || null,
      minGroupSize: filters.minPersons ? parseInt(filters.minPersons) : null,
      maxGroupSize: filters.maxPersons ? parseInt(filters.maxPersons) : null,
      fromDate: filters.startDate || null,
      toDate: filters.endDate || null,
      pageSize: 0, // Will be overridden
      pageNumber: 0, // Will be overridden
    };
  }


    // Fetch package details by ID
  static async fetchPackageDetails(packageId: string | number): Promise<{
    data: ActivePackagesType | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_DETAILS_BY_ID_DATA_FE}/${packageId}`
      );
      const result: ApiResponse<ActivePackagesType> = await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to fetch package details",
        };
      }
    } catch (err) {
      console.error("Error fetching package details:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch package details",
      };
    }
  }

    static async fetchPackageAllDetails(packageId: string | number): Promise<{
    data: ActivePackagesType | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_ALL_DETAILS_BY_ID_DATA_FE}/${packageId}`
      );
      const result: ApiResponse<ActivePackagesType> = await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to fetch package details",
        };
      }
    } catch (err) {
      console.error("Error fetching package details:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch package details",
      };
    }
  }

  // Fetch tour details by ID
  // static async fetchTourDetails(tourId: number): Promise<{
  //   data: TourDetails | null;
  //   error: string | null;
  // }> {
  //   try {
  //     const response = await fetch(
  //       `${GET_TOUR_DETAILS_BY_ID_BE}/${tourId}`
  //     );
  //     const result: ApiResponse<TourDetails> = await response.json();

  //     if (result.code === 200) {
  //       return {
  //         data: result.data,
  //         error: null,
  //       };
  //     } else {
  //       return {
  //         data: null,
  //         error: result.message || "Failed to fetch tour details",
  //       };
  //     }
  //   } catch (err) {
  //     console.error("Error fetching tour details:", err);
  //     return {
  //       data: null,
  //       error: err instanceof Error ? err.message : "Failed to fetch tour details",
  //     };
  //   }
  // }

  // Fetch reviews for a package
  static async fetchPackageReviewsById(packageId: string | number): Promise<{
    reviews: PackageReview[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_REVIEWS_DETAILS_DATA_FE}/${packageId}`
      );
      const result: ReviewsResponse = await response.json();

      if (result.code === 200) {
        return {
          reviews: result.data,
          error: null,
        };
      } else {
        return {
          reviews: [],
          error: result.message || "Failed to fetch reviews",
        };
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return {
        reviews: [],
        error: err instanceof Error ? err.message : "Failed to fetch reviews",
      };
    }
  }

  // Fetch package history
  static async fetchPackageHistoryById(packageId: string | number): Promise<{
    history: PackageHistory[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_HISTORY_DETAILS_DATA_FE}/${packageId}`
      );
      const result: PackageHistoryResponse = await response.json();

      if (result.code === 200) {
        return {
          history: result.data,
          error: null,
        };
      } else {
        return {
          history: [],
          error: result.message || "Failed to fetch package history",
        };
      }
    } catch (err) {
      console.error("Error fetching package history:", err);
      return {
        history: [],
        error: err instanceof Error ? err.message : "Failed to fetch package history",
      };
    }
  }

  // Fetch package history images
  static async fetchPackageHistoryImagesById(packageId: string | number): Promise<{
    historyImages: PackageHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_HISTORY_IMAGES_DETAILS_DATA_FE}/${packageId}`
      );
      const result: PackageHistoryImagesResponse = await response.json();

      if (result.code === 200) {
        return {
          historyImages: result.data,
          error: null,
        };
      } else {
        return {
          historyImages: [],
          error: result.message || "Failed to fetch package history images",
        };
      }
    } catch (err) {
      console.error("Error fetching history images:", err);
      return {
        historyImages: [],
        error: err instanceof Error ? err.message : "Failed to fetch history images",
      };
    }
  }

  static async fetchPackagesForComparison(tourId: number): Promise<{
    packages: PackageComparison[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_DETAILS_FOR_COMPARE_BY_TOUR_ID_DATA_FE}/${tourId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: ApiResponse<PackageComparison[]> = await response.json();

      if (result.code === 200) {
        return {
          packages: result.data || [],
          error: null,
        };
      } else {
        return {
          packages: [],
          error: result.message || "Failed to fetch packages for comparison",
        };
      }
    } catch (err) {
      console.error("Error fetching packages for comparison:", err);
      return {
        packages: [],
        error: err instanceof Error ? err.message : "Failed to fetch packages",
      };
    }
  }


  static async fetchPackageScheduleDetails(packageId: string): Promise<{
    packageDetails: PackageScheduleDetails | null;
    schedules: PackageSchedule[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_PACKAGE_SCHEDULES_DETAILS_BY_PACKAGE_ID_DATA_FE}/${packageId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        return {
          packageDetails: null,
          schedules: [],
          error: `Failed to fetch package data: ${response.status}`,
        };
      }

      const data: PackageScheduleApiResponse = await response.json();

      if (data.code === 200) {
        return {
          packageDetails: data.data.packageDetails,
          schedules: data.data.schedules || [],
          error: null,
        };
      } else {
        return {
          packageDetails: null,
          schedules: [],
          error: data.message || "Failed to retrieve package data",
        };
      }
    } catch (err) {
      console.error("Error fetching package schedule:", err);
      return {
        packageDetails: null,
        schedules: [],
        error: err instanceof Error ? err.message : "An unknown error occurred",
      };
    }
  }

}