import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import UnderConstructionPage from "@/components/common-components/under-construction/UnderConstruction";
import React from "react";

const RestaurantPage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
       <UnderConstructionPage />
      <Footer />
    </div>
  );
};

export default RestaurantPage;
