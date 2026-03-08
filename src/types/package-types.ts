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
  vehicleTypeId: number;
  vehicleTypeName: string;
  vehicleModel: string;
  vehicleSpecificationId: number;
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

export interface PackageImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
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

export interface Feature {
  featureId: number;
  featureName: string;
  featureValue: string;
  featureDescription: string;
  color: string;
  specialNote: string;
}
export interface ActivePackagesForFilters {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  pricePerPerson: number;
  packageStatus: string;
  createdAt: string;
  createdBy: number;
  packageTypeName: string;
  packageTypeDescription: string;
  packageTypeStatus: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourStatus: string;
  schedules: Schedule[];
  features: Feature[];
  images: PackageImage[];
  wish: boolean;
}

export interface ActivePackagesType {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  isWished: boolean;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  pricePerPerson: number;
  packageStatus: string;
  packageTypeName: string;
  startLocation: string;
  duration: number;
  tourId: number;
  tourName: string;
  packageFeatures: Feature[];
  packageImages: PackageImage[];
  inclusions: InclusionExclusionItem[];
  exclusions: InclusionExclusionItem[];
  conditions: InclusionExclusionItem[];
  travelTips: TravelTipItem[];
  dayAccommodationResponses: DayAccommodationResponse;
}

export interface InclusionExclusionItem {
  id: number;
  description: string;
  displayOrder: number;
  status: string;
}

export interface DayAccommodationResponse {
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

export interface TravelTipItem {
  id: number;
  title?: string;
  description?: string;
  displayOrder: number;
  status: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface PackageListResponse {
  packageCount: number;
  packageResponseDtos: ActivePackagesForFilters[];
}

export interface PaginatedPackageResponse {
  code: number;
  status: string;
  message: string;
  data: PackageListResponse | null;
  timestamp: string;
}

export interface ReviewsResponse {
  code: number;
  status: string;
  message: string;
  data: PackageReview[];
}

export interface PackageSearchRequest {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  duration: number | null;
  packageType: string | null;
  location: string | null;
  minGroupSize: number | null;
  maxGroupSize: number | null;
  fromDate: string | null;
  toDate: string | null;
  pageSize: number;
  pageNumber: number;
}

export interface PackageHistory {
  packageHistoryId: number;
  packageScheduleId: number;
  packageScheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  packageInfo: {
    packageId: number;
    packageName: string;
    tourId: number;
  };

  numberOfParticipate: number;
  rating: number;
  duration: number;
  historyDescription: string;
  color: string;
  hoverColor: string;
  startDate: string;
  endDate: string;
  historyCreatedAt: string;
  createdByUser: {
    fullName: string;
    imageUrl: string | null;
  };
  historyUpdatedAt: string;
  updatedByUser: {
    fullName: string | null;
    imageUrl: string | null;
  };
  historyTerminatedAt: string | null;
  terminatedByUser: {
    fullName: string | null;
    imageUrl: string | null;
  };
  images: PackageHistoryImage[];
}

export interface PackageHistoryResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistory[];
}

export interface HistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistoryImage[];
}

export interface PackageHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
  imageStatusName: string;
  createdAt: string;
  packageSchedule: {
    packageScheduleId: number;
    packageScheduleName: string;
  };
  packageInfo: {
    packageId: number;
    packageName: string;
    tourId: number;
  };
  createdByUser: {
    fullName: string;
    imageUrl: string | null;
  };
}

export interface ReviewImage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

export interface ReviewReaction {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdAt: string;
}

export interface CommentReaction {
  id: number;
  commentId: number;
  userId: number;
  userName: string;
  reactionType: string;
  status: string;
  createdBy: number;
  createdAt: string;
}

export interface ReviewComment {
  id: number;
  packageReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number;
  comment: string;
  status: string;
  createdAt: string;
  createdBy: number;
  reactions: CommentReaction[];
}

export interface PackageReview {
  reviewId: number;
  packageId: number;
  packageScheduleId: number;
  name: string;
  review: string;
  rating: number;
  description: string;
  status: string;
  numberOfParticipate: number;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface PackageHistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistoryImage[];
  timestamp: string;
}

export interface Tour {
  tourDetails: TourDetails;
  images: TourImage[];
}

export interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
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
export interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activitiesCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
}

export interface ExtendedActivity extends Activity {
  destinationName: string;
  destinationId: number;
}
export interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: Activity[];
  images: DestinationImage[];
}

export interface PackageScheduleImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface PackageScheduleDetails {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  status: string;
  images: PackageScheduleImage[];
}

export interface PackageSchedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageScheduleApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    packageDetails: PackageScheduleDetails;
    schedules: PackageSchedule[];
  };
  timestamp: string;
}
