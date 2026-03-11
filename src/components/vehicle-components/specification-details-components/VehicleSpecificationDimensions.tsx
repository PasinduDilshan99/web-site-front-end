import React from "react";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationDimensionsProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationDimensions: React.FC<VehicleSpecificationDimensionsProps> = ({
  vehicleSpec,
}) => {
  const dimensions = [
    {
      label: "Dimensions",
      value: vehicleSpec.dimensions || "N/A",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      bgColor: "from-teal-500 to-teal-600",
      lightBg: "bg-teal-50",
    },
    {
      label: "Wheelbase",
      value: vehicleSpec.wheelbaseMm ? `${vehicleSpec.wheelbaseMm} mm` : "N/A",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      bgColor: "from-cyan-500 to-cyan-600",
      lightBg: "bg-cyan-50",
    },
    {
      label: "Weight",
      value: vehicleSpec.weightKg ? `${vehicleSpec.weightKg} kg` : "N/A",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      bgColor: "from-teal-400 to-cyan-400",
      lightBg: "bg-teal-50",
    },
    {
      label: "Fuel Tank",
      value: `${vehicleSpec.fuelTankCapacityLiters} L`,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 h-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-1 h-6 sm:h-7 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Dimensions & Capacity
      </h2>
      
      <div className="space-y-4 sm:space-y-5">
        {dimensions.map((dim, index) => (
          <div key={index} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 ${dim.lightBg} rounded-xl hover:shadow-md transition-shadow duration-300`}>
            <div className={`p-2 sm:p-3 bg-gradient-to-br ${dim.bgColor} rounded-lg text-white shrink-0`}>
              {dim.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">{dim.label}</p>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate">{dim.value}</p>
            </div>
          </div>
        ))}

        {/* CO2 Emissions (if applicable) */}
        {vehicleSpec.co2EmissionsGKm && (
          <div className="mt-4 p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">CO₂ Emissions</span>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-gray-800">{vehicleSpec.co2EmissionsGKm} g/km</span>
                <div className="w-16 sm:w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    style={{ width: `${Math.min((vehicleSpec.co2EmissionsGKm / 250) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSpecificationDimensions;