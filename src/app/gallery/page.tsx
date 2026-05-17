"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const galleryImages = [
  {
    id: 1,
    title: "Vesper Prayers & Shrine at Dusk",
    category: "Feast",
    url: "/images/church-dusk.png",
    desc: "The beautiful St. George shrine standing illuminated against a gorgeous Kerala dusk sky, signaling the start of the evening liturgical prayers."
  },
  {
    id: 2,
    title: "Solemn Candle Offering & Adoration",
    category: "Mass",
    url: "/images/church-shrine-night.png",
    desc: "A parishioner lighting candles at the St. George shrine during the weekly Saturday Novena, seeking the powerful intercession of our Patron Martyr."
  },
  {
    id: 3,
    title: "Traditional Feast Procession Setup",
    category: "Feast",
    url: "/images/church-day.jpg",
    desc: "The white Gothic facade of St. George Church Edakkara decorated with festive colorful ribbons during the annual patron feast (Perunnal)."
  },
  {
    id: 4,
    title: "Pontifical Liturgy Blessing",
    category: "Feast",
    url: "/images/church-clergy.jpg",
    desc: "His Beatitude Moran Mor Baselios Cardinal Cleemis addressing the thousands of faithful pilgrims gathered on the church shrine platform during the Feast."
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(
    (img) => activeFilter === "All" || img.category === activeFilter
  );

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === filteredImages.length - 1 ? 0 : prev! + 1));
  };

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
            Visual Memories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Parish Photo Gallery
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16 max-w-xl mx-auto bg-[#120a0c]/60 border border-white/5 p-3 rounded-2xl glass-panel">
          {[
            { id: "All", name: "All Photos" },
            { id: "Feast", name: "Feast of St. George" },
            { id: "Mass", name: "Holy Liturgies" }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4.5 py-2.5 rounded-full font-serif text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-primary-maroon border border-primary-gold/30 text-primary-gold font-semibold shadow-lg"
                  : "text-church-muted hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Masonry-style/Flexible Responsive Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative h-[280px] rounded-2xl overflow-hidden glass-panel border-white/15 cursor-pointer shadow-xl"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Glassy Reveal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ZoomIn className="w-5 h-5 text-primary-gold mb-2.5" />
                    <h3 className="font-serif text-sm text-white tracking-wider font-semibold mb-1">
                      {img.title}
                    </h3>
                    <span className="font-sans text-[10px] text-primary-gold uppercase tracking-widest font-bold">
                      {img.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Slider popup */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-[#050203]/98 backdrop-blur-2xl flex flex-col justify-center items-center px-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/70 hover:text-primary-gold transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Slider Image Frame */}
              <div className="relative max-w-4xl w-full h-[65vh] flex items-center justify-center select-none">
                {/* Navigation Left */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 sm:-left-16 p-3 rounded-full hover:bg-white/5 text-white/50 hover:text-primary-gold transition-colors z-10"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Main Image */}
                <motion.img
                  key={filteredImages[lightboxIndex].id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                />

                {/* Navigation Right */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 sm:-right-16 p-3 rounded-full hover:bg-white/5 text-white/50 hover:text-primary-gold transition-colors z-10"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Lightbox Metadata Description block */}
              <div className="text-center mt-6 max-w-xl select-none">
                <span className="font-sans text-[10px] text-primary-gold uppercase tracking-widest font-bold block mb-1">
                  {filteredImages[lightboxIndex].category}
                </span>
                <h2 className="font-serif text-lg text-white font-semibold tracking-wide">
                  {filteredImages[lightboxIndex].title}
                </h2>
                <p className="font-sans text-xs text-church-muted mt-2 leading-relaxed">
                  {filteredImages[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
