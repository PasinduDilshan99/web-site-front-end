"use client";
import { GET_NEW_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface CategoryType {
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  categoryImageUrl: string | null;
}

interface ImageType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface NewDestinationsType {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  category: CategoryType;
  location: string;
  rating: number;
  popularity: number;
  images: ImageType[];
}

const NewDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDestinations, setNewDestinations] = useState<NewDestinationsType[]>([]);

  useEffect(() => {
    const fetchNewDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_NEW_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: NewDestinationsType[] = data.data || [];
          // Filter only active destinations
          const activeDestinations = items.filter(item => item.destinationStatus === "ACTIVE");
          setNewDestinations(activeDestinations);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch new destinations");
        }
      } catch (err) {
        console.error("Error fetching new destinations:", err);
        setError("Something went wrong while fetching new destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchNewDestinations();
  }, []);

  if (loading) return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">Loading new destinations...</div>
      </div>
    </section>
  );
  
  if (error) return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    </section>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">New and Most Popular Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newDestinations.map((destination) => (
            <div key={destination.destinationId} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
              {/* Destination Image */}
              {destination.images[0] && (
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={destination.images[0].imageUrl}
                    alt={destination.images[0].imageDescription}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1">
                    <span className="text-blue-600 text-sm font-medium">{destination.category.categoryName}</span>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <span className="text-yellow-500 mr-1 text-sm">⭐</span>
                    <span className="font-bold text-gray-800 text-sm">{destination.rating}</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{destination.destinationName}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {destination.location}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{destination.destinationDescription}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">${Math.floor(destination.popularity / 10)}.00</p>
                  </div>
                  
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            View All New Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewDestinations;