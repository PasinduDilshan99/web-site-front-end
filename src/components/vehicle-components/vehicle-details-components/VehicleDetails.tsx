import React from 'react';
import { VehicleDetails as VehicleDetailsType } from '@/types/vehicle-types';

interface VehicleDetailsProps {
  details: VehicleDetailsType;
  purchaseDate: string;
  purchasePrice: number;
  status: string;
}

export default function VehicleDetails({ details, purchaseDate, purchasePrice, status }: VehicleDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const detailsList = [
    { label: 'Chassis Number', value: details.chassisNumber },
    { label: 'Engine Number', value: details.engineNumber },
    { label: 'Insurance Policy', value: details.insurancePolicyNumber },
    { label: 'Insurance Expiry', value: formatDate(details.insuranceExpiryDate) },
    { label: 'Emission Test', value: details.emissionTestNumber },
    { label: 'Emission Expiry', value: formatDate(details.emissionExpiryDate) },
    { label: 'Permit Number', value: details.permitNumber },
    { label: 'Permit Expiry', value: formatDate(details.permitExpiryDate) },
    { label: 'Warranty Expiry', value: formatDate(details.warrantyExpiryDate) },
    { label: 'GPS Tracking ID', value: details.gpsTrackingId },
    { label: 'Purchase Date', value: formatDate(purchaseDate) },
    { label: 'Purchase Price', value: `$${purchasePrice.toLocaleString()}` },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
        Vehicle Details
      </h2>
      
      <div className="space-y-3">
        {detailsList.map((detail, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-medium text-gray-600">{detail.label}:</span>
            <span className="text-sm font-semibold text-gray-900 text-right">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}