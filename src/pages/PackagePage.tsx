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
  PackageSearchRequest,
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
import PackageHeroSection from "@/components/packages-components/PackageHeroSection";
import LinkBar from "@/components/common-components/linkBar/LinkBar";

// Define API response interface for packages
interface PackageListResponse {
  packageCount: number;
  packageResponseDtos: ActivePackagesType[];
}

interface PaginatedPackageResponse {
  code: number;
  status: string;
  message: string;
  data: PackageListResponse | null;
  timestamp: string;
}

const PackagePage: React.FC = () => {
  const [packages, setPackages] = useState<ActivePackagesType[]>([]);
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [totalPackages, setTotalPackages] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Search button state
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Filter options from initial data
  const [packageTypes, setPackageTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  // Fetch filter options (initial data)
  const fetchFilterOptions = useCallback(async (): Promise<void> => {
    try {
      const requestBody: PackageSearchRequest = {
        name: null,
        minPrice: null,
        maxPrice: null,
        duration: null,
        packageType: null,
        location: null,
        minGroupSize: null,
        maxGroupSize: null,
        fromDate: null,
        toDate: null,
        pageSize: 100, // Fetch more for filter options
        pageNumber: 1,
      };

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/packages",
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

      const result: PaginatedPackageResponse = await response.json();

      if (result.code === 200 && result.data) {
        // Extract unique values for filters
        const types = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.packageTypeName)
          ),
        ];
        const locationsList = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.startLocation)
          ),
        ];
        const durationsList = [
          ...new Set(
            result.data.packageResponseDtos.map((pkg) => pkg.duration)
          ),
        ].sort((a, b) => a - b);

        setPackageTypes(types);
        setLocations(locationsList);
        setDurations(durationsList);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Fetch packages with filters - main API call function
  const fetchPackagesWithFilters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      // Prepare API request
      const requestBody: PackageSearchRequest = {
        name: filters.search || null,
        minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : null,
        maxPrice: filters.priceRange[1] < 100000 ? filters.priceRange[1] : null,
        duration: filters.duration ? parseInt(filters.duration) : null,
        packageType: filters.packageType || null,
        location: filters.location || null,
        minGroupSize: filters.minPersons ? parseInt(filters.minPersons) : null,
        maxGroupSize: filters.maxPersons ? parseInt(filters.maxPersons) : null,
        fromDate: filters.startDate || null,
        toDate: filters.endDate || null,
        pageSize: itemsPerPage,
        pageNumber: currentPage,
      };

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/packages",
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

      const result: PaginatedPackageResponse = await response.json();

      if (result.code === 200) {
        if (result.data) {
          setPackages(result.data.packageResponseDtos);
          setTotalPackages(result.data.packageCount);
          setTotalPages(Math.ceil(result.data.packageCount / itemsPerPage));
        } else {
          setPackages([]);
          setTotalPackages(0);
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
      setIsInitialLoad(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // Initial data fetch - runs only once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await fetchFilterOptions();
        await fetchPackagesWithFilters();
        fetchReviews();
        fetchHistory();
        fetchHistoryImages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array - runs only once on mount

  // Fetch packages when search is triggered
  useEffect(() => {
    if (searchTriggered) {
      setCurrentPage(1); // Reset to first page when search is triggered
      fetchPackagesWithFilters();
      setSearchTriggered(false);
    }
  }, [searchTriggered, fetchPackagesWithFilters]);

  // Fetch packages when page changes
  useEffect(() => {
    if (!isInitialLoad && currentPage > 0) {
      fetchPackagesWithFilters();
    }
  }, [currentPage]); // Only depends on currentPage

  // Fetch packages when items per page changes
  useEffect(() => {
    if (!isInitialLoad) {
      setCurrentPage(1); // Reset to first page
      fetchPackagesWithFilters();
    }
  }, [itemsPerPage]); // Only depends on itemsPerPage

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
      const result = await response.json();

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
      priceRange: [0, 100000],
      duration: "",
      packageType: "",
      location: "",
      minPersons: "",
      maxPersons: "",
      startDate: "",
      endDate: "",
    });
    // Trigger search automatically after reset
    setSearchTriggered(true);
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

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setIsInitialLoad(true);
    fetchFilterOptions();
    fetchPackagesWithFilters();
    fetchReviews();
    fetchHistory();
    fetchHistoryImages();
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

  // Calculate paginated packages display info
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalPackages);

  return (
    <>
      <PackageHeroSection />
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
          onSearch={handleSearch}
          onResetFilters={resetFilters}
          packageTypes={packageTypes}
          locations={locations}
          durations={durations}
        />

        {/* Results Section */}
        <div id="results-section" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {totalPackages} Package
              {totalPackages !== 1 ? "s" : ""} Found
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
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value={4}>4 per page</option>
                <option value={6}>6 per page</option>
                <option value={9}>9 per page</option>
                <option value={12}>12 per page</option>
                <option value={16}>16 per page</option>
              </select>
            </div>
          </div>

          {/* Packages Grid */}
          {packages.length > 0 ? (
            <>
              <PackageGrid
                packages={packages}
                displayCount={packages.length}
                showViewDetails={true}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalPackages}
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
        <ReviewsSection
          reviews={reviews}
          // loading={reviewsLoading}
          // error={reviewsError}
          // onRetry={handleReviewsRetry}
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
    </>
  );
};

export default PackagePage;

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
