"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/lib/lenis";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // 1. Reset scroll to top immediately on route changes
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  // 2. Monitor scroll depth to show/hide the scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.08, translateY: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer glass-panel border-primary-gold/20 hover:border-primary-gold bg-church-bg/85 text-primary-gold hover:text-white shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] focus:outline-none transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          {/* Circular Scroll Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90 p-0.5" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-white/[0.04]"
              strokeWidth="4"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-primary-gold"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="276"
              style={{
                pathLength: scrollYProgress,
              }}
            />
          </svg>

          {/* Upward Chevron/Arrow Icon */}
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 relative z-10 filter drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
