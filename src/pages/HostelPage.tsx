// app/hostels/page.tsx
"use client";
import Footer from "@/app/components/footer/Footer";
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
  const [filteredHostels, setFilteredHostels] = useState<HostelSectionHostel[]>([]);
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
  const locations = Array.from(new Set(hostels.map(hostel => hostel.address.split(',')[1]?.trim() || hostel.address.split(',')[0]?.trim()).filter(Boolean)));
  const hostelTypes = Array.from(new Set(hostels.map(hostel => hostel.hostelType).filter(Boolean)));
  const roomCapacities = Array.from(new Set(hostels.flatMap(hostel => hostel.rooms?.map(room => room.capacity) || []).filter(capacity => capacity > 0))).sort((a, b) => a - b);

  // Filter hostels based on current filters
  useEffect(() => {
    let filtered = hostels;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(hostel =>
        hostel.hostelName.toLowerCase().includes(filters.search.toLowerCase()) ||
        hostel.hostelDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        hostel.address.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(hostel => {
      const minRoomPrice = Math.min(...(hostel.rooms?.map(room => room.localPricePerNight) || [0]));
      return minRoomPrice >= filters.priceRange[0] && minRoomPrice <= filters.priceRange[1];
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(hostel => hostel.starRating >= filters.starRating);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(hostel => 
        hostel.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Hostel type filter
    if (filters.hostelType) {
      filtered = filtered.filter(hostel => hostel.hostelType === filters.hostelType);
    }

    // Room capacity filter
    if (filters.roomCapacity > 0) {
      filtered = filtered.filter(hostel => 
        hostel.rooms?.some(room => room.capacity >= filters.roomCapacity)
      );
    }

    // Amenities filters
    if (filters.hasParking !== null) {
      filtered = filtered.filter(hostel => hostel.parkingFacility === filters.hasParking);
    }

    if (filters.hasWifi !== null) {
      filtered = filtered.filter(hostel => hostel.wifiAvailable === filters.hasWifi);
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(hostel => hostel.petFriendly === filters.isPetFriendly);
    }

    setFilteredHostels(filtered);
  }, [filters, hostels]);

  const handleFilterChange = (filterName: keyof HostelFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
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
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="pt-20">
          <Loading message="Loading hostels..." variant="spinner" size="lg" />
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
            title="Failed to Load Hostels"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Adventure Hostels
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover budget-friendly stays perfect for backpackers, solo travelers, and adventure seekers. Make new friends and create unforgettable memories.
            </p>
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
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Found <span className="font-bold text-green-600">{filteredHostels.length}</span> hostels
              {filters.search && ` for "${filters.search}"`}
            </p>
          </div>

          {/* Hostels Grid */}
          <div className={`
            grid gap-6
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}>
            {filteredHostels.map((hostel) => (
              <DetailedHostelCard key={hostel.hostelId} hostel={hostel} />
            ))}
          </div>

          {/* Empty State */}
          {filteredHostels.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🏕️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Hostels Found
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

export default HostelPage;