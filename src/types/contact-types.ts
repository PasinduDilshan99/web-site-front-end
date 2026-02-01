// Contact method types

export interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  value: string;
  description: string | null;
  link: string | null;
  action: 'call' | 'email' | 'whatsapp' | 'location' | 'hours' | 'emergency';
  highlight?: boolean;
}

export interface ContactApiResponse {
  code: number;
  status: string;
  message: string;
  data: ContactMethod[];
  timestamp: string;
}

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
  code?: number;
  message?: string;
}