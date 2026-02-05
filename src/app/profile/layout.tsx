// app/profile/layout.tsx
"use client";

import { useEffect, useState } from 'react';
import Sidebar from "@/components/user-profile-components/Sidebar";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/common-components/loading/Loading";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
      if (!uniqueCode) {
        router.push("/login");
      }
    }
  }, [isClient, router]);

  if (!isClient || authLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100">
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}