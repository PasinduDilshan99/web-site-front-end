// app/accommodations/hotels/[hotelId]/page.tsx
"use client";

import Footer from "@/components/common-components/footer/Footer";
import HotelDetailsContent from "@/components/accommodation-components/hotels-components/hotel-details-components/HotelDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import HotelDetailsPageLoading from "@/components/accommodation-components/loadings/HotelDetailsPageLoading";

export default function HotelDetailsPage() {
  const params = useParams();
  const hotelId = params?.hotelId as string;

  const [hotelData, setHotelData] = useState<ServiceProviderAPIResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/service-providers/hotels?id=${hotelId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }

        const data = await response.json();
        setHotelData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading hotel details:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  // Show loading state
  if (loading) {
    return <HotelDetailsPageLoading />;
  }

  // Show error state
  if (error || !hotelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-[#D9E9F5] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A6F97]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#54A5CC]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            {/* Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] rounded-full flex items-center justify-center shadow-lg">
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
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1D4F6E] mb-4">
              Error Loading Hotel Details
            </h1>
            <p className="text-[#3F8AB2] text-lg mb-8">
              {error ||
                "We apologize for the inconvenience. Please try again later."}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <Link
                href="/accommodations/hotels"
                className="border-2 border-[#2A6F97] text-[#1D4F6E] hover:bg-[#2A6F97] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Other Hotels
              </Link>
            </div>

            {/* Retry Button */}
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                // This will trigger the useEffect again
                setHotelData(null);
              }}
              className="mt-4 text-[#2A6F97] hover:text-[#1D4F6E] font-medium underline"
            >
              Try Again
            </button>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#2A6F97] rounded-full"></span>
              <span className="text-xs text-[#3F8AB2]">
                True Sea Blues Luxury Collection
              </span>
              <span className="w-2 h-2 bg-[#54A5CC] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A6F97]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#54A5CC]/5 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hotel-wave-pattern"
              x="0"
              y="0"
              width="60"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q15 10 30 20 T60 20"
                stroke="#2A6F97"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q15 20 30 30 T60 30"
                stroke="#3F8AB2"
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
            fill="url(#hotel-wave-pattern)"
          />
        </svg>
      </div>

      <HotelDetailsContent hotelData={hotelData} />
    </div>
  );
}
