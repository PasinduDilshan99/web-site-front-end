// app/hostels/page.tsx
"use client";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import React, { useEffect, useState } from "react";
import {
  HostelSectionApiResponse,
  HostelSectionHostel,
} from "@/types/accommodations-types/hostel-types";
import { GET_HOSTEL_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import HostelFilterSection from "@/components/accommodation-components/hostel-components/HostelFilterSection";
import DetailedHostelCard from "@/components/accommodation-components/hostel-components/DetailedHostelCard";
import HostelPageLoading from "@/components/accommodation-components/loadings/HostelPageLoading";

// Define filter types for hostels
interface HostelFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  hostelType: string;
  amenities: string[];
  hasParking: boolean | null;
  hasWifi: boolean | null;
  isPetFriendly: boolean | null;
  roomCapacity: number;
}

const HostelPage = () => {
  const [hostels, setHostels] = useState<HostelSectionHostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<HostelSectionHostel[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters
  const [filters, setFilters] = useState<HostelFilters>({
    search: "",
    priceRange: [0, 500],
    starRating: 0,
    location: "",
    hostelType: "",
    amenities: [],
    hasParking: null,
    hasWifi: null,
    isPetFriendly: null,
    roomCapacity: 0,
  });

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_HOSTEL_DETAILS_SECTION_FE);
        const data: HostelSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hostels");
        }

        setHostels(data.data);
        setFilteredHostels(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  // Extract filter options from hostels data
  const locations = Array.from(
    new Set(
      hostels
        .map(
          (hostel) =>
            hostel.address.split(",")[1]?.trim() ||
            hostel.address.split(",")[0]?.trim(),
        )
        .filter(Boolean),
    ),
  );
  const hostelTypes = Array.from(
    new Set(hostels.map((hostel) => hostel.hostelType).filter(Boolean)),
  );
  const roomCapacities = Array.from(
    new Set(
      hostels
        .flatMap((hostel) => hostel.rooms?.map((room) => room.capacity) || [])
        .filter((capacity) => capacity > 0),
    ),
  ).sort((a, b) => a - b);

  // Filter hostels based on current filters
  useEffect(() => {
    let filtered = hostels;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (hostel) =>
          hostel.hostelName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          hostel.hostelDescription
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          hostel.address.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((hostel) => {
      const minRoomPrice = Math.min(
        ...(hostel.rooms?.map((room) => room.localPricePerNight) || [0]),
      );
      return (
        minRoomPrice >= filters.priceRange[0] &&
        minRoomPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (hostel) => hostel.starRating >= filters.starRating,
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((hostel) =>
        hostel.address.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Hostel type filter
    if (filters.hostelType) {
      filtered = filtered.filter(
        (hostel) => hostel.hostelType === filters.hostelType,
      );
    }

    // Room capacity filter
    if (filters.roomCapacity > 0) {
      filtered = filtered.filter((hostel) =>
        hostel.rooms?.some((room) => room.capacity >= filters.roomCapacity),
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(
        (hostel) => hostel.parkingFacility === filters.hasParking,
      );
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(
        (hostel) => hostel.wifiAvailable === filters.hasWifi,
      );
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(
        (hostel) => hostel.petFriendly === filters.isPetFriendly,
      );
    }

    setFilteredHostels(filtered);
  }, [filters, hostels]);

  const handleFilterChange = (
    filterName: keyof HostelFilters,
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
      priceRange: [0, 500],
      starRating: 0,
      location: "",
      hostelType: "",
      amenities: [],
      hasParking: null,
      hasWifi: null,
      isPetFriendly: null,
      roomCapacity: 0,
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <HostelPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] to-[#FAFFFD]">
        <div className="pt-20">
          <ErrorState
            title="Failed to Load Hostels"
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] via-white to-[#FAFFFD] relative overflow-hidden">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#B5E5D4]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DDF9F2]/30 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Bubbles Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hostel-bubbles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="3" fill="#B5E5D4" />
              <circle cx="30" cy="20" r="4" fill="#C9EFE3" />
              <circle cx="20" cy="30" r="2" fill="#DDF9F2" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#hostel-bubbles)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Header - Fresh & Social Styling */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D4F43] mb-6 pt-8">
              <span className="bg-gradient-to-r from-[#3A9B9B] to-[#5FB3B3] bg-clip-text text-transparent">
                Adventure
              </span>{" "}
              Hostels
            </h1>
            <p className="text-xl text-[#5A8F7A] max-w-3xl mx-auto leading-relaxed">
              Discover fresh, clean, and social spaces perfect for backpackers,
              solo travelers, and adventure seekers. Make new friends and create
              unforgettable memories.
            </p>

            {/* Social Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-[#B5E5D4]">
                <div className="w-2 h-2 bg-[#B5E5D4] rounded-full"></div>
                <span className="text-sm text-[#2D4F43]">Free WiFi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-[#C9EFE3]">
                <div className="w-2 h-2 bg-[#C9EFE3] rounded-full"></div>
                <span className="text-sm text-[#2D4F43]">Social Events</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-[#DDF9F2]">
                <div className="w-2 h-2 bg-[#DDF9F2] rounded-full"></div>
                <span className="text-sm text-[#2D4F43]">Shared Kitchens</span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <HostelFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            hostelTypes={hostelTypes}
            roomCapacities={roomCapacities}
          />

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-lg text-[#2D4F43]">
              <span className="font-semibold text-[#3A9B9B]">
                {filteredHostels.length}
              </span>{" "}
              fresh hostel spaces available
              {filters.search && (
                <span className="text-[#5A8F7A] ml-2">
                  matching {filters.search}
                </span>
              )}
            </p>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5A8F7A]">Sort by:</span>
              <select className="text-sm border border-[#B5E5D4] rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#B5E5D4] text-[#2D4F43]">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          {/* Hostels Grid */}
          <div
            className={`
            grid gap-6
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}
          >
            {filteredHostels.map((hostel) => (
              <DetailedHostelCard key={hostel.hostelId} hostel={hostel} />
            ))}
          </div>

          {/* Empty State */}
          {filteredHostels.length === 0 && (
            <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-[#B5E5D4]/30 mt-8">
              <div className="text-7xl mb-6 opacity-60">🏕️</div>
              <h3 className="text-2xl font-bold text-[#2D4F43] mb-4">
                No Hostels Found
              </h3>
              <p className="text-[#5A8F7A] text-lg mb-8 max-w-md mx-auto">
                Try adjusting your filters to discover more fresh hostel spaces.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-[#B5E5D4]"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredHostels.length > 0 &&
            filteredHostels.length < hostels.length && (
              <div className="text-center mt-12">
                <button className="border-2 border-[#B5E5D4] text-[#2D4F43] hover:bg-[#F5FDFA] px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Load More Hostels
                </button>
              </div>
            )}

          {/* Budget-Friendly Note */}
          {filteredHostels.length > 0 && (
            <div className="text-center mt-10 pt-6 border-t border-[#B5E5D4]/30">
              <p className="text-sm text-[#5A8F7A] flex items-center justify-center gap-2">
                <span>✨</span>
                All hostels include free WiFi • No booking fees • Free
                cancellation
                <span>✨</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HostelPage;
