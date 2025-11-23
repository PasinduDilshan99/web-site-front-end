import { Vehicle, VehicleFilters } from '@/types/vehicle-types';
import React, { useState } from 'react';

interface FilterSectionProps {
  filters: VehicleFilters;
  onFilterChange: (filterName: keyof VehicleFilters, value: any) => void;
  onResetFilters: () => void;
  vehicles: Vehicle[];
}

const VehicleFilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  vehicles,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract unique values for filter options from vehicles data
  const makes = Array.from(new Set(vehicles.map(v => v.specification.make)));
  const models = Array.from(new Set(vehicles.map(v => v.specification.model)));
  const bodyTypes = Array.from(new Set(vehicles.map(v => v.specification.bodyType)));
  const engineTypes = Array.from(new Set(vehicles.map(v => v.specification.engineType)));
  const statuses = Array.from(new Set(vehicles.map(v => v.status)));
  
  const years = Array.from(new Set(vehicles.map(v => v.specification.year))).sort();
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  
  const horsepowers = vehicles.map(v => v.specification.horsepowerHp);
  const minHorsepower = Math.min(...horsepowers);
  const maxHorsepower = Math.max(...horsepowers);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl p-4 md:p-6 mb-6 border-2 border-amber-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
          Filter Vehicles
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="px-4 md:px-6 py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white rounded-lg hover:from-amber-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Search
          </label>
          <input
            type="text"
            placeholder="Search vehicles..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all text-sm"
          />
        </div>

        {/* Make */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => onFilterChange('make', e.target.value)}
            className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer text-sm"
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer text-sm"
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Body Type
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => onFilterChange('bodyType', e.target.value)}
            className="w-full px-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer text-sm"
          >
            <option value="">All Body Types</option>
            {bodyTypes.map((bodyType) => (
              <option key={bodyType} value={bodyType}>
                {bodyType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters - Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showAdvancedFilters
            ? 'max-h-96 opacity-100 mb-6'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Year Range */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Year Range: {filters.yearRange[0]} - {filters.yearRange[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={filters.yearRange[1]}
                onChange={(e) =>
                  onFilterChange('yearRange', [
                    filters.yearRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-gradient-to-r from-amber-300 to-purple-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                onFilterChange('priceRange', [
                  filters.priceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full h-2 bg-gradient-to-r from-amber-300 to-purple-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Engine Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Engine Type
            </label>
            <select
              value={filters.engineType}
              onChange={(e) => onFilterChange('engineType', e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">All Engine Types</option>
              {engineTypes.map((engineType) => (
                <option key={engineType} value={engineType}>
                  {engineType}
                </option>
              ))}
            </select>
          </div>

          {/* Horsepower Range */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Horsepower: {filters.minHorsepower} - {filters.maxHorsepower} HP
            </label>
            <input
              type="range"
              min={minHorsepower}
              max={maxHorsepower}
              step="10"
              value={filters.maxHorsepower}
              onChange={(e) =>
                onFilterChange('maxHorsepower', parseInt(e.target.value))
              }
              className="w-full h-2 bg-gradient-to-r from-amber-300 to-purple-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Separator Line with Advanced Filters Button */}
      <div className={`relative ${showAdvancedFilters ? 'mt-6' : 'mb-4'}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-amber-200"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
  filters: VehicleFilters;
  onFilterChange: (filterName: keyof VehicleFilters, value: any) => void;
}> = ({ filters, onFilterChange }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const activeFilters = [
    filters.search && {
      name: 'search',
      label: `Search: "${filters.search}"`,
      value: filters.search,
    },
    filters.make && {
      name: 'make',
      label: `Make: ${filters.make}`,
      value: filters.make,
    },
    filters.status && {
      name: 'status',
      label: `Status: ${filters.status}`,
      value: filters.status,
    },
    filters.bodyType && {
      name: 'bodyType',
      label: `Body Type: ${filters.bodyType}`,
      value: filters.bodyType,
    },
    filters.engineType && {
      name: 'engineType',
      label: `Engine: ${filters.engineType}`,
      value: filters.engineType,
    },
    filters.yearRange[1] < 2023 && {
      name: 'yearRange',
      label: `Year up to: ${filters.yearRange[1]}`,
      value: filters.yearRange,
    },
    filters.priceRange[1] < 100000 && {
      name: 'priceRange',
      label: `Price up to: ${formatPrice(filters.priceRange[1])}`,
      value: filters.priceRange,
    },
    filters.maxHorsepower < 500 && {
      name: 'maxHorsepower',
      label: `Horsepower up to: ${filters.maxHorsepower} HP`,
      value: filters.maxHorsepower,
    },
  ].filter(Boolean);

  if (activeFilters.length === 0) return null;

  const removeFilter = (filterName: string) => {
    const resetValues: { [key: string]: any } = {
      search: '',
      make: '',
      status: '',
      bodyType: '',
      engineType: '',
      yearRange: [2000, 2023],
      priceRange: [0, 100000],
      maxHorsepower: 500,
    };
    onFilterChange(
      filterName as keyof VehicleFilters,
      resetValues[filterName]
    );
  };

  return (
    <div className="border-t-2 border-amber-200 pt-4 mt-4">
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
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-100 to-purple-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200 transition-all duration-200 hover:shadow-md"
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