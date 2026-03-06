import HomePage from "@/pages/HomePage";
import { TAB_VIEW_NAME } from "@/utils/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home | ${TAB_VIEW_NAME}`,
};

const page = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
