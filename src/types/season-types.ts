//season-types.ts

export class SeasonImage {
  id!: number;
  name!: string;
  description?: string;
  imageUrl?: string;
}

export class SeasonBasic {
  id!: number;
  name!: string;
  standardName!: string;
  localName!: string;
  startMonth!: number;
  endMonth!: number;
  isPeak!: boolean;
  displayOrder!: number;
  seasonImages!: SeasonImage[];
}

export class SeasonDetails extends SeasonBasic {
  monsoonType!: string;
  weatherSummary!: string;
  temperatureMin!: number;
  temperatureMax!: number;
  rainfallPattern!: string;
  description!: string;
  status!: number;
  createdAt!: string;
  createdBy?: number | null;
  updatedAt!: string;
  updatedBy?: number | null;
}

/**
 * Generic API Wrapper
 */
export class ApiResponse<T> {
  code!: number;
  status!: string;
  message!: string;
  data!: T;
  timestamp!: string;
}