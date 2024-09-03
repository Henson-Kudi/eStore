import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/core/pages/landingPage/navbar";
import TextCarousel from "@/core/pages/landingPage/navbar-set-timeout";
import Footers from "@/core/pages/landingPage/footers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E Commerce",
  description: "E commerce web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TextCarousel />
        <Navbar />
        {children}
        {/* <Footers/>  */}
        </body>
    </html>
  );
}
