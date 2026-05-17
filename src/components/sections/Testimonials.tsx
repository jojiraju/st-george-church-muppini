"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import GlassCard from "../ui/GlassCard";

const testimonials = [
  {
    author: "His Excellency Dr. Joseph Mar Thomas",
    role: "Diocesan Archbishop, Eparchy of Bathery",
    text: "St. George Church Edakkara stands out as a lighthouse of faith and communal harmony in our diocese. The active participation of the laity, combined with their profound liturgical discipline and social mercy, is highly exemplary.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  },
  {
    author: "Mr. Joji Raju Plathottam",
    role: "Parish Trustee & Business Owner",
    text: "For over four generations, St. George Church has been our spiritual home. The peace and strength I receive during the early Sunday morning Holy Qurbana and the Novena of St. George have guided me through every challenge in my life and business.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    author: "Mrs. Jessy Abraham",
    role: "Parish Council Secretary & Teacher",
    text: "Our Catechism school and youth movement are a true testament to the vibrant spiritual legacy of this parish. As parents and educators, we are blessed to have a community that supports raising our children with deep Christian values and faith.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    author: "Mr. Amal Joseph",
    role: "MCYM Youth Unit President",
    text: "Being part of MCYM at St. George Edakkara has transformed my perspective on faith. The parish provides us the platform to serve the poor through direct housing initiatives, blood donation camps, and find a authentic spiritual peer circle.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-[#080405] overflow-hidden border-b border-white/[0.02]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-maroon-dark/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-primary-gold font-bold block mb-3"
          >
            Spiritual Fellowship
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl text-white tracking-wide"
          >
            Voices of the Faithful
          </motion.h2>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Carousel Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full pb-14"
          >
            {testimonials.map((testi) => (
              <SwiperSlide key={testi.author}>
                <GlassCard
                  hoverEffect={false}
                  glowColor="none"
                  className="bg-church-card/60 border-white/5 p-8 md:p-12 text-center flex flex-col items-center justify-center relative"
                >
                  {/* Decorative big quote icon */}
                  <Quote className="w-12 h-12 text-primary-gold/15 mb-6 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.15)]" />

                  <p className="font-serif text-base md:text-xl text-white/95 leading-relaxed tracking-wide italic mb-8 max-w-2xl">
                    "{testi.text}"
                  </p>

                  <div className="w-[60px] h-[1px] bg-primary-gold/20 mb-6" />

                  <h4 className="font-serif text-lg text-primary-gold tracking-wider font-semibold">
                    {testi.author}
                  </h4>
                  <p className="font-sans text-xs uppercase tracking-widest text-church-muted mt-1.5 font-medium">
                    {testi.role}
                  </p>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}
