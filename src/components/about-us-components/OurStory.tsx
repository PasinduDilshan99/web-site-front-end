"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, Users, Award, MapPin, Heart, Globe, LucideIcon } from 'lucide-react';

// Define types for the API response
interface TimelineItem {
  storyId: number;
  yearLabel: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  orderNo: number;
}

interface CoreValue {
  valueId: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  orderNo: number;
}

interface OurStoryData {
  timelines: TimelineItem[];
  coreValues: CoreValue[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: OurStoryData;
  timestamp: string;
}

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
const colorMap: { [key: string]: { 
  bg: string; 
  text: string; 
  border?: string;
  bgLight: string;
  gradient?: string;
} } = {
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
        const response = await fetch('http://localhost:8080/felicita/api/v0/our-story/details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${document.cookie.split('token=')[1]?.split(';')[0] || ''}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.code === 200 && data.data) {
          // Sort timelines by orderNo
          const sortedTimelines = [...data.data.timelines].sort((a, b) => a.orderNo - b.orderNo);
          // Sort coreValues by orderNo
          const sortedCoreValues = [...data.data.coreValues].sort((a, b) => a.orderNo - b.orderNo);
          
          setStoryData({
            timelines: sortedTimelines,
            coreValues: sortedCoreValues,
          });
        } else {
          throw new Error(data.message || 'Failed to fetch data');
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

  const renderIcon = (iconName: string, color: string, size = 'w-6 h-6') => {
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
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading our story...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            <p>Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">No data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From a small travel desk in Colombo to becoming Sri Lanka&apos;s trusted travel partner. 
            Our journey is one of passion, dedication, and love for our beautiful island.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-16">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 to-teal-200"></div>
          
          <div className="space-y-12">
            {storyData.timelines.map((item, index) => {
              const isEven = index % 2 === 0;
              const colorClasses = colorMap[item.color] || colorMap.blue;
              
              return (
                <div key={item.storyId} className="relative flex items-center">
                  {isEven ? (
                    <>
                      <div className="hidden md:block md:w-1/2"></div>
                      <div className={`w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white shadow-lg z-10 ${getTimelineDotColor(item.color)}`}></div>
                      <div className="md:w-1/2 md:pl-12">
                        <div className={`p-6 rounded-2xl shadow-lg ${getCardBackground(item.color, index, storyData.timelines.length)}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`${colorClasses.bgLight} p-3 rounded-lg`}>
                              {renderIcon(item.iconName, item.color)}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{item.yearLabel}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 md:pr-12 md:text-right">
                        <div className={`p-6 rounded-2xl shadow-lg ${getCardBackground(item.color, index, storyData.timelines.length)}`}>
                          <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                            <div className={`${colorClasses.bgLight} p-3 rounded-lg`}>
                              {renderIcon(item.iconName, item.color)}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{item.yearLabel}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white shadow-lg z-10 ${getTimelineDotColor(item.color)}`}></div>
                      <div className="hidden md:block md:w-1/2"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {storyData.coreValues.map((value) => {
              const colorClasses = colorMap[value.color] || colorMap.blue;
              
              return (
                <div key={value.valueId} className="text-center">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    {renderIcon(value.iconName, value.color, 'w-8 h-8')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Sri Lanka With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have trusted us with their Sri Lankan adventures. 
            Let&apos;s create your perfect journey together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Planning Your Trip
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
              Meet Our Team
            </button>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default OurStory;