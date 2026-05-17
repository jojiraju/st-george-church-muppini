"use client";

import { useRef } from "react";
import { Users, ShieldAlert, Award, GraduationCap } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const stats = [
  {
    icon: Users,
    endValue: 450,
    suffix: "+",
    label: "Parish Families",
    desc: "Active faithful households"
  },
  {
    icon: Award,
    endValue: 50,
    suffix: "",
    label: "Years of Grace",
    desc: "Established in 1976"
  },
  {
    icon: ShieldAlert,
    endValue: 6,
    suffix: "",
    label: "Parish Ministries",
    desc: "Vibrant lay organizations"
  },
  {
    icon: GraduationCap,
    endValue: 18,
    suffix: "",
    label: "Faith Educators",
    desc: "Dedicated catechists"
  }
];

export default function StatsCounter() {
  return (
    <section className="relative py-20 bg-[#0c0708] overflow-hidden border-y border-white/[0.02]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-maroon-dark/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={stat.label}
                animateReveal={true}
                delay={idx * 0.1}
                hoverEffect={true}
                glowColor={idx === 1 ? "gold" : "none"}
                className="bg-church-card/60 border-white/5 text-center flex flex-col items-center justify-center py-10"
              >
                {/* Floating Icon */}
                <div className="p-3.5 rounded-full bg-primary-maroon/20 border border-primary-maroon/30 text-primary-gold mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Animated counter number */}
                <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 select-none filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
                  <CountUp
                    end={stat.endValue}
                    suffix={stat.suffix}
                    duration={3}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </h3>

                {/* Label */}
                <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-primary-gold font-semibold mb-2">
                  {stat.label}
                </h4>

                {/* Short desc */}
                <p className="font-sans text-[11px] text-church-muted">
                  {stat.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
