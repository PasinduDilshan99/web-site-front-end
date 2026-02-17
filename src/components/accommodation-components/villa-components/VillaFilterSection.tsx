// app/villas/components/VillaFilterSection.tsx
import React, { useState } from "react";

interface VillaFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  villaType: string;
  amenities: string[];
  hasParking: boolean | null;
  hasWifi: boolean | null;
  isPetFriendly: boolean | null;
  minCapacity: number;
}

// Define a type for all possible filter values
type FilterValue = 
  | string 
  | number 
  | [number, number] 
  | boolean | null 
  | string[];

interface VillaFilterSectionProps {
  filters: VillaFilters;
  onFilterChange: (filterName: keyof VillaFilters, value: FilterValue) => void;
  onResetFilters: () => void;
  locations: string[];
  villaTypes: string[];
  amenities: string[];
}

const VillaFilterSection: React.FC<VillaFilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  locations,
  villaTypes,
  amenities,
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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-[#1B4D3E]/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Nature-Inspired Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B4D3E]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#428577]/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1B4D3E] to-[#428577] bg-clip-text text-transparent">
            Find Your Private Villa
          </h2>
          <p className="text-sm text-gray-500 mt-1">Discover exclusive luxury retreats</p>
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full"></div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 border-2 border-[#1B4D3E] text-[#1B4D3E] rounded-xl hover:bg-[#1B4D3E] hover:text-white transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
            <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
            Search Villas
          </label>
          <input
            type="text"
            placeholder="Search by name, location..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 placeholder-gray-400 transition-all group-hover:border-[#1B4D3E]/30"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
            Price Range (per night)
          </label>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#1B4D3E] bg-[#1B4D3E]/10 px-3 py-1 rounded-full">
              {formatPrice(filters.priceRange[0])}
            </span>
            <span className="text-xs text-gray-400">to</span>
            <span className="text-sm font-medium text-[#428577] bg-[#428577]/10 px-3 py-1 rounded-full">
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
            className="w-full h-2 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-lg appearance-none cursor-pointer accent-[#1B4D3E]"
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
            <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
            Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  onFilterChange("starRating", rating === filters.starRating ? 0 : rating)
                }
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  filters.starRating >= rating
                    ? "bg-gradient-to-r from-[#1B4D3E] to-[#428577] text-white shadow-md"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-[#1B4D3E]"
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

        {/* Villa Type */}
        <div className="space-y-2 group">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
            Villa Type
          </label>
          <select
            value={filters.villaType}
            onChange={(e) => onFilterChange("villaType", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
          >
            <option value="">All Types</option>
            {villaTypes.map((type) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-[#1B4D3E]/10">
          {/* Location */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Capacity */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              Guest Capacity
            </label>
            <select
              value={filters.minCapacity}
              onChange={(e) => onFilterChange("minCapacity", parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
            >
              <option value="0">Any Capacity</option>
              {[2, 4, 6, 8, 10, 12, 16].map((capacity) => (
                <option key={capacity} value={capacity}>
                  {capacity}+ Guests
                </option>
              ))}
            </select>
          </div>

          {/* WiFi */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              WiFi
            </label>
            <select
              value={filters.hasWifi === null ? "" : filters.hasWifi.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasWifi", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
            >
              <option value="">Any</option>
              <option value="true">High-Speed WiFi</option>
              <option value="false">No WiFi</option>
            </select>
          </div>

          {/* Parking */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              Parking
            </label>
            <select
              value={filters.hasParking === null ? "" : filters.hasParking.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("hasParking", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
            >
              <option value="">Any</option>
              <option value="true">Private Parking</option>
              <option value="false">No Parking</option>
            </select>
          </div>

          {/* Pet Friendly */}
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              Pet Friendly
            </label>
            <select
              value={filters.isPetFriendly === null ? "" : filters.isPetFriendly.toString()}
              onChange={(e) => {
                const value = e.target.value === "" ? null : e.target.value === "true";
                onFilterChange("isPetFriendly", value);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] bg-white text-gray-900 font-medium transition-all group-hover:border-[#1B4D3E]/30"
            >
              <option value="">Any</option>
              <option value="true">Pet Friendly</option>
              <option value="false">No Pets</option>
            </select>
          </div>

          {/* Amenities Preview */}
          <div className="space-y-2 group md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#1B4D3E] rounded-full"></span>
              Premium Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 3).map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#1B4D3E] focus:ring-[#1B4D3E]/30"
                  />
                  <span className="capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1B4D3E]/20"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#1B4D3E] border-2 border-[#1B4D3E] rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#1B4D3E] hover:text-white transform hover:scale-105 group"
          >
            {showAdvancedFilters ? (
              <>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Advanced Filters
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
  filters: VillaFilters;
  onFilterChange: (filterName: keyof VillaFilters, value: FilterValue) => void;
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
    name: keyof VillaFilters;
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
  
  if (filters.villaType) {
    activeFilters.push({
      name: "villaType",
      label: filters.villaType,
      value: filters.villaType,
    });
  }
  
  if (filters.location) {
    activeFilters.push({
      name: "location",
      label: filters.location,
      value: filters.location,
    });
  }
  
  if (filters.minCapacity > 0) {
    activeFilters.push({
      name: "minCapacity",
      label: `${filters.minCapacity}+ Guests`,
      value: filters.minCapacity,
    });
  }
  
  if (filters.hasWifi !== null) {
    activeFilters.push({
      name: "hasWifi",
      label: `WiFi: ${filters.hasWifi ? 'High-Speed' : 'None'}`,
      value: filters.hasWifi,
    });
  }
  
  if (filters.hasParking !== null) {
    activeFilters.push({
      name: "hasParking",
      label: `Parking: ${filters.hasParking ? 'Private' : 'None'}`,
      value: filters.hasParking,
    });
  }
  
  if (filters.isPetFriendly !== null) {
    activeFilters.push({
      name: "isPetFriendly",
      label: `Pets: ${filters.isPetFriendly ? 'Allowed' : 'Not Allowed'}`,
      value: filters.isPetFriendly,
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

  const resetValues: Record<keyof VillaFilters, FilterValue> = {
    search: "",
    priceRange: [0, 2000],
    starRating: 0,
    location: "",
    villaType: "",
    amenities: [],
    hasParking: null,
    hasWifi: null,
    isPetFriendly: null,
    minCapacity: 0,
  };

  const removeFilter = (filterName: keyof VillaFilters) => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t border-[#1B4D3E]/10 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
        <span className="text-xs bg-[#1B4D3E]/10 text-[#1B4D3E] px-2 py-0.5 rounded-full">
          {activeFilters.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F3EF] text-[#1B4D3E] rounded-full text-xs font-medium border border-[#1B4D3E]/20 transition-all duration-200 hover:shadow-md group"
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

export default VillaFilterSection;