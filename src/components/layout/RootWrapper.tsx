"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/lib/lenis";
import ScrollProgress from "./ScrollProgress";
import AnimatedCursor from "./AnimatedCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import ScrollToTop from "./ScrollToTop";

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <AnimatedCursor />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <ScrollToTop />
      </div>
    </LenisProvider>
  );
}
