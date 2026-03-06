// utils/url-params.ts
import { ActivityFilters } from "@/types/activity-types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const filtersToUrlParams = (filters: ActivityFilters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.duration) params.set('duration', filters.duration.toString());
  if (filters.season) params.set('season', filters.season);
  if (filters.participants) params.set('participants', filters.participants.toString());
  if (filters.status) params.set('status', filters.status);
  
  // Price range
  if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0].toString());
  if (filters.priceRange[1] < 10000) params.set('maxPrice', filters.priceRange[1].toString());
  
  // Pagination
  params.set('page', '1'); // Reset to page 1 when filters change
  params.set('pageSize', '12');
  
  return params;
};

export const urlParamsToFilters = (
  params: ReadonlyURLSearchParams | URLSearchParams
): ActivityFilters => {
  return {
    search: params.get('search') || '',
    category: params.get('category') || '',
    duration: params.get('duration') || '',
    season: params.get('season') || '',
    participants: params.get('participants') || '',
    status: params.get('status') || '',
    priceRange: [
      Number(params.get('minPrice')) || 0,
      Number(params.get('maxPrice')) || 10000,
    ],
  };
};

export const urlParamsToPagination = (
  params: ReadonlyURLSearchParams | URLSearchParams
): { page: number; pageSize: number } => {
  return {
    page: Number(params.get('page')) || 1,
    pageSize: Number(params.get('pageSize')) || 12,
  };
};