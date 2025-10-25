import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import UnderConstructionPage from "@/components/common-components/under-construction/UnderConstruction";
import React from "react";

interface VillaDetailsPageProps {
  villaId: string;
}

const VillaDetailsPage: React.FC<VillaDetailsPageProps> = ({ villaId }) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Villa ID: {villaId}</h1>
      </div>

      <UnderConstructionPage />
      <Footer />
    </div>
  );
};

export default VillaDetailsPage;
