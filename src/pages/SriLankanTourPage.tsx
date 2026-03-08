"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import FilterSection from "@/components/sri-lankan-tours-components/FilterSection";
import ToursGrid from "@/components/sri-lankan-tours-components/ToursGrid";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import TourHistorySection from "@/components/sri-lankan-tours-components/TourHistorySection";
import TourHistoryGallery from "@/components/sri-lankan-tours-components/TourHistoryGallery";
import {
  ActiveToursType,
  TourFilters,
  TourHistory,
  TourHistoryImage,
  TourReview,
  TourSearchRequest,
  FilterOptions,
} from "@/types/tour-types";
import { TourService } from "@/services/tourService";
import ToursLoading from "@/components/sri-lankan-tours-components/ToursLoading";
import { useCommon } from "@/context/CommonContext";
import SLTourDetailsLoadingError from "@/components/sri-lankan-tours-components/SLTourDetailsLoadingError";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: TourFilters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.tourType) params.set("tourType", filters.tourType);
  if (filters.tourCategory) params.set("tourCategory", filters.tourCategory);
  if (filters.duration) params.set("duration", filters.duration.toString());
  if (filters.season) params.set("season", filters.season);
  if (filters.location) params.set("location", filters.location);

  // Price range - only add if not default values
  if (filters.priceRange[0] > 0)
    params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange[1] < 5000)
    params.set("maxPrice", filters.priceRange[1].toString());

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): TourFilters => {
  return {
    search: params.get("search") || "",
    tourType: params.get("tourType") || "",
    tourCategory: params.get("tourCategory") || "",
    duration: params.get("duration") || "",
    season: params.get("season") || "",
    location: params.get("location") || "",
    priceRange: [
      Number(params.get("minPrice")) || 0,
      Number(params.get("maxPrice")) || 5000,
    ] as [number, number],
  };
};

const urlParamsToPagination = (
  params: URLSearchParams,
): { page: number; pageSize: number } => {
  return {
    page: Number(params.get("page")) || 1,
    pageSize: Number(params.get("pageSize")) || 10,
  };
};

