// Vehicle Types
export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}
// types/vehicle-types.ts
export interface VehicleFilters {
  search: string;
  make: string;
  bodyType: string;
  yearRange: [number, number];
  engineType: string;
  transmission: string;
  fuelType: string;
  horsepowerRange: [number, number];
  seatCapacity: string;
  // priceRange: [number, number];
  // Remove these if they're not needed:
  // status: string;
  // model: string;
  // transmissionType: string;
  // minHorsepower: number;
  // maxHorsepower: number;
}
export interface Vehicle {
  vehicleId: number;
  registrationNumber: string;
  specificationId: number;
  status: string;
  purchaseDate: string;
  purchasePrice: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
  specification: VehicleSpecification;
  images: VehicleImage[];
  usageLogs: VehicleUsageLog[];
}

export interface VehicleSpecification {
  make: string;
  model: string;
  year: number;
  generation: string;
  bodyType: string;
  price: number;
  engineType: string;
  engineCapacity: string | null;
  horsepowerHp: number;
  torqueNm: number;
  transmissionTypeId: number;
  fuelTypeId: number;
  electricRangeKm: number | null;
  drivetrain: string;
  topSpeedKmh: number;
  acceleration0To100: number;
  co2EmissionsGKm: number | null;
  doors: number;
  seatCapacity: number;
  dimensions: string | null;
  wheelbaseMm: number | null;
  weightKg: number | null;
  wheelSize: string | null;
  tireType: string | null;
  upholsteryType: string | null;
  acTypeId: number;
  sunroofType: string;
  cruiseControlType: string;
  entertainmentFeatures: string | null;
  comfortFeatures: string | null;
  ncapSafetyRating: number;
  airbagsCount: number;
  parkingCamera: string | null;
  laneDepartureWarning: boolean;
  safetyFeatures: string | null;
  fuelTankCapacityLiters: number;
  warrantyYears: number;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
}

export interface VehicleImage {
  imageId: number;
  imageUrl: string;
  imageName: string;
  description: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
}

export interface VehicleUsageLog {
  usageId: number;
  packageId: number;
  tourId: number;
  startDatetime: string;
  endDatetime: string;
  startOdometer: number;
  endOdometer: number;
  routeDescription: string;
  purpose: string;
  fuelUsedLiters: number;
  remarks: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
}


// Pagination types
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Response type for your specific endpoint
export type ActiveVehiclesResponse = ApiResponse<Vehicle[]>;

// Vehicle API Types - Additional types for GET_VEHICLES_BY_ID response

// New types for the specific API response structure
export type VehicleByIdResponse = ApiResponse<VehicleById[]>;

export interface VehicleById {
  vehicleId: number;
  registrationNumber: string;
  statusId: number;
  statusName: string;
  vehiclePurchaseDate: string;
  vehiclePurchasePrice: number;
  vehicleCreatedAt: string;
  vehicleCreatedBy: number;
  vehicleUpdatedAt: string;
  vehicleUpdatedBy: number;
  vehicleTerminatedAt: string | null;
  vehicleTerminatedBy: number;
  ownerId: number;
  assignedDriverId: number;
  specification: SpecificationById;
  details: VehicleDetails;
  vehicleImages: VehicleImageById[];
  specificationImages: SpecificationImage[];
  assignments: Assignment[];
  usageLogs: UsageLog[];
  latestService: LatestService | null;
  latestFuelRecord: LatestFuelRecord | null;
}

export interface SpecificationById {
  specificationId: number;
  make: string;
  model: string;
  vehicleYear: number;
  generation: string;
  bodyType: string;
  specificationPrice: number;
  engineType: string;
  engineCapacity: string | null;
  horsepowerHp: number;
  torqueNm: number;
  transmissionTypeId: number;
  transmissionTypeName: string;
  fuelTypeId: number;
  fuelTypeName: string;
  electricRangeKm: number | null;
  drivetrain: string;
  topSpeedKmh: number;
  acceleration0100: number;
  co2EmissionsGkm: number | null;
  doors: number;
  seatCapacity: number;
  dimensions: string | null;
  wheelbaseMm: number | null;
  weightKg: number | null;
  wheelSize: string | null;
  tireType: string | null;
  upholsteryType: string | null;
  acTypeId: number;
  acType: string;
  sunroofType: string;
  cruiseControlType: string;
  entertainmentFeatures: string | null;
  comfortFeatures: string | null;
  ncapSafetyRating: number;
  airbagsCount: number;
  parkingCamera: string | null;
  laneDepartureWarning: boolean;
  safetyFeatures: string | null;
  fuelTankCapacityLiters: number;
  warrantyYears: number;
  specificationImageUrl: string | null;
  specificationActive: boolean;
}

export interface VehicleDetails {
  chassisNumber: string;
  engineNumber: string;
  insurancePolicyNumber: string;
  insuranceExpiryDate: string;
  emissionTestNumber: string;
  emissionExpiryDate: string;
  permitNumber: string;
  permitExpiryDate: string;
  warrantyExpiryDate: string;
  gpsTrackingId: string;
}

