// app/hostels/components/HostelFilterSection.tsx
import React, { useState } from "react";

interface HostelFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  hostelType: string;
  amenities: string[];
  hasParking: boolean | null;
  hasWifi: boolean | null;
  isPetFriendly: boolean | null;
  roomCapacity: number;
}

interface HostelFilterSectionProps {
  filters: HostelFilters;
  onFilterChange: (filterName: keyof HostelFilters, value: any) => void;
  onResetFilters: () => void;
  locations: string[];
  hostelTypes: string[];
  roomCapacities: number[];
}

const HostelFilterSection: React.FC<HostelFilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  locations,
  hostelTypes,
  roomCapacities,
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
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-green-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Filter Hostels
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
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
            🔍 Search Hostels
          </label>
          <input
            type="text"
            placeholder="Search by name, location..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            💰 Budget Range
          </label>
          <div className="text-sm font-medium text-green-700 mb-2">
            {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-3 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
        </div>

        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            ⭐ Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Hostel Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            🏕️ Hostel Type
          </label>
          <select
            value={filters.hostelType}
            onChange={(e) => onFilterChange("hostelType", e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
          >
            <option value="">All Types</option>
            {hostelTypes.map((type) => (
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
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Room Capacity */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              👥 Room Capacity
            </label>
            <select
              value={filters.roomCapacity}
              onChange={(e) => onFilterChange("roomCapacity", parseInt(e.target.value))}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="0">Any Capacity</option>
              {roomCapacities.map((capacity) => (
                <option key={capacity} value={capacity}>
                  {capacity}+ people
                </option>
              ))}
            </select>
          </div>

          {/* WiFi */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              🌐 WiFi
            </label>
            <select
              value={filters.hasWifi === null ? "" : filters.hasWifi.toString()}
              onChange={(e) => onFilterChange("hasWifi", e.target.value === "" ? null : e.target.value === "true")}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">With WiFi</option>
              <option value="false">Without WiFi</option>
            </select>
          </div>

          {/* Parking */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              🅿️ Parking
            </label>
            <select
              value={filters.hasParking === null ? "" : filters.hasParking.toString()}
              onChange={(e) => onFilterChange("hasParking", e.target.value === "" ? null : e.target.value === "true")}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">With Parking</option>
              <option value="false">Without Parking</option>
            </select>
          </div>

          {/* Pet Friendly */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              🐾 Pet Friendly
            </label>
            <select
              value={filters.isPetFriendly === null ? "" : filters.isPetFriendly.toString()}
              onChange={(e) => onFilterChange("isPetFriendly", e.target.value === "" ? null : e.target.value === "true")}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all"
            >
              <option value="">Any</option>
              <option value="true">Pet Friendly</option>
              <option value="false">Not Pet Friendly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-green-200"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAdvancedFilters ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Advanced Filters
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
const ActiveFiltersSummary: React.FC<{
  filters: HostelFilters;
  onFilterChange: (filterName: keyof HostelFilters, value: any) => void;
}> = ({ filters, onFilterChange }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const activeFilters = [
    filters.search && {
      name: "search",
      label: `Search: "${filters.search}"`,
      value: filters.search,
    },
    filters.starRating > 0 && {
      name: "starRating",
      label: `Rating: ${filters.starRating}+ stars`,
      value: filters.starRating,
    },
    filters.hostelType && {
      name: "hostelType",
      label: `Type: ${filters.hostelType}`,
      value: filters.hostelType,
    },
    filters.location && {
      name: "location",
      label: `Location: ${filters.location}`,
      value: filters.location,
    },
    filters.roomCapacity > 0 && {
      name: "roomCapacity",
      label: `Capacity: ${filters.roomCapacity}+ people`,
      value: filters.roomCapacity,
    },
    filters.hasWifi !== null && {
      name: "hasWifi",
      label: `WiFi: ${filters.hasWifi ? 'Yes' : 'No'}`,
      value: filters.hasWifi,
    },
    filters.hasParking !== null && {
      name: "hasParking",
      label: `Parking: ${filters.hasParking ? 'Yes' : 'No'}`,
      value: filters.hasParking,
    },
    filters.isPetFriendly !== null && {
      name: "isPetFriendly",
      label: `Pets: ${filters.isPetFriendly ? 'Allowed' : 'Not Allowed'}`,
      value: filters.isPetFriendly,
    },
    filters.priceRange[1] < 500 && {
      name: "priceRange",
      label: `Budget up to: ${formatPrice(filters.priceRange[1])}`,
      value: filters.priceRange,
    },
  ].filter(Boolean);

  if (activeFilters.length === 0) return null;

  const removeFilter = (filterName: string) => {
    const resetValues: { [key: string]: any } = {
      search: "",
      starRating: 0,
      hostelType: "",
      location: "",
      roomCapacity: 0,
      hasWifi: null,
      hasParking: null,
      isPetFriendly: null,
      priceRange: [0, 500],
    };
    onFilterChange(filterName as keyof HostelFilters, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-green-200 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-800">
          Active Filters:
        </span>
        <span className="text-sm text-gray-600">({activeFilters.length})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter: any) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 rounded-full text-xs font-medium border border-green-200 transition-all duration-200 hover:shadow-md"
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

export default HostelFilterSection;