"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

// Zod Validation Schema matching the Node.js backend
const registrationSchema = z.object({
  familyHead: z.string().min(3, "Family Head Name must be at least 3 characters"),
  spouseName: z.string().optional(),
  contactPhone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  emailAddress: z.string().email("Please enter a valid email address").or(z.literal("")),
  houseName: z.string().min(2, "House Name must be at least 2 characters"),
  wardName: z.string().min(1, "Please select your Parish Ward"),
  previousParish: z.string().optional(),
  membersCount: z.number().min(1, "At least 1 family member required"),
  membersDetails: z.array(
    z.object({
      name: z.string().min(1, "Member Name is required"),
      relation: z.string().min(1, "Relation is required"),
      age: z.number().min(0, "Age must be positive")
    })
  ),
  remarks: z.string().optional()
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const parishWards = [
  "St. Thomas Ward (Edakkara Town)",
  "St. Mary's Ward (Munda)",
  "St. Sebastian's Ward (Kozhikkode Road)",
  "St. George Ward (Palemad)",
  "St. Joseph's Ward (Edakkara East)",
  "St. Jude Ward (Musliyarangadi)"
];

const relations = ["Spouse", "Son", "Daughter", "Father", "Mother", "Grandfather", "Grandmother", "Other"];

export default function RegisterFamilyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      familyHead: "",
      spouseName: "",
      contactPhone: "",
      emailAddress: "",
      houseName: "",
      wardName: "",
      previousParish: "",
      membersCount: 1,
      membersDetails: [],
      remarks: ""
    }
  });

  // Dynamic Array for Family Members details
  const { fields, append, remove } = useFieldArray({
    control,
    name: "membersDetails"
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register-family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(result.data);
        setIsSubmitted(true);
      } else {
        alert(result.message || "Registration failed. Please check form inputs.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to connect to Node.js backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-primary-maroon-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-150px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3"
          >
            Welcome to Our Fold
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-wide"
          >
            Parish Family Registration
          </motion.h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
          <p className="font-sans text-xs sm:text-sm text-church-muted max-w-xl mx-auto mt-4 leading-relaxed">
            Newly moved or joined family in Edakkara boundaries? Register your details to formally enroll in our parish family records.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-white/5 p-6 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans">
                  
                  {/* Section 1: Household Details */}
                  <div>
                    <h3 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold mb-5 flex items-center gap-2 border-b border-primary-gold/15 pb-2">
                      <Users className="w-4 h-4 text-primary-gold" />
                      1. Household Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Family Head Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Mr. Abraham George"
                          {...register("familyHead")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.familyHead && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.familyHead.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Spouse Name (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Mrs. Mary Abraham"
                          {...register("spouseName")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Residence & Ward */}
                  <div>
                    <h3 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold mb-5 flex items-center gap-2 border-b border-primary-gold/15 pb-2">
                      <MapPin className="w-4 h-4 text-primary-gold" />
                      2. Residence & Parish Ward
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">House Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Plathottam House"
                          {...register("houseName")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.houseName && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.houseName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Select Parish Ward *</label>
                        <select
                          {...register("wardName")}
                          className="w-full bg-black/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors cursor-pointer"
                        >
                          <option value="">-- Choose Parish Ward --</option>
                          {parishWards.map((w) => (
                            <option key={w} value={w} className="bg-[#0f0709]">{w}</option>
                          ))}
                        </select>
                        {errors.wardName && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.wardName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Previous Parish (If Migrated)</label>
                        <input
                          type="text"
                          placeholder="e.g. St. Mary's Sultan Bathery"
                          {...register("previousParish")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Contact details */}
                  <div>
                    <h3 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold mb-5 flex items-center gap-2 border-b border-primary-gold/15 pb-2">
                      <Phone className="w-4 h-4 text-primary-gold" />
                      3. Contact Coordinates
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Contact Phone *</label>
                        <input
                          type="text"
                          placeholder="e.g. +91 9447100000"
                          {...register("contactPhone")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.contactPhone && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.contactPhone.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. abraham@gmail.com"
                          {...register("emailAddress")}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.emailAddress && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.emailAddress.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label className="text-xs uppercase text-church-muted tracking-wider block mb-2 font-medium">Total Family Members count *</label>
                        <input
                          type="number"
                          {...register("membersCount", { valueAsNumber: true })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                        />
                        {errors.membersCount && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.membersCount.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Dynamic Family Members Directory */}
                  <div>
                    <div className="flex justify-between items-center mb-5 border-b border-primary-gold/15 pb-2">
                      <h3 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-primary-gold" />
                        4. Family Members Roster
                      </h3>
                      <button
                        type="button"
                        onClick={() => append({ name: "", relation: "Son", age: 18 })}
                        className="flex items-center gap-1.5 py-1 px-3 bg-primary-maroon/20 hover:bg-primary-maroon/40 border border-primary-gold/20 hover:border-primary-gold/40 text-primary-gold hover:text-white rounded-full text-xs transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Member
                      </button>
                    </div>

                    {fields.length === 0 ? (
                      <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center bg-black/[0.08]">
                        <Users className="w-8 h-8 text-white/20 mx-auto mb-2" />
                        <p className="text-xs text-church-muted">No additional members added yet. Click "Add Member" to record children, parents, or dependants.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/20 p-4 rounded-xl border border-white/5 items-end"
                          >
                            <div className="md:col-span-5">
                              <label className="text-[10px] uppercase text-church-muted tracking-wider block mb-1.5">Member Full Name *</label>
                              <input
                                type="text"
                                placeholder="Member Name"
                                {...register(`membersDetails.${index}.name` as const)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                              />
                            </div>

                            <div className="md:col-span-3">
                              <label className="text-[10px] uppercase text-church-muted tracking-wider block mb-1.5">Relation *</label>
                              <select
                                {...register(`membersDetails.${index}.relation` as const)}
                                className="w-full bg-black/80 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary-gold/60 transition-colors cursor-pointer"
                              >
                                {relations.map((r) => (
                                  <option key={r} value={r} className="bg-[#0f0709]">{r}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-3">
                              <label className="text-[10px] uppercase text-church-muted tracking-wider block mb-1.5">Age *</label>
                              <input
                                type="number"
                                placeholder="Age"
                                {...register(`membersDetails.${index}.age` as const, { valueAsNumber: true })}
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
                              />
                            </div>

                            <div className="md:col-span-1 flex justify-center md:justify-end">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/60 border border-red-500/10 hover:border-red-500/40 text-red-400 hover:text-red-200 transition-colors"
                                aria-label="Remove member row"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 5: Remarks / Spiritual Request */}
                  <div>
                    <h3 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold mb-3">
                      5. Remarks & Prayer Request (Optional)
                    </h3>
                    <textarea
                      rows={3}
                      placeholder="Write family remarks, special counseling requests, or general guidelines Father Thomas Kaloor should note..."
                      {...register("remarks")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Panel */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <ShieldCheck className="w-4 h-4 text-primary-gold" />
                      <span>Saved securely to local Node.js JSON Database</span>
                    </div>

                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={loading}
                        className="glass-panel border-primary-gold bg-primary-maroon/20 hover:bg-primary-maroon/40 text-primary-gold hover:text-white px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-primary-gold" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 text-primary-gold" />
                            Enroll Family
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
              key="registration-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard hoverEffect={false} glowColor="gold" className="bg-[#120a0c]/60 border-primary-gold/30 p-8 md:p-16 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary-gold mb-6 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]" />

                <span className="font-serif text-xs uppercase tracking-[0.25em] text-primary-gold font-bold block mb-2">
                  Registration Successfully Recorded
                </span>
                
                <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-semibold mb-6">
                  Welcome to the St. George Parish Family!
                </h2>

                <div className="w-[80px] h-[1px] bg-primary-gold/20 mb-6" />

                {submittedData && (
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-8 max-w-md w-full text-left font-sans text-xs space-y-2.5">
                    <div>
                      <span className="text-church-muted block uppercase text-[9px] tracking-wider">Assigned System ID</span>
                      <span className="text-primary-gold font-mono font-bold text-sm block mt-0.5">{submittedData.id}</span>
                    </div>
                    <div>
                      <span className="text-church-muted block uppercase text-[9px] tracking-wider">Family Head</span>
                      <span className="text-white text-xs block font-semibold mt-0.5">{submittedData.familyHead}</span>
                    </div>
                    <div>
                      <span className="text-church-muted block uppercase text-[9px] tracking-wider">Parish Ward Assigned</span>
                      <span className="text-white text-xs block mt-0.5">{submittedData.wardName}</span>
                    </div>
                    <div>
                      <span className="text-church-muted block uppercase text-[9px] tracking-wider">Enrolled At</span>
                      <span className="text-white text-xs block mt-0.5">{new Date(submittedData.registeredAt).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <p className="font-sans text-xs sm:text-sm text-church-muted leading-relaxed max-w-xl mb-10 text-center">
                  Your family details have been saved to our local filesystem database. Please introduce yourself and present this printout/details to **Rev. Fr. Thomas Kaloor** during the Sunday Holy Qurbana to receive his personal blessings and the formal welcoming rite.
                </p>

                <div className="flex gap-4">
                  <MagneticButton>
                    <button
                      onClick={handleReset}
                      className="glass-panel border-white/10 hover:border-primary-gold bg-[#120a0c] hover:bg-primary-maroon/20 text-white/90 hover:text-primary-gold px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Register New Family
                    </button>
                  </MagneticButton>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
