import React from "react";
import TourCard from "./TourCard";
import { ActiveToursType } from "@/types/tour-types";

interface ToursGridProps {
  tours: ActiveToursType[];
  displayCount: number;
}

const ToursGrid: React.FC<ToursGridProps> = ({ tours, displayCount }) => {
  const displayedTours = tours.slice(0, displayCount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {displayedTours.map((tour) => (
        <TourCard key={tour.tourId} tour={tour} />
      ))}
    </div>
  );
};

export default ToursGrid;
