"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TourScheduleHeroSection from "@/components/sri-lankan-tours-components/TourSchedulesHeroSection";

// ========== Interfaces ==========
interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  status: string;
  images: TourImage[];
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
  statusId: number;
  statusName: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    tour: Tour;
    schedules: Schedule[];
  };
  timestamp: string;
}

// ========== ScheduleCard Component ==========
interface ScheduleCardProps {
  schedule: Schedule;
  tourName: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, tourName }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDurationRange = (start: number, end: number) => {
    if (start === end) return `${start} day${start > 1 ? "s" : ""}`;
    return `${start}-${end} days`;
  };

  const isScheduleActive = schedule.statusName === "ACTIVE";
  const startDate = new Date(schedule.assumeStartDate);
  const endDate = new Date(schedule.assumeEndDate);
  const isUpcoming = startDate > new Date();
  const isOngoing = startDate <= new Date() && endDate >= new Date();

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-200">
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
          {/* Duration & Tour Info */}
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Tour</span>
              </div>
              <p className="font-semibold text-gray-900 truncate">{tourName}</p>
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
                  <p className="text-sm text-amber-700">{schedule.specialNote}</p>
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

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <span>Updated: {formatDate(schedule.updatedAt)}</span>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 group"
                onClick={() => {
                  // Handle booking logic
                  console.log("Book schedule:", schedule.scheduleId);
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
                  // Handle details view
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

// ========== Main TourSchedulePage Component ==========
const TourSchedulePage = () => {
  const searchParams = useSearchParams();
  const tourName = searchParams.get("tourName") || "";
  const id = searchParams.get("id") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tourData, setTourData] = useState<Tour | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [filter, setFilter] = useState<
    "all" | "active" | "upcoming" | "ongoing"
  >("all");

  useEffect(() => {
    const fetchTourSchedule = async () => {
      if (!id) {
        setError("Tour ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/tour-schedules/${id}`,
          {
            headers: {
              Cookie:
                "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch tour data: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.code === 200) {
          setTourData(data.data.tour);
          setSchedules(data.data.schedules);
          setFilteredSchedules(data.data.schedules);
        } else {
          throw new Error(data.message || "Failed to retrieve tour data");
        }
      } catch (err) {
        console.error("Error fetching tour schedule:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTourSchedule();
  }, [id]);

  // Filter schedules based on selected filter
  useEffect(() => {
    if (!schedules.length) return;

    const now = new Date();
    let filtered = [...schedules];

    switch (filter) {
      case "active":
        filtered = schedules.filter((s) => s.statusName === "ACTIVE");
        break;
      case "upcoming":
        filtered = schedules.filter(
          (s) => s.statusName === "ACTIVE" && new Date(s.assumeStartDate) > now
        );
        break;
      case "ongoing":
        filtered = schedules.filter(
          (s) =>
            s.statusName === "ACTIVE" &&
            new Date(s.assumeStartDate) <= now &&
            new Date(s.assumeEndDate) >= now
        );
        break;
      default:
        filtered = schedules;
    }

    setFilteredSchedules(filtered);
  }, [schedules, filter]);

  const getFilterButtonClass = (filterType: typeof filter) => {
    return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      filter === filterType
        ? "bg-emerald-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <TourScheduleHeroSection
        tourData={tourData}
        loading={loading && !schedules.length}
        error={error}
      />

      {/* Schedules Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Available Schedules
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our carefully planned schedules to experience the
              perfect journey
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <button
                className={getFilterButtonClass("all")}
                onClick={() => setFilter("all")}
              >
                All Schedules ({schedules.length})
              </button>
              <button
                className={getFilterButtonClass("active")}
                onClick={() => setFilter("active")}
              >
                Active ({schedules.filter((s) => s.statusName === "ACTIVE").length})
              </button>
              <button
                className={getFilterButtonClass("upcoming")}
                onClick={() => setFilter("upcoming")}
              >
                Upcoming (
                {
                  schedules.filter(
                    (s) =>
                      s.statusName === "ACTIVE" &&
                      new Date(s.assumeStartDate) > new Date()
                  ).length
                }
                )
              </button>
              <button
                className={getFilterButtonClass("ongoing")}
                onClick={() => setFilter("ongoing")}
              >
                Ongoing (
                {
                  schedules.filter(
                    (s) =>
                      s.statusName === "ACTIVE" &&
                      new Date(s.assumeStartDate) <= new Date() &&
                      new Date(s.assumeEndDate) >= new Date()
                  ).length
                }
                )
              </button>
            </div>
          </div>

          {/* Loading State for Schedules */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gray-200 rounded"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error Loading Schedules
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredSchedules.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
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
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Schedules Available
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                There are no {filter !== "all" ? filter.toLowerCase() : ""}{" "}
                schedules available for this tour at the moment.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                View All Schedules
              </button>
            </div>
          ) : (
            <>
              {/* Schedule Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {filteredSchedules.map((schedule) => (
                  <ScheduleCard
                    key={schedule.scheduleId}
                    schedule={schedule}
                    tourName={tourData?.tourName || tourName}
                  />
                ))}
              </div>

              {/* Stats Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {schedules.filter((s) => s.statusName === "ACTIVE").length}
                    </div>
                    <div className="text-sm text-gray-600">Active Schedules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {
                        schedules.filter(
                          (s) =>
                            s.statusName === "ACTIVE" &&
                            new Date(s.assumeStartDate) > new Date()
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">Upcoming Schedules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {
                        schedules.filter(
                          (s) =>
                            s.statusName === "ACTIVE" &&
                            new Date(s.assumeStartDate) <= new Date() &&
                            new Date(s.assumeEndDate) >= new Date()
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">Currently Ongoing</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Call to Action */}
          {!loading && !error && schedules.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 sm:p-10 md:p-12 border border-emerald-100">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Book Your Adventure?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Contact our travel experts for personalized assistance or
                  additional information about our schedules.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      // Handle contact expert
                      console.log("Contact expert");
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Contact Travel Expert
                  </button>
                  <button
                    className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
                    onClick={() => window.history.back()}
                  >
                    Back to All Tours
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TourSchedulePage;