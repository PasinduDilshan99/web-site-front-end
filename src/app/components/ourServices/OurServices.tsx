"use client";
import { GET_ALL_OUR_SERVICES } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

interface OurServiceDataType {
  serviceId: number;
  serviceTitle: string;
  serviceSubTitle: string;
  serviceDescription: string;
  serviceImageUrl: string;
  serviceIconUrl: string;
  serviceColor: string;
  serviceStatus: string;
  serviceStatusStatus: string;
  serviceCreatedAt: string;
  serviceCreatedBy: number;
  serviceUpdatedAt: string | null;
  serviceUpdatedBy: number | null;
  serviceTerminatedAt: string | null;
  serviceTerminatedBy: number | null;
}

const OurServices = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ourServices, setOurServices] = useState<OurServiceDataType[]>([]);

  useEffect(() => {
    const fetchOurServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_OUR_SERVICES);
        const data = await response.json();

        if (response.ok) {
          setOurServices(data.data || []);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch services");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Something went wrong while fetching services");
      } finally {
        setLoading(false);
      }
    };

    fetchOurServices();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading message="Loading partners..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Partners"
        message={error}
        icon="alert"
        variant="error"
        size="md"
        actionLabel="Try Again"
        onAction={handleRetry}
      />
    );
  }

  if (ourServices.length === 0) {
    return (
      <EmptyState
        title="No services available"
        message="We haven't partnered with any organizations yet. Check back soon!"
        icon="box"
        size="md"
      />
    );
  }

  return (
    <section className="py-6 xs:py-8 sm:py-10 lg:py-12 xl:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-2xl mx-auto px-2 xs:px-0">
            Creative and energetic solutions designed for your unique
            experiences
          </p>
          <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 w-12 xs:w-14 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-0.5 xs:h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
          {ourServices.map((service) => (
            <div
              key={service.serviceId}
              className="group relative rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm xs:shadow-md sm:shadow-lg bg-white flex flex-row lg:flex-col items-center text-left lg:text-center transition-all duration-500 hover:scale-[1.02] xs:hover:scale-[1.03] sm:hover:scale-105 hover:shadow-xl xs:hover:shadow-2xl overflow-hidden"
              style={{
                border: `2px solid ${service.serviceColor || "#A855F7"}`,
              }}
            >
              {/* Background Image on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  backgroundImage: `url(${service.serviceImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Overlay for better text readability on hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 lg:group-hover:opacity-80 transition-opacity duration-500 z-10" />

              {/* Icon */}
              <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative flex-shrink-0 mb-0 lg:mb-4 mr-3 xs:mr-4 sm:mr-5 lg:mr-0 z-20">
                <Image
                  src={service.serviceIconUrl}
                  alt={`${service.serviceTitle} icon`}
                  fill
                  className="object-contain transition-all duration-500"
                  sizes="(max-width: 480px) 64px, (max-width: 640px) 72px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center z-20 relative min-w-0">
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold mb-1 xs:mb-2 text-gray-900 group-hover:text-gray-900 transition-colors duration-500 leading-tight xs:leading-snug">
                  {service.serviceTitle}
                </h3>
                {service.serviceSubTitle && (
                  <p className="text-xs xs:text-sm sm:text-base font-medium bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-1 xs:mb-2 group-hover:text-opacity-100 transition-all duration-500 leading-tight">
                    {service.serviceSubTitle}
                  </p>
                )}
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-500 leading-relaxed xs:leading-normal">
                  {service.serviceDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
