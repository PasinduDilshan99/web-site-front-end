"use client";
import { GET_POPULAR_TOUR_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

// TypeScript interfaces
interface TourImage {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  status: string;
}

interface Review {
  reviewId: number;
  userId: number;
  rating: number;
  comment: string;
  reviewStatusId: number;
  reviewStatusName: string;
  createdAt: string;
  updatedAt: string;
}

interface PopularToursType {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourType: string;
  tourCategory: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  startLocation: string;
  endLocation: string;
  maxPeople: number;
  minPeople: number;
  pricePerPerson: number;
  tourStatus: string;
  tourImages: TourImage[];
  destinations: any[];
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
  reviews: Review[];
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
        const data = await response.json();

        if (response.ok) {
          const items: PopularToursType[] = data.data || [];
          setPopularTours(items);
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

  // Calculate average rating
  const getAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-600">{rating}</span>
      </div>
    );
  };

  // Calculate discount percentage
  const calculateDiscount = (tour: PopularToursType) => {
    // Mock discount calculation - you can adjust this based on your actual data
    const discounts = [40, 20, 40]; // Based on the image example
    return discounts[popularTours.indexOf(tour) % discounts.length] || 40;
  };

  // Calculate original price based on discount
  const calculateOriginalPrice = (tour: PopularToursType) => {
    const discount = calculateDiscount(tour);
    return (tour.pricePerPerson / (1 - discount / 100)).toFixed(2);
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
    <div className=" bg-gradient-to-r from-purple-100 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}

        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Most Popular Tours
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>

          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.slice(0, 3).map((tour, index) => {
            const discount = calculateDiscount(tour);
            const averageRating = getAverageRating(tour.reviews);
            const mainImage =
              tour.tourImages[0]?.imageUrl || "/default-tour.jpg";
            const originalPrice = calculateOriginalPrice(tour);

            return (
              <div
                key={tour.tourId}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Tour Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={mainImage}
                    alt={tour.tourName}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {discount}% Off
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center">
                    <span className="mr-1">🍟</span>
                    {tour.durationDays} days
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {renderStars(parseFloat(averageRating || "0"))}
                  </div>

                  {/* Tour Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {tour.tourName}
                  </h3>

                  {/* Location */}
                  <p className="text-gray-600 mb-4">{tour.startLocation}</p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.pricePerPerson.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Explore
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button (if you have more than 3 tours) */}
        {popularTours.length > 3 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              View All Tours
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularTours;
