"use client";
import ActivityCategoriesHome from "../components/home-page-components/activities/categories/ActivityCategoriesHome";
import TrendingDestinations from "../components/home-page-components/destinations/TrendingDestinations";
import GalleryHome from "../components/home-page-components/gallery/GalleryHome";
import HeroSection from "../components/home-page-components/heroSection/HeroSection";
import ContactForm from "@/components/contact-us-components/ContactForm";
import WhyChooseUs from "@/components/home-page-components/whyChooseUs/WhyChooseUs";
import OurServices from "@/components/home-page-components/ourServices/OurServices";
import ActiveToursHomeGrid from "@/components/home-page-components/tours/ActiveToursHomeGrid";
import { useAuth } from "@/context/AuthContext";
import { HOME_PAGE_VIEW_PRIVILEGE } from "@/utils/privileges";
import PermissionDenied from "@/components/common-components/permission-denied/PermissionDenied";
import TourMap from "@/components/home-page-components/tours/TourMap";

export default function HomePage() {
//   const { user } = useAuth();
//   if (!user?.privileges.includes(HOME_PAGE_VIEW_PRIVILEGE)) {
//     return <PermissionDenied />;
//   }

  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div>
        <WhyChooseUs buttonRequired={true} />
      </div>
      <div>
        <OurServices />
      </div>
      <div>
        <TrendingDestinations />
      </div>
      <div>
        <ActiveToursHomeGrid />
      </div>
         <div>
        <TourMap />
      </div>
      <div>
        <ActivityCategoriesHome />
      </div>
      <div>
        <GalleryHome />
      </div>
      <div>
        <ContactForm />
      </div>
      {/* <AirplaneScrollWrapper> */}
      {/* <div>
        <Partners />
      </div> */}
      {/* <div>
        <PopularDestinations />
      </div> */}
      {/* <div>
        <NewDestinations />
      </div> */}
      {/* <div>
        <PopularTours />
      </div> 
        <div>
        <ActiveToursHome />
      </div> */}
      {/* <div>
        <ActivitiesHome />
      </div> */}
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
      {/* <div>
        <Inquire />
      </div> */}
      {/* </AirplaneScrollWrapper> */}
    </div>
  );
}
