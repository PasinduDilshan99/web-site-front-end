import LinkBar from "@/components/common-components/linkBar/LinkBar";
import NavBar from "@/components/common-components/navBar/NavBar";
import TourHeroSection from "@/components/sri-lankan-tours-components/TourHeroSection";
import SriLankanTourPage from "@/pages/SriLankanTourPage";
import React from "react";
import Footer from "../components/footer/Footer";

const page = () => {
  return (
    <div>
      <TourHeroSection />
      <SriLankanTourPage />
    </div>
  );
};

export default page;
