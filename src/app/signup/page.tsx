import React from "react";
import { Metadata } from "next";
import SignupPage from "@/pages/SignupPage";

export const metadata: Metadata = {
  title: "Signup",
};
const page = () => {
  return <div><SignupPage/></div>;
};

export default page;
