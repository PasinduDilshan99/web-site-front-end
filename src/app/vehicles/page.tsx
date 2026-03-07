import VehiclePage from "@/pages/VehiclePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicles",
};

const page = () => {
  return (
    <div>
      <VehiclePage />
    </div>
  );
};

export default page;
