"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  DollarSign,
  X,
} from "lucide-react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import { GET_ACTIVE_DESTINATIONS_FE } from "@/utils/frontEndConstant";
import AnimatedButton from "../components/common/AnimatedButton";

interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activitiesCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
}

interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: Activity[];
  images: Image[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Destination[];
}

interface ImageIndexMap {
  [key: number]: number;
}

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<ImageIndexMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fadeOut, setFadeOut] = useState<{ [key: number]: boolean }>({});
  const [autoPlayInterval, setAutoPlayInterval] = useState<{
    [key: number]: NodeJS.Timeout;
  }>({});

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProvince, setSelectedProvince] = useState<string>("ALL");
  const [priceRange, setPriceRange] = useState<string>("ALL");
  const [activities, setActivities] = useState<string>("ALL");

  // Fetch data on mount
  useEffect(() => {
    const fetchDestinations = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_DESTINATIONS_FE);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setDestinations(data.data || []);
        setFilteredDestinations(data.data || []);

        // Initialize image indices
        const imageMap: ImageIndexMap = {};
        data.data?.forEach((dest) => {
          imageMap[dest.destinationId] = 0;
        });
        setCurrentImageIndex(imageMap);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch destinations"
        );
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Auto-play carousel effect
  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};

    filteredDestinations.forEach((destination) => {
      const destId = destination.destinationId;

      intervals[destId] = setInterval(() => {
        setFadeOut((prev) => ({
          ...prev,
          [destId]: true,
        }));

        setTimeout(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [destId]: (prev[destId] + 1) % destination.images.length,
          }));

          setFadeOut((prev) => ({
            ...prev,
            [destId]: false,
          }));
        }, 500); // Match fade-out duration
      }, 4000); // Change image every 4 seconds
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [filteredDestinations]);

  // Apply filters
  useEffect(() => {
    let filtered: Destination[] = destinations;

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((d) => d.categoryName === selectedCategory);
    }

    if (selectedProvince !== "ALL") {
      filtered = filtered.filter((d) => d.location === selectedProvince);
    }

    if (priceRange !== "ALL") {
      filtered = filtered.filter((d) => {
        if (d.activities.length === 0) return false;
        const prices = d.activities.flatMap((a) => [
          a.priceLocal,
          a.priceForeigners,
        ]);
        const minPrice = Math.min(...prices);

        if (priceRange === "BUDGET") return minPrice < 2000;
        if (priceRange === "MODERATE")
          return minPrice >= 2000 && minPrice < 5000;
        if (priceRange === "LUXURY") return minPrice >= 5000;
        return true;
      });
    }

    if (activities !== "ALL") {
      filtered = filtered.filter((d) =>
        d.activities.some((a) => a.activitiesCategory === activities)
      );
    }

    setFilteredDestinations(filtered);
  }, [
    destinations,
    selectedCategory,
    selectedProvince,
    priceRange,
    activities,
  ]);

  const handlePrevImage = (destId: number): void => {
    const dest = destinations.find((d) => d.destinationId === destId);
    if (!dest || dest.images.length === 0) return;

    setFadeOut((prev) => ({
      ...prev,
      [destId]: true,
    }));

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [destId]: (prev[destId] - 1 + dest.images.length) % dest.images.length,
      }));

      setFadeOut((prev) => ({
        ...prev,
        [destId]: false,
      }));
    }, 300);
  };

  const handleNextImage = (destId: number): void => {
    const dest = destinations.find((d) => d.destinationId === destId);
    if (!dest || dest.images.length === 0) return;

    setFadeOut((prev) => ({
      ...prev,
      [destId]: true,
    }));

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [destId]: (prev[destId] + 1) % dest.images.length,
      }));

      setFadeOut((prev) => ({
        ...prev,
        [destId]: false,
      }));
    }, 300);
  };

  const getUniqueValues = (field: keyof Destination): string[] => {
    return [...new Set(destinations.map((d) => d[field] as string))].sort();
  };

  const getUniqueCategories = (): string[] => {
    return [...new Set(destinations.map((d) => d.categoryName))].sort();
  };

  const getUniqueActivities = (): string[] => {
    return [
      ...new Set(
        destinations.flatMap((d) =>
          d.activities.map((a) => a.activitiesCategory)
        )
      ),
    ].sort();
  };

  const resetFilters = (): void => {
    setSelectedCategory("ALL");
    setSelectedProvince("ALL");
    setPriceRange("ALL");
    setActivities("ALL");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 to-purple-50">
          <div className="text-base sm:text-lg md:text-xl text-purple-600 font-semibold">
            Loading destinations...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 to-purple-50">
          <div className="text-center px-4">
            <p className="text-base sm:text-lg md:text-xl text-red-600 mb-2 sm:mb-4 font-semibold">
              Error loading destinations
            </p>
            <p className="text-sm sm:text-base text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-white to-purple-50">
      <NavBar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-amber-500 text-white py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 md:mb-3">
              Explore Sri Lanka
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-purple-100">
              Discover amazing destinations and unforgettable experiences
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          {/* Filters Section */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 md:mb-10 border-t-4 border-purple-500">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              Filter Destinations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {/* Category Filter */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="w-full px-3 text-purple-600 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-amber-50 hover:bg-amber-100"
                >
                  <option value="ALL">All Categories</option>
                  {getUniqueCategories().map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province Filter */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Province
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedProvince(e.target.value)
                  }
                  className="w-full text-amber-600 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-purple-50 hover:bg-purple-100"
                >
                  <option value="ALL">All Provinces</option>
                  {getUniqueValues("location").map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setPriceRange(e.target.value)
                  }
                  className="w-full text-purple-600 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-amber-50 hover:bg-amber-100"
                >
                  <option value="ALL">All Prices</option>
                  <option value="BUDGET">Budget (Under ₨2,000)</option>
                  <option value="MODERATE">Moderate (₨2,000 - ₨5,000)</option>
                  <option value="LUXURY">Luxury (Above ₨5,000)</option>
                </select>
              </div>

              {/* Activity Filter */}
              <div>
                <label className="block  text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={activities}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setActivities(e.target.value)
                  }
                  className="w-full text-amber-600 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-purple-50 hover:bg-purple-100"
                >
                  <option value="ALL">All Activities</option>
                  {getUniqueActivities().map((act) => (
                    <option key={act} value={act}>
                      {act}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "ALL" ||
              selectedProvince !== "ALL" ||
              priceRange !== "ALL" ||
              activities !== "ALL") && (
              <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-3">
                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-purple-300">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("ALL")}
                      className="hover:text-purple-600 transition-colors"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </span>
                )}
                {selectedProvince !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-amber-300">
                    {selectedProvince}
                    <button
                      onClick={() => setSelectedProvince("ALL")}
                      className="hover:text-amber-600 transition-colors"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </span>
                )}
                {priceRange !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-purple-300">
                    {priceRange}
                    <button
                      onClick={() => setPriceRange("ALL")}
                      className="hover:text-purple-600 transition-colors"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </span>
                )}
                {activities !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-amber-300">
                    {activities}
                    <button
                      onClick={() => setActivities("ALL")}
                      className="hover:text-amber-600 transition-colors"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Showing{" "}
              <span className="font-bold text-purple-700">
                {filteredDestinations.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-purple-700">
                {destinations.length}
              </span>{" "}
              destinations
            </p>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 mb-12">
              {filteredDestinations.map((destination: Destination) => {
                const currentImg =
                  destination.images[
                    currentImageIndex[destination.destinationId] || 0
                  ];
                const minPrice =
                  destination.activities.length > 0
                    ? Math.min(
                        ...destination.activities.map((a) => a.priceLocal)
                      )
                    : 0;

                return (
                  <div
                    key={destination.destinationId}
                    className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border-b-4 border-purple-500"
                  >
                    {/* Image Carousel */}
                    <div className="relative bg-gray-200 h-48 sm:h-56 md:h-64 lg:h-72 group overflow-hidden">
                      {currentImg && (
                        <img
                          src={currentImg.imageUrl}
                          alt={currentImg.imageName}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                            fadeOut[destination.destinationId]
                              ? "opacity-0"
                              : "opacity-100"
                          }`}
                        />
                      )}

                      {/* Image Navigation */}
                      {destination.images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              handlePrevImage(destination.destinationId)
                            }
                            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
                          </button>
                          <button
                            onClick={() =>
                              handleNextImage(destination.destinationId)
                            }
                            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                          >
                            <ChevronRight size={18} className="sm:w-6 sm:h-6" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-gradient-to-r from-purple-600 to-amber-600 bg-opacity-80 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {(currentImageIndex[destination.destinationId] || 0) +
                          1}{" "}
                        / {destination.images.length}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        {destination.categoryName}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                        {destination.destinationName}
                      </h3>

                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                        {destination.destinationDescription}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                        <MapPin
                          size={16}
                          className="sm:w-5 sm:h-5 text-purple-600 flex-shrink-0"
                        />
                        <span className="line-clamp-1">
                          {destination.location}
                        </span>
                      </div>

                      {/* Activities Preview */}
                      {destination.activities.length > 0 && (
                        <div className="mb-3 sm:mb-4 md:mb-5 pb-3 sm:pb-4 md:pb-5 border-b-2 border-amber-200">
                          <p className="text-xs font-bold text-gray-700 mb-2 text-purple-700">
                            Activities ({destination.activities.length})
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {destination.activities
                              .slice(0, 2)
                              .map((activity: Activity, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium border border-amber-300"
                                >
                                  {activity.activitiesCategory}
                                </span>
                              ))}
                            {destination.activities.length > 2 && (
                              <span className="text-xs bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium border border-purple-300">
                                +{destination.activities.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Key Info */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-5">
                        {destination.activities.length > 0 && (
                          <>
                            <div className="flex flex-col items-center gap-0.5 sm:gap-1 bg-purple-50 p-1.5 sm:p-2 rounded-lg border border-purple-200">
                              <Clock
                                size={16}
                                className="sm:w-5 sm:h-5 text-purple-600"
                              />
                              <span className="text-gray-600 font-medium">
                                {destination.activities[0].durationHours}h
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5 sm:gap-1 bg-amber-50 p-1.5 sm:p-2 rounded-lg border border-amber-200">
                              <Users
                                size={16}
                                className="sm:w-5 sm:h-5 text-amber-600"
                              />
                              <span className="text-gray-600 font-medium">
                                2-30
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5 sm:gap-1 bg-gradient-to-br from-purple-100 to-amber-100 p-1.5 sm:p-2 rounded-lg border-2 border-purple-400">
                              <DollarSign
                                size={16}
                                className="sm:w-5 sm:h-5 text-purple-700 font-bold"
                              />
                              <span className="text-purple-700 font-bold">
                                ₨{Math.floor(minPrice / 1000)}k
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
                        <AnimatedButton
                          className="w-full bg-gradient-to-r text-white font-bold py-2 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                          onClick={() => console.log("View all clicked")}
                        >
                          View Details{" "}
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 md:py-16 mb-12">
              <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-4 sm:mb-6">
                No destinations match your filters
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
