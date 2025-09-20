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
          const services: OurServiceDataType[] = data.data || [];
          setOurServices(services);
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
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ourServices.map((service) => (
        <div
          key={service.serviceId}
          className="rounded-lg p-6 shadow bg-white text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ border: `3px solid ${service.serviceColor}` }}
        >
          <div className="mb-4 transition-transform duration-300 hover:rotate-6 hover:scale-110">
            <Image
              src={service.serviceImageUrl}
              alt={service.serviceTitle}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{service.serviceTitle}</h3>
          <p className="text-gray-600 text-sm">{service.serviceDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default OurServices;
