import LoginPage from "@/pages/LoginPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default page;
