import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import UnderConstructionPage from "@/components/common-components/under-construction/UnderConstruction";
import React from "react";

interface ResortDetailsPageProps {
  resortId: string;
}

const ResortDetailsPage: React.FC<ResortDetailsPageProps> = ({ resortId }) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Resort ID: {resortId}</h1>
      </div>

      <UnderConstructionPage />
      <Footer />
    </div>
  );
};

export default ResortDetailsPage;
