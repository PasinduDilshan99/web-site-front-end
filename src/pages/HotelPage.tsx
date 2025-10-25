// app/hotels/page.tsx
"use client";
import Footer from "@/app/components/footer/Footer";
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
            hotel.address.split(",")[0]?.trim()
        )
        .filter(Boolean)
    )
  );
  const categories = Array.from(
    new Set(hotels.map((hotel) => hotel.hotelType).filter(Boolean))
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
          hotel.address.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter((hotel) => {
      const minRoomPrice = Math.min(
        ...(hotel.rooms?.map((room) => room.localPricePerNight) || [0])
      );
      return (
        minRoomPrice >= filters.priceRange[0] &&
        minRoomPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.starRating >= filters.starRating
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((hotel) =>
        hotel.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (hotel) => hotel.hotelType === filters.category
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.parkingFacility === filters.hasParking
      );
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.wifiAvailable === filters.hasWifi
      );
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(
        (hotel) => hotel.petFriendly === filters.isPetFriendly
      );
    }

    setFilteredHotels(filtered);
  }, [filters, hotels]);

  const handleFilterChange = (filterName: keyof HotelFilters, value: any) => {
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
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="pt-20">
          <Loading message="Loading hotels..." variant="spinner" size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="pt-20">
          <ErrorState
            title="Failed to Load Hotels"
            message={error}
            icon="alert"
            variant="error"
            size="lg"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <NavBar />

      <main className="pt-24 pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Discover Amazing Hotels
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect stay for your next adventure. From luxury resorts
              to cozy inns, we have options for every traveler.
            </p>
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

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Found{" "}
              <span className="font-bold text-purple-600">
                {filteredHotels.length}
              </span>{" "}
              hotels
              {filters.search && ` for "${filters.search}"`}
            </p>
          </div>

          {/* Hotels Grid */}
          {/* <div className="grid gap-8">
            {filteredHotels.map((hotel) => (
              <DetailedHotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div> */}
          <div
            className={`
                grid gap-6
                grid-cols-1           /* Mobile & Tablet: 1 column */
                lg:grid-cols-2        /* Laptop & PC: 2 columns */
                2xl:grid-cols-3       /* Extra large: 3 columns */
`}
          >
            {filteredHotels.map((hotel) => (
              <CompactDetailedHotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
          {/* Empty State */}
          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🏨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Hotels Found
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelPage;
