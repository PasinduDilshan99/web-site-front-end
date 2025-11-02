// components/hostel/HostelGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface HostelGalleryProps {
  images: ServiceProviderImage[];
}

const HostelGallery: React.FC<HostelGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-200">
        <div className="text-gray-400 text-lg">No images available</div>
      </div>
    );
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={image.imageId}
              className={`relative aspect-video cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.imageName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{images.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-blue-400 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl max-h-full">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName}
              className="max-w-full max-h-full object-contain"
            />
            <div className="text-white text-center mt-4">
              {images[selectedImage].imageName}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HostelGallery;