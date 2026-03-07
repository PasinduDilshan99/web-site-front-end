// app/vehicle-types/page.tsx
import VehicleTypesHeroSection from "@/components/vehicle-components/vehicle-types-components/VehicleTypesHeroSection";
import VehicleTypesPage from "@/pages/VehicleTypesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicle Types",
};

const page = () => {
  return (
    <div>
      <VehicleTypesHeroSection />
      <VehicleTypesPage />
    </div>
  );
};

export default page;
