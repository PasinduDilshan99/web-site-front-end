"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  PopularDestinationsDetailsType,
  Filters,Review,
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

const DestinationPage: React.FC = () => {
  const [destinations, setDestinations] = useState<EnhancedDestination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [history, setHistory] = useState<DestinationHistoryType[]>([]);
  const [historyImages, setHistoryImages] = useState<DestinationHistoryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesLoading, setHistoryImagesLoading] = useState<boolean>(true);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priceRange: [0, 10000],
    duration: "",
    category: "",
    location: "",
    rating: 0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [totalDestinations, setTotalDestinations] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Search button state
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from initial data
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  const destinationService = new DestinationService();

  // Fetch filter options (initial data)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const { categories, locations, durations } = await destinationService.fetchFilterOptions();
      setCategories(categories);
      setLocations(locations);
      setDurations(durations);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Fetch destinations with filters - main API call function
  const fetchDestinationsWithFilters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Prepare API request
      const requestBody: DestinationSearchRequest = {
        name: filters.search || null,
        minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
        maxPrice: filters.priceRange[1] < 10000 ? filters.priceRange[1] : null,
        duration: filters.duration ? parseFloat(filters.duration) : null,
        destinationCategory: filters.category || null,
        season: null,
        status: null,
        pageSize: itemsPerPage,
        pageNumber: currentPage,
      };

      const { data, error } = await destinationService.fetchDestinationsWithFilters(requestBody);

      if (error) {
        throw new Error(error);
      }

      if (data) {
        // Enhance destinations with mock rating and popularity data
        const enhancedDestinations: EnhancedDestination[] = data.destinationResponseDtos.map(
          (destination: PopularDestinationsDetailsType) => ({
            ...destination,
            rating: DestinationService.generateMockRating(destination.destinationId),
            popularity: DestinationService.generateMockPopularity(destination.destinationId),
          })
        );
        setDestinations(enhancedDestinations);
        setTotalDestinations(data.destinationCount);
        setTotalPages(Math.ceil(data.destinationCount / itemsPerPage));
      } else {
        setDestinations([]);
        setTotalDestinations(0);
        setTotalPages(0);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // Fetch reviews
  const fetchReviews = async (): Promise<void> => {
    try {
      setReviewsLoading(true);
      const { data, error } = await destinationService.fetchReviews();
      
      if (error) {
        throw new Error(error);
      }
      setReviews(data);
      setReviewsError(null);
    } catch (err) {
      setReviewsError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  // Fetch history
  const fetchHistory = async (): Promise<void> => {
    try {
      setHistoryLoading(true);
      const { data, error } = await destinationService.fetchHistory();
      
      if (error) {
        throw new Error(error);
      }
      setHistory(data);
      setHistoryError(null);
    } catch (err) {
      setHistoryError(err instanceof Error ? err.message : "Failed to load destination history");
    } finally {
      setHistoryLoading(false);
    }
  };

  // Fetch history images
  const fetchHistoryImages = async (): Promise<void> => {
    try {
      setHistoryImagesLoading(true);
      const { data, error } = await destinationService.fetchHistoryImages();
      
      if (error) {
        throw new Error(error);
      }
      setHistoryImages(data);
      setHistoryImagesError(null);
    } catch (err) {
      setHistoryImagesError(err instanceof Error ? err.message : "Failed to load history images");
    } finally {
      setHistoryImagesLoading(false);
    }
  };

  // Initial data fetch - runs only once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchFilterOptions();
        await fetchDestinationsWithFilters();
        await fetchReviews();
        await fetchHistory();
        await fetchHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    
    fetchInitialData();
  }, []); // Empty dependency array - runs only once on mount

  // Fetch destinations when search is triggered
  useEffect(() => {
    if (searchTriggered) {
      setCurrentPage(1); // Reset to first page when search is triggered
      fetchDestinationsWithFilters();
      setSearchTriggered(false);
    }
  }, [searchTriggered, fetchDestinationsWithFilters]);

  // Fetch destinations when page changes
  useEffect(() => {
    if (!isInitialLoad && currentPage > 0) {
      fetchDestinationsWithFilters();
    }
  }, [currentPage]); // Only depends on currentPage

  // Fetch destinations when items per page changes
  useEffect(() => {
    if (!isInitialLoad) {
      setCurrentPage(1); // Reset to first page
      fetchDestinationsWithFilters();
    }
  }, [itemsPerPage]); // Only depends on itemsPerPage

  // Mock price calculation (same as in DestinationCard)
  const getPrice = (popularity: number, rating: number): number => {
    const basePrice = popularity * rating * 10;
    return Math.round(basePrice);
  };

  const handleFilterChange = (filterName: keyof Filters,value: Filters[keyof Filters]): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    // Do NOT trigger API call here - wait for search button click
  };

  const handleSearch = (): void => {
    setSearchTriggered(true);
  };

  const resetFilters = (): void => {
    setFilters({
      search: "",
      priceRange: [0, 10000],
      duration: "",
      category: "",
      location: "",
      rating: 0,
    });
    // Trigger search automatically after reset
    setSearchTriggered(true);
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
    fetchDestinationsWithFilters();
    fetchReviews();
    fetchHistory();
    fetchHistoryImages();
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (items: number): void => {
    setItemsPerPage(items);
    // API call will be triggered by the useEffect that watches itemsPerPage
  };

  if (loading) {
    return (
      <Loading message="Loading destinations..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load destinations"
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

  // Calculate paginated destinations display info
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalDestinations);

  return (
    <>
      <DestinationHeroSection />
      <div className="mx-auto px-4 py-8 bg-gradient-to-br from-purple-100 via-purple-100 to-amber-100 min-h-screen">
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
          categories={categories}
          locations={locations}
          durations={durations}
        />

        {/* Results Section */}
        <div id="results-section" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
              {totalDestinations} Destination
              {totalDestinations !== 1 ? "s" : ""} Found
            </h3>

            {/* Items per page selector */}
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
                className="text-gray-800 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value={4}>4 per page</option>
                <option value={6}>6 per page</option>
                <option value={9}>9 per page</option>
                <option value={12}>12 per page</option>
                <option value={16}>16 per page</option>
              </select>
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

        {/* Reviews Section */}
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
    </>
  );
};

export default DestinationPage;

// Pagination Controls Component
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

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're at the beginning
    if (currentPage <= 3) {
      end = 4;
    }

    // Adjust if we're at the end
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 text-gray-800">
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} destinations
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 rounded-md text-sm font-medium min-w-[40px] ${
              page === currentPage
                ? "bg-gradient-to-r from-purple-600 to-amber-600 text-white"
                : page === "..."
                ? "cursor-default"
                : "border border-gray-300 hover:bg-gray-50 transition-colors"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
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
    <div className="text-gray-500 text-lg mb-4">
      No destinations found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg hover:from-purple-700 hover:to-amber-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);