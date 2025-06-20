import type { Metadata } from "next";
import { Space_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight:  ['400', '700'],
  subsets: ["latin"],
});

import Providers from '@/providers/Providers';

export const metadata: Metadata = {
  title: "Nova Bazaar",
  description: "Dive into a next-gen NFT marketplace built with Anima for Figma. Discover, buy, and sell unique creations from over 20,000 visionary NFT artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body
          className={`${workSans.variable} ${spaceMono.variable} antialiased`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
  
  );
}
