import SeasonsPage from "@/pages/SeasonPage";
import React from "react";
import { Metadata } from "next";
import SeasonHeroSection from "@/components/season-components/SeasonHeroSection";

export const metadata: Metadata = {
  title: "Seasons",
};
const page = () => {
  return (
    <div>
      <SeasonHeroSection />
      <SeasonsPage />
    </div>
  );
};

export default page;
