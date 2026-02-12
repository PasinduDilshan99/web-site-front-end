import DestinationHeroSection from "@/components/destinations-components/DestinationHeroSection";
import DestinationPage from "@/pages/DestinationPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Destinations",
};

const page = () => {
  return (
    <div>
      <DestinationHeroSection />
      <DestinationPage />
    </div>
  );
};

export default page;
