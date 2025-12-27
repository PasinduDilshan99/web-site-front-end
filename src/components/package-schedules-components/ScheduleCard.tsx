"use client";

import { useRouter } from "next/navigation";
import React from "react";

// ========== Interfaces ==========
interface PackageImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface PackageDetails {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  status: string;
  images: PackageImage[];
}

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ScheduleCardProps {
  schedule: Schedule;
  packageData: PackageDetails;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  packageData,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const router = useRouter();

  const getDurationRange = (start: number, end: number) => {
    if (start === end) return `${start} day${start > 1 ? "s" : ""}`;
    return `${start}-${end} days`;
  };

  const isScheduleActive = schedule.status === "ACTIVE";
  const startDate = new Date(schedule.assumeStartDate);
  const endDate = new Date(schedule.assumeEndDate);
  const isUpcoming = startDate > new Date();
  const isOngoing = startDate <= new Date() && endDate >= new Date();

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
      style={{
        borderLeftColor: packageData.color,
        borderLeftWidth: "4px",
      }}
    >
      {/* Schedule Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isScheduleActive
              ? isUpcoming
                ? "bg-blue-100 text-blue-800"
                : isOngoing
                ? "bg-emerald-100 text-emerald-800"
                : "bg-gray-100 text-gray-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isScheduleActive
            ? isUpcoming
              ? "UPCOMING"
              : isOngoing
              ? "ONGOING"
              : "COMPLETED"
            : "INACTIVE"}
        </div>
      </div>

      <div className="p-6">
        {/* Schedule Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
            {schedule.scheduleName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {formatDate(schedule.assumeStartDate)} -{" "}
              {formatDate(schedule.assumeEndDate)}
            </span>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="space-y-4">
          {/* Duration & Package Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Duration</span>
              </div>
              <p className="font-semibold text-gray-900">
                {getDurationRange(schedule.durationStart, schedule.durationEnd)}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Package</span>
              </div>
              <p
                className="font-semibold text-gray-900 truncate"
                style={{ color: packageData.color }}
              >
                {packageData.packageName}
              </p>
            </div>
          </div>

          {/* Price Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-blue-700">Per Person</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg text-blue-900">
                  LKR {packageData.pricePerPerson.toLocaleString()}
                </p>
                {packageData.discount > 0 && (
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    Save {packageData.discount}%
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-3 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-emerald-700">Total Price</span>
              </div>
              <p className="font-bold text-lg text-emerald-900">
                LKR {packageData.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Special Note */}
          {schedule.specialNote && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    Special Note
                  </p>
                  <p className="text-sm text-amber-700">
                    {schedule.specialNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {schedule.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">{schedule.description}</p>
            </div>
          )}

          {/* Person Count */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Group Size</span>
              </div>
              <span className="font-semibold text-gray-900">
                {packageData.minPersonCount} - {packageData.maxPersonCount}{" "}
                people
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <span>Updated: {formatDate(schedule.updatedAt)}</span>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 group"
                style={{ backgroundColor: packageData.color }}
                onClick={() => {
                  router.push(
                    `/booking?packageScheduleName=${schedule.scheduleName}&packageScheduleId=${schedule.scheduleId}`
                  );
                }}
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Book Now
              </button>
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                onClick={() => {
                  console.log("View details:", schedule.scheduleId);
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
