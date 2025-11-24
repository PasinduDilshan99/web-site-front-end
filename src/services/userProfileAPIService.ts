// services/userProfileAPIService.ts
import { SidebarResponse, UserProfileResponse } from "../types/sidebar";

const API_BASE_URL = "http://localhost:8080/felicita/api/v0/user-profile";

export class UserProfileAPIService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getSidebarData(): Promise<SidebarResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/side-bar`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
      throw error;
    }
  }

  async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async fetchContentByUrl(url: string): Promise<any> {
    if (!url) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching content for URL ${url}:`, error);
      throw error;
    }
  }

  // Specific review endpoints
  async getTourReviews(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/tour-reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tour reviews:", error);
      throw error;
    }
  }

  async getActivityReviews(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/activity-reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching activity reviews:", error);
      throw error;
    }
  }

  async getDestinationReviews(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/destination-reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching destination reviews:", error);
      throw error;
    }
  }

  async getPackageReviews(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/package-reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching package reviews:", error);
      throw error;
    }
  }

  async getAllReviews(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to the existing class

  async getWalletData(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/wallet`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      throw error;
    }
  }
}
