// components/TourImageGallery.tsx
import { ActiveToursType } from "@/types/sri-lankan-tour-types";
import React, { useEffect, useState } from "react";

interface TourImageGalleryProps {
  tour: ActiveToursType;
}

const TourImageGallery: React.FC<TourImageGalleryProps> = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = tour.images
    .map((img) => ({
      url: img.imageUrl,
      name: img.imageName,
    }))
    .filter((img) => img.url);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 xl:h-60 2xl:h-64 w-full flex-shrink-0">
      <img
        src={allImages[currentImageIndex]?.url || "/placeholder.jpg"}
        alt={allImages[currentImageIndex]?.name || tour.tourName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Image Counter Badge */}
      {allImages.length > 1 && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black bg-opacity-60 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      )}

      {/* Thumbnail Images */}
      {allImages.length > 1 && (
        <>
          {/* Mobile: Horizontal thumbnails at bottom */}
          <div className="absolute bottom-2 left-2 right-2 flex sm:hidden gap-1 justify-center">
            {allImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 rounded cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                  index === currentImageIndex
                    ? "border-white border-opacity-100 shadow-lg"
                    : "border-white border-opacity-60 hover:border-opacity-100"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
            {allImages.length > 4 && (
              <div className="w-8 h-6 bg-black bg-opacity-60 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">
                  +{allImages.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Tablet and above: Vertical thumbnails */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 hidden sm:flex flex-col gap-1">
            {allImages.slice(0, 3).map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 sm:w-10 sm:h-8 rounded cursor-pointer border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? "border-white border-opacity-100"
                    : "border-white border-opacity-60 hover:border-opacity-100"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
            {allImages.length > 3 && (
              <div className="w-8 h-6 sm:w-10 sm:h-8 bg-black bg-opacity-60 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  +{allImages.length - 3}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation Dots */}
      {allImages.length > 1 && (
        <div
          className={`absolute bottom-3 left-3 gap-1 ${
            allImages.length > 1 ? "hidden sm:flex" : "flex"
          }`}
        >
          {allImages.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleThumbnailClick(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
            />
          ))}
          {allImages.length > 5 && (
            <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full" />
          )}
        </div>
      )}

      {/* Tour Title Overlay */}
      <div className="absolute bottom-14 sm:bottom-14 left-3 sm:left-4 right-3 sm:right-20">
        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold leading-tight drop-shadow-lg line-clamp-2">
          {tour.tourName}
        </h3>
      </div>

      {/* Season Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          {tour.seasonName}
        </span>
      </div>
    </div>
  );
};

export default TourImageGallery;
