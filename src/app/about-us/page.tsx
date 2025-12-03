import React from "react";
import UnderConstruction from "../../components/common-components/under-construction/UnderConstruction";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import HeroSection from "../components/heroSection/HeroSection";
import AboutUsHeroSection from "@/components/about-us-components/AboutUsHeroSection";

const page = () => {
  return (
    <>
      <div>
        <LinkBar />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <AboutUsHeroSection/>
      </div>
      <div>
        <HeroSection />
      </div>
      <Footer />
    </>
  );
};

export default page;
