import React from "react";
import { useRouter } from "next/navigation";
import { SEASON_DETAILS_PAGE_PATH } from "@/utils/urls";

interface ActivitySeasonsProps {
  season: string;
  seasonId: number;
}

const ActivitySeasons: React.FC<ActivitySeasonsProps> = ({
  season,
  seasonId,
}) => {
  const router = useRouter();

  const getSeasonBadges = (seasonString: string) => {
    try {
      return seasonString.split(",").map((s) => s.trim());
    } catch (error) {
      return [seasonString];
    }
  };

  const handleSeasonClick = (seasonName: string, id: number) => {
    const encodedSeasonName = encodeURIComponent(seasonName);
    router.push(`${SEASON_DETAILS_PAGE_PATH}/${id}?name=${encodedSeasonName}`);
  };

  const seasonNames = getSeasonBadges(season);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></span>
        Best Seasons
      </h2>

      {seasonNames.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2">
            {seasonNames.map((seasonName, idx) => (
              <button
                key={idx}
                onClick={() => handleSeasonClick(seasonName, seasonId)}
                className="bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 px-4 py-2 rounded-full text-sm font-medium border border-sky-200 hover:from-sky-200 hover:to-teal-200 hover:shadow-md transition-all duration-300 cursor-pointer group relative"
                title={`View activities in ${seasonName}`}
              >
                {seasonName}

                {/* Hover indicator */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            ))}
          </div>

          {/* Hint for season navigation */}
          <div className="mt-4 text-xs text-gray-400 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Click on a season to explore season details</span>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm">
          Season information not available
        </p>
      )}
    </div>
  );
};

export default ActivitySeasons;
