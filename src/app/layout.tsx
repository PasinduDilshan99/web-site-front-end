import type { Metadata } from "next";
import "./global.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "@/context/AuthContext";
import DecemberSnowfall from "@/components/DecemberSnowfall";
import GlobalGradientScrollbar from "@/components/GlobalGradientScrollbar";
import ChatBot from "@/components/ChatBot";
import NavBar from "@/components/common-components/navBar/NavBar";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Footer from "../components/common-components/footer/Footer";
import { CommonProvider } from "@/context/CommonContext";

export const metadata: Metadata = {
  title: {
    default: "Felicita Trips",
    template: "%s | Felicita Trips",
  },
  description: "Travel Agency in sri lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CommonProvider>
            {/* <DecemberSnowfall /> */}
            {/* <GlobalGradientScrollbar /> */}
            {/* <LinkBar /> */}
            <NavBar />
            <main>{children}</main>
            <Footer />
            {/* <ChatBot /> */}
          </CommonProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
