import React from "react";
import Image from "next/image";
import { DestinationData } from "@/types/destination-types";

interface DestinationImageGalleryProps {
  destination: DestinationData;
  activeImageIndex: number;
  onImageChange: (index: number) => void;
}

const DestinationImageGallery: React.FC<DestinationImageGalleryProps> = ({
  destination,
  activeImageIndex,
  onImageChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Main Image */}
      <div className="relative h-96">
        {destination.images.length > 0 ? (
          <Image
            src={
              destination.images[activeImageIndex]?.imageUrl ||
              "/api/placeholder/800/400"
            }
            alt={
              destination.images[activeImageIndex]?.imageDescription ||
              destination.destinationName
            }
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-teal-600 flex items-center justify-center">
            <span className="text-white font-semibold text-2xl">
              {destination.destinationName}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {destination.images.length > 1 && (
        <div className="p-4 bg-sky-50/50">
          <div className="flex space-x-3 overflow-x-auto">
            {destination.images.map((image, index) => (
              <button
                key={image.imageId}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                  activeImageIndex === index
                    ? "border-gradient-to-r border-2 from-sky-500 to-teal-500 shadow-lg shadow-sky-200/50"
                    : "border-gray-300 hover:border-sky-300"
                }`}
                onClick={() => onImageChange(index)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.imageDescription}
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationImageGallery;