import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate } from 'animejs';
import { X, ShieldAlert, AlertTriangle, Lock, Eye, Activity } from 'lucide-react';
import type { ParanormalEntity } from '../data/entities';
import { soundFX } from '../utils/audio';

interface DossierModalProps {
  entity: ParanormalEntity | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ entity, onClose }) => {
  const svgLineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!entity) return;

    // Trigger Anime.js stroke path and glow sequence for occult seal frame
    if (svgLineRef.current) {
      try {
        animate('.anime-border-path', {
          opacity: [0, 0.5],
          strokeDashoffset: [100, 0],
          duration: 800,
          ease: 'outQuad',
        });
      } catch {
        // Fallback gracefully
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playTypingClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [entity, onClose]);

  if (!entity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFX.playTypingClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl border border-[#17171C] bg-[#09090D] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
        >
          {/* Animated SVG Border Accent */}
          <svg
            ref={svgLineRef}
            className="absolute inset-0 pointer-events-none h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="anime-border-path"
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke={entity.visualTheme.accent}
              strokeWidth="2"
              strokeDasharray="16 8"
              opacity="0.4"
            />
          </svg>

          {/* Top Bar / Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-[#FF2E93] animate-ping" />
              <div>
                <div className="flex items-center gap-2 font-mono-tech text-xs text-zinc-500">
                  <span>TOP SECRET // SECTOR-IV CLASSIFIED FILE</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-[#00E5FF]">FREQ: {entity.frequency}</span>
                </div>
                <h2 className="font-manga text-2xl sm:text-3xl text-white tracking-wide">
                  {entity.name}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playTypingClick();
                onClose();
              }}
              className="flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-[#FF2E93] hover:text-[#FF2E93] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grid Layout: Visual Left + Details Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Visual Hologram & Threat Meter */}
            <div className="space-y-4">
              <div className="relative h-64 w-full border border-zinc-800 bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 manga-speedlines opacity-30" />
                <div className="absolute inset-0 bg-halftone opacity-20" />

                {/* Spectral glyph */}
                <span className="relative z-10 text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  {entity.visualTheme.symbol}
                </span>

                <span className="relative z-10 mt-3 font-manga text-sm text-zinc-300">
                  {entity.japaneseName}
                </span>

                {/* Scanning line animation */}
                <div className="absolute left-0 right-0 h-1 bg-[#00E5FF]/60 shadow-[0_0_10px_#00E5FF] animate-bounce pointer-events-none" />
              </div>

              {/* Threat Gauge Box */}
              <div className="border border-zinc-800 bg-black/40 p-3 space-y-2 font-mono-tech text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-[#FF2E93]" />
                    THREAT INDEX
                  </span>
                  <span
                    className="font-bold"
                    style={{ color: entity.visualTheme.accent }}
                  >
                    {entity.threatLevel} ({entity.threatGauge}/100)
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-900 overflow-hidden rounded-full">
                  <div
                    className="h-full"
                    style={{
                      width: `${entity.threatGauge}%`,
                      backgroundColor: entity.visualTheme.accent,
                    }}
                  />
                </div>
              </div>

              {/* Telemetry quick specs */}
              <div className="border border-zinc-800 bg-black/40 p-3 space-y-2 font-mono-tech text-[11px] text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-600">LOC:</span>
                  <span className="text-right text-zinc-300 truncate max-w-[170px]">{entity.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">STATUS:</span>
                  <span className="text-right font-bold text-[#EFFF00]">{entity.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">RESONANCE:</span>
                  <span className="text-right text-[#00E5FF]">{entity.attributes.psychicResonance}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Dossier, Specs & Containment Protocol */}
            <div className="md:col-span-2 space-y-5 text-left">
              {/* Full Description Dossier */}
              <div>
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00] tracking-wider mb-2">
                  <Eye className="h-3.5 w-3.5" />
                  INCIDENT LOG & BIO-TELEMETRY
                </h4>
                <p className="text-zinc-300 font-sans-tech text-sm leading-relaxed border-l-2 border-[#EFFF00] pl-3 py-1 bg-white/2">
                  {entity.fullDossier}
                </p>
              </div>

              {/* Attributes Matrix */}
              <div>
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#00E5FF] tracking-wider mb-3">
                  <Activity className="h-3.5 w-3.5" />
                  SPECTRAL COMBAT SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono-tech text-xs">
                  <div className="border border-zinc-800 bg-black/50 p-2.5">
                    <span className="text-zinc-500 block text-[10px]">SPEED:</span>
                    <span className="text-white font-bold">{entity.attributes.speed}</span>
                  </div>
                  <div className="border border-zinc-800 bg-black/50 p-2.5">
                    <span className="text-zinc-500 block text-[10px]">LETHALITY:</span>
                    <span className="text-[#FF2E93] font-bold">{entity.attributes.lethality}</span>
                  </div>
                  <div className="border border-zinc-800 bg-black/50 p-2.5">
                    <span className="text-zinc-500 block text-[10px]">DIMENSIONS:</span>
                    <span className="text-zinc-200 font-bold">{entity.attributes.dimensions}</span>
                  </div>
                  <div className="border border-zinc-800 bg-black/50 p-2.5">
                    <span className="text-zinc-500 block text-[10px]">FREQUENCY:</span>
                    <span className="text-[#00E5FF] font-bold">{entity.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Containment Protocol */}
              <div className="border border-[#FF2E93]/40 bg-[#FF2E93]/10 p-4 rounded-xs">
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#FF2E93] font-bold tracking-wider mb-2">
                  <Lock className="h-3.5 w-3.5" />
                  CONTAINMENT / EXORCISM PROTOCOL
                </h4>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans-tech leading-relaxed">
                  {entity.containmentProtocol}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    soundFX.playGlitch();
                    soundFX.playWarningAlarm();
                  }}
                  className="flex items-center gap-2 border border-[#FF2E93] bg-[#FF2E93]/20 px-4 py-2 font-mono-tech text-xs font-bold text-[#FF2E93] hover:bg-[#FF2E93] hover:text-black transition-all cursor-pointer"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>TRANSMIT DISTRESS FREQUENCY</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playTypingClick();
                    onClose();
                  }}
                  className="border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono-tech text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  RETURN TO ARCHIVE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
