"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";

interface ImageModalProps {
  imageModal: {
    isOpen: boolean;
    data: {
      imageUrl: string;
      title: string;
      description?: string;
      type: "destination" | "activity";
    } | null;
    images: Array<{ url: string; title: string; description?: string }>;
    currentIndex: number;
  };
  isClosingModal: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onDownload: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageModal,
  isClosingModal,
  onClose,
  onNavigate,
  onDownload,
}) => {
  const getAnimationStyles = {
    backdrop: (isOpen: boolean, isClosing: boolean) => ({
      opacity: isOpen && !isClosing ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    }),
    content: (isOpen: boolean, isClosing: boolean) => ({
      opacity: isOpen && !isClosing ? 1 : 0,
      transform: isOpen && !isClosing ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={getAnimationStyles.backdrop(imageModal.isOpen, isClosingModal)}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-10"
        style={getAnimationStyles.content(imageModal.isOpen, isClosingModal)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {imageModal.data?.title}
            </h3>
            {imageModal.data?.description && (
              <p className="text-gray-600 mt-1">
                {imageModal.data.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full transition-transform duration-300 hover:scale-105">
                {imageModal.data?.type === "destination"
                  ? "Destination"
                  : "Activity"}{" "}
                Image
              </span>
              {imageModal.images.length > 1 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full transition-transform duration-300 hover:scale-105">
                  {imageModal.currentIndex + 1} of {imageModal.images.length}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[60vh] bg-gray-100">
          {imageModal.data && (
            <Image
              src={imageModal.data.imageUrl}
              alt={imageModal.data.title}
              fill
              className="object-contain transition-opacity duration-300"
              sizes="100vw"
              priority
            />
          )}

          {/* Navigation Arrows */}
          {imageModal.images.length > 1 && (
            <>
              <button
                onClick={() => onNavigate("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={() => onNavigate("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {imageModal.images.length > 1 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex overflow-x-auto space-x-3 pb-2">
              {imageModal.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate("goto");
                    // You might want to add a separate handler for direct thumbnail click
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    idx === imageModal.currentIndex
                      ? "ring-2 ring-purple-500 ring-offset-2 scale-105"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="80px"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;