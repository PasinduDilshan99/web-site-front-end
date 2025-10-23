// components/packages-components/PackageHistoryGallery.tsx
"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import Image from "next/image";
import {
  X,
  Calendar,
  User,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Package,
  Users,
} from "lucide-react";

interface PackageHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
  imageStatusName: string;
  createdAt: string;
  packageSchedule: {
    packageScheduleId: number;
    packageScheduleName: string;
  };
  packageInfo: {
    packageId: number;
    packageName: string;
    tourId: number;
  };
  createdByUser: {
    fullName: string;
    imageUrl: string | null;
  };
}

interface PackageHistoryImagesResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHistoryImage[];
  timestamp: string;
}

interface PackageHistoryGalleryProps {
  imagesData?: PackageHistoryImage[];
  title?: string;
  description?: string;
  showHeader?: boolean;
}

const PackageHistoryGallery: React.FC<PackageHistoryGalleryProps> = ({
  imagesData,
  title = "Package Memories Gallery",
  description = "Relive the amazing moments and experiences from our past package tours",
  showHeader = true,
}) => {
  const [images, setImages] = useState<PackageHistoryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(!imagesData);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] =
    useState<PackageHistoryImage | null>(null);
  const [duplicatedImages, setDuplicatedImages] = useState<
    PackageHistoryImage[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out duplicate images (same imageId) and null imageUrls
  const uniqueImages = images.filter(
    (image, index, self) =>
      index === self.findIndex((img) => img.imageId === image.imageId) &&
      image.imageUrl
  );

  // Duplicate images if less than 30 to create continuous flow
  useEffect(() => {
    if (uniqueImages.length > 0) {
      let result: PackageHistoryImage[] = [...uniqueImages];
      while (result.length < 30) {
        result = [...result, ...uniqueImages];
      }
      setDuplicatedImages(result.slice(0, 30)); // Keep exactly 30 images
    }
  }, [uniqueImages]);

  useEffect(() => {
    if (imagesData) {
      setImages(imagesData);
      setLoading(false);
    } else {
      fetchHistoryImages();
    }
  }, [imagesData]);

  const fetchHistoryImages = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/package/history-images"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PackageHistoryImagesResponse = await response.json();

      if (result.code === 200) {
        setImages(result.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch package history images"
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package history images"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (): void => {
    if (!imagesData) {
      fetchHistoryImages();
    }
  };

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

  // Generate consistent color based on image ID or use provided color
  const getImageColor = (image: PackageHistoryImage): string => {
    if (image.color && image.color !== "#000000") {
      return image.color;
    }

    const colors = [
      "#8B5CF6",
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#EC4899",
      "#6366F1",
      "#14B8A6",
      "#F97316",
      "#06B6D4",
    ];
    return colors[image.imageId % colors.length];
  };

  const openModal = (image: PackageHistoryImage, index: number) => {
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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Loading
            message="Loading package memories..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Package Memories"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  if (uniqueImages.length === 0) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {showHeader && (
            <SectionHeader
              subtitle="Memories"
              title={title}
              description={description}
              fromColor="#A855F7"
              toColor="#F59E0B"
            />
          )}
          <div className="text-center py-8 sm:py-10 md:py-12">
            <div className="text-gray-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              No package memories available yet.
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Check back later to see photos from our package tours.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-amber-50 overflow-hidden">
        <div className="mx-auto">
          {showHeader && (
            <SectionHeader
              subtitle="Memories"
              title={title}
              description={description}
              fromColor="#A855F7"
              toColor="#F59E0B"
            />
          )}

          {/* Image Gallery with Zigzag Pattern */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden">
            {[0, 1, 2].map((rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <div
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
                            borderLeft: `4px solid ${getImageColor(image)}`,
                          }}
                        >
                          <Image
                            src={image.imageUrl}
                            alt={image.imageDescription || image.imageName}
                            fill
                            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 12vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                          />

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-3">
                            <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="font-semibold truncate">
                                {image.imageName}
                              </p>
                              <p className="truncate">
                                {image.packageInfo.packageName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <span className="text-gray-600 ml-2">Package Memories</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-amber-600">
                  {uniqueImages.length}
                </span>
                <span className="text-gray-600 ml-2">Unique Photos</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-purple-600">
                  {
                    [
                      ...new Set(
                        uniqueImages.map((img) => img.packageInfo.packageId)
                      ),
                    ].length
                  }
                </span>
                <span className="text-gray-600 ml-2">Packages</span>
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
                  {selectedImage.imageName}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-2">
                  {selectedImage.imageDescription}
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
                alt={selectedImage.imageDescription || selectedImage.imageName}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
                <div className="flex items-start text-gray-600">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {selectedImage.packageInfo.packageName}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Schedule:{" "}
                      {selectedImage.packageSchedule.packageScheduleName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Upload Date</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {formatDate(selectedImage.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Uploaded by</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {selectedImage.createdByUser.fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getImageColor(selectedImage) }}
                  ></div>
                  <span className="text-sm text-gray-600 capitalize">
                    {selectedImage.imageStatusName.toLowerCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Image ID: {selectedImage.imageId}
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
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
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
        .hover-animation-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default PackageHistoryGallery;
