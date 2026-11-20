import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ArrowDown, Radio, Shield, Zap, Compass, Activity, FileText } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';
import { soundFX } from '../utils/audio';
import { AKSHAT_PROFILE } from '../data/portfolioData';

const ROTATING_TEXTS = [
  'DATABASE OPTIMIZATION (797× GAIN).',
  '730+ LEETCODE TRANSMISSIONS.',
  'SYSTEMS & FULL-STACK ENGINES.',
  'FROM DELHI TO THE DIGITAL FRONTIER.',
];

interface HeroSectionProps {
  onResumeClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onResumeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Rotating headline index
  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
      soundFX.playCardHover();
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = -(e.clientY / innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Choreography for Hero Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          '.hero-line',
          {
            y: 70,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            skewY: 3,
          },
          '-=0.4'
        )
        .from(
          hudRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
          },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    soundFX.playTypingClick();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-8 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Graphic Grid & Manga Halftone */}
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />
      <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Decorative Indian Cyberpunk Watermark Glyph */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-manga text-[24vw] leading-none text-white/[0.025] tracking-tighter">
          अक्षत
        </span>
      </div>

      {/* Interactive 3D Developer Core & Particle Vortex */}
      <Hero3DScene mousePos={mousePos} />

      {/* Floating Coordinates HUD (Top-Right / Left) */}
      <div
        ref={hudRef}
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-wrap justify-between items-start gap-4 pointer-events-none select-none"
      >
        <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-mono-tech text-zinc-300">
          <Compass className="h-3.5 w-3.5 animate-spin text-[#38bdf8]" style={{ animationDuration: '8s' }} />
          <span>ORIGIN: 28.6139°N / 77.2090°E [DELHI TECHNOLOGICAL UNIVERSITY]</span>
        </div>

        <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-mono-tech text-zinc-300">
          <Activity className="h-3.5 w-3.5 text-[#38bdf8]" />
          <span>CURRENT CGPA: {AKSHAT_PROFILE.cgpa} // 1,200+ CP QUESTIONS</span>
        </div>
      </div>

      {/* Hero Centerpiece Typography */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto text-left py-12">
        {/* Top Badges */}
        <div ref={badgeRef} className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900/90 px-3 py-1 text-xs font-mono-tech font-bold text-zinc-200 tracking-wider rounded-xs">
            <Radio className="h-3.5 w-3.5 text-[#38bdf8] animate-pulse" />
            <span>DEVELOPER SIGNAL // NEW DELHI</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xs border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-mono-tech text-zinc-400">
            <Shield className="h-3 w-3 text-[#38bdf8]" />
            <span>DTU — INFORMATION TECHNOLOGY (2024–PRESENT)</span>
          </div>

          <span className="font-manga text-xs text-zinc-500 tracking-widest hidden sm:inline-block">
            【 दिल्ली प्रौद्योगिकी विश्वविद्यालय 】
          </span>
        </div>

        {/* Primary Cinematic Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tighter uppercase text-white mb-6"
        >
          <span className="hero-line block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            AKSHAT
          </span>
          <span className="hero-line block text-transparent bg-clip-text bg-linear-to-r from-[#38bdf8] via-[#a78bfa] to-white" data-text="JAIN">
            JAIN
          </span>
        </h1>

        {/* Dynamic Rotating Alert Text */}
        <div className="hero-line flex flex-wrap items-baseline gap-3 mb-6">
          <span className="font-mono-tech text-xs sm:text-sm text-zinc-400 uppercase tracking-widest">
            ENGINEERING FOCUS:
          </span>
          <div className="h-8 overflow-hidden inline-flex items-center">
            <motion.span
              key={rotatingIndex}
              initial={{ y: 20, opacity: 0, skewX: 10 }}
              animate={{ y: 0, opacity: 1, skewX: 0 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="font-manga text-xl sm:text-2xl md:text-3xl text-zinc-200"
            >
              {ROTATING_TEXTS[rotatingIndex]}
            </motion.span>
          </div>
        </div>

        {/* Professional Positioning Text */}
        <div className="hero-line mb-6">
          <span className="inline-block px-3 py-1 bg-zinc-950 border border-zinc-800 text-[#38bdf8] font-mono-tech text-xs sm:text-sm font-bold tracking-wider rounded-xs">
            {AKSHAT_PROFILE.positioning}
          </span>
        </div>

        {/* Subtitle Description */}
        <p className="hero-line max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 font-sans-tech leading-relaxed mb-10 border-l-2 border-[#38bdf8] pl-4">
          {AKSHAT_PROFILE.shortIntro}
        </p>

        {/* Interactive Motion Buttons */}
        <div className="hero-line flex flex-wrap items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('#projects')}
            className="group relative flex items-center gap-3 bg-zinc-100 text-black font-mono-tech font-extrabold text-sm sm:text-base px-6 py-3 tracking-wider uppercase cursor-pointer rounded-xs hover:bg-white transition-colors"
          >
            <span>[ EXPLORE PROJECTS ]</span>
            <Zap className="h-4 w-4 fill-black text-black group-hover:scale-110 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(56, 189, 248, 0.1)', borderColor: '#38bdf8' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundFX.playBootBeep();
              onResumeClick();
            }}
            className="flex items-center gap-3 border border-zinc-700 bg-zinc-900/80 text-white hover:text-[#38bdf8] font-mono-tech text-sm sm:text-base px-6 py-3 tracking-wider uppercase cursor-pointer backdrop-blur-sm transition-all rounded-xs"
          >
            <FileText className="h-4 w-4 text-[#38bdf8]" />
            <span>[ VIEW RESUME DOSSIER ]</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Bottom Telemetry Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-[#17171C] pt-4 text-xs font-mono-tech text-zinc-500 gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
            NODE: DTU BAWANA ROAD // SECTOR 17
          </span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-zinc-300 hidden md:inline">1,200+ CP QUESTIONS SOLVED</span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-zinc-300 hidden md:inline">CGPA: {AKSHAT_PROFILE.cgpa}</span>
        </div>

        <button
          onClick={() => scrollTo('#identity')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>EXPLORE ACADEMIC DOSSIER</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#38bdf8]" />
        </button>
      </div>
    </section>
  );
};
