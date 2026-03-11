import React from "react";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationPerformanceProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationPerformance: React.FC<VehicleSpecificationPerformanceProps> = ({
  vehicleSpec,
}) => {
  const performanceSpecs = [
    {
      label: "Horsepower",
      value: `${vehicleSpec.horsepowerHp} HP`,
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-teal-500 to-teal-600",
      lightGradient: "from-teal-50 to-teal-100",
    },
    {
      label: "Torque",
      value: `${vehicleSpec.torqueNm} Nm`,
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243z" />
        </svg>
      ),
      gradient: "from-cyan-500 to-cyan-600",
      lightGradient: "from-cyan-50 to-cyan-100",
    },
    {
      label: "0-100 km/h",
      value: `${vehicleSpec.acceleration0To100}s`,
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-teal-400 to-cyan-400",
      lightGradient: "from-teal-50 to-cyan-50",
    },
    {
      label: "Top Speed",
      value: `${vehicleSpec.topSpeedKmh} km/h`,
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      lightGradient: "from-blue-50 to-cyan-50",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">
        <span className="w-1 h-7 sm:h-8 lg:h-9 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Performance
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {performanceSpecs.map((spec, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${spec.gradient} p-4 sm:p-5 lg:p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="mb-2 sm:mb-3 lg:mb-4">{spec.icon}</div>
              <p className="text-xs sm:text-sm opacity-90 mb-1">{spec.label}</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Electric Range (if applicable) - Responsive */}
      {vehicleSpec.electricRangeKm && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full text-white">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-teal-700">Electric Range</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-800">
                  {vehicleSpec.electricRangeKm} km
                </p>
              </div>
            </div>
            <div className="flex-1 h-2 bg-teal-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                style={{ width: `${Math.min((vehicleSpec.electricRangeKm / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSpecificationPerformance;