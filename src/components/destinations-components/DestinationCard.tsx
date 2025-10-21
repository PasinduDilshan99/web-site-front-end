import { PopularDestinationsType } from "@/types/destinations-types";
import React, { useState } from "react";
import ImageGallery from "./popular-destinations/PopularDestinationImageGallery";
import DestinationInfo from "./popular-destinations/PopularDestinationInfo";
import PriceSection from "./popular-destinations/PopularDestinationPriceSection";

interface DestinationCardProps {
  destination: PopularDestinationsType;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const discount = getDiscountPercentage(destination.destinationId);
  const duration = getTourDuration(destination.destinationId);
  const currentPrice = getPrice(destination.popularity, destination.rating);
  const originalPrice = getOriginalPrice(currentPrice, discount);

  const handleImageSwitch = (imageIndex: number) => {
    setActiveImageIndex(imageIndex);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
      <ImageGallery
        destination={destination}
        activeImageIndex={activeImageIndex}
        onImageSwitch={handleImageSwitch}
        discount={discount}
      />

      <div className="p-4 sm:p-5 md:p-6">
        <DestinationInfo destination={destination} duration={duration} />

        <PriceSection
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          discount={discount}
        />
      </div>
    </div>
  );
};

// Utility functions
const getDiscountPercentage = (destinationId: number): number => {
  const discounts = [10, 15, 20, 25, 30, 40];
  return discounts[destinationId % discounts.length];
};

const getTourDuration = (destinationId: number): number => {
  const durations = [3, 5, 7, 10, 14, 15];
  return durations[destinationId % durations.length];
};

const getPrice = (popularity: number, rating: number): number => {
  const basePrice = popularity * rating * 10;
  return Math.round(basePrice);
};

const getOriginalPrice = (currentPrice: number, discount: number): number => {
  return Math.round(currentPrice / (1 - discount / 100));
};

export default DestinationCard;
