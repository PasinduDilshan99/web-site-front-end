import React from "react";
import { EnhancedDestination } from "@/types/destinations-types";
import DestinationCard from "./DestinationCard";

interface DestinationsGridProps {
  destinations: EnhancedDestination[];
  displayCount: number;
}

const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  destinations,
  displayCount,
}) => {
  const displayedDestinations = destinations.slice(0, displayCount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayedDestinations.map((destination) => (
        <DestinationCard
          key={destination.destinationId}
          destination={destination}
        />
      ))}
    </div>
  );
};

export default DestinationsGrid;
