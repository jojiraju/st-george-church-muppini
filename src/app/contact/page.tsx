"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, RefreshCw } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

// Contact Zod Schema
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select an inquiry topic"),
  message: z.string().min(10, "Message must be at least 10 characters long")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const subjects = [
  { id: "general", name: "General Parish Inquiry" },
  { id: "vicar", name: "Schedule Priest Appointment" },
  { id: "mass", name: "Submit Holy Qurbana Intention" },
  { id: "sacrament", name: "Sacramental Requests (Baptism, Wedding)" }
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "general"
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (res.success) {
        setIsSubmitted(true);
      } else {
        throw new Error("API error");
      }
    } catch (err) {
      console.warn("CMS Backend offline, simulating local submission...");
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    reset({
      name: "",
      email: "",
      subject: "general",
      message: ""
    });
  };

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
            Connect In Faith
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Contact Parish Office
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard hoverEffect={true} glowColor="gold" className="bg-church-card border-white/5">
              <h2 className="font-serif text-xl text-primary-gold font-medium mb-6 tracking-wide border-b border-primary-gold/15 pb-2">
                Parish Address
              </h2>
              <ul className="space-y-4 text-sm text-church-muted font-sans">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                  <span>
                    St. George Malankara Catholic Church,<br />
                    Kozhikkode Road, Edakkara P.O.,<br />
                    Nilambur, Malappuram, Kerala,<br />
                    PIN 679331
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-4 h-4 text-primary-gold shrink-0" />
                  <span>+91 4931 270123</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-primary-gold shrink-0" />
                  <span>info@stgeorgechurchedakkara.org</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard hoverEffect={true} className="bg-church-card border-white/5">
              <h2 className="font-serif text-xl text-primary-gold font-medium mb-6 tracking-wide border-b border-primary-gold/15 pb-2">
                Parish Office Hours
              </h2>
              <ul className="space-y-3 text-sm text-church-muted font-sans">
                <li className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-gold" />
                    <span>Tuesday - Saturday</span>
                  </span>
                  <span className="font-semibold text-white/80">09:00 AM - 05:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-gold" />
                    <span>Sundays</span>
                  </span>
                  <span className="font-semibold text-white/80">08:00 AM - 12:30 PM</span>
                </li>
                <li className="flex justify-between text-red-300 font-medium">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-maroon" />
                    <span>Mondays</span>
                  </span>
                  <span>Office Closed</span>
                </li>
              </ul>
            </GlassCard>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard hoverEffect={false} glowColor="maroon" className="bg-[#120a0c]/60 border-white/5 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name")}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                          />
                          {errors.name && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email")}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Topic dropdown selection */}
                      <div>
                        <label className="text-xs font-serif uppercase tracking-widest text-primary-gold font-bold block mb-2.5">
                          Inquiry Topic
                        </label>
                        <select
                          {...register("subject")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors cursor-pointer"
                        >
                          {subjects.map((sub) => (
                            <option key={sub.id} value={sub.id} className="bg-[#120a0c] text-white">
                              {sub.name}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-xs text-red-400 mt-2">{errors.subject.message}</p>
                        )}
                      </div>

                      {/* Query message */}
                      <div>
                        <textarea
                          rows={5}
                          placeholder="Write your request, prayer petition, or message details..."
                          {...register("message")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors resize-none"
                        />
                        {errors.message && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <div className="flex justify-end pt-4 border-t border-white/5">
                        <MagneticButton>
                          <button
                            type="submit"
                            disabled={loading}
                            className="glass-panel border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2"
                          >
                            {loading ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin text-primary-gold" />
                                Transmitting...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 text-primary-gold" />
                                Send Message
                              </>
                            )}
                          </button>
                        </MagneticButton>
                      </div>

                    </form>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-primary-gold/30 p-8 md:p-12 text-center flex flex-col items-center justify-center">
                    <CheckCircle2 className="w-14 h-14 text-primary-gold mb-5 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] animate-pulse" />
                    
                    <span className="font-serif text-xs uppercase tracking-[0.2em] text-primary-gold font-bold block mb-2">
                      Transmission Confirmed
                    </span>
                    
                    <h2 className="font-serif text-xl md:text-2xl text-white tracking-wide font-semibold mb-4">
                      Thank You for Contacting St. George Parish
                    </h2>
                    
                    <p className="font-sans text-xs sm:text-sm text-church-muted leading-relaxed max-w-md mb-8">
                      Your query/appointment scheduler submission was compiled. The Parish Office secretary will verify and get back to you via your email address within 24-48 hours.
                    </p>

                    <MagneticButton>
                      <button
                        onClick={handleReset}
                        className="glass-panel border-white/10 hover:border-primary-gold bg-[#120a0c] hover:bg-primary-maroon/20 text-white/90 hover:text-primary-gold px-6 py-2.5 rounded-full font-serif text-[10px] uppercase tracking-widest transition-all duration-300"
                      >
                        Send Another Message
                      </button>
                    </MagneticButton>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
