// app/accommodations/hotels/[hotelId]/page.tsx
import Footer from "@/app/components/footer/Footer";
import HotelDetailsContent from "@/components/accommodation-components/hotels-components/hotel-details-components/HotelDetailsContent";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";

interface HotelDetailsPageProps {
  params: {
    hotelId: string;  // Changed from 'id' to 'hotelId'
  };
}

async function getHotelDetails(id: string): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(`http://localhost:3000/api/service-providers/hotels?id=${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch hotel details');
  }
  
  return res.json();
}

export default async function HotelDetailsPage({ params }: HotelDetailsPageProps) {
  const { hotelId } = params;  // Destructure hotelId instead of id
  
  try {
    const hotelData = await getHotelDetails(hotelId);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <HotelDetailsContent hotelData={hotelData} />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-600">Error Loading Hotel Details</h1>
            <p className="text-gray-600 mt-2">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}