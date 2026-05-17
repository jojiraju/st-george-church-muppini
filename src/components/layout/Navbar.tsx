"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Mass Timings", href: "/mass-timings" },
  { name: "Ministries", href: "/ministries" },
  { name: "News & Events", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Leadership", href: "/leadership" },
  { name: "Join Us", href: "/register-family" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4",
          scrolled ? "top-2" : "top-0"
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
            scrolled
              ? "glass-panel bg-church-bg/75 border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-transparent"
          )}
        >
          {/* Logo with Cross */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <svg
              width="24"
              height="36"
              viewBox="0 0 100 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300"
            >
              <path d="M25 50H75V60H25V50Z" fill="#d4af37" />
              <path d="M45 15H55V135H45V15Z" fill="#d4af37" />
              <circle cx="50" cy="55" r="4" fill="#ffffff" />
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-sm md:text-base tracking-[0.15em] text-primary-gold font-semibold uppercase group-hover:text-primary-gold-light transition-colors">
                St. George
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50">
                Edakkara
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-sans text-xs tracking-wider uppercase font-medium transition-all duration-300 relative py-1 hover:text-primary-gold",
                    isActive ? "text-primary-gold" : "text-church-fg/80"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveDot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-gold rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile trigger */}
          <div className="flex items-center gap-4">
            <Link href="/donations" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel border-primary-gold/30 hover:border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-5 py-2 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 text-primary-gold" />
                Offering
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-white/5 text-church-fg/80 hover:text-primary-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#080405]/98 backdrop-blur-xl lg:hidden flex flex-col overflow-y-auto"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between p-6 shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 select-none">
                <svg
                  width="20"
                  height="30"
                  viewBox="0 0 100 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                >
                  <path d="M25 50H75V60H25V50Z" fill="#d4af37" />
                  <path d="M45 15H55V135H45V15Z" fill="#d4af37" />
                  <circle cx="50" cy="55" r="4" fill="#ffffff" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-sm tracking-[0.15em] text-primary-gold font-semibold uppercase">
                    St. George
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-white/40">
                    Edakkara
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-church-fg hover:text-primary-gold transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <div className="flex flex-col justify-center items-center flex-grow py-8 md:py-12 gap-5 px-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-serif text-lg sm:text-xl tracking-[0.15em] uppercase transition-all duration-300 block py-0.5 hover:text-primary-gold",
                        isActive ? "text-primary-gold font-semibold" : "text-church-fg/80"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05, ease: "easeOut" }}
                className="mt-4 shrink-0"
              >
                <Link href="/donations" onClick={() => setMobileMenuOpen(false)}>
                  <button className="glass-panel border-primary-gold/40 hover:border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-3 rounded-full font-serif text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 duration-300">
                    <Heart className="w-4 h-4 text-primary-gold" />
                    Make an Offering
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
