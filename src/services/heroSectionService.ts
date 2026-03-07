import { GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, GET_ACTIVE_DESTINATION_HERO_SECTION_DATA_FE, GET_ACTIVE_PACKAGE_HERO_SECTION_DATA_FE, GET_ACTIVE_TOUR_HERO_SECTION_DATA_FE } from './../utils/frontEndConstant';
import {
  GET_ACTIVE_ABOUT_US_HERO_SECTION_DATA_FE,
  GET_ACTIVE_BLOG_HERO_SECTION_DATA_FE,
  GET_ACTIVE_CONTACT_US_HERO_SECTION_DATA_FE,
  GET_ACTIVE_FAQ_HERO_SECTION_DATA_FE,
  GET_ACTIVE_HOME_HERO_SECTION_DATA_FE,
} from "@/utils/frontEndConstant";
import {
  AboutUsAPIResponse,
  AboutUsHeroData,
  ActivityHeroApiResponse,
  ActivityHeroData,
  BlogHeroApiResponse,
  BlogHeroData,
  ContactUsAPIResponse,
  ContactUsHeroData,
  DestinationHeroApiResponse,
  DestinationHeroData,
  FaqHeroApiResponse,
  FaqHeroData,
  HeroSlideData,
  PackageHeroApiResponse,
  PackageHeroData,
  SeasonHeroData,
  SeasonHeroDataApiResponse,
  TourHeroApiResponse,
  TourHeroData,
  VehicleHeroData,
  VehicleHeroDataApiResponse,
  VehicleSpecificationHeroData,
  VehicleSpecificationHeroDataApiResponse,
  VehicleTypesHeroData,
  VehicleTypesHeroDataApiResponse,
} from "@/types/hero-section-types";

export class HeroSectionService {
  static async fetchAllHeroData(): Promise<{
    data: HeroSlideData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_HOME_HERO_SECTION_DATA_FE);
      const data = await response.json();

      if (response.ok) {
        return {
          data: data.data || [],
          error: null,
        };
      } else {
        return {
          data: [],
          error: data.error || "Failed to fetch hero section items",
        };
      }
    } catch (err) {
      console.error("Error fetching hero data:", err);
      return {
        data: [],
        error: "Failed to load hero content",
      };
    }
  }

  static async fetchAboutUsHeroData(): Promise<{
    data: AboutUsHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ABOUT_US_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: AboutUsAPIResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.statusName === "ACTIVE",
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch about us content",
        };
      }
    } catch (err) {
      console.error("Error fetching about us hero data:", err);
      return {
        data: [],
        error:
          err instanceof Error
            ? err.message
            : "Failed to load about us content",
      };
    }
  }

  static async fetchContactUsHeroData(): Promise<{
    data: ContactUsHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_CONTACT_US_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ContactUsAPIResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.statusName === "ACTIVE",
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch contact us content",
        };
      }
    } catch (err) {
      console.error("Error fetching contact us hero data:", err);
      return {
        data: [],
        error:
          err instanceof Error
            ? err.message
            : "Failed to load contact us content",
      };
    }
  }

  static async fetchBlogHeroData(): Promise<{
    data: BlogHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_BLOG_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: BlogHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.statusName === "ACTIVE",
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch blog content",
        };
      }
    } catch (err) {
      console.error("Error fetching blog hero data:", err);
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to load blog content",
      };
    }
  }

  static async fetchFaqHeroData(): Promise<{
    data: FaqHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_FAQ_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: FaqHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE",
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch FAQ content",
        };
      }
    } catch (err) {
      console.error("Error fetching FAQ hero data:", err);
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to load FAQ content",
      };
    }
  }

    static async fetchTourHeroData(): Promise<{
    data: TourHeroData[];
    error: string | null;
  }> {
    try {

        console.log('====================================');
        console.log("abb");
        console.log('====================================');

      const response = await fetch(GET_ACTIVE_TOUR_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: TourHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch tour content",
        };
      }
    } catch (err) {
      console.error("Error fetching tour hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load tour content",
      };
    }
  }

  static async fetchPackageHeroData(): Promise<{
    data: PackageHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_PACKAGE_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: PackageHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch packages content",
        };
      }
    } catch (err) {
      console.error("Error fetching packages hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load packages content",
      };
    }
  }

  static async fetchDestinationHeroData(): Promise<{
    data: DestinationHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_DESTINATION_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: DestinationHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch destinations content",
        };
      }
    } catch (err) {
      console.error("Error fetching destinations hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load destinations content",
      };
    }
  }


  static async fetchActivityHeroData(): Promise<{
    data: ActivityHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ActivityHeroApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch activities content",
        };
      }
    } catch (err) {
      console.error("Error fetching activities hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load activities content",
      };
    }
  }

  static async fetchVehicleHeroData(): Promise<{
    data: VehicleHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: VehicleHeroDataApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch vehicle content",
        };
      }
    } catch (err) {
      console.error("Error fetching vehicle hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load vehicles content",
      };
    }
  }

  static async fetchVehicleSpecificationHeroData(): Promise<{
    data: VehicleSpecificationHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: VehicleSpecificationHeroDataApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch vehicle specification content",
        };
      }
    } catch (err) {
      console.error("Error fetching vehicle specification hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load vehicles specification content",
      };
    }
  }

  static async fetchVehicleTypesHeroData(): Promise<{
    data: VehicleTypesHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: VehicleTypesHeroDataApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch vehicle types content",
        };
      }
    } catch (err) {
      console.error("Error fetching vehicle types hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load vehicles types content",
      };
    }
  }

  static async fetchSeasonHeroData(): Promise<{
    data: SeasonHeroData[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: SeasonHeroDataApiResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeItems = apiResponse.data.filter(
          (item) => item.status === "ACTIVE"
        );

        const sortedItems = [...activeItems].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        return {
          data: sortedItems,
          error: null,
        };
      } else {
        return {
          data: [],
          error: apiResponse.message || "Failed to fetch seasons content",
        };
      }
    } catch (err) {
      console.error("Error fetching seasons hero data:", err);
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to load seasons content",
      };
    }
  }


}
