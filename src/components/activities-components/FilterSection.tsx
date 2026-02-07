import { ActivityFilters } from "@/types/activity-types";
import React, { useState } from "react";

type FilterValue = 
  | string 
  | number 
  | [number, number] 
  | boolean 
  | null 
  | string[];

interface FilterSectionProps {
  filters: ActivityFilters;
  onFilterChange: (filterName: keyof ActivityFilters, value: FilterValue) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  categories: string[];
  seasons: string[];
  durations: number[];
  participantsOptions: number[];
  statuses: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onResetFilters,
  categories,
  seasons,
  durations,
  participantsOptions,
  statuses,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handlePriceChange = (minMax: 'min' | 'max', value: number) => {
    if (minMax === 'min') {
      onFilterChange("priceRange", [value, filters.priceRange[1]]);
    } else {
      onFilterChange("priceRange", [filters.priceRange[0], value]);
    }
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-sky-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
          Filter Activities
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-4 lg:px-6 py-1 lg:py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
          <button
            onClick={handleSearchClick}
            className="px-6 py-2 bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-lg hover:from-teal-700 hover:to-sky-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-sky-800">
            Search
          </label>
          <input
            type="text"
            placeholder="Search activities..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-sky-800">
            Price Range ($)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              max="10000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
              className="w-1/2 px-3 py-1 border border-sky-300 rounded-md text-sm lg:text-md focus:outline-none focus:ring-1 focus:ring-sky-400"
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              max="10000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 10000)}
              className="w-1/2 px-3 py-1 border border-sky-300 rounded-md text-sm lg:text-md focus:outline-none focus:ring-1 focus:ring-sky-400"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-sky-800">
            Duration (Hours)
          </label>
          <select
            value={filters.duration}
            onChange={(e) => onFilterChange("duration", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23038bfc' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">Any Duration</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration} Hour{duration > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-sky-800">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23038bfc' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters - Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showAdvancedFilters
            ? "max-h-96 opacity-100 mb-6"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Season */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-teal-800">
              Season
            </label>
            <select
              value={filters.season}
              onChange={(e) => onFilterChange("season", e.target.value)}
              className="text-sm lg:text-md w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d9488' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Seasons</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-teal-800">
              Max Participants
            </label>
            <select
              value={filters.participants}
              onChange={(e) => onFilterChange("participants", e.target.value)}
              className="text-sm lg:text-md w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d9488' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any Group Size</option>
              {participantsOptions.map((participants) => (
                <option key={participants} value={participants}>
                  Up to {participants} people
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-teal-800">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="text-sm lg:text-md w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d9488' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Separator Line with Advanced Filters Button */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-sky-300"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAdvancedFilters ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Hide Advanced Filters
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Show Advanced Filters
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      <ActiveFiltersSummary filters={filters} onFilterChange={onFilterChange} />
    </div>
  );
};

// Active Filters Summary Component
interface ActiveFiltersSummaryProps {
  filters: ActivityFilters;
  onFilterChange: (filterName: keyof ActivityFilters, value: FilterValue) => void;
}

const ActiveFiltersSummary: React.FC<ActiveFiltersSummaryProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  interface ActiveFilter {
    name: keyof ActivityFilters;
    label: string;
    value: FilterValue;
  }

  const activeFilters: ActiveFilter[] = [];
  
  if (filters.search) {
    activeFilters.push({
      name: "search",
      label: `Search: "${filters.search}"`,
      value: filters.search,
    });
  }
  
  if (filters.duration) {
    activeFilters.push({
      name: "duration",
      label: `Duration: ${filters.duration} hours`,
      value: filters.duration,
    });
  }
  
  if (filters.category) {
    activeFilters.push({
      name: "category",
      label: `Category: ${filters.category}`,
      value: filters.category,
    });
  }
  
  if (filters.season) {
    activeFilters.push({
      name: "season",
      label: `Season: ${filters.season}`,
      value: filters.season,
    });
  }
  
  if (filters.participants) {
    activeFilters.push({
      name: "participants",
      label: `Max Participants: ${filters.participants}`,
      value: filters.participants,
    });
  }
  
  if (filters.status) {
    activeFilters.push({
      name: "status",
      label: `Status: ${filters.status}`,
      value: filters.status,
    });
  }
  
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
    activeFilters.push({
      name: "priceRange",
      label: `Price: ${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}`,
      value: filters.priceRange,
    });
  }

  if (activeFilters.length === 0) return null;

  const resetValues: Record<keyof ActivityFilters, FilterValue> = {
    search: "",
    duration: "",
    category: "",
    season: "",
    participants: "",
    status: "",
    priceRange: [0, 10000],
  };

  const removeFilter = (filterName: keyof ActivityFilters) => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-sky-300 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-sky-800">
          Active Filters:
        </span>
        <span className="text-sm text-sky-600">({activeFilters.length})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 rounded-full text-xs font-medium border border-sky-200 transition-all duration-200 hover:shadow-md"
          >
            {filter.label}
            <button
              onClick={() => removeFilter(filter.name)}
              className="hover:text-red-600 transition-colors duration-200 ml-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;