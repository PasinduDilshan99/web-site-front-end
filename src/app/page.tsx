import Faq from "./components/Faq";
import HeroSection from "./components/HeroSection";
import LinkBar from "./components/LinkBar";
import NavBar from "./components/NavBar";
import Partners from "./components/Partners";
import WhyChooseUs from "./components/WhyChooseUs";

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
    </div>
  );
}
