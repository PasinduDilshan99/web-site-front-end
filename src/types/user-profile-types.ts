export interface UserUpdateRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  addressId?: number;
  nic?: string;
  genderId?: number;
  passportNumber?: string;
  drivingLicenseNumber?: string;
  email?: string;
  email2?: string;
  mobileNumber1?: string;
  mobileNumber2?: string;
  regionId?: number;
  religionId?: number;
  dateOfBirth?: string; // yyyy-MM-dd
  imageUrl?: string;
}

export interface UpdateAccountResponseData {
  message: string;
  id: number;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}
