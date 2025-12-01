// types/upcoming-tours.ts
export interface UpcomingParticipant {
  bookingId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  passportNumber: string;
  passportProvided: boolean;
  nationality: string;
  email: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalConditions: string;
  allergies: string;
  specialAssistanceRequired: boolean;
  assistanceDetails: string | null;
  roomSharingWithFirstName: string;
  roomSharingWithLastName: string;
  participantReadiness: string;
}

export interface UpcomingActivity {
  bookingId: number;
  activityName: string;
  activityDescription: string;
  activityCategory: string | null;
  activityDate: string;
  startTime: string;
  endTime: string;
  numberOfParticipants: number;
  pricePerPerson: number;
  totalPrice: number;
  destinationName: string;
  durationHours: number;
  priceLocal: number;
  priceForeigners: number;
  daysUntilActivity: number;
  activityTiming: string;
}

export interface UpcomingPayment {
  bookingId: number;
  paymentReference: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  installmentNumber: number;
  totalInstallments: number;
  paymentDate: string | null;
  dueDate: string;
  transactionId: string | null;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentUrgency: string;
}

export interface UpcomingDocument {
  bookingId: number;
  documentType: string;
  documentName: string;
  documentUrl: string;
  fileSize: number;
  documentCategory: string;
}

export interface UpcomingTour {
  bookingId: number;
  bookingReference: string;
  bookingDate: string;
  travelStartDate: string;
  travelEndDate: string;
  totalPersons: number;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  insuranceAmount: number;
  finalAmount: number;
  bookingStatus: string;
  cancellationReason: string | null;
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourDuration: number;
  startLocation: string;
  endLocation: string;
  tourType: string;
  tourCategory: string;
  packageName: string;
  packageDescription: string;
  packageTotalPrice: number;
  discountPercentage: number;
  packagePricePerPerson: number;
  packageScheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  username: string;
  userFullName: string;
  email: string;
  mobileNumber1: string;
  daysUntilTravel: number;
  travelUrgency: string;
  countdown: string;
  participants: UpcomingParticipant[];
  activities: UpcomingActivity[];
  payments: UpcomingPayment[];
  documents: UpcomingDocument[];
}

export interface UpcomingToursResponse {
  code: number;
  status: string;
  message: string;
  data: UpcomingTour[];
  timestamp: string;
}