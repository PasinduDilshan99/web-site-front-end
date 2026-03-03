// app/seasons/[seasonId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SeasonDetails, SeasonImage } from "@/types/season-types";
import { ActivityService } from "@/services/activityService";
import { SeasonService } from "@/services/seasonService";
import SeasonDetailsLoading from "@/components/season-components/SeasonDetailsLoading";

const SeasonDetailsPage = () => {
  const params = useParams();
  const seasonId = params?.seasonId;
  const [season, setSeason] = useState<SeasonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!seasonId) {
      setError("No season ID provided");
      setLoading(false);
      return;
    }

    const fetchSeasonDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const seasonService = new SeasonService();
        const seasonData = await seasonService.getSeasonById(Number(seasonId));

        setSeason(seasonData);
      } catch (err) {
        console.error("Error fetching season details:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching season details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [seasonId]);

  useEffect(() => {
    if (
      !isAutoPlaying ||
      !season?.seasonImages ||
      season.seasonImages.length <= 1
    )
      return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % season.seasonImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, season?.seasonImages]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (season?.seasonImages) {
      setSelectedImageIndex((prev) => (prev + 1) % season.seasonImages.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const prevSlide = () => {
    if (season?.seasonImages) {
      setSelectedImageIndex(
        (prev) =>
          (prev - 1 + season.seasonImages.length) % season.seasonImages.length,
      );
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const getMonthName = (month: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "";
  };

  const getMonsoonTypeColor = (type: string): string => {
    switch (type?.toLowerCase()) {
      case "southwest":
        return "from-blue-400 to-cyan-400";
      case "northeast":
        return "from-teal-400 to-emerald-400";
      case "retreating":
        return "from-sky-400 to-indigo-400";
      default:
        return "from-cyan-400 to-teal-400";
    }
  };

  const retryFetchSeason = async () => {
    if (seasonId) {
      try {
        setLoading(true);
        setError(null);

        const seasonService = new SeasonService();
        const seasonData = await seasonService.getSeasonById(Number(seasonId));

        setSeason(seasonData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching season details",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <SeasonDetailsLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-cyan-600 text-6xl mb-4">🌊</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Season
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={retryFetchSeason}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!season) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-gray-500 text-6xl mb-4">🌿</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Season Not Found
          </h1>
          <p className="text-gray-600">
            The season you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const images = season.seasonImages || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image Slider */}
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            {images.map((image: SeasonImage, index: number) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.imageUrl || "/placeholder-season.jpg"}
                  alt={image.name || `Season image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={2000}
                  height={1200}
                  priority={index === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-800 to-cyan-800">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent" />
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
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
              className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
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
          </>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
            {/* Season Badge */}
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full text-sm md:text-base font-semibold shadow-lg">
                {season.isPeak ? "Peak Season" : "Season"}
              </span>
            </div>

            {/* Season Names */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
              {season.standardName}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-teal-100 mb-4">
              {season.localName}
            </p>

            {/* Month Range */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {getMonthName(season.startMonth)} -{" "}
                {getMonthName(season.endMonth)}
              </span>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
            {images.map((_: SeasonImage, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-teal-400 to-cyan-400 scale-125 shadow-lg w-4 md:w-5"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Description Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About the Season
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {season.description}
              </p>
            </div>

            {/* Weather Summary Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                Weather Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* Temperature */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm md:text-base">
                      Temperature
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-teal-600">
                    {season.temperatureMin}° - {season.temperatureMax}°C
                  </p>
                </div>

                {/* Rainfall Pattern */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 16.5A7.5 7.5 0 0012.5 9H12M20 16.5V12M20 16.5h-4.5M4 7.5A7.5 7.5 0 0111.5 15v0m0 0v3m-3-3h6"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm md:text-base">
                      Rainfall Pattern
                    </span>
                  </div>
                  <p className="text-teal-600 font-medium text-sm md:text-base">
                    {season.rainfallPattern}
                  </p>
                </div>
              </div>

              {/* Weather Summary Text */}
              <div className="mt-4 md:mt-6 p-4 bg-teal-50/50 rounded-xl">
                <p className="text-gray-600 italic text-sm md:text-base">
                  {season.weatherSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="space-y-4 md:space-y-6">
            {/* Monsoon Type Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Monsoon Type
              </h3>
              <div
                className={`p-4 bg-gradient-to-r ${getMonsoonTypeColor(season.monsoonType)} rounded-xl text-white`}
              >
                <p className="text-lg md:text-xl font-semibold capitalize">
                  {season.monsoonType} Monsoon
                </p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm md:text-base">
                    Status
                  </span>
                  <span
                    className={`font-semibold text-sm md:text-base ${season.status === 1 ? "text-green-600" : "text-gray-500"}`}
                  >
                    {season.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm md:text-base">
                    Display Order
                  </span>
                  <span className="font-semibold text-teal-600 text-sm md:text-base">
                    {season.displayOrder}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm md:text-base">
                    Last Updated
                  </span>
                  <span className="text-gray-500 text-xs md:text-sm">
                    {new Date(season.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Season Images Gallery */}
            {images.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {images
                    .slice(0, 4)
                    .map((image: SeasonImage, index: number) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => goToSlide(index)}
                      >
                        <Image
                          src={image.imageUrl || "/placeholder-season.jpg"}
                          alt={image.name || `Season image ${index + 1}`}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsPage;
