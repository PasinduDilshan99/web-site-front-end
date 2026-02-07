"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, Users, Award, MapPin, Heart, Globe, LucideIcon } from 'lucide-react';
import { OurStoryService } from '@/services/ourStoryService'; // Import service
import { 
  TimelineItem, 
  CoreValue, 
  OurStoryData,
  ColorClasses,
  ColorMap
} from '@/types/our-story-types'; // Import types

// Icon mapping with proper LucideIcon type
const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Users,
  Award,
  MapPin,
  Heart,
  Globe,
};

// Color mapping for Tailwind CSS classes
const colorMap: ColorMap = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50',
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-600',
    bgLight: 'bg-teal-50',
  },
  amber: {
    bg: 'bg-amber-600',
    text: 'text-amber-600',
    bgLight: 'bg-amber-50',
  },
  purple: {
    bg: 'bg-purple-600',
    text: 'text-purple-600',
    bgLight: 'bg-purple-50',
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    bgLight: 'bg-red-50',
  },
  'blue-teal': {
    bg: 'bg-gradient-to-r from-blue-600 to-teal-600',
    text: 'text-blue-600',
    bgLight: 'bg-gradient-to-r from-blue-50 to-teal-50',
    gradient: 'from-blue-600 to-teal-600',
  }
};

const OurStory = () => {
  const [storyData, setStoryData] = useState<OurStoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOurStoryData = async () => {
      try {
        setLoading(true);
        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { data: storyData, error } = await OurStoryService.fetchOurStoryData();

        if (error) {
          setError(error);
        } else {
          setStoryData(storyData);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching Our Story data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOurStoryData();
  }, []);

  const renderIcon = (iconName: string, color: string, size = 'w-5 h-5 sm:w-6 sm:h-6') => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      console.warn(`Icon ${iconName} not found in iconMap`);
      return null;
    }
    
    const colorClasses = colorMap[color] || colorMap.blue;
    return <IconComponent className={`${size} ${colorClasses.text}`} />;
  };

  const getTimelineDotColor = (color: string) => {
    const colorClasses = colorMap[color] || colorMap.blue;
    
    // Special handling for gradient colors
    if (color === 'blue-teal') {
      return 'bg-gradient-to-r from-blue-600 to-teal-600';
    }
    
    return colorClasses.bg;
  };

  const getCardBackground = (color: string, index: number, totalItems: number) => {
    const colorClasses = colorMap[color] || colorMap.blue;
    
    // Last item gets special treatment
    if (index === totalItems - 1) {
      if (color === 'blue-teal') {
        return 'bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100';
      }
      return `bg-gradient-to-r from-${color}-50 to-${color}-100 border border-${color}-100`;
    }
    
    return 'bg-white border border-gray-100';
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Loading our story...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 text-red-600 p-4 sm:p-6 rounded-lg">
            <p className="text-sm sm:text-base">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!storyData) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base text-gray-600">No data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Journey
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Our Story
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-400 mx-auto mb-4 sm:mb-5 md:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            From a small travel desk in Colombo to becoming Sri Lanka&apos;s trusted travel partner. 
            Our journey is one of passion, dedication, and love for our beautiful island.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-10 sm:mb-12 md:mb-16">
          {/* Vertical Line - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 to-teal-200"></div>
          
          {/* Mobile Vertical Line - Left aligned */}
          <div className="md:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-teal-200"></div>
          
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {storyData.timelines.map((item, index) => {
              const isEven = index % 2 === 0;
              const colorClasses = colorMap[item.color] || colorMap.blue;
              
              return (
                <div key={item.storyId} className="relative">
                  
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start gap-4 sm:gap-6">
                    {/* Timeline dot */}
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full border-2 sm:border-3 border-white shadow-lg ${getTimelineDotColor(item.color)} mt-1`}></div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg ${getCardBackground(item.color, index, storyData.timelines.length)}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className={`${colorClasses.bgLight} p-2 sm:p-2.5 rounded-lg`}>
                            {renderIcon(item.iconName, item.color, 'w-4 h-4 sm:w-5 sm:h-5')}
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{item.yearLabel}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center">
                    {isEven ? (
                      <>
                        <div className="w-1/2"></div>
                        <div className={`w-5 h-5 lg:w-6 lg:h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white shadow-lg z-10 ${getTimelineDotColor(item.color)}`}></div>
                        <div className="w-1/2 pl-8 lg:pl-12">
                          <div className={`p-5 lg:p-6 rounded-2xl shadow-lg ${getCardBackground(item.color, index, storyData.timelines.length)}`}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`${colorClasses.bgLight} p-2.5 lg:p-3 rounded-lg`}>
                                {renderIcon(item.iconName, item.color, 'w-5 h-5 lg:w-6 lg:h-6')}
                              </div>
                              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{item.yearLabel}</h3>
                            </div>
                            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-8 lg:pr-12 text-right">
                          <div className={`p-5 lg:p-6 rounded-2xl shadow-lg ${getCardBackground(item.color, index, storyData.timelines.length)}`}>
                            <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                              <div className={`${colorClasses.bgLight} p-2.5 lg:p-3 rounded-lg`}>
                                {renderIcon(item.iconName, item.color, 'w-5 h-5 lg:w-6 lg:h-6')}
                              </div>
                              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{item.yearLabel}</h3>
                            </div>
                            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 lg:w-6 lg:h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white shadow-lg z-10 ${getTimelineDotColor(item.color)}`}></div>
                        <div className="w-1/2"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {storyData.coreValues.map((value) => {
              const colorClasses = colorMap[value.color] || colorMap.blue;
              
              return (
                <div key={value.valueId} className="text-center">
                  <div className="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
                    {renderIcon(value.iconName, value.color, 'w-7 h-7 sm:w-8 sm:h-8')}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action - Commented out but with responsive classes added */}
        {/* <div className="text-center mt-12 sm:mt-14 md:mt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 px-4">
            Ready to Experience Sri Lanka With Us?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Join thousands of travelers who have trusted us with their Sri Lankan adventures. 
            Let&apos;s create your perfect journey together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Planning Your Trip
            </button>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-blue-600 text-blue-600 text-sm sm:text-base font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
              Meet Our Team
            </button>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default OurStory;