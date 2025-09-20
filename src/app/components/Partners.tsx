'use client';
import { GET_ALL_PARTNERS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define TypeScript interface for partner items
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

// Default fallback image
const getDefaultImage = () => {
  return "/images/default-partner-logo.png";
};

const Partners = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors(prev => new Set([...prev, originalUrl]));
  };

  // Get valid image URL
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
          const items: PartnerType[] = data.data || [];
    
          setPartners(items);
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

  // Loading state
  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
          
          {/* Loading Partner Logos */}
          <div className="flex justify-center items-center space-x-8 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-24 h-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (partners.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <p className="text-gray-500">No partners available to display</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-200 overflow-hidden">
      <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
          <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2 lg:mb-3 uppercase tracking-wider">
            Our Partners
          </h2>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-2 sm:mt-3 lg:mt-4 xl:mt-5 w-12 sm:w-14 lg:w-16 xl:w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {/* Partners Logo Strip */}
        <div className="relative">
          {/* Gradient Overlays - Responsive widths */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Scrolling Container - Responsive spacing */}
          <div className="flex animate-scroll space-x-6 sm:space-x-10 lg:space-x-16 xl:space-x-20">
            {duplicatedPartners.map((partner, index) => {
              const imageUrl = getValidImageUrl(partner.partnerLogoUrl);
              const isDefault = imageUrl === getDefaultImage();
              
              return (
                <div
                  key={`${partner.partnerId}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <a
                    href={partner.partnerWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 sm:p-3 lg:p-4 xl:p-5 rounded-lg hover:bg-white/60 hover:shadow-lg transition-all duration-300"
                    title={partner.partnerCompanyName}
                  >
                    {/* Responsive logo sizes */}
                    <div className="w-16 h-10 sm:w-20 sm:h-12 lg:w-28 lg:h-16 xl:w-32 xl:h-20 relative">
                      {isDefault ? (
                        <img
                          src={imageUrl}
                          alt={partner.partnerCompanyName}
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                          onError={() => handleImageError(partner.partnerLogoUrl)}
                        />
                      ) : (
                        <Image
                          src={imageUrl}
                          alt={partner.partnerCompanyName}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                          onError={() => handleImageError(partner.partnerLogoUrl)}
                          unoptimized={imageErrors.has(partner.partnerLogoUrl)}
                        />
                      )}
                    </div>
                    
                    {/* Responsive Hover Tooltip */}
                    <div className="absolute -bottom-6 sm:-bottom-7 lg:-bottom-8 xl:-bottom-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-xs lg:text-sm xl:text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
                      {partner.partnerCompanyName}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Count */}
        <div className="text-center mt-6 sm:mt-7 lg:mt-8 xl:mt-10">
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-500">
            {partners.length} trusted partner{partners.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Responsive animation speed */
        @media (max-width: 640px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
        
        @media (min-width: 1024px) {
          .animate-scroll {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;