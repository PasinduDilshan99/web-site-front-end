"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Filters,
  PackageReview,
  PackageHistory,
  PackageHistoryImage,
} from "@/types/packages-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import FilterSection from "@/components/packages-components/FilterSection";
import PackageGrid from "@/components/packages-components/PackageGrid";
import ReviewsSection from "@/components/packages-components/ReviewsSection";
import HistoryCarousel from "@/components/packages-components/HistoryCarousel";
import PackageHistoryGallery from "@/components/packages-components/PackageHistoryGallery";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import PackageHeroSection from "@/components/packages-components/PackageHeroSection";
import { PackageService } from "@/services/packageService";
import { ActivePackagesForFilters } from "@/types/package-types";
import PackagesLoading from "@/components/packages-components/PackagesLoading";
import PackagesLoadingError from "@/components/packages-components/PackagesLoadingError";

// Define API response interface for packages
interface PackageListResponse {
  packageCount: number;
  packageResponseDtos: ActivePackagesForFilters[];
}

interface PaginatedPackageResponse {
  code: number;
  status: string;
  message: string;
  data: PackageListResponse | null;
  timestamp: string;
}

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: Filters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.packageType) params.set("packageType", filters.packageType);
  if (filters.duration) params.set("duration", filters.duration.toString());
  if (filters.location) params.set("location", filters.location);
  if (filters.minPersons)
    params.set("minPersons", filters.minPersons.toString());
  if (filters.maxPersons)
    params.set("maxPersons", filters.maxPersons.toString());
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);

  // Price range - only add if not default values
  if (filters.priceRange[0] > 0)
    params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange[1] < 100000)
    params.set("maxPrice", filters.priceRange[1].toString());

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): Filters => {
  return {
    search: params.get("search") || "",
    packageType: params.get("packageType") || "",
    duration: params.get("duration") || "",
    location: params.get("location") || "",
    minPersons: params.get("minPersons") || "",
    maxPersons: params.get("maxPersons") || "",
    startDate: params.get("startDate") || "",
    endDate: params.get("endDate") || "",
    priceRange: [
      Number(params.get("minPrice")) || 0,
      Number(params.get("maxPrice")) || 100000,
    ] as [number, number],
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
const PackagePageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [packages, setPackages] = useState<ActivePackagesForFilters[]>([]);
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [history, setHistory] = useState<PackageHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<PackageHistoryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null,
  );

  // Initialize filters from URL params
  const [filters, setFilters] = useState<Filters>(() =>
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

  const [totalPackages, setTotalPackages] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from initial data
  const [packageTypes, setPackageTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  // Build search request from filters - UPDATED to match PackageSearchRequest type
  const buildSearchRequest = useCallback(
    (filterValues: Filters, page: number, pageSize: number) => {
      return {
        name: filterValues.search || null,
        minPrice:
          filterValues.priceRange[0] > 0 ? filterValues.priceRange[0] : null,
        maxPrice:
          filterValues.priceRange[1] < 100000
            ? filterValues.priceRange[1]
            : null,
        duration: filterValues.duration
          ? parseInt(filterValues.duration)
          : null,
        packageType: filterValues.packageType || null,
        location: filterValues.location || null,
        minGroupSize: filterValues.minPersons
          ? parseInt(filterValues.minPersons)
          : null, // Changed from minPersons
        maxGroupSize: filterValues.maxPersons
          ? parseInt(filterValues.maxPersons)
          : null, // Changed from maxPersons
        fromDate: filterValues.startDate || null, // Changed from startDate
        toDate: filterValues.endDate || null, // Changed from endDate
        pageNumber: page,
        pageSize: pageSize,
      };
    },
    [],
  );

  // Fetch filter options (initial data)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const { packageTypes, locations, durations, error } =
        await PackageService.fetchFilterOptions();

      if (error) {
        console.error("Error fetching filter options:", error);
      } else {
        setPackageTypes(packageTypes);
        setLocations(locations);
        setDurations(durations);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: Filters, page: number, pageSize: number) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Fetch packages with filters - main API call function
  const fetchPackagesWithFilters = useCallback(
    async (
      filterValues: Filters,
      page: number,
      pageSize: number,
    ): Promise<void> => {
      try {
        setLoading(true);

        // Prepare API request using service helper
        const requestBody = buildSearchRequest(filterValues, page, pageSize);

        console.log("Request Body:", requestBody); // For debugging

        const {
          packages: fetchedPackages,
          totalPackages: total,
          error,
        } = await PackageService.fetchPackagesWithFilters(
          requestBody,
          pageSize,
          page,
        );

        if (error) {
          setError(error);
        } else {
          setPackages(fetchedPackages);
          setTotalPackages(total);
          setTotalPages(Math.ceil(total / pageSize));
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [buildSearchRequest],
  );

  // Initial data fetch - runs only once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchFilterOptions();
        await fetchPackagesWithFilters(filters, currentPage, itemsPerPage);

        // Uncomment these if needed
        // await fetchReviews();
        // await fetchHistory();
        // await fetchHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array - runs only once on mount

  // Watch for URL params changes and fetch data
  useEffect(() => {
    if (!isInitialLoad) {
      const urlFilters = urlParamsToFilters(
        new URLSearchParams(searchParams?.toString()),
      );
      const { page, pageSize } = urlParamsToPagination(
        new URLSearchParams(searchParams?.toString()),
      );

      setFilters(urlFilters);
      setCurrentPage(page);
      setItemsPerPage(pageSize);

      fetchPackagesWithFilters(urlFilters, page, pageSize);
    }
  }, [searchParams]); // Only depend on searchParams

  const handleFilterChange = (
    filterName: keyof Filters,
    value: Filters[keyof Filters],
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = (): void => {
    // Reset to page 1 and update URL
    updateUrlParams(filters, 1, itemsPerPage);
  };

  const resetFilters = (): void => {
    const resetFilterValues: Filters = {
      search: "",
      priceRange: [0, 100000] as [number, number],
      duration: "",
      packageType: "",
      location: "",
      minPersons: "",
      maxPersons: "",
      startDate: "",
      endDate: "",
    };

    setFilters(resetFilterValues);
    // Update URL with reset filters and page 1
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    updateUrlParams(filters, page, itemsPerPage);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (items: number): void => {
    updateUrlParams(filters, 1, items); // Reset to page 1 when changing items per page
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchPackagesWithFilters(filters, currentPage, itemsPerPage);
  };

  const handleReviewsRetry = () => {
    setReviewsError(null);
    // fetchReviews();
  };

  const handleHistoryRetry = () => {
    setHistoryError(null);
    // fetchHistory();
  };

  const handleHistoryImagesRetry = () => {
    setHistoryImagesError(null);
    // fetchHistoryImages();
  };

  if (loading) {
    return <PackagesLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <PackagesLoadingError
        onRetry={handleRetry}
        message="Couldn't load our exclusive tour packages."
      />
    );
  }

  // Calculate paginated packages display info
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalPackages);

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-sky-100 via-white to-cyan-100">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Tour Packages"
          description="Discover amazing travel experiences tailored for you"
          fromColor="#A855F7"
          toColor="#F59E0B"
        />
      </div>

      {/* Filters Section */}
      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onResetFilters={resetFilters}
        packageTypes={packageTypes}
        locations={locations}
        durations={durations}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-sky-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-sky-900">
              {totalPackages} Package
              {totalPackages !== 1 ? "s" : ""} Found
            </h3>
          </div>

          <div className="flex items-center gap-3 bg-sky-50 rounded-lg px-4 py-2 border border-sky-200">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-sky-800 whitespace-nowrap flex items-center gap-1"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer px-3 py-2 border border-sky-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm text-sky-900 bg-white transition-all duration-200 hover:border-sky-400"
            >
              <option value={4}>4 per page</option>
              <option value={6}>6 per page</option>
              <option value={9}>9 per page</option>
              <option value={12}>12 per page</option>
              <option value={16}>16 per page</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <>
            <PackageGrid
              packages={packages}
              displayCount={packages.length}
              showViewDetails={true}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalPackages}
                itemsPerPage={itemsPerPage}
                startItem={startItem}
                endItem={endItem}
              />
            )}
          </>
        ) : (
          <NoResults onResetFilters={resetFilters} />
        )}
      </div>

      {/* Optional Sections - Uncomment if needed */}
      {/* <ReviewsSection
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
        onRetry={handleReviewsRetry}
      /> */}
      {/* <HistoryCarousel
        historyData={history}
        loading={historyLoading}
        error={historyError}
        onRetry={handleHistoryRetry}
      /> */}
      {/* <PackageHistoryGallery
        imagesData={historyImages}
        loading={historyImagesLoading}
        error={historyImagesError}
        onRetry={handleHistoryImagesRetry}
      /> */}
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const PackagePage: React.FC = () => {
  return (
    <Suspense fallback={<PackagesLoading itemsPerPage={12} />}>
      <PackagePageContent />
    </Suspense>
  );
};

export default PackagePage;

// Updated Pagination Controls Component with First/Last Page Numbers
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  startItem,
  endItem,
}) => {
  const getPageNumbers = (): (number | string)[] => {
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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-sky-200">
      <div className="text-sm text-sky-700 font-medium">
        Showing {startItem} to {endItem} of {totalItems} packages
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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
                  className="px-4 py-2 text-sm font-medium text-sky-700"
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
                    ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg transform scale-105"
                    : "text-sky-700 bg-white border-2 border-sky-300 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 hover:shadow-md"
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
          className="cursor-pointer px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-gray-600 text-lg mb-4 flex flex-col items-center">
      <svg
        className="w-16 h-16 text-sky-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      No packages found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
    >
      Reset Filters
    </button>
  </div>
);
