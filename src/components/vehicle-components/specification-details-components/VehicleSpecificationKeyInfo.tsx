import React from "react";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationKeyInfoProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationKeyInfo: React.FC<VehicleSpecificationKeyInfoProps> = ({
  vehicleSpec,
}) => {
  const specs = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: "Engine",
      value: vehicleSpec.engineType,
      subValue: vehicleSpec.engineCapacity,
      bgColor: "from-teal-500 to-teal-600",
      lightBg: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Transmission",
      value: vehicleSpec.transmission.transmissionTypeName,
      bgColor: "from-cyan-500 to-cyan-600",
      lightBg: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Drivetrain",
      value: vehicleSpec.drivetrain,
      bgColor: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      label: "Fuel Type",
      value: vehicleSpec.fuelType.fuelTypeName,
      bgColor: "from-teal-400 to-cyan-400",
      lightBg: "bg-teal-50",
      textColor: "text-teal-600",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-1 h-6 sm:h-7 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Key Specifications
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 ${spec.lightBg} rounded-xl hover:shadow-md transition-shadow duration-300`}
          >
            <div className={`p-2 sm:p-3 bg-gradient-to-br ${spec.bgColor} rounded-lg text-white shrink-0`}>
              {spec.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-500">{spec.label}</p>
              <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">{spec.value}</p>
              {spec.subValue && (
                <p className="text-xs sm:text-sm text-gray-600 truncate">{spec.subValue}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Quick Specs */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
          <p className="text-xs sm:text-sm text-teal-600">Doors</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-800">{vehicleSpec.doors}</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
          <p className="text-xs sm:text-sm text-cyan-600">Seats</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-800">{vehicleSpec.seatCapacity}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationKeyInfo;