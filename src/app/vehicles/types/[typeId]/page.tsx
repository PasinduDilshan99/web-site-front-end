import VehicleTypeDetailsPage from "@/pages/VehicleTypeDetailsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicle Types Details",
};

const page = () => {
  return (
    <div>
      <VehicleTypeDetailsPage />
    </div>
  );
};

export default page;
