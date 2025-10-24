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
