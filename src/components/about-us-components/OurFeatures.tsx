"use client"
import React, { useEffect, useState } from 'react';

interface Feature {
  featureId: number;
  featureName: string;
  iconUrl: string;
  color: string;
  hoverColor: string;
  description: string;
  statusId: number;
  statusName: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Feature[];
  timestamp: string;
}

const OurFeatures: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:8080/felicita/api/v0/our-features/details', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cookie': 'token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.code === 200 && data.data) {
        setFeatures(data.data);
      } else {
        throw new Error(data.message || 'Failed to retrieve features');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600">Loading our features...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-red-600">Unable to Load Features</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchFeatures}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (features.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700">No Features Available</h3>
          <p className="text-gray-600">Features will be displayed here once available.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the best services with our comprehensive features designed for your convenience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.featureId}
              className="group relative rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              style={{ 
                backgroundColor: feature.color,
                borderTop: `3px solid ${feature.hoverColor}`,
              }}
            >
              {/* Icon Container */}
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: feature.hoverColor }}
              >
                <div className="text-2xl font-semibold">
                  {/* Icon based on iconUrl */}
                  {feature.iconUrl.includes('book-now') && '📅'}
                  {feature.iconUrl.includes('guide') && '🧭'}
                  {feature.iconUrl.includes('customization') && '⚙️'}
                  {feature.iconUrl.includes('customer-care') && '📞'}
                </div>
              </div>

              {/* Feature Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.featureName}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-6">
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    feature.statusName === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    feature.statusName === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  {feature.statusName}
                </span>
              </div>

              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: feature.hoverColor }}
              />
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{features.length}</p>
                <p className="text-sm text-gray-600">Total Features</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {features.filter(f => f.statusName === 'ACTIVE').length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;