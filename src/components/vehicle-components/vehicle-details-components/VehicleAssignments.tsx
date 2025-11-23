import React from 'react';
import { Assignment } from '@/types/vehicle-types';

interface VehicleAssignmentsProps {
  assignments: Assignment[];
}

export default function VehicleAssignments({ assignments }: VehicleAssignmentsProps) {
  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
          Assignments
        </h2>
        <p className="text-gray-500 text-center py-4">No assignments found</p>
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
        Recent Assignments
      </h2>
      
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <div key={assignment.assignmentId} className="border-l-4 border-purple-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{assignment.assignmentPurpose}</h3>
                <p className="text-sm text-gray-600 mt-1">{assignment.assignmentRemarks}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    Driver: {assignment.driverId}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Start: {formatDate(assignment.assignmentStartDate)}</span>
              {assignment.assignmentEndDate && (
                <span>End: {formatDate(assignment.assignmentEndDate)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}