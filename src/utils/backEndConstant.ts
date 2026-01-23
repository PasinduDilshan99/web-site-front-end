const PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL;
const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_API_PORT;
const CONTEXT_ROOT = "felicita";
const VERSION = "/v0";
const API = "/api";
const LINK_BAR = "/link-bar";
const NAV_BAR = "/nav-bar";
const HERO_SECTION = "/hero-section";
const WHY_CHOOSE_US = "/why-choose-us";
const FAQ = "/faq";
const PARTNERS = "/partner";
const OUR_SERVICES = "/our-service";
const WORK_FLOW = "/work-flow";
const ACCOMMODATION = "/accommodation";
const DESTINATIONS = "/destination";
const BLOG = "/blog";
const TOUR = "/tour";
const PACKAGE = "/package";
const REVIEW = "/review";
const USER_LEVEL = "/user-level";
const USER_BENEFITS = "/user-benefits";
const PROMOTIONS = "/promotions";
const GALLERY = "/gallery";
const ACTIVITIES = "/activities";
const FOOTER = "/footer";
const PLAN_YOUR_TRIP = "/plan-your-trip";
const SERVICE_PROVIDER = "/service-provider";
const VEHICLES = "/vehicles";
const EMPLOYEE = "/employee"

export const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}/${CONTEXT_ROOT}`;

// Link Bar
export const GET_ALL_LINK_BAR_DATA = `${BASE_PATH}${API}${VERSION}${LINK_BAR}/all`;
export const GET_ACTIVE_LINK_BAR_DATA = `${BASE_PATH}${API}${VERSION}${LINK_BAR}/active`;

// Nav Bar
export const GET_ACTIVE_NAV_BAR_DATA = `${BASE_PATH}${API}${VERSION}${NAV_BAR}/active`;

// Hero Sections
export const GET_ACTIVE_HOME_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/home`;
export const GET_ACTIVE_ABOUT_US_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/about-us`;
export const GET_ACTIVE_CONTACT_US_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/contact-us`;
export const GET_ACTIVE_BLOG_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/blog`;
export const GET_ACTIVE_FAQ_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/faq`;
export const GET_ACTIVE_TOUR_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/tour`;
export const GET_ACTIVE_PACKAGE_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/package`;
export const GET_ACTIVE_DESTINATION_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/destination`;
export const GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/activity`;
export const GET_ACTIVE_PACKAGE_SCHEDULE_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/package-schedule`;
export const GET_ACTIVE_BOOKED_TOUR_HERO_SECTION_DATA = `${BASE_PATH}${API}${VERSION}${HERO_SECTION}/booked-tour`;

// Why Choose Us
export const GET_ACTIVE_WHY_CHOOSE_US_DATA = `${BASE_PATH}${API}${VERSION}${WHY_CHOOSE_US}/active`;

// Our Services
export const GET_ACTIVE_OUR_SERVICES_DATA = `${BASE_PATH}${API}${VERSION}${OUR_SERVICES}/active`;

// Destinations
export const GET_DESTINATIONS_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}`;
export const GET_ACTIVE_DESTINATIONS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/active-destinations`;
export const GET_ACTIVE_DESTINATIONS_CATEGORIES_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/active-categories`;
export const GET_POPULAR_DESTINATIONS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/popular-destinations`;
export const GET_NEW_DESTINATIONS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/new-destinations`;
export const GET_TRENDING_DESTINATIONS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/trending-destinations`;
export const GET_ACTIVE_DESTINATIONS_FOR_TOUR_MAP_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/tour-map`;
export const GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/tour-id`;
export const GET_DESTINATIONS_DETAILS_BY_REQUEST_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/destinations`;
export const GET_DESTINATIONS_HISTORY_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/history`;
export const GET_DESTINATIONS_HISTORY_IMAGES_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/history-images`;
export const GET_DESTINATIONS_REVIEWS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${DESTINATIONS}/reviews`;

// Tours
export const GET_TOUR_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}`;
export const GET_ALL_TOURS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/all`;
export const GET_ACTIVE_TOURS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/active`;
export const GET_POPULAR_TOURS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/popular`;
export const GET_TOURS_DETAILS_BY_REQUEST_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/tours`;
export const GET_TOURS_HISTORY_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/history`;
export const GET_TOURS_HISTORY_IMAGES_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/history-images`;
export const GET_TOURS_REVIEWS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/reviews`;
export const GET_TOUR_EXTRA_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/tour-extra-details`;
export const GET_TOUR_DAY_TO_DAY_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/tour-details`;
export const GET_ALL_TOURS_BASIC_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${TOUR}/all-tours-basic`;

