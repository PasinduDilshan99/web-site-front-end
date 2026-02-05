import React from "react";
import Image from "next/image";
import { DestinationData } from "@/types/destination-types";

interface GalleryPreviewProps {
  destination: DestinationData;
  onImageSelect?: (index: number) => void;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  destination,
  onImageSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100">
      <h3 className="text-lg font-bold text-sky-900 mb-4">Gallery</h3>
      <div className="grid grid-cols-2 gap-3">
        {destination.images.slice(0, 4).map((image, index) => (
          <button
            key={image.imageId}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-sky-200 hover:border-sky-300 hover:scale-105 transition-all duration-200"
            onClick={() => onImageSelect?.(index)}
          >
            <Image
              src={image.imageUrl}
              alt={image.imageDescription}
              width={150}
              height={150}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      {destination.images.length > 4 && (
        <p className="text-center text-sky-600 text-sm mt-3 font-medium">
          +{destination.images.length - 4} more images
        </p>
      )}
    </div>
  );
};

export default GalleryPreview;