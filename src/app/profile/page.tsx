"use client";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    
    if (!uniqueCode) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // or null
  }

  return <div>Profile</div>;
};

export default Page;