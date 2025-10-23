import { DestinationData, Review } from "@/types/destination-details-types";
import React, { useState } from "react";
import DestinationImageGallery from "./DestinationImageGallery";
import DestinationTabs from "./DestinationTabs";

interface DestinationDetailsMainProps {
  destination: DestinationData;
  reviewsLoading: boolean;
  reviewsError: string | null;
  reviews: Review[];
  onRetryReviews: () => void;
}

const DestinationDetailsMain: React.FC<DestinationDetailsMainProps> = ({
  destination,
  reviewsLoading,
  reviewsError,
  reviews,
  onRetryReviews,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <DestinationImageGallery
        destination={destination}
        activeImageIndex={activeImageIndex}
        onImageChange={setActiveImageIndex}
      />

      <DestinationTabs
        destination={destination}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
};

export default DestinationDetailsMain;
