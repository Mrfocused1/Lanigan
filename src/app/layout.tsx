import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laniganbuilds.co.uk"),
  title: {
    default: "Lanigan Builds — London Builder | Roofing, Kitchens, Renovations",
    template: "%s — Lanigan Builds",
  },
  description:
    "Lanigan Builds is a London builder specialising in roofing, kitchens, bathrooms, carpentry and full renovations. Real projects, real workmanship.",
  keywords: [
    "London builder",
    "roofing London",
    "kitchen fitting",
    "bathroom renovation",
    "carpentry",
    "renovations",
    "Lanigan Builds",
  ],
  openGraph: {
    title: "Lanigan Builds — London Builder",
    description: "Roofing, kitchens, bathrooms, carpentry & full renovations across London.",
    type: "website",
    images: ["/media/profile_pic.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
