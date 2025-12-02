import React from "react";
import UnderConstruction from "../../components/common-components/under-construction/UnderConstruction";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const page = () => {
  return (
    <>
      <NavBar />
      <div>
        <UnderConstruction />
      </div>
      <Footer />
    </>
  );
};

export default page;
