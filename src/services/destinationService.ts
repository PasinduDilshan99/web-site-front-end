// service/DestinationService.ts
import {
    ApiResponse,
  ApiResponseByTourId,
  DestinationApiResponse,
  DestinationByTourId,
  DestinationCategoryApiResponse,
  DestinationCategoryType,
  DestinationData,
  DestinationHistoryImage,
  DestinationHistoryType,
  DestinationListResponse,
  DestinationSearchRequest,
  ExtendedActivityByTourId,
  NewDestinationsApiResponse,
  NewDestinationsType,
  PaginatedDestinationResponse,
  PopularDestinationsType,
  Review,
  TourMapApiResponse,
  TourMapDestination,
  TrendingDestinationsApiResponse,
  TrendingDestinationType,
} from "@/types/destination-types";
import {
  GET_ACTIVE_DESTINATIONS_CATEGORIES_FE,
  GET_ACTIVE_DESTINATIONS_DATA_FE,
  GET_ACTIVE_DESTINATIONS_FOR_TOUR_MAP_DATA_DE,
  GET_DESTINATIONS_DETAILS_BY_ID_DATA_FE,
  GET_DESTINATIONS_DETAILS_BY_REQUEST_DATA_FE,
  GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA_FE,
  GET_DESTINATIONS_HISTORY_DETAILS_DATA_FE,
  GET_DESTINATIONS_HISTORY_IMAGES_DETAILS_DATA_FE,
  GET_DESTINATIONS_REVIEWS_DETAILS_DATA_FE,
  GET_NEW_DESTINATIONS_DATA_FE,
  GET_POPULAR_DESTINATIONS_DATA_FE,
  GET_TRENDING_DESTINATIONS_DATA_FE,
} from "@/utils/frontEndConstant";

export class DestinationService {
  static async fetchActiveDestinations(): Promise<{
    data: DestinationData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_DESTINATIONS_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend returned error:", text);
        return {
          data: [],
          error: "Failed to fetch data from backend",
        };
      }

