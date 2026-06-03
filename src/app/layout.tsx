import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Woodart | Custom Carpentry & Wood Design",
  description: "Handcrafted kitchens, wardrobes, and bespoke interiors in Karachi. Premium furniture and high-quality woodwork made to last generations.",
  keywords: [
    "Ahmed Wood Art",
    "Bespoke Furniture",
    "Handcrafted Kitchens",
    "Wardrobes",
    "Dressing Tables",
    "Interior Paneling",
    "Karachi Furniture",
    "Premium Woodwork"
  ],
  authors: [{ name: "Ahmed Wood Art" }],
  openGraph: {
    title: "Ahmed Wood Art – Rooted in Quality. Built for Life.",
    description: "Handcrafted kitchens, wardrobes, and bespoke interiors in Karachi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
