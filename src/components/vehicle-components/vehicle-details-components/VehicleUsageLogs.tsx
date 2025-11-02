import React from 'react';
import { UsageLog } from '@/types/vehicle-types';

interface VehicleUsageLogsProps {
  usageLogs: UsageLog[];
}

export default function VehicleUsageLogs({ usageLogs }: VehicleUsageLogsProps) {
  if (usageLogs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
          Usage Logs
        </h2>
        <p className="text-gray-500 text-center py-4">No usage logs found</p>
      </div>
    );
  }

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
        Recent Usage Logs
      </h2>
      
      <div className="space-y-4">
        {usageLogs.map((log, index) => (
          <div key={log.usageId} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{log.usagePurpose}</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {log.packageId ? `Package ${log.packageId}` : 'No Package'}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{log.routeDescription}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Start:</span>
                <span className="ml-2 text-gray-600">{formatDateTime(log.usageStartDatetime)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">End:</span>
                <span className="ml-2 text-gray-600">
                  {log.usageEndDatetime ? formatDateTime(log.usageEndDatetime) : 'Ongoing'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Odometer:</span>
                <span className="ml-2 text-gray-600">{log.startOdometer} - {log.endOdometer} km</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fuel Used:</span>
                <span className="ml-2 text-gray-600">{log.fuelUsedLiters}L</span>
              </div>
            </div>
            
            {log.usageRemarks && (
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Remarks:</span> {log.usageRemarks}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}