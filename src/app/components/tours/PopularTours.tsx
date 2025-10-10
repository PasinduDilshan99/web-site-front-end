"use client";
import { GET_POPULAR_TOUR_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import AnimatedButton from "../common/AnimatedButton";
import SectionHeader from "../common/SectionHeader";
import Loading from "../common/Loading";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

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

interface ImagesType {
  imageName: string;
  imageUrl: string;
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
  images: ImagesType[];
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
          <span key={i} className="text-yellow-400 text-xs sm:text-sm">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-600 text-xs sm:text-sm">{rating}</span>
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

  // Get first available image from API
  const getTourImage = (tour: PopularToursType) => {
    if (tour.images && tour.images.length > 0 && tour.images[0].imageUrl) {
      return tour.images[0].imageUrl;
    }
    return null;
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading
        message="Loading popular tours..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  if (popularTours.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-r from-purple-50 to-amber-50">
      <div className=" mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Popular tours"
            title="Popular Tours"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {popularTours.slice(0, 3).map((tour, index) => {
            const discount = calculateDiscount(tour);
            const averageRating = getAverageRating(tour);
            const totalReviews = getTotalReviews(tour);
            const prices = calculateOriginalPrice(tour);
            const destinations = getDestinations(tour);
            const tourImage = getTourImage(tour);

            return (
              <div
                key={tour.tourId}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Tour Image */}
                <div className="relative overflow-hidden h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64 xl:h-72">
                  {tourImage ? (
                    <img
                      src={tourImage}
                      alt={tour.tourName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Gradient Background */}
                  <div 
                    className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center ${tourImage ? 'hidden' : 'flex'}`}
                  >
                    <div className="text-white text-center px-3 sm:px-4">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2">🏞️</div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">
                        {tour.tourName}
                      </h3>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm">
                    {discount}% Off
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm flex items-center">
                    <span className="mr-1">⏱️</span>
                    {tour.duration} day{tour.duration !== 1 ? "s" : ""}
                  </div>

                  {/* Season Badge */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-green-500/90 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
                    {tour.season} Season
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    {renderStars(parseFloat(averageRating || "0"))}
                    <span className="text-xs sm:text-sm text-gray-500">
                      {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Tour Title */}
                  <h3 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {tour.tourName}
                  </h3>

                  {/* Tour Description */}
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {tour.tourDescription}
                  </p>

                  {/* Locations */}
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <span className="mr-1">📍</span>
                    <span className="truncate">
                      {tour.startLocation} → {tour.endLocation}
                    </span>
                  </div>

                  {/* Destinations */}
                  {destinations.length > 0 && (
                    <div className="mb-4 sm:mb-5">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 leading-relaxed">
                        <span className="font-medium">Visits:</span>{" "}
                        {destinations.slice(0, 2).join(", ")}
                        {destinations.length > 2 &&
                          ` +${destinations.length - 2} more`}
                      </p>
                    </div>
                  )}

                  {/* Tour Type and Category */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-5">
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {tour.tourType}
                    </span>
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {tour.tourCategory}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                      <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">
                        ${prices.discounted}
                      </span>
                      <span className="text-base sm:text-lg text-gray-500 line-through">
                        ${prices.original}
                      </span>
                      <span className="text-xs sm:text-sm text-red-500 font-medium">
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
                    <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                      <span className="font-medium">
                        {tour.schedules.length} schedule
                        {tour.schedules.length !== 1 ? "s" : ""} available
                      </span>
                    </div>
                  )}

                  {/* Explore Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Explore Tour
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button (if you have more than 3 tours) */}
        {popularTours.length > 3 && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton onClick={() => console.log("Clicked!")}>
              More Tours
            </AnimatedButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTours;