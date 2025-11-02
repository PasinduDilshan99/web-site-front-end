import { Vehicle } from '@/types/vehicle-types';
import React from 'react';

interface UsageTabProps {
  vehicle: Vehicle;
}

const UsageTab: React.FC<UsageTabProps> = ({ vehicle }) => {
  if (vehicle.usageLogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Usage History</h3>
        <p className="text-gray-600">This vehicle hasnt been used yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vehicle.usageLogs.map((log) => (
        <div
          key={log.usageId}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{log.purpose}</h3>
              <p className="text-gray-600">{log.routeDescription}</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {new Date(log.startDatetime).toLocaleDateString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Distance:</span>
              <p className="text-gray-900">{log.endOdometer - log.startOdometer} km</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Fuel Used:</span>
              <p className="text-gray-900">{log.fuelUsedLiters} L</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <p className="text-gray-900">
                {new Date(log.startDatetime).toLocaleTimeString()} - {new Date(log.endDatetime).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Remarks:</span>
              <p className="text-gray-900">{log.remarks}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsageTab;