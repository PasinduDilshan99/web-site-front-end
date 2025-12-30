// app/resorts/components/ResortFilterSection.tsx
import React, { useState } from "react";

interface ResortFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  resortType: string;
  amenities: string[];
  hasSpa: boolean | null;
  hasPool: boolean | null;
  isAllInclusive: boolean | null;
  hasBeachAccess: boolean | null;
}

// Define a type for all possible filter values
type FilterValue = 
  | string 
  | number 
  | [number, number] 
  | boolean | null 
  | string[];

interface ResortFilterSectionProps {
  filters: ResortFilters;
  onFilterChange: (filterName: keyof ResortFilters, value: FilterValue) => void;
  onResetFilters: () => void;
  locations: string[];
  resortTypes: string[];
}

const ResortFilterSection: React.FC<ResortFilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  locations,
  resortTypes,
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

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-cyan-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
          Filter Luxury Resorts
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            🔍 Search Resorts
          </label>
          <input
            type="text"
            placeholder="Search luxury resorts..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            💎 Price Range
          </label>
          <div className="text-sm font-medium text-cyan-700 mb-2">
            {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value, 10)])
            }
            className="w-full h-3 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-lg appearance-none cursor-pointer accent-cyan-600"
          />
        </div>

        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            ⭐ Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  onFilterChange("starRating", rating === filters.starRating ? 0 : rating)
                }
                className={`p-2 rounded-lg transition-all ${
                  filters.starRating >= rating
                    ? "bg-yellow-400 text-white shadow-md"
                    : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Resort Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            🏝️ Resort Type
          </label>
          <select
            value={filters.resortType}
            onChange={(e) => onFilterChange("resortType", e.target.value)}
            className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
          >
            <option value="">All Types</option>
            {resortTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showAdvancedFilters ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              📍 Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Spa */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              💆 Spa Facility
            </label>
            <select
              value={filters.hasSpa === null ? "" : filters.hasSpa.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasSpa", value);
              }}
              className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">With Spa</option>
              <option value="false">Without Spa</option>
            </select>
          </div>

          {/* Pool */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              🏊 Swimming Pool
            </label>
            <select
              value={filters.hasPool === null ? "" : filters.hasPool.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasPool", value);
              }}
              className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">With Pool</option>
              <option value="false">Without Pool</option>
            </select>
          </div>

          {/* Beach Access */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              🏖️ Beach Access
            </label>
            <select
              value={filters.hasBeachAccess === null ? "" : filters.hasBeachAccess.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasBeachAccess", value);
              }}
              className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">Beachfront</option>
              <option value="false">No Beach</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-cyan-200"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAdvancedFilters ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Luxury Features
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Show Luxury Features
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
  filters: ResortFilters;
  onFilterChange: (filterName: keyof ResortFilters, value: FilterValue) => void;
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
    name: keyof ResortFilters;
    label: string;
    value: FilterValue;
  }

  // Build active filters array with proper typing
  const activeFilters: ActiveFilter[] = [];
  
  if (filters.search) {
    activeFilters.push({
      name: "search",
      label: `Search: "${filters.search}"`,
      value: filters.search,
    });
  }
  
  if (filters.starRating > 0) {
    activeFilters.push({
      name: "starRating",
      label: `Rating: ${filters.starRating}+ stars`,
      value: filters.starRating,
    });
  }
  
  if (filters.resortType) {
    activeFilters.push({
      name: "resortType",
      label: `Type: ${filters.resortType}`,
      value: filters.resortType,
    });
  }
  
  if (filters.location) {
    activeFilters.push({
      name: "location",
      label: `Location: ${filters.location}`,
      value: filters.location,
    });
  }
  
  if (filters.hasSpa !== null) {
    activeFilters.push({
      name: "hasSpa",
      label: `Spa: ${filters.hasSpa ? 'Yes' : 'No'}`,
      value: filters.hasSpa,
    });
  }
  
  if (filters.hasPool !== null) {
    activeFilters.push({
      name: "hasPool",
      label: `Pool: ${filters.hasPool ? 'Yes' : 'No'}`,
      value: filters.hasPool,
    });
  }
  
  if (filters.hasBeachAccess !== null) {
    activeFilters.push({
      name: "hasBeachAccess",
      label: `Beach: ${filters.hasBeachAccess ? 'Yes' : 'No'}`,
      value: filters.hasBeachAccess,
    });
  }
  
  if (filters.priceRange[1] < 2000) {
    activeFilters.push({
      name: "priceRange",
      label: `Price up to: ${formatPrice(filters.priceRange[1])}`,
      value: filters.priceRange,
    });
  }

  if (activeFilters.length === 0) return null;

  const resetValues: Record<keyof ResortFilters, FilterValue> = {
    search: "",
    priceRange: [0, 2000],
    starRating: 0,
    location: "",
    resortType: "",
    amenities: [],
    hasSpa: null,
    hasPool: null,
    isAllInclusive: null,
    hasBeachAccess: null,
  };

  const removeFilter = (filterName: keyof ResortFilters) => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-cyan-200 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-800">
          Active Filters:
        </span>
        <span className="text-sm text-gray-600">({activeFilters.length})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-100 to-purple-100 text-cyan-800 rounded-full text-xs font-medium border border-cyan-200 transition-all duration-200 hover:shadow-md"
          >
            {filter.label}
            <button
              onClick={() => removeFilter(filter.name)}
              className="hover:text-red-600 transition-colors duration-200 ml-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResortFilterSection;