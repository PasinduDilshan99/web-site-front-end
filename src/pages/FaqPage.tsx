import Footer from "@/app/components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import NavBar from "@/components/common-components/navBar/NavBar";
import { FaqComponent } from "@/components/faq-components/FaqComponent";
import FaqHeroSection from "@/components/faq-components/FaqHeroSection";
import React from "react";

const FaqPage = () => {
  return (
    <>
      <LinkBar />
      <NavBar />
      <FaqHeroSection />
      <FaqComponent showAll={true} />
      <Footer />
    </>
  );
};

export default FaqPage;
