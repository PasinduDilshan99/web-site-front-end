"use client";
import React, { useState, useEffect, useMemo } from "react";
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
  Activity,
  Users,
  Star,
  Clock,
} from "lucide-react";

interface ActivityHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatusName: string;
  imageCreatedByUsername: string;
  imageUpdatedByUsername: string | null;
  imageTerminatedByUsername: string | null;
  imageCreatedAt: string;
  imageUpdatedAt: string;
  imageTerminatedAt: string | null;
  history: {
    historyId: number;
    historyName: string;
    historyDescription: string;
    numberOfParticipate: number;
    activityStart: string;
    activityEnd: string;
    rating: number;
    historySpecialNote: string;
    historyStatusName: string;
  };
  schedule: {
    scheduleId: number;
    scheduleName: string;
    scheduleDescription: string;
    assumeStartDate: string;
    assumeEndDate: string;
    durationHoursStart: number;
    durationHoursEnd: number;
    scheduleSpecialNote: string;
  };
  activity: {
    activityId: number;
    activityName: string;
    activityDescription: string;
    activityCategory: string;
    durationHours: number;
    priceLocal: number;
    priceForeigners: number;
    minParticipate: number;
    maxParticipate: number;
  };
}

interface ActivityHistoryGalleryProps {
  imagesData?: ActivityHistoryImage[];
  title?: string;
  description?: string;
  showHeader?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ActivityHistoryGallery: React.FC<ActivityHistoryGalleryProps> = ({
  imagesData = [],
  title = "Activity Memories Gallery",
  description = "Relive the amazing moments and experiences from our past adventure activities",
  showHeader = true,
  loading = false,
  error = null,
  onRetry,
}) => {
  const [images, setImages] = useState<ActivityHistoryImage[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<ActivityHistoryImage | null>(null);
  const [duplicatedImages, setDuplicatedImages] = useState<
    ActivityHistoryImage[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set images from props when imagesData changes
  useEffect(() => {
    if (imagesData && imagesData.length > 0) {
      setImages(imagesData);
    }
  }, [imagesData]);

  // Filter out duplicate images (same imageId) and null imageUrls
  const uniqueImages = useMemo(
    () =>
      images.filter(
        (image, index, self) =>
          index === self.findIndex((img) => img.imageId === image.imageId) &&
          image.imageUrl
      ),
    [images]
  );

  useEffect(() => {
    if (uniqueImages.length > 0) {
      let result: ActivityHistoryImage[] = [...uniqueImages];
      while (result.length < 30) {
        result = [...result, ...uniqueImages];
      }
      setDuplicatedImages(result.slice(0, 30));
    }
  }, [uniqueImages]);

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
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

  // Generate consistent color based on image ID
  const getImageColor = (image: ActivityHistoryImage): string => {
    const colors = [
      "#3B82F6", // Blue
      "#8B5CF6", // Purple
      "#10B981", // Green
      "#F59E0B", // Amber
      "#EF4444", // Red
      "#EC4899", // Pink
      "#6366F1", // Indigo
      "#14B8A6", // Teal
      "#F97316", // Orange
      "#06B6D4", // Cyan
    ];
    return colors[image.imageId % colors.length];
  };

  const openModal = (image: ActivityHistoryImage, index: number) => {
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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Loading
            message="Loading activity memories..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Activity Memories"
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

  if (uniqueImages.length === 0) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {showHeader && (
            <SectionHeader
              subtitle="Memories"
              title={title}
              description={description}
              fromColor="#3B82F6"
              toColor="#8B5CF6"
            />
          )}
          <div className="text-center py-8 sm:py-10 md:py-12">
            <div className="text-gray-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              No activity memories available yet.
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Check back later to see photos from our adventure activities.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="mx-auto">
          {showHeader && (
            <SectionHeader
              subtitle="Memories"
              title={title}
              description={description}
              fromColor="#3B82F6"
              toColor="#8B5CF6"
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
                                {image.activity.activityName}
                              </p>
                              <div className="flex items-center mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-xs">
                                  {image.history.rating}
                                </span>
                              </div>
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
                <span className="font-bold text-blue-600">
                  {duplicatedImages.length}
                </span>
                <span className="text-gray-600 ml-2">Activity Memories</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-purple-600">
                  {uniqueImages.length}
                </span>
                <span className="text-gray-600 ml-2">Unique Photos</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-blue-600">
                  {
                    [
                      ...new Set(
                        uniqueImages.map((img) => img.activity.activityId)
                      ),
                    ].length
                  }
                </span>
                <span className="text-gray-600 ml-2">Activities</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <span className="font-bold text-purple-600">
                  {
                    [
                      ...new Set(
                        uniqueImages.map((img) => img.history.historyId)
                      ),
                    ].length
                  }
                </span>
                <span className="text-gray-600 ml-2">Sessions</span>
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
                {/* Activity Info */}
                <div className="flex items-start text-gray-600">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {selectedImage.activity.activityName}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm capitalize">
                      {selectedImage.activity.activityCategory.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="flex items-start text-gray-600">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {selectedImage.schedule.scheduleName}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {formatDate(selectedImage.history.activityStart)}
                    </p>
                  </div>
                </div>

                {/* Rating Info */}
                <div className="flex items-start text-gray-600">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Rating</p>
                    <p className="text-gray-500 text-xs sm:text-sm flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {selectedImage.history.rating}/5.0
                    </p>
                  </div>
                </div>

                {/* Participants Info */}
                <div className="flex items-start text-gray-600">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Participants</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {selectedImage.history.numberOfParticipate} people
                    </p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="flex items-start text-gray-600">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Session Time</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {formatTime(selectedImage.history.activityStart)} -{" "}
                      {formatTime(selectedImage.history.activityEnd)}
                    </p>
                  </div>
                </div>

                {/* Upload Info */}
                <div className="flex items-start text-gray-600">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Uploaded by</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {selectedImage.imageCreatedByUsername}
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Note */}
              {selectedImage.history.historySpecialNote && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Special Note: </span>
                    {selectedImage.history.historySpecialNote}
                  </p>
                </div>
              )}

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

export default ActivityHistoryGallery;
