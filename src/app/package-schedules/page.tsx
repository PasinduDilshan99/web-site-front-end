// app/package-schedules/page.tsx (or wherever this is located)
import { Suspense } from "react";
import PackageSchedulePage from "@/pages/PackageSchedulePage";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading package comparison...</p>
          </div>
        </div>
      }
    >
      {" "}
      <PackageSchedulePage />
    </Suspense>
  );
};

export default Page;
