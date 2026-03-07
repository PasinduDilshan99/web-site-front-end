// app/profile/user-benefits/page.tsx
"use client";
import UserProfileUserBenefitsLoading from "@/components/user-profile-components/Loadings/UserProfileUserBenefitsLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { UserBenefitsData } from "@/types/user-benefits";
import { USER_PROFILE_USER_BENEFITS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { USER_PROFILE_PAGE_PATH } from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserBenefitsPage() {
  const [benefitsData, setBenefitsData] = useState<UserBenefitsData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<
    "previous" | "current" | "next"
  >("current");
  const apiService = new UserProfileAPIService();
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_USER_BENEFITS_VIEW_PRIVILEGE)
    ) {
      router.push(USER_PROFILE_PAGE_PATH);
    }
  }, [user, router]);

  useEffect(() => {
    loadUserBenefits();
  }, []);

  const loadUserBenefits = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserBenefits();
      setBenefitsData(response.data);
    } catch (err) {
      console.error("Failed to load user benefits:", err);
      setError("Failed to load user benefits");
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "silver":
        return "bg-gray-600 text-white";
      case "gold":
        return "bg-amber-500 text-white";
      case "platinum":
        return "bg-sky-700 text-white";
      default:
        return "bg-teal-600 text-white";
    }
  };

  const getLevelBorderColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "silver":
        return "border-gray-300";
      case "gold":
        return "border-amber-300";
      case "platinum":
        return "border-sky-300";
      default:
        return "border-teal-300";
    }
  };

  const getLevelBgColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "silver":
        return "bg-gray-50";
      case "gold":
        return "bg-amber-50";
      case "platinum":
        return "bg-sky-50";
      default:
        return "bg-teal-50";
    }
  };

  const getBenefitIcon = (benefitType: string) => {
    switch (benefitType) {
      case "CASHBACK":
        return "💰";
      case "DISCOUNT":
        return "🎫";
      case "FREE_SERVICE":
        return "🎁";
      default:
        return "⭐";
    }
  };

  const getBenefitColor = (benefitType: string) => {
    switch (benefitType) {
      case "CASHBACK":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "DISCOUNT":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "FREE_SERVICE":
        return "bg-violet-50 text-violet-700 border-violet-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <UserProfileUserBenefitsLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
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
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Benefits
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadUserBenefits}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!benefitsData) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              No Benefits Data
            </h3>
            <p className="text-gray-600">
              Unable to load your benefits information at this time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    userDetails,
    currentUserLevel,
    previousUserLevel,
    nextUserLevel,
    progress,
  } = benefitsData;

  const displayLevel =
    activeLevel === "previous"
      ? previousUserLevel
      : activeLevel === "current"
        ? currentUserLevel
        : nextUserLevel;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                My Benefits Dashboard
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Track your loyalty rewards and membership benefits
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl font-bold">
                {currentUserLevel.levelName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 truncate">
                  {userDetails.firstName} {userDetails.lastName}
                </h2>
                <p className="text-gray-600 text-sm truncate">
                  @{userDetails.username}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs lg:text-sm font-semibold ${getLevelColor(currentUserLevel.levelName)}`}
                  >
                    {currentUserLevel.levelName} Tier
                  </span>
                  <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold border border-sky-200">
                    {userDetails.benefitsPointsCount.toLocaleString()} Points
                  </span>
                </div>
              </div>
            </div>
            <div className="text-left lg:text-right w-full lg:w-auto">
              <div className="text-xl lg:text-2xl font-bold text-teal-600 mb-1">
                {progress.pointsNeededForNextLevel.toLocaleString()} points to{" "}
                {nextUserLevel.levelName}
              </div>
              <div className="text-sm text-gray-600">Next tier progress</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 lg:p-6 mb-6 lg:mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm font-medium text-gray-700">
                Progress to {nextUserLevel.levelName}
              </div>
              <div className="text-xs text-gray-500">
                Current: {currentUserLevel.levelName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-sky-600">
                {progress.progressPercentage.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(progress.progressPercentage, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{currentUserLevel.pointsNeeded.toLocaleString()} pts</span>
            <span>{nextUserLevel.pointsNeeded.toLocaleString()} pts</span>
          </div>
        </div>

        {/* Membership Levels - Responsive Grid */}
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">
              Membership Tiers
            </h3>
            <div className="text-xs lg:text-sm text-gray-600">
              Tap to view benefits
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Previous Level */}
            <div
              className={`bg-white rounded-xl border-2 ${getLevelBorderColor(previousUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeLevel === "previous"
                  ? "ring-2 ring-gray-400 scale-[1.02]"
                  : ""
              }`}
              onClick={() => setActiveLevel("previous")}
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 ${getLevelColor(previousUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}
                >
                  {previousUserLevel.levelName.charAt(0)}
                </div>
                <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-2">
                  {previousUserLevel.levelName}
                </h4>
                <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-2">
                  {previousUserLevel.description}
                </p>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                  {previousUserLevel.pointsNeeded.toLocaleString()} Points
                </div>
              </div>
            </div>

            {/* Current Level */}
            <div
              className={`bg-white rounded-xl border-2 ${getLevelBorderColor(currentUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-xl relative ${
                activeLevel === "current"
                  ? "ring-2 ring-sky-400 scale-[1.02]"
                  : ""
              }`}
              onClick={() => setActiveLevel("current")}
            >
              <div className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Current
              </div>
              <div className="text-center">
                <div
                  className={`w-14 h-14 lg:w-16 lg:h-16 ${getLevelColor(currentUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}
                >
                  {currentUserLevel.levelName.charAt(0)}
                </div>
                <h4 className="font-bold text-gray-800 text-lg lg:text-xl mb-2">
                  {currentUserLevel.levelName}
                </h4>
                <p className="text-gray-600 text-sm lg:text-base mb-3 line-clamp-2">
                  {currentUserLevel.description}
                </p>
                <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  YOUR LEVEL
                </div>
              </div>
            </div>

            {/* Next Level */}
            <div
              className={`bg-white rounded-xl border-2 ${getLevelBorderColor(nextUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeLevel === "next"
                  ? "ring-2 ring-teal-400 scale-[1.02]"
                  : ""
              }`}
              onClick={() => setActiveLevel("next")}
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 ${getLevelColor(nextUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}
                >
                  {nextUserLevel.levelName.charAt(0)}
                </div>
                <h4 className="font-bold text-gray-800 text-base lg:text-lg mb-2">
                  {nextUserLevel.levelName}
                </h4>
                <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-2">
                  {nextUserLevel.description}
                </p>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                  {nextUserLevel.pointsNeeded.toLocaleString()} Points
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Level Benefits */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8 lg:mb-10">
          <div
            className={`p-5 lg:p-6 ${getLevelBgColor(displayLevel.levelName)}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${getLevelColor(displayLevel.levelName)} rounded-xl flex items-center justify-center text-white font-bold text-xl`}
                >
                  {displayLevel.levelName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    {displayLevel.levelName} Tier Benefits
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {displayLevel.description}
                  </p>
                </div>
              </div>
              <div className="text-sm lg:text-base text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
                {displayLevel.benefits.length} Active Benefits
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {displayLevel.benefits.map((benefit) => (
                <div
                  key={benefit.benefitId}
                  className="bg-gray-50 rounded-xl p-4 lg:p-5 border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-sky-200"
                >
                  <div className="flex items-start gap-3 lg:gap-4 mb-4">
                    <div className="text-2xl lg:text-3xl">
                      {getBenefitIcon(benefit.benefitType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base lg:text-lg mb-1 truncate">
                        {benefit.benefitName}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium border ${getBenefitColor(benefit.benefitType)}`}
                      >
                        {benefit.benefitType.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm lg:text-base mb-4 line-clamp-3">
                    {benefit.benefitDescription}
                  </p>

                  {benefit.benefitValue > 0 && (
                    <div className="text-xl lg:text-2xl font-bold text-sky-600 mb-3">
                      {benefit.benefitValue}%
                      {benefit.benefitType === "CASHBACK" && " Cashback"}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 text-xs lg:text-sm">
                    <div className="text-gray-500 truncate">
                      Valid: {formatDate(benefit.validFrom)} -{" "}
                      {formatDate(benefit.validTo)}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full font-medium ${
                        benefit.benefitStatus === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {benefit.benefitStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Earn More Points */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-600 rounded-2xl p-5 lg:p-6 text-white mb-8 lg:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg lg:text-xl font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              How to Earn More Points
            </h3>
            <div className="text-sm opacity-90">
              Maximize your benefits potential
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                icon: "💰",
                title: "Book Tours",
                points: "10 pts per $1",
                color: "from-sky-500 to-cyan-500",
              },
              {
                icon: "⭐",
                title: "Write Reviews",
                points: "50 pts each",
                color: "from-cyan-500 to-teal-500",
              },
              {
                icon: "👥",
                title: "Refer Friends",
                points: "500 pts each",
                color: "from-teal-500 to-emerald-500",
              },
              {
                icon: "🎯",
                title: "Complete Activities",
                points: "25 pts each",
                color: "from-emerald-500 to-green-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-xl lg:text-2xl`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-base lg:text-lg">
                      {item.title}
                    </div>
                    <div className="text-sky-100 text-sm lg:text-base opacity-90">
                      {item.points}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-5 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Benefits Comparison
            </h3>
            <p className="text-gray-600 text-sm lg:text-base mt-1">
              Compare benefits across membership tiers
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Benefit Type
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    {previousUserLevel.levelName}
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    {currentUserLevel.levelName}
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    {nextUserLevel.levelName}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {["CASHBACK", "DISCOUNT", "FREE_SERVICE"].map((benefitType) => (
                  <tr
                    key={benefitType}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm lg:text-base font-medium text-gray-900">
                      {benefitType.replace("_", " ")}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm lg:text-base text-center text-gray-600">
                      {previousUserLevel.benefits.find(
                        (b) => b.benefitType === benefitType,
                      )?.benefitValue || "—"}
                      %
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm lg:text-base text-center font-semibold text-sky-600">
                      {currentUserLevel.benefits.find(
                        (b) => b.benefitType === benefitType,
                      )?.benefitValue || "—"}
                      %
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm lg:text-base text-center text-gray-600">
                      {nextUserLevel.benefits.find(
                        (b) => b.benefitType === benefitType,
                      )?.benefitValue || "—"}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