// Packages
export const GET_PACKAGE_DETAILS_BY_PACKAGE_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}`;
export const GET_ALL_PACKAGES_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/all`;
export const GET_ACTIVE_PACKAGES_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/active`;
export const GET_PACKAGES_DETAILS_BY_REQUEST_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/packages`;
export const GET_PACKAGES_REVIEWS_DETAILS_DATA = `${BASE_PATH}${VERSION}${API}${PACKAGE}/reviews`;
export const GET_PACKAGE_DETAILS_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/package-details`;
export const GET_PACKAGE_EXTRA_DETAILS_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/package-extra-details`;
export const GET_PACKAGE_SCHEDULES_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/package-schedules`;
export const GET_PACKAGE_SCHEDULES_DETAILS_BY_PACKAGE_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/package-schedules-details`;
export const GET_PACKAGE_REVIEWS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/reviews`;
export const GET_PACKAGE_HISTORY_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/history`;
export const GET_PACKAGE_HISTORY_IMAGES_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/history-images`;
export const GET_PACKAGE_COMPARE_DETAILS_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${PACKAGE}/package-compare`;

// Employees
export const GET_EMPLOYEE_DETAILS_BY_TOUR_ID_DATA = `${BASE_PATH}${API}${VERSION}${EMPLOYEE}/employee-details`;


export const GET_TOUR_DETAILS_BY_ID_BE = `${BASE_PATH}${VERSION}${API}${TOUR}`;


export const UPDATE_FAQ_VIEW_COUNT = `${BASE_PATH}${VERSION}${API}${FAQ}/view-count`;

export const GET_VISIBLE_PARTNERS = `${BASE_PATH}${VERSION}${API}${PARTNERS}/visible`;


export const GET_ACTIVE_WORK_FLOW = `${BASE_PATH}${VERSION}${API}${WORK_FLOW}/active`;




export const GET_ALL_ACTIVE_BLOGS = `${BASE_PATH}${VERSION}${API}${BLOG}/active`;





export const GET_ALL_ACTIVE_REVIEW_BE = `${BASE_PATH}${VERSION}${API}${REVIEW}/active`;
export const GET_ALL_ACTIVE_USER_LEVEL_BE = `${BASE_PATH}${API}${VERSION}${USER_LEVEL}/active`;
export const GET_ALL_ACTIVE_USER_LEVEL_WITH_BENEFITS_BE = `${BASE_PATH}${API}${VERSION}${USER_LEVEL}/active-with-benefits`;
export const GET_ALL_ACTIVE_USER_BENEFITS_BE = `${BASE_PATH}${API}${VERSION}${USER_BENEFITS}/active`;
export const GET_ALL_ACTIVE_PROMOTIONS_BE = `${BASE_PATH}${API}${VERSION}${PROMOTIONS}/active`;
export const GET_OPEN_GALLERY_BE = `${BASE_PATH}${API}${VERSION}${GALLERY}/open`;
export const GET_ACTIVE_ACTIVITIES_BE = `${BASE_PATH}${API}${VERSION}${ACTIVITIES}/active`;
export const GET_ACTIVE_ACTIVITIES_CATEGORIES_BE = `${BASE_PATH}${API}${VERSION}${ACTIVITIES}/active-category`;
export const GET_ACTIVE_FOOTER_DATA = `${BASE_PATH}${API}${VERSION}${FOOTER}/active`;
export const GET_PLAN_YOUR_TRIP_ACTIVE_DESTINATIONS = `${BASE_PATH}${API}${VERSION}${PLAN_YOUR_TRIP}/active`;
export const GET_PLAN_YOUR_TRIP_DESTINATIONS_TOURS = `${BASE_PATH}${API}${VERSION}${PLAN_YOUR_TRIP}/tours`;

// FAQ
export const GET_VISIBLE_FAQ_DATA = `${BASE_PATH}${VERSION}${API}${FAQ}/visible`;
export const INSERT_FAQ_REQUEST = `${BASE_PATH}${VERSION}${API}${FAQ}/insert-faq-request`;

// Accommodations
export const GET_AVAILABLE_ACCOMMODATION = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/available`;
export const GET_HOTEL_DETAILS_SECTION_BE = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/hotels-section`;
export const GET_RESORT_DETAILS_SECTION_BE = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/resorts-section`;
export const GET_VILLA_DETAILS_SECTION_BE = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/villas-section`;
export const GET_HOSTEL_DETAILS_SECTION_BE = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/hostels-section`;
export const GET_RESTAURANT_DETAILS_SECTION_BE = `${BASE_PATH}${VERSION}${API}${ACCOMMODATION}/restaurants-section`;

// Service Providers
export const GET_SERVICE_PROVIDER_DETAILS = (id: string) => 
  `${BASE_PATH}${API}${VERSION}${SERVICE_PROVIDER}/${id}`;

// vehicles
export const GET_ACTIVE_VEHICLES_BE = `${BASE_PATH}${API}${VERSION}${VEHICLES}/active-vehicles`;
export const GET_VEHICLES_BY_ID_BE = (id: string) => 
  `${BASE_PATH}${API}${VERSION}${VEHICLES}/${id}`;
