// components/destination/ImageModal.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  imageTitle?: string;
  currentIndex?: number;
  totalImages?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const DestinationImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  imageTitle,
  currentIndex,
  totalImages,
  onPrev,
  onNext,
}) => {
  const hasNavigation = onPrev && onNext && totalImages && totalImages > 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageTitle || "download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 md:mx-8 lg:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image card */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">

          {/* Top-right action buttons */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {/* Image counter */}
            {hasNavigation && (
              <span className="px-2.5 py-1.5 bg-black/50 backdrop-blur-sm text-white/60 text-xs font-medium rounded-lg border border-white/10">
                {(currentIndex ?? 0) + 1} / {totalImages}
              </span>
            )}

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white text-xs font-medium tracking-wide rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Download image"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="cursor-pointer flex items-center justify-center w-8 h-8 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Prev button */}
          {hasNavigation && (
            <button
              onClick={onPrev}
              className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          )}

          {/* Next button */}
          {hasNavigation && (
            <button
              onClick={onNext}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div className="relative w-full" style={{ maxHeight: "82vh" }}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1280}
              height={800}
              className="w-full h-auto object-contain"
              style={{ maxHeight: "82vh", display: "block" }}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>

          {/* Caption bar */}
          {imageTitle && (
            <div className="px-5 py-3 bg-neutral-900/95 border-t border-white/5">
              <p className="text-sm text-white/70 font-medium truncate">
                {imageTitle}
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
  );
};

export default DestinationImageModal;