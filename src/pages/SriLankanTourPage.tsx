"use client";
import React, { useState, useEffect } from "react";
import {
  ActiveToursType,
  TourFilters,
  TourHistory,
  TourReview,
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

const SriLankanTourPage: React.FC = () => {
  const [tours, setTours] = useState<ActiveToursType[]>([]);
  const [filteredTours, setFilteredTours] = useState<ActiveToursType[]>([]);
  const [reviews, setReviews] = useState<TourReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [histories, setHistories] = useState<TourHistory[]>([]); // Add this state
  const [historyLoading, setHistoryLoading] = useState<boolean>(true); // Add this state
  const [historyError, setHistoryError] = useState<string | null>(null); // Add this state

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6); // Default for mobile

  // Extract unique values for filter options from actual data
  const tourTypes = [...new Set(tours.map((tour) => tour.tourTypeName))];
  const tourCategories = [
    ...new Set(tours.map((tour) => tour.tourCategoryName)),
  ];
  const seasons = [...new Set(tours.map((tour) => tour.seasonName))];
  const locations = [
    ...new Set(tours.flatMap((tour) => [tour.startLocation, tour.endLocation])),
  ];
  const durations = [...new Set(tours.map((tour) => tour.duration))].sort(
    (a, b) => a - b
  );

  useEffect(() => {
    fetchTours();
    fetchReviews();
    fetchTourHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tours]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 768) {
          setItemsPerPage(6); // Mobile
        } else if (width < 1024) {
          setItemsPerPage(8); // Tablet
        } else if (width < 1280) {
          setItemsPerPage(9); // Laptop
        } else if (width < 1536) {
          setItemsPerPage(12); // PC
        } else {
          setItemsPerPage(16); // Large screens
        }
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchTours = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/tour/active"
      );
      const result = await response.json();

      if (result.code === 200) {
        setTours(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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

  const applyFilters = (): void => {
    let filtered = [...tours];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (tour) =>
          tour.tourName.toLowerCase().includes(searchLower) ||
          tour.tourDescription.toLowerCase().includes(searchLower) ||
          tour.startLocation.toLowerCase().includes(searchLower) ||
          tour.endLocation.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter (using calculated price)
    filtered = filtered.filter((tour) => {
      const price = calculatePrice(tour);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Duration filter
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      filtered = filtered.filter((tour) => tour.duration === duration);
    }

    // Tour Type filter
    if (filters.tourType) {
      filtered = filtered.filter(
        (tour) => tour.tourTypeName === filters.tourType
      );
    }

    // Tour Category filter
    if (filters.tourCategory) {
      filtered = filtered.filter(
        (tour) => tour.tourCategoryName === filters.tourCategory
      );
    }

    // Season filter
    if (filters.season) {
      filtered = filtered.filter((tour) => tour.seasonName === filters.season);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (tour) =>
          tour.startLocation
            .toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          tour.endLocation
            .toLowerCase()
            .includes(filters.location.toLowerCase())
      );
    }

    setFilteredTours(filtered);
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
  };

  const resetFilters = (): void => {
    setFilters({
      search: "",
      priceRange: [0, 5000],
      duration: "",
      tourType: "",
      tourCategory: "",
      season: "",
      location: "",
    });
  };

  const handleRetry = () => {
    setError(null);
    setReviewsError(null);
    setHistoryError(null);
    setLoading(true);
    setReviewsLoading(true);
    setHistoryLoading(true);
    fetchTours();
    fetchReviews();
    fetchTourHistory();
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
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
      <NavBar />
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
              {filteredTours.length} Tour{filteredTours.length !== 1 ? "s" : ""}{" "}
              Found
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
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
              </select>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                per page
              </span>
            </div>
          </div>

          {/* Tours Grid */}
          {currentTours.length > 0 ? (
            <>
              <ToursGrid
                tours={currentTours}
                displayCount={currentTours.length}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredTours.length}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                  endIndex={Math.min(endIndex, filteredTours.length)}
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
        Showing {startIndex + 1} to {endIndex} of {totalItems} results
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
