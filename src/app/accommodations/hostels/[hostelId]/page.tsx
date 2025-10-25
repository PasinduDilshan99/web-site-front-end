import HostelDetailsPage from "@/pages/details-pages/HostelDetailsPage";
import React from "react";

interface PageProps {
  params: {
    hostelId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { hostelId } = params;

  return (
    <div>
      <HostelDetailsPage hostelId={hostelId} />
    </div>
  );
};

export default Page;
