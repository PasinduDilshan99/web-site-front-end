// app/blog/page.tsx
"use client";

import { Suspense } from 'react';
import BlogPage from "@/pages/BlogPage";

const Page = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    }>
      <BlogPage />
    </Suspense>
  );
};

export default Page;