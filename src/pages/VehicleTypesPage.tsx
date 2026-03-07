// pages/VehicleTypesPage.tsx
"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VehicleType, VehicleTypeFilters } from "@/types/vehicle-types";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import { vehicleService } from "@/services/vehicleService";
import VehicleTypesLoading from "@/components/vehicle-components/vehicle-types-components/VehicleTypesLoading";
import VehicleTypesLoadingError from "@/components/vehicle-components/vehicle-types-components/VehicleTypesLoadingError";
import VehicleTypesFilterSection from "@/components/vehicle-components/vehicle-types-components/VehicleTypesFilterSection";
import VehicleTypesGrid from "@/components/vehicle-components/vehicle-types-components/VehicleTypesGrid";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: VehicleTypeFilters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): VehicleTypeFilters => {
  return {
    search: params.get("search") || "",
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
const VehicleTypesPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allVehicleTypes, setAllVehicleTypes] = useState<VehicleType[]>([]);
  const [filteredVehicleTypes, setFilteredVehicleTypes] = useState<
    VehicleType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<VehicleTypeFilters>(() =>
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

  const [totalVehicleTypes, setTotalVehicleTypes] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Fetch all vehicle types on mount
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        setLoading(true);
        const { vehicleTypes, error } =
          await vehicleService.fetchVehicleTypes();

        if (error) {
          setError(error);
        } else {
          setAllVehicleTypes(vehicleTypes);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchVehicleTypes();
  }, []);

  // Apply filters and pagination when filters or pagination change
  useEffect(() => {
    if (allVehicleTypes.length > 0 && !isInitialLoad) {
      const {
        filteredVehicleTypes: paginatedVehicleTypes,
        totalFiltered,
        totalPages,
      } = vehicleService.filterVehicleTypes(
        allVehicleTypes,
        filters,
        currentPage,
        itemsPerPage,
      );

      setFilteredVehicleTypes(paginatedVehicleTypes);
      setTotalVehicleTypes(totalFiltered);
      setTotalPages(totalPages);
    }
  }, [allVehicleTypes, filters, currentPage, itemsPerPage, isInitialLoad]);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: VehicleTypeFilters, page: number, pageSize: number) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleFilterChange = (
    filterName: keyof VehicleTypeFilters,
    value: string,
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
    const resetFilterValues: VehicleTypeFilters = {
      search: "",
    };

    setFilters(resetFilterValues);
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setIsInitialLoad(true);

    const fetchVehicleTypes = async () => {
      try {
        const { vehicleTypes, error } =
          await vehicleService.fetchVehicleTypes();
        if (error) {
          setError(error);
        } else {
          setAllVehicleTypes(vehicleTypes);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchVehicleTypes();
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
    return <VehicleTypesLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <VehicleTypesLoadingError
        onRetry={handleRetry}
        message="Couldn't fetch vehicle types."
      />
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 min-h-screen">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Vehicle Types"
          description="Choose from our wide range of vehicle types for your journey in Sri Lanka"
          fromColor="#A855F7"
          toColor="#EC4899"
        />
      </div>

      {/* Filters Section */}
      <VehicleTypesFilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onResetFilters={resetFilters}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg lg:text-2xl font-semibold text-purple-900">
            {totalVehicleTypes} Vehicle Type{totalVehicleTypes !== 1 ? "s" : ""}{" "}
            Found
          </h3>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-3 bg-purple-50 rounded-lg px-4 py-2 border border-purple-200">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-purple-800 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer border border-purple-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-purple-700 transition-all duration-200 hover:border-purple-400"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
            <span className="text-sm text-purple-600 whitespace-nowrap font-medium">
              per page
            </span>
          </div>
        </div>

        {/* Vehicle Types Grid */}
        {filteredVehicleTypes.length > 0 ? (
          <>
            <VehicleTypesGrid
              vehicleTypes={filteredVehicleTypes}
              displayCount={filteredVehicleTypes.length}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalVehicleTypes}
                itemsPerPage={itemsPerPage}
                startIndex={startIndex}
                endIndex={Math.min(endIndex, totalVehicleTypes)}
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
const VehicleTypesPage: React.FC = () => {
  return (
    <Suspense fallback={<VehicleTypesLoading itemsPerPage={12} />}>
      <VehicleTypesPageContent />
    </Suspense>
  );
};

export default VehicleTypesPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-purple-600 text-lg mb-4">
      No vehicle types found matching your search.
    </div>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Clear Search
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-purple-200">
      <div className="text-sm text-purple-600 font-medium">
        Showing {startIndex + 1} to {endIndex} of {totalItems} results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 hover:text-purple-800 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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
                  className="px-4 py-2 text-sm font-medium text-purple-700"
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
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                    : "text-purple-700 bg-white border-2 border-purple-300 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-400 hover:shadow-md"
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
          className="cursor-pointer px-4 py-2 text-sm font-medium text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 hover:text-purple-800 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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
