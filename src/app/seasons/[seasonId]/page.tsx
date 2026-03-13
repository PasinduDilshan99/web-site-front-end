import SeasonDetailsPage from "@/pages/SeasonDetailsPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seasons Details",
};
const page = () => {
  return (
    <div>
      <SeasonDetailsPage />
    </div>
  );
};

export default page;
