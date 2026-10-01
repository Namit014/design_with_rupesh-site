"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, QrCode, Video, Ticket, Map, Lightbulb, Lock, Sparkles, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Info, Wifi, Monitor, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"] });

interface CandidateInfo {
  id: string;
  name: string;
  email: string;
  interviewDate: string;
  interviewTime: string;
  queueNumber: string;
  googleMeetCode?: string;
}

export default function CandidateDashboard() {
  const router = useRouter();
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'tickets' | 'tips' | 'philosophy'>('tickets');
  const [philosophySlide, setPhilosophySlide] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const philosophies = [
    { title: "Main Character Energy? Drop it.", text: "Leave the ego at the door. Everyone's a student, everyone's a teacher. Take the feedback and level up." },
    { title: "Break it. Fix it. Own it.", text: "Mess up? Good. That means you're actually trying. Learn from the Ls and bounce back harder." },
    { title: "Real Recognizes Real.", text: "God-tier ideas don't care about your job title. Respect the hustle, no matter who's talking." },
    { title: "Seriously, Touch Grass.", text: "Work goes hard, but so should your downtime. Take a breath, have some fun, and actually enjoy the ride." },
    { title: "Squad Over Everything.", text: "No solo missions here. We win together, we grow together. It's that simple." },
    { title: "Stay Leveling Up.", text: "Yesterday's flex is old news. Keep pushing, keep growing, and never settle for basic." }
  ];

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const authData = sessionStorage.getItem("candidateAuth");
    if (!authData) {
      router.push("/teams");
      return;
    }

    try {
      setCandidate(JSON.parse(authData));
    } catch (e) {
      router.push("/teams");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("candidateAuth");
    router.push("/teams");
  };

  const handleJoinMeet = () => {
    if (candidate?.googleMeetCode) {
      if (candidate.googleMeetCode.startsWith('http')) {
        window.open(candidate.googleMeetCode, '_blank');
      } else {
        window.open(`https://meet.google.com/${candidate.googleMeetCode}`, '_blank');
      }
    } else {
      alert("Meet code not available yet. Please check back later.");
    }
  };

  if (!candidate || !currentTime) {
    return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading...</div>;
  }

  // Time Logic
  let buttonDisabled = false;
  let buttonText = "JOIN MEET";
  let progressPercent = 0;
  let meetingStatus = "Waiting Room";

  if (candidate?.interviewDate && candidate?.interviewTime) {
    const startTime = new Date(`${candidate.interviewDate}T${candidate.interviewTime}:00`).getTime();
    if (!isNaN(startTime)) {
      const now = currentTime.getTime();
      const twoHoursInMs = 2 * 60 * 60 * 1000;
      const endTime = startTime + twoHoursInMs;

      const windowStart = startTime - (15 * 60 * 1000); // 15 mins before

      // Progress bar logic: fills up over the 2 hours *before* the meeting
      const countdownWindow = 2 * 60 * 60 * 1000; // 2 hours
      if (now >= startTime) {
        progressPercent = 100;
      } else if (now >= startTime - countdownWindow) {
        progressPercent = 100 - ((startTime - now) / countdownWindow) * 100;
      } else {
        progressPercent = 0;
      }

      if (now < windowStart) {
        buttonDisabled = true;
        buttonText = "LINK LOCKED";
        meetingStatus = "Waiting Room";
      } else if (now > endTime) {
        buttonDisabled = true;
        buttonText = "ENDED";
        meetingStatus = "Ended";
      } else {
        buttonDisabled = false;
        buttonText = "JOIN MEET";
        meetingStatus = "Ready";
      }
    }
  }

  return (
    <div className={`h-[100dvh] bg-[#050505] flex flex-col items-center relative overflow-hidden ${dmSans.className}`}>

      {/* Header - Mobile Only */}
      <header className="w-full px-6 py-6 flex md:hidden justify-center items-center z-10 text-white shrink-0 relative mt-2 mb-2">
        <button onClick={handleLogout} className="absolute left-6 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-extrabold tracking-tight">Hi {candidate.name.split(' ')[0]}, Your Ticket</h1>
      </header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'tickets' && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-[90%] md:w-full md:max-w-7xl relative z-10 mb-40 shrink-0 md:flex md:flex-row md:items-center md:justify-center md:gap-12 md:h-full"
          >
            {/* LEFT COLUMN (Desktop Only) */}
            <div className="hidden md:flex flex-col gap-6 w-full max-w-[320px] absolute left-[10px] top-1/2 -translate-y-1/2 max-h-[95vh] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
              <div className="flex items-center gap-4 text-white mb-8">
                <button onClick={handleLogout} className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-normal text-neutral-300">Back to Dashboard</span>
              </div>
              
              <h1 className="text-[52px] font-normal text-white leading-[1.05] tracking-[-0.05em] mb-4">
                Hi {candidate.name.split(' ')[0]},<br/>Your Ticket
              </h1>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-8 pr-4 tracking-[-0.02em]">
                Here's your interview details. Keep this handy and join the meeting at your scheduled time.
              </p>

              <div className="space-y-3">
                <div className="bg-[#12141C] border border-white/5 rounded-none px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3"><Calendar className="text-neutral-400 w-4 h-4"/> <span className="text-[13px] text-neutral-300 font-normal">Interview Date</span></div>
                  <span className="text-[13px] text-white font-normal">{new Date(candidate.interviewDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="bg-[#12141C] border border-white/5 rounded-none px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3"><Clock className="text-neutral-400 w-4 h-4"/> <span className="text-[13px] text-neutral-300 font-normal">Start Time</span></div>
                  <span className="text-[13px] text-white font-normal">{candidate.interviewTime}</span>
                </div>
                <div className="bg-[#12141C] border border-white/5 rounded-none px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3"><MapPin className="text-neutral-400 w-4 h-4"/> <span className="text-[13px] text-neutral-300 font-normal">Mode</span></div>
                  <span className="text-[13px] text-white font-normal text-right leading-tight max-w-[120px]">Online <span className="text-[10px] text-neutral-500">(Google Meet)</span></span>
                </div>
              </div>
              </div>

            {/* MIDDLE COLUMN (Ticket Card) */}
            <div className="w-full max-w-[360px] mx-auto md:mx-0 shrink-0">
              <div className="bg-white text-black rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] pb-2 relative">

              {/* Side Cutouts */}
              <div className="absolute -left-4 top-[100px] w-8 h-8 bg-[#0B0F19] rounded-full z-20 shadow-inner"></div>
              <div className="absolute -right-4 top-[100px] w-8 h-8 bg-[#0B0F19] rounded-full z-20 shadow-inner"></div>

              <div className="p-7 relative bg-white z-10">

                {/* Top Info */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Ticket Number</p>
                    <p className="font-black text-sm tracking-widest">{candidate.id}</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg p-1">
                    <QrCode className="w-full h-full text-black" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Dashed Line */}
                <div className="w-full border-t-[2.5px] border-dashed border-neutral-200 mt-2 mb-7"></div>

                {/* Date */}
                <div className="text-center mb-7">
                  <h2 className="text-[22px] font-black tracking-tight">
                    {new Date(candidate.interviewDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' })}
                  </h2>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="text-center absolute w-full top-[-26px] flex justify-center">
                    <span className="bg-black text-white text-[10px] font-bold px-3.5 py-1 rounded-full shadow-md">
                      {candidate.interviewTime}
                    </span>
                  </div>

                  <div className="w-full px-3 mt-6 mb-4 relative">
                    <div className="w-full relative h-1.5 bg-neutral-100 rounded-full flex items-center">

                      {/* Fill track */}
                      <div className="absolute left-0 h-1.5 bg-black rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>

                      {/* Start dot */}
                      <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-[4px] z-10 transition-colors duration-1000 ${progressPercent > 0 ? 'border-black bg-white' : 'border-neutral-300 bg-white'}`}></div>

                      {/* End dot */}
                      <div className={`absolute right-0 translate-x-1/2 w-4 h-4 rounded-full z-10 transition-colors duration-1000 border-[4px] ${progressPercent === 100 ? 'border-black bg-white shadow-lg' : 'border-neutral-200 bg-white'}`}></div>

                      {/* Moving Icon */}
                      <div
                        className="absolute z-20 transition-all duration-1000 -translate-x-1/2"
                        style={{ left: `${progressPercent}%` }}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-1000 ${progressPercent > 0 ? 'bg-black text-white' : 'bg-white text-neutral-400 border border-neutral-200'}`}>
                          <Video className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 px-1">
                  <div className="text-left">
                    <h3 className="font-normal tracking-[-0.05em] text-[17px]">Lobby</h3>
                    <p className="text-neutral-400 text-[11px] font-normal tracking-[-0.02em]">{meetingStatus}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-normal tracking-[-0.05em] text-[17px]">Meeting</h3>
                    <p className="text-neutral-400 text-[11px] font-normal tracking-[-0.02em]">Live Call</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-2 mb-7 px-1">
                  <div>
                    <p className="text-neutral-400 text-[10px] font-normal uppercase tracking-wider mb-1">Queue</p>
                    <p className="font-normal tracking-[-0.05em] text-lg">{candidate.queueNumber}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-neutral-400 text-[10px] font-normal uppercase tracking-wider mb-1">Session</p>
                    <p className="font-normal tracking-[-0.05em] text-lg uppercase">INT-{candidate.id.slice(-4)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-400 text-[10px] font-normal uppercase tracking-wider mb-1">Stage</p>
                    <p className="font-normal tracking-[-0.05em] text-lg">1A</p>
                  </div>
                </div>

                {/* Time & Arrival */}
                <div className="flex justify-between items-end mb-8 px-1">
                  <div>
                    <p className="text-neutral-400 text-[10px] font-normal uppercase tracking-wider mb-1">Start Time</p>
                    <p className="font-normal tracking-[-0.05em] text-[26px] leading-none">{candidate.interviewTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-400 text-[10px] font-normal uppercase tracking-wider mb-1">Platform</p>
                    <p className="font-normal tracking-[-0.05em] text-lg leading-none whitespace-nowrap">
                      Google Meet
                    </p>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <p className="text-neutral-800 text-[11px] font-normal leading-tight">Ready for</p>
                    <p className="text-neutral-800 text-[11px] font-normal leading-tight">your interview?</p>
                  </div>
                  <button
                    onClick={handleJoinMeet}
                    disabled={buttonDisabled}
                    className={`${buttonDisabled ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' : 'bg-[#FFD166] text-black hover:bg-[#ffc642] active:scale-95'} font-normal tracking-[-0.05em] rounded-none py-3.5 px-4 shadow-md transition-all text-[14px] w-full max-w-[170px] flex items-center justify-center gap-2`}
                  >
                    {buttonDisabled && meetingStatus === "Not Started" && <Lock className="w-4 h-4" />}
                    {buttonDisabled && meetingStatus === "Ended" && <Lock className="w-4 h-4" />}
                    {!buttonDisabled && <Video className="w-4 h-4" />}
                    <span>{buttonText}</span>
                  </button>
                </div>

              </div>

              {/* Faux shadow for 3D effect */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-black/5 blur-sm z-0"></div>
            </div>
            </div>

          </motion.div>
        )}
        {activeTab === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-[90%] max-w-[400px] relative z-10 shrink-0 bg-[#0A0A0A] backdrop-blur-xl rounded-none p-8 text-center border border-white/10 shadow-2xl m-auto"
          >
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-none flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-neutral-300" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Interview Tips</h2>
            <p className="text-neutral-200 leading-relaxed font-medium text-lg">
              All interviews will be on the basis of your <strong className="text-white font-bold">previous project</strong>. Make sure to run it and keep it ready before the interview.
            </p>
          </motion.div>
        )}
        {activeTab === 'philosophy' && (
          <motion.div
            key="philosophy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed inset-0 z-50 w-full h-full bg-[#050505] flex items-center justify-center"
          >
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center max-w-[1400px] mx-auto px-8 md:px-16">
              
              {/* Vertical Label */}
              <div className="absolute left-4 md:left-12 top-0 h-full flex flex-col justify-center items-center opacity-40">
                <div 
                  className="text-[9px] md:text-[14px] font-black uppercase tracking-[0.4em] text-white"
                  style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                >
                  Philosophy
                </div>
                <div className="w-[1px] h-16 md:h-32 bg-white/20 mt-4 md:mt-8"></div>
              </div>

              {/* Background Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[180px] md:text-[400px] font-black text-white/[0.03] tracking-tighter leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  0{philosophySlide + 1}
                </span>
              </div>

              {/* Main Slider Content */}
              <div className="pl-10 md:pl-24 w-full relative z-10 h-full flex flex-col justify-center max-w-4xl">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={philosophySlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    {/* Mobile Pagination (Above text) */}
                    <div className="flex md:hidden items-center gap-4 mb-8 mt-4">
                      <div className="text-neutral-500 font-normal tracking-[-0.05em] text-sm">
                        <span className="text-white">0{philosophySlide + 1}</span> / 0{philosophies.length}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setPhilosophySlide(prev => prev === 0 ? philosophies.length - 1 : prev - 1)}
                          className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button 
                          onClick={() => setPhilosophySlide(prev => prev === philosophies.length - 1 ? 0 : prev + 1)}
                          className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-5 md:py-2 rounded-none border border-white/10 bg-white/5 mb-6 md:mb-10">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-none bg-neutral-300"></div>
                      <span className="text-[10px] md:text-[13px] font-normal text-neutral-300 tracking-[-0.02em]">Rebirth Values</span>
                    </div>

                    <h2 className="text-[32px] md:text-[56px] font-normal text-white leading-[1.1] mb-4 md:mb-8 tracking-[-0.05em]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {philosophies[philosophySlide].title}
                    </h2>
                    <p className="text-neutral-400 text-base md:text-2xl leading-relaxed font-normal max-w-2xl tracking-[-0.02em]">
                      {philosophies[philosophySlide].text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer and Controls */}
                <div className="absolute bottom-32 md:bottom-12 left-10 md:left-24 w-[calc(100%-2.5rem)] md:w-[calc(100%-12rem)] flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="w-6 md:w-12 h-[1px] bg-white/20 mb-3 md:mb-5"></div>
                    <p className="text-white font-normal tracking-[-0.05em] text-xs md:text-lg">Our Philosophy</p>
                    <p className="text-neutral-500 text-[10px] md:text-sm font-normal">Learn hard. Work smart.</p>
                  </div>

                  <div className="hidden md:flex items-center gap-6">
                    {/* Indicator */}
                    <div className="text-neutral-500 font-normal tracking-[-0.05em] text-lg">
                      <span className="text-white">0{philosophySlide + 1}</span> / 0{philosophies.length}
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setPhilosophySlide(prev => prev === 0 ? philosophies.length - 1 : prev - 1)}
                        className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button 
                        onClick={() => setPhilosophySlide(prev => prev === philosophies.length - 1 ? 0 : prev + 1)}
                        className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs - Desktop & Mobile */}
      <div className="fixed bottom-8 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2 w-full md:w-auto flex flex-row md:flex-col justify-center items-end md:items-center gap-5 z-[60] px-4 md:px-0 pointer-events-none">

        {/* Tickets Tab */}
        <button
          onClick={() => setActiveTab('tickets')}
          className={`w-[66px] h-[66px] pointer-events-auto rounded-none flex flex-col items-center justify-center shadow-2xl relative z-20 transition-all duration-300 ${activeTab === 'tickets'
              ? 'bg-white text-black transform -translate-y-2'
              : 'bg-[#111111] text-neutral-500 hover:bg-[#1a1a1a]'
            }`}
        >
          {activeTab === 'tickets' && (
            <div className="absolute top-1.5 w-full flex justify-center">
              <div className="w-1.5 h-1.5 rounded-none bg-black"></div>
            </div>
          )}
          <Ticket className={`w-[22px] h-[22px] mb-0.5 mt-1 ${activeTab === 'tickets' ? 'fill-black text-white' : 'fill-current'}`} strokeWidth={1} />
          <span className={`text-[9px] font-normal tracking-[-0.05em] ${activeTab === 'tickets' ? '' : 'hidden'}`}>Tickets</span>
        </button>

        {/* Tips Tab */}
        <button
          onClick={() => setActiveTab('tips')}
          className={`w-[66px] h-[66px] pointer-events-auto rounded-none flex flex-col items-center justify-center shadow-2xl relative z-20 transition-all duration-300 ${activeTab === 'tips'
              ? 'bg-white text-black transform -translate-y-2'
              : 'bg-[#111111] text-neutral-500 hover:bg-[#1a1a1a]'
            }`}
        >
          {activeTab === 'tips' && (
            <div className="absolute top-1.5 w-full flex justify-center">
              <div className="w-1.5 h-1.5 rounded-none bg-black"></div>
            </div>
          )}
          <Map className={`w-[22px] h-[22px] mb-0.5 mt-1 ${activeTab === 'tips' ? 'fill-black text-white' : 'fill-current'}`} strokeWidth={1} />
          <span className={`text-[9px] font-normal tracking-[-0.05em] ${activeTab === 'tips' ? '' : 'hidden'}`}>Tips</span>
        </button>

        {/* Philosophy Tab */}
        <button
          onClick={() => setActiveTab('philosophy')}
          className={`w-[66px] h-[66px] pointer-events-auto rounded-none flex flex-col items-center justify-center shadow-2xl relative z-20 transition-all duration-300 ${activeTab === 'philosophy'
              ? 'bg-white text-black transform -translate-y-2'
              : 'bg-[#111111] text-neutral-500 hover:bg-[#1a1a1a]'
            }`}
        >
          {activeTab === 'philosophy' && (
            <div className="absolute top-1.5 w-full flex justify-center">
              <div className="w-1.5 h-1.5 rounded-none bg-black"></div>
            </div>
          )}
          <Sparkles className={`w-[22px] h-[22px] mb-0.5 mt-1 ${activeTab === 'philosophy' ? 'fill-black text-white' : 'fill-current'}`} strokeWidth={1} />
          <span className={`text-[9px] font-normal tracking-[-0.05em] ${activeTab === 'philosophy' ? '' : 'hidden'}`}>Values</span>
        </button>

      </div>

    </div>
  );
}
