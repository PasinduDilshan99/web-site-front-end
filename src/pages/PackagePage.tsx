// Update your PackagePage component
"use client";
import React, { useState, useEffect } from "react";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import {
  ActivePackagesType,
  ApiResponse,
  Filters,
  PackageReview,
  ReviewsResponse,
  PackageHistory,
  PackageHistoryResponse,
  PackageHistoryImage,
} from "@/types/packages-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import FilterSection from "@/components/packages-components/FilterSection";
import PackageGrid from "@/components/packages-components/PackageGrid";
import ReviewsSection from "@/components/packages-components/ReviewsSection";
import HistoryCarousel from "@/components/packages-components/HistoryCarousel";
import PackageHistoryGallery from "@/components/packages-components/PackageHistoryGallery"; // New import
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";

interface PackageHistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistoryImage[];
  timestamp: string;
}

const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<ActivePackagesType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<
    ActivePackagesType[]
  >([]);
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [history, setHistory] = useState<PackageHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<PackageHistoryImage[]>([]); // New state for history images
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(false); // New loading state for history images
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  ); // New error state for history images

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
    fetchReviews();
    fetchHistory();
    fetchHistoryImages(); // Fetch history images when component mounts
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

  const fetchHistory = async (): Promise<void> => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/history"
      );
      const result: PackageHistoryResponse = await response.json();

      if (result.code === 200) {
        setHistory(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchHistoryImages = async (): Promise<void> => {
    try {
      setHistoryImagesLoading(true);
      setHistoryImagesError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/history-images"
      );
      const result: PackageHistoryImagesResponse = await response.json();

      if (result.code === 200) {
        setHistoryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryImagesError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package history images"
      );
    } finally {
      setHistoryImagesLoading(false);
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

  const handleHistoryRetry = () => {
    setHistoryError(null);
    fetchHistory();
  };

  const handleHistoryImagesRetry = () => {
    setHistoryImagesError(null);
    fetchHistoryImages();
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

        {/* History Section */}
        <HistoryCarousel
          historyData={history}
          loading={historyLoading}
          error={historyError}
          onRetry={handleHistoryRetry}
        />

        {/* Package History Gallery Section */}
        <PackageHistoryGallery
          imagesData={historyImages}
          loading={historyImagesLoading}
          error={historyImagesError}
          onRetry={handleHistoryImagesRetry}
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
