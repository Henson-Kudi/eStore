import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/core/pages/landing-page/navbar";
import Footers from "@/core/components/organisms/footers";
import QueryProvider from "@/core/providers/queryProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthSessionProvider from "@/core/providers/authProvider";
import { CartProvider } from "@/core/providers/cartProvider";
import NextTopLoader from 'nextjs-toploader';
import { CheckoutProvider } from "@/core/providers/checkoutProviver";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E Commerce",
  description: "E commerce web site",
};

export default function RootLayout({
  children,
  searchParams
}: Readonly<{
  children: React.ReactNode;
  searchParams: Record<string, string | string[] | undefined>;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <QueryProvider>
          <AuthSessionProvider session={null}>
            <CartProvider>
              <CheckoutProvider>
                <ScrollArea className="h-full max-h-screen overflow-auto w-full max-w-[100vw] rounded-md border relative flex flex-col m-0 p-0 z-50">
                  <Navbar />
                  {children}
                  <Footers />
                </ScrollArea>
              </CheckoutProvider>
              
            </CartProvider>
          </AuthSessionProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
