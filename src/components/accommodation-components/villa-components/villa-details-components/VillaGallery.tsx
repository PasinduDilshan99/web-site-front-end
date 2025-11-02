// components/villa/VillaGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand, Image } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface VillaGalleryProps {
  images: ServiceProviderImage[] | null;
}

const VillaGallery: React.FC<VillaGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Handle null or empty images array
  if (!images || !images.length) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-200">
        <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-400 text-lg">No images available</div>
        <p className="text-gray-500 text-sm mt-2">Images will be added soon</p>
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
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-200">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
          {images.slice(0, 5).map((image, index) => (
            <div 
              key={image.imageId}
              className={`relative aspect-video cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.imageName || 'Villa image'}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = '/images/placeholder-villa.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {index === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
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
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-emerald-400 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-emerald-400 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl max-h-full relative">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName || 'Villa image'}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-villa.jpg';
              }}
            />
            <div className="text-white text-center mt-4 bg-black bg-opacity-50 p-3 rounded-lg">
              <div className="font-semibold">
                {images[selectedImage].imageName || 'Villa Image'}
              </div>
              {images[selectedImage].imageDescription && (
                <div className="text-sm opacity-90 mt-1">
                  {images[selectedImage].imageDescription}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VillaGallery;