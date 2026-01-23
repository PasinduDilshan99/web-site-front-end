import {
  GET_ACTIVE_TOUR_DATA_FE,
  GET_ALL_TOURS_BASIC_DETAILS_DATA_FE,
  GET_POPULAR_TOUR_DATA_FE,
  GET_TOUR_DAY_TO_DAY_DETAILS_BY_ID_DATA_FE,
  GET_TOUR_DETAILS_BY_ID_DATA_FE,
  GET_TOUR_EXTRA_DETAILS_BY_ID_DATA_FE,
  GET_TOURS_DETAILS_BY_REQUEST_DATA_FE,
  GET_TOURS_HISTORY_DETAILS_DATA_FE,
  GET_TOURS_HISTORY_IMAGES_DETAILS_DATA_FE,
  GET_TOURS_REVIEWS_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";
import {
  ActiveToursType,
  ApiResponse,
  DayDetails,
  DayDetailsApiResponse,
  FilterOptions,
  PaginatedTourResponse,
  PopularTourApiResponse,
  PopularTourType,
  ReviewsApiResponse,
  Tour,
  TourDetails,
  TourExtraDetails,
  TourHistory,
  TourHistoryImage,
  TourHistoryImagesResponse,
  TourHistoryResponse,
  TourReview,
  TourReviewsResponse,
  TourSearchRequest,
} from "@/types/tour-types";

export class TourService {
  static async fetchActiveTours(): Promise<{
    data: ActiveToursType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_TOUR_DATA_FE);
      const data = await response.json();

      if (response.ok) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch active tours",
        };
      }
    } catch (err) {
      console.error("Error fetching active tours:", err);
      return {
        data: [],
        error: "Something went wrong while fetching active tours",
      };
    }
  }

  static async fetchPopularTours(): Promise<{
    data: PopularTourType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_POPULAR_TOUR_DATA_FE);
      const data: PopularTourApiResponse = await response.json();

      if (response.ok && data.code === 200) {
        const items: PopularTourType[] = data.data || [];
        const activeTours = items.filter(
          (tour) => tour.tourStatus === "ACTIVE",
        );

        return {
          data: activeTours,
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch popular tours",
        };
      }
    } catch (err) {
      console.error("Error fetching popular tours:", err);
      return {
        data: [],
        error: "Something went wrong while fetching popular tours",
      };
    }
  }

  static async searchTours(
    requestBody: TourSearchRequest,
  ): Promise<PaginatedTourResponse> {
    try {
      const response = await fetch(GET_TOURS_DETAILS_BY_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      return await response.json();
    } catch (error) {
      console.error("Error searching tours:", error);
      throw new Error("Failed to search tours");
    }
  }

  // Get filter options
  static async getFilterOptions(): Promise<FilterOptions> {
    try {
      const requestBody: TourSearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        tourType: null,
        tourCategory: null,
        season: null,
        location: null,
        pageNumber: 1,
        pageSize: 100,
      };

      const result = await this.searchTours(requestBody);

      if (result.code === 200 && result.data) {
        const types = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.tourTypeName),
          ),
        ];
        const categories = [
          ...new Set(
            result.data.tourResponseDtoList.map(
              (tour) => tour.tourCategoryName,
            ),
          ),
        ];
        const seasonsList = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.seasonName),
          ),
        ];
        const locationsList = [
          ...new Set(
            result.data.tourResponseDtoList.flatMap((tour) => [
              tour.startLocation,
              tour.endLocation,
            ]),
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.duration),
          ),
        ].sort((a, b) => a - b);

        return {
          tourTypes: types,
          tourCategories: categories,
          seasons: seasonsList,
          locations: locationsList,
          durations: durationsList,
        };
      }

      return {
        tourTypes: [],
        tourCategories: [],
        seasons: [],
        locations: [],
        durations: [],
      };
    } catch (error) {
      console.error("Error fetching filter options:", error);
      return {
        tourTypes: [],
        tourCategories: [],
        seasons: [],
        locations: [],
        durations: [],
      };
    }
  }

  // Get tour history
  static async getTourHistory(): Promise<TourHistoryResponse> {
    try {
      const response = await fetch(GET_TOURS_HISTORY_DETAILS_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching tour history:", error);
      throw new Error("Failed to load tour history");
    }
  }

  // Get tour history images
  static async getTourHistoryImages(): Promise<TourHistoryImagesResponse> {
    try {
      const response = await fetch(GET_TOURS_HISTORY_IMAGES_DETAILS_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching tour history images:", error);
      throw new Error("Failed to load tour images");
    }
  }

  // Get tour reviews
  static async getTourReviews(): Promise<TourReviewsResponse> {
    try {
      const response = await fetch(GET_TOURS_REVIEWS_DETAILS_DATA_FE, {
        method: "GET",
        headers: {
           "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching tour reviews:", error);
      throw new Error("Failed to load reviews");
    }
  }

//
  // Get tour details
  static async getTourDetails(tourId: string): Promise<{
    data: TourDetails | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOUR_DETAILS_BY_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: data.message || "Failed to fetch tour details",
        };
      }
    } catch (err) {
      console.error("Error fetching tour details:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Get tour reviews
  static async getTourReviewsById(tourId: string): Promise<{
    data: TourReview[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOURS_REVIEWS_DETAILS_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ReviewsApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch tour reviews",
        };
      }
    } catch (err) {
      console.error("Error fetching tour reviews:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Get day-wise details
  static async getDayWiseDetails(tourId: string): Promise<{
    data: DayDetails[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOUR_DAY_TO_DAY_DETAILS_BY_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DayDetailsApiResponse = await response.json();
      
      if (data.code === 200) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch day-wise details",
        };
      }
    } catch (err) {
      console.error("Error fetching day-wise details:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  // Get tour extra details
  static async getTourExtraDetails(tourId: string): Promise<{
    data: TourExtraDetails | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOUR_EXTRA_DETAILS_BY_ID_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Tour Extra Details:", data);

      if (data.code === 200) {
        return {
          data: data.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: "Failed to load tour additional details",
        };
      }
    } catch (err) {
      console.error("Error fetching tour extra details:", err);
      return {
        data: null,
        error: "Failed to load tour additional details",
      };
    }
  }

  // Get tour history
  static async getTourHistoryById(tourId: string): Promise<{
    data: TourHistory[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOURS_HISTORY_DETAILS_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.code === 200) {
        return {
          data: result.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to load tour history",
        };
      }
    } catch (err) {
      console.error("Error fetching tour history:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load tour history",
      };
    }
  }

  // Get tour history images
  static async getTourHistoryImagesById(tourId: string): Promise<{
    data: TourHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_TOURS_HISTORY_IMAGES_DETAILS_DATA_FE}/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.code === 200) {
        return {
          data: result.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: result.message || "Failed to load tour images",
        };
      }
    } catch (err) {
      console.error("Error fetching tour history images:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load tour images",
      };
    }
  }


    static async fetchAllToursBasicDetails(): Promise<{
    tours: Tour[];
    error: string | null;
  }> {
    try {
      const response = await fetch(
        GET_ALL_TOURS_BASIC_DETAILS_DATA_FE,
        {
          headers: {
           
          },
        }
      );
      const result = await response.json();

      if (result.code === 200) {
        return {
          tours: result.data || [],
          error: null,
        };
      } else {
        return {
          tours: [],
          error: result.message || "Failed to fetch tours",
        };
      }
    } catch (err) {
      console.error("Error fetching tours:", err);
      return {
        tours: [],
        error: err instanceof Error ? err.message : "Failed to fetch tours",
      };
    }
  }
  
}
