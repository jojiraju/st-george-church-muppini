"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { weeklyMassSchedule, confessionSchedule, novenaSchedule, liturgicalSeasons } from "@/data/massTimings";
import GlassCard from "@/components/ui/GlassCard";

export default function MassTimingsPage() {
  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Liturgy & Prayer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Liturgical Schedule
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Section 1: Weekly Holy Qurbana Schedule */}
        <div className="mb-20">
          <h2 className="font-serif text-2xl text-primary-gold font-medium mb-8 tracking-wide border-b border-primary-gold/15 pb-2 text-center max-w-4xl mx-auto">
            Weekly Holy Qurbana (Holy Mass)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {weeklyMassSchedule.map((mass, idx) => (
              <GlassCard
                key={`${mass.day}-${mass.time}`}
                animateReveal={true}
                delay={idx * 0.05}
                hoverEffect={true}
                className="bg-church-card border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-sans text-xs uppercase tracking-widest text-primary-gold font-bold">
                      {mass.day}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {mass.language}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-semibold tracking-wide mb-1">
                    {mass.time}
                  </h3>
                  <p className="font-serif text-sm text-primary-gold-light/90 font-medium">
                    {mass.type}
                  </p>
                </div>
                {mass.notes && (
                  <p className="border-t border-white/5 pt-3 mt-3 text-xs font-sans text-church-muted italic leading-relaxed">
                    {mass.notes}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
