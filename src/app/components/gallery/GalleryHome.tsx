"use client";
import { GET_OPEN_GALLERY_FE } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define the interface for your API response data
interface OpenImagesType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  location: string;
  imageLink: string;
  imageOwner: string;
  imageSource: string;
  imageSourceLink: string;
  color: string;
  hoverColor: string;
  imageStatus: string;
  imageStatusStatus: string;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

const GalleryHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openImages, setOpenImages] = useState<OpenImagesType[]>([]);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<OpenImagesType | null>(null);

  useEffect(() => {
    const fetchOpenImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_OPEN_GALLERY_FE);
        const data = await response.json();

        if (response.ok) {
          const items: OpenImagesType[] = data.data || [];
          setOpenImages(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch open images");
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

  // Divide images into three equal parts
  const divideIntoRows = (images: OpenImagesType[]) => {
    const totalImages = images.length;
    const imagesPerRow = Math.ceil(totalImages / 3);

    return [
      images.slice(0, imagesPerRow),
      images.slice(imagesPerRow, imagesPerRow * 2),
      images.slice(imagesPerRow * 2),
    ];
  };

  const [row1, row2, row3] =
    openImages.length > 0 ? divideIntoRows(openImages) : [[], [], []];

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        {/* Header Section Loading State */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-32 sm:w-48 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded w-48 sm:w-64 md:w-80 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
          <div className="h-1 bg-gray-300 rounded w-12 sm:w-16 mx-auto animate-pulse"></div>
        </div>

        <div className="max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 bg-gray-300 rounded animate-pulse"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-red-500 text-base sm:text-lg font-semibold mb-2">
            Error Loading Gallery
          </div>
          <div className="text-gray-600 text-sm sm:text-base">{error}</div>
        </div>
      </div>
    );
  }

  const CarouselRow = ({
    images,
    direction,
  }: {
    images: OpenImagesType[];
    direction: "left" | "right";
  }) => {
    // Duplicate images for infinite scroll effect
    const duplicatedImages = [...images, ...images];

    return (
      <div className="relative overflow-hidden py-1 sm:py-2">
        <div
          className={`flex gap-2 sm:gap-3 md:gap-4 ${
            direction === "left"
              ? "animate-scroll-left"
              : "animate-scroll-right"
          }`}
          style={{
            width: "fit-content",
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.imageId}-${index}`}
              className="relative flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={image.imageLink}
                  alt={image.imageName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-gray-50 py-4 sm:py-6 md:py-8">
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

        // .animate-scroll-left:hover,
        // .animate-scroll-right:hover {
        //   animation-play-state: paused;
        // }

        /* Faster animation on mobile */
        @media (max-width: 640px) {
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
        }

        /* Medium speed on tablets */
        @media (min-width: 641px) and (max-width: 1024px) {
          .animate-scroll-left {
            animation: scroll-left 50s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 50s linear infinite;
          }
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden;
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 px-4">
        <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
          asho asfg oasf wwqe qw 
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight px-4">
          GALLERY
        </h2>
        <div className="mt-3 sm:mt-4 md:mt-6 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
      </div>

      <div className="max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">
        {/* Row 1: Left to Right */}
        {row1.length > 0 && <CarouselRow images={row1} direction="left" />}

        {/* Row 2: Right to Left */}
        {row2.length > 0 && <CarouselRow images={row2} direction="right" />}

        {/* Row 3: Left to Right */}
        {row3.length > 0 && <CarouselRow images={row3} direction="left" />}

        {/* Empty State */}
        {openImages.length === 0 && (
          <div className="text-center py-8 sm:py-12 md:py-16 px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 max-w-md mx-auto">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No Images Available
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                There are currently no images in the gallery.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Image Details */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image Section */}
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={selectedImage.imageLink}
                  alt={selectedImage.imageName}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: selectedImage.hoverColor,
                    opacity: 0.1,
                  }}
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between py-4">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      {selectedImage.imageName}
                    </h2>
                    <div
                      className="w-20 h-1 rounded-full"
                      style={{ backgroundColor: selectedImage.hoverColor }}
                    ></div>
                  </div>

                  {/* Owner */}
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                      Owner
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedImage.imageOwner}
                    </p>
                  </div>

                  {/* Location */}
                  {selectedImage.location && (
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedImage.location}
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {selectedImage.imageDescription && (
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        Description
                      </p>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {selectedImage.imageDescription}
                      </p>
                    </div>
                  )}

                  {/* Source */}
                  {selectedImage.imageSource && (
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        Source
                      </p>
                      {selectedImage.imageSourceLink ? (
                        <a
                          href={selectedImage.imageSourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {selectedImage.imageSource}
                        </a>
                      ) : (
                        <p className="text-base text-gray-700">
                          {selectedImage.imageSource}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                {selectedImage.imageStatus && (
                  <div className="mt-6">
                    <span
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: selectedImage.hoverColor }}
                    >
                      {selectedImage.imageStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GalleryHome;