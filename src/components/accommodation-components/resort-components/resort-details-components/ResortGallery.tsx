// components/resort/ResortGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface ResortGalleryProps {
  images: ServiceProviderImage[];
}

const ResortGallery: React.FC<ResortGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-teal-200">
        <div className="text-gray-400 text-xl">No images available</div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-teal-200">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
          {images.slice(0, 5).map((image, index) => (
            <div 
              key={image.imageId}
              className={`relative aspect-square cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.imageName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {index === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
                  <span className="text-white text-lg font-semibold">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-teal-400 transition-colors z-10"
          >
            <X className="w-10 h-10" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-teal-400 transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-teal-400 transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          
          <div className="max-w-6xl max-h-full relative">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full backdrop-blur-sm">
              {images[selectedImage].imageName}
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedImage 
                    ? 'bg-teal-400 scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ResortGallery;