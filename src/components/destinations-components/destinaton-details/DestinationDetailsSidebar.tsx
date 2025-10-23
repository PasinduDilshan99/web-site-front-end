import { DestinationData } from "@/types/destination-details-types";
import React from "react";
import QuickInfoCard from "./QuickInfoCard";
import BookingCard from "./BookingCard";
import GalleryPreview from "./GalleryPreview";

interface DestinationDetailsSidebarProps {
  destination: DestinationData;
  onImageSelect?: (index: number) => void;
}

const DestinationDetailsSidebar: React.FC<DestinationDetailsSidebarProps> = ({
  destination,
  onImageSelect,
}) => {
  return (
    <>
      <QuickInfoCard destination={destination} />
      <BookingCard destination={destination} />
      {destination.images.length > 0 && (
        <GalleryPreview
          destination={destination}
          onImageSelect={onImageSelect}
        />
      )}
    </>
  );
};

export default DestinationDetailsSidebar;
