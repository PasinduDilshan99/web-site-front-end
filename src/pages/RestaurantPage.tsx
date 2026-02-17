// app/restaurants/page.tsx
"use client";
import Footer from "@/components/common-components/footer/Footer";
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
import RestaurantPageLoading from "@/components/accommodation-components/loadings/RestaurantPageLoading";

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
  const [restaurants, setRestaurants] = useState<RestaurantSectionRestaurant[]>(
    [],
  );
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    RestaurantSectionRestaurant[]
  >([]);
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
  const locations = Array.from(
    new Set(
      restaurants
        .map(
          (restaurant) =>
            restaurant.address.split(",")[1]?.trim() ||
            restaurant.address.split(",")[0]?.trim(),
        )
        .filter(Boolean),
    ),
  );

  // Extract cuisine types from dining options
  const cuisineTypes = Array.from(
    new Set(
      restaurants
        .flatMap(
          (restaurant) =>
            restaurant.diningOptions?.map((option) => option.cuisineType) || [],
        )
        .filter(Boolean),
    ),
  );

  // Extract meal types
  const mealTypes = Array.from(
    new Set(
      restaurants
        .flatMap(
          (restaurant) =>
            restaurant.diningOptions?.map((option) => option.mealType) || [],
        )
        .filter(Boolean),
    ),
  );

  // Filter restaurants based on current filters
  useEffect(() => {
    let filtered = restaurants;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.restaurantName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          restaurant.restaurantDescription
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          restaurant.address
            .toLowerCase()
            .includes(filters.search.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((restaurant) => {
      const minDishPrice = Math.min(
        ...(restaurant.diningOptions?.map((dish) => dish.localPrice) || [0]),
      );
      return (
        minDishPrice >= filters.priceRange[0] &&
        minDishPrice <= filters.priceRange[1]
      );
    });

    // Star rating filter
    if (filters.starRating > 0) {
      filtered = filtered.filter(
        (restaurant) => restaurant.starRating >= filters.starRating,
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((restaurant) =>
        restaurant.address
          .toLowerCase()
          .includes(filters.location.toLowerCase()),
      );
    }

    // Cuisine type filter
    if (filters.cuisineType) {
      filtered = filtered.filter((restaurant) =>
        restaurant.diningOptions?.some(
          (dish) => dish.cuisineType === filters.cuisineType,
        ),
      );
    }

    // Meal type filter
    if (filters.mealType) {
      filtered = filtered.filter((restaurant) =>
        restaurant.diningOptions?.some(
          (dish) => dish.mealType === filters.mealType,
        ),
      );
    }

    // Amenities filters
    if (filters.hasWifi !== null) {
      filtered = filtered.filter(
        (restaurant) => restaurant.wifiAvailable === filters.hasWifi,
      );
    }

    if (filters.hasParking !== null) {
      filtered = filtered.filter(
        (restaurant) => restaurant.parkingFacility === filters.hasParking,
      );
    }

    if (filters.isPetFriendly !== null) {
      filtered = filtered.filter(
        (restaurant) => restaurant.petFriendly === filters.isPetFriendly,
      );
    }

    setFilteredRestaurants(filtered);
  }, [filters, restaurants]);

  const handleFilterChange = (
    filterName: keyof RestaurantFilters,
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
    return <RestaurantPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F6F6] to-[#D9F0F0]">
        <div className="pt-20">
          <ErrorState
            title="Unable to Load Coastal Restaurants"
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
    <div className="min-h-screen bg-gradient-to-br from-[#E8F6F6] via-white to-[#D9F0F0] relative overflow-hidden">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#84CACA]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#5FB3B3]/5 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="restaurant-wave-pattern"
              x="0"
              y="0"
              width="80"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q20 10 40 20 T80 20"
                stroke="#3A9B9B"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q20 20 40 30 T80 30"
                stroke="#5FB3B3"
                fill="none"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#restaurant-wave-pattern)"
          />
        </svg>
      </div>

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header - Coastal Styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative Wave Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 pt-8">
              <span className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] bg-clip-text text-transparent">
                Coastal Culinary
              </span>{" "}
              Delights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional coastal dining experiences with ocean views,
              fresh seafood, and diverse cuisines. From casual beachside
              eateries to Michelin-starred restaurants.
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
                <span className="text-sm text-[#3A9B9B]/70">
                  Ocean View Dining
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#5FB3B3] rounded-full"></div>
                <span className="text-sm text-[#3A9B9B]/70">
                  Fresh Coastal Cuisine
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#84CACA] rounded-full"></div>
                <span className="text-sm text-[#3A9B9B]/70">
                  Award-Winning Chefs
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <RestaurantFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            locations={locations}
            cuisineTypes={cuisineTypes}
            amenities={mealTypes}
          />

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#3A9B9B]">
                {filteredRestaurants.length}
              </span>{" "}
              Coastal Restaurants Found
              {filters.search && (
                <span className="text-gray-500 ml-2">
                  matching {filters.search}
                </span>
              )}
            </p>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border border-[#3A9B9B]/20 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#3A9B9B]/30 text-gray-700">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Distance to Beach</option>
              </select>
            </div>
          </div>

          {/* Restaurants Grid */}
          <div
            className={`
            grid gap-8
            grid-cols-1           /* Mobile & Tablet: 1 column */
            lg:grid-cols-2        /* Laptop & PC: 2 columns */
            2xl:grid-cols-3       /* Extra large: 3 columns */
          `}
          >
            {filteredRestaurants.map((restaurant) => (
              <DetailedRestaurantCard
                key={restaurant.restaurantId}
                restaurant={restaurant}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-[#3A9B9B]/10 mt-8">
              <div className="text-7xl mb-6 opacity-50">🍽️</div>
              <h3 className="text-2xl font-bold text-[#3A9B9B] mb-4">
                No Coastal Restaurants Found
              </h3>
              <p className="text-[#5FB3B3] text-lg mb-8 max-w-md mx-auto">
                We couldn&apos;t find any restaurants matching your criteria.
                Try adjusting your filters to discover more dining options.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredRestaurants.length > 0 &&
            filteredRestaurants.length < restaurants.length && (
              <div className="text-center mt-12">
                <button className="border-2 border-[#3A9B9B] text-[#3A9B9B] hover:bg-[#3A9B9B] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Load More Restaurants
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default RestaurantPage;
