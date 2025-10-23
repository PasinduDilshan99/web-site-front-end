"use client";
import React, { useState, useEffect } from "react";
import {
  PopularDestinationsType,
  Filters,
  EnhancedDestination,
  DestinationHistoryType,
  DestinationHistoryImage,
} from "@/types/destinations-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import FilterSection from "@/components/destinations-components/active-destinations/FilterSection";
import DestinationsGrid from "@/components/destinations-components/active-destinations/DestinationsGrid";
import ReviewsSection from "@/components/destinations-components/ReviewsSection";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import DestinationHistory from "@/components/destinations-components/DestinationHistory";
import DestinationHistoryGallery from "@/components/destinations-components/DestinationHistoryGallery";

// Review types (move these to a types file if needed)
interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
}

interface ReviewReaction {
  reviewReactionId: number;
  reactionReviewId: number;
  reactionUserId: number;
  reactionUserName: string;
  reactionType: string;
  reviewReactionStatus: string;
  reactionCreatedAt: string;
}

interface CommentReaction {
  commentReactionId: number;
  commentReactionCommentId: number;
  commentReactionUserId: number;
  commentReactionUserName: string;
  commentReactionType: string;
  commentReactionStatus: string;
  commentReactionCreatedBy: number;
  commentReactionCreatedAt: string;
}

interface Comment {
  commentId: number;
  commentReviewId: number;
  commentUserId: number;
  commentUserName: string;
  parentCommentId: number | null;
  commentText: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface Review {
  reviewId: number;
  destinationId: number;
  destinationName: string;
  reviewUserId: number;
  reviewUserName: string;
  reviewText: string;
  reviewRating: number;
  reviewStatus: string;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number;
  reviewUpdatedAt: string;
  images: Image[];
  reactions: ReviewReaction[];
  comments: Comment[];
}

// Pagination types
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

const DestinationPage: React.FC = () => {
  const [destinations, setDestinations] = useState<EnhancedDestination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    EnhancedDestination[]
  >([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [history, setHistory] = useState<DestinationHistoryType[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<DestinationHistoryImage[]>(
    []
  );
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(true);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

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
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12, // Default for desktop
  });

  // Extract unique values for filter options from actual data
  const categories = [
    ...new Set(destinations.map((dest) => dest.categoryName)),
  ];
  const locations = [...new Set(destinations.map((dest) => dest.location))];

  // Duration options based on activities
  const durations = [
    ...new Set(
      destinations.flatMap((dest) =>
        dest.activities.map((activity) =>
          Math.ceil(activity.durationHours / 24)
        )
      )
    ),
  ]
    .filter((duration) => duration > 0)
    .sort((a, b) => a - b);

  // Items per page options
  const itemsPerPageOptions = [4, 6, 9, 12, 16];

  useEffect(() => {
    fetchDestinations();
    fetchReviews();
    fetchHistory();
    fetchHistoryImages();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, destinations]);

  useEffect(() => {
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters]);

  const handleResize = () => {
    const width = window.innerWidth;
    let itemsPerPage = 12; // default for desktop

    if (width < 640) {
      // mobile
      itemsPerPage = 4;
    } else if (width < 768) {
      // small tablet
      itemsPerPage = 6;
    } else if (width < 1024) {
      // tablet/laptop
      itemsPerPage = 9;
    } else if (width < 1280) {
      // desktop
      itemsPerPage = 12;
    } else {
      // large screens
      itemsPerPage = 16;
    }

    setPagination((prev) => ({
      ...prev,
      itemsPerPage,
    }));
  };

  const fetchHistory = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/destination/history"
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistory(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error
          ? err.message
          : "Failed to load destination history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchDestinations = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/destination/active-destinations"
      );
      const result = await response.json();

      if (result.code === 200) {
        // Enhance destinations with mock rating and popularity data
        const enhancedDestinations: EnhancedDestination[] = result.data.map(
          (destination: PopularDestinationsType) => ({
            ...destination,
            rating: generateMockRating(destination.destinationId),
            popularity: generateMockPopularity(destination.destinationId),
          })
        );
        setDestinations(enhancedDestinations);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoryImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/destination/history-images"
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistoryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryImagesError(
        err instanceof Error ? err.message : "Failed to load history images"
      );
    } finally {
      setHistoryImagesLoading(false);
    }
  };

  const fetchReviews = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/destination/reviews"
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

  // Generate mock rating (4.0 - 5.0)
  const generateMockRating = (destinationId: number): number => {
    const baseRating = 4.0;
    const variation = (destinationId % 11) / 10; // 0.0 to 1.0
    return Math.round((baseRating + variation) * 10) / 10;
  };

  // Generate mock popularity (1-100)
  const generateMockPopularity = (destinationId: number): number => {
    return (destinationId % 100) + 1;
  };

  const applyFilters = (): void => {
    let filtered = [...destinations];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (dest) =>
          dest.destinationName.toLowerCase().includes(searchLower) ||
          dest.destinationDescription.toLowerCase().includes(searchLower) ||
          dest.location.toLowerCase().includes(searchLower) ||
          dest.activities.some((activity) =>
            activity.activityName.toLowerCase().includes(searchLower)
          )
      );
    }

    // Price range filter (using mock price calculation)
    filtered = filtered.filter((dest) => {
      const price = getPrice(dest.popularity, dest.rating);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Duration filter (based on activities)
    if (filters.duration) {
      const durationDays = parseInt(filters.duration);
      filtered = filtered.filter((dest) =>
        dest.activities.some(
          (activity) => Math.ceil(activity.durationHours / 24) === durationDays
        )
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (dest) => dest.categoryName === filters.category
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((dest) => dest.location === filters.location);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((dest) => dest.rating >= filters.rating);
    }

    setFilteredDestinations(filtered);
  };

  // Mock price calculation (same as in DestinationCard)
  const getPrice = (popularity: number, rating: number): number => {
    const basePrice = popularity * rating * 10;
    return Math.round(basePrice);
  };

  const handleFilterChange = (filterName: keyof Filters, value: any): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
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
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchDestinations();
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (items: number): void => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: items,
      currentPage: 1, // Reset to first page when changing items per page
    }));
  };

  // Calculate paginated destinations
  const getPaginatedDestinations = (): EnhancedDestination[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredDestinations.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredDestinations.length / pagination.itemsPerPage
  );

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

  const paginatedDestinations = getPaginatedDestinations();

  return (
    <>
      <NavBar />
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
          onResetFilters={resetFilters}
          categories={categories}
          locations={locations}
          durations={durations}
        />

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredDestinations.length} Destination
              {filteredDestinations.length !== 1 ? "s" : ""} Found
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
                value={pagination.itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destinations Grid */}
          {paginatedDestinations.length > 0 ? (
            <>
              <DestinationsGrid
                destinations={paginatedDestinations}
                displayCount={paginatedDestinations.length}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredDestinations.length}
                  itemsPerPage={pagination.itemsPerPage}
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
        />

        <DestinationHistory
          historyData={history}
          loading={historyLoading}
          error={historyError}
          title="Destination History & Heritage"
          description="Discover the fascinating stories and historical events that shaped these amazing destinations"
        />
        <DestinationHistoryGallery
          imagesData={historyImages}
          loading={historyImagesLoading}
          error={historyImagesError}
          title="Historical Images Collection"
          description="Browse through captivating photographs that capture the essence of our destinations' history"
        />
      </div>
      <Footer />
    </>
  );
};

// Pagination Controls Component
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
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

export default DestinationPage;
