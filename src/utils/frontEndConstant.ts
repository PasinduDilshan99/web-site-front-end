const API = "/api";
const LINK_BAR = "/link-bar";
const NAV_BAR = "/nav-bar";
const HERO_SECTION = "/hero-section";
const WHY_CHOOSE_US = "/why-choose-us";
const FAQ = "/faq";
const PARTNERS = "/partners";
const OUR_SERVICES = "/our-services";
const WORK_FLOW = "/work-flow";
const ACCOMMODATION = "/accommodations";
const DESTINATIONS = "/destinations";
const CATEGORIES = "/categories";
const BLOGS = "/blogs";
const TOUR = "/tour";
const PACKAGES = "/packages";
const REVIEW = "/review";
const USER_LEVEL = "/user-levels";
const USER_BENEFITS = "/user-benefits";
const PROMOTIONS = "/promotions";
const GALLERY = "/gallery";
const ACTIVITIES = "/activities";
const FOOTER = "/footer";
const PLAN_YOUR_TRIP = "/plan-your-trip";
const EMPLOYEES = "/employees";
const INQUIRY = "/inquiry";
const OUR_STORY = "/our-story"
const CONTACT_US = "/contact-us"

// Link Bar
export const GET_ACTIVE_LINK_BAR_DATA = `${API}${LINK_BAR}`;

// Nav Bar
export const GET_ALL_NAV_BAR_DATA = `${API}${NAV_BAR}`;

// Hero Section
export const GET_ACTIVE_HOME_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/home`;
export const GET_ACTIVE_ABOUT_US_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/about-us`;
export const GET_ACTIVE_CONTACT_US_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/contact-us`;
export const GET_ACTIVE_BLOG_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/blog`;
export const GET_ACTIVE_FAQ_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/faq`;
export const GET_ACTIVE_TOUR_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/tour`;
export const GET_ACTIVE_PACKAGE_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/package`;
export const GET_ACTIVE_DESTINATION_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/destination`;
export const GET_ACTIVE_ACTIVITY_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/activity`;
export const GET_ACTIVE_PACKAGE_SCHEDULE_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/package-schedule`;
export const GET_ACTIVE_BOOKED_TOUR_HERO_SECTION_DATA_FE = `${API}${HERO_SECTION}/booked-tour`;

// Why Choose Us
export const GET_ACTIVE_WHY_CHOOSE_US_DATA_FE = `${API}${WHY_CHOOSE_US}`;

// Our Services
export const GET_ACTIVE_OUR_SERVICES_DATA_FE = `${API}${OUR_SERVICES}`;

// Destinations
export const GET_DESTINATIONS_DETAILS_BY_ID_DATA_FE = `${API}${DESTINATIONS}`;
export const GET_ACTIVE_DESTINATIONS_DATA_FE = `${API}${DESTINATIONS}/active-destinations`;
export const GET_ACTIVE_DESTINATIONS_CATEGORIES_FE = `${API}${DESTINATIONS}${CATEGORIES}`;
export const GET_POPULAR_DESTINATIONS_DATA_FE = `${API}${DESTINATIONS}/popular-destinations`;
export const GET_NEW_DESTINATIONS_DATA_FE = `${API}${DESTINATIONS}/new-destinations`;
export const GET_TRENDING_DESTINATIONS_DATA_FE = `${API}${DESTINATIONS}/trending-destinations`;
export const GET_ACTIVE_DESTINATIONS_FOR_TOUR_MAP_DATA_DE = `${API}${DESTINATIONS}/tour-map`;
export const GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA_FE = `${API}${DESTINATIONS}/destinations-by-tour-id`;
export const GET_DESTINATIONS_DETAILS_BY_REQUEST_DATA_FE = `${API}${DESTINATIONS}/destinations-for-request`;
export const GET_DESTINATIONS_HISTORY_DETAILS_DATA_FE = `${API}${DESTINATIONS}/history-details`;
export const GET_DESTINATIONS_HISTORY_IMAGES_DETAILS_DATA_FE = `${API}${DESTINATIONS}/history-images`;
export const GET_DESTINATIONS_REVIEWS_DETAILS_DATA_FE = `${API}${DESTINATIONS}/reviews`;

