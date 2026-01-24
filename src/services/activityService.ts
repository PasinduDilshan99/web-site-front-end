import {
  GET_ACTIVE_ACTIVITIES_DETAILS_DATA_FE,
  GET_ACTIVE_ACTIVITY_CATEGORIES_DATA_FE,
  GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA_FE,
  GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID_DATA_FE,
  GET_ACTIVITY_HISTORY_DETAILS_DATA_FE,
  GET_ACTIVITY_HISTORY_IMAGES_DETAILS_DATA_FE,
  GET_ACTIVITY_REVIEWS_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";
import {
  ActiveActivitiesCategoriesType,
  ActiveActivitiesType,
  ActivityCategoriesApiResponse,
  ActivityData,
  ActivityHistory,
  ActivityHistoryImage,
  ActivitySearchRequest,
  HistoryImagesResponse,
  HistoryResponse,
  PaginatedActivityResponse,
  Review,
  ReviewsResponse,
} from "@/types/activity-types";

export class ActivityService {
  static async fetchActiveActivities(): Promise<{
    data: ActiveActivitiesType[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITIES_DETAILS_DATA_FE);
      const data = await response.json();

      if (response.ok) {
        return {
          data: data.data || [],
          error: null,
          message: data.message,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch active activities",
          message: data.message,
        };
      }
    } catch (err) {
      console.error("Error fetching active activities:", err);
      return {
        data: [],
        error: "Something went wrong while fetching active activities",
      };
    }
  }

  static async fetchActiveActivitiesCategories(): Promise<{
    data: ActiveActivitiesCategoriesType[];
    error: string | null;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_CATEGORIES_DATA_FE);
      const data: ActivityCategoriesApiResponse = await response.json();

      if (response.ok && data.code === 200) {
        const activeCategories = data.data.filter(
          (category) => category.categoryStatus === "ACTIVE",
        );

        return {
          data: activeCategories,
          error: null,
          message: data.message,
        };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch activity categories",
          message: data.message,
        };
      }
    } catch (err) {
      console.error("Error fetching activity categories:", err);
      return {
        data: [],
        error: "Something went wrong while fetching activity categories",
      };
    }
  }

  // Get colors for categories
  static getCategoryColors(categoryName: string): {
    color: string;
    hoverColor: string;
  } {
    const categoryColors: {
      [key: string]: { color: string; hoverColor: string };
    } = {
      Adventure: { color: "#EF4444", hoverColor: "#DC2626" },
      "Water Sports": { color: "#3B82F6", hoverColor: "#2563EB" },
      Wildlife: { color: "#10B981", hoverColor: "#059669" },
      "Marine Life": { color: "#06B6D4", hoverColor: "#0891B2" },
      Sightseeing: { color: "#8B5CF6", hoverColor: "#7C3AED" },
      Hiking: { color: "#F59E0B", hoverColor: "#D97706" },
      Cultural: { color: "#F97316", hoverColor: "#EA580C" },
      Wellness: { color: "#EC4899", hoverColor: "#DB2777" },
      Photography: { color: "#6366F1", hoverColor: "#4F46E5" },
      "Food & Dining": { color: "#84CC16", hoverColor: "#65A30D" },
    };

    const defaultColors = { color: "#6B7280", hoverColor: "#4B5563" };
    return categoryColors[categoryName] || defaultColors;
  }

  // Convert hex to rgba
  static hexToRgba(hex: string, opacity: number): string {
    if (!hex) return `rgba(107, 114, 128, ${opacity})`;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Get primary image for category
  static getPrimaryImage(category: ActiveActivitiesCategoriesType): string {
    if (category.images && category.images.length > 0) {
      return category.images[0].imageUrl;
    }

    // Fallback placeholder image based on category
    const placeholderImages: { [key: string]: string } = {
      Adventure: "/api/placeholder/400/300?text=Adventure",
      "Water Sports": "/api/placeholder/400/300?text=Water+Sports",
      Wildlife: "/api/placeholder/400/300?text=Wildlife",
      "Marine Life": "/api/placeholder/400/300?text=Marine+Life",
      Sightseeing: "/api/placeholder/400/300?text=Sightseeing",
      Hiking: "/api/placeholder/400/300?text=Hiking",
      Cultural: "/api/placeholder/400/300?text=Cultural",
      Wellness: "/api/placeholder/400/300?text=Wellness",
      Photography: "/api/placeholder/400/300?text=Photography",
      "Food & Dining": "/api/placeholder/400/300?text=Food+Dining",
    };

    return (
      placeholderImages[category.categoryName] ||
      "/api/placeholder/400/300?text=Activity"
    );
  }


  static async fetchFilterOptions(): Promise<{
    categories: string[];
    seasons: string[];
    durations: number[];
    participantsOptions: number[];
    statuses: string[];
    error: string | null;
  }> {
    try {
      const requestBody: ActivitySearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        activityCategory: null,
        season: null,
        status: null,
        pageSize: 100,
        pageNumber: 1,
      };

      const response = await fetch(GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result: PaginatedActivityResponse = await response.json();

      if (result.code === 200 && result.data) {
        // Extract unique values for filters
        const categoriesList = [
          ...new Set(
            result.data.activityResponseDtos.map(
              (activity) => activity.category_name
            )
          ),
        ];
        const seasonsList = [
          ...new Set(
            result.data.activityResponseDtos.flatMap((activity) =>
              activity.season.split(",").map((s) => s.trim())
            )
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.activityResponseDtos.map((activity) =>
              Math.ceil(activity.duration_hours)
            )
          ),
        ].sort((a, b) => a - b);
        const participantsList = [
          ...new Set(
            result.data.activityResponseDtos.map(
              (activity) => activity.max_participate
            )
          ),
        ].sort((a, b) => a - b);
        const statusesList = [
          ...new Set(
            result.data.activityResponseDtos.map((activity) => activity.status)
          ),
        ];

        return {
          categories: categoriesList,
          seasons: seasonsList,
          durations: durationsList,
          participantsOptions: participantsList,
          statuses: statusesList,
          error: null,
        };
      } else {
        return {
          categories: [],
          seasons: [],
          durations: [],
          participantsOptions: [],
          statuses: [],
          error: result.message || "Failed to fetch filter options",
        };
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
      return {
        categories: [],
        seasons: [],
        durations: [],
        participantsOptions: [],
        statuses: [],
        error: err instanceof Error ? err.message : "Failed to fetch filter options",
      };
    }
  }

  // Fetch activities with filters - main API call function
  static async fetchActivitiesWithFilters(
    filters: ActivitySearchRequest,
    pageSize: number,
    pageNumber: number
  ): Promise<{
    activities: ActiveActivitiesType[];
    totalActivities: number;
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters, pageSize, pageNumber }),
      });

      const result: PaginatedActivityResponse = await response.json();

      if (result.code === 200) {
        if (result.data) {
          return {
            activities: result.data.activityResponseDtos,
            totalActivities: result.data.activityCount,
            error: null,
          };
        } else {
          return {
            activities: [],
            totalActivities: 0,
            error: null,
          };
        }
      } else {
        return {
          activities: [],
          totalActivities: 0,
          error: result.message || "Failed to fetch activities",
        };
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      return {
        activities: [],
        totalActivities: 0,
        error: err instanceof Error ? err.message : "Failed to fetch activities",
      };
    }
  }

  // Fetch reviews
  static async fetchReviews(): Promise<{
    reviews: Review[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVITY_REVIEWS_DETAILS_DATA_FE);
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

  // Fetch activity history
  static async fetchActivityHistory(): Promise<{
    histories: ActivityHistory[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVITY_HISTORY_DETAILS_DATA_FE);
      const result: HistoryResponse = await response.json();

      if (result.code === 200) {
        return {
          histories: result.data,
          error: null,
        };
      } else {
        return {
          histories: [],
          error: result.message || "Failed to fetch activity history",
        };
      }
    } catch (err) {
      console.error("Error fetching activity history:", err);
      return {
        histories: [],
        error: err instanceof Error ? err.message : "Failed to fetch activity history",
      };
    }
  }

  // Fetch activity history images
  static async fetchActivityHistoryImages(): Promise<{
    historyImages: ActivityHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVITY_HISTORY_IMAGES_DETAILS_DATA_FE);
      const result: HistoryImagesResponse = await response.json();

      if (result.code === 200) {
        return {
          historyImages: result.data,
          error: null,
        };
      } else {
        return {
          historyImages: [],
          error: result.message || "Failed to fetch activity history images",
        };
      }
    } catch (err) {
      console.error("Error fetching activity history images:", err);
      return {
        historyImages: [],
        error: err instanceof Error ? err.message : "Failed to fetch activity history images",
      };
    }
  }

  // Helper to build ActivitySearchRequest from Filters
  static buildSearchRequest(filters: {
    search: string;
    priceRange: [number, number];
    duration: string;
    category: string;
    season: string;
    participants: string;
    status: string;
  }): ActivitySearchRequest {
    return {
      name: filters.search || null,
      minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
      maxPrice: filters.priceRange[1] < 10000 ? filters.priceRange[1] : null,
      duration: filters.duration ? parseFloat(filters.duration) : null,
      activityCategory: filters.category || null,
      season: filters.season || null,
      status: filters.status || null,
      pageSize: 0, // Will be overridden
      pageNumber: 0, // Will be overridden
    };
  }


    // Fetch activity details by ID
  static async fetchActivityById(activityId: string): Promise<{
    data: ActivityData | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID_DATA_FE}/${activityId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        return {
          data: null,
          error: `Failed to fetch activity: ${response.status} ${response.statusText}`,
        };
      }

      const result = await response.json();

      if (result.code === 200 && result.data) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message || "Invalid response format",
        };
      }
    } catch (err) {
      console.error("Error fetching activity:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "An error occurred while fetching activity details",
      };
    }
  }

  // Fetch activity reviews by activity ID
  static async fetchActivityReviewsById(activityId: number): Promise<{
    reviews: Review[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_ACTIVITY_REVIEWS_DETAILS_DATA_FE}/${activityId}`);

      if (!response.ok) {
        return {
          reviews: [],
          error: `Failed to fetch reviews: ${response.status}`,
        };
      }

      const result = await response.json();

      if (result.code === 200 && result.data) {
        return {
          reviews: result.data,
          error: null,
        };
      } else {
        return {
          reviews: [],
          error: result.message || "Failed to load reviews",
        };
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return {
        reviews: [],
        error: err instanceof Error ? err.message : "Failed to load reviews",
      };
    }
  }

  // Fetch activity history by activity ID
  static async fetchActivityHistoryById(activityId: number): Promise<{
    histories: ActivityHistory[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_ACTIVITY_HISTORY_DETAILS_DATA_FE}/${activityId}`);

      if (!response.ok) {
        return {
          histories: [],
          error: `Failed to fetch activity history: ${response.status}`,
        };
      }

      const result = await response.json();

      if (result.code === 200 && result.data) {
        return {
          histories: result.data,
          error: null,
        };
      } else {
        return {
          histories: [],
          error: result.message || "Failed to load activity history",
        };
      }
    } catch (err) {
      console.error("Error fetching activity history:", err);
      return {
        histories: [],
        error: err instanceof Error ? err.message : "Failed to load activity history",
      };
    }
  }

  // Fetch activity history images by activity ID
  static async fetchActivityHistoryImagesById(activityId: number): Promise<{
    historyImages: ActivityHistoryImage[];
    error: string | null;
  }> {
    try {
      const response = await fetch(`${GET_ACTIVITY_HISTORY_IMAGES_DETAILS_DATA_FE}/${activityId}`);

      if (!response.ok) {
        return {
          historyImages: [],
          error: `Failed to fetch activity images: ${response.status}`,
        };
      }

      const result = await response.json();

      if (result.code === 200 && result.data) {
        return {
          historyImages: result.data,
          error: null,
        };
      } else {
        return {
          historyImages: [],
          error: result.message || "Failed to load activity images",
        };
      }
    } catch (err) {
      console.error("Error fetching activity images:", err);
      return {
        historyImages: [],
        error: err instanceof Error ? err.message : "Failed to load activity images",
      };
    }
  }


}
