import React from 'react';
import { VehicleById } from '@/types/vehicle-types';

interface VehicleHeaderProps {
  vehicle: VehicleById;
}

export default function VehicleHeader({ vehicle }: VehicleHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {vehicle.specification.make.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {vehicle.specification.make} {vehicle.specification.model}
              </h1>
              <p className="text-gray-600 mt-1">
                {vehicle.specification.vehicleYear} • {vehicle.specification.generation} • {vehicle.specification.bodyType}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold text-sm">
              {vehicle.registrationNumber}
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
              vehicle.statusName === 'ACTIVE' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {vehicle.statusName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}