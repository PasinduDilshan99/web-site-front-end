import ActivityHeroSection from "@/components/activities-components/ActivityHeroSection";
import ActivityPage from "@/pages/ActivityPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Activities",
};

const page = () => {
  return (
    <div>
      <ActivityHeroSection />
      <ActivityPage />
    </div>
  );
};

export default page;
