import HostelsSection from "@/components/accommodation-components/HostelsSection";
import HotelsSection from "@/components/accommodation-components/HotelsSection";
import ResortsSection from "@/components/accommodation-components/ResortsSection";
import RestaurantsSection from "@/components/accommodation-components/RestaurantsSection";
import VillasSection from "@/components/accommodation-components/VillasSection";
import React from "react";

const AccommodationPage = () => {
  return (
    <div>
      <HotelsSection />
      <VillasSection />
      <ResortsSection />
      <RestaurantsSection />
      <HostelsSection />
    </div>
  );
};

export default AccommodationPage;
