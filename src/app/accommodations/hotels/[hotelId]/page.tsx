import HotelDetailsPage from "@/pages/details-pages/HotelDetailsPage";
import React from "react";

interface PageProps {
  params: {
    hotelId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { hotelId } = params;

  return (
    <div>
      <HotelDetailsPage hotelId={hotelId} />
    </div>
  );
};

export default Page;
