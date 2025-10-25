// app/resorts/page.tsx
"use client";
import Footer from "@/app/components/footer/Footer";
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
  const [filteredResorts, setFilteredResorts] = useState<ResortSectionResort[]>([]);
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
  const locations = Array.from(new Set(resorts.map(resort => resort.address.split(',')[1]?.trim() || resort.address.split(',')[0]?.trim()).filter(Boolean)));
  const resortTypes = Array.from(new Set(resorts.map(resort => resort.resortType).filter(Boolean)));

  // Filter resorts based on current filters
  useEffect(() => {
    let filtered = resorts;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(resort =>
        resort.resortName.toLowerCase().includes(filters.search.toLowerCase()) ||
        resort.resortDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        resort.address.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(resort => {
      const minRoomPrice = Math.min(...(resort.accommodations?.map(room => room.localPricePerNight) || [0]));
      return minRoomPrice >= filters.priceRange[0] && minRoomPrice <= filters.priceRange[1];
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(resort => resort.starRating >= filters.starRating);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(resort => 
        resort.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Resort type filter
    if (filters.resortType) {
      filtered = filtered.filter(resort => resort.resortType === filters.resortType);
    }

    // Special feature filters
    if (filters.hasSpa !== null) {
      filtered = filtered.filter(resort => 
        resort.amenities?.some(amenity => 
          amenity.name.toLowerCase().includes('spa') || amenity.description.toLowerCase().includes('spa')
        ) || resort.resortFacilities?.some(facility => 
          facility.facilityName.toLowerCase().includes('spa') || facility.description.toLowerCase().includes('spa')
        )
      );
    }

    if (filters.hasPool !== null) {
      filtered = filtered.filter(resort => 
        resort.amenities?.some(amenity => 
          amenity.name.toLowerCase().includes('pool') || amenity.description.toLowerCase().includes('pool')
        ) || resort.resortFacilities?.some(facility => 
          facility.facilityName.toLowerCase().includes('pool') || facility.description.toLowerCase().includes('pool')
        )
      );
    }

    if (filters.hasBeachAccess !== null) {
      filtered = filtered.filter(resort => 
        resort.resortDescription.toLowerCase().includes('beach') ||
        resort.address.toLowerCase().includes('beach') ||
        resort.amenities?.some(amenity => 
          amenity.name.toLowerCase().includes('beach') || amenity.description.toLowerCase().includes('beach')
        )
      );
    }

    setFilteredResorts(filtered);
  }, [filters, resorts]);

  const handleFilterChange = (filterName: keyof ResortFilters, value: any) => {
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
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="pt-20">
          <Loading message="Loading luxury resorts..." variant="spinner" size="lg" />
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
            title="Failed to Load Resorts"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-amber-50">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Luxury Resorts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience unparalleled luxury and all-inclusive amenities at the world's finest resorts. Your perfect getaway awaits.
            </p>
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
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Found <span className="font-bold text-cyan-600">{filteredResorts.length}</span> luxury resorts
              {filters.search && ` for "${filters.search}"`}
            </p>
          </div>

          {/* Resorts Grid */}
          <div className={`
            grid gap-8
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}>
            {filteredResorts.map((resort) => (
              <DetailedResortCard key={resort.resortId} resort={resort} />
            ))}
          </div>

          {/* Empty State */}
          {filteredResorts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🏝️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Resorts Found
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your filters to see more luxury resorts.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-cyan-600 to-purple-500 hover:from-cyan-700 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

export default ResortPage;