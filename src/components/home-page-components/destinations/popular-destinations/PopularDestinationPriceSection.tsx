import React from "react";

interface PriceSectionProps {
  currentPrice: number;
  originalPrice: number;
  discount: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  currentPrice,
  originalPrice,
  discount,
}) => {
  return (
    <div className="flex justify-between items-center">
      <PriceDisplay currentPrice={currentPrice} originalPrice={originalPrice} />
      <ExploreButton />
    </div>
  );
};

// Sub-components
interface PriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  currentPrice,
  originalPrice,
}) => {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <span className="text-xs sm:text-sm text-gray-500 line-through">
        ${originalPrice}.00
      </span>
      <span className="text-base sm:text-lg md:text-xl font-bold text-purple-600">
        ${currentPrice}.00
      </span>
    </div>
  );
};

const ExploreButton: React.FC = () => {
  return (
    <button className="bg-purple-500 hover:bg-orange-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors">
      Explore
    </button>
  );
};

export default PriceSection;
