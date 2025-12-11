import LinkBar from "@/components/common-components/linkBar/LinkBar";
import NavBar from "@/components/common-components/navBar/NavBar";
import BusinessInformation from "@/components/contact-us-components/BusinessInformation";
import CallToAction from "@/components/contact-us-components/CallToAction";
import ContactForm from "@/components/contact-us-components/ContactForm";
import ContactHighlights from "@/components/contact-us-components/ContactHighlights";
import ContactUsHeroSection from "@/components/contact-us-components/ContactUsHeroSection";
import ContactUsOffice from "@/components/contact-us-components/ContactUsOffice";
import ContactUsSocialMedia from "@/components/contact-us-components/ContactUsSocialMedia";
import Faq from "@/components/faq-components/Faq";
import React from "react";
import Footer from "../components/footer/Footer";

const page = () => {
  return (
    <div>
      <div>
        <LinkBar />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <ContactUsHeroSection />
      </div>
      <div>
        <ContactHighlights />
      </div>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactUsOffice />
      </div>
      <div>
        <BusinessInformation />
      </div>
      <div>
        <ContactUsSocialMedia />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <CallToAction/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default page;
