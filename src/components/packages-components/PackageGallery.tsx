import React from "react";
import Image from "next/image";

interface GalleryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  type: 'package' | 'tour';
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
  if (images.length === 0) {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-xl sm:rounded-2xl h-64 sm:h-80 md:h-96 flex items-center justify-center border-2 border-sky-200">
        <div className="text-sky-700 text-base sm:text-lg flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          No images available
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
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
            (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
          }}
        />
        {/* Image Badge */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-sky-600/90 to-teal-600/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
          {selectedImage.type === 'package' ? 'Package' : 'Tour'} Image
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-2">
          {images.map((image, index) => (
            <button
              key={image.imageId}
              onClick={() => onImageSelect(index)}
              className={`relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-sky-500 ring-1 sm:ring-2 ring-sky-300 shadow-lg scale-[1.02]'
                  : 'border-transparent hover:border-sky-300 hover:shadow-md'
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.imageDescription || image.imageName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 14vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                }}
              />
              {/* Thumbnail Badge */}
              <div className={`absolute bottom-1 left-1 text-white px-1.5 py-0.5 rounded text-xs font-medium ${
                image.type === 'package' 
                  ? 'bg-sky-600/90' 
                  : 'bg-teal-600/90'
              }`}>
                {image.type === 'package' ? 'P' : 'T'}
              </div>
              
              {/* Selection Indicator */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 border-2 border-sky-400 rounded-lg pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageGallery;