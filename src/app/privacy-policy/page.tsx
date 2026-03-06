import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const page = () => {
  return <PrivacyPolicyPage />;
};

export default page;
