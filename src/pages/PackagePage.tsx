// Update your PackagePage component
"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import PackageHistoryGallery from "@/components/packages-components/PackageHistoryGallery";
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

// Pagination types
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<ActivePackagesType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<
    ActivePackagesType[]
  >([]);
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [history, setHistory] = useState<PackageHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<PackageHistoryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

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

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12, // Default for desktop
  });

  // Extract unique values for filter options
  const packageTypes = [...new Set(packages.map((pkg) => pkg.packageTypeName))];
  const locations = [...new Set(packages.map((pkg) => pkg.startLocation))];
  const durations = [...new Set(packages.map((pkg) => pkg.duration))].sort(
    (a, b) => a - b
  );

  // Items per page options
  const itemsPerPageOptions = [4, 6, 9, 12, 16];

  // Use useCallback to memoize handleResize
  const handleResize = useCallback((): void => {
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
  }, []); // Empty dependency array since we don't use any external variables

  useEffect(() => {
    fetchPackages();
    fetchReviews();
    fetchHistory();
    fetchHistoryImages();

    // Initial resize call
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]); // Add handleResize to dependency array

  useEffect(() => {
    applyFilters();
  }, [filters, packages]); // Add proper dependencies

  useEffect(() => {
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters]);

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

  // Calculate paginated packages
  const getPaginatedPackages = (): ActivePackagesType[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredPackages.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredPackages.length / pagination.itemsPerPage
  );

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

  const paginatedPackages = getPaginatedPackages();

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredPackages.length} Package
              {filteredPackages.length !== 1 ? "s" : ""} Found
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

          {/* Packages Grid */}
          {paginatedPackages.length > 0 ? (
            <>
              <PackageGrid
                packages={paginatedPackages}
                displayCount={paginatedPackages.length}
                showViewDetails={true}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredPackages.length}
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

// Pagination Controls Component (same as in DestinationPage)
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
        Showing {startItem} to {endItem} of {totalItems} packages
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
      No packages found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg hover:from-purple-700 hover:to-amber-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);

export default PackagePage;
