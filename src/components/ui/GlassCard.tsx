"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: "gold" | "maroon" | "none";
  className?: string;
  animateReveal?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  hoverEffect = true,
  glowColor = "none",
  className,
  animateReveal = false,
  delay = 0,
  ...props
}: GlassCardProps) {
  const cardContent = (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 md:p-8 transition-all duration-500 overflow-hidden relative group",
        hoverEffect && "hover:bg-white/[0.04] hover:border-primary-gold/30 hover:shadow-[0_12px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Background glow effects */}
      {glowColor === "gold" && (
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary-gold/5 filter blur-[40px] pointer-events-none group-hover:bg-primary-gold/10 transition-colors duration-500" />
      )}
      {glowColor === "maroon" && (
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary-maroon/10 filter blur-[40px] pointer-events-none group-hover:bg-primary-maroon/15 transition-colors duration-500" />
      )}

      {/* Elegant subtle cross outline in corners on hover */}
      {hoverEffect && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
          <svg width="16" height="24" viewBox="0 0 100 150" fill="none">
            <path d="M25 50H75V60H25V50Z" fill="#ffffff" />
            <path d="M45 15H55V135H45V15Z" fill="#ffffff" />
          </svg>
        </div>
      )}

      {children}
    </div>
  );

  if (animateReveal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
