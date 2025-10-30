// Base types
interface BaseEntity {
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

interface StatusEntity {
  statusId?: number;
  statusName?: string;
}

// Image related types
interface BaseImage {
  imageUrl: string;
  imageName: string;
  imageDescription?: string;
  imageCaption?: string;
}

interface ServiceProviderImage extends BaseImage {
  imageId: number;
  imageStatusId: number;
}

interface MealImage extends BaseImage {}

interface RoomImage extends BaseImage {
  roomImageUrl: string;
  roomImageName: string;
  roomImageCaption: string;
}

interface PackageImage extends BaseImage {
  packageImageUrl: string;
  packageImageName: string;
  packageImageCaption: string;
}

interface FacilityImage extends BaseImage {}

// Operating Hours
interface OperatingHours {
  hoursId: number;
  dayOfWeek: number;
  opensAt: string;
  closesAt: string;
  is24Hours: boolean;
  operatingStatusId: number;
  hoursSpecialNote?: string;
  operatingStatusName: string;
}

// Payment Methods
interface PaymentMethod {
  paymentMethodId: number;
  methodType: string;
  methodDetails: string;
  paymentMethodAvailable: boolean;
  paymentMethodStatusId: number;
}

// Nearby Destinations
interface NearbyDestination {
  destinationId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  destinationCategory: string;
  statusName: string;
  linkedDate: string;
}

// Meal Details
interface MealDetails extends BaseEntity {
  mealId: number;
  serviceProviderId: number;
  mealTypeId: number;
  description: string;
  localPrice: number;
  foreignPrice: number;
  currencyId: number;
  discountPercentage: number;
  discountRequirements?: string | null;
  servesPeople: number;
  cuisineType: string;
  dietaryTags: string;
  preparationTime?: string | null;
  isChefSpecial: boolean;
  isSpicy: boolean;
  spiceLevel?: string | null;
  servingSize?: string | null;
  calories?: number | null;
  allergens?: string | null;
  available: boolean;
  mealTypeName: string;
  currencyCode: string;
  statusName: string;
  images: MealImage[];
}

// Room Features & Amenities
interface RoomFeature {
  featureName: string;
  featureValue: string;
  featureDescription: string;
}

interface RoomAmenity {
  amenityName: string;
  amenityCategory: string;
  iconClass: string;
  amenityNotes: string;
}

interface RoomAvailability {
  availabilityDate: string;
  availableRooms: number;
  bookedRooms: number;
  localPriceForDate: number;
  foreignPriceForDate: number;
}

// Room Details - UPDATED
interface RoomDetails {
  roomId: number;
  serviceProviderId: number;
  roomTypeId?: number | null;
  roomNumber: string;
  roomDescription: string;
  capacity: number;
  roomSize: number;
  bedType: string;
  numberOfBeds?: number | null;
  numberOfBathrooms?: number | null;
  maxAdults?: number | null;
  maxChildren?: number | null;
  smokingAllowed?: boolean | null;
  isAccessible?: boolean | null;
  localPricePerNight: number;
  foreignPricePerNight: number;
  currencyId?: number | null;
  discountPercentage?: number | null;
  discountRequirements?: string | null;
  roomFloor?: number | null;
  viewType?: string | null;
  hasBalcony?: boolean | null;
  hasAirConditioning?: boolean | null;
  hasTv?: boolean | null;
  hasMinibar?: boolean | null;
  hasSafe?: boolean | null;
  hasKitchenette?: boolean | null;
  internetAccess?: string | null;
  roomQualityRating?: number | null;
  extraBedAvailable?: boolean | null;
  extraBedCharge?: number | null;
  statusId?: number | null;
  // FIXED: Added missing createdAt properties for RoomDetails
  createdAt?: string | null;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
  roomTypeName: string;
  currencyCode: string;
  roomStatus: string;
  features: RoomFeature[];
  amenities: RoomAmenity[];
  availability: RoomAvailability[];
  images: RoomImage[];
}

// Package Features & Inclusions
interface PackageFeature {
  featureName: string;
  featureValue: string;
  featureDescription: string;
}

interface PackageInclusion {
  inclusionName: string;
  inclusionDescription: string;
}

// Package Details - UPDATED
interface PackageDetails {
  serviceProviderPackageId: number;
  serviceProviderId: number;
  packageName: string;
  packageDescription: string;
  localPrice: number;
  foreignPrice: number;
  currencyId?: number | null;
  discountPercentage?: number | null;
  discountRequirements?: string | null;
  durationDays: number;
  startDate?: string | null;
  endDate?: string | null;
  minPersons: number;
  maxPersons: number;
  includesChildren?: boolean | null;
  maxChildrenIncluded?: number | null;
  isCustomizable?: boolean | null;
  bookingDeadlineDays?: number | null;
  packageCode?: string | null;
  packageCategory?: string | null;
  seasonType?: string | null;
  advanceBookingDays?: number | null;
  cancellationPolicy?: string | null;
  refundPolicy?: string | null;
  termsConditions?: string | null;
  highlights?: string | null;
  specialNote?: string | null;
  requirements?: string | null;
  statusId?: number | null;
  // FIXED: Added missing BaseEntity properties for PackageDetails
  createdAt?: string | null;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
  currencyCode: string;
  packageStatus: string;
  features: PackageFeature[];
  inclusions: PackageInclusion[];
  images: PackageImage[];
}

// Amenities
interface Amenity {
  providerAmenityId: number;
  amenityName: string;
  amenityDescription: string;
  localAdditionalCharge: number;
  foreignAdditionalCharge: number;
  isAvailable: boolean;
  amenityTypeName: string;
  amenityCategory: string;
  iconClass: string;
  currencyCode: string;
  statusName: string;
}

// Facilities
interface Facility {
  facilityId: number;
  facilityName: string;
  facilityDescription: string;
  isAvailable: boolean;
  specialNote?: string;
  images: FacilityImage[];
}

// Seasonal Pricing
interface SeasonalPricing {
  seasonalPriceId: number;
  seasonName: string;
  startDate: string;
  endDate: string;
  localMultiplier: number;
  foreignMultiplier: number;
  description: string;
  requirements?: string | null;
  specialNote?: string | null;
  statusName: string;
}

// Contact Persons
interface ContactPerson {
  contactPersonId: number;
  fullName: string;
  designation: string;
  email: string;
  phone: string;
  mobile: string;
  isPrimary: boolean;
  statusName: string;
}

// Bank Details
interface BankDetails {
  bankId: number;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  branchName: string;
  branchCode?: string | null;
  swiftCode: string;
  iban?: string | null;
  isPrimary: boolean;
  currencyCode: string;
  statusName: string;
}

// Tax & Commission
interface TaxAndCommissionDetails {
  taxId: number;
  taxName: string;
  taxPercentage: number;
  taxNumber: string;
  taxActive: boolean;
  appliesToRooms: boolean;
  appliesToMeals: boolean;
  appliesToPackages: boolean;
  appliesToAmenities: boolean;
  taxStatus: string;
  commissionId: number;
  commissionPercentage: number;
  commissionAppliesRooms: boolean;
  commissionAppliesMeals: boolean;
  commissionAppliesPackages: boolean;
  minimumCommissionAmount: number;
  commissionStatus: string;
}

// Booking Restrictions
interface BookingRestriction {
  restrictionId: number;
  restrictionType: string;
  minStayNights?: number | null;
  maxStayNights?: number | null;
  startDate: string;
  endDate: string;
  description: string;
  statusName: string;
}

// Statistics
interface Statistics {
  statsId: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  occupancyRate: number;
  lastUpdated: string;
}

// Social Media
interface SocialMedia {
  socialId: number;
  platform: string;
  profileUrl: string;
  verificationStatusName: string;
  statusName: string;
}

// Reviews
interface RatingCategory {
  categoryRating: number;
  categoryName: string;
  categoryDescription: string;
}

interface Review {
  reviewId: number;
  overallRating: number;
  title: string;
  comment: string;
  reviewDate: string;
  isApproved: boolean;
  username: string;
  firstName: string;
  lastName: string;
  reviewStatus: string;
  ratingCategories: RatingCategory[];
}

// Main Service Provider Details
interface ServiceProviderDetails extends BaseEntity {
  serviceProviderId: number;
  userId: number;
  serviceProviderTypeId: number;
  name: string;
  description: string;
  address: string;
  contactNumber: string;
  email: string;
  websiteUrl: string;
  checkInTime: string;
  checkOutTime: string;
  starRating: number;
  currencyId: number;
  cancellationPolicy: string;
  minimumAdvanceBookingHours: number;
  establishmentYear?: number | null;
  totalRooms: number;
  totalEmployees?: number | null;
  awardsCertifications?: string | null;
  languagesSpoken?: string | null;
  parkingFacility: boolean;
  parkingCapacity?: number | null;
  wifiAvailable: boolean;
  petFriendly: boolean;
  checkInInstructions?: string | null;
  specialInstructions?: string | null;
  approvalStatusId: number;
  statusId: number;
  providerTypeName: string;
  currencyCode: string;
  currencySymbol: string;
  approvalStatusName: string;
  statusName: string;
  createdByUsername: string;
  approvalComment: string;
  approvedAt: string;
  approvedByUsername: string;
  images: ServiceProviderImage[];
  operatingHours: OperatingHours[];
  paymentMethods: PaymentMethod[];
}

// Main API Response
interface ServiceProviderAPIResponse {
  code: number;
  status: string;
  message: string;
  data: {
    serviceProviderDetails: ServiceProviderDetails;
    nearbyDestinations: NearbyDestination[];
    mealDetails: MealDetails[];
    roomDetails: RoomDetails[];
    packageDetails: PackageDetails[];
    amenities: Amenity[];
    facilities: Facility[];
    seasonalPricing: SeasonalPricing[];
    contactPersons: ContactPerson[];
    bankDetails: BankDetails[];
    taxAndCommissionDetails: TaxAndCommissionDetails;
    bookingRestrictions: BookingRestriction[];
    statistics: Statistics;
    socialMedia: SocialMedia[];
    reviews: Review[];
  };
  timestamp: string;
}

// Export all types
export type {
  ServiceProviderAPIResponse,
  ServiceProviderDetails,
  NearbyDestination,
  MealDetails,
  RoomDetails,
  PackageDetails,
  Amenity,
  Facility,
  SeasonalPricing,
  ContactPerson,
  BankDetails,
  TaxAndCommissionDetails,
  BookingRestriction,
  Statistics,
  SocialMedia,
  Review,
  OperatingHours,
  PaymentMethod,
  ServiceProviderImage,
  MealImage,
  RoomImage,
  PackageImage,
  FacilityImage,
  RoomFeature,
  RoomAmenity,
  RoomAvailability,
  PackageFeature,
  PackageInclusion,
  RatingCategory
};