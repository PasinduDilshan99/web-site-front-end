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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Error Loading Gallery
          </div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid Only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {openImages.map((image) => (
            <div
              key={image.imageId}
              className="group relative aspect-square rounded-lg overflow-hidden transition-all duration-300"
              onMouseEnter={() => setHoveredImage(image.imageId)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={image.imageLink}
                  alt={image.imageName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                {hoveredImage === image.imageId && (
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: image.hoverColor,
                      mixBlendMode: "multiply",
                    }}
                  />
                )}

                {/* Hover Info (Optional - shows only on hover) */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-2 transition-all duration-300 transform ${
                    hoveredImage === image.imageId
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  }}
                >
                  <div className="text-white">
                    <h3 className="font-semibold text-xs mb-1 truncate">
                      {image.imageName}
                    </h3>
                    <p className="text-xs opacity-90 truncate">
                      {image.imageOwner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {openImages.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Images Available
              </h3>
              <p className="text-gray-600">
                There are currently no images in the gallery.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryHome;