// components/vehicle-types-components/VehicleTypesFilterSection.tsx
"use client";
import { VehicleTypeFilters } from "@/types/vehicle-types";
import React from "react";

interface VehicleTypesFilterSectionProps {
  filters: VehicleTypeFilters;
  onFilterChange: (filterName: keyof VehicleTypeFilters, value: string) => void;
  onSearch: () => void;
  onResetFilters: () => void;
}

const VehicleTypesFilterSection: React.FC<VehicleTypesFilterSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onResetFilters,
}) => {
  const handleSearchClick = () => {
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-purple-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Search Vehicle Types
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="cursor-pointer px-4 lg:px-6 py-1 lg:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Clear Search
          </button>
          <button
            onClick={handleSearchClick}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
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

      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-purple-800">
            Search by Name or Description
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., Sedan, Van, Coach..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-sm lg:text-md flex-1 px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
            />
          </div>
          <p className="text-xs text-purple-600 mt-2">
            Type to filter vehicle types by name or description
          </p>
        </div>
      </div>

      {/* Active Filters Summary */}
      {filters.search && (
        <div className="border-t-2 border-purple-300 pt-4 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-purple-800">
              Active Filter:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">
              Search: {filters.search}
              <button
                onClick={() => onFilterChange("search", "")}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTypesFilterSection;