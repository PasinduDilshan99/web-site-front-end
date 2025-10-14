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
      <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
        <div className="text-gray-500 text-lg">No images available</div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-200">
        <Image
          src={selectedImage.imageUrl}
          alt={selectedImage.imageDescription}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />
        {/* Image Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage.type === 'package' ? 'Package' : 'Tour'} Image
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.imageId}
              onClick={() => onImageSelect(index)}
              className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-purple-500 ring-2 ring-purple-300'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.imageDescription}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder.jpg";
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