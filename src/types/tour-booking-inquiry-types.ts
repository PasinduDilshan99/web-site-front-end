// types/tour-booking-inquiry-types.ts

export interface TourBookingInquiryRequest {
  tourId: number;
  packageId?: number | null;
  name?: string;
  email?: string;
  contactNumber?: string;
  country?: string;
}

export interface TourBookingInquiryResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

export interface CancelBookingRequest {
  bookingId: number;
  bookingStatus:string
}

export interface CancelBookingResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
    id: number;
  };
  timestamp: string;
}