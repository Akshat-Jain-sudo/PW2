import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Zap, Menu, X, Clock, FileText } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { AKSHAT_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onTriggerGlitch?: () => void;
  onResumeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerGlitch, onResumeClick }) => {
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [indiaTime, setIndiaTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = soundFX.subscribe((muted) => {
      setIsMuted(muted);
    });

    // Update India Standard Time (IST)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIndiaTime(`${now.toLocaleTimeString('en-GB', options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      unsubscribe();
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    const newMuted = soundFX.toggleMute();
    setIsMuted(newMuted);
  };

  const navItems = [
    { label: '// HOME', href: '#hero' },
    { label: '// ABOUT', href: '#identity' },
    { label: '// SKILLS', href: '#skills' },
    { label: '// PROJECTS', href: '#projects' },
    { label: '// JOURNEY', href: '#journey' },
    { label: '// ACHIEVEMENTS', href: '#achievements' },
    { label: '// CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFX.playTypingClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      // Use non-smooth scrollIntoView so Lenis handles the smooth animation
      // scrollIntoView with behavior:'smooth' conflicts with Lenis smooth scrolling
      target.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-[#17171C] py-2.5 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand & Indian Cyberpunk Moniker */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 text-left"
          >
            <div className="relative flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-900 shadow-sm transition-transform group-hover:scale-105 rounded">
              <span className="font-manga text-sm text-[#38bdf8]">अ</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-manga text-sm tracking-wider text-white group-hover:text-[#38bdf8] transition-colors">
                <span>AKSHAT JAIN</span>
              </div>
              <div className="font-mono-tech text-[9px] text-zinc-400 tracking-tighter">
                DTU IT // CGPA: {AKSHAT_PROFILE.cgpa}
              </div>
            </div>
          </a>

          {/* India Time Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-mono-tech text-zinc-300">
            <Clock className="h-3 w-3 text-[#38bdf8]" />
            <span className="text-zinc-400">DELHI:</span>
            <span className="font-bold text-zinc-200">{indiaTime || 'IST'}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          </div>
        </div>

        {/* Center: Recruiter Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-2.5 py-1.5 font-mono-tech text-xs tracking-tight text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-all duration-150 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Resume Button, Sound Toggle, Glitch Pulse, & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Recruiter Resume Button */}
          <button
            onClick={() => {
              soundFX.playBootBeep();
              onResumeClick();
            }}
            className="flex items-center gap-1.5 border border-[#38bdf8] bg-[#38bdf8]/15 px-3.5 py-1 font-mono-tech text-xs font-bold text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all cursor-pointer rounded"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>RESUME</span>
          </button>

          {/* Glitch Burst Button */}
          <button
            onClick={() => {
              soundFX.playGlitch();
              onTriggerGlitch?.();
            }}
            title="Inject Cyberpunk Signal Glitch"
            className="hidden sm:flex items-center gap-1.5 border border-zinc-700 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono-tech text-zinc-400 hover:border-zinc-500 hover:text-white transition-all cursor-pointer rounded"
          >
            <Zap className="h-3 w-3 text-[#a78bfa]" />
            <span>GLITCH</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 rounded border px-3 py-1 font-mono-tech text-xs transition-all cursor-pointer ${
              !isMuted
                ? 'border-zinc-600 bg-zinc-800 text-zinc-200'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span className="hidden sm:inline font-bold">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-zinc-400">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFX.playTypingClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#17171C] bg-[#09090D] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-3 py-2 font-mono-tech text-sm text-zinc-300 hover:text-[#EFFF00] hover:bg-white/5 rounded"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResumeClick();
              }}
              className="text-[#EFFF00] font-bold flex items-center gap-1.5"
            >
              <FileText className="h-4 w-4" />
              VIEW RESUME DOSSIER
            </button>
            <button
              onClick={() => {
                soundFX.playGlitch();
                onTriggerGlitch?.();
              }}
              className="text-[#FF2E93] underline"
            >
              TRIGGER GLITCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
