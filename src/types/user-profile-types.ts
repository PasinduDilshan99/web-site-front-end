export interface UserUpdateRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: string; 
  gender?: string;
  country?: string;

  email?: string;
  mobileNumber1?: string;
  mobileNumber2?: string;

  nic?: string;
  passportNumber?: string;
  drivingLicenseNumber?: string;

  addressNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  province?: string;
  postalCode?: string;

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
