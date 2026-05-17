"use client";

import Link from "next/link";
import { Clock, BookOpen, Compass, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { weeklyMassSchedule, liturgicalSeasons } from "@/data/massTimings";
import GlassCard from "../ui/GlassCard";
import MagneticButton from "../ui/MagneticButton";

export default function MassSchedule() {
  // Take first 3 mass timings to display as a preview
  const primaryMasses = weeklyMassSchedule.slice(0, 3);

  return (
    <section className="relative py-24 bg-[#0c0708] overflow-hidden border-t border-white/[0.03]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary-maroon-dark/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Active Liturgical Season Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-2xl glass-panel border-primary-gold/20 p-5 bg-gradient-to-r from-primary-maroon/20 via-transparent to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
        >
          <div className="flex gap-4 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-gold"></span>
            </span>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary-gold block">
                Liturgical Calendar Status
              </span>
              <h4 className="font-serif text-base text-white tracking-wider font-semibold mt-0.5">
                {liturgicalSeasons.currentSeason}
              </h4>
            </div>
          </div>
          <div className="font-sans text-xs text-church-muted md:text-right">
            <span className="block text-white/50">Liturgy Tradition</span>
            <span className="font-medium text-primary-gold-light mt-0.5 block">{liturgicalSeasons.liturgicalRite}</span>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-primary-gold font-bold block mb-3"
          >
            Sacred Liturgical Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl text-white tracking-wide"
          >
            Holy Qurbana Timings
          </motion.h2>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Mass timing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-16">
          {primaryMasses.map((mass, idx) => (
            <GlassCard
              key={`${mass.day}-${mass.time}`}
              animateReveal={true}
              delay={idx * 0.15}
              glowColor={idx === 0 ? "gold" : "none"}
              className="bg-church-card border-white/5 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary-gold/10 border border-primary-gold/20 text-primary-gold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-primary-gold px-3 py-1 rounded-full bg-primary-gold/5 border border-primary-gold/10">
                    {mass.language}
                  </span>
                </div>

                <span className="font-sans text-xs uppercase tracking-widest text-church-muted font-semibold block mb-2">
                  {mass.day}
                </span>

                <h3 className="font-serif text-2xl text-white font-medium tracking-wide mb-3">
                  {mass.time}
                </h3>

                <p className="font-serif text-sm text-primary-gold-light/90 font-medium mb-4 leading-snug">
                  {mass.type}
                </p>
              </div>

              {mass.notes && (
                <div className="border-t border-white/5 pt-4 mt-4 text-xs font-sans text-church-muted leading-relaxed italic">
                  {mass.notes}
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Action Button to schedule details */}
        <div className="text-center">
          <MagneticButton>
            <Link href="/mass-timings">
              <button className="glass-panel border-primary-gold/30 hover:border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-4 rounded-full font-serif text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-2xl flex items-center gap-2 group mx-auto">
                View Full Liturgy & Novena Schedule
                <ChevronRight className="w-4 h-4 text-primary-gold group-hover:translate-x-1 group-hover:text-white transition-all" />
              </button>
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