// Main component wrapped with Suspense for useSearchParams
const SriLankanTourPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tours, setTours] = useState<ActiveToursType[]>([]);
  const [reviews, setReviews] = useState<TourReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [histories, setHistories] = useState<TourHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<TourHistoryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  // Use the common context
  const { categories, loading: categoriesLoading } = useCommon();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<TourFilters>(() =>
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

  const [totalTours, setTotalTours] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options - derived from context
  const [tourTypes, setTourTypes] = useState<string[]>([]);
  const [tourCategories, setTourCategories] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  // Transform context data into filter options
  useEffect(() => {
    if (categories) {
      // Extract tour type names
      const typeNames = categories.tourTypeList.map(
        (type) => type.tourTypeName,
      );
      setTourTypes(typeNames);

      // Extract tour category names
      const categoryNames = categories.tourCategoryList.map(
        (cat) => cat.tourCategoryName,
      );
      setTourCategories(categoryNames);
    }
  }, [categories]);

  // Build search request from filters
  const buildSearchRequest = useCallback(
    (
      filterValues: TourFilters,
      page: number,
      pageSize: number,
    ): TourSearchRequest => {
      return {
        name: filterValues.search || null,
        minPrice:
          filterValues.priceRange[0] > 0 ? filterValues.priceRange[0] : null,
        maxPrice:
          filterValues.priceRange[1] < 5000 ? filterValues.priceRange[1] : null,
        duration: filterValues.duration
          ? parseInt(filterValues.duration)
          : null,
        tourType: filterValues.tourType || null,
        tourCategory: filterValues.tourCategory || null,
        season: filterValues.season || null,
        location: filterValues.location || null,
        pageNumber: page,
        pageSize: pageSize,
      };
    },
    [],
  );

  // Fetch other filter options (seasons, locations, durations)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const options = await TourService.getFilterOptions();

      setSeasons(options.seasons);
      setLocations(options.locations);
      setDurations(options.durations);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: TourFilters, page: number, pageSize: number) => {
      const params = filtersToUrlParams(newFilters, page, pageSize);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Fetch tours with filters - MAIN API CALL FUNCTION
  const fetchToursWithFilters = useCallback(
    async (
      filterValues: TourFilters,
      page: number,
      pageSize: number,
    ): Promise<void> => {
      try {
        setLoading(true);

        // Prepare API request
        const requestBody = buildSearchRequest(filterValues, page, pageSize);

        console.log("Request Body:", requestBody); // For debugging

        const result = await TourService.searchTours(requestBody);

        if (result.code === 200) {
          if (result.data) {
            setTours(result.data.tourResponseDtoList);
            setTotalTours(result.data.totalTours);
            setTotalPages(Math.ceil(result.data.totalTours / pageSize));
            setError(null);
          } else {
            setTours([]);
            setTotalTours(0);
            setTotalPages(0);
          }
        } else {
          setError(result.message);
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
        await fetchToursWithFilters(filters, currentPage, itemsPerPage);

        // Uncomment these if needed
        // await fetchReviews();
        // await fetchTourHistory();
        // await fetchTourHistoryImages();
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

      fetchToursWithFilters(urlFilters, page, pageSize);
    }
  }, [searchParams]); // Only depend on searchParams

  const handleFilterChange = (
    filterName: keyof TourFilters,
    value: TourFilters[keyof TourFilters],
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = useCallback((): void => {
    // Reset to page 1 and update URL
    updateUrlParams(filters, 1, itemsPerPage);
  }, [filters, itemsPerPage, updateUrlParams]);

  const resetFilters = useCallback((): void => {
    const resetFilterValues: TourFilters = {
      search: "",
      priceRange: [0, 5000] as [number, number],
      duration: "",
      tourType: "",
      tourCategory: "",
      season: "",
      location: "",
    };

    setFilters(resetFilterValues);
    // Update URL with reset filters and page 1
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  }, [itemsPerPage, updateUrlParams]);

  const handleRetry = () => {
    setError(null);
    setReviewsError(null);
    setHistoryError(null);
    setGalleryError(null);
    setLoading(true);
    setReviewsLoading(true);
    setHistoryLoading(true);
    setGalleryLoading(true);
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchToursWithFilters(filters, currentPage, itemsPerPage);
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalTours);

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
    return <ToursLoading itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return (
      <SLTourDetailsLoadingError
        onRetry={handleRetry}
        message="Couldn't load the Sri Lanka tour information."
      />
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 via-cyan-50 to-blue-50 min-h-screen">
      {/* Page Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle=""
          title="Sri Lankan Tours"
          description="Discover the beauty of Sri Lanka with our curated tour experiences"
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
        tourTypes={tourTypes}
        tourCategories={tourCategories}
        seasons={seasons}
        locations={locations}
        durations={durations}
      />

      {/* Results Section */}
      <div id="results-section" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-sky-900">
            {totalTours} Tour{totalTours !== 1 ? "s" : ""} Found
          </h3>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-3 bg-sky-50 rounded-lg px-4 py-2 border border-sky-200">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-sky-800 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="cursor-pointer border text-sky-700 border-sky-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white transition-all duration-200 hover:border-sky-400"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={20}>20</option>
              <option value={24}>24</option>
            </select>
            <span className="text-sm text-sky-600 whitespace-nowrap font-medium">
              per page
            </span>
          </div>
        </div>

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <>
            <ToursGrid tours={tours} displayCount={tours.length} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalTours}
                itemsPerPage={itemsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
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
        onRetry={fetchReviews}
      /> */}
      {/* <TourHistorySection
        histories={histories}
        loading={historyLoading}
        error={historyError}
        onRetry={fetchTourHistory}
      /> */}
      {/* <TourHistoryGallery
        images={galleryImages}
        loading={galleryLoading}
        error={galleryError}
        onRetry={fetchTourHistoryImages}
      /> */}
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const SriLankanTourPage: React.FC = () => {
  return (
    <Suspense fallback={<ToursLoading itemsPerPage={10} />}>
      <SriLankanTourPageContent />
    </Suspense>
  );
};

export default SriLankanTourPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-teal-600 text-lg mb-4">
      No tours found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);

// Updated Pagination Component with First/Last Page Numbers
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-sky-200">
      {/* Results info */}
      <div className="text-sm text-sky-600 font-medium">
        Showing {startIndex} to {endIndex} of {totalItems} results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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

        {/* Page numbers */}
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

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-sky-700 bg-white border-2 border-sky-300 rounded-lg hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
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
