import { Suspense } from "react";
import BlogPage from "@/pages/BlogPage";
import { Metadata } from "next";
import BlogHeroSection from "@/components/blog-components/BlogHeroSection";

export const metadata: Metadata = {
  title: "Blogs",
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-amber-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        </div>
      }
    >
      <BlogHeroSection />
      <BlogPage />
    </Suspense>
  );
};

export default Page;
