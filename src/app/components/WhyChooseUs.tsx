"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WhyChooseUsCardAPI } from "@/types/why-choose-us-types";
import { GET_ALL_WHY_CHOOSE_US_DATA } from "@/utils/frontEndConstant";

// Default icon SVG component
const DefaultIcon = ({ color = "#FF6B35" }: { color?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
      // Use Next.js router for internal navigation
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-lg p-6 h-80">
                  <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // No data state
  if (cardsData.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-500 mb-4">
            No cards available to display
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for thousands of
            travelers worldwide
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => {
            const imageUrl = getValidImageUrl(card.cardImageUrl, card.cardId);

            return (
              <div
                key={card.cardId}
                onClick={() => handleCardClick(card.cardClickedUrl)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {imageUrl === getDefaultImage() ? (
                    // Use regular img for default image to avoid Next.js optimization issues
                    <img
                      src={imageUrl}
                      alt={card.cardTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={card.cardTitle}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() =>
                        handleImageError(card.cardImageUrl, card.cardId)
                      }
                      unoptimized={imageErrors.has(card.cardImageUrl)}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg">
                    {card.cardIconUrl && !imageErrors.has(card.cardIconUrl) ? (
                      <Image
                        src={card.cardIconUrl}
                        alt={`${card.cardTitle} icon`}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                        onError={() =>
                          handleImageError(card.cardIconUrl, card.cardId)
                        }
                        unoptimized
                      />
                    ) : (
                      <DefaultIcon color={card.cardColor} />
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Stats/Number - Extract from title */}
                  {extractStats(card.cardTitle) && (
                    <div
                      className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3"
                      style={{ backgroundColor: card.cardColor }}
                    >
                      {extractStats(card.cardTitle)}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {card.cardTitle}
                  </h3>

                  {/* Subtitle */}
                  {card.cardSubTitle && (
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      {card.cardSubTitle}
                    </p>
                  )}

                  {/* Description */}
                  {card.cardDescription && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.cardDescription}
                    </p>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: card.cardColor }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
