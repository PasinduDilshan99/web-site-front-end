"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WhyChooseUsCardAPI } from "@/types/why-choose-us-types";
import { GET_ALL_WHY_CHOOSE_US_DATA } from "@/utils/frontEndConstant";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import Loading from "../common/Loading";
import AnimatedButton from "../common/AnimatedButton";

// Import state components

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

// Fallback image
const getDefaultImage = () => {
  return "/images/default-image.jpg";
};

const WhyChooseUs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsData, setCardsData] = useState<WhyChooseUsCardAPI[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Get the correct image URL (with validation)
  const getValidImageUrl = (originalUrl: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors((prev) => new Set([...prev, originalUrl]));
  };

  // Fetch cards data
  const fetchCardsData = async () => {
    try {
      setLoading(true);
      setError(null);

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
    } catch (err) {
      console.error("Error fetching cards data:", err);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardsData();
  }, []);

  // Handle retry for error state
  const handleRetry = () => {
    fetchCardsData();
  };

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

  // Loading state
  if (loading) {
    return (
      <Loading
        message="Loading why choose us details..."
        variant="spinner"
        size="md"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  // No data state
  if (cardsData.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-100 to-amber-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 ">
        {/* Section Header - Fully Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 text-gray-600">
            Discover what makes us the preferred choice for thousands of
            travelers worldwide
          </p>
        </div>

        {/* Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {cardsData.map((card) => {
            const imageUrl = getValidImageUrl(card.cardImageUrl);
            const stats = extractStats(card.cardTitle);

            return (
              <div
                key={card.cardId}
                onClick={() => handleCardClick(card.cardClickedUrl)}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4 overflow-hidden cursor-pointer border border-white/10 backdrop-blur-sm h-full flex flex-col"
              >
                {/* Card Image - Responsive Heights */}
                <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-amber-100 flex-shrink-0">
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
                      onError={() => handleImageError(card.cardImageUrl)}
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
                        onError={() => handleImageError(card.cardIconUrl)}
                        unoptimized
                      />
                    ) : (
                      <DefaultIcon color={card.cardColor || "#A855F7"} />
                    )}
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
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight line-clamp-2 flex-grow">
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
                  className="h-0.5 sm:h-1 bg-transparent group-hover:w-full transition-all duration-500 mt-auto"
                  style={{ backgroundColor: card.cardColor || "#A855F7" }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Fully Responsive */}
        <div className="text-center mt-8">
          <AnimatedButton onClick={() => console.log("Clicked!")}>
            Learn More About Us
          </AnimatedButton>
        </div>
      </div>

      {/* Background Decorative Elements - Responsive Visibility */}
      <div className="hidden md:block absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="hidden lg:block absolute bottom-20 right-20 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
      <div className="hidden xl:block absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
    </section>
  );
};

export default WhyChooseUs;
