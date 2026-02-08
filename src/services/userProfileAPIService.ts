// services/userProfileAPIService.ts
import {
  NotificationResponse,
  UpdateNotificationRequest,
} from "@/types/user-notifications-permissions";
import { SidebarResponse, UserProfileResponse } from "../types/sidebar";
import {
  AccountSecurityResponse,
  EmailUpdateRequest,
  EmailVerifyRequest,
  MobileUpdateRequest,
  MobileVerifyRequest,
} from "@/types/account-security";
import { CancelledTour, CancelledToursResponse } from "@/types/cancelled-tours";
import { RequestedToursResponse } from "@/types/requested-tours";
import { UserBenefitsResponse } from "@/types/user-benefits";
import { UpcomingToursResponse } from "@/types/upcoming-tours";
import { CompletedToursResponse } from "@/types/completed-tours";
import { WishListResponse } from "@/types/wishlist";
import { CouponsResponse } from "@/types/coupon";
import {
  ActivityReviewAPIResponse,
  BrowsingHistoryRequest,
  DestinationReviewAPIResponse,
  HistoryResponse,
  PackageReviewAPIResponse,
  TourReviewAPIResponse,
  UserProfileReviewAPIResponse,
  WalletResponse,
} from "@/types/user-profile";
import {
  ApiResponse,
  UpdateAccountResponseData,
  UserUpdateRequest,
} from "@/types/user-profile-types";
import { BASE_PATH } from "@/utils/backEndConstant";

const API_BASE_URL = `${BASE_PATH}/api/v0/user-profile`;

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
      console.log('====================================');
      console.log(API_BASE_URL);
      console.log('====================================');
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

  async fetchContentByUrl(url: string): Promise<unknown> {
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
  async getTourReviews(): Promise<TourReviewAPIResponse> {
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

  async getActivityReviews(): Promise<ActivityReviewAPIResponse> {
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

  async getDestinationReviews(): Promise<DestinationReviewAPIResponse> {
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

  async getPackageReviews(): Promise<PackageReviewAPIResponse> {
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

  async getAllReviews(): Promise<UserProfileReviewAPIResponse> {
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

  async getWalletData(): Promise<WalletResponse> {
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

  // services/userProfileAPIService.ts
  async getBrowsingHistory(
    request?: BrowsingHistoryRequest,
  ): Promise<HistoryResponse> {
    try {
      // Use null if a value is undefined
      const body = {
        historyType: request?.historyType ?? null,
        from: request?.from ?? null,
        to: request?.to ?? null,
        noOfLastDays: request?.noOfLastDays ?? null,
        pageSize: request?.pageSize ?? 10,
        pageNumber: request?.pageNumber ?? 0,
      };

      const response = await fetch(
        `${BASE_PATH}/history-management/history-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...this.getAuthHeaders(),
          },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HistoryResponse = await response.json();
      console.log("Total records:", data.data.totalCount);
      console.log("History:", data.data.history);

      return data;
    } catch (error) {
      console.error("Error fetching browsing history:", error);
      throw error;
    }
  }

  async getUserCoupons(): Promise<CouponsResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/coupon/user-details`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user coupons:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add these methods to the existing class

  async getNotificationPermissions(): Promise<NotificationResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/user-notification-permissions/details`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching notification permissions:", error);
      throw error;
    }
  }

  async updateNotificationPermission(
    request: UpdateNotificationRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(
        `${BASE_PATH}/user-notification-permissions/update`,
        {
          method: "POST",
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating notification permission:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add these methods to the existing class

  async getAccountSecurityDetails(): Promise<AccountSecurityResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/account-security/details`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching account security details:", error);
      throw error;
    }
  }

  async requestMobileVerification(
    request: MobileVerifyRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(
        `${BASE_PATH}/account-security/mobile-verify`,
        {
          method: "POST",
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error requesting mobile verification:", error);
      throw error;
    }
  }

  async verifyMobileCode(request: MobileUpdateRequest): Promise<unknown> {
    try {
      const response = await fetch(
        `${BASE_PATH}/account-security/mobile-update`,
        {
          method: "POST",
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying mobile code:", error);
      throw error;
    }
  }

  async requestEmailVerification(
    request: EmailVerifyRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(
        `${BASE_PATH}/account-security/email-verify`,
        {
          method: "POST",
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error requesting email verification:", error);
      throw error;
    }
  }

  async verifyEmailCode(request: EmailUpdateRequest): Promise<unknown> {
    try {
      const response = await fetch(
        `${BASE_PATH}/account-security/email-update`,
        {
          method: "POST",
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying email code:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to the existing class

  async getWishListDetails(): Promise<WishListResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/wish-list/details`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching wish list details:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to the existing class

  async getCompletedTours(): Promise<CompletedToursResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/booking/completed`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching completed tours:", error);
      throw error;
    }
  }
  // services/userProfileAPIService.ts
  // Add this method to the existing class

  async getUpcomingTours(): Promise<UpcomingToursResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/booking/upcoming`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching upcoming tours:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to the existing class

  async getUserBenefits(): Promise<UserBenefitsResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/user-benefits/user-profile`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user benefits:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to your existing class
  async getRequestedTours(): Promise<RequestedToursResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/booking/requested`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching requested tours:", error);
      throw error;
    }
  }

  // services/userProfileAPIService.ts
  // Add this method to your existing class
  async getCancelledTours(): Promise<CancelledToursResponse> {
    try {
      const response = await fetch(
        `${BASE_PATH}/booking/cancelled`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching cancelled tours:", error);
      throw error;
    }
  }

  async updateAccount(
    request: UserUpdateRequest,
  ): Promise<UpdateAccountResponseData> {
    try {
      const response = await fetch(`${API_BASE_URL}/update-account`, {
        method: "POST", 
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update profile");
      }

      const result: ApiResponse<UpdateAccountResponseData> =
        await response.json();

      return result.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}
