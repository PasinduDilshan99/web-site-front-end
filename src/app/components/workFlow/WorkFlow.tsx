"use client";
import { GET_ACTIVE_WORK_FLOW_STEPS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface WorkFlowStepsType {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  iconColor: string;
  bgColor: string;
  connectText: string;
  linkUrl: string;
  orderNumber: number;
}

// Default step icons
const SubmitIcon = () => (
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ConnectIcon = () => (
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const ReceiveIcon = () => (
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const SecureIcon = () => (
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

// Get default icon based on step
const getDefaultIcon = (index: number) => {
  const icons = [SubmitIcon, ConnectIcon, ReceiveIcon, SecureIcon];
  const IconComponent = icons[index] || SubmitIcon;
  return <IconComponent />;
};

// Default fallback image
const getDefaultImage = () => {
  return "/images/default-workflow-icon.png";
};

const WorkFlow = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workFlowSteps, setWorkFlowSteps] = useState<WorkFlowStepsType[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors((prev) => new Set([...prev, originalUrl]));
  };

  // Get valid image URL
  const getValidImageUrl = (originalUrl: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

  useEffect(() => {
    const fetchWorkFlowSteps = async () => {
      try {
        setLoading(true);

        const response = await fetch(GET_ACTIVE_WORK_FLOW_STEPS);
        const data = await response.json();

        if (response.ok) {
          const steps: WorkFlowStepsType[] = data.data || [];
          // Sort by order number
          steps.sort((a, b) => a.orderNumber - b.orderNumber);
          setWorkFlowSteps(steps);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch work flow steps");
        }
      } catch (err) {
        console.error("Error fetching work flow steps:", err);
        setError("Something went wrong while fetching work flow steps");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkFlowSteps();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 sm:h-10 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center animate-pulse"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (workFlowSteps.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-500 text-lg">No workflow steps available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Gradient Title */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Follow these simple steps to understand our process and get started
            easily.
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Mobile & Tablet (vertical) */}
          <div className="lg:hidden space-y-12">
            {workFlowSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start space-x-4 relative"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <span className="text-lg sm:text-xl font-bold text-gray-400 block w-8 text-right">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out ${
                      hoveredStep === step.id ? "scale-110" : "scale-100"
                    }`}
                    style={{ backgroundColor: step.bgColor || "#A855F7" }}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {imageErrors.has(step.iconUrl) ? (
                      getDefaultIcon(index)
                    ) : (
                      <Image
                        src={getValidImageUrl(step.iconUrl)}
                        alt={step.title}
                        width={32}
                        height={32}
                        className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300"
                        onError={() => handleImageError(step.iconUrl)}
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-md sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Connecting Line */}
                {index < workFlowSteps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-12 bg-gray-200 ml-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Laptop & Desktop (horizontal) */}
          <div className="hidden lg:flex items-start justify-between relative">
            {workFlowSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center text-center relative z-10 px-2 md:px-4"
              >
                {/* Step Number */}
                <div className="mb-4 md:mb-6 text-lg md:text-xl font-bold text-[#A855F7]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Step Icon */}
                <div
                  className={`w-16 md:w-20 h-16 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-lg border-4 border-white transition-all duration-300 ease-in-out ${
                    hoveredStep === step.id ? "scale-110" : "scale-100"
                  }`}
                  style={{ backgroundColor: step.bgColor || "#A855F7" }}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {imageErrors.has(step.iconUrl) ? (
                    getDefaultIcon(index)
                  ) : (
                    <Image
                      src={getValidImageUrl(step.iconUrl)}
                      alt={step.title}
                      width={40}
                      height={40}
                      className="w-8 md:w-10 h-8 md:h-10 transition-transform duration-300"
                      onError={() => handleImageError(step.iconUrl)}
                      unoptimized
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="px-2 md:px-4">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Connecting Arrow */}
                {index < workFlowSteps.length - 1 && (
                  <div className="absolute top-10 right-0 transform translate-x-1/2 flex items-center">
                    <span className="text-gray-400 text-sm font-medium mx-2">
                      {step.connectText || "Next"}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Horizontal connecting line */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] -z-10"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            Get Start Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
