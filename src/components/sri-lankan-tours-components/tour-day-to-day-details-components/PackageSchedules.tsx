"use client";
import { PackageSchedule } from "@/app/sri-lankan-tours/[sriLankanTourId]/page";
import { useRouter } from "next/navigation";

interface PackageSchedulesComponentProps {
  schedules: PackageSchedule[];
  packageName: string;
  packageId: number;
}

export const PackageSchedulesComponent: React.FC<
  PackageSchedulesComponentProps
> = ({ schedules, packageName, packageId }) => {
  const router = useRouter();
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
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Package Schedules</h2>
        <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-full">
          {packageName}
        </span>
      </div>
      <p className="text-gray-600 mb-4">
        Available schedules for your selected package
      </p>
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <PackageScheduleCard
            key={schedule.packageScheduleId}
            schedule={schedule}
            formatDate={formatDate}
            formatDuration={formatDuration}
          />
        ))}
      </div>
      <div>
<button
  onClick={() =>
    router.push(
      `/package-schedules?packageName=${packageName}&packageId=${packageId}`
    )
  }
  className="w-full relative px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-600 transition-all duration-300 group"
>
  <span className="flex items-center justify-center gap-3">
    <svg className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
    <span className="text-base font-semibold">Show All Available Schedules</span>
  </span>
  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300">
    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
    </svg>
  </span>
</button>
      </div>
    </div>
  );
};

const PackageScheduleCard: React.FC<{
  schedule: PackageSchedule;
  formatDate: (date: string) => string;
  formatDuration: (days: number) => string;
}> = ({ schedule, formatDate, formatDuration }) => (
  <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-gray-800">{schedule.name}</h3>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
        <p className="text-sm text-purple-800 flex items-center gap-2">
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

    <p className="text-gray-600 text-sm">{schedule.description}</p>

    <div className="mt-3 pt-3 border-t border-gray-100">
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
          schedule.status === "ACTIVE"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {schedule.status === "ACTIVE" ? "Available" : "Not Available"}
      </span>
    </div>
  </div>
);
