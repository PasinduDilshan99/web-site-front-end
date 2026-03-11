// services/bookingService.ts

import {
  CancelBookingRequest,
  CancelBookingResponse,
  TourBookingInquiryRequest,
  TourBookingInquiryResponse,
} from "@/types/tour-booking-inquiry-types";
import { CANCELLED_PENDING_BOOKINGS_DETAILS_DATA_FE, INSERT_BOOKINGS_INQUIRY_DETAILS_DATA_FE } from "@/utils/frontEndConstant";

export const bookingService = {
  insertBookingInquiry: async (
    payload: TourBookingInquiryRequest,
  ): Promise<TourBookingInquiryResponse> => {
    try {
      const response = await fetch(INSERT_BOOKINGS_INQUIRY_DETAILS_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TourBookingInquiryResponse = await response.json();

      return data;
    } catch (error) {
      console.error("Error inserting booking inquiry:", error);
      throw error;
    }
  },

  cancelBookingInquiry: async (
    payload: CancelBookingRequest,
  ): Promise<CancelBookingResponse> => {
    try {
      const response = await fetch(CANCELLED_PENDING_BOOKINGS_DETAILS_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CancelBookingResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error cancelling booking inquiry:", error);
      throw error;
    }
  },
};
