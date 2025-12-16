"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ActiveToursType,
  TourFilters,
  TourHistory,
  TourHistoryImage,
  TourReview,
  TourSearchRequest,
  PaginatedTourResponse,
} from "@/types/sri-lankan-tour-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import FilterSection from "@/components/sri-lankan-tours-components/FilterSection";
import ToursGrid from "@/components/sri-lankan-tours-components/ToursGrid";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import TourHistorySection from "@/components/sri-lankan-tours-components/TourHistorySection";
import TourHistoryGallery from "@/components/sri-lankan-tours-components/TourHistoryGallery";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import TourHeroSection from "@/components/sri-lankan-tours-components/TourHeroSection";
import { useSearchParams } from "next/navigation";

const SriLankanTourPage: React.FC = () => {
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
    const searchParams = useSearchParams();

  const tourType: string | null = searchParams.get("tourType");
  const location: string | null = searchParams.get("location");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default page size
  const [totalTours, setTotalTours] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Filter states
  const [filters, setFilters] = useState<TourFilters>({
    search: "",
    priceRange: [0, 5000],
    duration: "",
    tourType: "",
    tourCategory: "",
    season: "",
    location: "",
  });

  // Filter options from initial data
  const [tourTypes, setTourTypes] = useState<string[]>([]);
  const [tourCategories, setTourCategories] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  // Debounce timer for page size changes
  const [pageSizeDebounceTimer, setPageSizeDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);

  // Fetch filter options (initial data)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const requestBody: TourSearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        tourType: null,
        tourCategory: null,
        season: null,
        location: null,
        pageNumber: 1,
        pageSize: 100, // Fetch more for filter options
      };

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/tour/tours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie:
              "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result: PaginatedTourResponse = await response.json();

      if (result.code === 200 && result.data) {
        // Extract unique values for filters
        const types = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.tourTypeName)
          ),
        ];
        const categories = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.tourCategoryName)
          ),
        ];
        const seasonsList = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.seasonName)
          ),
        ];
        const locationsList = [
          ...new Set(
            result.data.tourResponseDtoList.flatMap((tour) => [
              tour.startLocation,
              tour.endLocation,
            ])
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.tourResponseDtoList.map((tour) => tour.duration)
          ),
        ].sort((a, b) => a - b);

        setTourTypes(types);
        setTourCategories(categories);
        setSeasons(seasonsList);
        setLocations(locationsList);
        setDurations(durationsList);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Fetch tours with filters - MAIN API CALL FUNCTION
  const fetchToursWithFilters = useCallback(
    async (
      pageNum: number = currentPage,
      pageSize: number = itemsPerPage
    ): Promise<void> => {
      try {
        setLoading(true);

        // Prepare API request
        const requestBody: TourSearchRequest = {
          name: filters.search || null,
          minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
          maxPrice: filters.priceRange[1] < 5000 ? filters.priceRange[1] : null,
          duration: filters.duration ? parseInt(filters.duration) : null,
          tourType: filters.tourType || (tourType || null),
          tourCategory: filters.tourCategory || null,
          season: filters.season || null,
         location: filters.location || (location || null),
          pageNumber: pageNum,
          pageSize: pageSize,
        };

        const response = await fetch(
          "http://localhost:8080/felicita/v0/api/tour/tours",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const result: PaginatedTourResponse = await response.json();

        if (result.code === 200) {
          if (result.data) {
            setTours(result.data.tourResponseDtoList);
            setTotalTours(result.data.totalTours);
            setTotalPages(Math.ceil(result.data.totalTours / pageSize));
            setCurrentPage(pageNum); // Update current page after successful fetch
          } else {
            setTours([]);
            setTotalTours(0);
            setTotalPages(0);
          }
          setError(null);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [filters, currentPage, itemsPerPage,tourType, location]
  ); // Dependencies: filters, currentPage, itemsPerPage

  // Add this useEffect to sync URL params on component mount
useEffect(() => {
  if (tourType || location) {
    setFilters(prev => ({
      ...prev,
      ...(tourType && { tourType }),
      ...(location && { location })
    }));
  }
}, []); // Run only on initial mount

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

              if (tourType || location) {
        setFilters(prev => ({
          ...prev,
          ...(tourType && { tourType }),
          ...(location && { location })
        }));
      }

        await fetchFilterOptions();
        await fetchToursWithFilters(1, itemsPerPage); // Fetch first page on initial load
        fetchReviews();
        fetchTourHistory();
        fetchTourHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [tourType, location]); // Empty dependency array - runs once on mount

  // Fetch tours when page changes
  useEffect(() => {
    if (currentPage > 0 && !loading) {
      fetchToursWithFilters(currentPage, itemsPerPage);
    }
  }, [currentPage]); // Only depends on currentPage

  // Handle page size change with immediate API call
  const handleItemsPerPageChange = (value: number) => {
    // Clear any existing debounce timer
    if (pageSizeDebounceTimer) {
      clearTimeout(pageSizeDebounceTimer);
    }

    setItemsPerPage(value);

    // Set a new debounce timer to call API after 300ms
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when changing items per page
      fetchToursWithFilters(1, value);
    }, 300);

    setPageSizeDebounceTimer(timer);
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (pageSizeDebounceTimer) {
        clearTimeout(pageSizeDebounceTimer);
      }
    };
  }, [pageSizeDebounceTimer]);

  // Handle search button click - resets to page 1
  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    fetchToursWithFilters(1, itemsPerPage);
  }, [fetchToursWithFilters, itemsPerPage]);

  // Handle reset filters - resets to page 1
  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      priceRange: [0, 5000],
      duration: "",
      tourType: "",
      tourCategory: "",
      season: "",
      location: "",
    });
    setCurrentPage(1);

    if (typeof window !== 'undefined') {
    window.history.replaceState({}, '', '/sri-lankan-tours');
  }

    fetchToursWithFilters(1, itemsPerPage);
  }, [fetchToursWithFilters, itemsPerPage]);

  const fetchTourHistory = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/tour/history"
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistories(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error ? err.message : "Failed to load tour history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchTourHistoryImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/tour/history-images"
      );
      const result = await response.json();

      if (result.code === 200) {
        setGalleryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setGalleryError(
        err instanceof Error ? err.message : "Failed to load tour images"
      );
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchReviews = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/tour/reviews"
      );
      const result = await response.json();

      if (result.code === 200) {
        setReviews(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setReviewsError(
        err instanceof Error ? err.message : "Failed to load reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  // Price calculation (same as in TourCard)
  const calculatePrice = (tour: ActiveToursType): number => {
    const basePrice = 50;
    let multiplier = 1;

    if (tour.tourCategoryName === "Luxury") multiplier = 2.5;
    else if (tour.tourCategoryName === "Family") multiplier = 1.2;
    else if (tour.tourCategoryName === "Budget") multiplier = 0.8;

    return Math.round(basePrice * tour.duration * multiplier);
  };

  const handleFilterChange = (
    filterName: keyof TourFilters,
    value: unknown
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    // Note: Does NOT trigger API call - user must click Search button
  };

  const handleRetry = () => {
    setError(null);
    setReviewsError(null);
    setHistoryError(null);
    setGalleryError(null);
    setLoading(true);
    setReviewsLoading(true);
    setHistoryLoading(true);
    setGalleryLoading(true);
    fetchFilterOptions();
    fetchToursWithFilters(1, itemsPerPage);
    fetchReviews();
    fetchTourHistory();
    fetchTourHistoryImages();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loading message="Loading tours..." variant="spinner" size="md" />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load tours"
            message={error}
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
    <>
      <LinkBar />
      <NavBar />
      <TourHeroSection />
      <div className="mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 via-purple-50 to-blue-50 min-h-screen">
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
            <h3 className="text-2xl font-semibold text-gray-900">
              {totalTours} Tour{totalTours !== 1 ? "s" : ""} Found
            </h3>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
                <option value={24}>24</option>
              </select>
              <span className="text-sm text-gray-500 whitespace-nowrap">
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
                  startIndex={(currentPage - 1) * itemsPerPage + 1}
                  endIndex={Math.min(currentPage * itemsPerPage, totalTours)}
                />
              )}
            </>
          ) : (
            <NoResults onResetFilters={resetFilters} />
          )}
        </div>

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
          onRetry={fetchReviews}
        />
        <TourHistorySection
          histories={histories}
          loading={historyLoading}
          error={historyError}
          onRetry={fetchTourHistory}
        />
        <TourHistoryGallery
          images={galleryImages}
          loading={galleryLoading}
          error={galleryError}
          onRetry={fetchTourHistoryImages}
        />
      </div>
      <Footer />
    </>
  );
};

export default SriLankanTourPage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-gray-500 text-lg mb-4">
      No tours found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white rounded-lg hover:from-amber-700 hover:to-purple-700 transition-colors"
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
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Showing {startIndex} to {endIndex} of {totalItems} results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === page
                  ? "bg-gradient-to-r from-amber-600 to-purple-600 text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
