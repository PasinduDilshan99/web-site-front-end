import React from "react";
import Image from "next/image";
import { DestinationData } from "@/types/destination-details-types";

interface GalleryPreviewProps {
  destination: DestinationData;
  onImageSelect?: (index: number) => void;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  destination,
  onImageSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
      <div className="grid grid-cols-2 gap-3">
        {destination.images.slice(0, 4).map((image, index) => (
          <button
            key={image.imageId}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onImageSelect?.(index)}
          >
            <Image
              src={image.imageUrl}
              alt={image.imageDescription}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {destination.images.length > 4 && (
        <p className="text-center text-gray-500 text-sm mt-3">
          +{destination.images.length - 4} more images
        </p>
      )}
    </div>
  );
};

export default GalleryPreview;
