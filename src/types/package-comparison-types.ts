// Types based on your API responses
export interface PackageImage {
  imageId: number;
  name: string;
  description: string;
  url: string;
}

export interface PackageInclusion {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface PackageExclusion {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface PackageCondition {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface TravelTip {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  status: string;
}

export interface ExtraDetails {
  packageId: number;
  inclusions: PackageInclusion[];
  exclusions: PackageExclusion[];
  conditions: PackageCondition[];
  travelTips: TravelTip[];
}

export interface PackageDayByDay {
  packageDayAccommodationId: number;
  dayNumber: number;
  breakfast: boolean;
  breakfastDescription: string | null;
  lunch: boolean;
  lunchDescription: string | null;
  dinner: boolean;
  dinnerDescription: string | null;
  morningTea: boolean;
  morningTeaDescription: string | null;
  eveningTea: boolean;
  eveningTeaDescription: string | null;
  snacks: boolean;
  snackNote: string | null;
  otherNotes: string | null;
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
  hotelWebsite: string;
  hotelCategory: number;
  hotelType: string;
  hotelLocation: string;
  hotelLatitude: number;
  hotelLongitude: number;
  transportId: number;
  vehicleRegistrationNumber: string;
  vehicleTypeName: string;
  vehicleModel: string;
  seatCapacity: number;
  airCondition: boolean;
}

export interface PackageComparison {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  images: PackageImage[];
  packageDayByDayDtoList: PackageDayByDay[];
  extraDetails: ExtraDetails;
}

export interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}
export interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

export interface TourDetails {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourTypeName: string;
  tourTypeDescription: string;
  tourCategoryName: string;
  tourCategoryDescription: string;
  seasonName: string;
  seasonDescription: string;
  statusName: string;
  schedules: Schedule[];
  images: TourImage[];
}

export interface Tour {
  tourDetails: TourDetails;
  images: TourImage[];
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}