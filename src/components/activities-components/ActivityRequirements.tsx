import { Requirement } from "@/types/activities-types";
import React from "react";

interface ActivityRequirementsProps {
  requirements: Requirement[];
}

const ActivityRequirements: React.FC<ActivityRequirementsProps> = ({
  requirements,
}) => {
  if (!requirements || requirements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-1.5 sm:mr-2"></span>
        Requirements
      </h2>

      <div className="grid gap-2 sm:gap-3">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="flex flex-col xs:flex-row xs:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl border border-sky-100 hover:border-sky-200 transition-all duration-200 gap-2 xs:gap-3"
          >
            <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: req.color }}
              ></div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {req.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">
                  {req.description}
                </p>
              </div>
            </div>

            <span className="self-end xs:self-auto px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-medium border border-sky-200 text-sky-700 whitespace-nowrap">
              {req.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityRequirements;
