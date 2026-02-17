// components/villa/VillaGallery.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand, Image, Leaf } from 'lucide-react';
import { ServiceProviderImage } from '@/types/accommodations-types/service-provider-types';

interface VillaGalleryProps {
  images: ServiceProviderImage[] | null;
}

const VillaGallery: React.FC<VillaGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Handle null or empty images array
  if (!images || !images.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-[#1B4D3E]/10">
        <div className="relative inline-block">
          <Image className="w-20 h-20 text-[#1B4D3E]/30 mx-auto mb-4" />
          <Leaf className="w-8 h-8 text-[#428577]/30 absolute -top-2 -right-4" />
        </div>
        <div className="text-[#1B4D3E] text-lg font-medium">No images available</div>
        <p className="text-[#2E6B5C] text-sm mt-2">Images will be added to this luxury retreat soon</p>
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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#1B4D3E]/10">
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
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-villa.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
              </div>
              {index === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-[#1B4D3E]/80 flex items-center justify-center rounded-lg backdrop-blur-sm">
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
        <div className="fixed inset-0 bg-[#1B4D3E]/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#428577] transition-colors z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-[#428577] transition-colors z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-[#428577] transition-colors z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl max-h-full relative">
            <img
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].imageName || 'Villa image'}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-villa.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B4D3E] to-transparent p-6 rounded-b-2xl">
              <div className="text-white">
                <div className="font-semibold text-lg">
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
        </div>
      )}
    </>
  );
};

export default VillaGallery;