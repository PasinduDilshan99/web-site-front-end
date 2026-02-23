"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/common-components/loading/Loading";
import { ErrorState } from "../../../components/common-components/error-state/ErrorState";
import { EmptyState } from "../../../components/common-components/empty-state/EmptyState";
import { OurServiceDataType } from "@/types/our-services-types";
import { OurServicesService } from "@/services/OurServicesService";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import BasicCycleLoading from "@/components/common-components/basic-loading/BasicCycleLoading";

const OurServices = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ourServices, setOurServices] = useState<OurServiceDataType[]>([]);

  useEffect(() => {
    const fetchOurServices = async () => {
      try {
        setLoading(true);

        const { data: services, error } =
          await OurServicesService.fetchOurServicesData();

        if (error) {
          setError(error);
        } else {
          setOurServices(services);
          setError(null);
        }
      } catch (err) {
        console.error("Error in component:", err);
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
      <div className="min-h-[300px] bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center p-8">
        <div className="w-full mx-auto">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">
                Loading our services...
              </span>
            </div>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-lg p-4 md:p-5 border border-teal-500/20 animate-pulse flex flex-col items-center"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-teal-800/50 rounded-full mb-3 shadow-lg shadow-teal-500/10"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-20 md:w-24 mb-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-16 md:w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return;
    // <ErrorState
    //   title="Failed to Load Partners"
    //   message={error}
    //   icon="alert
    //   variant="error"
    //   size="md"
    //   actionLabel="Try Again"
    //   onAction={handleRetry}
    // />
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
    <section className="bg-white py-6 lg:py-8 xl:py-12 xl:pb-16">
      <div className="mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle=""
            title="Our Services"
            description="Creative and energetic solutions designed for your unique experiences"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
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
                className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-0"
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
                  className="object-contain transition-all duration-500 text-cyan-400"
                  sizes="(max-width: 480px) 64px, (max-width: 640px) 72px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center z-20 relative min-w-0">
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold mb-1 xs:mb-2 text-gray-900 group-hover:text-gray-900 transition-colors duration-500 leading-tight xs:leading-snug">
                  {service.serviceTitle}
                </h3>
                {service.serviceSubTitle && (
                  <p className="text-xs xs:text-sm sm:text-base font-medium bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 xs:mb-2 group-hover:text-opacity-100 transition-all duration-500 leading-tight">
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
