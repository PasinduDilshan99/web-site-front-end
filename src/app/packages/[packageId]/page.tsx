import PackageDetailsPage from "@/pages/details-pages/PackageDetailsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Package Details",
};

export default function Page() {
  return <PackageDetailsPage />;
}
