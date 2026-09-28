import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gebuk = localFont({
  src: "../font/gebuk/Gebuk-Regular.ttf",
  variable: "--font-gebuk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Rebirth Company | Web Dev Partner for Top-Tier Companies",
  description: "We help funded startups ship iconic apps, conversion-ready sites, and scalable web platforms.",
};

import Preloader from "@/components/Preloader";
import { ReactLenis } from "lenis/react";
import NavigationMenu from "@/components/ui/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${gebuk.variable} h-full antialiased`} 
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ReactLenis root>
          <Preloader />
          <main className="main-content">
            {children}
          </main>
          <NavigationMenu />
        </ReactLenis>
      </body>
    </html>
  );
}

