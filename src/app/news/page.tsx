"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { newsEventsData } from "@/data/newsEvents";
import GlassCard from "@/components/ui/GlassCard";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "news" | "event">("all");

  const filteredItems = newsEventsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Parish Diary
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            News & Events
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-[#120a0c]/60 border border-white/5 p-4 rounded-2xl glass-panel">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "all", name: "All Bulletins" },
              { id: "news", name: "Parish News" },
              { id: "event", name: "Upcoming Events" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary-maroon border border-primary-gold/30 text-primary-gold font-semibold shadow-lg"
                    : "text-church-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-xs group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-church-muted group-hover:text-primary-gold transition-colors" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm font-sans text-white focus:outline-none focus:border-primary-gold/60 transition-colors placeholder:text-church-muted"
            />
          </div>
        </div>

        {/* Bulletins Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item, idx) => {
              const dateObj = new Date(item.date);
              const formattedDate = dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              });

              return (
                <GlassCard
                  key={item.id}
                  animateReveal={true}
                  delay={idx * 0.05}
                  hoverEffect={true}
                  glowColor={item.type === "event" ? "gold" : "none"}
                  className="bg-church-card border-white/5 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Date & Type tag */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold-light/65">
                        {formattedDate}
                      </span>
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                        item.type === "event"
                          ? "bg-primary-gold/10 border border-primary-gold/25 text-primary-gold"
                          : "bg-primary-maroon/10 border border-primary-maroon/25 text-red-300"
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl md:text-2xl text-white font-medium tracking-wide mb-3 hover:text-primary-gold transition-colors">
                      <Link href={`/news/${item.id}`}>{item.title}</Link>
                    </h2>

                    <p className="font-sans text-xs md:text-sm text-church-muted leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                    <div className="flex gap-2.5">
                      {item.tags.slice(0, 2).map((t) => (
                        <div key={t} className="flex items-center gap-1 text-[10px] text-white/40 font-sans">
                          <Tag className="w-3 h-3 text-primary-gold/50" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/news/${item.id}`}
                      className="text-primary-gold hover:text-white transition-colors font-serif text-[10px] uppercase tracking-widest flex items-center gap-1 group font-semibold"
                    >
                      Read Bulletin
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel border-white/5 rounded-2xl bg-church-card">
            <p className="font-serif text-lg text-church-muted tracking-wider">
              No bulletins found matching your parameters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
