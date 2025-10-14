import { Filters } from "@/types/packages-types";
import React, { useState } from "react";

interface FilterSectionProps {
  filters: Filters;
  onFilterChange: (filterName: keyof Filters, value: any) => void;
  onResetFilters: () => void;
  packageTypes: string[];
  locations: string[];
  durations: number[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  packageTypes,
  locations,
  durations,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-purple-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
          Filter Packages
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg hover:from-purple-700 hover:to-amber-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Search
          </label>
          <input
            type="text"
            placeholder="Search packages..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Price Range
          </label>
          <div className="text-sm font-medium text-purple-700 mb-2">
            {formatPrice(filters.priceRange[0])} -{" "}
            {formatPrice(filters.priceRange[1])}
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange("priceRange", [
                filters.priceRange[0],
                parseInt(e.target.value),
              ])
            }
            className="w-full h-3 bg-gradient-to-r from-purple-300 to-amber-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Duration (Days)
          </label>
          <select
            value={filters.duration}
            onChange={(e) => onFilterChange("duration", e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239333ea' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">Any Duration</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration} Day{duration > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Package Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Package Type
          </label>
          <select
            value={filters.packageType}
            onChange={(e) => onFilterChange("packageType", e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239333ea' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Types</option>
            {packageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
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
          {/* Location - Full width on mobile, 1/3 on larger screens */}
          <div className="space-y-2 lg:col-span-1 mt-5">
            <label className="block text-sm font-semibold text-gray-800">
              Start Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239333ea' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Group Size - Full width on mobile, 1/3 on larger screens */}
          <div className="space-y-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-800">
              Group Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs text-gray-600">
                  Min Persons
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPersons}
                  onChange={(e) => onFilterChange("minPersons", e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 font-medium transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-600">
                  Max Persons
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPersons}
                  onChange={(e) => onFilterChange("maxPersons", e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 font-medium transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Date Range - Full width on mobile, 1/3 on larger screens */}
          <div className="space-y-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-800">
              Availability
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs text-gray-600">From Date</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onFilterChange("startDate", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-600">To Date</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onFilterChange("endDate", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line with Advanced Filters Button - Position changes based on state */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-purple-200"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
const ActiveFiltersSummary: React.FC<{
  filters: Filters;
  onFilterChange: (filterName: keyof Filters, value: any) => void;
}> = ({ filters, onFilterChange }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const activeFilters = [
    filters.search && {
      name: "search",
      label: `Search: "${filters.search}"`,
      value: filters.search,
    },
    filters.duration && {
      name: "duration",
      label: `Duration: ${filters.duration} days`,
      value: filters.duration,
    },
    filters.packageType && {
      name: "packageType",
      label: `Type: ${filters.packageType}`,
      value: filters.packageType,
    },
    filters.location && {
      name: "location",
      label: `Location: ${filters.location}`,
      value: filters.location,
    },
    filters.minPersons && {
      name: "minPersons",
      label: `Min Persons: ${filters.minPersons}`,
      value: filters.minPersons,
    },
    filters.maxPersons && {
      name: "maxPersons",
      label: `Max Persons: ${filters.maxPersons}`,
      value: filters.maxPersons,
    },
    filters.startDate && {
      name: "startDate",
      label: `From: ${new Date(filters.startDate).toLocaleDateString()}`,
      value: filters.startDate,
    },
    filters.endDate && {
      name: "endDate",
      label: `To: ${new Date(filters.endDate).toLocaleDateString()}`,
      value: filters.endDate,
    },
    filters.priceRange[1] < 100000 && {
      name: "priceRange",
      label: `Price up to: ${formatPrice(filters.priceRange[1])}`,
      value: filters.priceRange,
    },
  ].filter(Boolean);

  if (activeFilters.length === 0) return null;

  const removeFilter = (filterName: string) => {
    const resetValues: { [key: string]: any } = {
      search: "",
      duration: "",
      packageType: "",
      location: "",
      minPersons: "",
      maxPersons: "",
      startDate: "",
      endDate: "",
      priceRange: [0, 100000],
    };
    onFilterChange(filterName as keyof Filters, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-purple-200 pt-4 mt-4">
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
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-amber-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200 transition-all duration-200 hover:shadow-md"
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
