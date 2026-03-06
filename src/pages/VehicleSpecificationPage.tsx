"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import { vehicleService } from "@/services/vehicleService";
import { useCommon } from "@/context/CommonContext";
import {
  VehicleSpecificationSearchRequest,
  VehicleBasicDetails,
  VehicleSpecificationFilterResponse,
  HorsePowerRange,
} from "@/types/vehicle-types";
import VehiclesLoading from "@/components/vehicle-components/specification-components/VehiclesLoading";
import VehicleFilterSection from "@/components/vehicle-components/specification-components/VehicleFilterSection";
import VehiclesGrid from "@/components/vehicle-components/specification-components/VehiclesGrid";

// Default filter values - using pageNumber: 0 for zero-based pagination
const DEFAULT_FILTERS: VehicleSpecificationSearchRequest = {
  make: null,
  model: null,
  year: null,
  bodyType: null,
  horsePower: null,
  seats: null,
  roofType: null,
  acType: null,
  pageNumber: 0,
  pageSize: 12,
};

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: VehicleSpecificationSearchRequest,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.make) params.set("make", filters.make);
  if (filters.model) params.set("model", filters.model);
  if (filters.year) params.set("year", filters.year.toString());
  if (filters.bodyType) params.set("bodyType", filters.bodyType);
  if (filters.horsePower)
    params.set("horsePower", filters.horsePower.toString());
  if (filters.seats) params.set("seats", filters.seats.toString());
  if (filters.roofType) params.set("roofType", filters.roofType);
  if (filters.acType) params.set("acType", filters.acType);

  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (
  params: URLSearchParams,
): VehicleSpecificationSearchRequest => {
  return {
    make: params.get("make") || null,
    model: params.get("model") || null,
    year: params.get("year") ? Number(params.get("year")) : null,
    bodyType: params.get("bodyType") || null,
    horsePower: params.get("horsePower")
      ? Number(params.get("horsePower"))
      : null,
    seats: params.get("seats") ? Number(params.get("seats")) : null,
    roofType: params.get("roofType") || null,
    acType: params.get("acType") || null,
    pageNumber: 0,
    pageSize: 12,
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
const VehicleSpecificationPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicles, setVehicles] = useState<VehicleBasicDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersError, setFiltersError] = useState<string | null>(null);

  // Use the common context for filter options
  const { categories, loading: categoriesLoading } = useCommon();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<VehicleSpecificationSearchRequest>(
    () => {
      const urlFilters = urlParamsToFilters(
        new URLSearchParams(searchParams?.toString()),
      );
      return {
        ...DEFAULT_FILTERS,
        ...urlFilters,
      };
    },
  );

  // Pagination states from URL params (1-based for UI)
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

  // Filter options from API
  const [filterOptions, setFilterOptions] =
    useState<VehicleSpecificationFilterResponse>({
      makes: [],
      models: [],
      years: [],
      bodyTypes: [],
      seats: [],
      roofTypes: [],
      acTypes: [],
      horsePowerRange: { min: 0, max: 1000 },
    });

  // Derived filter options for UI
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);
  const [seatOptions, setSeatOptions] = useState<number[]>([]);
  const [horsePowerRanges, setHorsePowerRanges] = useState<string[]>([]);
  const [roofTypes, setRoofTypes] = useState<string[]>([]);
  const [acTypes, setAcTypes] = useState<string[]>([]);

  // Fetch filter options from API
  const fetchFilterOptions = useCallback(async () => {
    try {
      setFiltersLoading(true);
      setFiltersError(null);

      const response = await vehicleService.getVehicleFilters();

      if (response) {
        setFilterOptions(response);

        setMakes(response.makes || []);
        setModels(response.models || []);
        setYears(response.years || []);
        setBodyTypes(response.bodyTypes || []);
        setSeatOptions(response.seats || []);
        setRoofTypes(response.roofTypes || []);
        setAcTypes(response.acTypes || []);

        if (response.horsePowerRange) {
          const ranges = generateHorsePowerRanges(response.horsePowerRange);
          setHorsePowerRanges(ranges);
        }
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
      setFiltersError(
        err instanceof Error ? err.message : "Failed to load filter options",
      );

      setFallbackFilterOptions();
    } finally {
      setFiltersLoading(false);
    }
  }, []);

  // Generate horse power ranges from min/max values
  const generateHorsePowerRanges = (range: HorsePowerRange): string[] => {
    const { min, max } = range;
    const ranges: string[] = [];

    const step = Math.ceil((max - min) / 5);

    for (let i = min; i < max; i += step) {
      const rangeStart = i;
      const rangeEnd = Math.min(i + step, max);
      ranges.push(`${rangeStart}-${rangeEnd} HP`);
    }

    if (min > 0) {
      ranges.unshift(`Under ${min} HP`);
    }
    ranges.push(`Over ${max} HP`);

    return ranges;
  };

  // Set fallback filter options if API fails
  const setFallbackFilterOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = 0; i < 10; i++) {
      yearsList.push(currentYear - i);
    }
    setYears(yearsList);

    setSeatOptions([2, 4, 5, 6, 7, 8, 9]);
    setRoofTypes(["Sunroof", "Panoramic", "Convertible", "Hardtop"]);
    setAcTypes([
      "Manual",
      "Automatic",
      "Dual Zone",
      "Triple Zone",
      "Climate Control",
    ]);

    setHorsePowerRanges([
      "Under 150 HP",
      "150-200 HP",
      "200-300 HP",
      "300-400 HP",
      "Over 400 HP",
    ]);
  };

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (
      newFilters: VehicleSpecificationSearchRequest,
      page: number,
      pageSize: number,
    ) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Fetch vehicles with filters
  const fetchVehiclesWithFilters = useCallback(
    async (
      filterValues: VehicleSpecificationSearchRequest,
      page: number,
      pageSize: number,
    ): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const apiPageNumber = page - 1;

        const requestBody: VehicleSpecificationSearchRequest = {
          ...filterValues,
          pageNumber: apiPageNumber,
          pageSize: pageSize,
        };

        const response =
          await vehicleService.searchVehicleSpecifications(requestBody);

        if (response.data) {
          setVehicles(response.data.vehicles || []);
          setTotalVehicles(response.data.totalRecords || 0);
          
          const total = Math.ceil((response.data.totalRecords || 0) / pageSize);
          setTotalPages(total);
          
          setError(null);
        } else {
          setError(response.message || "Failed to fetch vehicles");
        }
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [],
  );

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchVehiclesWithFilters(filters, 1, itemsPerPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchInitialData();
  }, []);

  // Watch for URL params changes and fetch data
  useEffect(() => {
    if (!isInitialLoad) {
      const urlFilters = urlParamsToFilters(
        new URLSearchParams(searchParams?.toString()),
      );
      const { page, pageSize } = urlParamsToPagination(
        new URLSearchParams(searchParams?.toString()),
      );

      setFilters({
        ...DEFAULT_FILTERS,
        ...urlFilters,
      });
      setCurrentPage(page);
      setItemsPerPage(pageSize);

      fetchVehiclesWithFilters(urlFilters, page, pageSize);
    }
  }, [searchParams, fetchVehiclesWithFilters, isInitialLoad]);

  const handleFilterChange = (
    filterName: keyof VehicleSpecificationSearchRequest,
    value: string | number | null,
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
    const resetFilterValues: VehicleSpecificationSearchRequest = {
      ...DEFAULT_FILTERS,
      pageSize: itemsPerPage,
    };

    setFilters(resetFilterValues);
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  const handleRetry = () => {
    setError(null);
    setFiltersError(null);
    setLoading(true);
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchVehiclesWithFilters(filters, 1, itemsPerPage);
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  // Show loading state
  if (loading || filtersLoading || categoriesLoading) {
    return <VehiclesLoading itemsPerPage={itemsPerPage} />;
  }

  // Show error state
  if (error || filtersError) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Vehicles"
            message={error || filtersError || "An error occurred"}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <SectionHeader
            subtitle=""
            title="Vehicle Specifications"
            description="Explore detailed specifications of various vehicles"
            fromColor="#14b8a6"
            toColor="#06b6d4"
          />
        </div>

        {/* Filters Section */}
        <VehicleFilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onResetFilters={resetFilters}
          makes={makes || []}
          models={models || []}
          years={years || []}
          bodyTypes={bodyTypes || []}
          seatOptions={seatOptions || []}
          horsePowerRanges={horsePowerRanges || []}
          roofTypes={roofTypes || []}
          acTypes={acTypes || []}
          horsePowerRange={filterOptions.horsePowerRange}
        />

        {/* Results Section */}
        <div id="results-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-teal-900">
              {totalVehicles} Vehicle
              {totalVehicles !== 1 ? "s" : ""} Found
            </h3>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2 sm:gap-3 bg-teal-50 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-teal-200">
              <label
                htmlFor="itemsPerPage"
                className="text-xs sm:text-sm font-medium text-teal-800 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-teal-300 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-teal-700 transition-all duration-200 hover:border-teal-400"
              >
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
              </select>
              <span className="text-xs sm:text-sm text-teal-600 whitespace-nowrap font-medium">
                per page
              </span>
            </div>
          </div>

          {/* Vehicles Grid */}
          {vehicles && vehicles.length > 0 ? (
            <>
              <VehiclesGrid vehicles={vehicles} />

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
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const VehicleSpecificationPage: React.FC = () => {
  return (
    <Suspense fallback={<VehiclesLoading itemsPerPage={12} />}>
      <VehicleSpecificationPageContent />
    </Suspense>
  );
};

export default VehicleSpecificationPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-8 sm:py-12">
    <div className="text-teal-600 text-sm sm:text-base lg:text-lg mb-4">
      No vehicles found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm font-semibold"
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-teal-200">
      <div className="text-xs sm:text-sm text-teal-600 font-medium order-2 sm:order-1">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} results
      </div>

      <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-teal-700 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
          aria-label="Previous page"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-teal-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`min-w-[32px] sm:min-w-[36px] lg:min-w-[40px] px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105"
                    : "text-teal-700 bg-white border border-teal-300 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 hover:shadow-md"
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
          className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-teal-700 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};