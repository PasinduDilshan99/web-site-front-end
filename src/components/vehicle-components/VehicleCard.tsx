import { Vehicle } from '@/types/vehicle-types';
import React from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onClick: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, isSelected, onClick }) => {
  const primaryImage = vehicle.images[0]?.imageUrl;
  
  return (
    <div
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-amber-500 bg-amber-50 shadow-lg'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        {primaryImage && (
          <img
            src={primaryImage}
            alt={vehicle.specification.make}
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {vehicle.specification.make} {vehicle.specification.model}
          </h3>
          <p className="text-sm text-gray-600">{vehicle.registrationNumber}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              vehicle.status === 'ACTIVE' 
                ? 'bg-green-100 text-green-800'
                : vehicle.status === 'MAINTENANCE'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {vehicle.status}
            </span>
            <span className="text-xs text-gray-500">{vehicle.specification.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;