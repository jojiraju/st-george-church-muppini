"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Prevent scrolling during load
    document.body.style.overflow = "hidden";

    const duration = 1800; // 1.8 seconds loading simulation
    const interval = 20; // tick every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          setTimeout(() => {
            document.body.style.overflow = "unset";
            onComplete();
          }, 600);
          return 100;
        }
        return Math.floor(next);
      });
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100vh", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#080405] z-[99999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Light ray halos behind the cross */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-primary-maroon/10 filter blur-[80px]" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-primary-gold/5 filter blur-[60px] animate-pulse" />

          {/* Stained glass floating dust particles */}
          <div className="absolute inset-0 opacity-30">
            {isMounted && [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="dust-particle"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${Math.random() * 10 + 6}s`,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center select-none z-10">
            {/* Glowing Golden Cross Symbol */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 relative"
            >
              {/* Outer halo ring */}
              <div className="absolute -inset-6 border border-primary-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-10 border border-dashed border-primary-gold/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

              <svg
                width="80"
                height="120"
                viewBox="0 0 100 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              >
                {/* Horizontal Bar */}
                <path
                  d="M15 50H85V62H15V50Z"
                  fill="url(#goldGrad)"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                />
                {/* Vertical Bar */}
                <path
                  d="M44 10H56V140H44V10Z"
                  fill="url(#goldGrad)"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                />
                {/* Center Cross Glow Point */}
                <circle cx="50" cy="56" r="6" fill="#fff" className="animate-ping" />
                <circle cx="50" cy="56" r="4" fill="#f9e7b9" />

                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f9e7b9" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#aa8524" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Church Name & Location */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center font-serif text-2xl md:text-3xl tracking-[0.2em] text-primary-gold gold-glow font-medium uppercase"
            >
              St. George
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center font-sans text-xs uppercase tracking-[0.3em] text-church-fg mt-2"
            >
              Malankara Catholic Church, Edakkara
            </motion.p>

            {/* Loading Percentage */}
            <div className="mt-12 flex flex-col items-center">
              <span className="font-serif text-lg tracking-widest text-primary-gold-light/80">
                {count}%
              </span>
              {/* Progress Line */}
              <div className="w-[180px] h-[1px] bg-white/10 mt-3 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary-maroon to-primary-gold"
                  style={{ width: `${count}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
