import RestaurantDetailsPage from "@/pages/details-pages/RestaurantDetailsPage";
import React from "react";

interface PageProps {
  params: {
    restaurantId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { restaurantId } = params;

  return (
    <div>
      <RestaurantDetailsPage restaurantId={restaurantId} />
    </div>
  );
};

export default Page;
