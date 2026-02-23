import ActivityDetailsPage from "@/pages/details-pages/ActivityDetailsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Activity Details",
};

const page = () => {
  return (
    <div>
      <ActivityDetailsPage />
    </div>
  );
};

export default page;
