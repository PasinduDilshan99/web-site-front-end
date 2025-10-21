import { PopularDestinationsType } from "@/types/destinations-types";
import React from "react";

interface ImageGalleryProps {
  destination: PopularDestinationsType;
  activeImageIndex: number;
  onImageSwitch: (index: number) => void;
  discount: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  destination,
  activeImageIndex,
  onImageSwitch,
  discount,
}) => {
  const activeDestinationImages = destination.images.filter(
    (img) => img.imageStatus === "ACTIVE"
  );

  return (
    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
      {/* Main Image */}
      {activeDestinationImages.length > 0 ? (
        <img
          src={
            activeDestinationImages[activeImageIndex]?.imageUrl ||
            activeDestinationImages[0].imageUrl
          }
          alt={
            activeDestinationImages[activeImageIndex]?.imageDescription ||
            activeDestinationImages[0].imageDescription
          }
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          onError={(e) => {
            e.currentTarget.src = "/api/placeholder/400/250";
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
          <span className="text-white font-semibold text-base sm:text-lg md:text-xl">
            {destination.destinationName}
          </span>
        </div>
      )}

      {/* Discount Badge */}
      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-purple-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold z-10">
        {discount}% Off
      </div>

      {/* Favorite Button */}
      <button className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10">
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Thumbnail Images */}
      {activeDestinationImages.length > 1 && (
        <ThumbnailGrid
          images={activeDestinationImages}
          activeImageIndex={activeImageIndex}
          onImageSwitch={onImageSwitch}
        />
      )}

      {/* Image Counter */}
      {activeDestinationImages.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-black bg-opacity-50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
          {activeImageIndex + 1} / {activeDestinationImages.length}
        </div>
      )}
    </div>
  );
};

// Thumbnail Grid Sub-component
interface ThumbnailGridProps {
  images: any[];
  activeImageIndex: number;
  onImageSwitch: (index: number) => void;
}

const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({
  images,
  activeImageIndex,
  onImageSwitch,
}) => {
  return (
    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex flex-col space-y-1 sm:space-y-2">
      {images.slice(0, 4).map((image, index) => (
        <Thumbnail
          key={image.imageId}
          image={image}
          index={index}
          isActive={activeImageIndex === index}
          onImageSwitch={onImageSwitch}
        />
      ))}
      {images.length > 4 && <MoreThumbnails count={images.length - 4} />}
    </div>
  );
};

// Individual Thumbnail Component
interface ThumbnailProps {
  image: any;
  index: number;
  isActive: boolean;
  onImageSwitch: (index: number) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  image,
  index,
  isActive,
  onImageSwitch,
}) => {
  return (
    <div
      className={`w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
        isActive
          ? "border-amber-500 shadow-lg"
          : "border-white hover:border-amber-300"
      }`}
      onClick={() => onImageSwitch(index)}
    >
      <img
        src={image.imageUrl}
        alt={image.imageDescription}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/api/placeholder/64/48";
        }}
      />
    </div>
  );
};

// More Thumbnails Indicator
interface MoreThumbnailsProps {
  count: number;
}

const MoreThumbnails: React.FC<MoreThumbnailsProps> = ({ count }) => {
  return (
    <div className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 rounded-lg bg-black bg-opacity-70 flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition-all">
      <span className="text-white text-xs font-semibold">+{count}</span>
    </div>
  );
};

export default ImageGallery;
