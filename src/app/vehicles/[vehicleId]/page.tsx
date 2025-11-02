import React from 'react';
import { VehicleByIdResponse } from '@/types/vehicle-types';
import VehicleDetailsClient from '@/components/vehicle-components/vehicle-details-components/VehicleDetailsClient';

async function getVehicleDetails(vehicleId: string): Promise<VehicleByIdResponse> {
  const response = await fetch(`http://localhost:3000/api/vehicles/vehicle-details-by-id?id=${vehicleId}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle details');
  }
  
  return response.json();
}

interface PageProps {
  params: {
    vehicleId: string;
  };
}

export default async function VehicleDetailsPage({ params }: PageProps) {
  try {
    const vehicleData = await getVehicleDetails(params.vehicleId);
    const vehicle = vehicleData.data[0]; // Since it returns an array

    return <VehicleDetailsClient vehicle={vehicle} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600">The vehicle youre looking for doesnt exist.</p>
        </div>
      </div>
    );
  }
}