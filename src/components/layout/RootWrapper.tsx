"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/lib/lenis";
import ScrollProgress from "./ScrollProgress";
import AnimatedCursor from "./AnimatedCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LenisProvider>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen flex flex-col">
          <ScrollProgress />
          <AnimatedCursor />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </div>
      )}
    </LenisProvider>
  );
}
