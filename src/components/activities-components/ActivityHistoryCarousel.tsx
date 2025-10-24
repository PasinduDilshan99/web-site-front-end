"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ActivityHistory } from "./ActivityHistorySection";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Activity,
} from "lucide-react";

interface ActivityHistoryCarouselProps {
  histories: ActivityHistory[];
}

const ActivityHistoryCarousel: React.FC<ActivityHistoryCarouselProps> = ({
  histories,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [selectedHistory, setSelectedHistory] =
    useState<ActivityHistory | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          setItemsPerView(1);
        } else if (width < 768) {
          setItemsPerView(1);
        } else if (width < 1024) {
          setItemsPerView(2);
        } else if (width < 1280) {
          setItemsPerView(3);
        } else if (width < 1536) {
          setItemsPerView(4);
        } else {
          setItemsPerView(5);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(histories.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openImageModal = (history: ActivityHistory, imageIndex: number = 0) => {
    setSelectedHistory(history);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedHistory(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedHistory) {
      setSelectedImageIndex((prev) =>
        prev === selectedHistory.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedHistory) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedHistory.images.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (histories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No activity history available.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))`,
                }}
              >
                {histories
                  .slice(
                    slideIndex * itemsPerView,
                    slideIndex * itemsPerView + itemsPerView
                  )
                  .map((history) => (
                    <div
                      key={history.historyId}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group"
                    >
                      {/* Images Grid - Show multiple images */}
                      <div className="relative">
                        {history.images.length > 0 ? (
                          <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50">
                            {/* Show up to 4 images in a grid */}
                            {history.images.slice(0, 4).map((image, index) => (
                              <div
                                key={image.imageId}
                                className={`relative aspect-square cursor-pointer transition-transform duration-200 hover:scale-105 ${
                                  history.images.length === 1
                                    ? "col-span-2"
                                    : ""
                                } ${
                                  history.images.length === 3 && index === 0
                                    ? "col-span-2"
                                    : ""
                                }`}
                                onClick={() => openImageModal(history, index)}
                              >
                                <Image
                                  src={image.imageUrl}
                                  alt={image.imageName}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                />
                                {/* Overlay for additional images count */}
                                {index === 3 && history.images.length > 4 && (
                                  <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                      +{history.images.length - 4}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">
                              No Images Available
                            </span>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                            {history.activity.activityCategory}
                          </span>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1 backdrop-blur-sm">
                            <Star className="w-3 h-3 fill-white" />
                            {history.history.rating}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                          {history.history.historyName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {history.history.historyDescription}
                        </p>

                        {/* Activity Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Activity className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-gray-800 font-medium">
                              {history.activity.activityName}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">
                              {history.activity.destination.destinationName}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">
                              {formatDate(history.history.activityStart)}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">
                              {formatTime(history.history.activityStart)} -{" "}
                              {formatTime(history.history.activityEnd)}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">
                              {history.history.numberOfParticipate} participants
                            </span>
                          </div>
                        </div>

                        {/* Special Note */}
                        {history.history.specialNote && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-blue-800 line-clamp-2">
                              <span className="font-medium">Note: </span>
                              {history.history.specialNote}
                            </p>
                          </div>
                        )}

                        {/* View All Images Button */}
                        {history.images.length > 0 && (
                          <button
                            onClick={() => openImageModal(history, 0)}
                            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                          >
                            View All Photos ({history.images.length})
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {selectedHistory.history.historyName}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedHistory.activity.activityName} •{" "}
                  {formatDate(selectedHistory.history.activityStart)}
                </p>
              </div>
              <button
                onClick={closeImageModal}
                className="flex-shrink-0 ml-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative aspect-video bg-gray-900">
              <Image
                src={selectedHistory.images[selectedImageIndex].imageUrl}
                alt={selectedHistory.images[selectedImageIndex].imageName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, (max-width: 1024px) 90vw, 80vw"
                priority
              />

              {/* Navigation Arrows */}
              {selectedHistory.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {selectedImageIndex + 1} / {selectedHistory.images.length}
              </div>

              {/* Image Name */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm max-w-md">
                {selectedHistory.images[selectedImageIndex].imageName}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {selectedHistory.images.length > 1 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {selectedHistory.images.map((image, index) => (
                    <button
                      key={image.imageId}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === selectedImageIndex
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.imageName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Description */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {selectedHistory.images[selectedImageIndex].imageDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {formatDate(selectedHistory.history.activityStart)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>
                    {selectedHistory.history.numberOfParticipate} participants
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                  <span>Rating: {selectedHistory.history.rating}/5</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>
                    {selectedHistory.activity.destination.destinationName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityHistoryCarousel;
