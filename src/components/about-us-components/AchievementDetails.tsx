"use client"
import React, { useEffect, useState } from 'react';

export interface AchievementImage {
  imageId: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
}

export interface Achievement {
  achievementId: number;
  name: string;
  color: string;
  hoverColor: string;
  description: string;
  status: string;
  images: AchievementImage[];
}

export interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Achievement[];
  timestamp: string;
}

const AchievementDetails: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    fetchAchievementDetails();
  }, []);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [currentIndex]);

  const fetchAchievementDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8080/felicita/api/v0/achievement/details', {
        method: 'GET',
        headers: {
          'Cookie': 'token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1IiwidXNlcklkIjo0LCJ1c2VybmFtZSI6InBhc2luZHUiLCJpYXQiOjE3NjI2Njg5NjksImV4cCI6MTc2MjY2OTA4OX0.5wQ6QL3q2pvSoCEhDze6t_Aub3Vb8hlcMRQ3UQxu8yg',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      
      if (result.code === 200 && result.data) {
        setAchievements(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch achievements');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? achievements.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === achievements.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Error Loading Achievements</h3>
          <p>{error}</p>
          <button
            onClick={fetchAchievementDetails}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-4">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Achievements Found</h3>
        <p className="text-gray-500 mb-6">There are no achievements available at the moment.</p>
        <button
          onClick={fetchAchievementDetails}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    );
  }

  const currentAchievement = achievements[currentIndex];
  const currentImage = currentAchievement.images[selectedImageIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Achievement Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left - Image Section */}
          <div>
            {/* Main Image with Blue Border */}
            <div className="relative mb-4">
              <div 
                className="absolute -left-4 -top-4 w-full h-full rounded-lg"
                style={{ backgroundColor: currentAchievement.color }}
              ></div>
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                {currentImage ? (
                  <img 
                    src={currentImage.imageUrl} 
                    alt={currentImage.name}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-96 flex items-center justify-center ${currentImage ? 'hidden' : ''}`}>
                  <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {currentAchievement.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {currentAchievement.images.map((image, index) => (
                  <button
                    key={image.imageId}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-600 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{currentAchievement.name}</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {currentAchievement.description}
            </p>
            <button 
              onClick={goToNext}
              className="px-8 py-3 rounded-full text-white font-medium transition-all hover:shadow-lg w-fit"
              style={{ backgroundColor: '#00bcd4' }}
            >
              VIEW MORE
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {achievements.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementDetails;