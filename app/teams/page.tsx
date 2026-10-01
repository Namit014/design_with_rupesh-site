"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"] });

export default function TeamsLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showForm) {
      setShowForm(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier,
          password 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("candidateAuth", JSON.stringify(data.candidate));
        router.push("/teams/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Reusable Avatar Cluster Element
  const renderAvatarCluster = (isDesktop = false) => (
    <div className={`transform ${isDesktop ? "scale-110 lg:scale-120" : "scale-100"} origin-center transition-transform select-none`}>
      <div className="relative w-[340px] h-[340px] mx-auto">
        
        {/* Solid White Connector Stems */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {/* Green avatar (75, 75) -> ux/ui Designer (190, 100) */}
          <line x1="75" y1="75" x2="190" y2="100" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Product Designer (75, 175) -> Center Avatar (170, 170) */}
          <line x1="75" y1="175" x2="170" y2="170" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Center Avatar (170, 170) -> Software Engineer (265, 180) */}
          <line x1="170" y1="170" x2="265" y2="180" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Center Avatar (170, 170) -> Flutter Developer (135, 250) */}
          <line x1="170" y1="170" x2="135" y2="250" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Flutter Developer (135, 250) -> Purple Avatar (235, 255) */}
          <line x1="135" y1="250" x2="235" y2="255" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>

        {/* 1. Green Avatar with 3 Spark Lines (Top-Left) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
          className="absolute left-[40px] top-[40px] z-10"
        >
          {/* 3 Radiating Doodle Accent Lines above head */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-6 pointer-events-none">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <line x1="10" y1="18" x2="4" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="15" x2="20" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="30" y1="18" x2="36" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="w-[72px] h-[72px] rounded-full bg-[#B9F0C9] border-[3px] border-white overflow-hidden shadow-xl flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80" 
              alt="UX Designer" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* 2. ux/ui Designer White Badge (Top-Right) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute left-[150px] top-[80px] z-20"
        >
          <div className="bg-white text-black font-extrabold text-[12px] leading-tight px-4 py-2 rounded-full text-center shadow-2xl border border-gray-100 flex flex-col justify-center items-center">
            <span>ux/ui</span>
            <span>Designer</span>
          </div>
        </motion.div>

        {/* 3. Product Designer White Badge (Center-Left) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute left-[15px] top-[152px] z-20"
        >
          <div className="bg-white text-black font-extrabold text-[12px] leading-tight px-4 py-2 rounded-full text-center shadow-2xl border border-gray-100 flex flex-col justify-center items-center">
            <span>Product</span>
            <span>Designer</span>
          </div>
        </motion.div>

        {/* 4. Center Woman Avatar (Center) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 18 }}
          className="absolute left-[132px] top-[132px] z-10"
        >
          <div className="w-[78px] h-[78px] rounded-full bg-[#FCE7D6] border-[4px] border-white overflow-hidden shadow-2xl flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80" 
              alt="Center Lead" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* 5. Software Engineer White Badge (Center-Right) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="absolute left-[225px] top-[158px] z-20"
        >
          <div className="bg-white text-black font-extrabold text-[12px] leading-tight px-4 py-2 rounded-full text-center shadow-2xl border border-gray-100 flex flex-col justify-center items-center">
            <span>Software</span>
            <span>Engineer</span>
          </div>
        </motion.div>

        {/* 6. Flutter Developer White Badge (Bottom-Left) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute left-[80px] top-[228px] z-20"
        >
          <div className="bg-white text-black font-extrabold text-[12px] leading-tight px-4 py-2 rounded-full text-center shadow-2xl border border-gray-100 flex flex-col justify-center items-center">
            <span>Flutter</span>
            <span>Developer</span>
          </div>
        </motion.div>

        {/* 7. Purple Avatar (Bottom-Right) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 20 }}
          className="absolute left-[196px] top-[218px] z-10"
        >
          <div className="w-[74px] h-[74px] rounded-full bg-[#CCAFFD] border-[3px] border-white overflow-hidden shadow-xl flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80" 
              alt="Developer" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );

  // Form Element
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3 w-full flex flex-col">
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-3 w-full overflow-hidden"
          >
            <div>
              <input 
                type="text" 
                required 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Candidate Email Address" 
                autoComplete="off"
                autoFocus
                className="w-full bg-[#111111] border border-white/10 text-white rounded-none px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white transition-all font-normal text-base placeholder:text-neutral-500 tracking-[-0.05em]"
              />
            </div>
            
            <div>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (Access Password)" 
                autoComplete="new-password"
                className="w-full bg-[#111111] border border-white/10 text-white rounded-none px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white transition-all font-normal text-base placeholder:text-neutral-500 tracking-wider"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && showForm && (
        <p className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2.5 rounded-full border border-red-500/20">
          {error}
        </p>
      )}

      {/* Brand Kicker moved below button */}

      {/* White Square Action Button */}
      <motion.button 
        type="submit" 
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white text-black font-normal text-lg rounded-none px-7 py-4 flex items-center justify-between hover:bg-neutral-200 transition-all shadow-xl disabled:opacity-70 cursor-pointer"
      >
        <span className="font-normal text-[17px] tracking-[-0.05em]">
          {loading ? "Verifying..." : showForm ? "Sign In & View Queue" : "Get Started"}
        </span>
        <div className="bg-black text-white p-2.5 rounded-none flex items-center justify-center shadow">
          <ArrowRight className="w-4 h-4 stroke-[1]" />
        </div>
      </motion.button>

      {/* Brand Kicker */}
      <div className="flex items-center justify-center text-[10px] font-normal text-neutral-500 uppercase tracking-[0.15em] mt-4">
        THE REBIRTH COMPANY INTERVIEW PORTAL
      </div>

      {showForm && (
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-neutral-500 hover:text-neutral-400 text-xs text-center underline cursor-pointer pt-1"
        >
          Cancel
        </button>
      )}
    </form>
  );

  return (
    <div className={`min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden ${dmSans.className}`}>
      
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
          backgroundSize: '36px 36px' 
        }}
      />

      {/* ========================================================================= */}
      {/* 1. MOBILE LAYOUT (< lg): STRICTLY TITLE AT TOP, CLUSTER IN MIDDLE, BUTTON AT BOTTOM */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col justify-between min-h-[760px] w-full max-w-[390px] mx-auto py-6 z-10 relative">
        
        {/* Top: Header */}
        <div className="w-full text-left relative pt-1">
          {/* Small Brand & Portal Kicker removed from here */}

          <h1 
            className="text-[44px] leading-[1.05] font-normal text-white"
            style={{ letterSpacing: "-0.05em" }}
          >
            Build Your<br />
            Future, Build<br />
            Your Dream
          </h1>


        </div>

        {/* Middle: Connected Avatars Cluster */}
        <div className="my-auto py-2">
          {renderAvatarCluster()}
        </div>

        {/* Bottom: Get Started Button / Pill Inputs */}
        <div className="w-full mt-2">
          {renderLoginForm()}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP LAYOUT (>= lg): BEAUTIFUL 2-COLUMN BALANCED HERO */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-16 items-center w-full max-w-6xl mx-auto py-12 z-10 relative min-h-[85vh]">
        
        {/* Left Column: Kicker + Headline + Subtitle + Action Form */}
        <div className="col-span-6 flex flex-col justify-center text-left">
          
          {/* Small Brand & Portal Kicker removed from here */}

          <div className="relative mb-6">
            <h1 
              className="text-[64px] leading-[1.05] font-normal text-white"
              style={{ letterSpacing: "-0.05em" }}
            >
              Build Your<br />
              Future, Build<br />
              Your Dream
            </h1>


          </div>

          <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-md">
            Welcome to the interview onboarding space. Sign in with your candidate credentials to view your interview schedule, queue number, and meet the team.
          </p>

          <div className="w-full max-w-[390px]">
            {renderLoginForm()}
          </div>

        </div>

        {/* Right Column: Scaled Avatar Cluster */}
        <div className="col-span-6 flex justify-center items-center">
          {renderAvatarCluster(true)}
        </div>

      </div>

    </div>
  );
}
