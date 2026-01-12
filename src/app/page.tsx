"use client";

import { useState, useCallback } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import SaaSVentures from "@/components/SaaSVentures";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen progress={loadProgress} isLoading={isLoading} />

      {/* Navbar - Only show after loading */}
      {!isLoading && <Navbar />}

      <main className="bg-[#121212]">
        {/* Hero Section with Scroll Animation */}
        <section className="relative">
          <ScrollyCanvas
            onLoadProgress={handleLoadProgress}
            onLoadComplete={handleLoadComplete}
          />
          <Overlay />
        </section>

        {/* SaaS Ventures / Products Section */}
        <SaaSVentures />

        {/* Professional Experience Section */}
        <ExperienceSection />

        {/* Contact Section (includes footer with GitHub links) */}
        <ContactSection />
      </main>
    </>
  );
}
