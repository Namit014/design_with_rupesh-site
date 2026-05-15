import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const gebuk = localFont({
  src: "../font/gebuk/Gebuk-Regular.ttf",
  variable: "--font-gebuk",
});

export const metadata: Metadata = {
  title: "Brand Apart | Design Partner for Top-Tier Companies",
  description: "We help funded startups ship iconic brands, conversion-ready sites, and investor-proof decks.",
};

import TransitionProvider from "@/components/providers/transition-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${plusJakartaSans.variable} ${gebuk.variable} h-full antialiased`} 
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
