import { Metadata } from "next";
import SriLankanTourDetailsPage from "@/pages/details-pages/SriLankanTourDetailsPage";

export const metadata: Metadata = {
  title: "Tour Details",
};

export default function Page() {
  return <SriLankanTourDetailsPage />;
}
