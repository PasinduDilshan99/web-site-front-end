import ResortDetailsPage from "@/pages/details-pages/ResortDetailsPage";
import React from "react";

interface PageProps {
  params: {
    resortId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { resortId } = params;

  return (
    <div>
      <ResortDetailsPage resortId={resortId} />
    </div>
  );
};

export default Page;
