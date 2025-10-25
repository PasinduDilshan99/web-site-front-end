import Footer from "@/app/components/footer/Footer";
import HostelsSection from "@/components/accommodation-components/HostelsSection";
import HotelsSection from "@/components/accommodation-components/HotelsSection";
import ResortsSection from "@/components/accommodation-components/ResortsSection";
import RestaurantsSection from "@/components/accommodation-components/RestaurantsSection";
import VillasSection from "@/components/accommodation-components/VillasSection";
import NavBar from "@/components/common-components/navBar/NavBar";
import React from "react";

const AccommodationPage = () => {
  return (
    <div>
      <NavBar />
      <div>
        <HotelsSection />
        <VillasSection />
        <ResortsSection />
        <RestaurantsSection />
        <HostelsSection />
      </div>
      <Footer />
    </div>
  );
};

export default AccommodationPage;
