import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2PinRef = useRef<HTMLDivElement>(null);
  const scene3HorizRef = useRef<HTMLDivElement>(null);
  const scene4SpreadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE 1: Delhi roots & JEE
      if (scene1Ref.current) {
        gsap.from('.journey-1-left', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 85%',
            once: true,
          },
          x: -25,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.from('.journey-1-right', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 85%',
            once: true,
          },
          x: 25,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.from('.journey-1-fx', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 75%',
            once: true,
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // SCENE 2: DTU Milestone entrance
      if (scene2PinRef.current) {
        gsap.from('.dtu-gate-seal', {
          scrollTrigger: {
            trigger: scene2PinRef.current,
            start: 'top 80%',
            once: true,
          },
          scale: 0.96,
          opacity: 0.8,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to('.journey-2-dialogue', {
          scrollTrigger: {
            trigger: scene2PinRef.current,
            start: 'top 75%',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }

      // SCENE 3: 4 Algorithm Era phases
      if (scene3HorizRef.current) {
        gsap.from('.algo-card', {
          scrollTrigger: {
            trigger: scene3HorizRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }

      // SCENE 4: Double Page Spread Climax
      if (scene4SpreadRef.current) {
        gsap.from('.spread-left', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 85%',
            once: true,
          },
          x: -25,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.from('.spread-right', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 85%',
            once: true,
          },
          x: 25,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.from('.climax-boom', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 80%',
            once: true,
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: 'back.out(1.5)',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full bg-[#050505] border-b border-[#17171C] overflow-hidden"
    >
      {/* Background Halftone & Scanlines */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Intro Section Header — Tightened gaps */}
      <div className="relative z-20 max-w-7xl mx-auto pt-16 pb-4 px-4 sm:px-8 text-left">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] tracking-wider mb-2">
          <BookOpen className="h-4 w-4" />
          <span>// 05. ENGINEERING MANIFEST: INDIA TO CODE</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          AKSHAT'S <span className="text-[#38bdf8]">JOURNEY</span>
        </h2>
        <p className="mt-2 text-zinc-400 font-sans-tech max-w-2xl text-sm sm:text-base">
          Scroll-driven sequential narrative chronicling the transformation from Delhi's competitive
          JEE grind to DTU Information Technology, 600+ algorithmic battles in C++, and engineering production systems.
        </p>
      </div>

      {/* ========================================================= */}
      {/* CHAPTER 01: THE SPARK (JEE & CURIOSITY) */}
      {/* ========================================================= */}
      <div
        ref={scene1Ref}
        className="relative z-20 max-w-6xl mx-auto pt-4 pb-12 px-4 sm:px-8 space-y-8"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-mono-tech text-xs text-zinc-500">
          <span>CHAPTER 01 // DELHI ROOTS & THE JEE GRIND</span>
          <span className="text-[#38bdf8]">ORIGIN: NEW DELHI, INDIA</span>
        </div>

        {/* Dynamic Asymmetric Manga Panels */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Onomatopoeia FX Floating */}
          <div className="journey-1-fx absolute -top-8 right-6 z-30 pointer-events-none">
            <span className="manga-fx-text text-5xl sm:text-7xl text-[#38bdf8]">
              प्रारंभ!!
            </span>
          </div>

          {/* Left Panel: The Physics & Mathematics Foundation */}
          <div className="journey-1-left md:col-span-7 border border-zinc-700 bg-zinc-950 p-5 shadow-[6px_6px_0px_rgba(56,189,248,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 manga-speedlines opacity-40" />
            <div className="relative z-10 space-y-4 text-left">
              <div className="inline-block bg-zinc-800 text-zinc-200 border border-zinc-700 px-2 py-0.5 font-manga text-xs">
                LOG 01 // THE SPARK
              </div>
              <div className="h-52 bg-zinc-900 border border-zinc-800 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-halftone opacity-50" />
                <span className="font-manga text-7xl text-white/5 select-none">तपस्या</span>
                <div className="relative z-10 text-center">
                  <span className="text-5xl">📐⚡</span>
                  <div className="mt-2 font-mono-tech text-xs text-[#38bdf8] font-bold">
                    DELHI // RIGOROUS PROBLEM-SOLVING GENESIS
                  </div>
                </div>
              </div>

              {/* Dialogue Balloon */}
              <div className="relative inline-block border border-zinc-700 bg-zinc-900/90 p-3 text-zinc-200 font-manga text-sm max-w-sm rounded-lg shadow-[4px_4px_0px_rgba(56,189,248,0.2)]">
                「कठिन समस्याओं को तोड़ना और मूल सिद्धांत समझना—यहीं से सोच की नींव बनी。」
                <p className="mt-1 font-mono-tech text-[10px] text-zinc-400">
                  "Deconstructing complex mathematical models during JEE forged an obsession with first-principles reasoning."
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: First Encounter with Computation */}
          <div className="journey-1-right md:col-span-5 border border-zinc-700 bg-zinc-950 p-5 shadow-[6px_6px_0px_rgba(167,139,250,0.3)] relative overflow-hidden">
            <div className="relative z-10 space-y-4 text-left">
              <div className="h-56 bg-[#0e0e13] border border-zinc-800 relative flex flex-col items-center justify-center p-4">
                <div className="font-manga text-6xl text-[#38bdf8] opacity-20 select-none absolute">
                  जिज्ञासा
                </div>
                <span className="text-5xl">💻✨</span>
                <div className="mt-4 font-mono-tech text-xs text-[#38bdf8] text-center">
                  FIRST COMPILED PROGRAM: C++ HELLO WORLD
                </div>
              </div>

              <div className="relative border border-zinc-700 bg-zinc-900/90 p-3 text-white font-mono-tech text-xs rounded shadow-[4px_4px_0px_rgba(56,189,248,0.2)]">
                <span className="text-[#38bdf8] font-bold">&gt; TRANSITION PROTOCOL:</span>
                <p className="text-zinc-300 mt-1">
                  "Realizing that software is logic made tangible. The drive to engineer real systems took root."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CHAPTER 02: DTU GATEWAY MILESTONE */}
      {/* ========================================================= */}
      <div
        ref={scene2PinRef}
        className="relative z-20 w-full py-14 px-4 sm:px-8 bg-[#0b0b10] border-y border-zinc-800 flex flex-col items-center justify-center"
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] mb-8 text-left">
            <GraduationCap className="h-4 w-4" />
            <span>CHAPTER 02 // MILESTONE: DELHI TECHNOLOGICAL UNIVERSITY</span>
          </div>

          {/* Central DTU Gateway Emblem */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Sound FX Typography */}
            <div className="font-manga text-4xl sm:text-6xl text-[#38bdf8] tracking-tighter manga-fx-text mb-4">
              डीटीयू प्रवेश!!
            </div>

            {/* Gateway Plaque */}
            <div className="dtu-gate-seal relative w-64 sm:w-80 h-72 sm:h-80 border-2 border-zinc-600 bg-zinc-900 text-zinc-100 p-5 flex flex-col justify-between items-center shadow-[8px_8px_0px_rgba(56,189,248,0.3)] transition-all rounded-sm">
              <div className="font-manga text-[11px] tracking-widest text-zinc-400 text-center">
                DELHI TECHNOLOGICAL UNIVERSITY
              </div>

              {/* Central Devanagari Monogram */}
              <div className="dtu-kanji-burst font-manga text-4xl sm:text-5xl text-white tracking-wider select-none text-center">
                सूचना<br />प्रौद्योगिकी
              </div>

              <div className="border border-zinc-700 bg-zinc-950/80 px-2 py-1 text-center font-mono-tech text-[10px] text-zinc-300 font-bold">
                DEPT. OF INFORMATION TECHNOLOGY // BAWANA RD
              </div>
            </div>

            {/* Sequential Dialogue Lines */}
            <div className="mt-8 max-w-xl text-center space-y-2">
              <div className="journey-2-dialogue font-manga text-lg sm:text-2xl text-[#38bdf8]">
                「इंजीनियरिंग केवल कोड नहीं, समस्याओं का स्थायी समाधान है。」
              </div>
              <div className="journey-2-dialogue font-mono-tech text-xs sm:text-sm text-zinc-300">
                "Joining DTU Information Technology — immersing in Operating Systems, Database Management, and Algorithm Theory."
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CHAPTER 03: THE ALGORITHM ERA (C++ & 600+ SOLVED) */}
      {/* ========================================================= */}
      <div
        ref={scene3HorizRef}
        className="relative z-20 max-w-7xl mx-auto py-14 px-4 sm:px-8 space-y-6"
      >
        <div className="flex items-center justify-between font-mono-tech text-xs text-zinc-500 border-b border-zinc-800 pb-2">
          <span className="text-[#38bdf8] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            CHAPTER 03 // THE ALGORITHM ERA (C++ & 600+ SOLVED)
          </span>
          <span className="text-zinc-400">FOUR EVOLUTION PHASES</span>
        </div>

        {/* Responsive Manga Panel Grid — Fast, Fluid & Sober */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Panel A: C++ Kernel */}
          <div className="algo-card border border-zinc-700 bg-zinc-950 p-5 shadow-[6px_6px_0px_rgba(56,189,248,0.25)] flex flex-col justify-between rounded-sm">
            <div>
              <div className="font-manga text-xs text-[#38bdf8] mb-2">PHASE 01 // C++ KERNEL</div>
              <div className="h-44 bg-zinc-900 border border-zinc-800 relative flex items-center justify-center overflow-hidden mb-3">
                <div className="absolute inset-0 bg-halftone opacity-40" />
                <div className="text-center relative z-10">
                  <span className="text-5xl">⚡⌨️</span>
                  <div className="mt-2 font-mono-tech text-[11px] text-[#38bdf8] font-bold">
                    STL & MEMORY CONTROL
                  </div>
                </div>
              </div>
            </div>
            <p className="font-sans-tech text-xs text-zinc-300 leading-relaxed">
              "Mastering C++ STL vectors, heaps, bitsets, and cache-locality under strict competition timers."
            </p>
          </div>

          {/* Panel B: 600+ Accepted Submissions */}
          <div className="algo-card border border-zinc-700 bg-[#0e0e13] p-5 flex flex-col items-center justify-center text-center shadow-[6px_6px_0px_rgba(167,139,250,0.25)] rounded-sm">
            <span className="manga-fx-text text-5xl sm:text-6xl text-[#a78bfa] mb-3">समाधान!!</span>
            <div className="font-manga text-sm text-white mb-2">600+ ACCEPTED SUBMISSIONS</div>
            <p className="font-mono-tech text-[11px] text-zinc-400">
              Ranked in LeetCode contests, analyzing optimal time & space trade-offs across 650+ algorithmic challenges.
            </p>
          </div>

          {/* Panel C: Conquering Dynamic Programming */}
          <div className="algo-card border border-zinc-700 bg-zinc-950 p-5 shadow-[6px_6px_0px_rgba(56,189,248,0.25)] flex flex-col justify-between rounded-sm">
            <div>
              <div className="font-manga text-xs text-[#38bdf8] mb-2">PHASE 02 // DP & GRAPHS</div>
              <div className="h-44 bg-zinc-900 border border-zinc-800 relative flex items-center justify-center p-3 mb-3">
                <div className="font-manga text-7xl text-white/5 select-none absolute">कलन</div>
                <div className="relative z-10 text-center space-y-1">
                  <span className="text-4xl">🌲🕸️</span>
                  <p className="font-mono-tech text-[11px] text-[#38bdf8] font-bold">
                    GRAPH TRAVERSALS & MEMOIZATION
                  </p>
                </div>
              </div>
            </div>
            <p className="font-sans-tech text-xs text-zinc-300 leading-relaxed">
              "From Dijkstra and Tarjan to multidimensional knapsack tabulation — unlocking algorithmic intuition."
            </p>
          </div>

          {/* Panel D: Transitioning to Production Tools */}
          <div className="algo-card border border-zinc-700 bg-zinc-950 p-5 shadow-[6px_6px_0px_rgba(167,139,250,0.25)] flex flex-col justify-between rounded-sm">
            <div>
              <div className="font-manga text-xs text-[#a78bfa] mb-2">PHASE 03 // BEYOND SCRIPTS</div>
              <div className="h-44 bg-zinc-900 border border-zinc-800 relative flex items-center justify-center mb-3">
                <div className="text-center">
                  <span className="text-5xl">🛠️🚀</span>
                  <div className="mt-2 font-mono-tech text-[11px] text-[#a78bfa] font-bold">
                    PRODUCTION ARCHITECTURE
                  </div>
                </div>
              </div>
            </div>
            <p className="font-sans-tech text-xs text-zinc-300 leading-relaxed">
              "Transitioning from competitive scripts to full-stack architectures, databases, and automated tools."
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CHAPTER 04: DOUBLE PAGE SPREAD CLIMAX (BUILDING SYSTEMS) */}
      {/* ========================================================= */}
      <div
        ref={scene4SpreadRef}
        className="relative z-20 max-w-6xl mx-auto py-14 px-4 sm:px-8 text-center space-y-8"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-mono-tech text-xs text-zinc-500">
          <span>CHAPTER 04 // DOUBLE PAGE CLIMAX: BUILDING REAL-WORLD PRODUCTS</span>
          <span className="text-[#38bdf8]">DELHI // SYSTEMS DEPLOYED</span>
        </div>

        {/* Central Manga Boom */}
        <div className="climax-boom relative z-30 inline-block">
          <span className="manga-fx-text text-5xl sm:text-8xl text-[#38bdf8]">
            सृजन!!
          </span>
        </div>

        {/* Clashing Double Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Spread Left: Symbiote */}
          <div className="spread-left border border-zinc-700 bg-zinc-950 p-5 shadow-[8px_8px_0px_rgba(56,189,248,0.25)] text-left rounded-sm">
            <div className="font-manga text-xs text-[#38bdf8] mb-2">PAGE 18 // PROJECT SYMBIOTE</div>
            <div className="h-56 bg-[#0e0e13] border border-zinc-800 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 manga-speedlines opacity-50" />
              <div className="text-center relative z-10">
                <span className="font-manga text-5xl text-white block mb-2">शॉपिंग</span>
                <span className="font-mono-tech text-xs text-[#38bdf8]">MULTI-STORE INTELLIGENCE ENGINE</span>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-xs sm:text-sm text-zinc-300 leading-relaxed">
              "Headless Playwright scrapers, PostgreSQL pipelines, and AI assistance solving real e-commerce price fragmentation."
            </p>
          </div>

          {/* Spread Right: Code to Word Extension */}
          <div className="spread-right border border-zinc-700 bg-zinc-950 p-5 shadow-[8px_8px_0px_rgba(167,139,250,0.25)] text-left rounded-sm">
            <div className="font-manga text-xs text-[#a78bfa] mb-2">PAGE 19 // CODE TO WORD EXTENSION</div>
            <div className="h-56 bg-[#0e0e13] border border-zinc-800 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-halftone opacity-40" />
              <div className="text-center relative z-10">
                <span className="font-manga text-5xl text-[#a78bfa] block mb-2">दस्तावेज़</span>
                <span className="font-mono-tech text-xs text-[#38bdf8]">AUTOMATING DEVELOPER MANUALS</span>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-xs sm:text-sm text-zinc-300 leading-relaxed">
              "Automating university lab manual generation natively inside VS Code using OpenXML docx and AI routing."
            </p>
          </div>
        </div>

        {/* Chapter 05 Forward Objective */}
        <div className="mt-6 border border-zinc-800 bg-[#0e0e13] p-5 max-w-2xl mx-auto text-left font-mono-tech text-xs text-zinc-300 space-y-2 rounded-sm">
          <span className="text-[#38bdf8] font-bold block">// CHAPTER 05: WHAT'S NEXT</span>
          <p>
            Seeking <strong className="text-white">Software Engineering Internships</strong> where I can collaborate
            with engineering teams, tackle distributed systems challenges, and turn curiosity into resilient production code.
          </p>
        </div>
      </div>
    </section>
  );
};
