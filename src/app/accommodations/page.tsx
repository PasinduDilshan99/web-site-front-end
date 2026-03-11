import AccommodationPage from "@/pages/AccommodationPage";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodations",
};

const page = () => {
  return (
    <div>
      <AccommodationPage />
    </div>
  );
};

export default page;
