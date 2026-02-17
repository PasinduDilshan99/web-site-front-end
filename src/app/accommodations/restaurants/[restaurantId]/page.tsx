"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import RestaurantDetailsContent from "@/components/accommodation-components/restaurant-components/restaurant-details-components/RestaurantDetailsContent";
import RestaurantDetailsPageLoading from "@/components/accommodation-components/loadings/RestaurantDetailsPageLoading";

interface RestaurantDetailsPageProps {
  params: {
    restaurantId: string;
  };
}

async function getRestaurantDetails(
  id: string,
): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(
    `http://localhost:3000/api/service-providers/hotels?id=${id}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant details");
  }

  return res.json();
}

export default function RestaurantDetailsPage({
  params,
}: RestaurantDetailsPageProps) {
  const [restaurantData, setRestaurantData] =
    useState<ServiceProviderAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { restaurantId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRestaurantDetails(restaurantId);
        setRestaurantData(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Error loading restaurant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  // Loading State
  if (loading) {
    return <RestaurantDetailsPageLoading />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F6F6] to-[#D9F0F0] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#84CACA]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

        {/* Wave Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="restaurant-error-wave"
                x="0"
                y="0"
                width="60"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 15 Q15 7 30 15 T60 15"
                  stroke="#3A9B9B"
                  fill="none"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#restaurant-error-wave)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            {/* Coastal Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              {/* Decorative Waves */}
              <div className="absolute -top-4 -right-4 text-[#3A9B9B]/30 text-2xl">
                🌊
              </div>
              <div className="absolute -bottom-4 -left-4 text-[#84CACA]/30 text-2xl">
                🌊
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#3A9B9B] mb-4">
              Unable to Load Restaurant Details
            </h1>
            <p className="text-[#5FB3B3] text-lg mb-8">
              We apologize for the inconvenience. Please try refreshing the page
              or contact our dining concierge for assistance.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <a
                href="/restaurants"
                className="border-2 border-[#3A9B9B] text-[#3A9B9B] hover:bg-[#3A9B9B] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Other Restaurants
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-[#3A9B9B]/10">
              <p className="text-sm text-gray-500">
                Need immediate assistance? Contact our Dining Concierge
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="tel:+1234567890"
                  className="text-[#3A9B9B] hover:text-[#84CACA] font-medium"
                >
                  📞 +1 (234) 567-890
                </a>
                <a
                  href="mailto:dining@coastal.com"
                  className="text-[#3A9B9B] hover:text-[#84CACA] font-medium"
                >
                  ✉️ dining@coastal.com
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#3A9B9B] rounded-full"></span>
              <span className="text-xs text-gray-400">
                Coastal Dining Collection
              </span>
              <span className="w-2 h-2 bg-[#84CACA] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F6F6] via-[#F0FAFA] to-[#D9F0F0] relative overflow-hidden">
      {/* Coastal Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3A9B9B]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84CACA]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="restaurant-detail-wave"
              x="0"
              y="0"
              width="60"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 15 Q15 7 30 15 T60 15"
                stroke="#3A9B9B"
                fill="none"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#restaurant-detail-wave)"
          />
        </svg>
      </div>

      <RestaurantDetailsContent restaurantData={restaurantData!} />
    </div>
  );
}
