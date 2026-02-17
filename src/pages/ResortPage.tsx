// app/resorts/page.tsx
"use client";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import React, { useEffect, useState } from "react";
import {
  ResortSectionApiResponse,
  ResortSectionResort,
} from "@/types/accommodations-types/resort-types";
import { GET_RESORT_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import DetailedResortCard from "@/components/accommodation-components/resort-components/DetailedResortCard";
import ResortFilterSection from "@/components/accommodation-components/resort-components/ResortFilterSection";
import ResortPageLoading from "@/components/accommodation-components/loadings/ResortPageLoading";

// Define filter types for resorts
interface ResortFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  resortType: string;
  amenities: string[];
  hasSpa: boolean | null;
  hasPool: boolean | null;
  isAllInclusive: boolean | null;
  hasBeachAccess: boolean | null;
}

const ResortPage = () => {
  const [resorts, setResorts] = useState<ResortSectionResort[]>([]);
  const [filteredResorts, setFilteredResorts] = useState<ResortSectionResort[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters
  const [filters, setFilters] = useState<ResortFilters>({
    search: "",
    priceRange: [0, 2000],
    starRating: 0,
    location: "",
    resortType: "",
    amenities: [],
    hasSpa: null,
    hasPool: null,
    isAllInclusive: null,
    hasBeachAccess: null,
  });

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_RESORT_DETAILS_SECTION_FE);
        const data: ResortSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch resorts");
        }

        setResorts(data.data);
        setFilteredResorts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  // Extract filter options from resorts data
  const locations = Array.from(
    new Set(
      resorts
        .map(
          (resort) =>
            resort.address.split(",")[1]?.trim() ||
            resort.address.split(",")[0]?.trim(),
        )
        .filter(Boolean),
    ),
  );
  const resortTypes = Array.from(
    new Set(resorts.map((resort) => resort.resortType).filter(Boolean)),
  );

  // Filter resorts based on current filters
  useEffect(() => {
    let filtered = resorts;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (resort) =>
          resort.resortName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          resort.resortDescription
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          resort.address.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((resort) => {
      const minRoomPrice = Math.min(
        ...(resort.accommodations?.map((room) => room.localPricePerNight) || [
          0,
        ]),
      );
      return (
        minRoomPrice >= filters.priceRange[0] &&
        minRoomPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (resort) => resort.starRating >= filters.starRating,
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((resort) =>
        resort.address.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Resort type filter
    if (filters.resortType) {
      filtered = filtered.filter(
        (resort) => resort.resortType === filters.resortType,
      );
    }

    // Special feature filters
    if (filters.hasSpa !== null) {
      filtered = filtered.filter(
        (resort) =>
          resort.amenities?.some(
            (amenity) =>
              amenity.name.toLowerCase().includes("spa") ||
              amenity.description.toLowerCase().includes("spa"),
          ) ||
          resort.resortFacilities?.some(
            (facility) =>
              facility.facilityName.toLowerCase().includes("spa") ||
              facility.description.toLowerCase().includes("spa"),
          ),
      );
    }

    if (filters.hasPool !== null) {
      filtered = filtered.filter(
        (resort) =>
          resort.amenities?.some(
            (amenity) =>
              amenity.name.toLowerCase().includes("pool") ||
              amenity.description.toLowerCase().includes("pool"),
          ) ||
          resort.resortFacilities?.some(
            (facility) =>
              facility.facilityName.toLowerCase().includes("pool") ||
              facility.description.toLowerCase().includes("pool"),
          ),
      );
    }

    if (filters.hasBeachAccess !== null) {
      filtered = filtered.filter(
        (resort) =>
          resort.resortDescription.toLowerCase().includes("beach") ||
          resort.address.toLowerCase().includes("beach") ||
          resort.amenities?.some(
            (amenity) =>
              amenity.name.toLowerCase().includes("beach") ||
              amenity.description.toLowerCase().includes("beach"),
          ),
      );
    }

    setFilteredResorts(filtered);
  }, [filters, resorts]);

  const handleFilterChange = (
    filterName: keyof ResortFilters,
    value: unknown,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 2000],
      starRating: 0,
      location: "",
      resortType: "",
      amenities: [],
      hasSpa: null,
      hasPool: null,
      isAllInclusive: null,
      hasBeachAccess: null,
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <ResortPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] to-[#D9E9F0]">
        <div className="pt-20">
          <ErrorState
            title="Unable to Load Exclusive Resorts"
            message={error}
            icon="alert"
            variant="error"
            size="lg"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] via-white to-[#D9E9F0] relative overflow-hidden">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="page-wave-pattern"
              x="0"
              y="0"
              width="100"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q25 10 50 20 T100 20 T150 20 T200 20"
                stroke="#0A2F44"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q25 20 50 30 T100 30 T150 30 T200 30"
                stroke="#144A5E"
                fill="none"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#page-wave-pattern)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header - Deep Ocean Luxury Styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 pt-8">
              <span className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] bg-clip-text text-transparent">
                Ultra-Luxury
              </span>{" "}
              Resorts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled luxury and all-inclusive amenities at the
              world&apos;s most exclusive resorts. Where deep waters meet
              exceptional service and unforgettable moments.
            </p>

            {/* Ocean Depth Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0A2F44] rounded-full"></div>
                <span className="text-sm text-[#0A2F44]/70">
                  Private Beach Access
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#144A5E] rounded-full"></div>
                <span className="text-sm text-[#0A2F44]/70">
                  Overwater Villas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1F5F72] rounded-full"></div>
                <span className="text-sm text-[#0A2F44]/70">
                  Butler Service
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <ResortFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            resortTypes={resortTypes}
          />

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#0A2F44]">
                {filteredResorts.length}
              </span>{" "}
              Exclusive Resorts Available
              {filters.search && (
                <span className="text-gray-500 ml-2">
                  matching {filters.search}
                </span>
              )}
            </p>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border border-[#0A2F44]/20 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2F44]/30 text-gray-700">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Star Rating</option>
                <option>Guest Reviews</option>
              </select>
            </div>
          </div>

          {/* Resorts Grid */}
          <div
            className={`
            grid gap-8
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}
          >
            {filteredResorts.map((resort) => (
              <DetailedResortCard key={resort.resortId} resort={resort} />
            ))}
          </div>

          {/* Empty State */}
          {filteredResorts.length === 0 && (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-[#0A2F44]/10 mt-8">
              <div className="text-7xl mb-6 opacity-50">🏝️</div>
              <h3 className="text-2xl font-bold text-[#0A2F44] mb-4">
                No Exclusive Resorts Found
              </h3>
              <p className="text-[#144A5E] text-lg mb-8 max-w-md mx-auto">
                We couldn&apos;t find any resorts matching your criteria. Try
                adjusting your filters to discover more ultra-luxury properties.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] hover:from-[#052230] hover:to-[#144A5E] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredResorts.length > 0 &&
            filteredResorts.length < resorts.length && (
              <div className="text-center mt-12">
                <button className="border-2 border-[#0A2F44] text-[#0A2F44] hover:bg-[#0A2F44] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Discover More Resorts
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default ResortPage;
