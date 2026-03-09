"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GalleryService } from "@/services/galleryService";
import { ActiveImagesType } from "@/types/gallery-types";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

// Gallery Image Component with Fallback
const GalleryImage = React.memo(({ 
  image, 
  width, 
  height, 
  sizes, 
  priority,
  rowIndex,
  index,
  onClick 
}: { 
  image: ActiveImagesType;
  width: number;
  height: number;
  sizes: string;
  priority: boolean;
  rowIndex: number;
  index: number;
  onClick: () => void;
}) => {
  const [imgSrc, setImgSrc] = useState(image.imageLink);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(image.imageLink);
    setHasError(false);
  }, [image.imageLink]);

  const handleError = () => {
    if (!hasError) {
      console.log(`Image failed to load for ${image.imageName}, using placeholder`);
      setImgSrc(PLACE_HOLDER_IMAGE);
      setHasError(true);
    }
  };

  return (
    <div
      className="flex-shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 relative group"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image
          key={`${image.imageId}-${hasError}-${rowIndex}-${index}`}
          src={imgSrc}
          alt={image.imageName}
          width={width}
          height={height}
          sizes={sizes}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          priority={priority}
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        
      </div>
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

const GalleryHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openImages, setOpenImages] = useState<ActiveImagesType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ActiveImagesType | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLaptop(width >= 1024 && width < 1536);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchOpenImages = async () => {
      try {
        setLoading(true);
        const { data: images, error } = await GalleryService.fetchOpenImages();

        if (error) {
          setError(error);
        } else {
          setOpenImages(images);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching open images:", err);
        setError("Something went wrong while fetching open images");
      } finally {
        setLoading(false);
      }
    };

    fetchOpenImages();
  }, []);

  // Calculate responsive image dimensions
  const getImageDimensions = () => {
    if (isMobile) return { width: 160, height: 160 };
    if (isTablet) return { width: 200, height: 200 };
    if (isLaptop) return { width: 240, height: 240 };
    return { width: 280, height: 280 };
  };

  const getImageSize = () => {
    if (isMobile) return "(max-width: 767px) 160px";
    if (isTablet) return "(max-width: 1023px) 200px";
    if (isLaptop) return "(max-width: 1535px) 240px";
    return "280px";
  };

  // Divide images based on screen size
  const getVisibleRows = () => {
    if (openImages.length === 0) return [[], [], []];

    const totalImages = openImages.length;
    let rows = 3;

    if (isMobile) rows = 2;
    if (isTablet) rows = 3;
    if (isLaptop) rows = 3;

    const imagesPerRow = Math.ceil(totalImages / rows);

    const result = [];
    for (let i = 0; i < rows; i++) {
      const start = i * imagesPerRow;
      const end = start + imagesPerRow;
      result.push(openImages.slice(start, end));
    }

    return result;
  };

  const visibleRows = getVisibleRows();

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEscape);

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [selectedImage]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get modal image height based on screen size
  const getModalImageHeight = () => {
    if (isMobile) return "h-64 sm:h-72";
    if (isTablet) return "h-80";
    return "h-96";
  };

  if (loading) {
    const { width, height } = getImageDimensions();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <div className="mx-auto">
          {/* Simple loading header */}
          <div className="flex justify-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">Loading gallery...</span>
            </div>
          </div>

          {/* Gallery Header Placeholders */}
          <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32 sm:w-48 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-gray-700 to-cyan-800/50 rounded w-48 sm:w-64 md:w-80 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-12 sm:w-16 mx-auto animate-pulse"></div>
          </div>

          {/* Gallery Images Grid */}
          <div className="max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">
            {[...Array(isMobile ? 2 : 3)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden justify-center"
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-lg animate-pulse border border-teal-500/20 relative overflow-hidden group"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      animationDelay: `${rowIndex * 100 + i * 50}ms`,
                    }}
                  >
                    {/* Image overlay with icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      <svg
                        className="w-8 h-8 text-teal-400/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent animate-shimmer"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  const CarouselRow = ({
    images,
    direction,
    rowIndex,
  }: {
    images: ActiveImagesType[];
    direction: "left" | "right";
    rowIndex: number;
  }) => {
    const { width, height } = getImageDimensions();
    const sizes = getImageSize();
    const duplicatedImages = [...images, ...images];

    return (
      <div className="relative overflow-hidden py-2 sm:py-3">
        <div
          className={`flex gap-3 sm:gap-4 md:gap-5 ${
            direction === "left"
              ? "animate-scroll-left"
              : "animate-scroll-right"
          }`}
          style={{ width: "fit-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <GalleryImage
              key={`${image.imageId}-${rowIndex}-${index}`}
              image={image}
              width={width}
              height={height}
              sizes={sizes}
              priority={rowIndex === 0 && index < 3}
              rowIndex={rowIndex}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-6 lg:py-8 xl:py-12">
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        /* Mobile */
        @media (max-width: 767px) {
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .animate-scroll-left {
            animation: scroll-left 50s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 50s linear infinite;
          }
        }

        /* Modal open - prevent body scroll */
        body.modal-open {
          overflow: hidden;
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 px-4">
        <SectionHeader
          subtitle=""
          title="Visual Diaries"
          description="A glimpse into unforgettable journeys"
          fromColor="#A855F7"
          toColor="#F59E0B"
        />
      </div>

      {/* Gallery Images */}
      <div className="max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-5">
        {visibleRows.map(
          (rowImages, index) =>
            rowImages.length > 0 && (
              <CarouselRow
                key={`row-${index}`}
                images={rowImages}
                direction={index % 2 === 0 ? "left" : "right"}
                rowIndex={index}
              />
            ),
        )}

        {openImages.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Gallery is Empty
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                No images available at the moment. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Improved Responsive Modal */}
      {selectedImage && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6">
            <div
              className={`bg-white rounded-xl shadow-2xl w-full ${
                isMobile
                  ? "max-w-full mx-2 my-4"
                  : isTablet
                    ? "max-w-4xl my-6"
                    : "max-w-5xl my-8"
              } max-h-[95vh] overflow-hidden animate-scaleIn`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="flex flex-col h-full">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate pr-2">
                    {selectedImage.imageName}
                  </h2>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                    aria-label="Close"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                  {/* Image Section - Larger with fallback */}
                  <div
                    className={`${getModalImageHeight()} relative flex-shrink-0 w-full bg-gradient-to-br from-gray-100 to-gray-200`}
                  >
                    <div className="relative w-full h-full">
                      <ModalImage 
                        image={selectedImage} 
                        isMobile={isMobile} 
                        isTablet={isTablet} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent"></div>
                    </div>
                  </div>

                  {/* Details Section - Two Column Layout */}
                  <div className="px-4 sm:px-6 py-4 sm:py-5 md:py-6">
                    {/* Two Column Grid for Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Photographer */}
                        <div className="p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                            <span className="inline-flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              Photographer
                            </span>
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800">
                            {selectedImage.imageOwner || "Unknown"}
                          </p>
                        </div>

                        {/* Location */}
                        {selectedImage.location && (
                          <div className="p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                              <span className="inline-flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                Location
                              </span>
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-gray-800">
                              {selectedImage.location}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        {/* Description */}
                        {selectedImage.imageDescription && (
                          <div className="p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                              <span className="inline-flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-amber-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Description
                              </span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {selectedImage.imageDescription}
                            </p>
                          </div>
                        )}

                        {/* Uploaded Date */}
                        <div className="p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                            <span className="inline-flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              Uploaded
                            </span>
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800">
                            {formatDate(selectedImage.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Footer - Full Width */}
                    <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-2">
                        {[0, 0.2, 0.4, 0.6, 0.8].map((delay) => (
                          <div
                            key={delay}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-pulse"
                            style={{ animationDelay: `${delay}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(10px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Add animation for the decorative dots */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.9);
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Modal Image Component with Fallback
const ModalImage = React.memo(({ 
  image, 
  isMobile, 
  isTablet 
}: { 
  image: ActiveImagesType;
  isMobile: boolean;
  isTablet: boolean;
}) => {
  const [imgSrc, setImgSrc] = useState(image.imageLink);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(image.imageLink);
    setHasError(false);
  }, [image.imageLink]);

  const handleError = () => {
    if (!hasError) {
      console.log(`Modal image failed to load for ${image.imageName}, using placeholder`);
      setImgSrc(PLACE_HOLDER_IMAGE);
      setHasError(true);
    }
  };

  return (
    <>
      <Image
        src={imgSrc}
        alt={image.imageName}
        fill
        sizes={isMobile ? "100vw" : isTablet ? "75vw" : "60vw"}
        className="object-contain"
        priority
        onError={handleError}
      />
      {/* {hasError && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Using fallback image</span>
        </div>
      )} */}
    </>
  );
});

ModalImage.displayName = 'ModalImage';

export default GalleryHome;