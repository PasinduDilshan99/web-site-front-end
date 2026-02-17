"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/common-components/footer/Footer";
import ResortDetailsContent from "@/components/accommodation-components/resort-components/resort-details-components/ResortDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import ResortDetailsPageLoading from "@/components/accommodation-components/loadings/ResortDetailsPageLoading";

interface ResortDetailsPageProps {
  params: {
    resortId: string;
  };
}

async function getResortDetails(
  id: string,
): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(
    `http://localhost:3000/api/service-providers/hotels?id=${id}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch resort details");
  }

  return res.json();
}

export default function ResortDetailsPage({ params }: ResortDetailsPageProps) {
  const [resortData, setResortData] =
    useState<ServiceProviderAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { resortId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getResortDetails(resortId);
        setResortData(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Error loading resort details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resortId]);

  // Loading State
  if (loading) {
    return <ResortDetailsPageLoading />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] to-[#D9E9F0] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0A2F44]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

        {/* Wave Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="resort-detail-error-wave"
                x="0"
                y="0"
                width="80"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 15 Q20 8 40 15 T80 15 T120 15"
                  stroke="#0A2F44"
                  fill="none"
                  strokeWidth="1"
                />
                <path
                  d="M0 25 Q20 18 40 25 T80 25 T120 25"
                  stroke="#144A5E"
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
              fill="url(#resort-detail-error-wave)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            {/* Luxury Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full flex items-center justify-center">
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
              <div className="absolute -top-4 -right-4 text-4xl text-[#0A2F44]/30">
                🌊
              </div>
              <div className="absolute -bottom-4 -left-4 text-4xl text-[#1F5F72]/30">
                🌊
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0A2F44] mb-4">
              Unable to Load Resort Details
            </h1>
            <p className="text-[#144A5E] text-lg mb-8">
              We apologize for the inconvenience. Please try refreshing the page
              or contact our concierge for assistance.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] hover:from-[#052230] hover:to-[#144A5E] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <a
                href="/resorts"
                className="border-2 border-[#0A2F44] text-[#0A2F44] hover:bg-[#0A2F44] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Other Resorts
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-[#0A2F44]/10">
              <p className="text-sm text-gray-500">
                Need immediate assistance? Contact our 24/7 Concierge
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="tel:+1234567890"
                  className="text-[#0A2F44] hover:text-[#1F5F72] font-medium"
                >
                  📞 +1 (234) 567-890
                </a>
                <a
                  href="mailto:concierge@luxuryresorts.com"
                  className="text-[#0A2F44] hover:text-[#1F5F72] font-medium"
                >
                  ✉️ concierge@luxuryresorts.com
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#0A2F44] rounded-full"></span>
              <span className="text-xs text-gray-400">
                Deep Sea Blues Ultra-Luxury Collection
              </span>
              <span className="w-2 h-2 bg-[#1F5F72] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0F5] via-[#F0F7FA] to-[#D9E9F0] relative overflow-hidden">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="resort-detail-wave"
              x="0"
              y="0"
              width="80"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 15 Q20 8 40 15 T80 15 T120 15"
                stroke="#0A2F44"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 25 Q20 18 40 25 T80 25 T120 25"
                stroke="#144A5E"
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
            fill="url(#resort-detail-wave)"
          />
        </svg>
      </div>
      <ResortDetailsContent resortData={resortData!} />
    </div>
  );
}
