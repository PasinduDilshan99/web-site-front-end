import React from "react";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationSafetyProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationSafety: React.FC<VehicleSpecificationSafetyProps> = ({
  vehicleSpec,
}) => {
  const safetyFeatures = [
    {
      name: "Airbags",
      value: vehicleSpec.airbagsCount,
      icon: "🛡️",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      name: "NCAP Rating",
      value: vehicleSpec.ncapSafetyRating ? `${vehicleSpec.ncapSafetyRating}/5` : "Not Rated",
      icon: "⭐",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Parking Camera",
      value: vehicleSpec.parkingCamera || "Not Available",
      icon: "📹",
      gradient: "from-teal-400 to-cyan-400",
    },
    {
      name: "Lane Departure",
      value: vehicleSpec.laneDepartureWarning ? "Yes" : "No",
      icon: "🚧",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">
        <span className="w-1 h-7 sm:h-8 lg:h-9 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Safety & Security
      </h2>
      
      {/* Safety Rating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
        {safetyFeatures.map((feature, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 sm:p-5 lg:p-6 text-white shadow-lg`}
          >
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</div>
              <p className="text-xs sm:text-sm opacity-90 mb-1">{feature.name}</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold">{feature.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Safety Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Safety Features List */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
            Safety Equipment
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {vehicleSpec.safetyFeatures?.split(',').map((feature, index) => (
              <li key={index} className="flex items-center gap-2 sm:gap-3 p-2 bg-white/60 rounded-lg">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full"></span>
                <span className="text-xs sm:text-sm text-gray-700">{feature.trim()}</span>
              </li>
            )) || (
              <li className="text-xs sm:text-sm text-gray-500 p-2">No additional safety features listed</li>
            )}
          </ul>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
            Safety Highlights
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
              <span className="text-xs sm:text-sm text-gray-600">Airbags Count</span>
              <span className="text-sm sm:text-base font-bold text-teal-600">{vehicleSpec.airbagsCount}</span>
            </div>
            {vehicleSpec.ncapSafetyRating && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600">NCAP Safety Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-base font-bold text-cyan-600">{vehicleSpec.ncapSafetyRating}</span>
                  <span className="text-cyan-500 text-sm sm:text-base">★</span>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
              <span className="text-xs sm:text-sm text-gray-600">Lane Departure Warning</span>
              <span className={`text-sm sm:text-base font-bold ${
                vehicleSpec.laneDepartureWarning ? 'text-teal-600' : 'text-cyan-600'
              }`}>
                {vehicleSpec.laneDepartureWarning ? 'Active' : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationSafety;