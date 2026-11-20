import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Send, ArrowUp, RefreshCw } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface TransmissionLostSectionProps {
  onReboot: () => void;
}

export const TransmissionLostSection: React.FC<TransmissionLostSectionProps> = ({ onReboot }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
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
      setTransmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    soundFX.playTypingClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="transmission-lost"
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
        {/* Warning Indicator */}
        <div className="inline-flex items-center gap-2 border border-[#FF2E93] bg-[#FF2E93]/10 px-3.5 py-1 text-xs font-mono-tech text-[#FF2E93] tracking-widest uppercase">
          <ShieldAlert className="h-3.5 w-3.5 animate-ping" />
          <span>PORTAL SINGULARITY WARNING</span>
        </div>

        {/* The Watching Eye / Rift Pupil */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full border-4 border-[#FF2E93] bg-black shadow-[0_0_50px_rgba(255,46,147,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-halftone opacity-30" />
            
            {/* Pupil Tracking Mouse */}
            <motion.div
              animate={{ x: eyePos.x, y: eyePos.y }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-linear-to-tr from-[#FF2E93] via-[#00E5FF] to-[#EFFF00] shadow-[0_0_20px_#FF2E93]"
            >
              <div className="h-6 w-2 sm:h-8 sm:w-2.5 rounded-full bg-black" />
            </motion.div>

            {/* Glowing Ring Emitters */}
            <div className="absolute inset-0 border border-dashed border-[#EFFF00]/50 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
          </div>
        </div>

        {/* Section Headline */}
        <div className="space-y-4">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E93] via-[#EFFF00] to-[#00E5FF] glitch-text" data-text="TRANSMISSION LOST.">
              TRANSMISSION LOST.
            </span>
          </h2>

          <div className="space-y-1">
            <p className="font-manga text-xl sm:text-2xl text-[#EFFF00] tracking-wide glow-yellow">
              CONNECTION TERMINATED
            </p>
            <p className="font-mono-tech text-sm sm:text-base text-zinc-400 tracking-wider">
              ...BUT SOMETHING IS STILL WATCHING.
            </p>
          </div>
        </div>

        {/* Portal Collapse Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerPortalCollapse}
            className="flex items-center gap-2 border-2 border-[#FF2E93] bg-[#FF2E93] px-6 py-3 font-mono-tech text-xs sm:text-sm font-bold text-black hover:bg-black hover:text-[#FF2E93] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,46,147,0.4)]"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>TRIGGER PORTAL COLLAPSE</span>
          </button>

          <button
            onClick={() => {
              soundFX.playBootBeep();
              onReboot();
            }}
            className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono-tech text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-[#00E5FF]" />
            <span>REBOOT SYSTEM OS</span>
          </button>
        </div>

        {/* Occult Frequency Signal Dispatch Form */}
        <div className="max-w-md mx-auto pt-6 border-t border-zinc-800/80">
          <p className="font-mono-tech text-xs text-zinc-400 mb-3">
            ESTABLISH RELAY BEACON // RECEIVE FUTURE ANOMALY INTRUSION ALERTS
          </p>
          <form onSubmit={handleTransmit} className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="frequency-receiver@domain.mil"
              className="flex-1 border border-zinc-800 bg-[#09090D] px-3 py-2 text-xs font-mono-tech text-white placeholder-zinc-600 focus:border-[#EFFF00] focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#EFFF00] text-black px-4 py-2 font-mono-tech text-xs font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>TRANSMIT</span>
            </button>
          </form>
          {transmitted && (
            <div className="mt-2 text-xs font-mono-tech text-[#00E5FF] animate-pulse">
              [+] ENCRYPTED FREQUENCY REGISTERED IN SECTOR IV DATABASE.
            </div>
          )}
        </div>
      </div>

      {/* Futuristic Cyberpunk Footer */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full pt-16 border-t border-[#17171C] mt-16 text-xs font-mono-tech text-zinc-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-manga text-sm">
              <span className="text-[#FF2E93]">呪</span>
              <span>PARANORMAL SYS_0X</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Experimental anime hacker terminal inspired by Dandadan occult folklore, extraterrestrial encounters, and dimensional rifts.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5">
            <span className="text-white block font-bold mb-2">TELEMETRY CHANNELS</span>
            <div>FREQ: 84.73 GHz</div>
            <div>SECTOR: 35.6895°N / 139.6917°E</div>
            <div>STATUS: UNCONTAINED BREACH</div>
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5">
            <span className="text-white block font-bold mb-2">CLEARANCE KEYS</span>
            <div>PROTOCOLS: OMEGA-9</div>
            <div>ENCRYPTION: SHINTO_AES256</div>
            <div>DAEMON: ACTIVE ON PORT 419</div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="text-white block font-bold mb-2">QUICK RETURN</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-[#EFFF00] hover:border-[#EFFF00] transition-colors cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>RETURN TO SURFACE</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-6 text-[10px] text-zinc-600 gap-2">
          <div>© 2026 PARANORMAL INTERCEPT SYSTEMS // SECTOR IV OCCULT DIVISION</div>
          <div className="flex items-center gap-4">
            <span>DANDADAN AESTHETIC HOMAGE</span>
            <span>//</span>
            <span>THREE.JS + PIXIJS + GSAP + MOTION</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
