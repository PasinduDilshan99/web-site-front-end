import React from 'react';
import { LatestFuelRecord } from '@/types/vehicle-types';

interface FuelRecordsProps {
  fuelRecord: LatestFuelRecord | null;
}

export default function FuelRecords({ fuelRecord }: FuelRecordsProps) {
  if (!fuelRecord) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
          Fuel Records
        </h2>
        <p className="text-gray-500 text-center py-4">No fuel records found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
        Latest Fuel Record
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Refuel Date:</span>
          <span className="text-gray-900">{formatDate(fuelRecord.refuelDate)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Fuel Type:</span>
          <span className="text-gray-900">{fuelRecord.refuelFuelType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Quantity:</span>
          <span className="text-gray-900">{fuelRecord.quantityLiters}L</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Cost:</span>
          <span className="text-gray-900">${fuelRecord.fuelCost}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Odometer:</span>
          <span className="text-gray-900">{fuelRecord.fuelOdometer} km</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Station:</span>
          <span className="text-gray-900">{fuelRecord.refuelStation}</span>
        </div>
      </div>
    </div>
  );
}