export interface PendingToursResponse {
  code: number;
  status: string;
  message: string;
  data: PendingTour[];
  timestamp: string;
}

export interface PendingTour {
  bookingId: number;
  bookingReference: string;
  bookingDate: string;
  bookingStatus: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourDuration: number;
  startLocation: string;
  endLocation: string;
  // tourType: string;
  // tourCategory: string;
  packageName: string;
  packageDescription: string;
  packageTotalPrice: number;
  discountPercentage: number;
  packagePricePerPerson: number;
  username: string;
  userFullName: string;
  email: string;
  mobileNumber1: string;
}
