"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Compass, BookOpen } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import MagneticButton from "../ui/MagneticButton";

const values = [
  {
    icon: Compass,
    title: "Sacred Liturgy",
    desc: "Preserving the rich West Syrian liturgy and Eucharistic traditions of the Syro-Malankara Rite."
  },
  {
    icon: Heart,
    title: "Compassionate Charity",
    desc: "Reaching out to the poor and marginalized in Nilambur through shelter, food, and education."
  },
  {
    icon: BookOpen,
    title: "Faith Formation",
    desc: "Forming children and youth in theological wisdom and moral integrity for a brighter tomorrow."
  }
];

export default function Welcome() {
  return (
    <section id="welcome-section" className="relative py-24 bg-[#080405] overflow-hidden">
      {/* Background soft halos */}
      <div className="absolute top-[20%] right-[-100px] w-[350px] h-[350px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-150px] w-[400px] h-[400px] bg-primary-gold-dark/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Vicar Welcome Message */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-primary-gold font-semibold mb-3 block"
            >
              Vicar's Welcome Message
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-3xl md:text-5xl text-white tracking-wide leading-tight mb-8"
            >
              "Peace be to this home, and to all who dwell in it."
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-sans text-church-fg text-sm sm:text-base leading-relaxed space-y-6 mb-8 text-justify"
            >
              <p>
                Dearly beloved in Christ Jesus, it gives me immense joy to welcome you to the virtual sanctuary of St. George Malankara Catholic Church, Edakkara. Since our foundation in 1976, this parish has stood as a beacon of Christian faith, theological heritage, and compassionate charity in the foothills of the Western Ghats.
              </p>
              <p>
                Our community is anchored in the beautiful West Syrian liturgical tradition of the Syro-Malankara Catholic Church. Here, the holy mysteries are celebrated with deep reverence, and the faithful gather as one family in the love of the Holy Spirit. Whether you are a lifelong parishioner, a seeker inquiring about our liturgy, or a visitor requesting prayers, you are a vital part of our sacred fold.
              </p>
              <p>
                Let us join hands under the powerful intercession of our Patron Saint George, the legendary martyr, to defeat the darkness of our times with the light of faith, hope, and charity.
              </p>
            </motion.div>

            {/* Real Church Facade Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="relative w-full h-[240px] rounded-2xl overflow-hidden glass-panel border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] mb-8 group"
            >
              <img
                src="/images/church-day.jpg"
                alt="St. George Malankara Catholic Church Edakkara Facade"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080405] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-primary-maroon/5 pointer-events-none mix-blend-color" />
              <div className="absolute inset-x-0 bottom-0 p-5 flex justify-between items-end">
                <div>
                  <span className="font-serif text-xs text-primary-gold tracking-[0.2em] uppercase font-bold block">
                    Parish Facade
                  </span>
                  <span className="font-sans text-[10px] text-white/50 tracking-wider block mt-0.5">
                    Gothic Architecture & Traditional Rites
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Clergy Signature & Brief */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-5 border-l-2 border-primary-gold pl-6 py-2 mb-10"
            >
              <div>
                <h4 className="font-serif text-lg text-primary-gold-light tracking-wider font-semibold">
                  Rev. Fr. Thomas Kaloor
                </h4>
                <p className="font-sans text-xs uppercase tracking-widest text-church-muted mt-1">
                  Parish Vicar, St. George Edakkara
                </p>
              </div>
            </motion.div>

            {/* Read History Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton>
                <Link href="/about">
                  <button className="glass-panel border-primary-gold/30 hover:border-primary-gold bg-transparent text-primary-gold hover:text-white px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300">
                    Discover Our History
                  </button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Values Cards Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-xs uppercase tracking-[0.3em] text-church-muted mb-2 block font-medium"
            >
              Our Sacred Foundations
            </motion.span>

            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <GlassCard
                  key={val.title}
                  animateReveal={true}
                  delay={idx * 0.15}
                  glowColor={idx === 0 ? "gold" : idx === 1 ? "maroon" : "none"}
                  className="bg-church-card border-white/5"
                >
                  <div className="flex gap-5 items-start">
                    <div className="p-3.5 rounded-xl bg-primary-maroon/20 border border-primary-maroon/30 text-primary-gold shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-white tracking-wider mb-2 font-medium">
                        {val.title}
                      </h3>
                      <p className="font-sans text-xs text-church-muted leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
