import { Schedule } from "@/types/activities-types";
import React from "react";

interface ActivitySchedulesProps {
  schedules: Schedule[];
}

const ActivitySchedules: React.FC<ActivitySchedulesProps> = ({ schedules }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  if (!schedules || schedules.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Available Schedules
      </h2>
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="p-4 bg-gradient-to-r from-amber-50 to-purple-50 rounded-xl border border-amber-200"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <h3 className="font-bold text-gray-900 text-lg">
                {schedule.name}
              </h3>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {schedule.duration_hours_start} - {schedule.duration_hours_end}{" "}
                hours
              </span>
            </div>
            <p className="text-gray-600 mb-3">{schedule.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-gray-700">
                📅 {formatDate(schedule.assume_start_date)} -{" "}
                {formatDate(schedule.assume_end_date)}
              </span>
              {schedule.special_note && (
                <span className="text-amber-600 font-medium">
                  💡 {schedule.special_note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySchedules;
