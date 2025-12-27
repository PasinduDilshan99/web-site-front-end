"use client";

import React from "react";
import { Star } from "lucide-react";

interface HotelStarsProps {
  rating: string;
}

const HotelStars: React.FC<HotelStarsProps> = ({ rating }) => {
  const starCount = parseInt(rating) || 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < starCount
              ? "text-amber-500 fill-amber-500"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default HotelStars;