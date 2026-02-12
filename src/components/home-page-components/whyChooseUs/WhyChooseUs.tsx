"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WhyChooseUsCardAPI } from "@/types/why-choose-us-types";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";
import { WhyChooseUsService } from "@/services/whyChooseUsService";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

// Default icon SVG component with Sunset Purple theme
const DefaultIcon = ({ color = "#A855F7" }: { color?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
  >
    <circle cx="16" cy="16" r="14" fill={color} fillOpacity="0.1" />
    <circle cx="16" cy="16" r="10" fill={color} fillOpacity="0.2" />
    <circle cx="16" cy="16" r="6" fill={color} />
  </svg>
);

// Card Image Component with Error Handling
const CardImage = React.memo(
  ({
    imageUrl,
    alt,
    hasError,
    onError,
  }: {
    imageUrl: string;
    alt: string;
    hasError: boolean;
    onError: () => void;
  }) => {
    const [imgSrc, setImgSrc] = useState(imageUrl);
    const [imgError, setImgError] = useState(hasError);

    useEffect(() => {
      setImgSrc(imageUrl);
      setImgError(false);
    }, [imageUrl]);

    const handleError = () => {
      if (!imgError) {
        console.log(
          `Why Choose Us image failed to load for ${alt}, using placeholder`,
        );
        setImgSrc(PLACE_HOLDER_IMAGE);
        setImgError(true);
        onError();
      }
    };

    return (
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleError}
          unoptimized={imgError}
        />
        {imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-amber-100/50 flex items-center justify-center">
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full">
              <span className="flex items-center gap-0.5">
                <svg
                  className="w-2 h-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Placeholder</span>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

CardImage.displayName = "CardImage";

// Icon Component with Error Handling
const CardIcon = React.memo(
  ({
    iconUrl,
    title,
    color,
    hasError,
    onError,
  }: {
    iconUrl: string | null;
    title: string;
    color?: string;
    hasError: boolean;
    onError: () => void;
  }) => {
    const [imgSrc, setImgSrc] = useState(iconUrl || "");
    const [imgError, setImgError] = useState(hasError || !iconUrl);

    useEffect(() => {
      setImgSrc(iconUrl || "");
      setImgError(!iconUrl);
    }, [iconUrl]);

    const handleError = () => {
      if (!imgError && iconUrl) {
        setImgError(true);
        onError();
      }
    };

    if (imgError || !iconUrl) {
      return <DefaultIcon color={color || "#A855F7"} />;
    }

    return (
      <Image
        src={imgSrc}
        alt={`${title} icon`}
        width={32}
        height={32}
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
        onError={handleError}
        unoptimized
      />
    );
  },
);

CardIcon.displayName = "CardIcon";

const WhyChooseUs = ({ buttonRequired }: { buttonRequired: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsData, setCardsData] = useState<WhyChooseUsCardAPI[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle image error
  const handleImageError = (url: string) => {
    setImageErrors((prev) => new Set([...prev, url]));
  };

  // Check if image has error
  const hasImageError = (url: string): boolean => {
    return imageErrors.has(url);
  };

  // Fetch cards data
  const fetchCardsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: items, error } = await WhyChooseUsService.fetchCardsData();

      if (error) {
        throw new Error(error);
      } else {
        setCardsData(items);
      }
    } catch (err) {
      console.error("Error in component:", err);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardsData();
  }, []);

  // Handle Learn More button click - navigate to about-us page
  const handleLearnMoreClick = () => {
    router.push("/about-us");
  };

  // Extract stats from title (e.g., "50+", "100%", "10+", "98%")
  const extractStats = (title: string): string | null => {
    const statsMatch = title.match(/\b(\d+\+?%?)\b/);
    return statsMatch ? statsMatch[1] : null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center p-8">
        <div className="w-full mx-auto">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">
                Loading why choose us...
              </span>
            </div>
          </div>

          {/* Why Choose Us Cards - 3 cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl p-6 border border-teal-500/20 animate-pulse"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg mb-4 mx-auto"></div>
                <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 mx-auto mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-full"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return null;
  }

  // No data state
  if (cardsData.length === 0) {
    return null;
  }

  return (
    <section className="bg-white relative pt-12 pb-6 lg:pt-16 lg:pb-8 xl:pt-20 xl:pb-10">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header - Fully Responsive */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle=""
            title="Why Choose Us"
            description="Discover what makes us the preferred choice for thousands of travelers worldwide"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {cardsData.map((card) => {
            const stats = extractStats(card.cardTitle);
            const hasCardImageError = hasImageError(card.cardImageUrl);
            const hasCardIconError = card.cardIconUrl
              ? hasImageError(card.cardIconUrl)
              : true;

            return (
              <div
                key={card.cardId}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4 overflow-hidden border border-white/10 backdrop-blur-sm h-full flex flex-col"
              >
                {/* Card Image - Responsive Heights with Error Handling */}
                <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-amber-100 flex-shrink-0">
                  <CardImage
                    imageUrl={card.cardImageUrl || PLACE_HOLDER_IMAGE}
                    alt={card.cardTitle}
                    hasError={hasCardImageError}
                    onError={() => handleImageError(card.cardImageUrl)}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                  {/* Icon Overlay - Responsive Positioning and Size with Error Handling */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-white rounded-full p-1.5 sm:p-2 md:p-2.5 lg:p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <CardIcon
                      iconUrl={card.cardIconUrl}
                      title={card.cardTitle}
                      color={card.cardColor}
                      hasError={hasCardIconError}
                      onError={() =>
                        card.cardIconUrl && handleImageError(card.cardIconUrl)
                      }
                    />
                  </div>
                </div>

                {/* Card Content - Responsive Padding and Typography */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-grow flex flex-col">
                  {/* Stats/Number Badge - Responsive */}
                  {stats && (
                    <div
                      className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3 shadow-sm self-start"
                      style={{ backgroundColor: card.cardColor || "#A855F7" }}
                    >
                      {stats}
                    </div>
                  )}

                  {/* Title - Responsive Typography */}
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-800 group-hover:text-cyan-600 transition-colors duration-300 leading-tight line-clamp-2 flex-grow">
                    {card.cardTitle}
                  </h3>

                  {/* Subtitle - Responsive */}
                  {card.cardSubTitle && (
                    <p className="text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-cyan-600 line-clamp-2">
                      {card.cardSubTitle}
                    </p>
                  )}

                  {/* Description - Responsive with Line Clamping */}
                  {card.cardDescription && (
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-600 line-clamp-3 sm:line-clamp-4">
                      {card.cardDescription}
                    </p>
                  )}
                </div>

                {/* Hover Effect Border - Responsive Height */}
                <div
                  className="h-0.5 sm:h-1 bg-transparent group-hover:w-full transition-all duration-500 mt-auto"
                  style={{ backgroundColor: card.cardColor || "#A855F7" }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Fully Responsive */}
        {buttonRequired && (
          <div className="text-center">
            <AnimatedButton onClick={handleLearnMoreClick}>
              Learn More About Us
            </AnimatedButton>
          </div>
        )}
      </div>

      {/* Background Decorative Elements - Responsive Visibility */}
      <div className="hidden md:block absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="hidden lg:block absolute bottom-20 right-20 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
      <div className="hidden xl:block absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
    </section>
  );
};

export default WhyChooseUs;
