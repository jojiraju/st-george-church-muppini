"use client";

import { motion } from "framer-motion";
import { Compass, Calendar, BookOpen, Scroll } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const timelineEvents = [
  {
    year: "1976",
    title: "The Genesis",
    desc: "A small gather of Syro-Malankara Catholic families in Edakkara, led by pioneering priests, establishes a temporary chapel and holds the first Holy Qurbana in a thatch shed."
  },
  {
    year: "1988",
    title: "Consecration of the First Church",
    desc: "With years of collective hard work and sacrifice, the foundation stone laid earlier reaches fruition. The solemn consecration of the first permanent church building is celebrated by the Bishop."
  },
  {
    year: "2001",
    title: "Catechism Block & Parish Hall",
    desc: "Recognizing the growing community, the parish expands. A dedicated three-story Faith Formation (Catechism) block and a multi-purpose Parish Hall are built for community integration."
  },
  {
    year: "2018",
    title: "Golden Canopy & Altar Restoration",
    desc: "The sacred sanctuary (Madbaha) undergoes major restoration, adding a magnificent hand-carved golden wooden canopy matching the traditional West Syrian aesthetic."
  },
  {
    year: "2026",
    title: "Golden Jubilee Renovations",
    desc: "St. George Parish celebrates 50 years of grace, launching the 'Snehasparsham' community housing project and finishing high-end modern structural renovations to the church campus."
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Page Title */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Saints & History
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            About Our Parish
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Section 1: The Altar & Liturgical Tradition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-2xl md:text-3xl text-primary-gold font-medium mb-6 tracking-wide flex items-center gap-3">
              <Compass className="w-6 h-6 text-primary-gold" />
              Syro-Malankara Liturgical Tradition
            </h2>
            <div className="font-sans text-church-fg text-sm sm:text-base leading-relaxed space-y-6 text-justify opacity-80">
              <p>
                St. George Church Edakkara belongs to the Syro-Malankara Catholic Church, an Eastern Catholic Church in full communion with the Holy See of Rome. Our liturgy is based on the ancient West Syrian Liturgical Tradition (the Rite of Antioch), which traces its origin directly to the early Christian community in Jerusalem.
              </p>
              <p>
                The celebration of the Holy Qurbana (Holy Liturgy) is characterized by rich symbols, poetic chants in Syriac and Malayalam, burning of incense, and deep reverence for the sacred mysteries. In our liturgy, the altar represents both the tomb of Christ and the heavenly throne, guiding the faithful into an atmospheric foretaste of heaven.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <GlassCard hoverEffect={true} glowColor="gold" className="bg-church-card border-white/5 p-8 text-center">
              <Scroll className="w-10 h-10 text-primary-gold mx-auto mb-4 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]" />
              <h3 className="font-serif text-lg text-white mb-2 font-medium">Patron Saint: St. George</h3>
              <p className="font-sans text-xs text-church-muted leading-relaxed">
                St. George (Geevarghese Sahada) is celebrated as a valiant soldier of Christ who stood steadfast against Emperor Diocletian's persecution in 303 AD. The legendary dragon he slew represents the power of evil and paganism defeated by the shield of faith. His powerful intercession is highly sought by our parishioners for healing, protection, and spiritual victory.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Section 2: Historical Timeline */}
        <div className="mb-24">
          <h2 className="font-serif text-2xl md:text-3xl text-primary-gold font-medium mb-12 tracking-wide text-center">
            Our Historical Journey
          </h2>

          <div className="relative border-l border-white/10 ml-4 md:ml-24 pl-8 md:pl-16 space-y-12">
            {timelineEvents.map((evt, idx) => (
              <motion.div
                key={evt.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="relative"
              >
                {/* Year Indicator Node */}
                <div className="absolute -left-[45px] md:-left-[85px] top-2 px-3 py-1 bg-[#080405] border border-primary-gold/40 text-primary-gold font-serif text-xs rounded-full font-bold select-none shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  {evt.year}
                </div>

                <GlassCard className="bg-church-card border-white/5" hoverEffect={true}>
                  <h3 className="font-serif text-lg text-white font-medium mb-2 tracking-wide">
                    {evt.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-church-muted leading-relaxed">
                    {evt.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Parish Leadership */}
        <div className="mt-24">
          <h2 className="font-serif text-2xl md:text-3xl text-primary-gold font-medium mb-12 tracking-wide text-center">
            Present Parish Leadership
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vicar Card */}
            <GlassCard hoverEffect={true} glowColor="gold" className="bg-church-card border-white/5 p-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-gold/35 shadow-xl mb-4 relative group">
                  <img
                    src="/images/fr-thomas-kaloor.jpg"
                    alt="Rev. Fr. Thomas Kaloor"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-maroon/10 mix-blend-color" />
                </div>
                <span className="font-serif text-[10px] uppercase tracking-widest text-primary-gold font-bold block mb-1">
                  Parish Vicar
                </span>
                <h3 className="font-serif text-base text-white font-semibold mb-3">
                  Rev. Fr. Thomas Kaloor
                </h3>
                <p className="font-sans text-xs text-church-muted leading-relaxed text-center">
                  Rev. Fr. Thomas Kaloor serves as the chief spiritual shepherd of St. George Edakkara, administering sacraments, leading community outreach, and counseling the parish family.
                </p>
              </div>
            </GlassCard>

            {/* Trustee Card */}
            <GlassCard hoverEffect={true} className="bg-church-card border-white/5 p-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-xl mb-4 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
                    alt="Mr. Abraham Valel"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-serif text-[10px] uppercase tracking-widest text-primary-gold font-bold block mb-1">
                  Parish Trustee (ട്രസ്റ്റി)
                </span>
                <h3 className="font-serif text-base text-white font-semibold mb-3">
                  Mr. Abraham Valel (എബ്രഹാം വാലേൽ)
                </h3>
                <p className="font-sans text-xs text-church-muted leading-relaxed text-center">
                  Directing the financial administration and parish infrastructure projects with transparent stewardship and collaborative leadership.
                </p>
              </div>
            </GlassCard>

            {/* Secretary Card */}
            <GlassCard hoverEffect={true} className="bg-church-card border-white/5 p-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-xl mb-4 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                    alt="Mr. Josh Mayilil"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-serif text-[10px] uppercase tracking-widest text-primary-gold font-bold block mb-1">
                  Parish Secretary (സെക്രട്ടറി)
                </span>
                <h3 className="font-serif text-base text-white font-semibold mb-3">
                  Mr. Josh Mayilil (ജോഷ് മലയിൽ)
                </h3>
                <p className="font-sans text-xs text-church-muted leading-relaxed text-center">
                  Coordinating parish council assembly records, pastoral initiatives, and facilitating communication across all parish family units (Wards).
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}
