"use client";
import { GET_ACTIVE_ACTIVITIES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface Schedule {
  id: number;
  name: string;
  description: string;
  status: number;
  assume_start_date: string;
  assume_end_date: string;
  duration_hours_start: number;
  duration_hours_end: number;
  special_note: string;
}

interface Requirement {
  id: number;
  name: string;
  value: string;
  description: string;
  color: string;
  status: number;
}

interface ActivityImage {
  id: number;
  name: string;
  description: string;
  status: number;
  image_url: string;
}

interface ActiveActivitiesType {
  id: number;
  name: string;
  description: string;
  season: string;
  status: string;
  schedules: Schedule[];
  requirements: Requirement[];
  images: ActivityImage[];
  destination_id: number;
  activities_category: string;
  duration_hours: number;
  available_from: string;
  available_to: string;
  price_local: number;
  price_foreigners: number;
  min_participate: number;
  max_participate: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_description: string;
}

const ActivitiesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeActivities, setActiveActivities] = useState<ActiveActivitiesType[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_ACTIVITIES_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveActivitiesType[] = data.data || [];
          setActiveActivities(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active activities");
        }
      } catch (err) {
        console.error("Error fetching active activities:", err);
        setError("Something went wrong while fetching active activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'UPCOMING': 'bg-blue-100 text-blue-800',
      'COMPLETED': 'bg-gray-100 text-gray-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Parse seasons
  const getSeasonBadges = (seasonString: string) => {
    return seasonString.split(',').map(s => s.trim());
  };

  // Get category image (fallback to placeholder)
  const getCategoryImage = (activity: ActiveActivitiesType) => {
    if (activity.images && activity.images.length > 0) {
      return activity.images[0].image_url;
    }
    // Fallback placeholder based on category
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-300 rounded-full w-80 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-8 bg-gray-300 rounded"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Activities</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Adventure Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover exciting activities and experiences. From thrilling adventures to relaxing tours, 
            find the perfect activity for your next journey.
          </p>
        </div>

        {activeActivities.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Activities Available</h3>
              <p className="text-gray-600">Check back later for new activities and adventures.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeActivities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Activity Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={getCategoryImage(activity)}
                    alt={activity.category_name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {activity.category_name}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <div className="flex flex-col">
                      <div>
                        <span className="text-xl font-bold text-gray-900">${activity.price_foreigners}</span>
                        <span className="text-xs text-gray-600 ml-1">foreign</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-700">${activity.price_local}</span>
                        <span className="text-xs text-gray-600 ml-1">local</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="p-6">
                  {/* Activity Title and Description */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {activity.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  {/* Key Information Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{activity.duration_hours} hours</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        {activity.min_participate}-{activity.max_participate}
                      </span>
                    </div>
                  </div>

                  {/* Seasons */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">Best Seasons</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getSeasonBadges(activity.season).map((season, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                          {season}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  {activity.requirements.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">Requirements</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activity.requirements.slice(0, 3).map((req) => (
                          <span 
                            key={req.id} 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${req.color}20`,
                              color: req.color
                            }}
                          >
                            {req.name}: {req.value}
                          </span>
                        ))}
                        {activity.requirements.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{activity.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Schedules */}
                  {activity.schedules.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">Available Schedules</span>
                      </div>
                      <div className="space-y-2">
                        {activity.schedules.slice(0, 2).map((schedule) => (
                          <div key={schedule.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                            <div className="font-medium text-gray-900">{schedule.name}</div>
                            <div className="text-gray-600 text-xs">
                              {formatDate(schedule.assume_start_date)} - {formatDate(schedule.assume_end_date)}
                            </div>
                            {schedule.special_note && (
                              <div className="text-blue-600 text-xs mt-1">💡 {schedule.special_note}</div>
                            )}
                          </div>
                        ))}
                        {activity.schedules.length > 2 && (
                          <div className="text-center text-xs text-gray-500">
                            +{activity.schedules.length - 2} more schedules
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Availability Times */}
                  <div className="mb-4 bg-blue-50 rounded-lg p-3">
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Available:</span> {activity.available_from} - {activity.available_to}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesHome;