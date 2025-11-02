// pages/details-pages/RestaurantDetailsPage.tsx
import React from "react";
import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import RestaurantDetailsContent from "@/components/accommodation-components/restaurant-components/restaurant-details-components/RestaurantDetailsContent";

interface RestaurantDetailsPageProps {
  params: {
    restaurantId: string;
  };
}

async function getRestaurantDetails(
  id: string
): Promise<ServiceProviderAPIResponse> {
  const res = await fetch(
    `http://localhost:3000/api/service-providers/hotels?id=${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant details");
  }

  return res.json();
}

export default async function RestaurantDetailsPage({
  params,
}: RestaurantDetailsPageProps) {
  const { restaurantId } = params;
  try {
    const restaurantData = await getRestaurantDetails(restaurantId);
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
        <NavBar />
        <RestaurantDetailsContent restaurantData={restaurantData} />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-rose-600">
              Error Loading Restaurant Details
            </h1>
            <p className="text-gray-600 mt-2">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
