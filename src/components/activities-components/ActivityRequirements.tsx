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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
        Requirements
      </h2>
      <div className="grid gap-3">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: req.color }}
              ></div>
              <div>
                <h3 className="font-semibold text-gray-900">{req.name}</h3>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium border">
              {req.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityRequirements;
