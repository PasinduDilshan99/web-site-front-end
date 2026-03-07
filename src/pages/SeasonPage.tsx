// app/seasons/page.tsx
"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SeasonService } from "@/services/seasonService";
import { SeasonBasic, SeasonImage } from "@/types/season-types";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import SeasonsLoading from "@/components/season-components/SeasonsLoading";
import { SEASON_PAGE_PATH } from "@/utils/urls";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

// Image Carousel Component with proper type handling
interface ImageCarouselProps {
  images: SeasonImage[];
  seasonName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  seasonName,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Filter out images with no valid URL
  const validImages: SeasonImage[] = images.filter(
    (img): img is SeasonImage & { imageUrl: string } =>
      img.imageUrl !== null &&
      img.imageUrl !== undefined &&
      img.imageUrl.trim() !== "",
  );

  // Minimum swipe distance
  const minSwipeDistance: number = 50;

  // Auto-advance images when hovering
  useEffect(() => {
    if (!isHovering || validImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isHovering, validImages.length]);

  const handlePrevImage = (e?: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length,
    );
  };
  const handleNextImage = (e?: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const goToImage = (e: React.MouseEvent, index: number): void => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Touch handlers for mobile
  const onTouchStart = (e: React.TouchEvent): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (!touchStart || !touchEnd) return;

    const distance: number = touchStart - touchEnd;
    const isLeftSwipe: boolean = distance > minSwipeDistance;
    const isRightSwipe: boolean = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage(); // No event needed
    } else if (isRightSwipe) {
      handlePrevImage(); // No event needed
    }
  };

  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
        <span className="text-4xl text-white opacity-50">🍂</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full group"
      onMouseEnter={(): void => setIsHovering(true)}
      onMouseLeave={(): void => setIsHovering(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={validImages[currentImageIndex]?.imageUrl || PLACE_HOLDER_IMAGE}
          alt={`${seasonName} - Image ${currentImageIndex + 1}`}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={currentImageIndex === 0}
        />
      </div>

      {/* Image Counter Badge */}
      {validImages.length > 1 && (
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm hover:scale-110 z-20"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm hover:scale-110 z-20"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {validImages.map((_, index: number) => (
            <button
              key={index}
              onClick={(e: React.MouseEvent): void => goToImage(e, index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/80 w-1.5"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe indicator for mobile */}
      {validImages.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            Swipe to browse
          </span>
        </div>
      )}
    </div>
  );
};

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: SeasonFilters,
  page: number,
  pageSize: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.startMonth)
    params.set("startMonth", filters.startMonth.toString());
  if (filters.endMonth) params.set("endMonth", filters.endMonth.toString());
  if (filters.isPeak !== "all") params.set("isPeak", filters.isPeak);

  // Pagination
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): SeasonFilters => {
  return {
    search: params.get("search") || "",
    startMonth: params.get("startMonth")
      ? Number(params.get("startMonth"))
      : null,
    endMonth: params.get("endMonth") ? Number(params.get("endMonth")) : null,
    isPeak: (params.get("isPeak") as "all" | "peak" | "non-peak") || "all",
  };
};

const urlParamsToPagination = (
  params: URLSearchParams,
): { page: number; pageSize: number } => {
  return {
    page: Number(params.get("page")) || 1,
    pageSize: Number(params.get("pageSize")) || 12,
  };
};

interface SeasonFilters {
  search: string;
  startMonth: number | null;
  endMonth: number | null;
  isPeak: "all" | "peak" | "non-peak";
}

// Main component wrapped with Suspense for useSearchParams
const SeasonsPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [seasons, setSeasons] = useState<SeasonBasic[]>([]);
  const [filteredSeasons, setFilteredSeasons] = useState<SeasonBasic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<SeasonFilters>(() =>
    urlParamsToFilters(new URLSearchParams(searchParams?.toString())),
  );

  // Pagination states from URL params
  const [currentPage, setCurrentPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString())).page,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    () =>
      urlParamsToPagination(new URLSearchParams(searchParams?.toString()))
        .pageSize,
  );

  const [totalSeasons, setTotalSeasons] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Month options for filter
  const months: { value: number; label: string }[] = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Fetch all seasons
  const fetchSeasons = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const seasonService = new SeasonService();
      const data: SeasonBasic[] = await seasonService.getAllSeasons();

      // Sort by display order
      const sortedData: SeasonBasic[] = [...data].sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );

      setSeasons(sortedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching seasons:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching seasons",
      );
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchSeasons();
  }, [fetchSeasons]);

  // Apply filters and pagination
  useEffect(() => {
    if (seasons.length > 0 && !isInitialLoad) {
      // Apply filters
      let filtered: SeasonBasic[] = [...seasons];

      // Search filter
      if (filters.search) {
        const searchLower: string = filters.search.toLowerCase();
        filtered = filtered.filter(
          (season) =>
            season.standardName.toLowerCase().includes(searchLower) ||
            season.localName.toLowerCase().includes(searchLower) ||
            season.name.toLowerCase().includes(searchLower),
        );
      }

      // Start Month filter
      if (filters.startMonth) {
        filtered = filtered.filter(
          (season) => season.startMonth === filters.startMonth,
        );
      }

      // End Month filter
      if (filters.endMonth) {
        filtered = filtered.filter(
          (season) => season.endMonth === filters.endMonth,
        );
      }

      // Peak season filter
      if (filters.isPeak !== "all") {
        filtered = filtered.filter((season) =>
          filters.isPeak === "peak" ? season.isPeak : !season.isPeak,
        );
      }

      setFilteredSeasons(filtered);
      setTotalSeasons(filtered.length);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
  }, [filters, seasons, itemsPerPage, isInitialLoad]);

  // Watch for URL params changes
  useEffect(() => {
    if (!isInitialLoad) {
      const urlFilters: SeasonFilters = urlParamsToFilters(
        new URLSearchParams(searchParams?.toString()),
      );
      const { page, pageSize } = urlParamsToPagination(
        new URLSearchParams(searchParams?.toString()),
      );

      setFilters(urlFilters);
      setCurrentPage(page);
      setItemsPerPage(pageSize);
    }
  }, [searchParams, isInitialLoad]);

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: SeasonFilters, page: number, pageSize: number): void => {
      const params: URLSearchParams = filtersToUrlParams(
        newFilters,
        page,
        pageSize,
      );
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleFilterChange = (
    filterName: keyof SeasonFilters,
    value: string | number | null,
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = (): void => {
    updateUrlParams(filters, 1, itemsPerPage);
  };

  const resetFilters = (): void => {
    const resetFilterValues: SeasonFilters = {
      search: "",
      startMonth: null,
      endMonth: null,
      isPeak: "all",
    };

    setFilters(resetFilterValues);
    updateUrlParams(resetFilterValues, 1, itemsPerPage);
  };

  const handleRetry = (): void => {
    setError(null);
    fetchSeasons();
  };

  // Pagination calculations
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = Math.min(startIndex + itemsPerPage, totalSeasons);
  const currentSeasons: SeasonBasic[] = filteredSeasons.slice(
    startIndex,
    endIndex,
  );

  const handlePageChange = (page: number): void => {
    updateUrlParams(filters, page, itemsPerPage);
    const resultsSection: HTMLElement | null =
      document.getElementById("seasons-grid");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value: number): void => {
    updateUrlParams(filters, 1, value);
  };

  const getMonthName = (month: number): string => {
    return months.find((m) => m.value === month)?.label || "";
  };

  if (loading && isInitialLoad) {
    return <SeasonsLoading itemsPerPage={itemsPerPage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      <div className="container mx-auto px-4 py-8" id="seasons-grid">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle=""
            title="Seasons of the Year"
            description="Explore the unique characteristics and beauty of each season throughout the year"
            fromColor="#0D9488" // Teal
            toColor="#0891B2" // Cyan
          />
        </div>

        {/* Filters Section */}
        <SeasonFilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onResetFilters={resetFilters}
          months={months}
        />

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8">
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="text-xl font-bold text-teal-800 mb-2">
              Failed to Load Seasons
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="cursor-pointer px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Section */}
        {!error && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-lg lg:text-2xl font-semibold text-teal-900">
                {totalSeasons} Season{totalSeasons !== 1 ? "s" : ""} Found
              </h3>

              {/* Items Per Page Selector */}
              {totalSeasons > 0 && (
                <div className="flex items-center gap-3 bg-teal-50 rounded-lg px-4 py-2 border border-teal-200">
                  <label
                    htmlFor="itemsPerPage"
                    className="text-sm font-medium text-teal-800 whitespace-nowrap"
                  >
                    Show:
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
                    className="cursor-pointer border border-teal-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-teal-700 transition-all duration-200 hover:border-teal-400"
                  >
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                    <option value={32}>32</option>
                  </select>
                  <span className="text-sm text-teal-600 whitespace-nowrap font-medium">
                    per page
                  </span>
                </div>
              )}
            </div>

            {/* Seasons Grid */}
            {currentSeasons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentSeasons.map((season: SeasonBasic) => (
                    <Link
                      key={season.id}
                      href={`${SEASON_PAGE_PATH}/${season.id}?name=${season.name}`}
                      className="group block"
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-teal-100 hover:border-teal-300 h-full">
                        {/* Season Image with Carousel */}
                        <div className="relative h-48 overflow-hidden">
                          <ImageCarousel
                            images={season.seasonImages || []}
                            seasonName={season.standardName}
                          />

                          {/* Peak Season Badge */}
                          {season.isPeak && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                                Peak Season
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Season Info */}
                        <div className="p-5">
                          <h4 className="text-xl font-bold text-teal-800 mb-1 group-hover:text-teal-600 transition-colors">
                            {season.standardName}
                          </h4>
                          <p className="text-cyan-600 text-sm mb-3">
                            {season.name}
                          </p>

                          {/* Month Range */}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <svg
                              className="w-4 h-4 text-teal-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>
                              {getMonthName(season.startMonth)} -{" "}
                              {getMonthName(season.endMonth)}
                            </span>
                          </div>

                          {/* View Details Button */}
                          <div className="mt-4 flex justify-end">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-teal-600 transition-colors">
                              View Details
                              <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={totalSeasons}
                    itemsPerPage={itemsPerPage}
                    startIndex={startIndex}
                    endIndex={endIndex}
                  />
                )}
              </>
            ) : (
              <NoResults onResetFilters={resetFilters} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const SeasonsPage: React.FC = () => {
  return (
    <Suspense fallback={<SeasonsLoading itemsPerPage={12} />}>
      <SeasonsPageContent />
    </Suspense>
  );
};

export default SeasonsPage;

// Filter Section Component
interface SeasonFilterSectionProps {
  filters: SeasonFilters;
  onFilterChange: (
    filterName: keyof SeasonFilters,
    value: string | number | null,
  ) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  months: { value: number; label: string }[];
}

const SeasonFilterSection: React.FC<SeasonFilterSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onResetFilters,
  months,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  const toggleAdvancedFilters = (): void => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-teal-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Filter Seasons
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onResetFilters}
            className="cursor-pointer px-4 lg:px-6 py-1 lg:py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
          <button
            onClick={onSearch}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-teal-800">
            Search Seasons
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Peak Season Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-teal-800">
            Season Type
          </label>
          <select
            value={filters.isPeak}
            onChange={(e) => onFilterChange("isPeak", e.target.value)}
            className="text-sm lg:text-md w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d9488' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              paddingRight: "2rem",
            }}
          >
            <option value="all">All Seasons</option>
            <option value="peak">Peak Seasons Only</option>
            <option value="non-peak">Non-Peak Seasons</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showAdvancedFilters
            ? "max-h-96 opacity-100 mb-6"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Month Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-cyan-800">
              Start Month
            </label>
            <select
              value={filters.startMonth || ""}
              onChange={(e) =>
                onFilterChange(
                  "startMonth",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="text-sm lg:text-md w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23089b8a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any Start Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* End Month Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-cyan-800">
              End Month
            </label>
            <select
              value={filters.endMonth || ""}
              onChange={(e) =>
                onFilterChange(
                  "endMonth",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="text-sm lg:text-md w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 font-medium transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23089b8a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                paddingRight: "2rem",
              }}
            >
              <option value="">Any End Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Toggle Advanced Filters Button */}
      <div className={`relative ${showAdvancedFilters ? "mt-6" : "mb-6"}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-teal-300"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={toggleAdvancedFilters}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAdvancedFilters ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Hide Advanced Filters
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Show Advanced Filters
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      <ActiveFiltersSummary
        filters={filters}
        onFilterChange={onFilterChange}
        months={months}
      />
    </div>
  );
};

// Active Filters Summary Component
interface ActiveFiltersSummaryProps {
  filters: SeasonFilters;
  onFilterChange: (
    filterName: keyof SeasonFilters,
    value: string | number | null,
  ) => void;
  months: { value: number; label: string }[];
}

const ActiveFiltersSummary: React.FC<ActiveFiltersSummaryProps> = ({
  filters,
  onFilterChange,
  months,
}) => {
  interface ActiveFilter {
    name: keyof SeasonFilters;
    label: string;
    value: string | number | null;
  }

  const activeFilters: ActiveFilter[] = [];

  if (filters.search) {
    activeFilters.push({
      name: "search",
      label: `Search: "${filters.search}"`,
      value: filters.search,
    });
  }

  if (filters.startMonth) {
    const monthName: string =
      months.find((m) => m.value === filters.startMonth)?.label || "";
    activeFilters.push({
      name: "startMonth",
      label: `Starts: ${monthName}`,
      value: filters.startMonth,
    });
  }

  if (filters.endMonth) {
    const monthName: string =
      months.find((m) => m.value === filters.endMonth)?.label || "";
    activeFilters.push({
      name: "endMonth",
      label: `Ends: ${monthName}`,
      value: filters.endMonth,
    });
  }

  if (filters.isPeak !== "all") {
    activeFilters.push({
      name: "isPeak",
      label:
        filters.isPeak === "peak"
          ? "Peak Seasons Only"
          : "Non-Peak Seasons Only",
      value: filters.isPeak,
    });
  }

  if (activeFilters.length === 0) return null;

  const resetValues: Record<keyof SeasonFilters, string | number | null> = {
    search: "",
    startMonth: null,
    endMonth: null,
    isPeak: "all",
  };

  const removeFilter = (filterName: keyof SeasonFilters): void => {
    onFilterChange(filterName, resetValues[filterName]);
  };

  return (
    <div className="border-t-2 border-teal-300 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-teal-800">
          Active Filters:
        </span>
        <span className="text-sm text-teal-600">({activeFilters.length})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter: ActiveFilter) => (
          <span
            key={filter.name}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 rounded-full text-xs font-medium border border-teal-200 transition-all duration-200 hover:shadow-md"
          >
            {filter.label}
            <button
              onClick={(): void => removeFilter(filter.name)}
              className="cursor-pointer hover:text-red-600 transition-colors duration-200 ml-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// No Results Component
interface NoResultsProps {
  onResetFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onResetFilters }) => (
  <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
    <div className="text-6xl mb-4">🌿</div>
    <h3 className="text-xl font-bold text-teal-800 mb-2">No Seasons Found</h3>
    <p className="text-gray-600 mb-6">
      No seasons match your current filter criteria.
    </p>
    <button
      onClick={onResetFilters}
      className="cursor-pointer px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
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
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages: number = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage: number = Math.max(2, currentPage - 1);
      let endPage: number = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers: (number | string)[] = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-teal-200">
      <div className="text-sm text-teal-600 font-medium">
        Showing {startIndex + 1} to {endIndex} of {totalItems} results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(): void => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-teal-700 bg-white border-2 border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1">
          {pageNumbers.map((page: number | string, index: number) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-sm font-medium text-teal-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={(): void => onPageChange(page as number)}
                className={`cursor-pointer min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105"
                    : "text-teal-700 bg-white border-2 border-teal-300 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 hover:shadow-md"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={(): void => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-teal-700 bg-white border-2 border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
