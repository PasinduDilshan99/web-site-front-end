// booking-types.ts
export interface PackageSchedule {
  packageScheduleId: number;
  packageScheduleName: string;
  packageScheduleDescription: string;
  startDate: string;
  endDate: string;
}

export interface Package {
  packageId: number;
  packageName: string;
  packageDescription: string;
  packageSchedulesDetails: PackageSchedule[];
}

export interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  packageDetails: Package[];
}

export interface Participant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  country: string;
  email: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalConditions: string;
  allergies: string;
  specialAssistanceRequired: boolean;
  assistantDetails: string | null;
  roomSharingWith: string | null;
}

export interface BookingPrice {
  itemType: string;
  itemName: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Transport {
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  departureLocation: string;
  arrivalLocation: string;
}

export interface BookingNote {
  noteType: string;
  noteText: string;
}

export interface Activity {
  activityScheduleId: number;
  numberOfParticipants: number;
}

export interface Invoice {
  billingFullName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
}

export interface BookingFormData {
  packageScheduleId: number;
  specialRequirements: string;
  dietaryRestrictions: string;
  insuranceRequired: boolean;
  transport: Transport;
//   bookingPrices: BookingPrice[];
  participants: Participant[];
  bookingNotes: BookingNote[];
//   activities: Activity[];
  invoices: Invoice;
}

// Receipt Types
export interface ParticipantDetail {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  nationality: string;
  email: string;
  mobileNumber: string;
  medicalConditions: string;
  allergies: string;
}

export interface ActivityDetail {
  activityName: string;
  activityDescription: string;
  numberOfParticipants: number;
  pricePerPerson: number;
  totalPrice: number;
}

export interface DestinationDetail {
  destinationName: string;
  destinationDescription: string;
  extraPrice: number;
  extraPriceNote: string;
}

export interface AccommodationDetail {
  dayNumber: number;
  hotelName: string;
  transportPrice: number;
  price: number;
  discount: number;
  serviceCharge: number;
  tax: number;
  extraCharge: number;
  extraChargeNote: string;
}

export interface ReceiptData {
  bookingId: number;
  bookingReference: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  insuranceAmount: number | null;
  packagePrice: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  billingFullName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
  packageName: string;
  packageScheduleId: number;
  assumeStartDate: string;
  assumeEndDate: string;
  tourName: string;
  tourDescription: string;
  finalAmount: number;
  bookingDate: string;
  bookingStatus: string;
  participentDetails: ParticipantDetail[];
  activityDetailsList: ActivityDetail[];
  destiantionDetails: DestinationDetail[];
  accommodationDetailsList: AccommodationDetail[];
}