"use client";
import React, { useState, useEffect } from "react";
import { TourHistoryImage } from "@/types/sri-lankan-tour-types";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import Image from "next/image";
import { X, Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";

interface TourHistoryGalleryProps {
  images: TourHistoryImage[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const TourHistoryGallery: React.FC<TourHistoryGalleryProps> = ({
  images,
  loading,
  error,
  onRetry,
}) => {
  const [selectedImage, setSelectedImage] = useState<TourHistoryImage | null>(
    null
  );
  const [duplicatedImages, setDuplicatedImages] = useState<TourHistoryImage[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Duplicate images if less than 30 to create continuous flow
  useEffect(() => {
    if (images.length > 0) {
      let result: TourHistoryImage[] = [...images];
      while (result.length < 30) {
        result = [...result, ...images];
      }
      setDuplicatedImages(result.slice(0, 30)); // Keep exactly 30 images
    }
  }, [images]);

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get images for each row with zigzag pattern
  const getRowImages = (rowIndex: number) => {
    const imagesPerRow = Math.ceil(duplicatedImages.length / 3);
    const startIndex = rowIndex * imagesPerRow;
    const rowImages = duplicatedImages.slice(
      startIndex,
      startIndex + imagesPerRow
    );

    // Reverse even rows (1st and 3rd are 0 and 2 index) for zigzag effect
    return rowIndex % 2 === 0 ? rowImages : [...rowImages].reverse();
  };

  const openModal = (image: TourHistoryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(
      duplicatedImages.findIndex((img) => img.imageId === image.imageId)
    );
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % duplicatedImages.length;
    } else {
      newIndex =
        (currentIndex - 1 + duplicatedImages.length) % duplicatedImages.length;
    }

    setCurrentIndex(newIndex);
    setSelectedImage(duplicatedImages[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Loading
            message="Loading tour memories..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Memories"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={onRetry}
          />
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle="Memories"
            title="Tour Gallery"
            description="Relive the beautiful moments from our past tours"
            fromColor="#8B5CF6"
            toColor="#3B82F6"
          />
          <div className="text-center py-8 sm:py-10 md:py-12">
            <div className="text-gray-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              No tour memories available yet.
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Check back later to see photos from our completed tours.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle="Memories"
            title="Tour Gallery"
            description="Relive the beautiful moments from our past tours"
            fromColor="#8B5CF6"
            toColor="#3B82F6"
          />

          {/* Image Gallery with Zigzag Pattern */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-4 sm:space-y-6 md:space-y-8">
            {[0, 1, 2].map((rowIndex) => (
              <div
                key={rowIndex}
                className={`flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 ${
                  rowIndex % 2 === 0
                    ? "animate-marquee-left"
                    : "animate-marquee-right"
                } hover-animation-pause`}
              >
                {getRowImages(rowIndex).map((image, imgIndex) => (
                  <div
                    key={`${image.imageId}-${rowIndex}-${imgIndex}`}
                    className="flex-shrink-0 group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10"
                    style={{
                      width: `clamp(120px, 20vw, 300px)`,
                    }}
                    onClick={() => openModal(image, imgIndex)}
                  >
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white">
                      {/* Image Container */}
                      <div
                        className="aspect-square relative overflow-hidden"
                        style={{
                          borderLeft: `4px solid ${image.color}`,
                        }}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.description || image.name}
                          fill
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 12vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                        />

                        {/* Overlay */}
                        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center p-2 sm:p-3">
                            <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 line-clamp-2">
                              {image.name}
                            </h3>
                            <p className="text-xs opacity-90 line-clamp-2 hidden sm:block">
                              {image.description}
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-purple-600">
                  {duplicatedImages.length}
                </span>
                <span className="text-gray-600 ml-2">Memories</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-blue-600">{images.length}</span>
                <span className="text-gray-600 ml-2">Unique Photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  {selectedImage.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-2">
                  {selectedImage.description}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="flex-shrink-0 ml-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative aspect-video sm:aspect-[4/3] bg-gray-100">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description || selectedImage.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
                aria-label="Next image"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm">
                {currentIndex + 1} / {duplicatedImages.length}
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 sm:p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Added: {formatDate(selectedImage.createdAt)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-2 sm:mr-3 flex-shrink-0 border border-gray-300"
                    style={{ backgroundColor: selectedImage.color }}
                  />
                  <span>Theme Color</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }
        .hover-animation-pause:hover .animate-marquee-left,
        .hover-animation-pause:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default TourHistoryGallery;
