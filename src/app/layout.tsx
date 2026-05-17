import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import RootWrapper from "@/components/layout/RootWrapper";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "St. George Malankara Catholic Church | Edakkara, Kerala",
  description: "Welcome to St. George Malankara Catholic Church, Edakkara. A peaceful spiritual sanctuary anchored in West Syrian liturgy of the Eparchy of Bathery. Join us for Holy Qurbana, community events, and charity missions.",
  keywords: [
    "St George Church Edakkara",
    "Malankara Catholic Church Edakkara",
    "Edakkara Perunnal",
    "Syro-Malankara Catholic Church Kerala",
    "Eparchy of Bathery",
    "Holy Qurbana timings Edakkara",
    "Catholic Church Nilambur"
  ],
  authors: [{ name: "St. George Parish Media Wing" }],
  openGraph: {
    title: "St. George Malankara Catholic Church | Edakkara",
    description: "Welcome to our virtual spiritual home. Discover our West Syrian liturgies, upcoming community feasts, and local charitable missions.",
    url: "https://stgeorgechurchedakkara.org",
    siteName: "St. George Malankara Catholic Church Edakkara",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#080405] text-[#fcfaf2] font-sans antialiased overflow-x-hidden">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
