// Add this interface for activity search request
export interface ActivitySearchRequest {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  duration: number | null;
  activityCategory: string | null;
  season: string | null;
  status: string | null;
  pageSize: number;
  pageNumber: number;
}

export interface ActivityFilters {
  search: string;
  priceRange: [number, number];
  duration: string;
  category: string;
  season: string;
  participants: string;
  status: string;
}

export interface Schedule {
  id: number;
  name: string;
  description: string;
  status: number;
  assume_start_date: string;
  assume_end_date: string;
  duration_hours_start: number;
  duration_hours_end: number;
  special_note: string;
}

export interface Requirement {
  id: number;
  name: string;
  value: string;
  description: string;
  color: string;
  status: number;
}

export interface ActivityImage {
  id: number;
  name: string;
  description: string;
  status: number;
  image_url: string;
}

export interface ActivityData {
  id: number;
  name: string;
  description: string;
  season: string;
  status: string;
  schedules: Schedule[];
  requirements: Requirement[];
  images: ActivityImage[];
  destination_id: number;
  activities_category: string;
  duration_hours: number;
  available_from: string;
  available_to: string;
  price_local: number;
  price_foreigners: number;
  min_participate: number;
  max_participate: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_description: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}