// app/accommodations/resorts/[resortId]/page.tsx
import Footer from "@/app/components/footer/Footer";
import ResortDetailsContent from "@/components/accommodation-components/resort-components/resort-details-components/ResortDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";

interface ResortDetailsPageProps {
  params: {
    resortId: string;
  };
}

async function getResortDetails(id: string): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(`http://localhost:3000/api/service-providers/hotels?id=${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch resort details');
  }
  
  return res.json();
}

export default async function ResortDetailsPage({ params }: ResortDetailsPageProps) {
  const { resortId } = params;
  
  try {
    const resortData = await getResortDetails(resortId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <NavBar />
        <ResortDetailsContent resortData={resortData} />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-teal-600">Error Loading Resort Details</h1>
            <p className="text-gray-600 mt-2">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}