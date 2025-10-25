export interface FaqItem {
  faqId: number;
  faqQuestion: string;
  faqAnswer1: string;
  faqAnswer2: string;
  faqAnswer3: string;
  faqAnswer4: string;
  faqAnswer5: string;
  faqDisplayAnswer: string;
  faqStatus: string;
  faqStatusStatus: string;
  faqCreatedAt: string;
  faqCreatedBy: number;
  faqUpdatedAt: string;
  faqUpdatedBy: number;
  faqTerminatedAt: string | null;
  faqTerminatedBy: number;
  faqViewCount: number;
  faqLastView: string | null;
}

export interface FaqProps {
  showAll?: boolean;
  displayLimit?: number;
}

export interface InsertFAQRequestType {
  ticketNumber?: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  ipAddress: string;
  userId: number;
}

export interface ValidationError {
  id: number;
  field: string;
  value: string;
}

export interface InsertFAQSuccessResponseType {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

export interface InsertFAQErrorResponseType {
  code: number;
  status: string;
  message: string;
  data: ValidationError[];
  timestamp: string;
}

export interface GenericErrorResponseType {
  error: string;
}