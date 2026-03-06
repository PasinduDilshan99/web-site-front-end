"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SpecificationImageDetails } from "@/types/vehicle-types";

interface VehicleSpecificationImagesProps {
  images: SpecificationImageDetails[];
  vehicleName: string;
}

const VehicleSpecificationImages: React.FC<VehicleSpecificationImagesProps> = ({
  images,
  vehicleName,
}) => {
  const [selectedImage, setSelectedImage] = useState<SpecificationImageDetails | null>(
    images.length > 0 ? images[0] : null
  );
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageError = (imageId: number) => {
    setFailedImages((prev) => new Set(prev).add(imageId));
  };

  const handleThumbnailClick = (image: SpecificationImageDetails) => {
    setSelectedImage(image);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!images.length) {
    return (
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl h-64 sm:h-80 lg:h-96 flex items-center justify-center">
        <div className="text-center text-teal-500 p-4">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-base sm:text-lg font-medium">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl overflow-hidden group">
          {selectedImage && !failedImages.has(selectedImage.imageId) ? (
            <>
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.imageName || vehicleName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={1200}
                height={800}
                priority
                onError={() => handleImageError(selectedImage.imageId)}
              />
              
              {/* Fullscreen button - Hidden on mobile, visible on tablet/desktop */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                aria-label="View fullscreen"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-teal-500 p-4">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-base sm:text-lg font-medium">Image not available</p>
              </div>
            </div>
          )}

          {/* Image Description Overlay - Responsive padding */}
          {selectedImage?.description && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                {selectedImage.description}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Grid - Responsive grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
            {images.map((image) => (
              <button
                key={image.imageId}
                onClick={() => handleThumbnailClick(image)}
                className={`relative w-full h-16 sm:h-20 lg:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedImage?.imageId === image.imageId
                    ? "ring-3 ring-teal-500 scale-105 z-10"
                    : "hover:ring-2 hover:ring-teal-300"
                }`}
              >
                {!failedImages.has(image.imageId) ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.imageName || `Thumbnail ${image.imageId}`}
                    className="w-full h-full object-cover"
                    width={200}
                    height={150}
                    onError={() => handleImageError(image.imageId)}
                  />
                ) : (
                  <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal - Responsive */}
      {isFullscreen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={toggleFullscreen}>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.imageName || vehicleName}
              className="w-full h-full object-contain"
              width={2000}
              height={1500}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleSpecificationImages;