import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Accommodations from "./components/accommodations/Accommodations";
import ActivitiesHome from "./components/activities/ActivitiesHome";
import ActivityCategoriesHome from "./components/activities/categories/ActivityCategoriesHome";
import ActiveBlogsSummery from "./components/blogs/ActiveBlogsSummery";
import DestinationsCategories from "./components/destinations/DestinationsCategories";
import NewDestinations from "./components/destinations/NewDestinations";
import PopularDestinations from "../components/destinations-components/popular-destinations/PopularDestinations";
import TrendingDestinations from "./components/destinations/TrendingDestinations";
import Footer from "./components/footer/Footer";
import GalleryHome from "./components/gallery/GalleryHome";
import HeroSection from "./components/heroSection/HeroSection";
import Inquire from "./components/inquire/Inquire";
import OurServices from "./components/ourServices/OurServices";
import PackagesHome from "../components/packages-components/PackagesHome";
import Partners from "./components/partners/Partners";
import PromotionsHome from "./components/promotions/PromotionsHome";
import ReviewsHome from "./components/reviews/ReviewsHome";
import ActiveToursHome from "./components/tours/ActiveToursHome";
import ActiveToursHomeGrid from "./components/tours/ActiveToursHomeGrid";
import PopularTours from "./components/tours/PopularTours";
import TourMap from "./components/tours/TourMap";
import UserBenefitsHome from "./components/user-benefits/UserBenefitsHome";
import { UserLevelsWithBenefitsHome } from "./components/user-levels/benefits/UserLevelsWithBenefitsHome";
import UserLevelsHome from "./components/user-levels/UserLevelsHome";
import WhyChooseUs from "./components/whyChooseUs/WhyChooseUs";
import WorkFlow from "./components/workFlow/WorkFlow";
import NavBar from "@/components/common-components/navBar/NavBar";
import Faq from "@/components/faq-components/Faq";

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
        <Partners />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <OurServices />
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
        <PopularTours />
      </div>
      <div>
        <ActiveToursHome />
      </div>
      <div>
        <ActiveToursHomeGrid />
      </div>
      <div>
        <TourMap />
      </div>
      <div>
        <ActivitiesHome />
      </div>
      <div>
        <ActivityCategoriesHome />
      </div>

      <div>
        <PackagesHome />
      </div>
      <div>
        <Accommodations />
      </div>
      <div>
        <DestinationsCategories />
      </div>

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
      <div>
        <ReviewsHome />
      </div>
      <div>
        <ActiveBlogsSummery />
      </div>

      {/* Process & Promotions */}
      <div>
        <WorkFlow />
      </div>
      <div>
        <PromotionsHome />
      </div>

      {/* Support & Information */}
      <div>
        <Faq />
      </div>
      <div>
        <Inquire />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