      const apiResponse: DestinationApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        return {
          data: apiResponse.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch destinations",
        };
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return {
        data: [],
        error: "Something went wrong while fetching destinations",
      };
    }
  }

  static async fetchAllDestinationCategories(): Promise<{
    data: DestinationCategoryType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_DESTINATIONS_CATEGORIES_FE);
      const apiResponse: DestinationCategoryApiResponse = await response.json();

      if (response.ok && apiResponse.code === 200) {
        const items: DestinationCategoryType[] = apiResponse.data || [];
        const activeCategories = items.filter(
          (item) => item.categoryStatus === "ACTIVE",
        );
        return {
          data: activeCategories,
          error: null,
        };
      } else {
        return {
          data: [],
          error:
            apiResponse.message || "Failed to fetch destinations categories",
        };
      }
    } catch (err) {
      console.error("Error fetching destinations categories:", err);
      return {
        data: [],
        error: "Something went wrong while fetching destinations categories",
      };
    }
  }

  static async fetchPopularDestinations(): Promise<{
    data: PopularDestinationsType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_POPULAR_DESTINATIONS_DATA_FE);
      const data = await response.json();

      if (response.ok) {
        const items: PopularDestinationsType[] = data.data || [];
        const activePopularDestinations = items.filter(
          (item) => item.destinationStatus === "ACTIVE",
        );
        return {
          data: activePopularDestinations,
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch popular destinations",
        };
      }
    } catch (err) {
      console.error("Error fetching popular destinations:", err);
      return {
        data: [],
        error: "Something went wrong while fetching popular destinations",
      };
    }
  }

  static async fetchNewDestinations(): Promise<{
    data: NewDestinationsType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_NEW_DESTINATIONS_DATA_FE);
      const apiResponse: NewDestinationsApiResponse = await response.json();

      if (response.ok) {
        const items: NewDestinationsType[] = apiResponse.data || [];
        // Filter only active destinations
        const activeDestinations = items.filter(
          (item) => item.destinationStatus === "ACTIVE",
        );
        return {
          data: activeDestinations,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch new destinations",
        };
      }
    } catch (err) {
      console.error("Error fetching new destinations:", err);
      return {
        data: [],
        error: "Something went wrong while fetching new destinations",
      };
    }
  }

  static async fetchTrendingDestinations(): Promise<{
    data: TrendingDestinationType[];
    error: string | null;
    currentImageIndexes: { [key: number]: number };
    isTransitioning: { [key: number]: boolean };
  }> {
    try {
      const response = await fetch(GET_TRENDING_DESTINATIONS_DATA_FE);
      const data: TrendingDestinationsApiResponse = await response.json();

      if (response.ok && data.code === 200) {
        const items: TrendingDestinationType[] = data.data || [];
        // Filter only active destinations that have valid images
        const activeTrendingDestinations = items.filter(
          (item) =>
            item.destinationStatus === "ACTIVE" &&
            item.images &&
            item.images.length > 0 &&
            item.images.some(
              (img) => img.imageUrl && img.imageUrl.trim() !== "",
            ),
        );

        // Initialize current image indexes and transition states
        const initialIndexes: { [key: number]: number } = {};
        const initialTransitions: { [key: number]: boolean } = {};
        activeTrendingDestinations.forEach((item) => {
          initialIndexes[item.destinationId] = 0;
          initialTransitions[item.destinationId] = false;
        });

        return {
          data: activeTrendingDestinations,
          error: null,
          currentImageIndexes: initialIndexes,
          isTransitioning: initialTransitions,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch trending destinations",
          currentImageIndexes: {},
          isTransitioning: {},
        };
      }
    } catch (err) {
      console.error("Error fetching trending destinations:", err);
      return {
        data: [],
        error: "Something went wrong while fetching trending destinations",
        currentImageIndexes: {},
        isTransitioning: {},
      };
    }
  }

  static async fetchActiveDestinationsLocations(): Promise<{
    data: TourMapDestination[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        GET_ACTIVE_DESTINATIONS_FOR_TOUR_MAP_DATA_DE,
      );
      const data: TourMapApiResponse = await response.json();

      if (response.ok && data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch destinations locations",
        };
      }
    } catch (err) {
      console.error("Error fetching destinations locations:", err);
      return {
        data: [],
        error: "Something went wrong while fetching destinations locations",
      };
    }
  }

  static async fetchDestinationsByTourId(tourId: number): Promise<{
    data: DestinationByTourId[];
    error: string | null;
    activities: ExtendedActivityByTourId[];
  }> {
    try {
      const response = await fetch(
        `${GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA_FE}/${tourId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const destinationsResult: ApiResponseByTourId<DestinationByTourId[]> =
        await response.json();

      if (destinationsResult.code === 200) {
        // Create ExtendedActivity objects with destination information
        const activities: ExtendedActivityByTourId[] =
          destinationsResult.data.flatMap((destination) =>
            destination.activities.map((activity) => ({
              ...activity,
              destinationName: destination.destinationName,
              destinationId: destination.destinationId,
            })),
          );

        return {
          data: destinationsResult.data,
          error: null,
          activities: activities,
        };
      } else {
        return {
          data: [],
          error: destinationsResult.message || "Failed to fetch destinations",
          activities: [],
        };
      }
    } catch (err) {
      console.error("Error fetching destinations by tour ID:", err);
      return {
        data: [],
        error: "Something went wrong while fetching destinations",
        activities: [],
      };
    }
  }

  async fetchDestinationsWithFilters(
    requestBody: DestinationSearchRequest,
  ): Promise<{
    data: DestinationListResponse | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(
        GET_DESTINATIONS_DETAILS_BY_REQUEST_DATA_FE,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        },
      );

      const result: PaginatedDestinationResponse = await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Fetch filter options
  async fetchFilterOptions(): Promise<{
    categories: string[];
    locations: string[];
    durations: number[];
  }> {
    try {
      const requestBody: DestinationSearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        destinationCategory: null,
        season: null,
        status: null,
        pageSize: 100,
        pageNumber: 1,
      };

      const { data, error } =
        await this.fetchDestinationsWithFilters(requestBody);

      if (error || !data) {
        return {
          categories: [],
          locations: [],
          durations: [],
        };
      }

      // Extract unique values for filters
      const categoriesList = [
        ...new Set(
          data.destinationResponseDtos.map((dest) => dest.categoryName),
        ),
      ];

      const locationsList = [
        ...new Set(data.destinationResponseDtos.map((dest) => dest.location)),
      ];

      const durationsList = [
        ...new Set(
          data.destinationResponseDtos.flatMap((dest) =>
            dest.activities.map((activity) =>
              Math.ceil(activity.durationHours / 24),
            ),
          ),
        ),
      ]
        .filter((duration) => duration > 0)
        .sort((a, b) => a - b);

      return {
        categories: categoriesList,
        locations: locationsList,
        durations: durationsList,
      };
    } catch (err) {
      console.error("Error fetching filter options:", err);
      return {
        categories: [],
        locations: [],
        durations: [],
      };
    }
  }

  // Fetch reviews
  async fetchReviews(): Promise<{
    data: Review[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_DESTINATIONS_REVIEWS_DETAILS_DATA_FE);
      const result: ApiResponse<Review[]> = await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load reviews",
      };
    }
  }

  // Fetch destination history
  async fetchHistory(): Promise<{
    data: DestinationHistoryType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_DESTINATIONS_HISTORY_DETAILS_DATA_FE);
      const result: ApiResponse<DestinationHistoryType[]> =
        await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      return {
        data: [],
        error:
          err instanceof Error
            ? err.message
            : "Failed to load destination history",
      };
    }
  }

  // Fetch history images
  async fetchHistoryImages(): Promise<{
    data: DestinationHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_DESTINATIONS_HISTORY_IMAGES_DETAILS_DATA_FE);
      const result: ApiResponse<DestinationHistoryImage[]> =
        await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching history images:", err);
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to load history images",
      };
    }
  }

    async fetchDestination(destinationId: string | null): Promise<{
    data: DestinationData | null;
    error: string | null;
  }> {
    if (!destinationId) {
      return {
        data: null,
        error: "Destination ID is required",
      };
    }

    try {
      const response = await fetch(`${GET_DESTINATIONS_DETAILS_BY_ID_DATA_FE}/${destinationId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch destination: ${response.status}`);
      }

      const result: ApiResponse<DestinationData> = await response.json();
      
      return {
        data: result.data,
        error: null,
      };
    } catch (err) {
      console.error("Error fetching destination:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Fetch destination reviews
  async fetchDestinationReviews(destinationId: string | null): Promise<{
    data: Review[];
    error: string | null;
  }> {
    if (!destinationId) {
      return {
        data: [],
        error: "Destination ID is required",
      };
    }

    try {
      const response = await fetch(`${GET_DESTINATIONS_REVIEWS_DETAILS_DATA_FE}/${destinationId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }

      const result: ApiResponse<Review[]> = await response.json();
      
      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching destination reviews:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load reviews",
      };
    }
  }

  // Fetch destination history
  async fetchDestinationHistory(destinationId: string | null): Promise<{
    data: DestinationHistoryType[];
    error: string | null;
  }> {
    if (!destinationId) {
      return {
        data: [],
        error: "Destination ID is required",
      };
    }

    try {
      const response = await fetch(`${GET_DESTINATIONS_HISTORY_DETAILS_DATA_FE}/${destinationId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch destination history: ${response.status}`);
      }

      const result: ApiResponse<DestinationHistoryType[]> = await response.json();
      
      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching destination history:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load destination history",
      };
    }
  }

  // Fetch destination history images
  async fetchDestinationHistoryImages(destinationId: string | null): Promise<{
    data: DestinationHistoryImage[];
    error: string | null;
  }> {
    if (!destinationId) {
      return {
        data: [],
        error: "Destination ID is required",
      };
    }

    try {
      const response = await fetch(`${GET_DESTINATIONS_HISTORY_IMAGES_DETAILS_DATA_FE}/${destinationId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch destination history images: ${response.status}`);
      }

      const result: ApiResponse<DestinationHistoryImage[]> = await response.json();
      
      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message,
        };
      }
    } catch (err) {
      console.error("Error fetching destination history images:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load destination history images",
      };
    }
  }

  // Generate mock rating (4.0 - 5.0)
  static generateMockRating(destinationId: number): number {
    const baseRating = 4.0;
    const variation = (destinationId % 11) / 10; // 0.0 to 1.0
    return Math.round((baseRating + variation) * 10) / 10;
  }

  // Generate mock popularity (1-100)
  static generateMockPopularity(destinationId: number): number {
    return (destinationId % 100) + 1;
  }
}
