// app/hotels/page.tsx
"use client";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import React, { useEffect, useState } from "react";
import {
  HotelSectionApiResponse,
  HotelSectionHotel,
} from "@/types/accommodations-types/hotel-types";
import { GET_HOTEL_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import DetailedHotelCard from "@/components/accommodation-components/hotels-components/DetailedHotelCard";
import HotelFilterSection from "@/components/accommodation-components/hotels-components/HotelFilterSection";
import CompactDetailedHotelCard from "@/components/accommodation-components/hotels-components/CompactDetailedHotelCard";
import HotelPageLoading from "@/components/accommodation-components/loadings/HotelPageLoading";

// Define filter types for hotels
interface HotelFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  category: string;
  amenities: string[];
  hasParking: boolean | null;
  hasWifi: boolean | null;
  isPetFriendly: boolean | null;
}

const HotelPage = () => {
  const [hotels, setHotels] = useState<HotelSectionHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelSectionHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters
  const [filters, setFilters] = useState<HotelFilters>({
    search: "",
    priceRange: [0, 1000],
    starRating: 0,
    location: "",
    category: "",
    amenities: [],
    hasParking: null,
    hasWifi: null,
    isPetFriendly: null,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_HOTEL_DETAILS_SECTION_FE);
        const data: HotelSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hotels");
        }

        setHotels(data.data);
        setFilteredHotels(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Extract filter options from hotels data
  const locations = Array.from(
    new Set(
      hotels
        .map(
          (hotel) =>
            hotel.address.split(",")[1]?.trim() ||
            hotel.address.split(",")[0]?.trim(),
        )
        .filter(Boolean),
    ),
  );
  const categories = Array.from(
    new Set(hotels.map((hotel) => hotel.hotelType).filter(Boolean)),
  );
  const allAmenities = [
    "wifi",
    "parking",
    "petFriendly",
    "airConditioning",
    "swimmingPool",
    "spa",
    "gym",
  ];

  // Filter hotels based on current filters
  useEffect(() => {
    let filtered = hotels;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.hotelName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          hotel.hotelDescription
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          hotel.address.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((hotel) => {
      const minRoomPrice = Math.min(
        ...(hotel.rooms?.map((room) => room.localPricePerNight) || [0]),
      );
      return (
        minRoomPrice >= filters.priceRange[0] &&
        minRoomPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.starRating >= filters.starRating,
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((hotel) =>
        hotel.address.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (hotel) => hotel.hotelType === filters.category,
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.parkingFacility === filters.hasParking,
      );
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.wifiAvailable === filters.hasWifi,
      );
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.petFriendly === filters.isPetFriendly,
      );
    }

    setFilteredHotels(filtered);
  }, [filters, hotels]);

  const handleFilterChange = (
    filterName: keyof HotelFilters,
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
      priceRange: [0, 1000],
      starRating: 0,
      location: "",
      category: "",
      amenities: [],
      hasParking: null,
      hasWifi: null,
      isPetFriendly: null,
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <HotelPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-[#E6F0FA]">
        <div className="pt-20">
          <ErrorState
            title="Failed to Load Luxury Hotels"
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
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E6F0FA]">
      <main className="pt-24 pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Header - Luxury Styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 pt-8">
              <span className="bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] bg-clip-text text-transparent">
                Discover Luxury
              </span>{" "}
              Hotels
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find your perfect sanctuary. From exclusive beachfront resorts to
              sophisticated urban retreats, experience unparalleled comfort and
              elegance.
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2A6F97] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  500+ Luxury Properties
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3F8AB2] rounded-full"></div>
                <span className="text-sm text-gray-600">24/7 Concierge</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#54A5CC] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Best Price Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <HotelFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            categories={categories}
            amenities={allAmenities}
          />

          {/* Results Count - Luxury Styling */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#2A6F97]">
                {filteredHotels.length}
              </span>{" "}
              Luxury Properties Available
              {filters.search && (
                <span className="text-gray-500 ml-2">
                  matching {filters.search}
                </span>
              )}
            </p>

            {/* Sort Options (Optional) */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border border-[#2A6F97]/20 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F97]/30">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Star Rating</option>
                <option>Guest Reviews</option>
              </select>
            </div>
          </div>

          {/* Hotels Grid */}
          <div
            className={`
                grid gap-8
                grid-cols-1           /* Mobile & Tablet: 1 column */
                lg:grid-cols-2        /* Laptop & PC: 2 columns */
                2xl:grid-cols-3       /* Extra large: 3 columns */
            `}
          >
            {filteredHotels.map((hotel) => (
              <CompactDetailedHotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>

          {/* Empty State - Luxury Styling */}
          {filteredHotels.length === 0 && (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-[#2A6F97]/10 mt-8">
              <div className="text-7xl mb-6 opacity-50">🏨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Luxury Properties Found
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                We couldn&apos;t find any hotels matching your criteria. Try
                adjusting your filters for more options.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button (if needed) */}
          {filteredHotels.length > 0 &&
            filteredHotels.length < hotels.length && (
              <div className="text-center mt-12">
                <button className="border-2 border-[#2A6F97] text-[#2A6F97] hover:bg-[#2A6F97] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Load More Properties
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default HotelPage;