export interface VehicleImageById {
  vehicleImageId: number;
  vehicleImageUrl: string;
  vehicleImageName: string;
  vehicleImageDescription: string;
}

export interface SpecificationImage {
  specificationImageId: number;
  specificationImageUrl: string | null;
  specificationImageName: string;
  specificationImageDescription: string;
}

export interface Assignment {
  assignmentId: number;
  driverId: number;
  assignmentStartDate: string;
  assignmentEndDate: string;
  assignmentPurpose: string;
  assignmentRemarks: string;
}

export interface UsageLog {
  usageId: number;
  packageId: number;
  tourId: number;
  usageStartDatetime: string;
  usageEndDatetime: string;
  startOdometer: number;
  endOdometer: number;
  routeDescription: string;
  usagePurpose: string;
  fuelUsedLiters: number;
  usageRemarks: string;
}

export interface LatestService {
  serviceId: number;
  serviceDate: string;
  serviceCenter: string;
  serviceType: string;
  serviceOdometer: number;
  serviceCost: number;
  serviceDescription: string;
  nextServiceDue: string;
  serviceImageUrl: string;
  serviceImageDescription: string;
}

export interface LatestFuelRecord {
  fuelRecordId: number;
  refuelDate: string;
  refuelFuelTypeId: number;
  refuelFuelType: string;
  quantityLiters: number;
  fuelCost: number;
  fuelOdometer: number;
  refuelStation: string;
}
// ================================
// Vehicle Specification Details API
// GET /api/vehicles/specification/{id}
// ================================

export type VehicleSpecificationDetailsResponse =
  ApiResponse<VehicleSpecificationDetails>;
export interface VehicleSpecificationDetails {
  specificationId: number;
  make: string;
  model: string;
  year: number;
  generation: string | null;
  bodyType: string;
  price: number;
  engineType: string;
  engineCapacity: string | null;
  horsepowerHp: number;
  torqueNm: number;
  electricRangeKm: number | null;
  drivetrain: string;
  topSpeedKmh: number;
  acceleration0To100: number;
  co2EmissionsGKm: number | null;
  doors: number;
  seatCapacity: number;
  dimensions: string | null;
  wheelbaseMm: number | null;
  weightKg: number | null;
  wheelSize: string | null;
  tireType: string | null;
  upholsteryType: string | null;
  sunroofType: string;
  cruiseControlType: string;
  entertainmentFeatures: string | null;
  comfortFeatures: string | null;
  ncapSafetyRating: number | null;
  airbagsCount: number;
  parkingCamera: string | null;
  laneDepartureWarning: boolean;
  safetyFeatures: string | null;
  fuelTankCapacityLiters: number;
  warrantyYears: number;
  imageUrl: string | null;
  airCondition: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  transmission: TransmissionDetails;
  fuelType: FuelTypeDetails;
  airConditioningType: AirConditioningTypeDetails;
  images: SpecificationImageDetails[];
}

export interface TransmissionDetails {
  transmissionTypeId: number;
  transmissionTypeName: string;
  description: string;
}

export interface FuelTypeDetails {
  fuelTypeId: number;
  fuelTypeName: string;
  description: string;
}

export interface AirConditioningTypeDetails {
  acTypeId: number;
  acTypeName: string;
  description: string;
}

export interface SpecificationImageDetails {
  imageId: number;
  imageUrl: string;
  imageName: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleSpecificationSearchRequest {
  make?: string | null;
  model?: string | null;
  year?: number | null;
  bodyType?: string | null;
  horsePower?: number | null;
  seats?: number | null;
  roofType?: string | null;
  acType?: string | null;

  pageNumber: number;
  pageSize: number;
}

export interface VehicleSpecificationSearchResponseData {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  vehicles: VehicleBasicDetails[];
}

export interface VehicleBasicDetails {
  specificationId: number;
  make: string;
  model: string;
  year: number;
  bodyType: string;
  horsepowerHp: number;
  seatCapacity: number;
  sunroofType: string;
  acTypeName: string;
  imageUrl: string;
}

// Vehicle Filter Types

// Horse power range type
export interface HorsePowerRange {
  min: number;
  max: number;
}

// Filter response returned from backend
export interface VehicleSpecificationFilterResponse {
  makes: string[];
  models: string[];
  years: number[];
  bodyTypes: string[];
  seats: number[];
  roofTypes: string[];
  acTypes: string[];
  horsePowerRange: HorsePowerRange;
}


// types/vehicle-types.ts (add these to your existing file)

export interface VehicleType {
  vehicleTypeId: number;
  name: string;
  description: string;
  status: string;
  images: VehicleTypeImage[];
}

export interface VehicleTypeImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

export interface VehicleTypesResponse {
  code: number;
  status: string;
  message: string;
  data: VehicleType[];
  timestamp: string;
}

export interface VehicleTypeFilters {
  search: string;
}