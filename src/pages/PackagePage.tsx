"use client";
import React, { useState, useEffect } from "react";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import {
  ActivePackagesType,
  ApiResponse,
  Filters,
  PackageReview,
  ReviewsResponse,
} from "@/types/packages-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import FilterSection from "@/components/packages-components/FilterSection";
import PackageGrid from "@/components/packages-components/PackageGrid";
import ReviewsSection from "@/components/packages-components/ReviewsSection"; // New component
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";

const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<ActivePackagesType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<
    ActivePackagesType[]
  >([]);
  const [reviews, setReviews] = useState<PackageReview[]>([]); // New state for reviews
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false); // Separate loading for reviews
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null); // Separate error for reviews

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priceRange: [0, 100000],
    duration: "",
    packageType: "",
    location: "",
    minPersons: "",
    maxPersons: "",
    startDate: "",
    endDate: "",
  });

  // Extract unique values for filter options
  const packageTypes = [...new Set(packages.map((pkg) => pkg.packageTypeName))];
  const locations = [...new Set(packages.map((pkg) => pkg.startLocation))];
  const durations = [...new Set(packages.map((pkg) => pkg.duration))].sort(
    (a, b) => a - b
  );

  useEffect(() => {
    fetchPackages();
    fetchReviews(); // Fetch reviews when component mounts
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, packages]);

  const fetchPackages = async (): Promise<void> => {
    try {
      const response = await fetch(GET_ALL_ACTIVE_PACKAGES_FE);
      const result: ApiResponse = await response.json();

      if (result.code === 200) {
        setPackages(result.data);
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
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/reviews"
      );
      const result: ReviewsResponse = await response.json();

      if (result.code === 200) {
        setReviews(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setReviewsError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  const applyFilters = (): void => {
    let filtered = [...packages];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (pkg) =>
          pkg.packageName.toLowerCase().includes(searchLower) ||
          pkg.packageDescription.toLowerCase().includes(searchLower) ||
          pkg.tourName.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (pkg) =>
        pkg.totalPrice >= filters.priceRange[0] &&
        pkg.totalPrice <= filters.priceRange[1]
    );

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(
        (pkg) => pkg.duration === parseInt(filters.duration)
      );
    }

    // Package type filter
    if (filters.packageType) {
      filtered = filtered.filter(
        (pkg) => pkg.packageTypeName === filters.packageType
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (pkg) => pkg.startLocation === filters.location
      );
    }

    // Persons filter
    if (filters.minPersons) {
      filtered = filtered.filter(
        (pkg) => pkg.minPersonCount <= parseInt(filters.minPersons)
      );
    }
    if (filters.maxPersons) {
      filtered = filtered.filter(
        (pkg) => pkg.maxPersonCount >= parseInt(filters.maxPersons)
      );
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter((pkg) => pkg.startDate >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter((pkg) => pkg.endDate <= filters.endDate);
    }

    setFilteredPackages(filtered);
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
      priceRange: [0, 100000],
      duration: "",
      packageType: "",
      location: "",
      minPersons: "",
      maxPersons: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  const handleReviewsRetry = () => {
    setReviewsError(null);
    fetchReviews();
  };

  if (loading) {
    return (
      <Loading
        message="Loading packages details..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load packages details"
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
      <div className="mx-auto px-4 py-8 bg-gradient-to-br from-purple-100 via-purple-100 to-amber-100">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tour Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel experiences tailored for you
          </p>
        </div>

        {/* Filters Section */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          packageTypes={packageTypes}
          locations={locations}
          durations={durations}
        />

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredPackages.length} Package
              {filteredPackages.length !== 1 ? "s" : ""} Found
            </h3>
          </div>

          {/* Packages Grid */}
          {filteredPackages.length > 0 ? (
            <PackageGrid
              packages={filteredPackages}
              displayCount={filteredPackages.length}
              showViewDetails={true}
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
          onRetry={handleReviewsRetry}
        />
      </div>
      <Footer />
    </>
  );
};

export default PackagePage;

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-gray-500 text-lg mb-4">
      No packages found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);
