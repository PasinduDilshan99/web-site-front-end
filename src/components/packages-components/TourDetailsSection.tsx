import { TourDetails } from "@/types/packages-types";
import React from "react";

interface TourDetailsSectionProps {
  tourData: TourDetails;
}

const TourDetailsSection: React.FC<TourDetailsSectionProps> = ({ tourData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Overview</h2>

      {/* Tour Description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{tourData.tourDescription}</p>
      </div>

      {/* Tour Meta Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">{tourData.duration}</div>
          <div className="text-sm text-blue-800">Days</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600 mb-1">{tourData.tourTypeName}</div>
          <div className="text-sm text-green-800">Tour Type</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-lg font-bold text-purple-600 mb-1">{tourData.tourCategoryName}</div>
          <div className="text-sm text-purple-800">Category</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-lg">
          <div className="text-lg font-bold text-amber-600 mb-1">{tourData.seasonName}</div>
          <div className="text-sm text-amber-800">Best Season</div>
        </div>
      </div>

      {/* Route Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tour Route</h3>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{tourData.startLocation}</div>
            <div className="text-sm text-gray-600">Start</div>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-1 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full"></div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{tourData.endLocation}</div>
            <div className="text-sm text-gray-600">End</div>
          </div>
        </div>
      </div>

      {/* Tour Schedules */}
      {tourData.schedules.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Tour Schedules</h3>
          <div className="space-y-3">
            {tourData.schedules.map((schedule) => (
              <div
                key={schedule.scheduleId}
                className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{schedule.scheduleName}</h4>
                  <div className="text-sm text-gray-600">
                    {new Date(schedule.assumeStartDate).toLocaleDateString()} -{" "}
                    {new Date(schedule.assumeEndDate).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{schedule.scheduleDescription}</p>
                {schedule.specialNote && (
                  <p className="text-sm text-amber-600">💡 {schedule.specialNote}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailsSection;