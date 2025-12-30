// app/tour-schedules/page.tsx
"use client";

import { Suspense } from 'react';
import TourSchedulePage from "@/pages/TourSchedulePage";

const Page = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour schedules...</p>
        </div>
      </div>
    }>
      <TourSchedulePage />
    </Suspense>
  );
};

export default Page;