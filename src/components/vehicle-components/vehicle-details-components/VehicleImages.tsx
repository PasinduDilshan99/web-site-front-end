import React, { useState } from 'react';
import { VehicleImageById, SpecificationImage } from '@/types/vehicle-types';

interface VehicleImagesProps {
  vehicleImages: VehicleImageById[];
  specificationImages: SpecificationImage[];
}

export default function VehicleImages({ vehicleImages, specificationImages }: VehicleImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    vehicleImages[0]?.vehicleImageUrl || null
  );

  const allImages = [
    ...vehicleImages.map(img => ({
      url: img.vehicleImageUrl,
      name: img.vehicleImageName,
      description: img.vehicleImageDescription,
      type: 'Vehicle'
    })),
    ...specificationImages.map(img => ({
      url: img.specificationImageUrl,
      name: img.specificationImageName,
      description: img.specificationImageDescription,
      type: 'Specification'
    }))
  ].filter(img => img.url);

  if (allImages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Images</h2>
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
        Vehicle Images
      </h2>
      
      {/* Main Image */}
      <div className="mb-4">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt="Selected vehicle"
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <span className="text-gray-500">Select an image</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image.url)}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
              selectedImage === image.url ? 'border-amber-500' : 'border-transparent'
            }`}
          >
            <img 
              src={image.url!} 
              alt={image.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}