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
      <BasicCycleLoading message="Loading partners..." variant="spinner" size="md" />
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
    <section className="py-6 xs:py-8 sm:py-10 lg:py-12 xl:py-16 bg-white">
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
