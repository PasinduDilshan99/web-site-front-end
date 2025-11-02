// Vehicle API Types
export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
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

// Filter types
export interface VehicleFilters {
  search: string;
  status: string;
  make: string;
  model: string;
  bodyType: string;
  yearRange: [number, number];
  priceRange: [number, number];
  engineType: string;
  transmissionType: string;
  fuelType: string;
  minHorsepower: number;
  maxHorsepower: number;
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
export interface VehicleByIdResponse extends ApiResponse<VehicleById[]> {
  // This inherits from ApiResponse but uses VehicleById[] for data
}

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