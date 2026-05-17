"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Shield, ShieldAlert, Award } from "lucide-react";
import { clergyProfiles, councilMembers } from "@/data/leaders";
import GlassCard from "@/components/ui/GlassCard";

export default function LeadershipPage() {
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
            Spiritual Shepherds & Laity
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Priests & Leadership
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Section 1: Sacred Clergy / Clergy Profiles */}
        <div className="mb-24">
          <h2 className="font-serif text-2xl text-primary-gold font-medium mb-12 tracking-wide text-center">
            Our Spiritual Shepherds
          </h2>

          <div className="space-y-12">
            {clergyProfiles.map((clergy, idx) => (
              <GlassCard
                key={clergy.id}
                animateReveal={true}
                delay={idx * 0.1}
                hoverEffect={true}
                glowColor={clergy.role === "Parish Vicar" ? "gold" : "none"}
                className="bg-church-card border-white/5 p-8 md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Photo Column */}
                  <div className="lg:col-span-3 flex justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-primary-gold/35 shadow-2xl relative group">
                      <img
                        src={clergy.image}
                        alt={clergy.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary-maroon/10 mix-blend-color" />
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="lg:col-span-9">
                    <span className="font-serif text-xs uppercase tracking-widest text-primary-gold font-bold mb-2 block">
                      {clergy.designation}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider font-semibold mb-1">
                      {clergy.name}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-church-muted mb-4 font-semibold">
                      {clergy.role}
                    </p>
                    
                    <p className="font-sans text-sm text-church-fg/80 leading-relaxed mb-6">
                      {clergy.description}
                    </p>

                    {/* Contact details */}
                    {(clergy.contact || clergy.email) && (
                      <div className="flex flex-wrap gap-6 text-xs font-sans text-white/60">
                        {clergy.contact && (
                          <a href={`tel:${clergy.contact}`} className="flex items-center gap-2 hover:text-primary-gold transition-colors">
                            <Phone className="w-4 h-4 text-primary-gold" />
                            <span>{clergy.contact}</span>
                          </a>
                        )}
                        {clergy.email && (
                          <a href={`mailto:${clergy.email}`} className="flex items-center gap-2 hover:text-primary-gold transition-colors">
                            <Mail className="w-4 h-4 text-primary-gold" />
                            <span>{clergy.email}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Section 2: Parish Trustees & Council */}
        <div>
          <h2 className="font-serif text-2xl text-primary-gold font-medium mb-12 tracking-wide text-center">
            Parish Council & Trustees (2026-28)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {councilMembers.map((member, idx) => (
              <GlassCard
                key={member.id}
                animateReveal={true}
                delay={idx * 0.05}
                hoverEffect={true}
                className="bg-church-card border-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar or Icon placeholder */}
                  <div className="flex gap-4 items-center mb-6">
                    {member.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-primary-gold/30 shadow-md shrink-0 relative">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary-maroon/5 mix-blend-color" />
                      </div>
                    ) : (
                      <div className="p-3 rounded-full bg-primary-maroon/20 border border-primary-maroon/30 text-primary-gold shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif text-base text-white tracking-wider font-semibold">
                        {member.name}
                      </h3>
                      <span className="font-sans text-[10px] text-primary-gold uppercase tracking-widest font-bold">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-church-muted leading-relaxed mb-4">
                    Representing the parish faithful with dedication, serving as administrative pillars.
                  </p>
                </div>

                {/* Ward & Phone details */}
                <div className="border-t border-white/5 pt-4 mt-4 flex flex-col gap-2 text-[10px] font-sans text-white/50">
                  <span className="font-medium block text-primary-gold-light/80">Ward: {member.ward}</span>
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="hover:text-primary-gold transition-colors">
                      Phone: {member.phone}
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
