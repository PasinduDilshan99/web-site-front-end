import { Vehicle } from '@/types/vehicle-types';
import React from 'react';

interface ImagesTabProps {
  vehicle: Vehicle;
}

const ImagesTab: React.FC<ImagesTabProps> = ({ vehicle }) => {
  if (vehicle.images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🖼️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Available</h3>
        <p className="text-gray-600">There are no images for this vehicle.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicle.images.map((image) => (
        <div
          key={image.imageId}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={image.imageUrl}
            alt={image.description}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{image.imageName}</h3>
            <p className="text-sm text-gray-600">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagesTab;