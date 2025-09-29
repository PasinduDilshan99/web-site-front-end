'use client'
import { GET_ALL_OUR_SERVICES } from '@/utils/frontEndConstant';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
          setError(data.error || 'Failed to fetch services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Something went wrong while fetching services');
      } finally {
        setLoading(false);
      }
    };

    fetchOurServices();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-purple-600">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (ourServices.length === 0) {
    return <div className="text-center py-12 text-gray-500">No services available</div>;
  }

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Creative and energetic solutions designed for your unique experiences
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ourServices.map((service) => (
            <div
              key={service.serviceId}
              className="group relative rounded-xl p-4 shadow-md bg-white flex flex-row lg:flex-col items-center text-left lg:text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{
                border: `3px solid ${service.serviceColor || '#A855F7'}`,
              }}
            >
              {/* Background Image on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  backgroundImage: `url(${service.serviceImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              
              {/* Overlay for better text readability on hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-10" />

              {/* Icon (normally visible) */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative flex-shrink-0 mb-0 sm:mb-0 sm:mr-4 lg:mr-0 z-20">
                <Image
                  src={service.serviceIconUrl}
                  alt={`${service.serviceTitle} icon`}
                  fill
                  className="object-contain transition-all duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center z-20 relative">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 group-hover:text-gray-900 transition-colors duration-500">
                  {service.serviceTitle}
                </h3>
                {service.serviceSubTitle && (
                  <p className="text-sm sm:text-base font-medium bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-2 group-hover:text-opacity-100 transition-all duration-500">
                    {service.serviceSubTitle}
                  </p>
                )}
                <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-500">
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