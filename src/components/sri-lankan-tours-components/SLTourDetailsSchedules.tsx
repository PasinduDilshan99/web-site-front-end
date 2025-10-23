import React from "react";
import { Schedule } from "@/types/sri-lankan-tour-types";

interface SLTourDetailsSchedulesProps {
  schedules: Schedule[];
}

const SLTourDetailsSchedules: React.FC<SLTourDetailsSchedulesProps> = ({
  schedules,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights < 10 ? "0" + nights : nights} Days ${
      days < 10 ? "0" + days : days
    } Nights`;
  };

  if (schedules.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Available Schedules
      </h2>
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <SLTourDetailsScheduleCard
            key={schedule.scheduleId}
            schedule={schedule}
            formatDate={formatDate}
            formatDuration={formatDuration}
          />
        ))}
      </div>
    </div>
  );
};

const SLTourDetailsScheduleCard: React.FC<{
  schedule: Schedule;
  formatDate: (date: string) => string;
  formatDuration: (days: number) => string;
}> = ({ schedule, formatDate, formatDuration }) => (
  <div className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-gray-800">
        {schedule.scheduleName}
      </h3>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {formatDuration(schedule.durationStart)}
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm text-gray-600">
          {formatDate(schedule.assumeStartDate)} -{" "}
          {formatDate(schedule.assumeEndDate)}
        </span>
      </div>
    </div>

    {schedule.specialNote && (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
        <p className="text-sm text-amber-800 flex items-center gap-2">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Special Note:</span>{" "}
          {schedule.specialNote}
        </p>
      </div>
    )}

    <p className="text-gray-600 text-sm">{schedule.scheduleDescription}</p>
  </div>
);

export default SLTourDetailsSchedules;
