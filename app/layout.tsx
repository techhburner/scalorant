import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scalorant | Digital Marketing & Web Development",
    template: "%s | Scalorant",
  },

  description:
    "Scalorant helps businesses grow through digital marketing, web development, catalogue management and brand growth advisory.",

  keywords: [
    "Scalorant",
    "digital marketing agency",
    "digital marketing services",
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "catalogue management",
    "catalogue management services",
    "web development",
    "website development",
    "brand growth advisory",
    "brand growth consulting",
    "digital marketing agency Hyderabad",
    "web development Hyderabad",
  ],

  authors: [
    {
      name: "Scalorant",
    },
  ],

  creator: "Scalorant",
  publisher: "Scalorant",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Scalorant",
    title: "Scalorant | Digital Marketing & Web Development",
    description:
      "Scalorant helps businesses grow through digital marketing, web development, catalogue management and brand growth advisory.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Scalorant | Digital Marketing & Web Development",
    description:
      "Digital marketing, web development, catalogue management and brand growth advisory by Scalorant.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}