import SectionHeader from "../common-components/section-header/SectionHeader";

export const FaqHeader = () => {
  return (
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle=""
            title="Frequently Asked Questions"
            description="Find answers to common questions about our services and policies"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>
  );
};
