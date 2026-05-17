"use client";

import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import MassSchedule from "@/components/sections/MassSchedule";
import StatsCounter from "@/components/sections/StatsCounter";
import EventTimeline from "@/components/sections/EventTimeline";
import Testimonials from "@/components/sections/Testimonials";
import QuickDonation from "@/components/sections/QuickDonation";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <MassSchedule />
      <StatsCounter />
      <EventTimeline />
      <Testimonials />
      <QuickDonation />
    </>
  );
}
