//season-types.ts

export interface SeasonImage {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface SeasonBasic {
  id: number;
  name: string;
  standardName: string;
  localName: string;
  startMonth: number;
  endMonth: number;
  isPeak: boolean;
  displayOrder: number;
  seasonImages: SeasonImage[];
}

export interface SeasonDetails extends SeasonBasic {
  monsoonType: string;
  weatherSummary: string;
  temperatureMin: number;
  temperatureMax: number;
  rainfallPattern: string;
  description: string;
  status: number;
  createdAt: string;
  createdBy?: number | null;
  updatedAt: string;
  updatedBy?: number | null;
}

/**
 * Generic API Wrapper
 */
export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}
