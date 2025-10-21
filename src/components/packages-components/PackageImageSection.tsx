import React from "react";
import Image from "next/image";
import { ActivePackagesType } from "@/types/packages-types";

interface PackageImageSectionProps {
  package: ActivePackagesType;
  currentImageIndex: number;
  onImageIndexChange: (packageId: number, newIndex: number) => void;
}

const PackageImageSection: React.FC<PackageImageSectionProps> = ({
  package: pkg,
  currentImageIndex,
  onImageIndexChange,
}) => {
  const handleImageClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (pkg.images && pkg.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % pkg.images.length;
      onImageIndexChange(pkg.packageId, nextIndex);
    }
  };

  const handleDotClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onImageIndexChange(pkg.packageId, index);
  };

  const handleArrowClick = (direction: "prev" | "next", event: React.MouseEvent) => {
    event.stopPropagation();
    if (!pkg.images || pkg.images.length <= 1) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = currentImageIndex === 0 ? pkg.images.length - 1 : currentImageIndex - 1;
    } else {
      newIndex = (currentImageIndex + 1) % pkg.images.length;
    }
    onImageIndexChange(pkg.packageId, newIndex);
  };

  return (
    <div
      className="relative h-40 sm:h-48 md:h-56 lg:h-52 xl:h-56 overflow-hidden cursor-pointer"
      onClick={handleImageClick}
    >
      {pkg.images && pkg.images.length > 0 && pkg.images.map((image, index) => (
        <div
          key={image.imageId}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        >
          <Image
            src={image.imageUrl}
            alt={`${pkg.packageName} - Image ${index + 1}`}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ))}

      {pkg.images && pkg.images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
          {pkg.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentImageIndex
                  ? "bg-white w-4 sm:w-6"
                  : "bg-white/50"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {pkg.images && pkg.images.length > 1 && (
        <>
          <button
            onClick={(e) => handleArrowClick("prev", e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Previous image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => handleArrowClick("next", e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Next image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {pkg.discountPercentage > 0 && (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
          {pkg.discountPercentage}% OFF
        </div>
      )}

      {pkg.images && pkg.images.length > 1 && (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs z-10">
          {currentImageIndex + 1}/{pkg.images.length}
        </div>
      )}
    </div>
  );
};

export default PackageImageSection;