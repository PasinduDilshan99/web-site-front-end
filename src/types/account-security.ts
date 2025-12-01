// types/account-security.ts
export interface EmailVerification {
  whichEmail: string;
  createdAt: string;
  updatedAt: string;
  statusName: string;
  statusDescription: string;
}

export interface MobileVerification {
  whichMobile: string;
  createdAt: string;
  updatedAt: string;
  statusName: string;
  statusDescription: string;
}

export interface AccountSecurityData {
  username: string;
  email: string;
  mobileNumber1: string;
  mobileNumber2: string;
  emailVerifications: EmailVerification[];
  mobileVerifications: MobileVerification[];
}

export interface AccountSecurityResponse {
  code: number;
  status: string;
  message: string;
  data: AccountSecurityData;
  timestamp: string;
}

export interface MobileVerifyRequest {
  mobileNumber: string;
  whichMobile: 'primary' | 'secondory';
}

export interface MobileUpdateRequest {
  code: string;
  whichMobile: 'primary' | 'secondory';
}

export interface EmailVerifyRequest {
  email: string;
  whichEmail: 'primary' | 'secondary';
}

export interface EmailUpdateRequest {
  code: string;
}