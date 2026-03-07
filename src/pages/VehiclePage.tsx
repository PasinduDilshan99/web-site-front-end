// pages/VehiclePage.tsx
"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Vehicle, VehicleFilters } from "@/types/vehicle-types";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import { vehicleService } from "@/services/vehicleService";
import VehiclesLoading from "@/components/vehicle-components/specification-components/VehiclesLoading";
import VehicleFilterSection from "@/components/vehicle-components/VehicleFilterSection";
import VehiclesLoadingError from "@/components/vehicle-components/VehicleLoadingError";
import VehiclesGrid from "@/components/vehicle-components/VehiclesGrid";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: VehicleFilters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.make) params.set("make", filters.make);
  if (filters.bodyType) params.set("bodyType", filters.bodyType);
  if (filters.engineType) params.set("engineType", filters.engineType);
  if (filters.transmission) params.set("transmission", filters.transmission);
  if (filters.fuelType) params.set("fuelType", filters.fuelType);
  if (filters.seatCapacity) params.set("seatCapacity", filters.seatCapacity);

  // Year range
  if (filters.yearRange[0] > 0)
    params.set("minYear", filters.yearRange[0].toString());
  if (filters.yearRange[1] < 2030)
    params.set("maxYear", filters.yearRange[1].toString());

  // Horsepower range
  if (filters.horsepowerRange[0] > 0)
    params.set("minHp", filters.horsepowerRange[0].toString());
  if (filters.horsepowerRange[1] < 1000)
    params.set("maxHp", filters.horsepowerRange[1].toString());

  // Price range
  if (filters.priceRange[0] > 0)
    params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange[1] < 100000)
    params.set("maxPrice", filters.priceRange[1].toString());

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): VehicleFilters => {
  return {
    search: params.get("search") || "",
    make: params.get("make") || "",
    bodyType: params.get("bodyType") || "",
    yearRange: [
      Number(params.get("minYear")) || 2000,
      Number(params.get("maxYear")) || 2030,
    ],
    engineType: params.get("engineType") || "",
    transmission: params.get("transmission") || "",
    fuelType: params.get("fuelType") || "",
    horsepowerRange: [
      Number(params.get("minHp")) || 0,
      Number(params.get("maxHp")) || 1000,
    ],
    seatCapacity: params.get("seatCapacity") || "",
    priceRange: [
      Number(params.get("minPrice")) || 0,
      Number(params.get("maxPrice")) || 100000,
    ],
  };
};

const urlParamsToPagination = (
  params: URLSearchParams,
): { page: number; pageSize: number } => {
  return {
    page: Number(params.get("page")) || 1,
    pageSize: Number(params.get("pageSize")) || 12,
  };
};

// Main component wrapped with Suspense for useSearchParams
const VehiclePageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<{
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
  }>({
    makes: [],
    bodyTypes: [],
    engineTypes: [],
    transmissions: [],
    fuelTypes: [],
    seatCapacities: [],
    minYear: 2000,
    maxYear: 2024,
    minHorsepower: 0,
    maxHorsepower: 1000,
    minPrice: 0,
    maxPrice: 100000,
  });

  // Initialize filters from URL params
  const [filters, setFilters] = useState<VehicleFilters>(() =>
    urlParamsToFilters(new URLSearchParams(searchParams?.toString())),
  );

  // Pagination states from URL params
  const [currentPage, setCurrentPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString())).page,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString()))
        .pageSize,
  );

  const [totalVehicles, setTotalVehicles] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Fetch all vehicles on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const { vehicles, error } = await vehicleService.fetchVehicles();

        if (error) {
          setError(error);
        } else {
          setAllVehicles(vehicles);

          // Extract filter options from all vehicles
          const options = vehicleService.extractFilterOptions(vehicles);
          setFilterOptions(options);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchVehicles();
  }, []);

  // Apply filters and pagination when filters or pagination change
  useEffect(() => {
    if (allVehicles.length > 0 && !isInitialLoad) {
      const {
        filteredVehicles: paginatedVehicles,
        totalFiltered,
        totalPages,
      } = vehicleService.filterVehicles(
        allVehicles,
        filters,
        currentPage,
        itemsPerPage,
      );

      setFilteredVehicles(paginatedVehicles);
      setTotalVehicles(totalFiltered);
      setTotalPages(totalPages);
    }
  }, [allVehicles, filters, currentPage, itemsPerPage, isInitialLoad]);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: VehicleFilters, page: number, pageSize: number) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleFilterChange = (
    filterName: keyof VehicleFilters,
    value: string | [number, number],
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = (): void => {
    updateUrlParams(filters, 1, itemsPerPage);
  };

  const resetFilters = (): void => {
    const resetFilterValues: VehicleFilters = {
      search: "",
      make: "",
      bodyType: "",
      yearRange: [filterOptions.minYear, filterOptions.maxYear],
      engineType: "",
      transmission: "",
      fuelType: "",
      horsepowerRange: [
        filterOptions.minHorsepower,
        filterOptions.maxHorsepower,
      ],
      seatCapacity: "",
      priceRange: [filterOptions.minPrice, filterOptions.maxPrice],
    };

    setFilters(resetFilterValues);
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setIsInitialLoad(true);

    const fetchVehicles = async () => {
      try {
        const { vehicles, error } = await vehicleService.fetchVehicles();
        if (error) {
          setError(error);
        } else {
          setAllVehicles(vehicles);
          const options = vehicleService.extractFilterOptions(vehicles);
          setFilterOptions(options);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchVehicles();
  };

  const handlePageChange = (page: number) => {
    updateUrlParams(filters, page, itemsPerPage);
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    updateUrlParams(filters, 1, value);
  };

  if (loading) {
    return <VehiclesLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <VehiclesLoadingError
        onRetry={handleRetry}
        message="Couldn't fetch vehicles."
      />
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Vehicles"
          description="Discover the perfect vehicle for your journey in Sri Lanka"
          fromColor="#3B82F6"
          toColor="#8B5CF6"
        />
      </div>

      {/* Filters Section */}
      <VehicleFilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onResetFilters={resetFilters}
        filterOptions={filterOptions}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg lg:text-2xl font-semibold text-blue-900">
            {totalVehicles} Vehicle{totalVehicles !== 1 ? "s" : ""} Found
          </h3>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-blue-800 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer border border-blue-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-blue-700 transition-all duration-200 hover:border-blue-400"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
            <span className="text-sm text-blue-600 whitespace-nowrap font-medium">
              per page
            </span>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <>
            <VehiclesGrid
              vehicles={filteredVehicles}
              displayCount={filteredVehicles.length}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalVehicles}
                itemsPerPage={itemsPerPage}
                startIndex={startIndex}
                endIndex={Math.min(endIndex, totalVehicles)}
              />
            )}
          </>
        ) : (
          <NoResults onResetFilters={resetFilters} />
        )}
      </div>
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const VehiclePage: React.FC = () => {
  return (
    <Suspense fallback={<VehiclesLoading itemsPerPage={12} />}>
      <VehiclePageContent />
    </Suspense>
  );
};

export default VehiclePage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-blue-600 text-lg mb-4">
      No vehicles found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Reset Filters
    </button>
  </div>
);

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-blue-200">
      <div className="text-sm text-blue-600 font-medium">
        Showing {startIndex + 1} to {endIndex} of {totalItems} results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-700 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Previous page"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-sm font-medium text-blue-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`cursor-pointer min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-blue-700 bg-white border-2 border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 hover:shadow-md"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-700 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
