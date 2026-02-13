import DestinationDetailsPage from "@/pages/details-pages/DestinationDetailsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Destination Details",
};

const page = () => {
  return (
    <div>
      <DestinationDetailsPage />
    </div>
  );
};

export default page;
