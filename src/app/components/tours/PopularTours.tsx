"use client";
import { GET_POPULAR_TOUR_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

// Updated TypeScript interfaces based on new API response
interface Review {
  reviewId: number;
  reviewerName: string;
  review: string;
  rating: number;
  reviewDescription: string;
  numberOfParticipate: number;
  reviewStatus: string;
  reviewCreatedAt: string;
}

interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  destinationStatus: string;
}

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
  scheduleStatus: string;
  destinations: Destination[];
  reviews: Review[];
}

interface PopularToursType {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourType: string;
  tourCategory: string;
  season: string;
  tourStatus: string;
  schedules: Schedule[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: PopularToursType[];
  timestamp: string;
}

const PopularTours = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularTours, setPopularTours] = useState<PopularToursType[]>([]);

  useEffect(() => {
    const fetchPopularTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_POPULAR_TOUR_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: PopularToursType[] = data.data || [];
          // Filter only active tours
          const activeTours = items.filter(
            (tour) => tour.tourStatus === "ACTIVE"
          );
          setPopularTours(activeTours);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch popular tours");
        }
      } catch (err) {
        console.error("Error fetching popular tours:", err);
        setError("Something went wrong while fetching popular tours");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTours();
  }, []);

  // Calculate average rating from all schedules' reviews
  const getAverageRating = (tour: PopularToursType) => {
    const allReviews = tour.schedules.flatMap(
      (schedule) => schedule.reviews || []
    );
    if (allReviews.length === 0) return 0;
    const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / allReviews.length).toFixed(1);
  };

  // Get total reviews count
  const getTotalReviews = (tour: PopularToursType) => {
    return tour.schedules.reduce(
      (total, schedule) => total + (schedule.reviews?.length || 0),
      0
    );
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-600 text-sm">{rating}</span>
      </div>
    );
  };

  // Calculate discount percentage based on tour category and season
  const calculateDiscount = (tour: PopularToursType) => {
    // Mock discount calculation based on category and season
    const discountMap: { [key: string]: number } = {
      Luxury: 20,
      Family: 40,
      Budget: 30,
      Adventure: 25,
    };

    return discountMap[tour.tourCategory] || discountMap[tour.tourType] || 30;
  };

  // Calculate original price based on discount
  const calculateOriginalPrice = (tour: PopularToursType) => {
    const discount = calculateDiscount(tour);
    // Base price calculation based on duration and category
    const basePrice = tour.duration * 100;
    let categoryMultiplier = 1;

    if (tour.tourCategory === "Luxury") categoryMultiplier = 2.5;
    else if (tour.tourCategory === "Family") categoryMultiplier = 1.5;
    else if (tour.tourCategory === "Budget") categoryMultiplier = 0.8;

    const originalPrice = basePrice * categoryMultiplier;
    const discountedPrice = originalPrice * (1 - discount / 100);

    return {
      original: originalPrice.toFixed(2),
      discounted: discountedPrice.toFixed(2),
    };
  };

  // Get destinations list for a tour
  const getDestinations = (tour: PopularToursType) => {
    const allDestinations = tour.schedules.flatMap((schedule) =>
      schedule.destinations.map((dest) => dest.destinationName)
    );
    return [...new Set(allDestinations)]; // Remove duplicates
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-purple-100 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Most Popular Tours
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Discover our most sought-after travel experiences with exceptional
            reviews
          </p>

          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.slice(0, 3).map((tour, index) => {
            const discount = calculateDiscount(tour);
            const averageRating = getAverageRating(tour);
            const totalReviews = getTotalReviews(tour);
            const prices = calculateOriginalPrice(tour);
            const destinations = getDestinations(tour);

            return (
              <div
                key={tour.tourId}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Tour Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏞️</div>
                      <h3 className="text-xl font-bold px-4">
                        {tour.tourName}
                      </h3>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {discount}% Off
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center">
                    <span className="mr-1">⏱️</span>
                    {tour.duration} day{tour.duration !== 1 ? "s" : ""}
                  </div>

                  {/* Season Badge */}
                  <div className="absolute bottom-4 left-4 bg-green-500/90 text-white px-3 py-1 rounded-lg text-sm">
                    {tour.season} Season
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-3">
                    {renderStars(parseFloat(averageRating || "0"))}
                    <span className="text-sm text-gray-500">
                      {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Tour Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {tour.tourName}
                  </h3>

                  {/* Tour Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.tourDescription}
                  </p>

                  {/* Locations */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="mr-1">📍</span>
                    <span>
                      {tour.startLocation} → {tour.endLocation}
                    </span>
                  </div>

                  {/* Destinations */}
                  {destinations.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Visits:</span>{" "}
                        {destinations.slice(0, 2).join(", ")}
                        {destinations.length > 2 &&
                          ` +${destinations.length - 2} more`}
                      </p>
                    </div>
                  )}

                  {/* Tour Type and Category */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {tour.tourType}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {tour.tourCategory}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${prices.discounted}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${prices.original}
                      </span>
                      <span className="text-sm text-red-500 font-medium">
                        Save $
                        {(
                          parseFloat(prices.original) -
                          parseFloat(prices.discounted)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Schedules Info */}
                  {tour.schedules.length > 0 && (
                    <div className="mb-4 text-sm text-gray-600">
                      <span className="font-medium">
                        {tour.schedules.length} schedule
                        {tour.schedules.length !== 1 ? "s" : ""} available
                      </span>
                    </div>
                  )}

                  {/* Explore Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Explore Tour
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button (if you have more than 3 tours) */}
        {popularTours.length > 3 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-amber-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300">
              View All Tours
            </button>
          </div>
        )}

        {/* No tours message */}
        {popularTours.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No popular tours available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularTours;
