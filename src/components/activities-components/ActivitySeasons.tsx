import React from "react";

interface ActivitySeasonsProps {
  season: string;
}

const ActivitySeasons: React.FC<ActivitySeasonsProps> = ({ season }) => {
  const getSeasonBadges = (seasonString: string) => {
    try {
      return seasonString.split(",").map((s) => s.trim());
    } catch (error) {
      return [seasonString];
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Best Seasons
      </h2>
      <div className="flex flex-wrap gap-2">
        {getSeasonBadges(season).map((season, idx) => (
          <span
            key={idx}
            className="bg-gradient-to-r from-amber-100 to-purple-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200"
          >
            {season}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActivitySeasons;
