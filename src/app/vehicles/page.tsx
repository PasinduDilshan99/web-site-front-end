import VehicleHeroSection from "@/components/vehicle-components/VehicleHeroSection";
import VehiclePage from "@/pages/VehiclePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicles",
};

const page = () => {
  return (
    <div>
      <VehicleHeroSection />
      <VehiclePage />
    </div>
  );
};

export default page;