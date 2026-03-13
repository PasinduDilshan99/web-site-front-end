// components/activity/ActivityImages.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ActivityImage } from "@/types/activities-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";

interface ActivityImagesProps {
  images: ActivityImage[];
  activityName: string;
}

const ActivityImages: React.FC<ActivityImagesProps> = ({
  images,
  activityName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const hasNavigation = images && images.length > 1;

  // Open modal at the current selected image
  const handleOpenModal = () => {
    if (!hasImages) return;
    setModalIndex(selectedImageIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePrev = () =>
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () => setModalIndex((prev) => (prev + 1) % images.length);

  const handleDownload = async () => {
    const url = images[modalIndex]?.image_url;
    const name = images[modalIndex]?.name || activityName;
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image - Fully Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="relative w-full aspect-[4/3] xs:aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] xl:aspect-[3/1]">
            {hasImages ? (
              <>
                <Image
                  src={
                    images[selectedImageIndex]?.image_url || PLACE_HOLDER_IMAGE
                  }
                  alt={images[selectedImageIndex]?.name || activityName}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 480px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 1280px"
                />
                {/* Clickable overlay with zoom hint */}
                <button
                  onClick={handleOpenModal}
                  className="cursor-pointer absolute inset-0 group flex items-center justify-center"
                  aria-label="View full image"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/20">
                    <MagnifyingGlassPlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">View Full Image</span>
                    <span className="xs:hidden">Full View</span>
                  </span>
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">
                  No Image Available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Images */}
        {hasNavigation && (
          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`cursor-pointer flex-shrink-0 w-16 xs:w-20 sm:w-24 md:w-28 h-16 xs:h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "border-cyan-500 scale-105 shadow-md"
                    : "border-gray-300 hover:border-cyan-300"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={image.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen Modal - Reduced Width */}
      {isModalOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 xs:p-3 sm:p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image card */}
            <div className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              {/* Top-right action buttons - Responsive layout */}
              <div className="absolute top-2 xs:top-3 right-2 xs:right-3 z-10 flex items-center gap-1.5 xs:gap-2">
                {/* Counter - hidden on very small screens */}
                {hasNavigation && (
                  <span className="hidden xs:inline-block px-2 xs:px-2.5 py-1 xs:py-1.5 bg-black/50 backdrop-blur-sm text-white/60 text-xs font-medium rounded-md xs:rounded-lg border border-white/10">
                    {modalIndex + 1} / {images.length}
                  </span>
                )}

                {/* Download - icon only on mobile, text on larger */}
                <button
                  onClick={handleDownload}
                  className="cursor-pointer flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white text-xs font-medium tracking-wide rounded-md xs:rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Download image"
                >
                  <ArrowDownTrayIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                {/* Close */}
                <button
                  onClick={handleCloseModal}
                  className="cursor-pointer flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-md xs:rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                </button>
              </div>

              {/* Navigation arrows - repositioned for mobile */}
              {hasNavigation && (
                <>
                  <button
                    onClick={handlePrev}
                    className="cursor-pointer absolute left-1 xs:left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-md xs:rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer absolute right-1 xs:right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-md xs:rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                </>
              )}

              {/* Image - Responsive container */}
              <div
                className="relative w-full"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                <Image
                  src={images[modalIndex]?.image_url || PLACE_HOLDER_IMAGE}
                  alt={images[modalIndex]?.name || activityName}
                  width={1024}
                  height={768}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "calc(100vh - 120px)", display: "block" }}
                  sizes="(max-width: 480px) 320px, (max-width: 640px) 384px, (max-width: 768px) 448px, (max-width: 1024px) 512px, (max-width: 1280px) 576px, 768px"
                  priority
                />
              </div>

              {/* Caption - responsive padding */}
              {images[modalIndex]?.name && (
                <div className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 bg-neutral-900/95 border-t border-white/5">
                  <p className="text-xs xs:text-sm text-white/70 font-medium truncate">
                    {images[modalIndex].name}
                  </p>
                </div>
              )}
            </div>

            {/* Keyboard hints - hidden on mobile */}
            <p className="hidden sm:block mt-3 text-center text-xs text-white/30 tracking-wider">
              {hasNavigation ? (
                <>
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">
                    ←
                  </kbd>
                  {" / "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">
                    →
                  </kbd>
                  {" to navigate · "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">
                    ESC
                  </kbd>
                  {" to close"}
                </>
              ) : (
                <>
                  Press{" "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">
                    ESC
                  </kbd>
                  {" to close"}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityImages;
