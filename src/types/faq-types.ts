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

export interface UpdateViewCountRequest {
  faqId: number;
}

export interface FaqApiResponse {
  code: number;
  status: string;
  message: string;
  data: FaqItem[];
  timestamp: string;
}

export interface UpdateViewCountResponse {
  code: number;
  status: string;
  message: string;
  data: {
    faqId: number;
    viewCount: number;
  };
  timestamp: string;
}

export interface Option {
  optionId: number;
  optionKey: string;
  optionValue: string;
  optionType: string;
  optionTypeDescription: string;
  optionDescription: string;
  commonStatusName: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number | null;
}

export interface OptionsApiResponse {
  code: number;
  status: string;
  message: string;
  data: Option[];
  timestamp: string;
}

export interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactSupportFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}