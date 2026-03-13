// types/completed-tours.ts
export interface Participant {
  bookingId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  passportNumber: string;
  nationality: string;
  email: string | null;
  mobileNumber: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalConditions: string;
  allergies: string;
  specialAssistanceRequired: boolean;
  assistanceDetails: string | null;
  roomSharingWithFirstName: string | null;
  roomSharingWithLastName: string | null;
}

export interface Activity {
  bookingId: number;
  activityName: string;
  activityDescription: string;
  // activityCategory: string | null;
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
  activityStatus: string;
}

export interface Payment {
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
}

export interface Document {
  bookingId: number;
  documentType: string;
  documentName: string;
  documentUrl: string;
  fileSize: number;
}

export interface CompletedTour {
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
  cancellationDate: string | null;
  refundAmount: number;
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourDuration: number;
  startLocation: string;
  endLocation: string;
  // tourType: string;
  // tourCategory: string;
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
  actualDurationDays: number;
  completionTime: string;
  participants: Participant[];
  activities: Activity[];
  payments: Payment[];
  documents: Document[];
}

export interface CompletedToursResponse {
  code: number;
  status: string;
  message: string;
  data: CompletedTour[];
  timestamp: string;
}

