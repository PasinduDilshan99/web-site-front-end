// components/TourCard.tsx
import { ActiveToursType } from "@/types/sri-lankan-tour-types";
import React from "react";
import TourImageGallery from "./TourImageGallery";
import TourDetails from "./TourDetails";

interface TourCardProps {
  tour: ActiveToursType;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="group cursor-pointer h-full">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-white border border-gray-100">
        <TourImageGallery tour={tour} />
        <TourDetails tour={tour} />
      </div>
    </div>
  );
};

export default TourCard;
