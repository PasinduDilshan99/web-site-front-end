"use client";

import { Suspense } from 'react';
import TourHeroSection from "@/components/sri-lankan-tours-components/TourHeroSection";
import SriLankanTourPage from "@/pages/SriLankanTourPage";

const Page = () => {
  return (
    <div>
      <TourHeroSection />
      <Suspense fallback={
        <div className="py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-center text-gray-600">Loading tours...</p>
        </div>
      }>
        <SriLankanTourPage />
      </Suspense>
    </div>
  );
};

export default Page;