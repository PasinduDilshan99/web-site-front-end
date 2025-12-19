"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TourPackageSchedulesHeroSection from "@/components/package-schedules-components/TourPackageSchedulesHeroSection";
import ScheduleCard from "@/components/package-schedules-components/ScheduleCard";

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

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    packageDetails: PackageDetails;
    schedules: Schedule[];
  };
  timestamp: string;
}

// ========== Main PackageSchedulePage Component ==========
const PackageSchedulePage = () => {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("packageName") || "";
  const packageId = searchParams.get("packageId") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [filter, setFilter] = useState<
    "all" | "active" | "upcoming" | "ongoing"
  >("all");

  useEffect(() => {
    const fetchPackageSchedule = async () => {
      if (!packageId) {
        setError("Package ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/package/package-schedules-details/${packageId}`,
          {
            headers: {
              Cookie:
                "token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch package data: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.code === 200) {
          setPackageData(data.data.packageDetails);
          setSchedules(data.data.schedules);
          setFilteredSchedules(data.data.schedules);
        } else {
          throw new Error(data.message || "Failed to retrieve package data");
        }
      } catch (err) {
        console.error("Error fetching package schedule:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackageSchedule();
  }, [packageId]);

  // Filter schedules based on selected filter
  useEffect(() => {
    if (!schedules.length) return;

    const now = new Date();
    let filtered = [...schedules];

    switch (filter) {
      case "active":
        filtered = schedules.filter((s) => s.status === "ACTIVE");
        break;
      case "upcoming":
        filtered = schedules.filter(
          (s) => s.status === "ACTIVE" && new Date(s.assumeStartDate) > now
        );
        break;
      case "ongoing":
        filtered = schedules.filter(
          (s) =>
            s.status === "ACTIVE" &&
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
    const baseColor = packageData?.color || "#3B82F6";
    return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      filter === filterType
        ? "text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <TourPackageSchedulesHeroSection
        packageData={packageData}
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
                style={filter === "all" ? { backgroundColor: packageData?.color } : {}}
              >
                All Schedules ({schedules.length})
              </button>
              <button
                className={getFilterButtonClass("active")}
                onClick={() => setFilter("active")}
                style={filter === "active" ? { backgroundColor: packageData?.color } : {}}
              >
                Active ({schedules.filter((s) => s.status === "ACTIVE").length})
              </button>
              <button
                className={getFilterButtonClass("upcoming")}
                onClick={() => setFilter("upcoming")}
                style={filter === "upcoming" ? { backgroundColor: packageData?.color } : {}}
              >
                Upcoming (
                {
                  schedules.filter(
                    (s) =>
                      s.status === "ACTIVE" &&
                      new Date(s.assumeStartDate) > new Date()
                  ).length
                }
                )
              </button>
              <button
                className={getFilterButtonClass("ongoing")}
                onClick={() => setFilter("ongoing")}
                style={filter === "ongoing" ? { backgroundColor: packageData?.color } : {}}
              >
                Ongoing (
                {
                  schedules.filter(
                    (s) =>
                      s.status === "ACTIVE" &&
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
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: packageData?.color || "#10B981" }}
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
                schedules available for this package at the moment.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-colors border-2"
                style={{ 
                  borderColor: packageData?.color || "#10B981",
                  color: packageData?.color || "#10B981" 
                }}
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
                    packageData={packageData!}
                  />
                ))}
              </div>

              {/* Stats Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: packageData?.color || "#10B981" }}
                    >
                      {schedules.filter((s) => s.status === "ACTIVE").length}
                    </div>
                    <div className="text-sm text-gray-600">Active Schedules</div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: packageData?.color || "#3B82F6" }}
                    >
                      {
                        schedules.filter(
                          (s) =>
                            s.status === "ACTIVE" &&
                            new Date(s.assumeStartDate) > new Date()
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">Upcoming Schedules</div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: packageData?.color || "#059669" }}
                    >
                      {
                        schedules.filter(
                          (s) =>
                            s.status === "ACTIVE" &&
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
              <div 
                className="rounded-2xl p-8 sm:p-10 md:p-12 border"
                style={{ 
                  background: `linear-gradient(135deg, ${packageData?.color}15, ${packageData?.hoverColor}15)`,
                  borderColor: packageData?.color
                }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Book Your Package?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Contact our travel experts for personalized assistance or
                  additional information about our package schedules.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: packageData?.color }}
                    onClick={() => {
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
                    className="px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition-colors border-2"
                    style={{ 
                      borderColor: packageData?.color,
                      color: packageData?.color
                    }}
                    onClick={() => window.history.back()}
                  >
                    Back to All Packages
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

export default PackageSchedulePage;