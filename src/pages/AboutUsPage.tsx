import Footer from "@/app/components/footer/Footer";
import AboutUsHeroSection from "@/components/about-us-components/AboutUsHeroSection";
import AboutUsStatistics from "@/components/about-us-components/AboutUsStatistics";
import AchievementDetails from "@/components/about-us-components/AchievementDetails";
import AllEmployees from "@/components/about-us-components/AllEmployees";
import CeoSpeech from "@/components/about-us-components/CeoSpeech";
import EmployeeDetailsWithSocialMedia from "@/components/about-us-components/EmployeeDetailsWithSocialMedia";
import OurFeatures from "@/components/about-us-components/OurFeatures";
import OurOffice from "@/components/about-us-components/OurOffice";
import OurStory from "@/components/about-us-components/OurStory";
import TourGuides from "@/components/about-us-components/TourGuides";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import NavBar from "@/components/common-components/navBar/NavBar";
import WhyChooseUs from "@/components/home-page-components/whyChooseUs/WhyChooseUs";
import React from "react";

const AboutUsPage = () => {
  return (
    <>
      <div>
        <AboutUsHeroSection />
      </div>
      <div>
        <OurStory />
      </div>
      <div>
        <CeoSpeech />
      </div>
      {/* <div>
        <AllEmployees />
      </div> */}
      <div>
        <AboutUsStatistics />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <EmployeeDetailsWithSocialMedia />
      </div>

      {/* <div>
        <TourGuides />
      </div> */}
      {/* <div>
        <OurOffice />
      </div> */}
      {/* <div>
        <OurFeatures />
      </div> */}
      {/* <div>
        <AchievementDetails />
      </div> */}
    </>
  );
};

export default AboutUsPage;
