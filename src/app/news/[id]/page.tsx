"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { newsEventsData } from "@/data/newsEvents";
import GlassCard from "@/components/ui/GlassCard";

export default function BulletinDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const item = newsEventsData.find((bulletin) => bulletin.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#080405] flex flex-col justify-center items-center px-6">
        <h1 className="font-serif text-2xl text-white mb-4">Bulletin Not Found</h1>
        <button
          onClick={() => router.push("/news")}
          className="glass-panel border-primary-gold bg-primary-maroon/20 text-primary-gold px-6 py-2.5 rounded-full font-serif text-xs uppercase tracking-widest"
        >
          Back to Bulletins
        </button>
      </div>
    );
  }

  const dateObj = new Date(item.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back navigation */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-church-muted hover:text-primary-gold transition-colors font-serif text-xs uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Bulletins
        </Link>

        {/* Article Frame */}
        <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-white/5 p-8 md:p-16 rounded-3xl">
          {/* Header Metadata */}
          <div className="flex flex-wrap gap-4 items-center justify-between border-b border-white/5 pb-6 mb-8">
            <span className="font-sans text-xs font-semibold text-primary-gold uppercase tracking-[0.15em]">
              {formattedDate}
            </span>
            <span className={`text-[10px] uppercase tracking-widest font-bold px-3.5 py-1 rounded-full ${
              item.type === "event"
                ? "bg-primary-gold/10 border border-primary-gold/25 text-primary-gold"
                : "bg-primary-maroon/10 border border-primary-maroon/25 text-red-300"
            }`}>
              {item.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-white font-semibold leading-tight mb-8 tracking-wide">
            {item.title}
          </h1>

          {/* Event-specific logistics banner */}
          {item.type === "event" && (item.time || item.location) && (
            <div className="bg-black/35 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row gap-6 mb-8 text-xs font-sans text-white/70">
              {item.time && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-gold" />
                  <div>
                    <span className="block text-[10px] text-church-muted uppercase tracking-wider font-bold">Timings</span>
                    <span className="font-medium mt-0.5 block">{item.time}</span>
                  </div>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-gold" />
                  <div>
                    <span className="block text-[10px] text-church-muted uppercase tracking-wider font-bold">Venue</span>
                    <span className="font-medium mt-0.5 block">{item.location}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Body Content */}
          <div className="font-sans text-church-fg text-sm sm:text-base leading-relaxed space-y-6 text-justify opacity-80 whitespace-pre-line mb-10">
            {item.content}
          </div>

          {/* Footer Metadata & Share */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-wrap gap-2.5">
              {item.tags.map((t) => (
                <div key={t} className="flex items-center gap-1 text-[10px] text-primary-gold-light px-3 py-1 rounded-full bg-primary-gold/5 border border-primary-gold/15 font-sans font-medium">
                  <Tag className="w-3 h-3 text-primary-gold/50" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: item.title,
                    text: item.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="text-church-muted hover:text-primary-gold transition-colors font-serif text-xs uppercase tracking-widest flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              Share Bulletin
            </button>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
