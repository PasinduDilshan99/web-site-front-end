import React from "react";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationFeaturesProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationFeatures: React.FC<VehicleSpecificationFeaturesProps> = ({
  vehicleSpec,
}) => {
  const features = [
    {
      category: "Comfort",
      items: [
        { label: "Air Conditioning", value: vehicleSpec.airCondition ? "Yes" : "No", icon: "❄️" },
        { label: "AC Type", value: vehicleSpec.airConditioningType.acTypeName, icon: "🌡️" },
        { label: "Upholstery", value: vehicleSpec.upholsteryType || "Standard", icon: "🪑" },
        { label: "Sunroof", value: vehicleSpec.sunroofType, icon: "☀️" },
      ],
    },
    {
      category: "Convenience",
      items: [
        { label: "Cruise Control", value: vehicleSpec.cruiseControlType, icon: "🎯" },
        { label: "Entertainment", value: vehicleSpec.entertainmentFeatures || "Standard", icon: "🎵" },
        { label: "Comfort Features", value: vehicleSpec.comfortFeatures || "Standard", icon: "✨" },
      ],
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 h-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-1 h-6 sm:h-7 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Features & Comfort
      </h2>
      
      <div className="space-y-6 sm:space-y-8">
        {features.map((category, idx) => (
          <div key={idx}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></span>
              {category.category}
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {category.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg">{item.icon}</span>
                    <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tire Information */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
            Tires & Wheels
          </h3>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 bg-white/60 rounded-lg">
              <span className="text-xs sm:text-sm text-gray-600">Wheel Size:</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">{vehicleSpec.wheelSize || "N/A"}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 bg-white/60 rounded-lg">
              <span className="text-xs sm:text-sm text-gray-600">Tire Type:</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">{vehicleSpec.tireType || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationFeatures;