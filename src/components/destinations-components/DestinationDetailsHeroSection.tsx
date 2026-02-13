"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DestinationData, DestinationImage } from "@/types/destination-types";
import { OtherService } from "@/services/otherService";
import { WeatherResponse } from "@/types/other-types";

interface DestinationDetailsHeroSectionProps {
  destination: DestinationData;
}

const DestinationDetailsHeroSection: React.FC<DestinationDetailsHeroSectionProps> = ({
  destination,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Fetch weather data when destination is available
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!destination.latitude || !destination.longitude) return;
      
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        
        const data = await OtherService.getCurrentWeather(
          destination.latitude.toString(),
          destination.longitude.toString()
        );
        
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherError("Weather data unavailable");
      } finally {
        setWeatherLoading(false);
      }
    };

    if (destination) {
      fetchWeatherData();
    }
  }, [destination]);

  // Auto-play functionality for image slider
  useEffect(() => {
    if (!isAutoPlaying || destination.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % destination.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, destination.images.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % destination.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + destination.images.length) % destination.images.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  // Helper function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9/5) + 32);
  };

  // Helper function to get weather description from weather code
  const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    
    return weatherCodes[code] || "Unknown weather";
  };

  // Get climate type based on latitude
  const getClimateType = (latitude: number): string => {
    if (Math.abs(latitude) <= 23.5) return "Tropical";
    if (Math.abs(latitude) <= 35) return "Subtropical";
    if (Math.abs(latitude) <= 66.5) return "Temperate";
    return "Polar";
  };

  // Retry weather fetch function
  const retryWeatherFetch = async () => {
    if (!destination.latitude || !destination.longitude) return;
    
    try {
      setWeatherLoading(true);
      setWeatherError(null);
      
      const data = await OtherService.getCurrentWeather(
        destination.latitude.toString(),
        destination.longitude.toString()
      );
      
      setWeatherData(data);
    } catch (err) {
      console.error("Error retrying weather fetch:", err);
      setWeatherError("Failed to load weather");
    } finally {
      setWeatherLoading(false);
    }
  };

  if (!destination.images.length) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">{destination.destinationName}</h1>
            <p className="text-xl opacity-90">{destination.destinationDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {destination.images.map((image, index) => {
            const hasImage = !failedImages.has(index);
            
            return (
              <div
                key={image.imageId}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {hasImage ? (
                  <>
                    <Image
                      src={image.imageUrl}
                      alt={image.imageName || `Destination image ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={2000}
                      height={1200}
                      priority={index === 0}
                      onError={() => handleImageError(index)}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </>
                ) : (
                  // Pure gradient background when image failed
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
                    {/* Gradient Overlay for consistency */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Weather Widget - Positioned to avoid overlap */}
        {destination.latitude && destination.longitude && (
          <div className="absolute top-6 right-6 md:block z-20">
            <div className="bg-white/10 backdrop-blur-2xl rounded-xl p-4 border border-white/20 min-w-[200px] shadow-lg">
              {weatherLoading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-pulse">
                    <div className="w-5 h-5 bg-yellow-300/50 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-white/30 rounded"></div>
                    <div className="h-4 w-16 bg-white/30 rounded"></div>
                  </div>
                </div>
              ) : weatherError ? (
                <div className="text-center">
                  <p className="text-sm text-white/80 mb-2">Weather Unavailable</p>
                  <button
                    onClick={retryWeatherFetch}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : weatherData && weatherData.current_weather ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-white/80">Current Weather</p>
                      <p className="text-lg font-bold text-teal-200">
                        {weatherData.current_weather.temperature}°C / {celsiusToFahrenheit(weatherData.current_weather.temperature)}°F
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-white/70 truncate">
                      {getWeatherDescription(weatherData.current_weather.weathercode)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Wind: {weatherData.current_weather.windspeed} km/h
                      </span>
                      <span className="text-xs text-white/60">
                        {getClimateType(destination.latitude)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-yellow-300/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-white/80">Current Climate</p>
                    <p className="text-lg font-bold text-teal-300/50">--°C / --°F</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center">
              {/* Destination Category Badge - CENTERED */}
              <div className="hidden mb-6 lg:flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-sky-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {destination.categoryName}
                </span>
                <span className="px-4 py-2 bg-teal-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {destination.location}
                </span>
                {destination.activities && destination.activities.length > 0 && (
                  <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {destination.activities.length} Activities
                  </span>
                )}
              </div>

              {/* Destination Title and Description - CENTERED */}
              <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {destination.destinationName}
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-3xl mb-8">
                  <p className="text-md md:text-lg lg:text-xl text-gray-100 leading-relaxed mb-6">
                    {destination.destinationDescription}
                  </p>

                  {/* Destination Info - CENTERED */}
                  <div className="flex flex-wrap gap-4 text-xs lg:text-sm justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 rounded-full">
                      <svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">
                        Location: {destination.location}
                        {destination.latitude && destination.longitude && (
                          <span className="text-xs ml-2 opacity-75">
                            ({destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full">
                      <svg className="w-5 h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="font-medium">Category: {destination.categoryName}</span>
                    </div>
                    {destination.activities && destination.activities.length > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full">
                        <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="font-medium">{destination.activities.length} Available Activities</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Counter - CENTERED */}
              {destination.images.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex mx-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {selectedImageIndex + 1} / {destination.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Adjusted to avoid weather widget */}
        {destination.images.length > 1 && (
          <div className="hidden md:flex">
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-20"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-20"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Slide Indicators - CENTERED */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {destination.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
              style={{
                width: `${((selectedImageIndex + 1) / destination.images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DestinationDetailsHeroSection;