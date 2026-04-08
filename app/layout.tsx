import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Central Valley Disposal | Roll-Off Dumpster Rentals in Merced County",
  description:
    "Reliable roll-off dumpster rental services in Merced County, CA. Family-owned since 1985. Serving homeowners, contractors & businesses. Call (209) 358-1710.",
  keywords:
    "dumpster rental, roll-off dumpster, Merced County, waste disposal, Central Valley Disposal, Atwater CA, construction debris, demolition cleanup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
