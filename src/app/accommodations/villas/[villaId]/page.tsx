import VillaDetailsPage from "@/pages/details-pages/VillaDetailsPage";
import React from "react";

interface PageProps {
  params: {
    villaId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { villaId } = params;

  return (
    <div>
      <VillaDetailsPage villaId={villaId} />
    </div>
  );
};

export default Page;
