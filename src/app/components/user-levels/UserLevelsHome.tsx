"use client";

import { GET_ALL_ACTIVE_USER_LEVEL_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface ActiveUserLevelsType {
  userLevelId: number;
  userLevelName: string;
  userLevelDescription: string;
  statusName: string;
  createdAt: string;
  createdBy: number;
  createdByUser: string;
  updatedAt: string;
  updatedBy: number;
  updatedByUser: string | null;
  terminatedAt: string | null;
  terminatedBy: number;
  terminatedByUser: string | null;
}

const UserLevelsHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUserLevels, setActiveUserLevels] = useState<
    ActiveUserLevelsType[]
  >([]);
  const [selectedLevel, setSelectedLevel] =
    useState<ActiveUserLevelsType | null>(null);

  useEffect(() => {
    const fetchActiveUserLevels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_USER_LEVEL_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveUserLevelsType[] = data.data || [];
          setActiveUserLevels(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active user levels");
        }
      } catch (err) {
        console.error("Error fetching activeUserLevels:", err);
        setError("Something went wrong while fetching active user levels");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUserLevels();
  }, []);

  const getLevelIcon = (levelName: string) => {
    const name = levelName.toLowerCase();
    if (name.includes("bronze")) return "🥉";
    if (name.includes("silver")) return "🥈";
    if (name.includes("gold")) return "🥇";
    if (name.includes("platinum")) return "💎";
    if (name.includes("diamond")) return "👑";
    return "⭐";
  };

  const getLevelColor = (
    levelName: string,
    type: "bg" | "border" | "text" = "bg"
  ) => {
    const name = levelName.toLowerCase();
    const colors = {
      bronze: {
        bg: "from-amber-600 to-orange-700",
        border: "border-amber-500",
        text: "text-amber-600",
      },
      silver: {
        bg: "from-gray-400 to-gray-600",
        border: "border-gray-400",
        text: "text-gray-600",
      },
      gold: {
        bg: "from-yellow-400 to-yellow-600",
        border: "border-yellow-400",
        text: "text-yellow-600",
      },
      platinum: {
        bg: "from-purple-500 to-purple-700",
        border: "border-purple-500",
        text: "text-purple-600",
      },
      diamond: {
        bg: "from-blue-500 to-indigo-700",
        border: "border-blue-500",
        text: "text-blue-600",
      },
    };

    for (const [key, value] of Object.entries(colors)) {
      if (name.includes(key)) return value[type];
    }
    return type === "bg"
      ? "from-gray-400 to-gray-600"
      : type === "border"
      ? "border-gray-400"
      : "text-gray-600";
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg mb-4 sm:mb-6">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
              Loading User Levels
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Discovering membership tiers...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-2 sm:mb-3">
              Failed to Load
            </h2>
            <p className="text-sm sm:text-base text-red-600 mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeUserLevels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
              No User Levels Found
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              No membership tiers are currently available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-xl">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Membership Tiers
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Discover our exclusive membership levels and unlock amazing
              benefits as you explore the world with us
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-4 sm:gap-6 lg:gap-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-lg">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {activeUserLevels.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Active Tiers
                </div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                  Premium
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Experience
                </div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                  Exclusive
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Benefits</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Levels Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on lg and above */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200"></div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {activeUserLevels.map((level, index) => (
              <div key={level.userLevelId} className="relative">
                {/* Timeline Node - Hidden on mobile, visible on lg and above */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-white border-4 border-blue-400 shadow-lg z-10"></div>

                {/* Level Content */}
                <div className="lg:flex lg:items-center lg:gap-8">
                  {/* Level Number for Mobile */}
                  <div className="lg:hidden flex justify-center mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Level Card */}
                  <div className="lg:flex-1">
                    <div
                      className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {/* Level Badge */}
                      <div
                        className={`absolute -top-3 sm:-top-4 left-4 sm:left-6 lg:left-8 inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${getLevelColor(
                          level.userLevelName
                        )} text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full sm:rounded-xl shadow-lg`}
                      >
                        <span className="text-lg sm:text-xl lg:text-2xl">
                          {getLevelIcon(level.userLevelName)}
                        </span>
                        <span className="font-bold text-sm sm:text-base lg:text-lg">
                          Level {index + 1}
                        </span>
                      </div>

                      <div className="mt-6 sm:mt-8 lg:mt-10">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          {level.userLevelName}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                          {level.userLevelDescription}
                        </p>

                        {/* Status and Meta */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                          <span
                            className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getLevelColor(
                              level.userLevelName,
                              "text"
                            )} bg-green-50`}
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                            {level.statusName}
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="hidden xs:inline">Created by</span>{" "}
                            {level.createdByUser}
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                            {new Date(level.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>

                        {/* Hover Effect Arrow */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 lg:right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level Number for Desktop */}
                  <div className="hidden lg:flex w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLevel && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6"
          onClick={() => setSelectedLevel(null)}
        >
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLevel(null)}
              className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="text-center mb-6 sm:mb-8">
              <div
                className={`inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${getLevelColor(
                  selectedLevel.userLevelName
                )} text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6`}
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl">
                  {getLevelIcon(selectedLevel.userLevelName)}
                </span>
                <span className="font-bold text-lg sm:text-xl lg:text-2xl">
                  {selectedLevel.userLevelName}
                </span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                {selectedLevel.userLevelDescription}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {selectedLevel.statusName}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                    Level ID
                  </div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    #{selectedLevel.userLevelId}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                    Created By
                  </div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {selectedLevel.createdByUser}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                    Created Date
                  </div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {new Date(selectedLevel.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>

              {selectedLevel.updatedByUser && (
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium text-blue-600 mb-1 sm:mb-2">
                    Last Updated
                  </div>
                  <div className="text-gray-800 text-sm sm:text-base">
                    By{" "}
                    <span className="font-semibold">
                      {selectedLevel.updatedByUser}
                    </span>{" "}
                    on{" "}
                    {new Date(selectedLevel.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLevelsHome;
