"use client";

import React, { useState } from "react";
import {
  DayDetails,
  Accommodation,
  DestinationWithActivities,
  Activity,
} from "@/types/sri-lankan-tour-types";
import {
  Calendar,
  MapPin,
  Clock,
  Utensils,
  Hotel,
  Car,
  Coffee,
  ChevronDown,
  ChevronUp,
  Users,
  DollarSign,
  Shield,
  Star,
  Bed,
  Car as CarIcon,
  Coffee as CoffeeIcon,
  Sunset,
  Sunrise,
  CheckCircle,
  XCircle,
  TrendingUp,
  Compass,
  Navigation,
  ThermometerSun,
  Tag,
} from "lucide-react";
import Image from "next/image";

interface SLTourDayWiseDetailsProps {
  days: DayDetails[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const SLTourDayWiseDetails: React.FC<SLTourDayWiseDetailsProps> = ({
  days,
  loading = false,
  error = null,
  onRetry,
}) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [expandedDestinations, setExpandedDestinations] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedActivities, setExpandedActivities] = useState<{
    [key: string]: boolean;
  }>({});

  // Toggle day expansion
  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  // Toggle destination expansion
  const toggleDestination = (dayNumber: number, destinationId: number) => {
    const key = `${dayNumber}-${destinationId}`;
    setExpandedDestinations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle activity expansion
  const toggleActivity = (
    dayNumber: number,
    destinationId: number,
    activityId: number
  ) => {
    const key = `${dayNumber}-${destinationId}-${activityId}`;
    setExpandedActivities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Format time
  const formatTime = (time: string): string => {
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `LKR ${amount.toLocaleString()}`;
  };

  // Render hotel rating stars
  const renderHotelStars = (rating: string) => {
    const starCount = parseInt(rating) || 0;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < starCount
                ? "text-amber-500 fill-amber-500"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {rating}-Star Hotel
        </span>
      </div>
    );
  };

  // Render accommodation card
  const renderAccommodationCard = (accommodation: Accommodation) => {
    const meals = [
      {
        key: "breakfast",
        label: "Breakfast",
        included: accommodation.breakfast,
        description: accommodation.breakfastDescription,
        icon: <Sunrise className="w-4 h-4" />,
        color: "bg-green-50 border-green-100",
      },
      {
        key: "lunch",
        label: "Lunch",
        included: accommodation.lunch,
        description: accommodation.lunchDescription,
        icon: <Utensils className="w-4 h-4" />,
        color: "bg-blue-50 border-blue-100",
      },
      {
        key: "dinner",
        label: "Dinner",
        included: accommodation.dinner,
        description: accommodation.dinnerDescription,
        icon: <Sunset className="w-4 h-4" />,
        color: "bg-purple-50 border-purple-100",
      },
      {
        key: "morningTea",
        label: "Morning Tea",
        included: accommodation.morningTea,
        description: accommodation.morningTeaDescription,
        icon: <CoffeeIcon className="w-4 h-4" />,
        color: "bg-amber-50 border-amber-100",
      },
      {
        key: "eveningTea",
        label: "Evening Tea",
        included: accommodation.eveningTea,
        description: accommodation.eveningTeaDescription,
        icon: <CoffeeIcon className="w-4 h-4" />,
        color: "bg-orange-50 border-orange-100",
      },
    ];

    return (
      <div className="space-y-6">
        {/* Hotel Information */}
        {accommodation.hotel && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-amber-500 rounded-xl">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {accommodation.hotel.hotelName}
                    </h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{accommodation.hotel.location}</span>
                      </div>
                      {accommodation.hotel.hotelCategory && 
                        renderHotelStars(accommodation.hotel.hotelCategory)}
                    </div>
                  </div>
                  {accommodation.hotel.hotelCategory && (
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full">
                      {accommodation.hotel.hotelCategory} Star
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  {accommodation.hotel.description}
                </p>
                {accommodation.hotel.facilities && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">
                      Facilities
                    </h5>
                    <p className="text-sm text-gray-600">
                      {accommodation.hotel.facilities}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Transport Information */}
        {accommodation.transport && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <CarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Transportation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Type
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {accommodation.transport.transportType}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Model
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {accommodation.transport.vehicleModel}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Seats
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {accommodation.transport.seatCount}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <ThermometerSun className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Air Conditioning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {accommodation.transport.airConditioned ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <p className="text-lg font-semibold text-gray-900">
                        {accommodation.transport.airConditioned ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
                {accommodation.transport.description && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {accommodation.transport.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meals Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">
              Meals & Refreshments
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map(
              (meal) =>
                meal.included && (
                  <div
                    key={meal.key}
                    className={`p-4 rounded-xl border ${meal.color}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        {meal.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {meal.label}
                        </h5>
                        {meal.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {meal.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700">Included</span>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Additional Notes */}
          {(accommodation.snacks || accommodation.otherNotes) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                {accommodation.snacks && (
                  <div className="flex-1 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-gray-900">Snacks</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {accommodation.snackNote || "Snacks included"}
                    </p>
                  </div>
                )}
                {accommodation.otherNotes && (
                  <div className="flex-1 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-gray-900">
                        Important Notes
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {accommodation.otherNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render destination card
  const renderDestinationCard = (
    destinationWithActivities: DestinationWithActivities,
    dayNumber: number
  ) => {
    const { destination, activities } = destinationWithActivities;
    const key = `${dayNumber}-${destination.destinationId}`;
    const isExpanded = expandedDestinations[key];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <button
          onClick={() => toggleDestination(dayNumber, destination.destinationId)}
          className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              {destination.images[0]?.imageUrl ? (
                <Image
                  src={destination.images[0].imageUrl}
                  alt={destination.images[0].imageName}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-amber-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {destination.destinationName}
                </h4>
                <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-amber-100 text-purple-700 text-xs font-medium rounded-full">
                  {destination.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Compass className="w-4 h-4" />
                  <span>{activities.length} activities</span>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2">
                {destination.destinationDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {isExpanded ? "Collapse" : "Expand"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 border-t border-gray-200">
            {/* Destination Gallery */}
            {destination.images.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <Compass className="w-5 h-5 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900">
                    Destination Gallery
                  </h5>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.images.map((image) => (
                    <div
                      key={image.imageId}
                      className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.imageName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium">
                            {image.imageName}
                          </p>
                          {image.imageDescription && (
                            <p className="text-white/90 text-sm mt-1">
                              {image.imageDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {activities.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900">
                    Available Activities ({activities.length})
                  </h5>
                </div>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const activityKey = `${dayNumber}-${destination.destinationId}-${activity.id}`;
                    const isActivityExpanded = expandedActivities[activityKey];

                    return (
                      <div
                        key={activity.id}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                        <button
                          onClick={() =>
                            toggleActivity(
                              dayNumber,
                              destination.destinationId,
                              activity.id
                            )
                          }
                          className="w-full p-4 text-left flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-gray-100"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h6 className="font-semibold text-gray-900">
                                {activity.name}
                              </h6>
                              <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-medium rounded-full">
                                {activity.categoryName}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">
                                  {activity.durationHours} hours
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-700">
                                  {formatCurrency(activity.priceLocal)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                <span className="text-sm text-gray-700">
                                  {activity.minParticipate}-
                                  {activity.maxParticipate} people
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ThermometerSun className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-gray-700">
                                  {activity.season.split(",").length} seasons
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isActivityExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </button>

                        {isActivityExpanded && (
                          <div className="p-6 bg-white border-t border-gray-100">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Activity Details */}
                              <div>
                                <div className="mb-6">
                                  <h6 className="font-semibold text-gray-900 mb-3">
                                    Activity Description
                                  </h6>
                                  <p className="text-gray-700">
                                    {activity.description}
                                  </p>
                                </div>

                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                          Timing
                                        </span>
                                      </div>
                                      <p className="font-semibold text-gray-900">
                                        {formatTime(activity.availableFrom)} -{" "}
                                        {formatTime(activity.availableTo)}
                                      </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                                      <div className="flex items-center gap-2 mb-2">
                                        <ThermometerSun className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                          Season
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {activity.season.split(",").map((season, index) => (
                                          <span
                                            key={index}
                                            className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded-full"
                                          >
                                            {season.trim()}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Requirements */}
                                  {activity.requirements.length > 0 && (
                                    <div>
                                      <h6 className="font-semibold text-gray-900 mb-3">
                                        Requirements
                                      </h6>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activity.requirements.map((req) => (
                                          <div
                                            key={req.id}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                          >
                                            <div
                                              className="w-3 h-3 rounded-full"
                                              style={{ backgroundColor: req.color }}
                                            />
                                            <div>
                                              <div className="font-medium text-gray-900">
                                                {req.name}: {req.value}
                                              </div>
                                              {req.description && (
                                                <div className="text-sm text-gray-600">
                                                  {req.description}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Activity Images */}
                              {activity.images.length > 0 && (
                                <div>
                                  <h6 className="font-semibold text-gray-900 mb-4">
                                    Activity Images
                                  </h6>
                                  <div className="grid grid-cols-2 gap-3">
                                    {activity.images.map((img) => (
                                      <div
                                        key={img.id}
                                        className="relative h-40 rounded-xl overflow-hidden group"
                                      >
                                        <Image
                                          src={img.image_url}
                                          alt={img.name}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                                          sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <p className="text-white text-sm font-medium">
                                              {img.name}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading Itinerary
            </h2>
            <p className="text-gray-600">
              Fetching your tour details...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to Load Itinerary
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {error}
              </p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!days || days.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-purple-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Itinerary Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
              We're preparing a detailed day-by-day itinerary for this tour.
            </p>
            <p className="text-sm text-gray-500">
              Check back later for the complete schedule.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-amber-600 rounded-2xl shadow-lg mb-6">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Detailed Tour Itinerary
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive day-by-day breakdown of your journey, including accommodations, 
            transportation, meals, and exciting activities.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Included in package</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Multiple activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>Meals provided</span>
            </div>
          </div>
        </div>

        {/* Days Navigation */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-4 space-x-4">
            {days.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => toggleDay(day.dayNumber)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  expandedDays.includes(day.dayNumber)
                    ? "bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-md"
                }`}
              >
                Day {day.dayNumber}
                <div className="text-xs mt-1 opacity-80">
                  {day.destinations.length} destinations
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Days Content */}
        <div className="space-y-8">
          {days.map((day) => (
            <div
              key={day.dayNumber}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                expandedDays.includes(day.dayNumber)
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            >
              {/* Day Header */}
              <button
                onClick={() => toggleDay(day.dayNumber)}
                className={`w-full p-6 flex justify-between items-center transition-all duration-300 ${
                  expandedDays.includes(day.dayNumber)
                    ? "bg-gradient-to-r from-purple-600 to-amber-600"
                    : "bg-gradient-to-r from-purple-500 to-amber-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm">
                    <span className="text-2xl font-bold text-white">
                      {day.dayNumber}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">
                      Day {day.dayNumber}
                    </h3>
                    <div className="flex items-center gap-3 text-white/90 text-sm mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{day.destinations.length} destinations</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Full day schedule</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {expandedDays.includes(day.dayNumber)
                      ? "Collapse Details"
                      : "Expand Details"}
                  </span>
                  {expandedDays.includes(day.dayNumber) ? (
                    <ChevronUp className="w-6 h-6 text-white" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white" />
                  )}
                </div>
              </button>

              {/* Day Content */}
              {expandedDays.includes(day.dayNumber) && (
                <div className="p-6 space-y-8">
                  {/* Accommodations */}
                  {renderAccommodationCard(day.accommodations)}

                  {/* Destinations */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                        <Compass className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Destinations & Activities
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Explore the amazing places and activities planned for today
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {day.destinations.map((destination) =>
                        renderDestinationCard(destination, day.dayNumber)
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Day {day.dayNumber} Summary
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {day.destinations.length}
                        </div>
                        <div className="text-sm text-gray-600">Destinations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {day.destinations.reduce(
                            (acc, curr) => acc + curr.activities.length,
                            0
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Activities</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">
                          {Object.entries(day.accommodations).filter(
                            ([key, value]) =>
                              key.includes("breakfast") ||
                              key.includes("lunch") ||
                              key.includes("dinner")
                          ).length}
                        </div>
                        <div className="text-sm text-gray-600">Meals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {day.accommodations.transport ? "Yes" : "No"}
                        </div>
                        <div className="text-sm text-gray-600">Transport</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            <span className="font-semibold">Note:</span> All accommodations, meals, 
            and activities are subject to availability. Some activities may require 
            additional fees or advance booking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SLTourDayWiseDetails;