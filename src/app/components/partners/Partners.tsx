"use client";
import { GET_ALL_PARTNERS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../common/Loading";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

interface PartnerType {
  partnerId: number;
  partnerName: string;
  partnerCompanyName: string;
  partnerCompanyDescription: string;
  partnerLogoUrl: string;
  partnerWebsiteUrl: string;
  partnerAgreement: string;
  partnerStatus: string;
  partnerStatusStatus: string;
  partnerFromDate: string;
  partnerToDate: string;
  partnerCreatedAt: string;
  partnerCreatedBy: number;
  partnerUpdatedAt: string | null;
  partnerUpdatedBy: number | null;
  partnerTerminatedAt: string | null;
  partnerTerminatedBy: number | null;
}

const Partners = () => {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_PARTNERS);
        const data = await response.json();

        if (response.ok) {
          setPartners(data.data || []);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch partners");
        }
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Something went wrong while fetching partners");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading message="Loading partners..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Partners"
        message={error}
        icon="alert"
        variant="error"
        size="md"
        actionLabel="Try Again"
        onAction={handleRetry}
      />
    );
  }

  if (partners.length === 0) {
    return (
      <EmptyState
        title="No Partners Yet"
        message="We haven't partnered with any organizations yet. Check back soon!"
        icon="box"
        size="md"
      />
    );
  }

  // Triple the partners array for seamless loop
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white border-t border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-4">
            Our Partners
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed px-4">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-8 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 2xl:w-40 h-0.5 sm:h-1 md:h-1 lg:h-1.5 bg-gradient-to-r from-purple-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Logo Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for smooth edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="marquee-container">
            <div className="marquee flex items-center">
              {scrollingPartners.map((partner, index) => (
                <div
                  key={`${partner.partnerId}-${index}`}
                  className="flex-shrink-0 group relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 2xl:mx-16"
                >
                  <a
                    href={partner.partnerWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-lg hover:bg-gradient-to-r hover:from-[#A855F7]/10 hover:to-[#F59E0B]/10 transition-all duration-300"
                  >
                    <div className="w-24 h-14 sm:w-32 sm:h-18 md:w-40 md:h-22 lg:w-48 lg:h-26 xl:w-56 xl:h-30 2xl:w-64 2xl:h-32 relative flex items-center justify-center">
                      <Image
                        src={partner.partnerLogoUrl}
                        alt={partner.partnerCompanyName}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, (max-width: 1536px) 224px, 256px"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Count */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {partners.length}
            </span>{" "}
            trusted partner{partners.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee {
          display: flex;
          width: fit-content;
          animation: scroll-left 30s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        /* Mobile phones (portrait) */
        @media (max-width: 480px) {
          .marquee {
            animation-duration: 20s;
          }
        }

        /* Mobile phones (landscape) and small tablets */
        @media (min-width: 481px) and (max-width: 767px) {
          .marquee {
            animation-duration: 25s;
          }
        }

        /* Tablets */
        @media (min-width: 768px) and (max-width: 1023px) {
          .marquee {
            animation-duration: 35s;
          }
        }

        /* Laptops and small desktops */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .marquee {
            animation-duration: 40s;
          }
        }

        /* Desktops */
        @media (min-width: 1280px) and (max-width: 1535px) {
          .marquee {
            animation-duration: 45s;
          }
        }

        /* Large screens and 4K displays */
        @media (min-width: 1536px) {
          .marquee {
            animation-duration: 50s;
          }
        }

        /* Ensure smooth rendering */
        .marquee {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Partners;
