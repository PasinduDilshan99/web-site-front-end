import { FaqComponent } from "@/components/faq-components/FaqComponent";
import FaqHeroSection from "@/components/faq-components/FaqHeroSection";
import React from "react";

const FaqPage = () => {
  return (
    <>
      <FaqHeroSection />
      <FaqComponent showAll={true} />
    </>
  );
};

export default FaqPage;
