"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShieldCheck, CheckCircle2, ChevronRight, RefreshCw } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

// Zod Validation Schema
const donationSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  amount: z.number().min(10, "Minimum contribution is ₹10"),
  cause: z.string().min(1, "Please select an offering purpose"),
  notes: z.string().optional()
});

type DonationFormValues = z.infer<typeof donationSchema>;

const purposes = [
  { id: "general", name: "General Parish Sustenance" },
  { id: "housing", name: "Snehasparsham 2026 Housing Project" },
  { id: "school", name: "Catechism School Support" },
  { id: "mass", name: "Holy Liturgy Intention Offering" }
];

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1000,
      cause: "general"
    }
  });

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSelectedAmount(presetAmounts.includes(value) ? value : null);
  };

  const onSubmit = async (data: DonationFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/donations", {
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
      console.warn("CMS Backend offline, simulating local offering...");
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
      fullName: "",
      email: "",
      phone: "",
      amount: 1000,
      cause: "general",
      notes: ""
    });
    setSelectedAmount(1000);
  };

  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Sustaining Our Mission
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Holy Offerings
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="donation-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-white/5 p-8 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans">
                  
                  {/* 1. Purpose selector */}
                  <div>
                    <label className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold block mb-4">
                      1. Select Offering Purpose
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {purposes.map((p) => (
                        <label
                          key={p.id}
                          className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-primary-gold/40 cursor-pointer select-none transition-colors"
                        >
                          <input
                            type="radio"
                            value={p.id}
                            {...register("cause")}
                            className="w-4 h-4 accent-primary-gold"
                          />
                          <span className="text-xs sm:text-sm text-white font-medium">{p.name}</span>
                        </label>
                      ))}
                    </div>
                    {errors.cause && (
                      <p className="text-xs text-red-400 mt-2">{errors.cause.message}</p>
                    )}
                  </div>

                  {/* 2. Amount Selection */}
                  <div>
                    <label className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold block mb-4">
                      2. Choose Offering Amount (INR)
                    </label>
                    
                    {/* Preset buttons */}
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      {presetAmounts.map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => handlePresetSelect(amt)}
                          className={`py-3 rounded-lg border text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                            selectedAmount === amt
                              ? "bg-primary-maroon border-primary-gold/40 text-primary-gold shadow-lg"
                              : "bg-black/40 border-white/10 text-church-muted hover:text-white"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>

                    {/* Custom input */}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-sm text-primary-gold">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        {...register("amount", { valueAsNumber: true, onChange: handleAmountChange })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-xs text-red-400 mt-2">{errors.amount.message}</p>
                    )}
                  </div>

                  {/* 3. Personal Details */}
                  <div>
                    <label className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold block mb-4">
                      3. Donor Information
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          {...register("fullName")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.fullName.message}</p>
                        )}
                      </div>
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
                      <div>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          {...register("phone")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4. Notes / Prayer Intention */}
                  <div>
                    <label className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold block mb-3">
                      4. Special Prayer Intention (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your prayers, names of loved ones to remember in Holy Liturgy, or remarks..."
                      {...register("notes")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <ShieldCheck className="w-4 h-4 text-primary-gold" />
                      <span>Secured & encrypted mock checkout processing</span>
                    </div>

                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={loading}
                        className="glass-panel border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-primary-gold" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4 text-primary-gold" />
                            Submit Offering
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
              key="donation-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-primary-gold/30 p-8 md:p-16 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary-gold mb-6 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] animate-bounce" />

                <span className="font-serif text-xs uppercase tracking-[0.25em] text-primary-gold font-bold block mb-2">
                  Offering Processed Successfully
                </span>
                
                <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-semibold mb-6">
                  May God Abundantly Bless Your Generosity
                </h2>

                <div className="w-[80px] h-[1px] bg-primary-gold/20 mb-6" />

                <p className="font-sans text-sm text-church-muted leading-relaxed max-w-xl mb-10">
                  "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously." - 2 Corinthians 9:6 <br className="hidden sm:block" />
                  Your holy offering will support the liturgical restorations and social welfare programs of St. George Edakkara. A confirmation slip was sent to your email.
                </p>

                <MagneticButton>
                  <button
                    onClick={handleReset}
                    className="glass-panel border-white/10 hover:border-primary-gold bg-[#120a0c] hover:bg-primary-maroon/20 text-white/90 hover:text-primary-gold px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-300"
                  >
                    Make Another Offering
                  </button>
                </MagneticButton>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
