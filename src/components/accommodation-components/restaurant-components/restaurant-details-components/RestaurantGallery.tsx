// components/restaurant/RestaurantGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Waves } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface RestaurantGalleryProps {
  images: ServiceProviderImage[];
}

const RestaurantGallery: React.FC<RestaurantGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-[#3A9B9B]/10">
        <Waves className="w-16 h-16 text-[#3A9B9B]/30 mx-auto mb-4" />
        <div className="text-[#3A9B9B] text-lg font-medium">No images available</div>
        <p className="text-[#5FB3B3] text-sm mt-2">Coastal gallery images coming soon</p>
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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#3A9B9B]/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={image.imageId}
              className={`relative aspect-video cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.imageName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A9B9B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-[#3A9B9B]/70 flex items-center justify-center backdrop-blur-sm">
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
        <div className="fixed inset-0 bg-[#3A9B9B]/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#84CACA] transition-colors bg-black/20 p-2 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-[#84CACA] transition-colors bg-black/20 p-2 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-[#84CACA] transition-colors bg-black/20 p-2 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl max-h-full">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-white text-center mt-4 bg-black/30 p-3 rounded-xl backdrop-blur-sm">
              {images[selectedImage].imageName}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantGallery;