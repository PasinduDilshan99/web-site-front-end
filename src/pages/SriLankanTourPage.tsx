"use client";
import React, { useState, useEffect } from "react";
import {
  ActiveToursType,
  TourFilters,
  TourReview,
} from "@/types/sri-lankan-tour-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import FilterSection from "@/components/sri-lankan-tours-components/FilterSection";
import ToursGrid from "@/components/sri-lankan-tours-components/ToursGrid";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";

const SriLankanTourPage: React.FC = () => {
  const [tours, setTours] = useState<ActiveToursType[]>([]);
  const [filteredTours, setFilteredTours] = useState<ActiveToursType[]>([]);
  const [reviews, setReviews] = useState<TourReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tours]);

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
    value: any
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
    setLoading(true);
    setReviewsLoading(true);
    fetchTours();
    fetchReviews();
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sri Lankan Tours
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Sri Lanka with our curated tour experiences
          </p>
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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredTours.length} Tour
              {filteredTours.length !== 1 ? "s" : ""} Found
            </h3>
          </div>

          {/* Tours Grid */}
          {filteredTours.length > 0 ? (
            <ToursGrid
              tours={filteredTours}
              displayCount={filteredTours.length}
            />
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
