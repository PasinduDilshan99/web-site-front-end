// components/vehicles-components/VehicleFilterSection.tsx
"use client";
import { VehicleFilters } from "@/types/vehicle-types";
import React, { useState } from "react";

type FilterValue = string | [number, number];

interface VehicleFilterSectionProps {
  filters: VehicleFilters;
  onFilterChange: (filterName: keyof VehicleFilters, value: FilterValue) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  filterOptions: {
    makes: string[];
    bodyTypes: string[];
    engineTypes: string[];
    transmissions: string[];
    fuelTypes: string[];
    seatCapacities: number[];
    minYear: number;
    maxYear: number;
    minHorsepower: number;
    maxHorsepower: number;
    minPrice: number;
    maxPrice: number;
  };
}

const VehicleFilterSection: React.FC<VehicleFilterSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onResetFilters,
  filterOptions,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const handleYearRangeChange = (minMax: "min" | "max", value: number) => {
    const newRange: [number, number] = [...filters.yearRange] as [number, number];
    if (minMax === "min") {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    onFilterChange("yearRange", newRange);
  };

  const handleHorsepowerRangeChange = (minMax: "min" | "max", value: number) => {
    const newRange: [number, number] = [...filters.horsepowerRange] as [number, number];
    if (minMax === "min") {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    onFilterChange("horsepowerRange", newRange);
  };

  const handlePriceRangeChange = (minMax: "min" | "max", value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    if (minMax === "min") {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    onFilterChange("priceRange", newRange);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-blue-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Filter Vehicles
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="cursor-pointer px-4 lg:px-6 py-1 lg:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
          <button
            onClick={handleSearchClick}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by make, model, reg no..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Make */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => onFilterChange("make", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233B82F6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Makes</option>
            {filterOptions.makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800">
            Body Type
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => onFilterChange("bodyType", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233B82F6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="">All Body Types</option>
            {filterOptions.bodyTypes.map((type) => (
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
          showAdvancedFilters ? "max-h-[800px] opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Year Range */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Year Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={filterOptions.minYear}
                max={filterOptions.maxYear}
                value={filters.yearRange[0]}
                onChange={(e) => handleYearRangeChange("min", parseInt(e.target.value) || filterOptions.minYear)}
                className="text-sm w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Min"
              />
              <span className="text-indigo-600 font-semibold">-</span>
              <input
                type="number"
                min={filterOptions.minYear}
                max={filterOptions.maxYear}
                value={filters.yearRange[1]}
                onChange={(e) => handleYearRangeChange("max", parseInt(e.target.value) || filterOptions.maxYear)}
                className="text-sm w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Engine Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Engine Type
            </label>
            <select
              value={filters.engineType}
              onChange={(e) => onFilterChange("engineType", e.target.value)}
              className="text-sm w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234f46e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Engine Types</option>
              {filterOptions.engineTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Transmission
            </label>
            <select
              value={filters.transmission}
              onChange={(e) => onFilterChange("transmission", e.target.value)}
              className="text-sm w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234f46e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Transmissions</option>
              {filterOptions.transmissions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Fuel Type
            </label>
            <select
              value={filters.fuelType}
              onChange={(e) => onFilterChange("fuelType", e.target.value)}
              className="text-sm w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234f46e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">All Fuel Types</option>
              {filterOptions.fuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Horsepower Range */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Horsepower (HP)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={filterOptions.minHorsepower}
                max={filterOptions.maxHorsepower}
                value={filters.horsepowerRange[0]}
                onChange={(e) => handleHorsepowerRangeChange("min", parseInt(e.target.value) || filterOptions.minHorsepower)}
                className="text-sm w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Min"
              />
              <span className="text-indigo-600 font-semibold">-</span>
              <input
                type="number"
                min={filterOptions.minHorsepower}
                max={filterOptions.maxHorsepower}
                value={filters.horsepowerRange[1]}
                onChange={(e) => handleHorsepowerRangeChange("max", parseInt(e.target.value) || filterOptions.maxHorsepower)}
                className="text-sm w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Seat Capacity */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-indigo-800">
              Seat Capacity
            </label>
            <select
              value={filters.seatCapacity}
              onChange={(e) => onFilterChange("seatCapacity", e.target.value)}
              className="text-sm w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234f46e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any Seats</option>
              {filterOptions.seatCapacities.map((seats) => (
                <option key={seats} value={seats}>
                  {seats} Seats
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold text-indigo-800">
              Price Range: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={filterOptions.minPrice}
                max={filterOptions.maxPrice}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange("min", parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-indigo-600 font-semibold whitespace-nowrap">to</span>
              <input
                type="range"
                min={filterOptions.minPrice}
                max={filterOptions.maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange("max", parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line with Advanced Filters Button */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-blue-300"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
      <ActiveFiltersSummary 
        filters={filters} 
        onFilterChange={onFilterChange}
        filterOptions={filterOptions}
      />
    </div>
  );
};

// Active Filters Summary Component
interface ActiveFiltersSummaryProps {
  filters: VehicleFilters;
  onFilterChange: (filterName: keyof VehicleFilters, value: FilterValue) => void;
  filterOptions: VehicleFilterSectionProps["filterOptions"];
}

const ActiveFiltersSummary: React.FC<ActiveFiltersSummaryProps> = ({
  filters,
  onFilterChange,
  filterOptions,
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  interface ActiveFilter {
    name: keyof VehicleFilters;
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

  if (filters.make) {
    activeFilters.push({
      name: "make",
      label: `Make: ${filters.make}`,
      value: filters.make,
    });
  }

  if (filters.bodyType) {
    activeFilters.push({
      name: "bodyType",
      label: `Body: ${filters.bodyType}`,
      value: filters.bodyType,
    });
  }

  if (filters.engineType) {
    activeFilters.push({
      name: "engineType",
      label: `Engine: ${filters.engineType}`,
      value: filters.engineType,
    });
  }

  if (filters.transmission) {
    activeFilters.push({
      name: "transmission",
      label: `Transmission: ${filters.transmission}`,
      value: filters.transmission,
    });
  }

  if (filters.fuelType) {
    activeFilters.push({
      name: "fuelType",
      label: `Fuel: ${filters.fuelType}`,
      value: filters.fuelType,
    });
  }

  if (filters.seatCapacity) {
    activeFilters.push({
      name: "seatCapacity",
      label: `Seats: ${filters.seatCapacity}`,
      value: filters.seatCapacity,
    });
  }

  if (filters.yearRange[0] > filterOptions.minYear || filters.yearRange[1] < filterOptions.maxYear) {
    activeFilters.push({
      name: "yearRange",
      label: `Year: ${filters.yearRange[0]} - ${filters.yearRange[1]}`,
      value: filters.yearRange,
    });
  }

  if (filters.horsepowerRange[0] > filterOptions.minHorsepower || filters.horsepowerRange[1] < filterOptions.maxHorsepower) {
    activeFilters.push({
      name: "horsepowerRange",
      label: `HP: ${filters.horsepowerRange[0]} - ${filters.horsepowerRange[1]}`,
      value: filters.horsepowerRange,
    });
  }

  if (filters.priceRange[0] > filterOptions.minPrice || filters.priceRange[1] < filterOptions.maxPrice) {
    activeFilters.push({
      name: "priceRange",
      label: `Price: ${formatCurrency(filters.priceRange[0])} - ${formatCurrency(filters.priceRange[1])}`,
      value: filters.priceRange,
    });
  }

  if (activeFilters.length === 0) return null;

  const resetValues: Record<keyof VehicleFilters, FilterValue> = {
    search: "",
    make: "",
    bodyType: "",
    yearRange: [filterOptions.minYear, filterOptions.maxYear] as [number, number],
    engineType: "",
    transmission: "",
    fuelType: "",
    horsepowerRange: [filterOptions.minHorsepower, filterOptions.maxHorsepower] as [number, number],
    seatCapacity: "",
    priceRange: [filterOptions.minPrice, filterOptions.maxPrice] as [number, number],
  };

  const removeFilter = (filterName: keyof VehicleFilters) => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-blue-300 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-blue-800">
          Active Filters:
        </span>
        <span className="text-sm text-blue-600">({activeFilters.length})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200 transition-all duration-200 hover:shadow-md"
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

export default VehicleFilterSection;