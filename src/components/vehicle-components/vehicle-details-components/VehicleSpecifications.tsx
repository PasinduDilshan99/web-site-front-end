import React from 'react';
import { SpecificationById } from '@/types/vehicle-types';

interface VehicleSpecificationsProps {
  specification: SpecificationById;
}

export default function VehicleSpecifications({ specification }: VehicleSpecificationsProps) {
  const specs = [
    { label: 'Engine', value: `${specification.engineType} ${specification.engineCapacity}` },
    { label: 'Horsepower', value: `${specification.horsepowerHp} HP` },
    { label: 'Torque', value: `${specification.torqueNm} Nm` },
    { label: 'Transmission', value: specification.transmissionTypeName },
    { label: 'Fuel Type', value: specification.fuelTypeName },
    { label: 'Drivetrain', value: specification.drivetrain },
    { label: 'Top Speed', value: `${specification.topSpeedKmh} km/h` },
    { label: 'Acceleration 0-100', value: `${specification.acceleration0100}s` },
    { label: 'Doors', value: specification.doors },
    { label: 'Seat Capacity', value: specification.seatCapacity },
    { label: 'Fuel Tank', value: `${specification.fuelTankCapacityLiters}L` },
    { label: 'Warranty', value: `${specification.warrantyYears} years` },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
        Vehicle Specifications
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 font-medium">{spec.label}</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">{spec.value}</div>
          </div>
        ))}
      </div>
      
      {/* Additional Features */}
      {(specification.entertainmentFeatures || specification.comfortFeatures || specification.safetyFeatures) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Features</h3>
          <div className="space-y-2">
            {specification.entertainmentFeatures && (
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Entertainment: {specification.entertainmentFeatures}
              </div>
            )}
            {specification.comfortFeatures && (
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Comfort: {specification.comfortFeatures}
              </div>
            )}
            {specification.safetyFeatures && (
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Safety: {specification.safetyFeatures}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}