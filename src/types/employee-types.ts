export interface RelatedOtherTour {
  tourId: number;
  tourName: string;
}

export interface TourAssignedEmployeeResponse {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  mobileNumber: string;
  designationName: string;
  assignMessage: string;
  relatedOtherTours: RelatedOtherTour[];
}

export interface EmployeeApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourAssignedEmployeeResponse;
  timestamp: string;
}

export interface CeoDetailsResponse {
  userId: number;
  name: string;
  title: string;
  speech: string[];
  imageUrl: string;
}

export interface CeoDetailsApiResponse {
  code: number;
  status: string;
  message: string;
  data: CeoDetailsResponse;
  timestamp: string;
}
