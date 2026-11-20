import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Terminal, Volume2, VolumeX, FastForward } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'Signal intercept detected: Frequency 28.61°N / 77.20°E [NEW DELHI]',
  'Connecting to node: Delhi Technological University (DTU)',
  'Scanning algorithmic transmissions: 600+ DSA problem solutions indexed',
  'Initializing core foundations: C++, Data Structures, Backend Architecture',
  'Decrypting project archives: [ SYMBIOTE // CODE_TO_WORD // FRESHCART_3D ]',
  'Target identified: AKSHAT JAIN (Information Technology Undergraduate)',
  '>> ACCESS GRANTED: WELCOME, AKSHAT JAIN <<',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let logIndex = 0;
    let charIndex = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        if (!isCancelled) {
          setIsComplete(true);
          soundFX.playBootBeep();
          setTimeout(() => {
            onComplete();
          }, 600);
        }
      },
    });

    // Animate progress bar from 0 to 100
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 3.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (!isCancelled) {
          setProgress(Math.floor(progressObj.val));
        }
      },
    });

    // Typewriter effect loop
    const typeNextChar = () => {
      if (isCancelled) return;

      if (logIndex < BOOT_LOGS.length) {
        const fullLine = BOOT_LOGS[logIndex];

        if (charIndex < fullLine.length) {
          const char = fullLine[charIndex];
          setCurrentLine((prev) => prev + char);
          charIndex++;
          soundFX.playTypingClick();

          const delay = Math.random() * 20 + 15;
          setTimeout(typeNextChar, delay);
        } else {
          // Line finished, push to history
          setDisplayedLogs((prev) => [...prev, fullLine]);
          setCurrentLine('');
          charIndex = 0;
          logIndex++;
          setTimeout(typeNextChar, 180);
        }
      }
    };

    const typingTimer = setTimeout(typeNextChar, 400);

    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Escape' || e.key === 'Enter') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isCancelled = true;
      tl.kill();
      clearTimeout(typingTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const skipBoot = () => {
    soundFX.playBootBeep();
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power3.out',
        onComplete,
      });
    } else {
      onComplete();
    }
  };

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col justify-between bg-[#050505] p-6 sm:p-12 font-mono-tech select-none overflow-hidden"
    >
      {/* CRT Scanline & Grain Texture */}
      <div className="scanlines absolute inset-0 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between border-b border-[#17171C] pb-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-[#EFFF00] animate-pulse" />
          <span className="font-manga text-lg sm:text-xl tracking-wider text-white">
            SIGNAL FROM INDIA // AKSHAT JAIN
          </span>
          <span className="hidden sm:inline-block rounded bg-[#00E5FF]/20 border border-[#00E5FF] px-2 py-0.5 text-[10px] text-[#00E5FF] font-bold">
            DTU_IT_TRANSMISSION
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300 hover:border-[#EFFF00] hover:text-[#EFFF00] transition-colors cursor-pointer"
          >
            {!isMuted ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-[#EFFF00]" />
                <span className="hidden sm:inline">SOUND ENABLED</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-zinc-500">MUTED</span>
              </>
            )}
          </button>

          {/* Quick Skip Button */}
          <button
            onClick={skipBoot}
            className="group flex items-center gap-2 border border-[#EFFF00] bg-[#EFFF00]/10 px-3 py-1 text-xs font-bold text-[#EFFF00] hover:bg-[#EFFF00] hover:text-black transition-all cursor-pointer shadow-[0_0_10px_rgba(239,255,0,0.2)]"
          >
            <span>SKIP BOOT</span>
            <FastForward className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Center Terminal Box */}
      <div className="relative z-20 my-auto max-w-3xl w-full mx-auto border border-[#17171C] bg-[#09090D]/90 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] font-bold">DEV_DAEMON://NEW_DELHI_INTERCEPT</span>
          </div>
          <span>ORIGIN: 28.6139°N / 77.2090°E</span>
        </div>

        {/* Developer Identification Banner */}
        <div className="mb-4 flex items-center gap-2 rounded border border-[#00E5FF] bg-[#00E5FF]/10 p-2 text-xs text-[#00E5FF]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#EFFF00]" />
          <span className="font-bold">STATUS: INTERCEPTING DEVELOPER SIGNATURE (DTU INFORMATION TECHNOLOGY)</span>
        </div>

        {/* Log Stream */}
        <div ref={logContainerRef} className="min-h-[160px] space-y-1.5 text-xs sm:text-sm">
          <div className="font-manga text-[#EFFF00] text-sm sm:text-base tracking-wide">
            INITIALIZING SYSTEM...
          </div>

          {displayedLogs.map((log, index) => (
            <div
              key={index}
              className={`leading-relaxed ${
                log.includes('AKSHAT JAIN')
                  ? 'text-[#EFFF00] font-bold'
                  : log.includes('ACCESS GRANTED')
                  ? 'text-[#00E5FF] font-bold glow-cyan'
                  : 'text-zinc-300'
              }`}
            >
              <span className="text-zinc-600 mr-2">&gt;</span>
              {log}
            </div>
          ))}

          {currentLine && (
            <div className="text-zinc-200">
              <span className="text-zinc-600 mr-2">&gt;</span>
              {currentLine}
              <span className="inline-block w-2 h-4 bg-[#EFFF00] ml-1 animate-pulse align-middle" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-xs text-zinc-400">
            <span className="text-[#00E5FF]">DECRYPTING DEVELOPER MANIFEST</span>
            <span className="text-[#EFFF00] font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-linear-to-r from-[#00E5FF] via-[#FF2E93] to-[#EFFF00] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Info */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between border-t border-[#17171C] pt-4 text-[11px] text-zinc-600 gap-2">
        <div>NODE: DTU_IT_CAMPUS // NEW_DELHI_INDIA</div>
        <div className="text-zinc-500">PRESS [SPACE] OR CLICK SKIP TO BYPASS INTERCEPT</div>
        <div className="text-[#00E5FF]">PROFILE: {isComplete ? 'ONLINE' : 'DECRYPTING...'}</div>
      </div>
    </div>
  );
};
