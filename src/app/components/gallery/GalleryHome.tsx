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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
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
        {/* Gallery Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bien reprité non telle baiser lhonneur
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {openImages.map((image) => (
            <div
              key={image.imageId}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              style={{ backgroundColor: image.color }}
              onMouseEnter={() => setHoveredImage(image.imageId)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative overflow-hidden">
                <Image
                  src={image.imageLink}
                  alt={image.imageName}
                  width={80}
                  height={80}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                {hoveredImage === image.imageId && (
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: image.hoverColor,
                      opacity: 0.3, // Semi-transparent overlay
                    }}
                  />
                )}

                {/* Hover Info Box */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 transform ${
                    hoveredImage === image.imageId
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                  }}
                >
                  <div className="text-white">
                    <h3 className="font-semibold text-sm mb-1">
                      {image.imageName}
                    </h3>
                    <p className="text-xs opacity-90">{image.location}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
                  {image.imageName}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {image.imageDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
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
                    {image.imageOwner}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {image.imageSource}
                  </span>
                </div>

                {image.imageSourceLink && (
                  <a
                    href={image.imageSourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors duration-200"
                  >
                    View Source →
                  </a>
                )}
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
