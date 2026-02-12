import PackageHeroSection from "@/components/packages-components/PackageHeroSection";
import PackagePage from "@/pages/PackagePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Packages",
};

const page = () => {
  return (
    <div>
      <PackageHeroSection />
      <PackagePage />
    </div>
  );
};

export default page;
