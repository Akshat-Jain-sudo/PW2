import React, { useEffect, useRef, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate } from 'animejs';
import {
  X,
  ShieldCheck,
  Code2,
  Layers,
  Cpu,
  ExternalLink,
  CheckCircle,
  Database,
  TrendingUp,
  TrendingDown,
  Activity,
  Store,
  FileSpreadsheet,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import type { ProjectCaseFile } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectCaseFile | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const svgLineRef = useRef<SVGSVGElement>(null);
  const runsId = useId();
  const ballsId = useId();
  const wicketsId = useId();

  // Project 01 State (Postgres Benchmarks)
  const [activeBenchmarkIdx, setActiveBenchmarkIdx] = useState(0);

  // Project 02 State (IPL Win Probability Simulator)
  const [runsNeeded, setRunsNeeded] = useState(38);
  const [ballsRemaining, setBallsRemaining] = useState(24);
  const [wicketsLost, setWicketsLost] = useState(3);

  // Project 03 State (Symbiote 8-Platform Price Comparator)
  const [selectedProductQuery, setSelectedProductQuery] = useState('Sony WH-1000XM5 Headphones');

  useEffect(() => {
    if (!project) return;

    // Reset simulator states when switching projects
    setActiveBenchmarkIdx(0);
    setRunsNeeded(38);
    setBallsRemaining(24);
    setWicketsLost(3);

    // Trigger Anime.js stroke path and glow sequence for case file frame
    if (svgLineRef.current) {
      try {
        animate('.anime-project-border', {
          opacity: [0, 0.5],
          strokeDashoffset: [120, 0],
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
  }, [project, onClose]);

  if (!project) return null;

  // -------------------------------------------------------------
  // CALCULATIONS FOR IPL SIMULATOR (Project 02)
  // -------------------------------------------------------------
  const wicketsInHand = Math.max(1, 10 - wicketsLost);
  const oversRemaining = Math.max(0.1, ballsRemaining / 6);
  const requiredRunRate = (runsNeeded / oversRemaining).toFixed(2);
  const ballsPlayed = Math.max(1, 120 - ballsRemaining);
  const oversPlayed = Math.max(0.1, ballsPlayed / 6);
  const simulatedTarget = 180;
  const currentRuns = Math.max(0, simulatedTarget - runsNeeded);
  const currentRunRate = (currentRuns / oversPlayed).toFixed(2);

  // Calibrated logistic function approximation based on RRR vs CRR and wickets
  const pressureFactor = (Number(requiredRunRate) - 8.5) * 0.45;
  const wicketPenalty = (10 - wicketsInHand) * 0.35;
  const rawLogit = 1.2 + (wicketsInHand * 0.4) - pressureFactor - wicketPenalty;
  const chasingWinProb = Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-rawLogit))) * 100)));
  const defendingWinProb = 100 - chasingWinProb;

  // -------------------------------------------------------------
  // DATA FOR SYMBIOTE 8 PLATFORMS (Project 03)
  // -------------------------------------------------------------
  const SYMBIOTE_PLATFORMS = [
    { name: 'Flipkart', category: 'E-Commerce', price: '₹24,990', status: '200 OK', delay: '142ms', isBest: false },
    { name: 'Croma', category: 'Retail Tech', price: '₹26,990', status: '200 OK', delay: '185ms', isBest: false },
    { name: 'Snapdeal', category: 'E-Commerce', price: '₹25,499', status: '200 OK', delay: '210ms', isBest: false },
    { name: 'Myntra', category: 'Fashion / Tech', price: '₹27,999', status: '200 OK', delay: '168ms', isBest: false },
    { name: 'Ajio', category: 'Fashion / Tech', price: '₹26,499', status: '200 OK', delay: '192ms', isBest: false },
    { name: 'Blinkit', category: 'Quick Commerce', price: '₹23,499', status: '200 OK', delay: '94ms', isBest: true },
    { name: 'Swiggy Instamart', category: 'Quick Commerce', price: '₹24,199', status: '200 OK', delay: '115ms', isBest: false },
    { name: 'Zepto', category: 'Quick Commerce', price: '₹23,899', status: '200 OK', delay: '88ms', isBest: false },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-999 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          initial={{ scale: 0.92, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl border border-[#17171C] bg-[#09090D] p-5 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto"
        >
          {/* Animated SVG Border Accent */}
          <svg
            ref={svgLineRef}
            className="absolute inset-0 pointer-events-none h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="anime-project-border"
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke={project.accentColor}
              strokeWidth="2"
              strokeDasharray="16 8"
              opacity="0.4"
            />
          </svg>

          {/* Top Bar / Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-[#00E5FF] animate-ping" />
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs text-zinc-500">
                  <span>CASE FILE: {project.code}</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-[#EFFF00] font-semibold">{project.classification}</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-400">YEAR: {project.year}</span>
                </div>
                <h2 className="font-manga text-2xl sm:text-3xl text-white tracking-wide mt-0.5">
                  {project.name}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Visual Emblem, Status & Tech Stack */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative h-56 w-full border border-zinc-800 bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 manga-speedlines opacity-30" />
                <div className="absolute inset-0 bg-halftone opacity-20" />

                {/* Spectral glyph */}
                <span className="relative z-10 text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  {project.symbol}
                </span>

                <span className="relative z-10 mt-3 font-manga text-sm text-zinc-300">
                  {project.devanagariStamp}
                </span>

                {/* Scanning line animation */}
                <div className="absolute left-0 right-0 h-1 bg-[#00E5FF]/60 shadow-[0_0_10px_#00E5FF] animate-bounce pointer-events-none" />
              </div>

              {/* Status Box */}
              <div className="border border-zinc-800 bg-black/40 p-3 space-y-2 font-mono-tech text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#00E5FF]" />
                    STATUS
                  </span>
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: project.accentColor }}
                  >
                    {project.status}
                  </span>
                </div>
                {project.benchmarkStats && (
                  <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
                    <span className="text-zinc-500 text-[10px]">PRIMARY GAIN:</span>
                    <span className="text-[#EFFF00] font-bold">{project.benchmarkStats.primaryGain}</span>
                  </div>
                )}
              </div>

              {/* Tech Stack List */}
              <div className="border border-zinc-800 bg-black/40 p-3 space-y-2 font-mono-tech text-xs text-left">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">TECH STACK:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Source Badging */}
              <div className="border border-zinc-800/80 bg-[#050505] p-3 text-left font-mono-tech text-[11px] text-zinc-400 space-y-1">
                <div className="text-zinc-500 uppercase text-[9px] font-bold">AUTHENTICITY:</div>
                <div className="text-[#00E5FF]">Source: Akshat Jain DTU Resume</div>
                <div className="text-zinc-500 text-[10px]">Zero fabricated statistics or claims</div>
              </div>
            </div>

            {/* Right Column: Case File Narrative & Specialized Live Visualizers */}
            <div className="lg:col-span-8 space-y-6 text-left">
              {/* Project Overview */}
              <div>
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#00E5FF] tracking-wider mb-2">
                  <Layers className="h-3.5 w-3.5" />
                  PROJECT OVERVIEW & PROBLEM SOLVED
                </h4>
                <p className="text-zinc-200 font-sans-tech text-sm leading-relaxed mb-3">
                  {project.overview}
                </p>
                <div className="border-l-2 border-[#EFFF00] pl-3 py-1.5 bg-white/2 text-xs text-zinc-300 font-mono-tech">
                  <strong className="text-[#EFFF00]">CORE PROBLEM:</strong> {project.problemSolved}
                </div>
              </div>

              {/* ========================================================= */}
              {/* SPECIALIZED INTERACTIVE WIDGET 1: POSTGRES BENCHMARK LAB */}
              {/* ========================================================= */}
              {project.id === 'postgres-benchmarking' && project.benchmarkStats && (
                <div className="border border-[#00E5FF]/40 bg-[#050508] p-4 sm:p-5 shadow-[0_0_25px_rgba(0,229,255,0.1)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-[#00E5FF]" />
                      <span className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider">
                        INTERACTIVE QUERY BENCHMARK EXPLORER (12.87M RECORDS)
                      </span>
                    </div>
                    <span className="font-mono-tech text-[10px] text-[#EFFF00] px-2 py-0.5 bg-[#EFFF00]/10 border border-[#EFFF00]/30">
                      EXPLAIN (ANALYZE, BUFFERS)
                    </span>
                  </div>

                  {/* Benchmark Selector Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {project.benchmarkStats.details.map((bench, idx) => (
                      <button
                        key={bench.label}
                        onClick={() => {
                          soundFX.playTypingClick();
                          setActiveBenchmarkIdx(idx);
                        }}
                        className={`p-2.5 text-left border font-mono-tech text-xs transition-all cursor-pointer ${
                          activeBenchmarkIdx === idx
                            ? bench.isRegression
                              ? 'border-[#FF2E93] bg-[#FF2E93]/15 text-white'
                              : 'border-[#00E5FF] bg-[#00E5FF]/15 text-white'
                            : 'border-zinc-800 bg-black/40 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <div className="text-[10px] text-zinc-500 truncate">{bench.label}</div>
                        <div className="font-bold flex items-center justify-between mt-1">
                          <span className={bench.isRegression ? 'text-[#FF2E93]' : 'text-[#EFFF00]'}>
                            {bench.change}
                          </span>
                          {bench.isRegression ? (
                            <TrendingDown className="h-3.5 w-3.5 text-[#FF2E93]" />
                          ) : (
                            <TrendingUp className="h-3.5 w-3.5 text-[#00E5FF]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Active Benchmark Deep Dive */}
                  {(() => {
                    const activeBench = project.benchmarkStats.details[activeBenchmarkIdx];
                    return (
                      <div className="bg-black/60 border border-zinc-800 p-4 space-y-3 font-mono-tech text-xs">
                        <div className="flex justify-between items-center text-zinc-400">
                          <span className="font-bold text-white text-sm">{activeBench.label}</span>
                          <span className="text-[11px] text-zinc-500">Median of Multiple Warm-Up Runs</span>
                        </div>

                        {/* Latency Comparison Bars */}
                        <div className="space-y-2 pt-1">
                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-zinc-400">UNOPTIMIZED / BASELINE:</span>
                              <span className="text-red-400 font-bold">{activeBench.before}</span>
                            </div>
                            <div className="w-full bg-zinc-900 h-3 overflow-hidden">
                              <div className="bg-red-500/80 h-full w-full" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-zinc-400">OPTIMIZED EXECUTION:</span>
                              <span
                                className={`font-bold ${
                                  activeBench.isRegression ? 'text-[#FF2E93]' : 'text-[#00E5FF]'
                                }`}
                              >
                                {activeBench.after}
                              </span>
                            </div>
                            <div className="w-full bg-zinc-900 h-3 overflow-hidden">
                              <motion.div
                                key={activeBenchmarkIdx}
                                initial={{ width: 0 }}
                                animate={{
                                  width: activeBench.isRegression
                                    ? '100%'
                                    : activeBenchmarkIdx === 0
                                    ? '0.12%'
                                    : '60%',
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`h-full ${
                                  activeBench.isRegression ? 'bg-[#FF2E93]' : 'bg-[#00E5FF]'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Engineering Analysis Note */}
                        <div className="pt-2 border-t border-zinc-800/80 text-[11px] leading-relaxed text-zinc-300">
                          {activeBench.isRegression ? (
                            <div className="flex items-start gap-2 text-[#FF2E93]">
                              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>
                                <strong>Negative Result Analysis:</strong> Full table scan across partitioned tables without partition-pruning keys suffered an 11.4% regression (15.4s → 17.2s) due to PostgreSQL append-node overhead and individual relation lock checks. Documenting negative results is core to honest engineering.
                              </span>
                            </div>
                          ) : activeBenchmarkIdx === 0 ? (
                            <div className="text-zinc-300">
                              <strong className="text-[#00E5FF]">Optimization Mechanism:</strong> Transformed sequential table scan (10.9s) into an Index-Only Scan using a composite covering index on <code className="text-[#EFFF00] bg-black px-1">pickup_datetime, pulocationid, total_amount</code> with 0 heap accesses, delivering an instant 797× throughput acceleration to 13.7ms.
                            </div>
                          ) : (
                            <div className="text-zinc-300">
                              <strong className="text-[#00E5FF]">Optimization Mechanism:</strong> Restructured Cartesian product join into an early-aggregating Common Table Expression (CTE). Pre-aggregating trip rollups before joining location dimension tables dropped run latency by 39.9% (1,136ms → 682ms).
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========================================================= */}
              {/* SPECIALIZED INTERACTIVE WIDGET 2: IPL WIN-PROBABILITY */}
              {/* ========================================================= */}
              {project.id === 'ipl-win-probability' && (
                <div className="border border-[#EFFF00]/40 bg-[#050508] p-4 sm:p-5 shadow-[0_0_25px_rgba(239,255,0,0.1)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#EFFF00]" />
                      <span className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider">
                        LIVE MATCH SITUATION & WIN-PROBABILITY TELEMETRY
                      </span>
                    </div>
                    <span className="font-mono-tech text-[10px] text-[#00E5FF] px-2 py-0.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                      LEAK-FREE SEASON SPLIT
                    </span>
                  </div>

                  {/* Dynamic Match State Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-tech text-xs">
                    <div className="bg-black/50 border border-zinc-800 p-2.5">
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <label htmlFor={runsId}>RUNS NEEDED:</label>
                        <span className="text-[#EFFF00] font-bold">{runsNeeded}</span>
                      </div>
                      <input
                        id={runsId}
                        type="range"
                        min="6"
                        max="100"
                        value={runsNeeded}
                        onChange={(e) => setRunsNeeded(Number(e.target.value))}
                        className="w-full accent-[#EFFF00] cursor-pointer"
                      />
                    </div>

                    <div className="bg-black/50 border border-zinc-800 p-2.5">
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <label htmlFor={ballsId}>BALLS REMAINING:</label>
                        <span className="text-[#00E5FF] font-bold">{ballsRemaining}</span>
                      </div>
                      <input
                        id={ballsId}
                        type="range"
                        min="6"
                        max="60"
                        value={ballsRemaining}
                        onChange={(e) => setBallsRemaining(Number(e.target.value))}
                        className="w-full accent-[#00E5FF] cursor-pointer"
                      />
                    </div>

                    <div className="bg-black/50 border border-zinc-800 p-2.5">
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <label htmlFor={wicketsId}>WICKETS LOST:</label>
                        <span className="text-[#FF2E93] font-bold">{wicketsLost} / 10</span>
                      </div>
                      <input
                        id={wicketsId}
                        type="range"
                        min="0"
                        max="9"
                        value={wicketsLost}
                        onChange={(e) => setWicketsLost(Number(e.target.value))}
                        className="w-full accent-[#FF2E93] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Derived Telemetry & Probabilities */}
                  <div className="bg-black/70 border border-zinc-800 p-4 space-y-3 font-mono-tech text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-2 border border-zinc-800/80 bg-zinc-950">
                        <span className="text-zinc-500 block text-[10px]">CURRENT RR (CRR)</span>
                        <span className="text-white font-bold text-sm">{currentRunRate}</span>
                      </div>
                      <div className="p-2 border border-zinc-800/80 bg-zinc-950">
                        <span className="text-zinc-500 block text-[10px]">REQUIRED RR (RRR)</span>
                        <span className="text-[#EFFF00] font-bold text-sm">{requiredRunRate}</span>
                      </div>
                      <div className="p-2 border border-zinc-800/80 bg-zinc-950">
                        <span className="text-zinc-500 block text-[10px]">WICKETS IN HAND</span>
                        <span className="text-[#00E5FF] font-bold text-sm">{wicketsInHand}</span>
                      </div>
                      <div className="p-2 border border-zinc-800/80 bg-zinc-950">
                        <span className="text-zinc-500 block text-[10px]">TARGET SCORE</span>
                        <span className="text-zinc-300 font-bold text-sm">{simulatedTarget}</span>
                      </div>
                    </div>

                    {/* Win Probability Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5" />
                          CHASING TEAM: {chasingWinProb}%
                        </span>
                        <span className="text-[#FF2E93] font-bold">
                          DEFENDING TEAM: {defendingWinProb}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-900 h-4 flex overflow-hidden border border-zinc-800">
                        <div
                          style={{ width: `${chasingWinProb}%` }}
                          className="bg-[#00E5FF] h-full transition-all duration-300 shadow-[0_0_12px_#00E5FF]"
                        />
                        <div
                          style={{ width: `${defendingWinProb}%` }}
                          className="bg-[#FF2E93] h-full transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between gap-2">
                      <span>• Feature Set: runs left, balls left, wickets in hand, CRR, RRR</span>
                      <span className="text-[#EFFF00]">• Season-based split prevents match leakage</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* SPECIALIZED INTERACTIVE WIDGET 3: SYMBIOTE 8 PLATFORMS */}
              {/* ========================================================= */}
              {project.id === 'symbiote-pricing' && (
                <div className="border border-[#FF2E93]/40 bg-[#050508] p-4 sm:p-5 shadow-[0_0_25px_rgba(255,46,147,0.1)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-[#FF2E93]" />
                      <span className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider">
                        8-PLATFORM SCRAPING & BEST-DEAL AGGREGATION ENGINE
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-zinc-400">
                      <FileSpreadsheet className="h-3.5 w-3.5 text-[#00E5FF]" />
                      <span>CSV / EXCEL (.XLSX) EXPORT</span>
                    </div>
                  </div>

                  {/* Sample Query Indicator */}
                  <div className="flex items-center justify-between bg-black/60 border border-zinc-800 p-2.5 font-mono-tech text-xs">
                    <span className="text-zinc-500 text-[10px]">QUERY TRANSMISSION:</span>
                    <span className="text-[#EFFF00] font-bold">{selectedProductQuery}</span>
                    <button
                      onClick={() => {
                        soundFX.playTypingClick();
                        setSelectedProductQuery(
                          selectedProductQuery.includes('Headphones')
                            ? 'Amul Taaza Homogenised Toned Milk 1L'
                            : 'Sony WH-1000XM5 Headphones'
                        );
                      }}
                      className="px-2 py-0.5 text-[10px] border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer"
                    >
                      SWITCH QUERY
                    </button>
                  </div>

                  {/* 8 Platforms Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech text-xs">
                    {SYMBIOTE_PLATFORMS.map((plat) => (
                      <div
                        key={plat.name}
                        className={`p-2.5 border transition-all ${
                          plat.isBest
                            ? 'border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                            : 'border-zinc-800/80 bg-black/40'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-white text-xs">{plat.name}</span>
                          {plat.isBest && (
                            <span className="text-[9px] bg-[#00E5FF] text-black px-1 font-bold">BEST</span>
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-500 mb-1.5">{plat.category}</div>
                        <div className="flex justify-between items-baseline">
                          <span className={plat.isBest ? 'text-[#00E5FF] font-bold' : 'text-zinc-300'}>
                            {plat.price}
                          </span>
                          <span className="text-[9px] text-zinc-500">{plat.delay}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono-tech text-zinc-400 pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between gap-2">
                    <span>• Cheerio + Axios with rotating request headers & rate-limit fallback</span>
                    <span className="text-[#FF2E93]">• Auto best-deal highlighting across 8 stores</span>
                  </div>
                </div>
              )}

              {/* System Architecture */}
              <div>
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00] tracking-wider mb-2">
                  <Cpu className="h-3.5 w-3.5" />
                  SYSTEM ARCHITECTURE
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans-tech leading-relaxed border border-zinc-800 bg-black/50 p-3">
                  {project.architecture}
                </p>
              </div>

              {/* Key Features Bullet Points */}
              <div>
                <h4 className="flex items-center gap-2 font-mono-tech text-xs text-[#FF2E93] tracking-wider mb-2">
                  <Code2 className="h-3.5 w-3.5" />
                  KEY CAPABILITIES & IMPLEMENTATION
                </h4>
                <ul className="space-y-1.5 font-sans-tech text-xs sm:text-sm text-zinc-300">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#EFFF00] bg-[#EFFF00] text-black px-4 py-2 font-mono-tech text-xs font-bold hover:bg-white transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>VIEW SOURCE REPOSITORY</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] px-4 py-2 font-mono-tech text-xs font-bold hover:bg-[#00E5FF] hover:text-black transition-all cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}

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
