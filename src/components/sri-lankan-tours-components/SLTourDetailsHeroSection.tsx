import React from "react";
import Image from "next/image";
import { TourDetails } from "@/types/packages-types";

interface SLTourDetailsHeroSectionProps {
  tour: TourDetails;
}

const SLTourDetailsHeroSection: React.FC<SLTourDetailsHeroSectionProps> = ({
  tour,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-600 to-purple-600">
        {tour.images.length > 0 && (
          <Image
            src={tour.images[selectedImageIndex].imageUrl}
            alt={tour.images[selectedImageIndex].imageName}
            className="w-full h-full object-cover"
            width={10000}
            height={10000}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{tour.tourName}</h1>
            <p className="text-xl opacity-90">{tour.tourDescription}</p>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      {tour.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tour.images.map((image, index) => (
              <button
                key={image.imageId}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-amber-600 ring-2 ring-amber-400"
                    : "border-gray-300 hover:border-purple-400"
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.imageName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SLTourDetailsHeroSection;
