"use client";

import React from "react";
import { Requirement } from "@/types/sri-lankan-tour-types";

interface ActivityRequirementsProps {
  requirements: Requirement[];
}

const ActivityRequirements: React.FC<ActivityRequirementsProps> = ({
  requirements,
}) => {
  if (requirements.length === 0) return null;

  return (
    <div>
      <h6 className="font-semibold text-gray-900 mb-3">Requirements</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm"
          >
            <div
              className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125"
              style={{ backgroundColor: req.color }}
            />
            <div>
              <div className="font-medium text-gray-900">
                {req.name}: {req.value}
              </div>
              {req.description && (
                <div className="text-sm text-gray-600">{req.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityRequirements;