// components/vehicle/VehicleImages.tsx
import React, { useState, useEffect } from "react";
import { VehicleImageById, SpecificationImage } from "@/types/vehicle-types";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

interface VehicleImagesProps {
  vehicleImages: VehicleImageById[];
  specificationImages: SpecificationImage[];
}

export default function VehicleImages({
  vehicleImages,
  specificationImages,
}: VehicleImagesProps) {
  const allImages = [
    ...vehicleImages.map((img) => ({
      url: img.vehicleImageUrl,
      name: img.vehicleImageName,
      description: img.vehicleImageDescription,
      type: "Vehicle",
    })),
    ...specificationImages.map((img) => ({
      url: img.specificationImageUrl,
      name: img.specificationImageName,
      description: img.specificationImageDescription,
      type: "Specification",
    })),
  ].filter((img) => img.url);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const hasNavigation = allImages.length > 1;

  const handleOpenModal = () => {
    setModalIndex(selectedIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePrev = () =>
    setModalIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleNext = () =>
    setModalIndex((prev) => (prev + 1) % allImages.length);

  const handleDownload = async () => {
    const image = allImages[modalIndex];
    if (!image?.url) return;
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${image.name || "vehicle-image"}.jpg`;
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

  if (allImages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Images</h2>
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  const selectedImage = allImages[selectedIndex];
  const modalImage = allImages[modalIndex];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-6 bg-cyan-600 rounded-full mr-3"></span>
          Vehicle Images
        </h2>

        {/* Main Image */}
        <div className="mb-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={selectedImage.url! || PLACE_HOLDER_IMAGE}
              alt={selectedImage.name || "Selected vehicle"}
              width={2000}
              height={2000}
              className="w-full h-64 object-cover"
            />

            {/* Type badge */}
            <div
              className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow backdrop-blur-sm ${
                selectedImage.type === "Vehicle"
                  ? "bg-cyan-600/90"
                  : "bg-teal-600/90"
              }`}
            >
              {selectedImage.type}
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
        </div>

        {/* Thumbnail Grid */}
        {hasNavigation && (
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedIndex === index
                    ? "border-teal-500 ring-2 ring-teal-200 scale-[1.02] shadow-md"
                    : "border-transparent hover:border-teal-300 hover:shadow-sm"
                }`}
              >
                <Image
                  src={image.url! || PLACE_HOLDER_IMAGE}
                  alt={image.name}
                  width={2000}
                  height={2000}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
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
                    {modalIndex + 1} / {allImages.length}
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
                  src={modalImage.url! || PLACE_HOLDER_IMAGE}
                  width={2000}
                  height={2000}
                  alt={modalImage.description || modalImage.name}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "82vh", display: "block" }}
                />
              </div>

              {/* Caption + type badge */}
              <div className="px-5 py-3 bg-neutral-900/95 border-t border-white/5 flex items-center justify-between gap-3">
                <p className="text-sm text-white/70 font-medium truncate">
                  {modalImage.description || modalImage.name}
                </p>
                <span
                  className={`flex-shrink-0 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${
                    modalImage.type === "Vehicle"
                      ? "bg-cyan-600/80"
                      : "bg-teal-600/80"
                  }`}
                >
                  {modalImage.type}
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
}
