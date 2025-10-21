"use client";
import React, { useState, useEffect } from "react";
import {
  PopularDestinationsType,
  Filters,
  EnhancedDestination,
} from "@/types/destinations-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import FilterSection from "@/components/destinations-components/active-destinations/FilterSection";
import DestinationsGrid from "@/components/destinations-components/active-destinations/DestinationsGrid";

const DestinationPage: React.FC = () => {
  const [destinations, setDestinations] = useState<EnhancedDestination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    EnhancedDestination[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priceRange: [0, 10000],
    duration: "",
    category: "",
    location: "",
    rating: 0,
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

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, destinations]);

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

  return (
    <>
      <NavBar />
      <div className="mx-auto px-4 py-8 bg-gradient-to-br from-purple-100 via-purple-100 to-amber-100 min-h-screen">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel destinations with exciting activities
          </p>
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
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredDestinations.length} Destination
              {filteredDestinations.length !== 1 ? "s" : ""} Found
            </h3>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <DestinationsGrid
              destinations={filteredDestinations}
              displayCount={filteredDestinations.length}
            />
          ) : (
            <NoResults onResetFilters={resetFilters} />
          )}
        </div>

        {/* Reviews Section - To be implemented later */}
        {/* <ReviewsSection /> */}
      </div>
      <Footer />
    </>
  );
};

export default DestinationPage;

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
