// Inquiry request and response types

// API Request type
export interface InquiryRequest {
  name: string;
  email: string | null;
  phoneNumber: string | null;
  country: string | null;
  preferredContactMethod: string | null;
  preferredDestination: string | null;
  adults: number;
  kids: number;
  arrivalDate: string | null;
  departureDate: string | null;
  message: string | null;
}

// API Response type
export interface InquiryResponse {
  code: number;
  status: string;
  message: string;
  data: InquiryData | null;
  timestamp: string;
}

// Response data type
export interface InquiryData {
  id: number;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  country: string | null;
  preferredContactMethod: string | null;
  preferredDestination: string | null;
  adults: number;
  kids: number;
  arrivalDate: string | null;
  departureDate: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Form data type (for component state)
export interface InquiryFormData {
  fullName: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  preferredContactMethod: string | null;
  preferredDestination: string | null;
  adults: number;
  kids: number;
  arrivalDate: string;
  departureDate: string;
  message: string;
}

// Form errors type
export interface InquiryFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredContactMethod?: string;
}

// Country type (import from countries if needed, or define here)
export interface Country {
  name: string;
  code: string;
  phoneCode: string;
}

// Contact method options
export interface ContactMethod {
  value: string;
  label: string;
}

// Destination options
export interface Destination {
  value: string;
  label: string;
}

// Service response type
export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
  code?: number;
  message?: string;
}