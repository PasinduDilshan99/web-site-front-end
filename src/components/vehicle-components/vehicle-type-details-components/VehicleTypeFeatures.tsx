// components/vehicle-type-components/VehicleTypeFeatures.tsx
import React from "react";
import { VehicleType } from "@/types/vehicle-types";

interface VehicleTypeFeaturesProps {
  vehicleType: VehicleType;
}

const VehicleTypeFeatures: React.FC<VehicleTypeFeaturesProps> = ({
  vehicleType,
}) => {
  // Generate features based on vehicle type name and description
  const generateFeatures = () => {
    const features = [];
    const name = vehicleType.name.toLowerCase();
    const description = vehicleType.description.toLowerCase();

    // Basic features that apply to most vehicle types
    features.push({
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Verified Quality",
      description: "All vehicles in this category meet our quality standards",
      gradient: "from-teal-500 to-teal-600",
    });

    // Features based on vehicle type
    if (name.includes("sedan") || description.includes("sedan")) {
      features.push({
        icon: (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Fuel Efficient",
        description: "Excellent fuel economy for city and highway driving",
        gradient: "from-cyan-500 to-cyan-600",
      });
      features.push({
        icon: (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        title: "Comfortable Sedan",
        description: "Spacious interior with premium comfort features",
        gradient: "from-teal-400 to-cyan-400",
      });
    }

    if (name.includes("suv") || description.includes("suv")) {
      features.push({
        icon: (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        ),
        title: "Spacious SUV",
        description: "Ample space for passengers and cargo",
        gradient: "from-blue-500 to-cyan-500",
      });
      features.push({
        icon: (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        title: "Powerful Performance",
        description: "Robust engine options for all terrains",
        gradient: "from-teal-600 to-cyan-600",
      });
    }

    if (name.includes("luxury") || description.includes("luxury")) {
      features.push({
        icon: (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        ),
        title: "Premium Luxury",
        description: "High-end materials and sophisticated design",
        gradient: "from-teal-500 to-blue-500",
      });
    }

    // Add general features if we have less than 3
    if (features.length < 3) {
      const generalFeatures = [
        {
          icon: (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          title: "Reliable Service",
          description: "Backed by our comprehensive service network",
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          icon: (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          title: "Warranty Included",
          description: "Comprehensive warranty coverage for peace of mind",
          gradient: "from-teal-400 to-cyan-400",
        },
        {
          icon: (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2 2 2 4-4 4 4 2-2 2 2M5 10v8h14v-8M5 10h14" />
            </svg>
          ),
          title: "Flexible Options",
          description: "Various models and configurations available",
          gradient: "from-cyan-600 to-blue-600",
        },
      ];
      
      while (features.length < 3) {
        features.push(generalFeatures[features.length % generalFeatures.length]);
      }
    }

    return features.slice(0, 3); // Return only first 3 features
  };

  const features = generateFeatures();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">
        <span className="w-1 h-7 sm:h-8 lg:h-9 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Key Features
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} p-5 sm:p-6 lg:p-7 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg text-white shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">About this type</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {vehicleType.description} This vehicle type offers the perfect balance of 
              style, comfort, and practicality for your needs. Browse through our collection 
              to find the perfect match for your lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeFeatures;