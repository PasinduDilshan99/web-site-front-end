"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/common-components/footer/Footer";
import VillaDetailsContent from "@/components/accommodation-components/villa-components/villa-details-components/VillaDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import VillaDetailsPageLoading from "@/components/accommodation-components/loadings/VillaDetailsPageLoading";

interface VillaDetailsPageProps {
  params: {
    villaId: string;
  };
}

async function getVillaDetails(
  id: string,
): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(
    `http://localhost:3000/api/service-providers/hotels?id=${id}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch villa details");
  }

  return res.json();
}

export default function VillaDetailsPage({ params }: VillaDetailsPageProps) {
  const [villaData, setVillaData] = useState<ServiceProviderAPIResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { villaId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getVillaDetails(villaId);
        setVillaData(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Error loading villa details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [villaId]);

  // Loading State
  if (loading) {
    return <VillaDetailsPageLoading />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F3EF] to-[#D9ECE5] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#428577]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

        {/* Leaf Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="villa-error-leaf"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30 10 Q40 10 45 20 Q50 30 40 40 Q30 50 20 40 Q10 30 20 20 Q25 10 30 10"
                  fill="none"
                  stroke="#1B4D3E"
                  strokeWidth="0.5"
                />
                <circle cx="30" cy="25" r="2" fill="#1B4D3E" opacity="0.2" />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#villa-error-leaf)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            {/* Luxury Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full flex items-center justify-center">
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
              {/* Decorative Leaves */}
              <div className="absolute -top-4 -right-4 w-12 h-12 text-[#1B4D3E]/30">
                🌿
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 text-[#428577]/30">
                🍃
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1B4D3E] mb-4">
              Unable to Load Villa Details
            </h1>
            <p className="text-[#2E6B5C] text-lg mb-8">
              We apologize for the inconvenience. Please try refreshing the page
              or contact our concierge for assistance.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <a
                href="/villas"
                className="border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Other Villas
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-[#1B4D3E]/10">
              <p className="text-sm text-gray-500">
                Need immediate assistance? Contact our 24/7 Concierge
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="tel:+1234567890"
                  className="text-[#1B4D3E] hover:text-[#428577] font-medium"
                >
                  📞 +1 (234) 567-890
                </a>
                <a
                  href="mailto:concierge@luxuryvillas.com"
                  className="text-[#1B4D3E] hover:text-[#428577] font-medium"
                >
                  ✉️ concierge@luxuryvillas.com
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#1B4D3E] rounded-full"></span>
              <span className="text-xs text-gray-400">
                Private Luxury Collection
              </span>
              <span className="w-2 h-2 bg-[#428577] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F3EF] via-[#F0F9F5] to-[#D9ECE5] relative overflow-hidden">
      {/* Nature-Inspired Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#1B4D3E]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#428577]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#1B4D3E]/3 to-[#428577]/3 rounded-full blur-3xl"></div>

      {/* Leaf Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="villa-detail-leaf"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 10 Q40 10 45 20 Q50 30 40 40 Q30 50 20 40 Q10 30 20 20 Q25 10 30 10"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
              <circle cx="30" cy="25" r="2" fill="#1B4D3E" opacity="0.2" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#villa-detail-leaf)"
          />
        </svg>
      </div>

      {/* Navigation Bar */}
      <div className="relative z-20"></div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        {/* Decorative Header Line */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full opacity-50"></div>

        <VillaDetailsContent villaData={villaData!} />
      </main>

      {/* Footer */}
      <div className="relative z-20"></div>
    </div>
  );
}
