import { Vehicle } from '@/types/vehicle-types';
import React from 'react';

interface SpecificationsTabProps {
  vehicle: Vehicle;
}

const SpecificationsTab: React.FC<SpecificationsTabProps> = ({ vehicle }) => {
  const spec = vehicle.specification;

  const specificationGroups = [
    {
      title: 'Engine & Performance',
      icon: '⚡',
      specs: [
        { label: 'Engine Type', value: spec.engineType },
        { label: 'Engine Capacity', value: spec.engineCapacity },
        { label: 'Horsepower', value: `${spec.horsepowerHp} HP` },
        { label: 'Torque', value: `${spec.torqueNm} Nm` },
        { label: 'Transmission', value: `Type ${spec.transmissionTypeId}` },
        { label: 'Drivetrain', value: spec.drivetrain },
      ],
    },
    {
      title: 'Dimensions & Capacity',
      icon: '📏',
      specs: [
        { label: 'Doors', value: spec.doors },
        { label: 'Seat Capacity', value: spec.seatCapacity },
        { label: 'Fuel Tank Capacity', value: `${spec.fuelTankCapacityLiters}L` },
        { label: 'Electric Range', value: spec.electricRangeKm ? `${spec.electricRangeKm} km` : 'N/A' },
      ],
    },
    {
      title: 'Features',
      icon: '🎯',
      specs: [
        { label: 'AC Type', value: `Type ${spec.acTypeId}` },
        { label: 'Sunroof', value: spec.sunroofType },
        { label: 'Cruise Control', value: spec.cruiseControlType },
        { label: 'Lane Departure Warning', value: spec.laneDepartureWarning ? 'Yes' : 'No' },
        { label: 'Airbags', value: spec.airbagsCount },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {specificationGroups.map((group, index) => (
        <div
          key={group.title}
          className={`p-6 rounded-lg border ${
            index % 2 === 0
              ? 'bg-gradient-to-br from-amber-50 to-white border-amber-100'
              : 'bg-gradient-to-br from-purple-50 to-white border-purple-100'
          }`}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <span className="mr-2">{group.icon}</span>
            {group.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.specs.map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">{item.label}:</span>
                <span className="text-gray-900">{item.value || 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecificationsTab;