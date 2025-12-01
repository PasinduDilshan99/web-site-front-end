// types/sidebar.ts
export interface SidebarItem {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  privilegeName: string;
  status: string;
  url: string | null;
  children: SidebarItem[] | null;
}

export interface SidebarResponse {
  code: number;
  status: string;
  message: string;
  data: SidebarItem[];
  timestamp: string;
}

export interface UserProfile {
  userId: number;
  username: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nic: string;
  passportNumber: string;
  drivingLicenseNumber: string;
  email: string;
  mobileNumber1: string;
  mobileNumber2: string;
  dateOfBirth: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  benefitsPointsCount: number;
  addressNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  province: string;
  countryName: string;
  postalCode: string;
  gender: string;
  religion: string;
  userType: string;
  userTypeDescription: string;
  userStatus: string;
  userStatusDescription: string;
  walletNumber: string;
  walletAmount: number;
  walletStatus: string;
}

export interface UserProfileResponse {
  code: number;
  status: string;
  message: string;
  data: UserProfile;
  timestamp: string;
}