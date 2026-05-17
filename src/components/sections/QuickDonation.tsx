"use client";

import Link from "next/link";
import { Heart, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MagneticButton from "../ui/MagneticButton";

export default function QuickDonation() {
  return (
    <section className="relative py-24 bg-[#0c0708] overflow-hidden border-t border-white/[0.02]">
      {/* Background radial glowing gradients */}
      <div className="absolute top-[20%] left-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-[350px] h-[350px] bg-primary-gold-dark/15 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <GlassCard
          animateReveal={true}
          hoverEffect={false}
          glowColor="gold"
          className="bg-[#120a0c]/85 border-primary-gold/25 p-8 md:p-16 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle Decorative Cross Background */}
          <div className="absolute right-0 top-0 bottom-0 opacity-[0.03] w-1/3 flex items-center justify-center pointer-events-none">
            <svg width="250" height="350" viewBox="0 0 100 150" fill="none">
              <path d="M20 50H80V60H20V50Z" fill="#ffffff" />
              <path d="M45 10H55V140H45V10Z" fill="#ffffff" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left side content */}
            <div className="lg:col-span-7">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary-gold font-bold mb-3 block">
                Social Mercy & Mission
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide leading-tight mb-6">
                Support Our Parish Missions & Charity
              </h2>
              <p className="font-sans text-church-muted text-sm sm:text-base leading-relaxed mb-8">
                Your offerings enable St. George Church to sustain our daily liturgical celebrations, organize Sunday Catechism for our youth, support parish infrastructural restoration, and build concrete homes for underprivileged families through the <strong className="text-primary-gold-light">Snehasparsham 2026</strong> project.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 text-xs text-white/60 font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary-gold" />
                  <span>Secure Server Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary-gold" />
                  <span>80G Tax Exemption Eligible (India)</span>
                </div>
              </div>
            </div>

            {/* Right side CTA Button box */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-[280px] text-center bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
                <Heart className="w-8 h-8 text-primary-maroon fill-primary-maroon mx-auto mb-3 animate-pulse" />
                <span className="font-serif text-xs uppercase tracking-widest text-primary-gold font-bold block mb-1">
                  Holy Offering
                </span>
                <span className="font-sans text-[11px] text-church-muted">
                  "Each of you should give what you have decided in your heart."
                </span>
              </div>

              <MagneticButton>
                <Link href="/donations">
                  <button className="glass-panel border-primary-gold bg-primary-maroon/30 hover:bg-primary-maroon/65 text-primary-gold hover:text-white px-10 py-5 rounded-full font-serif text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    Make an Offering Now
                  </button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
