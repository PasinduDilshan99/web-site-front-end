// components/hotel/HotelGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface HotelGalleryProps {
  images: ServiceProviderImage[];
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-[#2A6F97]/10">
        <div className="text-[#2A6F97] text-6xl mb-4 opacity-30">🏨</div>
        <div className="text-[#1D4F6E] text-lg font-medium">No images available</div>
        <p className="text-[#3F8AB2] text-sm mt-2">Images will be added soon</p>
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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#2A6F97]/10 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-1">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={image.imageId}
              className={`relative aspect-video cursor-pointer group overflow-hidden ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.imageName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A6F97]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
              </div>
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-[#2A6F97]/80 backdrop-blur-sm flex items-center justify-center">
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
        <div className="fixed inset-0 bg-[#1D4F6E]/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#54A5CC] transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-[#54A5CC] transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-[#54A5CC] transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl max-h-full">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-white text-center mt-4 bg-black/30 p-3 rounded-lg backdrop-blur-sm">
              {images[selectedImage].imageName}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelGallery;