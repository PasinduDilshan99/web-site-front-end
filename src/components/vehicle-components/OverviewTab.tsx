import { Vehicle } from '@/types/vehicle-types';
import React from 'react';

interface OverviewTabProps {
  vehicle: Vehicle;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ vehicle }) => {
  const spec = vehicle.specification;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-purple-50 p-6 rounded-lg border border-amber-100">
          <h3 className="font-semibold text-amber-800 mb-2">Basic Info</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Make:</span> {spec.make}</p>
            <p><span className="font-medium">Model:</span> {spec.model}</p>
            <p><span className="font-medium">Year:</span> {spec.year}</p>
            <p><span className="font-medium">Body Type:</span> {spec.bodyType}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-amber-50 p-6 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-purple-800 mb-2">Performance</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Engine:</span> {spec.engineType}</p>
            <p><span className="font-medium">Horsepower:</span> {spec.horsepowerHp} HP</p>
            <p><span className="font-medium">Top Speed:</span> {spec.topSpeedKmh} km/h</p>
            <p><span className="font-medium">0-100 km/h:</span> {spec.acceleration0To100}s</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-purple-50 p-6 rounded-lg border border-amber-100">
          <h3 className="font-semibold text-amber-800 mb-2">Vehicle Status</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Registration:</span> {vehicle.registrationNumber}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                vehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {vehicle.status}
              </span>
            </p>
            <p><span className="font-medium">Purchase Date:</span> {new Date(vehicle.purchaseDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Price:</span> ${vehicle.purchasePrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {vehicle.usageLogs.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Usage</h3>
          <div className="space-y-3">
            {vehicle.usageLogs.slice(0, 3).map((log) => (
              <div key={log.usageId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{log.purpose}</p>
                  <p className="text-sm text-gray-600">{log.routeDescription}</p>
                </div>
                <div className="text-right text-sm">
                  <p>{new Date(log.startDatetime).toLocaleDateString()}</p>
                  <p className="text-gray-600">{log.fuelUsedLiters}L fuel</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;