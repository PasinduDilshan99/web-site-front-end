"use client"
import { GET_POPULAR_TOUR_FE } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';

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
                        {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '★' : '☆'}
                    </span>
                ))}
                <span className="ml-1 text-gray-600">{rating}</span>
            </div>
        );
    };

    // Calculate discount percentage (mock function - you might need to adjust based on your data)
    const calculateDiscount = (tour: PopularToursType) => {
        // This is a mock calculation - adjust based on your actual discount logic
        const basePrice = tour.pricePerPerson * 1.67; // Assuming 40% discount
        const discount = ((basePrice - tour.pricePerPerson) / basePrice) * 100;
        return Math.round(discount);
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
                            <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
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

    if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Most Popular Tours
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    </p>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularTours.slice(0, 3).map((tour, index) => {
                        const discount = calculateDiscount(tour);
                        const averageRating = getAverageRating(tour.reviews);
                        const mainImage = tour.tourImages[0]?.imageUrl || '/default-tour.jpg';

                        return (
                            <div key={tour.tourId} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
                                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                                        {tour.durationDays} days
                                    </div>

                                    {/* Rating Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                                        {renderStars(parseFloat(averageRating || ""))}
                                    </div>
                                </div>

                                {/* Tour Content */}
                                <div className="p-6">
                                    {/* Tour Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                        {tour.tourName}
                                    </h3>

                                    {/* Location */}
                                    <p className="text-gray-600 mb-4 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {tour.startLocation}
                                    </p>

                                    {/* Pricing */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-gray-900">
                                                ${tour.pricePerPerson.toFixed(2)}
                                            </span>
                                            <span className="text-lg text-gray-500 line-through">
                                                ${(tour.pricePerPerson * 1.67).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Explore Button */}
                                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
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