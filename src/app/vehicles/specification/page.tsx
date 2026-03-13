import VehicleSpecificationHeroSection from "@/components/vehicle-components/specification-components/VehicleSpecificationHeroSection";
import VehicleSpecificationPage from "@/pages/VehicleSpecificationPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicle Specification",
};
const page = () => {
  return (
    <div>
      <VehicleSpecificationHeroSection />
      <VehicleSpecificationPage />
    </div>
  );
};

export default page;
