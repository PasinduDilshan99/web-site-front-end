export interface LinkBarItem {
  name: string;
  description: string;
  typeName: string; // "FULL" | "IMAGE_ONLY"
  typeStatus: string;
  iconUrl: string;
  linkUrl: string;
  itemStatus: string;
  itemStatusStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

export interface LinkBarApiResponse {
  code: number;
  status: string;
  message: string;
  data: LinkBarItem[];
  timestamp: string;
}
