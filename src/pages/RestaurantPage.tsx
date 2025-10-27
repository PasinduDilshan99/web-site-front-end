// app/restaurants/page.tsx
"use client";
import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import React, { useEffect, useState } from "react";
import {
  RestaurantSectionApiResponse,
  RestaurantSectionRestaurant,
} from "@/types/accommodations-types/restaurant-types";
import { GET_RESTAURANT_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import DetailedRestaurantCard from "@/components/accommodation-components/restaurant-components/DetailedRestaurantCard";
import RestaurantFilterSection from "@/components/accommodation-components/restaurant-components/RestaurantFilterSection";

// Define filter types for restaurants
interface RestaurantFilters {
  search: string;
  priceRange: [number, number];
  starRating: number;
  location: string;
  cuisineType: string;
  amenities: string[];
  hasWifi: boolean | null;
  hasParking: boolean | null;
  isPetFriendly: boolean | null;
  mealType: string;
}

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSectionRestaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantSectionRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters
  const [filters, setFilters] = useState<RestaurantFilters>({
    search: "",
    priceRange: [0, 200],
    starRating: 0,
    location: "",
    cuisineType: "",
    amenities: [],
    hasWifi: null,
    hasParking: null,
    isPetFriendly: null,
    mealType: "",
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_RESTAURANT_DETAILS_SECTION_FE);
        const data: RestaurantSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch restaurants");
        }

        setRestaurants(data.data);
        setFilteredRestaurants(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Extract filter options from restaurants data
  const locations = Array.from(new Set(restaurants.map(restaurant => restaurant.address.split(',')[1]?.trim() || restaurant.address.split(',')[0]?.trim()).filter(Boolean)));
  
  // Extract cuisine types from dining options
  const cuisineTypes = Array.from(new Set(
    restaurants.flatMap(restaurant => 
      restaurant.diningOptions?.map(option => option.cuisineType) || []
    ).filter(Boolean)
  ));

  // Extract meal types
  const mealTypes = Array.from(new Set(
    restaurants.flatMap(restaurant => 
      restaurant.diningOptions?.map(option => option.mealType) || []
    ).filter(Boolean)
  ));

  // Filter restaurants based on current filters
  useEffect(() => {
    let filtered = restaurants;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(restaurant =>
        restaurant.restaurantName.toLowerCase().includes(filters.search.toLowerCase()) ||
        restaurant.restaurantDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(restaurant => {
      const minDishPrice = Math.min(...(restaurant.diningOptions?.map(dish => dish.localPrice) || [0]));
      return minDishPrice >= filters.priceRange[0] && minDishPrice <= filters.priceRange[1];
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.starRating >= filters.starRating);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(restaurant => 
        restaurant.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Cuisine type filter
    if (filters.cuisineType) {
      filtered = filtered.filter(restaurant => 
        restaurant.diningOptions?.some(dish => dish.cuisineType === filters.cuisineType)
      );
    }

    // Meal type filter
    if (filters.mealType) {
      filtered = filtered.filter(restaurant => 
        restaurant.diningOptions?.some(dish => dish.mealType === filters.mealType)
      );
    }

    // Amenities filters
    if (filters.hasWifi !== null) {
      filtered = filtered.filter(restaurant => restaurant.wifiAvailable === filters.hasWifi);
    }

    if (filters.hasParking !== null) {
      filtered = filtered.filter(restaurant => restaurant.parkingFacility === filters.hasParking);
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(restaurant => restaurant.petFriendly === filters.isPetFriendly);
    }

    setFilteredRestaurants(filtered);
  }, [filters, restaurants]);

  const handleFilterChange = (filterName: keyof RestaurantFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 200],
      starRating: 0,
      location: "",
      cuisineType: "",
      amenities: [],
      hasWifi: null,
      hasParking: null,
      isPetFriendly: null,
      mealType: "",
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
          <Loading message="Loading restaurants..." variant="spinner" size="lg" />
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
            title="Failed to Load Restaurants"
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Culinary Delights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing restaurants with diverse cuisines, from fine dining to casual eateries. Your next culinary adventure awaits.
            </p>
          </div>

          {/* Filter Section */}
          <RestaurantFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            cuisineTypes={cuisineTypes}
            mealTypes={mealTypes}
          />

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Found <span className="font-bold text-red-600">{filteredRestaurants.length}</span> restaurants
              {filters.search && ` for "${filters.search}"`}
            </p>
          </div>

          {/* Restaurants Grid */}
          <div className={`
            grid gap-6
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}>
            {filteredRestaurants.map((restaurant) => (
              <DetailedRestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
            ))}
          </div>

          {/* Empty State */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Restaurants Found
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your filters to see more culinary options.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

export default RestaurantPage;