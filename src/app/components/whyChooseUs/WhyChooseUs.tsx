"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WhyChooseUsCardAPI } from "@/types/why-choose-us-types";
import { GET_ALL_WHY_CHOOSE_US_DATA } from "@/utils/frontEndConstant";

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

// Fallback image - using your default image
const getDefaultImage = () => {
  return "/images/default-image.jpg";
};

const WhyChooseUs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsData, setCardsData] = useState<WhyChooseUsCardAPI[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Get the correct image URL (with validation)
  const getValidImageUrl = (originalUrl: string, cardId: number): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

  // Handle image error
  const handleImageError = (originalUrl: string, cardId: number) => {
    setImageErrors((prev) => new Set([...prev, originalUrl]));
  };

  // Fetch cards data
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        setLoading(true);

        const response = await fetch(GET_ALL_WHY_CHOOSE_US_DATA);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const cards = data.data || data;

        const activeCards = Array.isArray(cards)
          ? cards
              .filter(
                (card: WhyChooseUsCardAPI) =>
                  card.cardStatus === "VISIBLE" &&
                  card.cardStatusStatus === "ACTIVE"
              )
              .sort(
                (a: WhyChooseUsCardAPI, b: WhyChooseUsCardAPI) =>
                  a.cardOrder - b.cardOrder
              )
          : [];

        setCardsData(activeCards);
        setError(null);
      } catch (err) {
        console.error("Error fetching cards data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchCardsData();
  }, []);

  // Handle card click
  const handleCardClick = (clickedUrl: string) => {
    if (clickedUrl) {
      window.location.href = clickedUrl;
    }
  };

  // Extract stats from title (e.g., "50+", "100%", "10+", "98%")
  const extractStats = (title: string): string | null => {
    const statsMatch = title.match(/\b(\d+\+?%?)\b/);
    return statsMatch ? statsMatch[1] : null;
  };

  // Loading state with responsive design
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="animate-pulse">
              <div className="h-6 sm:h-7 md:h-8 lg:h-10 bg-white/20 rounded-lg w-48 sm:w-56 md:w-64 lg:w-72 mx-auto mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-white/10 rounded w-64 sm:w-80 md:w-96 lg:w-[28rem] mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 h-64 sm:h-72 md:h-80 lg:h-[22rem]">
                  <div className="h-24 sm:h-28 md:h-32 lg:h-36 bg-gray-200 rounded-lg mb-3 sm:mb-4"></div>
                  <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state with responsive design
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-white font-medium sm:font-semibold rounded-lg md:rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // No data state with responsive design
  if (cardsData.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-white/90">
            No cards available to display
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-20"
      style={{
        background: `linear-gradient(135deg, var(--why-choose-us-bg-from), var(--why-choose-us-bg-to))`,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-center"
          style={{ color: "var(--why-choose-us-title-color)" }}
        >
          Why Choose Us
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 text-center"
          style={{ color: "var(--why-choose-us-subtitle-color)" }}
        >
          Discover what makes us the preferred choice for thousands of travelers
          worldwide
        </p>

        {/* Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mt-5 lg:mt-10">
          {cardsData.map((card) => {
            const imageUrl = getValidImageUrl(card.cardImageUrl, card.cardId);

            return (
              <div
                key={card.cardId}
                onClick={() => handleCardClick(card.cardClickedUrl)}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4 overflow-hidden cursor-pointer border border-white/10 backdrop-blur-sm"
              >
                {/* Card Image - Responsive Heights */}
                <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-amber-100">
                  {imageUrl === getDefaultImage() ? (
                    <img
                      src={imageUrl}
                      alt={card.cardTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={card.cardTitle}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() =>
                        handleImageError(card.cardImageUrl, card.cardId)
                      }
                      unoptimized={imageErrors.has(card.cardImageUrl)}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                  {/* Icon Overlay - Responsive Positioning and Size */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-white rounded-full p-1.5 sm:p-2 md:p-2.5 lg:p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {card.cardIconUrl && !imageErrors.has(card.cardIconUrl) ? (
                      <Image
                        src={card.cardIconUrl}
                        alt={`${card.cardTitle} icon`}
                        width={32}
                        height={32}
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                        onError={() =>
                          handleImageError(card.cardIconUrl, card.cardId)
                        }
                        unoptimized
                      />
                    ) : (
                      <DefaultIcon color={card.cardColor || "#A855F7"} />
                    )}
                  </div>
                </div>

                {/* Card Content - Responsive Padding and Typography */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  {/* Stats/Number Badge - Responsive */}
                  {extractStats(card.cardTitle) && (
                    <div
                      className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3 shadow-sm"
                      style={{ backgroundColor: card.cardColor || "#A855F7" }}
                    >
                      {extractStats(card.cardTitle)}
                    </div>
                  )}

                  {/* Title - Responsive Typography */}
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight line-clamp-2">
                    {card.cardTitle}
                  </h3>

                  {/* Subtitle - Responsive */}
                  {card.cardSubTitle && (
                    <p className="text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-purple-600 line-clamp-2">
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
                  className="absolute bottom-0 left-0 w-0 h-0.5 sm:h-1 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: card.cardColor || "#A855F7" }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Fully Responsive */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            Learn More About us
          </button>
        </div>
      </div>

      {/* Background Decorative Elements - Hidden on Mobile */}
      <div className="hidden md:block absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="hidden lg:block absolute bottom-20 right-20 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
      <div className="hidden xl:block absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
    </section>
  );
};

export default WhyChooseUs;
