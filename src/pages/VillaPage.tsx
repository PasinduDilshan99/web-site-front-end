// app/villas/page.tsx
"use client";
import Footer from "@/app/components/footer/Footer";
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
  const locations = Array.from(new Set(villas.map(villa => 
    villa.address.split(',')[1]?.trim() || villa.address.split(',')[0]?.trim()
  ).filter(Boolean)));

  const villaTypes = Array.from(new Set(villas.map(villa => villa.villaType).filter(Boolean)));
  const allAmenities = ['wifi', 'parking', 'petFriendly', 'airConditioning', 'pool', 'privateGarden', 'oceanView'];

  // Filter villas based on current filters
  useEffect(() => {
    let filtered = villas;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(villa =>
        villa.villaName.toLowerCase().includes(filters.search.toLowerCase()) ||
        villa.villaDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        villa.address.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(villa => {
      const minRoomPrice = Math.min(...(villa.rooms?.map(room => room.localPricePerNight) || [0]));
      return minRoomPrice >= filters.priceRange[0] && minRoomPrice <= filters.priceRange[1];
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(villa => villa.starRating >= filters.starRating);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(villa => 
        villa.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Villa type filter
    if (filters.villaType) {
      filtered = filtered.filter(villa => villa.villaType === filters.villaType);
    }

    // Capacity filter
    if (filters.minCapacity > 0) {
      filtered = filtered.filter(villa => 
        villa.rooms?.some(room => room.capacity >= filters.minCapacity)
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(villa => villa.parkingFacility === filters.hasParking);
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(villa => villa.wifiAvailable === filters.hasWifi);
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(villa => villa.petFriendly === filters.isPetFriendly);
    }

    setFilteredVillas(filtered);
  }, [filters, villas]);

  const handleFilterChange = (filterName: keyof VillaFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
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
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="pt-20">
          <Loading message="Loading luxury villas..." variant="spinner" size="lg" />
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
            title="Failed to Load Villas"
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-amber-50 to-white">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Luxury Villa Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exclusive private villas with premium amenities, perfect for luxury getaways and family retreats.
            </p>
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
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Found <span className="font-bold text-teal-600">{filteredVillas.length}</span> luxury villas
              {filters.search && ` for "${filters.search}"`}
            </p>
          </div>

          {/* Villas Grid */}
          <div className={`
            grid gap-6
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}>
            {filteredVillas.map((villa) => (
              <DetailedVillaCard key={villa.villaId} villa={villa} />
            ))}
          </div>

          {/* Empty State */}
          {filteredVillas.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🏡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Villas Found
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your filters to see more luxury villa options.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

export default VillaPage;