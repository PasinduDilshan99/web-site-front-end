"use client";
import React, { useState } from "react";
import {
  VehicleSpecificationSearchRequest,
  HorsePowerRange,
} from "@/types/vehicle-types";

type FilterValue = string | number | null;

interface VehicleFilterSectionProps {
  filters: VehicleSpecificationSearchRequest;
  onFilterChange: (
    filterName: keyof VehicleSpecificationSearchRequest,
    value: FilterValue,
  ) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  makes: string[];
  models: string[];
  years: number[];
  bodyTypes: string[];
  seatOptions: number[];
  horsePowerRanges: string[];
  roofTypes: string[];
  acTypes: string[];
  horsePowerRange?: HorsePowerRange;
}

const VehicleFilterSection: React.FC<VehicleFilterSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onResetFilters,
  makes,
  models,
  years,
  bodyTypes,
  seatOptions,
  horsePowerRanges,
  roofTypes,
  acTypes,
  horsePowerRange,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    onFilterChange(
      name as keyof VehicleSpecificationSearchRequest,
      value || null,
    );
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof VehicleSpecificationSearchRequest,
  ) => {
    const value = e.target.value;
    onFilterChange(field, value ? Number(value) : null);
  };

  // Helper function to parse horse power range string back to number for API
  const handleHorsePowerChange = (value: string) => {
    if (!value) {
      onFilterChange("horsePower", null);
      return;
    }

    if (value.includes("-")) {
      const match = value.match(/(\d+)-(\d+)/);
      if (match) {
        const maxHp = parseInt(match[2], 10);
        onFilterChange("horsePower", maxHp);
      }
    } else if (value.includes("Under")) {
      const match = value.match(/Under (\d+)/);
      if (match && horsePowerRange) {
        onFilterChange("horsePower", parseInt(match[1], 10));
      }
    } else if (value.includes("Over")) {
      const match = value.match(/Over (\d+)/);
      if (match && horsePowerRange) {
        onFilterChange("horsePower", horsePowerRange.max);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-teal-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Filter Vehicles
        </h2>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={onResetFilters}
            className="cursor-pointer flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset
          </button>
          <button
            onClick={handleSearchClick}
            className="cursor-pointer flex-1 sm:flex-none px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* Make */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-teal-800">
            Make
          </label>
          <select
            name="make"
            value={filters.make || ""}
            onChange={handleInputChange}
            className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2314b8a6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-teal-800">
            Model
          </label>
          <select
            name="model"
            value={filters.model || ""}
            onChange={handleInputChange}
            className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2314b8a6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Models</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-teal-800">
            Year
          </label>
          <select
            value={filters.year || ""}
            onChange={(e) => handleNumberInputChange(e, "year")}
            className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2314b8a6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">Any Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters - Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showAdvancedFilters
            ? "max-h-96 opacity-100 mb-4 sm:mb-6"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Body Type */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-cyan-800">
              Body Type
            </label>
            <select
              name="bodyType"
              value={filters.bodyType || ""}
              onChange={handleInputChange}
              className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Body Types</option>
              {bodyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Seats */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-cyan-800">
              Seats
            </label>
            <select
              value={filters.seats || ""}
              onChange={(e) => handleNumberInputChange(e, "seats")}
              className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any Seats</option>
              {seatOptions.map((seats) => (
                <option key={seats} value={seats}>
                  {seats} Seats
                </option>
              ))}
            </select>
          </div>

          {/* Horsepower Range */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-cyan-800">
              Horsepower
            </label>
            <select
              value={getHorsePowerDisplayValue(
                filters.horsePower,
                horsePowerRanges,
              )}
              onChange={(e) => handleHorsePowerChange(e.target.value)}
              className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any HP</option>
              {horsePowerRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Roof Type */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-cyan-800">
              Roof Type
            </label>
            <select
              name="roofType"
              value={filters.roofType || ""}
              onChange={handleInputChange}
              className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Roof Types</option>
              {roofTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* AC Type */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-cyan-800">
              AC Type
            </label>
            <select
              name="acType"
              value={filters.acType || ""}
              onChange={handleInputChange}
              className="text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All AC Types</option>
              {acTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Separator Line with Advanced Filters Button */}
      <div
        className={`relative ${showAdvancedFilters ? "mt-4 sm:mt-6" : "mb-2 sm:mb-4"}`}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-teal-300"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="cursor-pointer inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAdvancedFilters ? (
              <>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="hidden xs:inline">Hide</span> Advanced Filters
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="hidden xs:inline">Show</span> Advanced Filters
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      <ActiveFiltersSummary
        filters={filters}
        onFilterChange={onFilterChange}
        horsePowerRanges={horsePowerRanges}
      />
    </div>
  );
};

// Helper function to get display value for horsepower
const getHorsePowerDisplayValue = (
  horsePower: number | null | undefined,
  ranges: string[],
): string => {
  if (!horsePower) return "";

  for (const range of ranges) {
    if (range.includes("-")) {
      const [min, max] = range.replace(" HP", "").split("-").map(Number);
      if (horsePower >= min && horsePower <= max) {
        return range;
      }
    } else if (range.includes("Under")) {
      const max = parseInt(range.replace("Under ", "").replace(" HP", ""), 10);
      if (horsePower < max) {
        return range;
      }
    } else if (range.includes("Over")) {
      const min = parseInt(range.replace("Over ", "").replace(" HP", ""), 10);
      if (horsePower > min) {
        return range;
      }
    }
  }

  return "";
};

// Active Filters Summary Component
interface ActiveFiltersSummaryProps {
  filters: VehicleSpecificationSearchRequest;
  onFilterChange: (
    filterName: keyof VehicleSpecificationSearchRequest,
    value: FilterValue,
  ) => void;
  horsePowerRanges?: string[];
}

const ActiveFiltersSummary: React.FC<ActiveFiltersSummaryProps> = ({
  filters,
  onFilterChange,
  horsePowerRanges = [],
}) => {
  interface ActiveFilter {
    name: keyof VehicleSpecificationSearchRequest;
    label: string;
    value: FilterValue;
  }

  const activeFilters: ActiveFilter[] = [];

  if (filters.make) {
    activeFilters.push({
      name: "make",
      label: `Make: ${filters.make}`,
      value: filters.make,
    });
  }

  if (filters.model) {
    activeFilters.push({
      name: "model",
      label: `Model: ${filters.model}`,
      value: filters.model,
    });
  }

  if (filters.year) {
    activeFilters.push({
      name: "year",
      label: `Year: ${filters.year}`,
      value: filters.year,
    });
  }

  if (filters.bodyType) {
    activeFilters.push({
      name: "bodyType",
      label: `Body: ${filters.bodyType}`,
      value: filters.bodyType,
    });
  }

  if (filters.seats) {
    activeFilters.push({
      name: "seats",
      label: `Seats: ${filters.seats}`,
      value: filters.seats,
    });
  }

  if (filters.horsePower) {
    const displayValue = getHorsePowerDisplayValue(
      filters.horsePower,
      horsePowerRanges,
    );
    activeFilters.push({
      name: "horsePower",
      label: `HP: ${displayValue || filters.horsePower}`,
      value: filters.horsePower,
    });
  }

  if (filters.roofType) {
    activeFilters.push({
      name: "roofType",
      label: `Roof: ${filters.roofType}`,
      value: filters.roofType,
    });
  }

  if (filters.acType) {
    activeFilters.push({
      name: "acType",
      label: `AC: ${filters.acType}`,
      value: filters.acType,
    });
  }

  if (activeFilters.length === 0) return null;

  const resetValues: Record<
    keyof VehicleSpecificationSearchRequest,
    FilterValue
  > = {
    make: null,
    model: null,
    year: null,
    bodyType: null,
    horsePower: null,
    seats: null,
    roofType: null,
    acType: null,
    pageNumber: 1,
    pageSize: 12,
  };

  const removeFilter = (
    filterName: keyof VehicleSpecificationSearchRequest,
  ) => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t border-teal-300 pt-3 sm:pt-4 mt-3 sm:mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs sm:text-sm font-semibold text-teal-800">
          Active Filters:
        </span>
        <span className="text-xs sm:text-sm text-teal-600">
          ({activeFilters.length})
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 rounded-full text-xs font-medium border border-teal-200 transition-all duration-200 hover:shadow-md"
          >
            {filter.label}
            <button
              onClick={() => removeFilter(filter.name)}
              className="hover:text-rose-600 transition-colors duration-200 ml-1"
            >
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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

export default VehicleFilterSection;
