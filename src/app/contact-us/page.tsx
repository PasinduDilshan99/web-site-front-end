import React from "react";
import ContactUsPage from "@/pages/ContactUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

const page = () => {
  return <ContactUsPage />;
};

export default page;
