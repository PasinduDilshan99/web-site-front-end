import Accommodations from "./components/Accommodations";
import DestinationsCategories from "./components/destinations/DestinationsCategories";
import NewDestinations from "./components/destinations/NewDestinations";
import PopularDestinations from "./components/destinations/PopularDestinations";
import TrendingDestinations from "./components/destinations/TrendingDestinations";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Inquire from "./components/Inquire";
import LinkBar from "./components/LinkBar";
import NavBar from "./components/NavBar";
import OurServices from "./components/OurServices";
import Partners from "./components/Partners";
import WhyChooseUs from "./components/WhyChooseUs";
import WorkFlow from "./components/WorkFlow";

export default function Home() {
  return (
    <div>
      <div>
        <LinkBar />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <HeroSection />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <Partners />
      </div>
      <div>
        <OurServices />
      </div>
      <div>
        <WorkFlow />
      </div>
      <div>
        <Accommodations />
      </div>
      <div>
        <Inquire />
      </div>
      <div>
        <DestinationsCategories />
      </div>
      <div>
        <PopularDestinations />
      </div>
      <div>
        <TrendingDestinations />
      </div>
      <div>
        <NewDestinations />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
