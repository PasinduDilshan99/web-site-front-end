import SeasonsPage from "@/pages/SeasonPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seasons",
};
const page = () => {
  return (
    <div>
      <SeasonsPage />
    </div>
  );
};

export default page;
