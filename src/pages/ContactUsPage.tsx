import BusinessInformation from "@/components/contact-us-components/BusinessInformation";
import CallToAction from "@/components/contact-us-components/CallToAction";
import ContactForm from "@/components/contact-us-components/ContactForm";
import ContactHighlights from "@/components/contact-us-components/ContactHighlights";
import ContactUsHeroSection from "@/components/contact-us-components/ContactUsHeroSection";
import ContactUsOffice from "@/components/contact-us-components/ContactUsOffice";
import ContactUsSocialMedia from "@/components/contact-us-components/ContactUsSocialMedia";
import Faq from "@/components/faq-components/Faq";
import React from "react";

const ContactUsPage = () => {
  return (
    <>
      <div>
        <ContactUsHeroSection />
      </div>
      <div>
        <ContactHighlights />
      </div>
      <div>
        <ContactForm />
      </div>
      {/* <div>
        <ContactUsOffice />
      </div> */}
      {/* <div>
        <BusinessInformation />
      </div> */}
      {/* <div>
        <ContactUsSocialMedia />
      </div> */}
      {/* <div>
        <Faq />
      </div> */}
      <div>
        <CallToAction />
      </div>
    </>
  );
};

export default ContactUsPage;
