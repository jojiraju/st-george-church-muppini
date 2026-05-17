"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Search, 
  Filter, 
  X,
  RefreshCw, 
  BookOpen, 
  UserCheck, 
  Bookmark, 
  Compass,
  CalendarDays
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useLenis } from "@/lib/lenis";

const parishWards = [
  "St. Thomas Ward (Edakkara Town)",
  "St. Mary's Ward (Munda)",
  "St. Sebastian's Ward (Kozhikkode Road)",
  "St. George Ward (Palemad)",
  "St. Joseph's Ward (Edakkara East)",
  "St. Jude Ward (Musliyarangadi)"
];

export default function RegistrationsDirectoryPage() {
  const [families, setFamilies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWard, setSelectedWard] = useState("All Wards");
  const [selectedFamily, setSelectedFamily] = useState<any | null>(null); // Popup modal detail view state
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch registered families
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/register-family");
      const json = await res.json();
      
      if (json.success && json.data) {
        setFamilies(json.data);
      } else {
        setFamilies([]);
      }
    } catch (err) {
      console.warn("Failed to fetch families.");
      setFamilies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Stop body & Lenis page scrolling when the modal popup detail view is active
  useEffect(() => {
    if (selectedFamily !== null) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [selectedFamily, lenis]);

  // Handle keyboard events (Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFamily(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Statistics calculations
  const stats = useMemo(() => {
    const totalFams = families.length;
    const totalMembers = families.reduce((acc, f) => {
      let members = 1; // Head
      if (f.spouseName && f.spouseName.trim() !== "") members += 1;
      members += (f.membersDetails?.length || 0);
      return acc + members;
    }, 0);

    // Group count by Wards to find most active
    const wardCounts: { [key: string]: number } = {};
    families.forEach(f => {
      wardCounts[f.wardName] = (wardCounts[f.wardName] || 0) + 1;
    });

    let mostActive = "None";
    let maxCount = 0;
    Object.entries(wardCounts).forEach(([ward, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostActive = ward.split(" (")[0]; // Shorten ward name
      }
    });

    return { totalFams, totalMembers, mostActive };
  }, [families]);

  // Filtered families list based on search and ward select
  const filteredFamilies = useMemo(() => {
    return families.filter(f => {
      const matchesWard = selectedWard === "All Wards" || f.wardName === selectedWard;
      
      const headName = f.familyHead.toLowerCase();
      const house = f.houseName.toLowerCase();
      const spouse = (f.spouseName || "").toLowerCase();
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = 
        headName.includes(query) || 
        house.includes(query) || 
        spouse.includes(query) ||
        f.membersDetails?.some((m: any) => m.name.toLowerCase().includes(query));

      return matchesWard && matchesSearch;
    });
  }, [families, searchQuery, selectedWard]);

  // Group filtered families by Wards for visual split
  const familiesByWard = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    parishWards.forEach(w => {
      groups[w] = [];
    });

    filteredFamilies.forEach(f => {
      if (!groups[f.wardName]) {
        groups[f.wardName] = [];
      }
      groups[f.wardName].push(f);
    });

    // Remove empty wards from view to save vertical screen space
    return Object.entries(groups).filter(([_, list]) => list.length > 0);
  }, [filteredFamilies]);

  return (
    <div className="relative min-h-screen bg-[#080405] pt-32 pb-24 overflow-hidden">
      {/* Sacred light halos */}
      <div className="absolute top-[15%] left-[-150px] w-[450px] h-[450px] bg-primary-maroon-dark/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] w-[350px] h-[350px] bg-primary-gold-dark/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-primary-gold font-bold block mb-3">
            Admin Dashboard
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-wide">
            Registered Families Directory <span className="block text-2xl md:text-3xl mt-1 text-primary-gold/60">(ഇടവക കുടുംബ ഡയറക്ടറി)</span>
          </h1>
          <div className="w-[80px] h-[1px] bg-primary-gold/30 mx-auto mt-6" />
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <GlassCard hoverEffect={false} glowColor="none" className="bg-[#120a0c]/60 border-white/5 p-6 flex items-center gap-5">
            <div className="p-4 bg-primary-maroon/20 border border-primary-maroon/30 rounded-2xl text-primary-gold">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-church-muted tracking-widest block font-medium">Total Registered Families</span>
              <span className="font-serif text-3xl text-white font-bold gold-glow mt-1 block">{stats.totalFams}</span>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} glowColor="none" className="bg-[#120a0c]/60 border-white/5 p-6 flex items-center gap-5">
            <div className="p-4 bg-primary-maroon/20 border border-primary-maroon/30 rounded-2xl text-primary-gold">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-church-muted tracking-widest block font-medium">Total Family Souls</span>
              <span className="font-serif text-3xl text-white font-bold gold-glow mt-1 block">{stats.totalMembers}</span>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} glowColor="none" className="bg-[#120a0c]/60 border-white/5 p-6 flex items-center gap-5">
            <div className="p-4 bg-primary-maroon/20 border border-primary-maroon/30 rounded-2xl text-primary-gold">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-church-muted tracking-widest block font-medium">Most Populated Ward</span>
              <span className="font-serif text-lg text-primary-gold-light font-bold truncate tracking-wide mt-1 block">{stats.mostActive}</span>
            </div>
          </GlassCard>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by Head, House or Member name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-primary-gold shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full md:w-64 bg-black/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary-gold/60 transition-colors cursor-pointer"
              >
                <option value="All Wards" className="bg-[#0f0709]">All Parish Wards</option>
                {parishWards.map((w) => (
                  <option key={w} value={w} className="bg-[#0f0709]">{w}</option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="p-3 bg-primary-maroon/10 hover:bg-primary-maroon/30 border border-primary-gold/20 rounded-xl text-primary-gold hover:text-white transition-colors disabled:opacity-50"
              aria-label="Refresh Database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Main Directory Listing */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="p-24 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-primary-gold mx-auto mb-4" />
              <p className="text-church-muted text-sm uppercase tracking-widest font-medium">Synchronizing parish archives...</p>
            </div>
          ) : families.length === 0 ? (
            <div className="p-20 text-center border border-dashed border-white/10 rounded-3xl bg-black/[0.08] max-w-3xl mx-auto">
              <Users className="w-12 h-12 text-primary-gold/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-white mb-2">No Registered Families Found</h3>
              <p className="text-xs text-church-muted max-w-md mx-auto leading-relaxed">
                There are currently no registered families in the database. When parishioners submit the online family registration form, their details will automatically appear here in the directory.
              </p>
            </div>
          ) : filteredFamilies.length === 0 ? (
            <div className="p-20 text-center border border-dashed border-white/10 rounded-3xl bg-black/[0.08] max-w-3xl mx-auto">
              <Bookmark className="w-12 h-12 text-white/15 mx-auto mb-4" />
              <h3 className="font-serif text-lg text-white mb-2">No Records Found</h3>
              <p className="text-xs text-church-muted max-w-sm mx-auto">
                No family registries match your active search filters or selected parish ward. Try resetting the filters.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {familiesByWard.map(([ward, list]) => (
                <div key={ward} className="space-y-5">
                  
                  {/* Ward Header */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                    <MapPin className="w-4.5 h-4.5 text-primary-gold" />
                    <h2 className="font-serif text-lg text-white tracking-wide font-semibold">{ward}</h2>
                    <span className="px-2.5 py-0.5 bg-primary-maroon/20 border border-primary-gold/15 text-[10px] text-primary-gold rounded-full font-sans uppercase font-bold">
                      {list.length} {list.length === 1 ? "Family" : "Families"}
                    </span>
                  </div>

                  {/* Families Cards under the Ward in a beautiful multi-column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((fam) => (
                      <GlassCard
                        key={fam.id}
                        hoverEffect={true}
                        glowColor="gold"
                        onClick={() => setSelectedFamily(fam)}
                        className="bg-church-card border-white/5 p-6 hover:border-primary-gold/30 cursor-pointer flex flex-col justify-between h-[180px] group transition-all duration-300 relative"
                      >
                        <div className="absolute top-[8%] right-[8%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-primary-gold font-sans font-semibold uppercase tracking-wider">
                          Profile →
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="px-2.5 py-0.5 bg-primary-maroon/20 border border-primary-gold/15 text-[9px] text-primary-gold rounded font-sans uppercase font-bold tracking-wider">
                              {(fam.membersDetails?.length || 0) + (fam.spouseName ? 2 : 1)} Souls
                            </span>
                          </div>
                          
                          <h3 className="font-serif text-base text-white tracking-wide font-semibold mt-4 group-hover:text-primary-gold transition-colors line-clamp-1">
                            {fam.familyHead}
                          </h3>
                          
                          <p className="font-sans text-xs text-church-muted mt-1 font-medium line-clamp-1">
                            {fam.houseName}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[11px] text-white/40 font-sans">
                          <span className="truncate max-w-[140px]">{fam.contactPhone}</span>
                          <span className="text-[9px] uppercase tracking-widest text-white/20 shrink-0">
                            {new Date(fam.registeredAt || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short"
                            })}
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Family Details Modal Popup via React Portal to guarantee top-level stacking above the Navbar */}
        {mounted && typeof document !== "undefined" && createPortal(
          <AnimatePresence>
            {selectedFamily !== null && (
              <motion.div
                key="family-details-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFamily(null)}
                className="fixed inset-0 bg-[#050203]/95 backdrop-blur-xl flex justify-center items-center p-4 md:p-6"
                style={{ zIndex: 99999 }}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 15, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                  className="bg-[#120a0c] border border-primary-gold/20 rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden"
                >
                  {/* Close Top Button - Always floating fixed at top-right */}
                  <button
                    onClick={() => setSelectedFamily(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-[#1a1013]/70 backdrop-blur-md border border-white/5 hover:bg-white/10 hover:border-primary-gold/30 text-white/50 hover:text-primary-gold transition-all z-50 shadow-md cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Scrollable Body Content */}
                  <div
                    data-lenis-prevent
                    className="overflow-y-auto pr-14 md:pr-16 p-6 md:p-8 space-y-6 scrollbar-elegant flex-1"
                  >
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-primary-maroon/20 border border-primary-gold/15 text-[10px] text-primary-gold rounded font-sans uppercase font-bold tracking-wider">
                          Parish Family Profile
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          ID: {selectedFamily.id?.split("_")[1] || selectedFamily.id}
                        </span>
                      </div>
                      
                      <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-bold mt-1">
                        {selectedFamily.familyHead}
                        {selectedFamily.spouseName && (
                          <span className="text-lg md:text-xl font-sans font-normal text-church-muted block sm:inline sm:ml-2">
                            & {selectedFamily.spouseName}
                          </span>
                        )}
                      </h2>

                      <p className="font-sans text-sm text-primary-gold-light mt-1 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-primary-gold shrink-0" />
                        {selectedFamily.houseName} • {selectedFamily.wardName}
                      </p>
                    </div>

                    <div className="w-full h-[1px] bg-white/5" />

                    {/* Contact & Registration Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-maroon/15 border border-primary-maroon/30 text-primary-gold flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-church-muted block">Contact Phone</span>
                          <a href={`tel:${selectedFamily.contactPhone}`} className="text-white hover:text-primary-gold font-semibold transition-colors text-sm">
                            {selectedFamily.contactPhone}
                          </a>
                        </div>
                      </div>

                      {selectedFamily.emailAddress ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-maroon/15 border border-primary-maroon/30 text-primary-gold flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-church-muted block">Email Address</span>
                            <a href={`mailto:${selectedFamily.emailAddress}`} className="text-white hover:text-primary-gold font-semibold transition-colors text-sm truncate block max-w-[200px]">
                              {selectedFamily.emailAddress}
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 opacity-60">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/30 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-church-muted block">Email Address</span>
                            <span className="text-white/40 text-xs italic">Not Provided</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-maroon/15 border border-primary-maroon/30 text-primary-gold flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-church-muted block">Previous Parish</span>
                          <span className="text-white font-semibold text-sm">
                            {selectedFamily.previousParish || "None (Native parishioner)"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-maroon/15 border border-primary-maroon/30 text-primary-gold flex items-center justify-center shrink-0">
                          <CalendarDays className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-church-muted block">Enrollment Date</span>
                          <span className="text-white font-semibold text-sm">
                            {new Date(selectedFamily.registeredAt || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Family Members Roster */}
                    <div>
                      <h4 className="font-serif text-sm uppercase tracking-widest text-primary-gold font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                        <Users className="w-4 h-4 text-primary-gold" />
                        Enrolled Household Roster
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {/* Family Head Row */}
                        <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-4 py-3 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-primary-gold/15 border border-primary-gold/30 text-primary-gold flex items-center justify-center font-bold text-xs">
                              H
                            </div>
                            <span className="font-semibold text-white text-sm">{selectedFamily.familyHead}</span>
                          </div>
                          <span className="px-2.5 py-0.5 bg-primary-gold/10 border border-primary-gold/20 text-[9px] uppercase tracking-widest text-primary-gold rounded font-bold">
                            Family Head
                          </span>
                        </div>

                        {/* Spouse Row */}
                        {selectedFamily.spouseName && (
                          <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-4 py-3 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-semibold text-xs">
                                S
                              </div>
                              <span className="font-semibold text-white text-sm">{selectedFamily.spouseName}</span>
                            </div>
                            <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-church-muted rounded font-bold">
                              Spouse
                            </span>
                          </div>
                        )}

                        {/* Children & Dependants Rows */}
                        {selectedFamily.membersDetails && selectedFamily.membersDetails.length > 0 ? (
                          selectedFamily.membersDetails.map((m: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-black/20 border border-white/5 px-4 py-3 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-black/40 border border-white/5 text-white/30 flex items-center justify-center font-medium text-xs">
                                  {idx + 1}
                                </div>
                                <span className="text-white/90 text-sm">{m.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-church-muted text-xs font-medium">{m.age} yrs</span>
                                <span className="px-2.5 py-0.5 bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-church-muted rounded font-bold">
                                  {m.relation}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center p-6 border border-dashed border-white/5 rounded-2xl bg-black/[0.05] text-xs text-white/30">
                            No additional dependants or children listed.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Special Remarks / Vicar note */}
                    {selectedFamily.remarks && (
                      <div className="p-4 bg-primary-maroon/10 border border-primary-maroon/20 rounded-2xl">
                        <h5 className="font-serif text-xs uppercase tracking-wider text-primary-gold font-bold mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-primary-gold" />
                          Vicar Note & Special Requests
                        </h5>
                        <p className="text-church-fg/80 leading-relaxed italic text-xs">
                          "{selectedFamily.remarks}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Fixed Footer Panel - Stays anchored at the bottom */}
                  <div className="bg-black/20 px-6 py-4 border-t border-white/5 flex justify-end gap-3 rounded-b-3xl shrink-0 z-10">
                    <button
                      onClick={() => setSelectedFamily(null)}
                      className="px-6 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-primary-gold/30 rounded-full text-xs text-church-fg hover:text-primary-gold transition-all duration-300 font-semibold cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </div>
  );
}
