"use client";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PackageType {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourStartDate: string;
  tourEndDate: string;
  durationDays: number;
  maxPeople: number;
  minPeople: number;
  pricePerPerson: number;
  tourStatus: string;
}

interface ActivePackagesType {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  discountPercentage: number;
  packageStartDate: string;
  packageEndDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  packageStatus: string;
  packageType: PackageType;
  tour: Tour;
  images: string[];
}

const PackagesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePackages, setActivePackages] = useState<ActivePackagesType[]>(
    []
  );

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_PACKAGES_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActivePackagesType[] = data.data || [];
          setActivePackages(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch packages");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Something went wrong while fetching packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays - 1;
    return `${diffDays} days`;
  };

  const extractLocations = (description: string) => {
    // Simple extraction logic - you can enhance this based on your data structure
    return "Sigiriya, Dambulla, Kandy, Nuwara Eliya, Ella, Bentota and Colombo";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
            SRI LANKA HOLIDAY PACKAGES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Most Popular Tour Packages
          </h1>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {activePackages.map((pkg) => (
            <div
              key={pkg.packageId}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Package Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.images[0] || "/placeholder.jpg"}
                  alt={pkg.packageName}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Package Content */}
              <div className="p-6">
                {/* Package Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {pkg.packageName}
                </h3>

                {/* Duration Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {formatDuration(pkg.packageStartDate, pkg.packageEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {pkg.maxPersonCount} max
                    </span>
                  </div>
                </div>

                {/* Tour Covers Section */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Tour Covers Locations:
                  </p>
                  <p className="text-sm text-blue-600 leading-relaxed">
                    {extractLocations(pkg.packageDescription)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {pkg.packageDescription}
                </p>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    From{" "}
                    <span className="text-2xl font-bold text-gray-900">
                      ${pkg.totalPrice}
                    </span>
                    {pkg.discountPercentage > 0 && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        {pkg.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* See Details Button */}
                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesHome;
