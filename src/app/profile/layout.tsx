// app/profile/layout.tsx
"use client";
import NavBar from "@/components/common-components/navBar/NavBar";
import Sidebar from "@/components/user-profile-components/Sidebar";
import Footer from "../components/footer/Footer";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/common-components/loading/Loading";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
    const { user, loading: authLoading } = useAuth();
  

  const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);

  if (!uniqueCode) {
    router.push("/login");
    
  }

  if (authLoading) return <Loading />;
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-purple-100">
        <div className="flex relative">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
