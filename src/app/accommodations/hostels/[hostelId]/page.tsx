// pages/details-pages/HostelDetailsPage.tsx
import React from 'react';
import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from '@/types/accommodations-types/service-provider-types';
import HostelDetailsContent from '@/components/accommodation-components/hostel-components/hostel-details-components/HostelDetailsContent';

interface HostelDetailsPageProps {
   params: {
    hostelId: string;  // Changed from 'id' to 'hotelId'
  };
}

async function getHostelDetails(id: string): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(`http://localhost:3000/api/service-providers/hotels?id=${id}`, {
    next: { revalidate: 3600 }
  });
    console.log('====================================');
  console.log(res);
  console.log('====================================');
  if (!res.ok) {
    throw new Error('Failed to fetch hostel details');
  }
  
  return res.json();
}

export default async function HostelDetailsPage({ params }: HostelDetailsPageProps) {
   const { hostelId } = params; 
  try {
    const hostelData = await getHostelDetails(hostelId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <NavBar />
        <HostelDetailsContent hostelData={hostelData} />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">Error Loading Hostel Details</h1>
            <p className="text-gray-600 mt-2">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
