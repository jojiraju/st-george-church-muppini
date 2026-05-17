"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, Heart } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import TextType from "../ui/TextType";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger smooth scroll down
  const handleScrollDown = () => {
    const nextSection = document.getElementById("welcome-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050203] pt-20"
    >
      {/* 1. Cinematic Background Image Overlay & Radial Halo Glows */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-[1.05]"
        style={{
          backgroundImage: `url('/images/church-dusk.png')`,
        }}
      />
      {/* Mesh Gradients to create church spiritual lighting (sunbeams through stained glass) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080405] via-[#080405]/90 to-transparent z-10" />
      <div className="absolute top-[20%] left-1/4 w-[350px] h-[350px] bg-primary-maroon-dark/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-1/4 w-[300px] h-[300px] bg-primary-gold-dark/10 rounded-full filter blur-[85px] pointer-events-none" />

      {/* 2. Floating Dust Particles (Simulating light beams) */}
      <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
        {isMounted && [...Array(18)].map((_, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              width: `${Math.random() * 5 + 1.5}px`,
              height: `${Math.random() * 5 + 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 14 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Main Text Content & Sacred Cross */}
      <div className="max-w-5xl mx-auto px-6 text-center z-20 flex flex-col items-center">
        {/* Pulsing Sacred Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 relative"
        >
          {/* Subtle slow rotating ring */}
          <div className="absolute -inset-4 border border-primary-gold/10 rounded-full animate-[spin_30s_linear_infinite]" />
          <svg
            width="55"
            height="85"
            viewBox="0 0 100 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_0_12px_rgba(212,175,55,0.55)] cursor-pointer"
          >
            <path
              d="M20 50H80V60H20V50Z"
              fill="url(#heroGoldGrad)"
              stroke="#d4af37"
              strokeWidth="1.5"
            />
            <path
              d="M45 12H55V138H45V12Z"
              fill="url(#heroGoldGrad)"
              stroke="#d4af37"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="55" r="5" fill="#ffffff" className="animate-pulse" />

            <defs>
              <linearGradient id="heroGoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f9e7b9" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa8524" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Small Liturgical Header */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-sans text-xs md:text-sm uppercase tracking-[0.35em] text-primary-gold-light mb-4 font-semibold block"
        >
          Syro-Malankara Catholic Eparchy of Bathery
        </motion.span>

        {/* Main Header Reveal */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] leading-[1.15] mb-6">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            ST. GEORGE CHURCH
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block gold-text-gradient font-medium text-3xl sm:text-5xl md:text-6xl mt-1 tracking-[0.1em]"
          >
            <TextType
              text={["EDAKKARA", "HOUSE OF PRAYER", "BEACON OF FAITH", "COMMUNITY OF LOVE"]}
              as="span"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
              showCursor={true}
              cursorCharacter="|"
            />
          </motion.span>
        </h1>

        {/* Brief Spiritual Verse or Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="max-w-2xl text-church-fg text-sm sm:text-base font-sans tracking-wide leading-relaxed mb-12"
        >
          "Fear not, O martyr of Christ, George, for you have fought the good fight, completed the race, and preserved the faith. Guide our steps in righteousness and peace."
        </motion.p>

        {/* Cinematic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <MagneticButton>
            <Link href="/mass-timings">
              <button className="glass-panel border-primary-gold/40 bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-4 rounded-full font-serif text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 shadow-2xl flex items-center gap-2 group">
                <Calendar className="w-4 h-4 text-primary-gold group-hover:text-white transition-colors" />
                Liturgy Schedule
              </button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link href="/donations">
              <button className="glass-panel border-white/10 hover:border-primary-gold/40 bg-white/[0.02] hover:bg-white/[0.06] text-white/90 hover:text-primary-gold px-8 py-4 rounded-full font-serif text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary-maroon fill-primary-maroon" />
                Make an Offering
              </button>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* 4. Elegant Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 select-none"
        >
          Scroll to Enter
        </motion.span>
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
          }}
          className="p-2 rounded-full glass-panel border-white/10 text-white/70 hover:text-primary-gold hover:border-primary-gold/40 transition-colors"
          aria-label="Scroll to welcome section"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
