// app/villas/page.tsx
"use client";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import React, { useEffect, useState } from "react";
import {
  VillaSectionApiResponse,
  VillaSectionVilla,
} from "@/types/accommodations-types/villa-types";
import { GET_VILLA_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import DetailedVillaCard from "@/components/accommodation-components/villa-components/DetailedVillaCard";
import VillaFilterSection from "@/components/accommodation-components/villa-components/VillaFilterSection";
import VillaPageLoading from "@/components/accommodation-components/loadings/VillaPageLoading";

// Define filter types for villas
interface VillaFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  villaType: string;
  amenities: string[];
  hasParking: boolean | null;
  hasWifi: boolean | null;
  isPetFriendly: boolean | null;
  minCapacity: number;
}

const VillaPage = () => {
  const [villas, setVillas] = useState<VillaSectionVilla[]>([]);
  const [filteredVillas, setFilteredVillas] = useState<VillaSectionVilla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters
  const [filters, setFilters] = useState<VillaFilters>({
    search: "",
    priceRange: [0, 2000],
    starRating: 0,
    location: "",
    villaType: "",
    amenities: [],
    hasParking: null,
    hasWifi: null,
    isPetFriendly: null,
    minCapacity: 0,
  });

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_VILLA_DETAILS_SECTION_FE);
        const data: VillaSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch villas");
        }

        setVillas(data.data);
        setFilteredVillas(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
  }, []);

  // Extract filter options from villas data
  const locations = Array.from(
    new Set(
      villas
        .map(
          (villa) =>
            villa.address.split(",")[1]?.trim() ||
            villa.address.split(",")[0]?.trim(),
        )
        .filter(Boolean),
    ),
  );

  const villaTypes = Array.from(
    new Set(villas.map((villa) => villa.villaType).filter(Boolean)),
  );
  const allAmenities = [
    "wifi",
    "parking",
    "petFriendly",
    "airConditioning",
    "pool",
    "privateGarden",
    "oceanView",
  ];

  // Filter villas based on current filters
  useEffect(() => {
    let filtered = villas;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (villa) =>
          villa.villaName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          villa.villaDescription
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          villa.address.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((villa) => {
      const minRoomPrice = Math.min(
        ...(villa.rooms?.map((room) => room.localPricePerNight) || [0]),
      );
      return (
        minRoomPrice >= filters.priceRange[0] &&
        minRoomPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (villa) => villa.starRating >= filters.starRating,
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((villa) =>
        villa.address.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Villa type filter
    if (filters.villaType) {
      filtered = filtered.filter(
        (villa) => villa.villaType === filters.villaType,
      );
    }

    // Capacity filter
    if (filters.minCapacity > 0) {
      filtered = filtered.filter((villa) =>
        villa.rooms?.some((room) => room.capacity >= filters.minCapacity),
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(
        (villa) => villa.parkingFacility === filters.hasParking,
      );
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(
        (villa) => villa.wifiAvailable === filters.hasWifi,
      );
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(
        (villa) => villa.petFriendly === filters.isPetFriendly,
      );
    }

    setFilteredVillas(filtered);
  }, [filters, villas]);

  const handleFilterChange = (
    filterName: keyof VillaFilters,
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
      villaType: "",
      amenities: [],
      hasParking: null,
      hasWifi: null,
      isPetFriendly: null,
      minCapacity: 0,
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <VillaPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F3EF] to-[#D9ECE5]">
        <div className="pt-20">
          <ErrorState
            title="Unable to Load Private Villas"
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
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F5] via-white to-[#E8F3EF] relative overflow-hidden">
      {/* Nature-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#428577]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Leaf Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="villa-leaf-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 15 Q50 15 55 25 Q60 35 50 45 Q40 55 30 45 Q20 35 30 25 Q35 15 40 15"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
              <circle cx="40" cy="30" r="2" fill="#1B4D3E" opacity="0.3" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#villa-leaf-pattern)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header - Nature Luxury Styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 pt-8">
              <span className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] bg-clip-text text-transparent">
                Private Villa
              </span>{" "}
              Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exclusive private villas nestled in nature&apos;s finest
              locations. Experience unparalleled privacy, luxury, and serenity
              in our handpicked collection.
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1B4D3E] rounded-full"></div>
                <span className="text-sm text-[#1B4D3E]/70">Private Pools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2E6B5C] rounded-full"></div>
                <span className="text-sm text-[#1B4D3E]/70">Personal Chef</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#428577] rounded-full"></div>
                <span className="text-sm text-[#1B4D3E]/70">Eco-Luxury</span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <VillaFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            villaTypes={villaTypes}
            amenities={allAmenities}
          />

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#1B4D3E]">
                {filteredVillas.length}
              </span>{" "}
              Exclusive Villas Available
              {filters.search && (
                <span className="text-gray-500 ml-2">
                  matching {filters.search}
                </span>
              )}
            </p>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border border-[#1B4D3E]/20 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 text-gray-700">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Star Rating</option>
                <option>Guest Reviews</option>
              </select>
            </div>
          </div>

          {/* Villas Grid */}
          <div
            className={`
            grid gap-8
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}
          >
            {filteredVillas.map((villa) => (
              <DetailedVillaCard key={villa.villaId} villa={villa} />
            ))}
          </div>

          {/* Empty State */}
          {filteredVillas.length === 0 && (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-[#1B4D3E]/10 mt-8">
              <div className="text-7xl mb-6 opacity-50">🏡</div>
              <h3 className="text-2xl font-bold text-[#1B4D3E] mb-4">
                No Private Villas Found
              </h3>
              <p className="text-[#2E6B5C] text-lg mb-8 max-w-md mx-auto">
                We couldn&apos;t find any villas matching your criteria. Try
                adjusting your filters to discover more exclusive properties.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredVillas.length > 0 &&
            filteredVillas.length < villas.length && (
              <div className="text-center mt-12">
                <button className="border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Load More Villas
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default VillaPage;
