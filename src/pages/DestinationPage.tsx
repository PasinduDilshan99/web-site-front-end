"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PopularDestinationsDetailsType,
  Filters,
  Review,
  EnhancedDestination,
  DestinationHistoryType,
  DestinationHistoryImage,
  DestinationSearchRequest,
} from "@/types/destination-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import FilterSection from "@/components/destinations-components/active-destinations/FilterSection";
import DestinationsGrid from "@/components/destinations-components/active-destinations/DestinationsGrid";
import ReviewsSection from "@/components/destinations-components/ReviewsSection";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import DestinationHistory from "@/components/destinations-components/DestinationHistory";
import DestinationHistoryGallery from "@/components/destinations-components/DestinationHistoryGallery";
import DestinationHeroSection from "@/components/destinations-components/DestinationHeroSection";
import { DestinationService } from "@/services/destinationService";
import DestinationsLoading from "@/components/destinations-components/DestinationsLoading";
import { useCommon } from "@/context/CommonContext";
import DestinationsLoadingError from "@/components/destinations-components/DestinationsLoadingError";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: Filters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.duration) params.set("duration", filters.duration.toString());
  if (filters.location) params.set("location", filters.location);
  if (filters.rating > 0) params.set("rating", filters.rating.toString());

  // Price range - only add if not default values
  if (filters.priceRange[0] > 0)
    params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange[1] < 10000)
    params.set("maxPrice", filters.priceRange[1].toString());

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): Filters => {
  return {
    search: params.get("search") || "",
    category: params.get("category") || "",
    duration: params.get("duration") || "",
    location: params.get("location") || "",
    rating: Number(params.get("rating")) || 0,
    priceRange: [
      Number(params.get("minPrice")) || 0,
      Number(params.get("maxPrice")) || 10000,
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
const DestinationPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destinations, setDestinations] = useState<EnhancedDestination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [history, setHistory] = useState<DestinationHistoryType[]>([]);
  const [historyImages, setHistoryImages] = useState<DestinationHistoryImage[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(true);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null,
  );

  // Use the common context
  const { categories, loading: categoriesLoading } = useCommon();

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

  const [totalDestinations, setTotalDestinations] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from context and service
  const [destinationCategories, setDestinationCategories] = useState<string[]>(
    [],
  );
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  const destinationService = new DestinationService();

  // Transform context data into destination categories
  useEffect(() => {
    if (categories) {
      const categoryNames = categories.destinationCategoryList.map(
        (cat) => cat.destinationCategoryName,
      );
      setDestinationCategories(categoryNames);
    }
  }, [categories]);

  // Build search request from filters
  const buildSearchRequest = useCallback(
    (
      filterValues: Filters,
      page: number,
      pageSize: number,
    ): DestinationSearchRequest => {
      return {
        name: filterValues.search || null,
        minPrice:
          filterValues.priceRange[0] > 0 ? filterValues.priceRange[0] : null,
        maxPrice:
          filterValues.priceRange[1] < 10000
            ? filterValues.priceRange[1]
            : null,
        duration: filterValues.duration
          ? parseFloat(filterValues.duration)
          : null,
        destinationCategory: filterValues.category || null,
        // location: filterValues.location || null,
        // minRating: filterValues.rating > 0 ? filterValues.rating : null,
        season: null,
        status: null,
        pageSize: pageSize,
        pageNumber: page,
      };
    },
    [],
  );

  // Fetch filter options (locations and durations)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const { locations, durations } =
        await destinationService.fetchFilterOptions();
      setLocations(locations);
      setDurations(durations);
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

  // Fetch destinations with filters - main API call function
  const fetchDestinationsWithFilters = useCallback(
    async (
      filterValues: Filters,
      page: number,
      pageSize: number,
    ): Promise<void> => {
      try {
        setLoading(true);

        // Prepare API request
        const requestBody = buildSearchRequest(filterValues, page, pageSize);

        const { data, error } =
          await destinationService.fetchDestinationsWithFilters(requestBody);

        if (error) {
          setError(error);
        } else if (data) {
          // Enhance destinations with mock rating and popularity data
          const enhancedDestinations: EnhancedDestination[] =
            data.destinationResponseDtos.map(
              (destination: PopularDestinationsDetailsType) => ({
                ...destination,
                rating: DestinationService.generateMockRating(
                  destination.destinationId,
                ),
                popularity: DestinationService.generateMockPopularity(
                  destination.destinationId,
                ),
              }),
            );
          setDestinations(enhancedDestinations);
          setTotalDestinations(data.destinationCount);
          setTotalPages(Math.ceil(data.destinationCount / pageSize));
          setError(null);
        } else {
          setDestinations([]);
          setTotalDestinations(0);
          setTotalPages(0);
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
        await fetchDestinationsWithFilters(filters, currentPage, itemsPerPage);

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

      fetchDestinationsWithFilters(urlFilters, page, pageSize);
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
      priceRange: [0, 10000] as [number, number],
      duration: "",
      category: "",
      location: "",
      rating: 0,
    };

    setFilters(resetFilterValues);
    // Update URL with reset filters and page 1
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  const handleRetry = () => {
    setError(null);
    setReviewsError(null);
    setHistoryError(null);
    setHistoryImagesError(null);
    setLoading(true);
    setReviewsLoading(true);
    setHistoryLoading(true);
    setHistoryImagesLoading(true);
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchDestinationsWithFilters(filters, currentPage, itemsPerPage);
  };

  // Pagination calculations
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalDestinations);

  const handlePageChange = (page: number) => {
    updateUrlParams(filters, page, itemsPerPage);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    updateUrlParams(filters, 1, value); // Reset to page 1 when changing items per page
  };

  if (loading || categoriesLoading) {
    return <DestinationsLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <DestinationsLoadingError
        onRetry={handleRetry}
        message="Couldn't fetch destinations."
      />
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-white via-blue-50 to-cyan-50 min-h-screen">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Popular Destinations"
          description="Discover amazing travel destinations with exciting activities"
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
        categories={destinationCategories}
        locations={locations}
        durations={durations}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-row items-center justify-between gap-3 mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-900 leading-tight">
            {totalDestinations} Destination{totalDestinations !== 1 ? "s" : ""}{" "}
            Found
          </h3>

          {/* Items per page selector */}
          <div className="flex items-center gap-2 sm:gap-3 bg-sky-50 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-sky-200">
            <label
              htmlFor="itemsPerPage"
              className="text-xs sm:text-sm font-medium text-sky-800 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer border border-sky-300 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-sky-700 transition-all duration-200 hover:border-sky-400"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
            <span className="hidden xs:inline text-xs sm:text-sm text-sky-600 whitespace-nowrap font-medium">
              per page
            </span>
          </div>
        </div>

        {/* Destinations Grid */}
        {destinations.length > 0 ? (
          <>
            <DestinationsGrid
              destinations={destinations}
              displayCount={destinations.length}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalDestinations}
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
      /> */}
      {/* <DestinationHistory
        historyData={history}
        // loading={historyLoading}
        // error={historyError}
        title="Destination History & Heritage"
        description="Discover the fascinating stories and historical events that shaped these amazing destinations"
      /> */}
      {/* <DestinationHistoryGallery
        imagesData={historyImages}
        // loading={historyImagesLoading}
        // error={historyImagesError}
        title="Historical Images Collection"
        description="Browse through captivating photographs that capture the essence of our destinations' history"
      /> */}
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const DestinationPage: React.FC = () => {
  return (
    <Suspense fallback={<DestinationsLoading itemsPerPage={12} />}>
      <DestinationPageContent />
    </Suspense>
  );
};

export default DestinationPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-sky-700 text-lg mb-4">
      No destinations found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Reset Filters
    </button>
  </div>
);

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
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible pages around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start
    if (currentPage <= 3) {
      end = Math.min(totalPages - 1, 4);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3);
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-between gap-3 mt-8 pt-6 border-t border-sky-200 sm:flex-row">
      {/* Results count */}
      <div className="text-xs sm:text-sm text-sky-600 font-medium order-2 sm:order-1">
        Showing {startItem} to {endItem} of {totalItems} destinations
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-2.5 sm:px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1.5"
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4 shrink-0"
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

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 sm:w-10 text-center py-2 text-xs sm:text-sm font-medium text-sky-400"
                >
                  …
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`cursor-pointer min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg scale-105"
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

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-2.5 sm:px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1.5"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-4 h-4 shrink-0"
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