// Tours
export const GET_TOUR_DETAILS_BY_ID_DATA_FE = `${API}${TOUR}`;
export const GET_ALL_TOUR_DATA_FE = `${API}${TOUR}`;
export const GET_ACTIVE_TOUR_DATA_FE = `${API}${TOUR}/active-tours`;
export const GET_POPULAR_TOUR_DATA_FE = `${API}${TOUR}/popular`;
export const GET_TOURS_DETAILS_BY_REQUEST_DATA_FE = `${API}${TOUR}/tours-for-request`;
export const GET_TOURS_HISTORY_DETAILS_DATA_FE = `${API}${TOUR}/history`;
export const GET_TOURS_HISTORY_IMAGES_DETAILS_DATA_FE = `${API}${TOUR}/history-images`;
export const GET_TOURS_REVIEWS_DETAILS_DATA_FE = `${API}${TOUR}/reviews`;
export const GET_TOUR_EXTRA_DETAILS_BY_ID_DATA_FE = `${API}${TOUR}/extra-details`;
export const GET_TOUR_DAY_TO_DAY_DETAILS_BY_ID_DATA_FE = `${API}${TOUR}/day-to-day-details`;
export const GET_ALL_TOURS_BASIC_DETAILS_DATA_FE = `${API}${TOUR}/basic-details`;

// Packages
export const GET_ALL_PACKAGES_DETAILS_DATA_FE = `${API}${PACKAGES}`;
export const GET_ACTIVE_PACKAGE_DETAILS_DATA_FE = `${API}${PACKAGES}/active-packages`;
export const GET_PACKAGE_DETAILS_BY_ID_DATA_FE = `${API}${PACKAGES}`;
export const GET_PACKAGE_ALL_DETAILS_BY_ID_DATA_FE = `${API}${PACKAGES}/all-details`;
export const GET_PACKAGES_DETAILS_FOR_REQUEST_DATA_FE = `${API}${PACKAGES}/packages-for-request`;
export const GET_PACKAGE_REVIEWS_DETAILS_DATA_FE = `${API}${PACKAGES}/reviews`;
export const GET_PACKAGE_HISTORY_DETAILS_DATA_FE = `${API}${PACKAGES}/history-details`;
export const GET_PACKAGE_HISTORY_IMAGES_DETAILS_DATA_FE = `${API}${PACKAGES}/history-images`;
export const GET_PACKAGE_DETAILS_BY_TOUR_ID_DATA_FE = `${API}${PACKAGES}/package-details-by-tour-id`;
export const GET_PACKAGE_EXTRA_DETAILS_BY_TOUR_ID_DATA_FE = `${API}${PACKAGES}/package-extra-details-by-tour-id`;
export const GET_PACKAGE_SCHEDULES_DETAILS_BY_TOUR_ID_DATA_FE = `${API}${PACKAGES}/package-schedules-by-tour-id`;
export const GET_PACKAGE_DETAILS_FOR_COMPARE_BY_TOUR_ID_DATA_FE = `${API}${PACKAGES}/compare`;
export const GET_PACKAGE_SCHEDULES_DETAILS_BY_PACKAGE_ID_DATA_FE = `${API}${PACKAGES}/schedule-details`;

// Activities
export const GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID_DATA_FE = `${API}${ACTIVITIES}`;
export const GET_ALL_ACTIVITIES_DETAILS_DATA_FE = `${API}${ACTIVITIES}`;
export const GET_ACTIVE_ACTIVITIES_DETAILS_DATA_FE = `${API}${ACTIVITIES}/active-activities`;
export const GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA_FE = `${API}${ACTIVITIES}/activities-for-request`;
export const GET_ALL_ACTIVITY_CATEGORIES_DATA_FE = `${API}${ACTIVITIES}/category`;
export const GET_ACTIVE_ACTIVITY_CATEGORIES_DATA_FE = `${API}${ACTIVITIES}/category-active`;
export const GET_ACTIVITY_REVIEWS_DETAILS_DATA_FE = `${API}${ACTIVITIES}/reviews-details`;
export const GET_ACTIVITY_HISTORY_DETAILS_DATA_FE = `${API}${ACTIVITIES}/history-details`;
export const GET_ACTIVITY_HISTORY_IMAGES_DETAILS_DATA_FE = `${API}${ACTIVITIES}/history-images`;

// Blogs
export const GET_ALL_BLOGS_DETAILS_DATA_FE = `${API}${BLOGS}`;
export const GET_ACTIVE_BLOGS_DETAILS_DATA_FE = `${API}${BLOGS}/active-blogs`;
export const GET_BLOGS_TAG_DETAILS_DATA_FE = `${API}${BLOGS}/blog-tags`;
export const GET_BLOGS_TAG_BY_BLOG_ID_DATA_FE = `${API}${BLOGS}/blog-tags`;
export const GET_BLOGS_DERAILS_BY_WRITER_NAME_DATA_FE = `${API}${BLOGS}/writer`;
export const GET_BLOGS_DERAILS_BY_TAG_NAME_DATA_FE = `${API}${BLOGS}/blog-by-tag-name`;
export const GET_BLOGS_DERAILS_BY_BLOG_ID_DATA_FE = `${API}${BLOGS}/blog-details-by-blog-id`;
export const ADD_BLOG_DATA_FE = `${API}${BLOGS}/add-blog`;
export const ADD_BLOG_BOOKMARK_DATA_FE = `${API}${BLOGS}/add-blog-bookmark`;
export const ADD_BLOG_REACT_DATA_FE = `${API}${BLOGS}/add-react`;
export const ADD_BLOG_COMMENT_REACT_DATA_FE = `${API}${BLOGS}/add-blog-comment-react`;
export const ADD_BLOG_COMMENT_DATA_FE = `${API}${BLOGS}/add-comment-to-blog`;

