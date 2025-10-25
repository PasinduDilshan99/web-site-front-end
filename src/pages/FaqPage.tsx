import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import { FaqComponent } from "@/components/faq-components/FaqComponent";
import React from "react";

const FaqPage = () => {
  return (
    <>
      <NavBar />
      <FaqComponent showAll={true} />
      <Footer />
    </>
  );
};

export default FaqPage;
