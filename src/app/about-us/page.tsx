import React from "react";
import UnderConstruction from "../../components/common-components/under-construction/UnderConstruction";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import HeroSection from "../components/heroSection/HeroSection";
import AboutUsHeroSection from "@/components/about-us-components/AboutUsHeroSection";
import OurStory from "@/components/about-us-components/OurStory";
import AboutUsStatistics from "@/components/about-us-components/AboutUsStatistics";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import EmployeeDetailsWithSocialMedia from "@/components/about-us-components/EmployeeDetailsWithSocialMedia";
import CeoSpeech from "@/components/about-us-components/CeoSpeech";
import OurOffice from "@/components/about-us-components/OurOffice";
import AllEmployees from "@/components/about-us-components/AllEmployees";
import TourGuides from "@/components/about-us-components/TourGuides";
import OurFeatures from "@/components/about-us-components/OurFeatures";
import AchievementDetails from "@/components/about-us-components/AchievementDetails";

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
        <AboutUsHeroSection />
      </div>
      <div>
        <OurStory />
      </div>
      <div>
        <AllEmployees/>
      </div>
      <div>
        <AboutUsStatistics/>
      </div>
      <div>
        <WhyChooseUs/>
      </div>
      <div>
        <EmployeeDetailsWithSocialMedia/>
      </div>
      <div>
        <CeoSpeech/>
      </div>
      <TourGuides/>
      <div>
        <OurOffice/>
      </div>
      <div>
        <OurFeatures/>
      </div>
      <div>
        <AchievementDetails/>
      </div>
      <Footer />
    </>
  );
};

export default page;
