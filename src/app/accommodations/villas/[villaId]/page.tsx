// app/accommodations/villas/[villaId]/page.tsx
import Footer from "@/app/components/footer/Footer";
import VillaDetailsContent from "@/components/accommodation-components/villa-components/villa-details-components/VillaDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";

interface VillaDetailsPageProps {
  params: {
    villaId: string;
  };
}

async function getVillaDetails(id: string): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(`http://localhost:3000/api/service-providers/hotels?id=${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch villa details');
  }
  
  return res.json();
}

export default async function VillaDetailsPage({ params }: VillaDetailsPageProps) {
  const { villaId } = params;
  
  try {
    const villaData = await getVillaDetails(villaId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <NavBar />
        <VillaDetailsContent villaData={villaData} />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-emerald-600">Error Loading Villa Details</h1>
            <p className="text-gray-600 mt-2">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}