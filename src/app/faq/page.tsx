import FaqPage from "@/pages/FaqPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Faq",
};

const page = () => {
  return (
    <div>
      <FaqPage />
    </div>
  );
};

export default page;
