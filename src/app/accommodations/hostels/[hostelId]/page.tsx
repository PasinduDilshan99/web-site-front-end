// pages/details-pages/HostelDetailsPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/common-components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import HostelDetailsContent from "@/components/accommodation-components/hostel-components/hostel-details-components/HostelDetailsContent";
import HostelDetailsPageLoading from "@/components/accommodation-components/loadings/HostelDetailsPageLoading";

interface HostelDetailsPageProps {
  params: {
    hostelId: string;
  };
}

async function getHostelDetails(
  id: string,
): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(
    `http://localhost:3000/api/service-providers/hotels?id=${id}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hostel details");
  }

  return res.json();
}

export default function HostelDetailsPage({ params }: HostelDetailsPageProps) {
  const [hostelData, setHostelData] =
    useState<ServiceProviderAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { hostelId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getHostelDetails(hostelId);
        setHostelData(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Error loading hostel details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hostelId]);

  // Loading State
  if (loading) {
    return <HostelDetailsPageLoading />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] to-[#FAFFFD] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B5E5D4]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DDF9F2]/30 rounded-full -mr-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            {/* Fresh Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] rounded-full flex items-center justify-center border border-[#B5E5D4]">
                <span className="text-4xl text-[#2D4F43]">🏕️</span>
              </div>
              <div className="absolute -top-4 -right-4 text-2xl text-[#B5E5D4]">
                ✨
              </div>
              <div className="absolute -bottom-4 -left-4 text-2xl text-[#C9EFE3]">
                ✨
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#2D4F43] mb-4">
              Error Loading Hostel Details
            </h1>
            <p className="text-[#5A8F7A] text-lg mb-8">
              We couldn&apos;t load this fresh hostel space. Please try again
              later.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-[#B5E5D4]"
              >
                Refresh Page
              </button>
              <a
                href="/hostels"
                className="border-2 border-[#B5E5D4] text-[#2D4F43] hover:bg-[#F5FDFA] px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Other Hostels
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-[#B5E5D4]/30">
              <p className="text-sm text-[#5A8F7A]">
                Need help finding the perfect hostel?
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="mailto:hello@hostelworld.com"
                  className="text-[#2D4F43] hover:text-[#3A9B9B] font-medium"
                >
                  ✉️ hello@hostelworld.com
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#B5E5D4] rounded-full"></span>
              <span className="text-xs text-[#5A8F7A]">
                Fresh Hostel Collection
              </span>
              <span className="w-2 h-2 bg-[#DDF9F2] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FDFA] via-[#FAFFFD] to-[#F0FAF5] relative overflow-hidden">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#B5E5D4]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DDF9F2]/30 rounded-full -mr-64 -mb-64 blur-3xl"></div>

      {/* Bubbles Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hostel-detail-bubbles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="3" fill="#B5E5D4" />
              <circle cx="30" cy="20" r="4" fill="#C9EFE3" />
              <circle cx="20" cy="30" r="2" fill="#DDF9F2" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#hostel-detail-bubbles)"
          />
        </svg>
      </div>

      <HostelDetailsContent hostelData={hostelData!} />
    </div>
  );
}
