// app/profile/layout.tsx
"use client";
import NavBar from "@/components/common-components/navBar/NavBar";
import Sidebar from "@/components/user-profile-components/Sidebar";
import Footer from "../components/footer/Footer";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-amber-25 via-white to-purple-25">
        {/* Your existing Navbar would go here */}

        <div className="flex relative">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>

        {/* Your existing Footer would go here */}
      </div>
      <Footer />
    </>
  );
}
