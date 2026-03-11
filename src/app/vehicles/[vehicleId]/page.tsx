import React from "react";
import { Metadata } from "next";
import VehicleDetailsClient from "@/components/vehicle-components/vehicle-details-components/VehicleDetailsClient";

export const metadata: Metadata = {
  title: "Vehicle Details",
};

interface PageProps {
  params: {
    vehicleId: string;
  };
}

export default async function VehicleDetailsPage({ params }: PageProps) {
  return <VehicleDetailsClient vehicleId={params.vehicleId} />;
}
