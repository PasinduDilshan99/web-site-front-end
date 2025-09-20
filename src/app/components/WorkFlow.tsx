'use client'
import { GET_ACTIVE_WORK_FLOW_STEPS } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="white" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ConnectIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="white" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ReceiveIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="white" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const SecureIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="white" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

// Sample data matching your image
const sampleWorkFlowSteps: WorkFlowStepsType[] = [
  {
    id: 1,
    title: "Submit Your Details",
    description: "",
    iconUrl: "/images/icons/submit-icon.png",
    iconColor: "#ffffff",
    bgColor: "#22C55E",
    connectText: "",
    linkUrl: "/submit-details",
    orderNumber: 1
  },
  {
    id: 2,
    title: "Connect with a Local Expert Online",
    description: "",
    iconUrl: "/images/icons/connect-icon.png",
    iconColor: "#ffffff",
    bgColor: "#22C55E",
    connectText: "Free Consultation",
    linkUrl: "/connect-expert",
    orderNumber: 2
  },
  {
    id: 3,
    title: "Receive 3 Personalised Travel Quotes",
    description: "",
    iconUrl: "/images/icons/quotes-icon.png",
    iconColor: "#ffffff",
    bgColor: "#22C55E",
    connectText: "",
    linkUrl: "/travel-quotes",
    orderNumber: 3
  },
  {
    id: 4,
    title: "Secure Your Booking",
    description: "",
    iconUrl: "/images/icons/booking-icon.png",
    iconColor: "#ffffff",
    bgColor: "#22C55E",
    connectText: "",
    linkUrl: "/secure-booking",
    orderNumber: 4
  }
];

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

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors(prev => new Set([...prev, originalUrl]));
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
          setError(data.error || 'Failed to fetch work flow steps');
        }
      } catch (err) {
        console.error('Error fetching work flow steps:', err);
        setError('Something went wrong while fetching work flow steps');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkFlowSteps();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <div className="animate-pulse">
              <div className="h-8 sm:h-10 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
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
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
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
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-500 text-lg">No workflow steps available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
      <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-0">
            How It Works
          </h2>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Mobile Layout - Vertical */}
          <div className="flex flex-col space-y-8 lg:hidden">
            {workFlowSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                {/* Step Number */}
                <div className="flex-shrink-0 text-right w-8">
                  <span className="text-sm font-bold text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    {imageErrors.has(step.iconUrl) ? (
                      getDefaultIcon(index)
                    ) : (
                      <Image
                        src={getValidImageUrl(step.iconUrl)}
                        alt={`${step.title} icon`}
                        width={28}
                        height={28}
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        onError={() => handleImageError(step.iconUrl)}
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  {/* Connect Text */}
                  {step.connectText && (
                    <div className="mb-2">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        {step.connectText}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {step.title}
                  </h3>
                  
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Connecting Line */}
                {index < workFlowSteps.length - 1 && (
                  <div className="absolute left-12 top-16 w-0.5 h-8 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:flex items-center justify-between relative">
            {workFlowSteps.map((step, index) => (
              <div key={step.id} className="flex-1 flex flex-col items-center relative">
                {/* Step Number */}
                <div className="mb-4">
                  <span className="text-sm xl:text-base font-bold text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < workFlowSteps.length - 1 && (
                  <div className="absolute top-20 xl:top-24 left-1/2 w-full h-0.5 bg-gray-300 z-0" 
                       style={{ transform: 'translateX(25%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
                  </div>
                )}

                {/* Connect Text */}
                {step.connectText && index < workFlowSteps.length - 1 && (
                  <div className="absolute -top-2 xl:-top-1 left-1/2 transform translate-x-12 xl:translate-x-16 bg-gray-50 px-2">
                    <span className="text-xs xl:text-sm text-gray-500 font-medium whitespace-nowrap">
                      {step.connectText}
                    </span>
                  </div>
                )}

                {/* Step Icon */}
                <div
                  className="w-16 h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center mb-4 xl:mb-6 z-10 shadow-lg transform hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: step.bgColor }}
                >
                  {imageErrors.has(step.iconUrl) ? (
                    getDefaultIcon(index)
                  ) : (
                    <Image
                      src={getValidImageUrl(step.iconUrl)}
                      alt={`${step.title} icon`}
                      width={32}
                      height={32}
                      className="w-7 h-7 xl:w-8 xl:h-8"
                      onError={() => handleImageError(step.iconUrl)}
                      unoptimized
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center max-w-xs">
                  <h3 className="text-base xl:text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  
                  {step.description && (
                    <p className="text-sm xl:text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button 
            onClick={() => {
              if (workFlowSteps[0]) {
                window.location.href = workFlowSteps[0].linkUrl;
              }
            }}
            className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;