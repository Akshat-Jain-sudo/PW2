import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Send, ArrowUp, RefreshCw, Mail, FileText, Phone } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { AKSHAT_PROFILE } from '../data/portfolioData';

interface TransmissionSectionProps {
  onReboot: () => void;
  onResumeClick?: () => void;
}

export const TransmissionSection: React.FC<TransmissionSectionProps> = ({ onReboot, onResumeClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [transmitted, setTransmitted] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setEyePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerPortalCollapse = () => {
    soundFX.playGlitch();
    soundFX.playWarningAlarm();
    setCollapsed(true);
    setTimeout(() => setCollapsed(false), 3000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    soundFX.playBootBeep();
    setTransmitted(true);
    setTimeout(() => {
      setEmailInput('');
      setMessageInput('');
      setTransmitted(false);
    }, 4500);
  };

  const scrollToTop = () => {
    soundFX.playTypingClick();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-between py-24 px-4 sm:px-8 border-t border-[#17171C] overflow-hidden"
    >
      {/* Background screentone */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Screen collapse glitch effect */}
      {collapsed && (
        <div className="fixed inset-0 z-9999 bg-white mix-blend-difference pointer-events-none animate-ping" />
      )}

      <div className="relative z-20 max-w-5xl mx-auto w-full my-auto text-center space-y-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 border border-[#00E5FF] bg-[#00E5FF]/10 px-3.5 py-1 text-xs font-mono-tech text-[#00E5FF] tracking-widest uppercase">
          <ShieldCheck className="h-3.5 w-3.5 animate-pulse text-[#EFFF00]" />
          <span>TRANSMISSION AVAILABLE // SEEKING SWE INTERNSHIPS</span>
        </div>

        {/* The Cybernetic Core / Pupil Tracking Cursor */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full border-4 border-[#00E5FF] bg-black shadow-[0_0_50px_rgba(0,229,255,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-halftone opacity-30" />

            {/* Core Pupil Tracking Mouse */}
            <motion.div
              animate={{ x: eyePos.x, y: eyePos.y }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-linear-to-tr from-[#00E5FF] via-[#EFFF00] to-[#FF2E93] shadow-[0_0_20px_#00E5FF]"
            >
              <div className="h-6 w-2 sm:h-8 sm:w-2.5 rounded-full bg-black" />
            </motion.div>

            {/* Glowing Ring Emitters */}
            <div
              className="absolute inset-0 border border-dashed border-[#EFFF00]/50 rounded-full animate-spin"
              style={{ animationDuration: '15s' }}
            />
          </div>
        </div>

        {/* Section Headline */}
        <div className="space-y-4">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white">
            <span className="block text-white">LET'S BUILD SOMETHING</span>
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-[#00E5FF] via-[#EFFF00] to-[#FF2E93] glitch-text"
              data-text="THAT SHOULDN'T EXIST YET."
            >
              THAT SHOULDN'T EXIST YET.
            </span>
          </h2>

          <div className="space-y-1">
            <p className="font-manga text-xl sm:text-2xl text-[#EFFF00] tracking-wide glow-yellow">
              TRANSMISSION AVAILABLE // CONNECTION REQUESTED
            </p>
            <p className="font-mono-tech text-sm sm:text-base text-zinc-400 tracking-wider">
              NEW DELHI, INDIA TO THE GLOBAL SOFTWARE ECOSYSTEM
            </p>
          </div>
        </div>

        {/* Direct Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left font-mono-tech text-xs">
          <a
            href={`mailto:${AKSHAT_PROFILE.email}`}
            className="flex items-center gap-3 p-4 border border-zinc-800 bg-[#09090D] hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all text-white group"
          >
            <Mail className="h-5 w-5 text-[#00E5FF] group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-zinc-500 block text-[10px]">EMAIL INBOX</span>
              <span className="truncate block font-bold text-xs">{AKSHAT_PROFILE.email}</span>
            </div>
          </a>

          <a
            href={AKSHAT_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-zinc-800 bg-[#09090D] hover:border-[#EFFF00] hover:bg-[#EFFF00]/5 transition-all text-white group"
          >
            <svg className="h-5 w-5 fill-current text-[#EFFF00] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <div>
              <span className="text-zinc-500 block text-[10px]">GITHUB REPOSITORY</span>
              <span className="block font-bold text-xs">@Akshat-Jain-sudo</span>
            </div>
          </a>

          <a
            href={AKSHAT_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-zinc-800 bg-[#09090D] hover:border-[#FF2E93] hover:bg-[#FF2E93]/5 transition-all text-white group"
          >
            <svg className="h-5 w-5 fill-current text-[#FF2E93] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <div>
              <span className="text-zinc-500 block text-[10px]">LINKEDIN</span>
              <span className="block font-bold text-xs">Akshat Jain (DTU)</span>
            </div>
          </a>
        </div>

        {/* Recruiter Quick Actions & Discrete Phone */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto font-mono-tech text-xs">
          {onResumeClick && (
            <button
              onClick={() => {
                soundFX.playBootBeep();
                onResumeClick();
              }}
              className="flex items-center gap-2 border-2 border-[#EFFF00] bg-[#EFFF00] text-black px-5 py-2.5 font-bold hover:bg-white transition-all cursor-pointer shadow-[0_0_20px_rgba(239,255,0,0.3)]"
            >
              <FileText className="h-4 w-4" />
              <span>[ VIEW VERIFIED RESUME DOSSIER ]</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-zinc-500 text-[11px] border border-zinc-800 bg-[#09090D] px-3.5 py-2">
            <Phone className="h-3 w-3 text-zinc-400" />
            <span>PHONE: {AKSHAT_PROFILE.phone} (Discrete Line)</span>
          </div>
        </div>

        {/* Transmission Dispatch Form */}
        <div className="max-w-md mx-auto pt-6 border-t border-zinc-800/80">
          <p className="font-mono-tech text-xs text-zinc-400 mb-3">
            ESTABLISH DIRECT RELAY // TRANSMIT MESSAGE TO AKSHAT'S DESK
          </p>
          <form onSubmit={handleTransmit} className="space-y-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="your.email@domain.com"
              className="w-full border border-zinc-800 bg-[#09090D] px-3 py-2 text-xs font-mono-tech text-white placeholder-zinc-600 focus:border-[#00E5FF] focus:outline-none"
            />
            <textarea
              rows={3}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Hi Akshat, we're hiring software engineering interns..."
              className="w-full border border-zinc-800 bg-[#09090D] px-3 py-2 text-xs font-mono-tech text-white placeholder-zinc-600 focus:border-[#EFFF00] focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#EFFF00] text-black py-2.5 font-mono-tech text-xs font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>TRANSMIT MESSAGE SIGNAL</span>
            </button>
          </form>
          {transmitted && (
            <div className="mt-2 text-xs font-mono-tech text-[#00E5FF] animate-pulse">
              [+] MESSAGE RELAY ENCRYPTED AND DELIVERED TO AKSHAT JAIN.
            </div>
          )}
        </div>

        {/* Portal Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={triggerPortalCollapse}
            className="flex items-center gap-2 border border-[#FF2E93] bg-[#FF2E93]/10 px-4 py-2 font-mono-tech text-xs text-[#FF2E93] hover:bg-[#FF2E93] hover:text-black transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>TRIGGER CYBERNETIC COLLAPSE</span>
          </button>

          <button
            onClick={() => {
              soundFX.playBootBeep();
              onReboot();
            }}
            className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono-tech text-xs text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#00E5FF]" />
            <span>REBOOT SYSTEM OS</span>
          </button>
        </div>
      </div>

      {/* Cyberpunk Footer */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full pt-16 border-t border-[#17171C] mt-16 text-xs font-mono-tech text-zinc-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-manga text-sm">
              <span className="text-[#00E5FF]">अ</span>
              <span>AKSHAT JAIN</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Information Technology undergraduate at Delhi Technological University. Problem solver,
              C++ algorithmic builder, and backend systems explorer.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5">
            <span className="text-white block font-bold mb-2">TELEMETRY CHANNELS</span>
            <div>ORIGIN: NEW DELHI, INDIA</div>
            <div>COORDINATES: 28.6139°N / 77.2090°E</div>
            <div>STATUS: ACTIVELY BUILDING</div>
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5">
            <span className="text-white block font-bold mb-2">CAMPUS AFFILIATION</span>
            <div>DELHI TECHNOLOGICAL UNIVERSITY</div>
            <div>FORMERLY DCE (EST. 1941)</div>
            <div>DEPT: INFORMATION TECHNOLOGY</div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="text-white block font-bold mb-2">QUICK RETURN</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-[#EFFF00] hover:border-[#EFFF00] transition-colors cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>RETURN TO TOP</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-6 text-[10px] text-zinc-600 gap-2">
          <div>© {new Date().getFullYear()} AKSHAT JAIN // DELHI TECHNOLOGICAL UNIVERSITY</div>
          <div className="flex items-center gap-4">
            <span>INDIAN CYBERPUNK × DEVELOPER PORTFOLIO</span>
            <span>//</span>
            <span>THREE.JS + PIXIJS + GSAP + REACT SPRING</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
