"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Heart, Shield, Gift, Music, Calendar, Award } from "lucide-react";
import { ministriesData } from "@/data/ministries";
import GlassCard from "@/components/ui/GlassCard";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen: BookOpen,
  Users: Users,
  Heart: Heart,
  Shield: Shield,
  Gift: Gift,
  Music: Music
};

export default function MinistriesPage() {
  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Spiritual Fellowship & Service
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Parish Organizations
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ministriesData.map((min, idx) => {
            const Icon = iconMap[min.iconName] || Users;
            return (
              <GlassCard
                key={min.id}
                animateReveal={true}
                delay={idx * 0.1}
                hoverEffect={true}
                glowColor={idx % 2 === 0 ? "gold" : "maroon"}
                className="bg-church-card border-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex gap-4 items-center mb-6">
                    <div className="p-3.5 rounded-xl bg-primary-maroon/20 border border-primary-maroon/30 text-primary-gold shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg md:text-xl text-white tracking-wide font-semibold">
                        {min.name}
                      </h2>
                      <span className="font-sans text-[10px] text-primary-gold tracking-wider uppercase font-semibold">
                        {min.membersCount} Active Members
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-church-fg/80 leading-relaxed mb-6">
                    {min.fullDescription}
                  </p>

                  {/* Core Activities */}
                  <div className="mb-6">
                    <span className="font-serif text-xs uppercase tracking-widest text-primary-gold font-bold block mb-3">
                      Key Activities:
                    </span>
                    <ul className="space-y-2">
                      {min.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5 text-xs text-church-muted leading-relaxed font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-gold shrink-0 mt-1.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-white/5 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] font-sans text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary-gold" />
                    <span>{min.president}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary-gold" />
                    <span>{min.meetingTime}</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </div>
  );
}
