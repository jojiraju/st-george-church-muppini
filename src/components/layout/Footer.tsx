"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0d0708] border-t border-primary-gold/15 overflow-hidden pt-20 pb-8 z-10">
      {/* Sacred Halo Glow behind */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-maroon/20 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Decorative Traditional Cross Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <svg width="400" height="600" viewBox="0 0 100 150" fill="none">
          <path d="M20 50H80V60H20V50Z" fill="#ffffff" />
          <path d="M45 10H55V140H45V10Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Church Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg width="20" height="30" viewBox="0 0 100 150" fill="none">
                <path d="M25 50H75V60H25V50Z" fill="#d4af37" />
                <path d="M45 15H55V135H45V15Z" fill="#d4af37" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-[0.1em] text-primary-gold font-medium uppercase">
                  St. George Church
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Edakkara
                </span>
              </div>
            </div>
            <p className="text-church-muted text-sm font-sans leading-relaxed mb-6">
              A vibrant parish community of the Syro-Malankara Catholic Eparchy of Bathery. Anchored in West Syrian liturgical tradition and dedicated to spiritual transformation, fellowship, and charity.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-church-fg hover:text-primary-gold border-white/10 hover:border-primary-gold/50 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-church-fg hover:text-primary-gold border-white/10 hover:border-primary-gold/50 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-primary-gold mb-6 border-b border-primary-gold/15 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Parish", href: "/about" },
                { name: "Liturgy Schedule", href: "/mass-timings" },
                { name: "Ministries & Org", href: "/ministries" },
                { name: "Events & News", href: "/news" },
                { name: "Priests & Council", href: "/leadership" },
                { name: "Photo Gallery", href: "/gallery" },
                { name: "Family Registration", href: "/register-family" },
                { name: "Admin Directory", href: "/admin/registrations" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-church-muted hover:text-primary-gold text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-gold/40 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mass Summary */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-primary-gold mb-6 border-b border-primary-gold/15 pb-2">
              Mass Highlight
            </h4>
            <div className="space-y-4">
              <div className="glass-panel border-white/5 p-3 rounded-lg bg-white/[0.01]">
                <span className="text-[10px] uppercase text-primary-gold tracking-widest block font-medium mb-1">
                  Sunday Holy Qurbana
                </span>
                <span className="text-white text-sm block">07:00 AM</span>
                <span className="text-church-muted text-xs">Morning Prayers & Holy Qurbana</span>
              </div>
              <div className="glass-panel border-white/5 p-3 rounded-lg bg-white/[0.01]">
                <span className="text-[10px] uppercase text-primary-gold tracking-widest block font-medium mb-1">
                  Weekday Holy Qurbana
                </span>
                <span className="text-white text-sm block">Mon - Sat 07:00 AM</span>
                <span className="text-church-muted text-xs">Daily Holy Mass</span>
              </div>
            </div>
          </div>

          {/* Map & Location info */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-primary-gold mb-6 border-b border-primary-gold/15 pb-2">
              Contact & Location
            </h4>
            <ul className="space-y-4 text-sm text-church-muted font-sans">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                <span>
                  Kozhikkode Road, Edakkara P.O.<br />
                  Nilambur, Malappuram,<br />
                  Kerala, PIN 679331
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-gold shrink-0" />
                <span>+91 4931 270123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-gold shrink-0" />
                <span>info@stgeorgechurchedakkara.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Embedding Panel */}
        <div className="w-full h-[220px] rounded-xl overflow-hidden glass-panel border-white/10 mb-12 relative group shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.6841261314986!2d76.30509618037305!3d11.32486745137599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63fbaf66a7b73%3A0xe54d32a4e94119d6!2sSt.%20George%20Malankara%20Catholic%20Church%20Edakkara!5e0!3m2!1sen!2sin!4v1715830000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(120%) opacity(0.75)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Google Maps Location"
          />
          {/* Overlay to coordinate colors */}
          <div className="absolute inset-0 bg-primary-maroon/5 pointer-events-none mix-blend-color" />
        </div>

        {/* Copyright and back to top */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-church-muted text-xs text-center md:text-left font-sans">
            &copy; {new Date().getFullYear()} St. George Malankara Catholic Church, Edakkara. All Rights Reserved. <br className="md:hidden" />
            Designed in faith.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/donations"
              className="text-primary-gold hover:text-white transition-colors text-xs font-serif uppercase tracking-widest flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-primary-maroon animate-pulse fill-primary-maroon" />
              Sustaining Our Missions
            </Link>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-church-fg hover:text-primary-gold border-white/10 hover:border-primary-gold/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
