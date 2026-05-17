"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { newsEventsData } from "@/data/newsEvents";
import GlassCard from "../ui/GlassCard";
import MagneticButton from "../ui/MagneticButton";

export default function EventTimeline() {
  // Extract upcoming events
  const events = newsEventsData.filter((item) => item.type === "event").slice(0, 3);

  return (
    <section className="relative py-24 bg-[#080405] overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[-150px] w-[400px] h-[400px] bg-primary-maroon-dark/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              className="font-sans text-xs uppercase tracking-[0.3em] text-primary-gold font-bold block mb-3"
            >
              Parish Calendar
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-3xl md:text-5xl text-white tracking-wide font-medium"
            >
              Upcoming Events
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link href="/news" className="text-primary-gold hover:text-white transition-colors font-serif text-xs uppercase tracking-widest flex items-center gap-2 group">
              View All News & Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
          {events.map((event, idx) => {
            // Format Event Date nicely
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[45px] md:-left-[61px] top-2 w-8 h-8 rounded-full bg-[#080405] border border-primary-gold/40 flex items-center justify-center group-hover:border-primary-gold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-gold" />
                </div>

                <GlassCard
                  className="bg-church-card border-white/5 hover:border-primary-gold/20"
                  hoverEffect={true}
                  glowColor="none"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Event Date badge */}
                    <div className="lg:col-span-2 flex lg:flex-col items-center lg:justify-center bg-primary-maroon/10 border border-primary-maroon/25 px-4 py-3 rounded-xl shrink-0 text-center select-none w-fit lg:w-full">
                      <span className="font-serif text-3xl font-bold text-primary-gold gold-glow block">
                        {day}
                      </span>
                      <span className="font-sans text-xs uppercase tracking-widest text-white/60 ml-2 lg:ml-0 lg:mt-1 font-semibold">
                        {month}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="lg:col-span-8">
                      <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide mb-3 group-hover:text-primary-gold transition-colors">
                        {event.title}
                      </h3>
                      <p className="font-sans text-sm text-church-muted leading-relaxed mb-4">
                        {event.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs font-sans text-white/50">
                        {event.time && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary-gold" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary-gold" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="lg:col-span-2 lg:h-full lg:flex lg:items-center lg:justify-end">
                      <MagneticButton>
                        <Link href={`/news/${event.id}`}>
                          <button className="glass-panel border-white/10 hover:border-primary-gold bg-white/[0.01] hover:bg-primary-gold/10 text-white/80 hover:text-primary-gold px-5 py-2.5 rounded-full font-serif text-[10px] uppercase tracking-widest transition-all duration-300">
                            Details
                          </button>
                        </Link>
                      </MagneticButton>
                    </div>

                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
