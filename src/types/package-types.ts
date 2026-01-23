export interface PackageDayAccommodation {
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

export interface Package {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  packageDayByDayDtoList: PackageDayAccommodation[];
}

export interface PackagesApiResponse {
  code: number;
  status: string;
  message: string;
  data: Package[];
  timestamp: string;
}

export interface PackageExtraDetailsItem {
  id: number;
  description?: string;
  title?: string;
  displayOrder: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface PackageExtraDetailsData {
  packageId: number;
  inclusions: PackageExtraDetailsItem[];
  exclusions: PackageExtraDetailsItem[];
  conditions: PackageExtraDetailsItem[];
  travelTips: PackageExtraDetailsItem[];
}

export interface PackageExtraDetailsApiResponse {
  code: number;
  status: string;
  message: string;
  data: PackageExtraDetailsData[];
  timestamp: string;
}

export interface PackageSchedule {
  packageScheduleId: number;
  packageId: number;
  name: string;
  assumeStartDate: string;
  assumeEndDate: string;
  description: string;
  specialNote: string;
  status: string;
  durationStart: number;
  durationEnd: number;
}

export interface PackageSchedulesData {
  packageId: number;
  packageSchedules: PackageSchedule[];
}

export interface PackageSchedulesApiResponse {
  code: number;
  status: string;
  message: string;
  data: PackageSchedulesData[];
  timestamp: string;
}