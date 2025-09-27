"use client";
import { GET_ALL_PARTNERS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

const getDefaultImage = () => "/images/default-partner-logo.png";

const Partners = () => {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (originalUrl: string) => {
    setImageErrors((prev) => new Set([...prev, originalUrl]));
  };

  const getValidImageUrl = (originalUrl: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

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

  if (loading) {
    return (
      <p className="text-center py-12 text-purple-600">Loading partners...</p>
    );
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">{error}</p>;
  }

  if (partners.length === 0) {
    return (
      <p className="text-center py-12 text-gray-500">No partners available</p>
    );
  }

  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white border-t border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Our Partners
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-purple-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Logo Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="marquee flex space-x-6 sm:space-x-10 lg:space-x-16">
            {scrollingPartners.map((partner, index) => (
              <div key={index} className="flex-shrink-0 group relative">
                <a
                  href={partner.partnerWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 sm:p-3 lg:p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#A855F7]/10 hover:to-[#F59E0B]/10 transition-all"
                >
                  <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 relative">
                    <Image
                      src={partner.partnerLogoUrl}
                      alt={partner.partnerCompanyName}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Count */}
        <div className="text-center mt-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <span className="bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent font-semibold">
              {partners.length}
            </span>{" "}
            trusted partner{partners.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
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
        @media (max-width: 640px) {
          .marquee {
            animation-duration: 20s;
          }
        }
        @media (min-width: 1024px) {
          .marquee {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
