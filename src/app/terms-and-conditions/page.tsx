import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};
const page = () => {
  return <TermsAndConditionsPage />;
};

export default page;
