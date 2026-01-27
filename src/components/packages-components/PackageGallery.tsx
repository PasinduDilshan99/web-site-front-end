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
      <div className="bg-gray-200 rounded-xl sm:rounded-2xl h-64 sm:h-80 md:h-96 flex items-center justify-center">
        <div className="text-gray-500 text-base sm:text-lg">No images available</div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200">
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
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
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
              className={`relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-purple-500 ring-1 sm:ring-2 ring-purple-300'
                  : 'border-transparent hover:border-gray-300'
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
              <div className="absolute bottom-1 left-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                {image.type === 'package' ? 'P' : 'T'}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageGallery;