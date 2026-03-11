import VehicleSpecificationDetailsPage from "@/pages/VehicleSpecificationDetailsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicle Specification Details",
};

const page = () => {
  return (
    <div>
      <VehicleSpecificationDetailsPage />
    </div>
  );
};

export default page;
