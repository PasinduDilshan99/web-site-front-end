import React from "react";
import AboutUsPage from "@/pages/AboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

const page = () => {
  return <AboutUsPage />;
};

export default page;