// Gallery
export const GET_ALL_GALLERY_IMAGES_DATA_FE = `${API}${GALLERY}`;
export const GET_ACTIVE_GALLERY_IMAGES_DATA_FE = `${API}${GALLERY}/active-images`;

// Inquiry
export const ADD_INQUIRY_DATA_FE = `${API}${INQUIRY}/create`;

// Footer
export const GET_ALL_FOOTER_DATA_FE = `${API}${FOOTER}`;
export const GET_ACTIVE_FOOTER_DATA_FE = `${API}${FOOTER}/active`;

// Our Story
export const GET_OUR_STORY_DETAILS_DATA_FE = `${API}${OUR_STORY}/details`;

// Contact Us
export const GET_CONTACT_US_CONTACT_METHODS_DATA_FE = `${API}${CONTACT_US}/contact-methods`;

// Employees
export const GET_EMPLOYEE_DETAILS_BY_TOUR_ID_DATA_FE = `${API}${EMPLOYEES}/employees-details-by-tour-id`;

// FAQ
export const GET_ALL_FAQ_DATA_FE = `${API}${FAQ}`;
export const GET_ACTIVE_FAQ_DATA_FE = `${API}${FAQ}/active`;
export const UPDATE_FAQ_VIEW_COUNT_DATA_FE = `${API}${FAQ}/update-view-count`;
export const GET_FAQ_OPTIONS_DATA_FE =`${API}${FAQ}/options`;
export const ADD_FAQ_REQUEST_DATA_FE = `${API}${FAQ}/insert-faq-request`;


export const GET_TOUR_DETAILS_BY_ID_FE = `${API}${TOUR}/details-by-id`;


export const GET_ALL_PARTNERS = `${API}${PARTNERS}`;

export const GET_ACTIVE_WORK_FLOW_STEPS = `${API}${WORK_FLOW}`;

export const GET_ACTIVE_DESTINATIONS_LOCATIONS_CATEGORIES_FE = `${API}${DESTINATIONS}/locations-categories`;


export const GET_ALL_ACTIVE_REVIEW_FE = `${API}${REVIEW}`;

export const GET_ALL_ACTIVE_USER_LEVEL_FE = `${API}${USER_LEVEL}`;
export const GET_ALL_ACTIVE_USER_LEVEL_WITH_BENEFITS_FE = `${API}${USER_LEVEL}/benefits`;
export const GET_ALL_ACTIVE_USER_BENEFITS_FE = `${API}${USER_BENEFITS}`;
export const GET_ALL_ACTIVE_PROMOTIONS_FE = `${API}${PROMOTIONS}`;
export const GET_ACTIVE_ACTIVITIES_FE = `${API}${ACTIVITIES}`;
export const GET_ACTIVE_ACTIVITIES_CATEGORIES_FE = `${API}${ACTIVITIES}/categories`;
export const GET_PLAN_YOUR_TRIP_ACTIVE_DESTINATIONS_FE = `${API}${PLAN_YOUR_TRIP}`;
export const GET_PLAN_YOUR_TRIP_DESTINATIONS_TOURS_FE = `${API}${PLAN_YOUR_TRIP}/map`;


// Accommodations
export const GET_AVAILABLE_ACCOMMODATION = `${API}${ACCOMMODATION}`;
export const GET_HOTEL_DETAILS_SECTION_FE = `${API}${ACCOMMODATION}/hotels/deatils-for-section`;
export const GET_RESORT_DETAILS_SECTION_FE = `${API}${ACCOMMODATION}/resorts/deatils-for-section`;
export const GET_VILLA_DETAILS_SECTION_FE = `${API}${ACCOMMODATION}/villas/deatils-for-section`;
export const GET_HOSTEL_DETAILS_SECTION_FE = `${API}${ACCOMMODATION}/hostels/deatils-for-section`;
export const GET_RESTAURANT_DETAILS_SECTION_FE = `${API}${ACCOMMODATION}/restaurants/deatils-for-section`;
