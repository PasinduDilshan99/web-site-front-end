import React from 'react';
import { LatestService } from '@/types/vehicle-types';

interface ServiceHistoryProps {
  service: LatestService | null;
}

export default function ServiceHistory({ service }: ServiceHistoryProps) {
  if (!service) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
          Service History
        </h2>
        <p className="text-gray-500 text-center py-4">No service history found</p>
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
        <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
        Latest Service
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Service Type:</span>
          <span className="text-gray-900">{service.serviceType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Service Center:</span>
          <span className="text-gray-900">{service.serviceCenter}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Service Date:</span>
          <span className="text-gray-900">{formatDate(service.serviceDate)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Odometer:</span>
          <span className="text-gray-900">{service.serviceOdometer} km</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Cost:</span>
          <span className="text-gray-900">${service.serviceCost}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Next Service Due:</span>
          <span className="text-gray-900">{formatDate(service.nextServiceDue)}</span>
        </div>
        
        {service.serviceDescription && (
          <div className="pt-2 border-t border-gray-200">
            <span className="font-medium text-gray-700">Description:</span>
            <p className="text-gray-600 text-sm mt-1">{service.serviceDescription}</p>
          </div>
        )}
        
        {service.serviceImageUrl && (
          <div className="pt-2">
            <img 
              src={service.serviceImageUrl} 
              alt="Service"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}