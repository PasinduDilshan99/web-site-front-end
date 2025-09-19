import HeroSection from "./components/HeroSection";
import LinkBar from "./components/LinkBar";
import NavBar from "./components/NavBar";
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
    </div>
  );
}
