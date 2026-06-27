import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chatbot/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glenloch Realty | Premium Dubai Real Estate Investment Advisory",
  description:
    "Discover exclusive freehold investment opportunities in Dubai's most prestigious locations. Expert guidance from consultation to closing. Tax-free income, high yields, Golden Visa eligibility.",
  keywords: [
    "Dubai real estate",
    "property investment Dubai",
    "freehold property Dubai",
    "Golden Visa Dubai",
    "off-plan Dubai",
    "luxury property Dubai",
    "real estate advisory Dubai",
  ],
  openGraph: {
    title: "Glenloch Realty | Premium Dubai Real Estate Investment Advisory",
    description:
      "Discover exclusive freehold investment opportunities in Dubai's most prestigious locations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
