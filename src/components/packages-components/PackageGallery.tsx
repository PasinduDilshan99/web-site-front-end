// components/package/PackageGallery.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

interface GalleryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  type: "package" | "tour";
}

interface PackageGalleryProps {
  images: GalleryImage[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

const PackageGallery: React.FC<PackageGalleryProps> = ({
  images,
  selectedImageIndex,
  onImageSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const hasNavigation = images.length > 1;

  const handleOpenModal = () => {
    setModalIndex(selectedImageIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePrev = () =>
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () => setModalIndex((prev) => (prev + 1) % images.length);

  const handleDownload = async () => {
    const image = images[modalIndex];
    if (!image) return;
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${image.imageName || "image"}.jpg`;
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

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (images.length === 0) {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-xl sm:rounded-2xl h-64 sm:h-80 md:h-96 flex items-center justify-center border-2 border-sky-200">
        <div className="text-sky-700 text-base sm:text-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          No images available
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];
  const modalImage = images[modalIndex];

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-teal-100 border-2 border-sky-200">
          <Image
            src={selectedImage.imageUrl}
            alt={selectedImage.imageDescription || selectedImage.imageName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
            }}
          />

          {/* Image type badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-sky-600/90 to-teal-600/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
            {selectedImage.type === "package" ? "Package" : "Tour"} Image
          </div>

          {/* Zoom overlay */}
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
        </div>

        {/* Thumbnail Grid */}
        {hasNavigation && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-2">
            {images.map((image, index) => {
              const uniqueKey = `${image.type}-${image.imageId}-${index}`;

              return (
                <button
                  key={uniqueKey}
                  onClick={() => onImageSelect(index)}
                  className={`cursor-pointer relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedImageIndex
                      ? "border-sky-500 ring-1 sm:ring-2 ring-sky-300 shadow-lg scale-[1.02]"
                      : "border-transparent hover:border-sky-300 hover:shadow-md"
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.imageDescription || image.imageName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 14vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
                    }}
                  />
                  {/* Type badge */}
                  <div
                    className={`absolute bottom-1 left-1 text-white px-1.5 py-0.5 rounded text-xs font-medium ${
                      image.type === "package"
                        ? "bg-sky-600/90"
                        : "bg-teal-600/90"
                    }`}
                  >
                    {image.type === "package" ? "P" : "T"}
                  </div>

                  {index === selectedImageIndex && (
                    <div className="absolute inset-0 border-2 border-sky-400 rounded-lg pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl mx-4 md:mx-8 lg:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              {/* Top-right actions */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                {hasNavigation && (
                  <span className="px-2.5 py-1.5 bg-black/50 backdrop-blur-sm text-white/60 text-xs font-medium rounded-lg border border-white/10">
                    {modalIndex + 1} / {images.length}
                  </span>
                )}
                <button
                  onClick={handleDownload}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white text-xs font-medium tracking-wide rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
                  aria-label="Download image"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
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
                  src={modalImage.imageUrl}
                  alt={modalImage.imageDescription || modalImage.imageName}
                  width={1280}
                  height={800}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "82vh", display: "block" }}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
                  }}
                />
              </div>

              {/* Caption + type badge */}
              <div className="px-5 py-3 bg-neutral-900/95 border-t border-white/5 flex items-center justify-between gap-3">
                <p className="text-sm text-white/70 font-medium truncate">
                  {modalImage.imageDescription || modalImage.imageName}
                </p>
                <span
                  className={`flex-shrink-0 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${
                    modalImage.type === "package"
                      ? "bg-sky-600/80"
                      : "bg-teal-600/80"
                  }`}
                >
                  {modalImage.type === "package" ? "Package" : "Tour"}
                </span>
              </div>
            </div>

            {/* Keyboard hints */}
            <p className="mt-3 text-center text-xs text-white/30 tracking-wider">
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

export default PackageGallery;
