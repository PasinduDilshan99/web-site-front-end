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

const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSectionRestaurant[]>(
    []
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
    return (
      <Loading message="Loading restaurants..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Restaurants"
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
    <section className="bg-gradient-to-br from-emerald-50 via-amber-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Culinary Excellence"
            title="Fine Dining Restaurants"
            description="Discover exceptional dining experiences with diverse cuisines and premium amenities"
            fromColor="#10B981"
            toColor="#F59E0B"
          />
        </div>

        {/* Restaurants Grid */}
        <div
          className={`
          grid gap-6
          grid-cols-1           /* Mobile: 1 column */
          sm:grid-cols-2        /* Small: 2 columns */
          lg:grid-cols-3        /* Laptop: 3 columns */
          xl:grid-cols-3        /* PC: 4 columns */
          2xl:grid-cols-4       /* Extra large: 5 columns */
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
        <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
          <AnimatedButton
            onClick={() => router.push("/accommodations/restaurants")}
          >
            View All Restaurants
          </AnimatedButton>
        </div>

        {/* Empty State */}
        {restaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🍴</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Restaurants Available
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Our restaurant collection is being updated with new culinary
              experiences. Check back soon for amazing dining options.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantsSection;
