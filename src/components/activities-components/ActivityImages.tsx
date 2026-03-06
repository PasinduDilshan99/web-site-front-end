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

  const handleNext = () =>
    setModalIndex((prev) => (prev + 1) % images.length);

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
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-96 lg:h-[500px]">
            {hasImages ? (
              <>
                <Image
                  src={images[selectedImageIndex]?.image_url || PLACE_HOLDER_IMAGE}
                  alt={images[selectedImageIndex]?.name || activityName}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Clickable overlay with zoom hint */}
                <button
                  onClick={handleOpenModal}
                  className="cursor-pointer absolute inset-0 group flex items-center justify-center"
                  aria-label="View full image"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20">
                    <MagnifyingGlassPlusIcon className="w-4 h-4" />
                    View Full Image
                  </span>
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Images */}
        {hasNavigation && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "border-cyan-500 scale-105 shadow-md"
                    : "border-gray-300 hover:border-cyan-300"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={image.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen Modal */}
      {isModalOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl mx-4 md:mx-8 lg:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">

              {/* Top-right action buttons */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                {/* Counter */}
                {hasNavigation && (
                  <span className="px-2.5 py-1.5 bg-black/50 backdrop-blur-sm text-white/60 text-xs font-medium rounded-lg border border-white/10">
                    {modalIndex + 1} / {images.length}
                  </span>
                )}

                {/* Download */}
                <button
                  onClick={handleDownload}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white text-xs font-medium tracking-wide rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Download image"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                {/* Close */}
                <button
                  onClick={handleCloseModal}
                  className="cursor-pointer flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Prev */}
              {hasNavigation && (
                <button
                  onClick={handlePrev}
                  className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
              )}

              {/* Next */}
              {hasNavigation && (
                <button
                  onClick={handleNext}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full" style={{ maxHeight: "82vh" }}>
                <Image
                  src={images[modalIndex]?.image_url || PLACE_HOLDER_IMAGE}
                  alt={images[modalIndex]?.name || activityName}
                  width={1280}
                  height={800}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "82vh", display: "block" }}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              {/* Caption */}
              {images[modalIndex]?.name && (
                <div className="px-5 py-3 bg-neutral-900/95 border-t border-white/5">
                  <p className="text-sm text-white/70 font-medium truncate">
                    {images[modalIndex].name}
                  </p>
                </div>
              )}
            </div>

            {/* Keyboard hints */}
            <p className="mt-3 text-center text-xs text-white/30 tracking-wider">
              {hasNavigation ? (
                <>
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">←</kbd>
                  {" / "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">→</kbd>
                  {" to navigate · "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">ESC</kbd>
                  {" to close"}
                </>
              ) : (
                <>
                  Press{" "}
                  <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/40">ESC</kbd>
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