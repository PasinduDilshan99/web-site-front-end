import Accommodations from "./components/Accommodations";
import ActivitiesHome from "./components/activities/ActivitiesHome";
import ActivityCategoriesHome from "./components/activities/categories/ActivityCategoriesHome";
import ActiveBlogsSummery from "./components/blogs/ActiveBlogsSummery";
import DestinationsCategories from "./components/destinations/DestinationsCategories";
import NewDestinations from "./components/destinations/NewDestinations";
import PopularDestinations from "./components/destinations/PopularDestinations";
import TrendingDestinations from "./components/destinations/TrendingDestinations";
import Faq from "./components/faq/Faq";
import Footer from "./components/footer/Footer";
import GalleryHome from "./components/gallery/GalleryHome";
import HeroSection from "./components/HeroSection";
import Inquire from "./components/Inquire";
import LinkBar from "./components/LinkBar";
import NavBar from "./components/NavBar";
import OurServices from "./components/OurServices";
import PackagesHome from "./components/packages/PackagesHome";
import Partners from "./components/Partners";
import PromotionsHome from "./components/promotions/PromotionsHome";
import ReviewsHome from "./components/reviews/ReviewsHome";
import ActiveToursHome from "./components/tours/ActiveToursHome";
import ActiveToursHomeGrid from "./components/tours/ActiveToursHomeGrid";
import PopularTours from "./components/tours/PopularTours";
import UserBenefitsHome from "./components/user-benefits/UserBenefitsHome";
import { UserLevelsWithBenefitsHome } from "./components/user-levels/benefits/UserLevelsWithBenefitsHome";
import UserLevelsHome from "./components/user-levels/UserLevelsHome";
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
        <ActiveBlogsSummery />
      </div>
      <div>
        <ActiveToursHome />
      </div>
      <div>
        <ActiveToursHomeGrid />
      </div>
      <div>
        <PackagesHome />
      </div>
      <div>
        <ReviewsHome />
      </div>
      <div>
        <UserLevelsHome />
      </div>
      <div>
        <UserLevelsWithBenefitsHome />
      </div>
      <div>
        <UserBenefitsHome />
      </div>
      <div>
        <PromotionsHome />
      </div>
      <div>
        <PopularTours />
      </div>

      <div>
        <GalleryHome />
      </div>
      <div>
        <ActivitiesHome />
      </div>
      <div>
        <ActivityCategoriesHome />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
