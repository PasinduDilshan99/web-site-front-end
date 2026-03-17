import type { Metadata } from "next";
import "./global.css";
import "leaflet/dist/leaflet.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
