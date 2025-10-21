"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Review } from "@/pages/ActivityPage";
import ReviewsSection from "@/components/activities-components/ReviewsSection";

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

interface ActivityData {
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

const ActivityDetailsPage = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/${activityId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch activity: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setActivity(data.data);
          // Fetch reviews for this specific activity after activity data is loaded
          fetchActivityReviews(data.data.id);
        } else {
          throw new Error(data.message || "Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching activity details"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchActivityReviews = async (activityId: number) => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/reviews/${activityId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setReviews(data.data);
        } else {
          throw new Error(data.message || "Failed to load reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviewsError(
          err instanceof Error ? err.message : "Failed to load reviews"
        );
      } finally {
        setReviewsLoading(false);
      }
    };

    if (activityId) {
      fetchActivity();
    } else {
      setError("No activity ID provided");
      setLoading(false);
    }
  }, [activityId]);

  // Format time from "06:00:00" to "6:00 AM"
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      UPCOMING: "bg-amber-100 text-amber-800 border border-amber-200",
      COMPLETED: "bg-gray-100 text-gray-800 border border-gray-200",
      CANCELLED: "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[status as keyof typeof colors] || colors.ACTIVE;
  };

  // Parse seasons
  const getSeasonBadges = (seasonString: string) => {
    try {
      return seasonString.split(",").map((s) => s.trim());
    } catch (error) {
      return [seasonString];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activity details...</p>
          <p className="text-sm text-gray-500 mt-2">
            Activity ID: {activityId}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Load Activity
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">
            Activity ID: {activityId}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Activity Not Found
          </h1>
          <p className="text-gray-600">
            The activity youre looking for doesnt exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Activities</span>
            <span className="text-gray-400">/</span>
            <span className="text-amber-600 font-medium">{activity.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96 lg:h-[500px]">
                {activity.images && activity.images.length > 0 ? (
                  <Image
                    src={
                      activity.images[selectedImageIndex]?.image_url ||
                      "/placeholder-image.jpg"
                    }
                    alt={
                      activity.images[selectedImageIndex]?.name || activity.name
                    }
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {activity.images && activity.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {activity.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-amber-500"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {activity.category_name}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {activity.name}
                  </h1>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                    activity.status
                  )}`}
                >
                  {activity.status}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {activity.description}
              </p>

              {/* Price Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-purple-50 rounded-xl border border-amber-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${activity.price_foreigners}
                      </span>
                      <span className="text-gray-600">
                        per person (foreign)
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-xl font-bold text-gray-800">
                        ${activity.price_local}
                      </span>
                      <span className="text-gray-600">per person (local)</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Key Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Key Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600 font-bold">⏱️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {activity.duration_hours} hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">👥</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-semibold text-gray-900">
                      {activity.min_participate}-{activity.max_participate}{" "}
                      people
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600 font-bold">🕒</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="font-semibold text-gray-900">
                      {formatTime(activity.available_from)} -{" "}
                      {formatTime(activity.available_to)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Best Seasons
              </h2>
              <div className="flex flex-wrap gap-2">
                {getSeasonBadges(activity.season).map((season, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-amber-100 to-purple-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200"
                  >
                    {season}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {activity.requirements && activity.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Requirements
                </h2>
                <div className="grid gap-3">
                  {activity.requirements.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: req.color }}
                        ></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {req.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {req.description}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium border">
                        {req.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedules */}
            {activity.schedules && activity.schedules.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Available Schedules
                </h2>
                <div className="space-y-4">
                  {activity.schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-4 bg-gradient-to-r from-amber-50 to-purple-50 rounded-xl border border-amber-200"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {schedule.name}
                        </h3>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          {schedule.duration_hours_start} -{" "}
                          {schedule.duration_hours_end} hours
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {schedule.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="text-gray-700">
                          📅 {formatDate(schedule.assume_start_date)} -{" "}
                          {formatDate(schedule.assume_end_date)}
                        </span>
                        {schedule.special_note && (
                          <span className="text-amber-600 font-medium">
                            💡 {schedule.special_note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <ReviewsSection
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
        />
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
