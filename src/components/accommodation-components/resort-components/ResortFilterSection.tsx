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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#0A2F44]/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A2F44]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1F5F72]/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      
      {/* Wave Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="filter-wave-pattern" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q15 5 30 10 T60 10" stroke="#0A2F44" fill="none" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#filter-wave-pattern)"/>
        </svg>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] bg-clip-text text-transparent">
            Discover Ultra-Luxury Resorts
          </h2>
          <p className="text-sm text-gray-500 mt-1">Find your exclusive oceanfront escape</p>
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full"></div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 border-2 border-[#0A2F44] text-[#0A2F44] rounded-xl hover:bg-[#0A2F44] hover:text-white transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
            <span className="text-[#0A2F44]">🔍</span> Search Resorts
          </label>
          <input
            type="text"
            placeholder="Search by name, location..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 placeholder-gray-400 transition-all group-hover:border-[#0A2F44]/30"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
            <span className="text-[#144A5E]">💎</span> Price Range
          </label>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#0A2F44] bg-[#0A2F44]/10 px-3 py-1 rounded-full">
              {formatPrice(filters.priceRange[0])}
            </span>
            <span className="text-xs text-gray-400">to</span>
            <span className="text-sm font-medium text-[#1F5F72] bg-[#1F5F72]/10 px-3 py-1 rounded-full">
              {formatPrice(filters.priceRange[1])}
            </span>
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
            className="w-full h-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-lg appearance-none cursor-pointer accent-[#0A2F44]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatPrice(0)}</span>
            <span>{formatPrice(1000)}</span>
            <span>{formatPrice(2000)}</span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
            <span className="text-yellow-500">⭐</span> Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  onFilterChange("starRating", rating === filters.starRating ? 0 : rating)
                }
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  filters.starRating >= rating
                    ? "bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white shadow-md"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-[#0A2F44]"
                }`}
                title={`${rating} Star${rating > 1 ? 's' : ''}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Resort Type */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
            <span className="text-[#1F5F72]">🏝️</span> Resort Type
          </label>
          <select
            value={filters.resortType}
            onChange={(e) => onFilterChange("resortType", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 font-medium transition-all group-hover:border-[#0A2F44]/30"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-[#0A2F44]/10">
          {/* Location */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
              <span className="text-[#1F5F72]">📍</span> Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 font-medium transition-all group-hover:border-[#0A2F44]/30"
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
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
              <span className="text-purple-500">💆</span> Spa Facility
            </label>
            <select
              value={filters.hasSpa === null ? "" : filters.hasSpa.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasSpa", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 font-medium transition-all group-hover:border-[#0A2F44]/30"
            >
              <option value="">Any</option>
              <option value="true">World-Class Spa</option>
              <option value="false">No Spa</option>
            </select>
          </div>

          {/* Pool */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
              <span className="text-cyan-500">🏊</span> Swimming Pool
            </label>
            <select
              value={filters.hasPool === null ? "" : filters.hasPool.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasPool", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 font-medium transition-all group-hover:border-[#0A2F44]/30"
            >
              <option value="">Any</option>
              <option value="true">Infinity Pool</option>
              <option value="false">No Pool</option>
            </select>
          </div>

          {/* Beach Access */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#0A2F44] rounded-full"></span>
              <span className="text-amber-500">🏖️</span> Beach Access
            </label>
            <select
              value={filters.hasBeachAccess === null ? "" : filters.hasBeachAccess.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasBeachAccess", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 focus:border-[#0A2F44] bg-white text-gray-900 font-medium transition-all group-hover:border-[#0A2F44]/30"
            >
              <option value="">Any</option>
              <option value="true">Private Beach</option>
              <option value="false">No Beach</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#0A2F44]/20"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#0A2F44] border-2 border-[#0A2F44] rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#0A2F44] hover:text-white transform hover:scale-105 group"
          >
            {showAdvancedFilters ? (
              <>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Ocean Features
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Discover Ocean Features
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  interface ActiveFilter {
    name: keyof ResortFilters;
    label: string;
    value: FilterValue;
  }

  // Build active filters array
  const activeFilters: ActiveFilter[] = [];
  
  if (filters.search) {
    activeFilters.push({
      name: "search",
      label: `"${filters.search}"`,
      value: filters.search,
    });
  }
  
  if (filters.starRating > 0) {
    activeFilters.push({
      name: "starRating",
      label: `${filters.starRating}+ Stars`,
      value: filters.starRating,
    });
  }
  
  if (filters.resortType) {
    activeFilters.push({
      name: "resortType",
      label: filters.resortType,
      value: filters.resortType,
    });
  }
  
  if (filters.location) {
    activeFilters.push({
      name: "location",
      label: filters.location,
      value: filters.location,
    });
  }
  
  if (filters.hasSpa !== null) {
    activeFilters.push({
      name: "hasSpa",
      label: `Spa: ${filters.hasSpa ? 'World-Class' : 'None'}`,
      value: filters.hasSpa,
    });
  }
  
  if (filters.hasPool !== null) {
    activeFilters.push({
      name: "hasPool",
      label: `Pool: ${filters.hasPool ? 'Infinity' : 'None'}`,
      value: filters.hasPool,
    });
  }
  
  if (filters.hasBeachAccess !== null) {
    activeFilters.push({
      name: "hasBeachAccess",
      label: `Beach: ${filters.hasBeachAccess ? 'Private' : 'None'}`,
      value: filters.hasBeachAccess,
    });
  }
  
  if (filters.priceRange[1] < 2000) {
    activeFilters.push({
      name: "priceRange",
      label: `Up to ${formatPrice(filters.priceRange[1])}`,
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
    <div className="border-t border-[#0A2F44]/10 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
        <span className="text-xs bg-[#0A2F44]/10 text-[#0A2F44] px-2 py-0.5 rounded-full">
          {activeFilters.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F0F5] text-[#0A2F44] rounded-full text-xs font-medium border border-[#0A2F44]/20 transition-all duration-200 hover:shadow-md group"
          >
            {filter.label}
            <button
              onClick={() => removeFilter(filter.name)}
              className="hover:text-red-500 transition-colors duration-200 ml-1"
              aria-label={`Remove ${filter.label} filter`}
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