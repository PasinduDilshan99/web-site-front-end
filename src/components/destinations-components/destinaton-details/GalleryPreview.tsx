// components/destination/GalleryPreview.tsx
import React, { useState } from "react";
import Image from "next/image";
import { DestinationData } from "@/types/destination-types";
import DestinationImageModal from "./DestinationImageModal";

interface GalleryPreviewProps {
  destination: DestinationData;
  onImageSelect?: (index: number) => void;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  destination,
  onImageSelect,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 4;
  const visibleImages = showAll
    ? destination.images
    : destination.images.slice(0, INITIAL_COUNT);
  const remainingCount = destination.images.length - INITIAL_COUNT;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    onImageSelect?.(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) =>
      prev !== null
        ? (prev - 1 + destination.images.length) % destination.images.length
        : 0,
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % destination.images.length : 0,
    );
  };

  const selectedImage =
    selectedImageIndex !== null ? destination.images[selectedImageIndex] : null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100">
        <h3 className="text-lg font-bold text-sky-900 mb-4">Gallery</h3>

        <div className="grid grid-cols-2 gap-3">
          {visibleImages.map((image, index) => (
            <button
              key={image.imageId}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-md border border-sky-200 hover:border-sky-300 hover:scale-105 transition-all duration-200"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.imageUrl}
                alt={
                  image.imageDescription ||
                  `Thumbnail ${index + 1} for ${destination.destinationName}`
                }
                width={150}
                height={150}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        {/* Show More / Show Less toggle */}
        {destination.images.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="cursor-pointer w-full mt-4 py-2 rounded-xl text-sm font-semibold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-sky-300 transition-all duration-200"
          >
            {showAll
              ? "Show less"
              : `+ ${remainingCount} more image${remainingCount > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* Image Modal with prev/next */}
      {selectedImage && (
        <DestinationImageModal
          isOpen={selectedImageIndex !== null}
          onClose={handleCloseModal}
          imageUrl={selectedImage.imageUrl}
          imageAlt={selectedImage.imageDescription}
          imageTitle={selectedImage.imageDescription}
          currentIndex={selectedImageIndex ?? 0}
          totalImages={destination.images.length}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default GalleryPreview;
