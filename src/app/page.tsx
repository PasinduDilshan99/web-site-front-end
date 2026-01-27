import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Accommodations from "./components/accommodations/Accommodations";
import ActivitiesHome from "../components/home-page-components/activities/ActivitiesHome";
import ActivityCategoriesHome from "../components/home-page-components/activities/categories/ActivityCategoriesHome";
import ActiveBlogsSummery from "../components/home-page-components/blogs/ActiveBlogsSummery";
import DestinationsCategories from "../components/home-page-components/destinations/DestinationsCategories";
import NewDestinations from "../components/home-page-components/destinations/NewDestinations";
import PopularDestinations from "../components/home-page-components/destinations/popular-destinations/PopularDestinations";
import TrendingDestinations from "../components/home-page-components/destinations/TrendingDestinations";
import Footer from "./components/footer/Footer";
import GalleryHome from "../components/home-page-components/gallery/GalleryHome";
import HeroSection from "../components/home-page-components/heroSection/HeroSection";
import Inquire from "./components/inquire/Inquire";
import PackagesHome from "../components/packages-components/PackagesHome";
import Partners from "./components/partners/Partners";
import PromotionsHome from "./components/promotions/PromotionsHome";
import ReviewsHome from "./components/reviews/ReviewsHome";
import UserBenefitsHome from "./components/user-benefits/UserBenefitsHome";
import { UserLevelsWithBenefitsHome } from "./components/user-levels/benefits/UserLevelsWithBenefitsHome";
import UserLevelsHome from "./components/user-levels/UserLevelsHome";
import WorkFlow from "./components/workFlow/WorkFlow";
import NavBar from "@/components/common-components/navBar/NavBar";
import Faq from "@/components/faq-components/Faq";
import ContactForm from "@/components/contact-us-components/ContactForm";
import WhyChooseUs from "@/components/home-page-components/whyChooseUs/WhyChooseUs";
import OurServices from "@/components/home-page-components/ourServices/OurServices";
import ActiveToursHome from "@/components/home-page-components/tours/ActiveToursHome";
import ActiveToursHomeGrid from "@/components/home-page-components/tours/ActiveToursHomeGrid";
import TourMap from "@/components/home-page-components/tours/TourMap";
import PopularTours from "@/components/home-page-components/tours/PopularTours";
import AirplaneScrollWrapper from "./test/AirplaneScrollWrapper";

export default function Home() {
  return (
    <div>
      <AirplaneScrollWrapper>
        <div>
          <HeroSection />
        </div>
        {/* <div>
        <Partners />
      </div> */}
        <div>
          <WhyChooseUs />
        </div>
        <div>
          <OurServices />
        </div>
        {/* <div>
        <PopularDestinations />
      </div> */}
        <div>
        <TrendingDestinations />
      </div>
      {/* <div>
        <NewDestinations />
      </div> */}
        {/* <div>
        <PopularTours />
      </div> 
        <div>
        <ActiveToursHome />
      </div> */}
         <div>
        <ActiveToursHomeGrid />
      </div>
        <div>
        <TourMap />
      </div> 
        {/* <div>
        <ActivitiesHome />
      </div> */}
        <div>
        <ActivityCategoriesHome />
      </div>
        {/* <div>
        <PackagesHome />
      </div> */}
        {/* <div>
        <Accommodations />
      </div> */}
        {/* <div>
        <DestinationsCategories />
      </div> */}

        {/* User Benefits & Loyalty */}
        {/* <div>
        <UserLevelsHome />
      </div>
      <div>
        <UserLevelsWithBenefitsHome />
      </div>
      <div>
        <UserBenefitsHome />
      </div> */}

        {/* Social Proof & Content */}
        <div>
          <GalleryHome />
        </div>
        {/* <div>
        <ReviewsHome />
      </div> */}
        {/* <div>
        <ActiveBlogsSummery />
      </div> */}

        {/* Process & Promotions */}
        {/* <div>
        <WorkFlow />
      </div> */}
        {/* <div>
        <PromotionsHome />
      </div> */}

        {/* Support & Information */}
        {/* <div>
        <Faq />
      </div> */}
        <div>
          <ContactForm />
        </div>
        {/* <div>
        <Inquire />
      </div> */}
      </AirplaneScrollWrapper>
    </div>
  );
}
