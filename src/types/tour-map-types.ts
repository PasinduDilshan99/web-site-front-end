
export interface TourMapImage{
  id: number;
  url: string;
  name: string;
  description?: string;
};

export interface TourMapLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  images: TourMapImage[];
};

export interface TourMapApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourMapLocation[];
  timestamp: string;
};