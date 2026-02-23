// components/RestaurantsSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  RestaurantSectionApiResponse,
  RestaurantSectionRestaurant,
} from "@/types/accommodations-types/restaurant-types";
import { GET_RESTAURANT_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "../common-components/loading/Loading";
import { ErrorState } from "../common-components/error-state/ErrorState";
import SectionHeader from "../common-components/section-header/SectionHeader";
import RestaurantSectionCard from "./restaurant-components/RestaurantSectionCard";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";
import ResortsSectionLoading from "./loadings/ResortsSectionLoading";
import RestaurantsSectionLoading from "./loadings/RestaurantsSectionLoading";

const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSectionRestaurant[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Responsive card count handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        setVisibleCount(3);
      } else if (width < 1024) {
        // Tablet
        setVisibleCount(4);
      } else if (width < 1280) {
        // Laptop
        setVisibleCount(6); // 3x2 grid
      } else if (width < 1536) {
        // PC
        setVisibleCount(8); // 4x2 grid
      } else {
        // Extra large screens
        setVisibleCount(10); // 5x2 grid
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedRestaurants = restaurants.slice(0, visibleCount);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <RestaurantsSectionLoading visibleCount={visibleCount} />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#3A9B9B] via-[#5FB3B3] to-[#84CACA]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Coastal Restaurants"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#E8F6F6] via-[#F0FAFA] to-[#D9F0F0] relative overflow-hidden">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84CACA]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-pattern"
              x="0"
              y="0"
              width="60"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q15 10 30 20 T60 20"
                stroke="#3A9B9B"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q15 20 30 30 T60 30"
                stroke="#5FB3B3"
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
            fill="url(#wave-pattern)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Header with Coastal Styling */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="COASTAL CULINARY EXCELLENCE"
            title="Fine Dining Restaurants"
            description="Discover exceptional coastal dining experiences with diverse cuisines and premium ocean-view settings"
            fromColor="#3A9B9B"
            toColor="#84CACA"
          />

          {/* Coastal Elements */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#3A9B9B] to-transparent"></span>
            <span className="text-[#3A9B9B] text-xs tracking-[0.3em]">
              FRESH • COASTAL • EXQUISITE
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#3A9B9B] to-transparent"></span>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div
          className={`
          grid gap-8
          grid-cols-1           /* Mobile: 1 column */
          sm:grid-cols-2        /* Small: 2 columns */
          lg:grid-cols-3        /* Laptop: 3 columns */
          xl:grid-cols-3        /* PC: 3 columns */
          2xl:grid-cols-4       /* Extra large: 4 columns */
        `}
        >
          {displayedRestaurants.map((restaurant) => (
            <RestaurantSectionCard
              key={restaurant.restaurantId}
              restaurant={restaurant}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <AnimatedButton
            onClick={() => router.push("/accommodations/restaurants")}
            className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#84CACA]/30"
          >
            Explore All Restaurants
          </AnimatedButton>
        </div>

        {/* Empty State */}
        {restaurants.length === 0 && (
          <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-3xl border border-[#3A9B9B]/20">
            <div className="text-7xl mb-6 opacity-50">🍴</div>
            <h3 className="text-2xl font-bold text-[#3A9B9B] mb-4">
              No Restaurants Available
            </h3>
            <p className="text-[#5FB3B3] text-lg max-w-md mx-auto">
              Our coastal restaurant collection is being updated with new
              culinary experiences. Check back soon for amazing ocean-view
              dining options.
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        {restaurants.length > 0 && (
          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#3A9B9B]/10">
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
                Michelin Star Chefs
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantsSection;
