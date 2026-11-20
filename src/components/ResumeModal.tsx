import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Award, GraduationCap, Database, Code2 } from 'lucide-react';
import { AKSHAT_PROFILE, ACADEMIC_SEMESTERS, PROJECTS_ARCHIVE, CERTIFICATIONS_ARCHIVE } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFX.playBootBeep();
    window.print();
  };

  const copyEmail = () => {
    soundFX.playTypingClick();
    navigator.clipboard.writeText(AKSHAT_PROFILE.email);
    alert('Email copied to clipboard: ' + AKSHAT_PROFILE.email);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-99999 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFX.playTypingClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl border border-zinc-800 bg-[#09090D] p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto text-left"
        >
          {/* Top Actions Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#00E5FF]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00E5FF] animate-ping" />
              <span className="font-bold">AKSHAT_JAIN_RESUME_VERIFIED.pdf</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">DTU B.TECH IT (CGPA: {AKSHAT_PROFILE.cgpa})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono-tech text-xs text-zinc-300 hover:text-white hover:border-[#EFFF00] transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>PRINT / PDF</span>
              </button>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-3 py-1.5 font-mono-tech text-xs text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-all cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>COPY EMAIL</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTypingClick();
                  onClose();
                }}
                className="flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-[#FF2E93] hover:text-[#FF2E93] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="space-y-6 text-zinc-200 font-sans-tech">
            {/* Header: Name, Contact & Positioning */}
            <div className="border-b border-zinc-800/80 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {AKSHAT_PROFILE.name}
                </h1>
                <span className="font-mono-tech text-xs text-[#EFFF00] font-bold">
                  NEW DELHI, INDIA // {AKSHAT_PROFILE.phone}
                </span>
              </div>

              <div className="mt-1 font-mono-tech text-xs text-[#00E5FF] font-semibold tracking-wide">
                {AKSHAT_PROFILE.positioning}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans-tech">
                {AKSHAT_PROFILE.shortIntro}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 font-mono-tech text-xs text-zinc-400">
                <a href={`mailto:${AKSHAT_PROFILE.email}`} className="text-[#00E5FF] hover:underline flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> {AKSHAT_PROFILE.email}
                </a>
                <a href={AKSHAT_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#EFFF00] hover:underline flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn: in/akshat-jain-7b92a5313</span>
                </a>
                <a href={AKSHAT_PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:underline flex items-center gap-1">
                  GitHub: @Akshat-Jain-sudo
                </a>
              </div>
            </div>

            {/* Academic Dossier */}
            <div>
              <h2 className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#EFFF00] uppercase tracking-wider mb-3">
                <GraduationCap className="h-4 w-4" />
                ACADEMIC RECORD & EDUCATION
              </h2>

              <div className="border border-zinc-800 bg-black/40 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">Delhi Technological University (DTU)</h3>
                    <p className="text-xs text-zinc-400 font-mono-tech">
                      Bachelor of Technology (B.Tech) — Information Technology | {AKSHAT_PROFILE.duration}
                    </p>
                  </div>
                  <div className="text-right mt-1 sm:mt-0 font-mono-tech">
                    <span className="text-xs text-zinc-400 block">CURRENT CUMULATIVE:</span>
                    <span className="text-base font-bold text-[#00E5FF]">CGPA: {AKSHAT_PROFILE.cgpa} / 10.0</span>
                  </div>
                </div>

                {/* Semester SGPA Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-900 font-mono-tech text-xs">
                  {ACADEMIC_SEMESTERS.map((sem) => (
                    <div key={sem.semester} className="bg-zinc-900/60 p-2 border border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px]">{sem.semester}:</span>
                      <span className="font-bold text-white">{sem.sgpa.toFixed(2)} SGPA</span>
                    </div>
                  ))}
                </div>

                {/* Honors */}
                <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono-tech">
                  <span className="px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                    JEE Main: AIR 6690 (99.59 %ile)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#EFFF00]/10 text-[#EFFF00] border border-[#EFFF00]/30">
                    JEE Advanced: AIR 8417
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-zinc-800">
                    CBSE Class XII: 96.2% (Math 100/100, CS 99/100)
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Engineering Projects */}
            <div>
              <h2 className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-3">
                <Database className="h-4 w-4" />
                FEATURED ENGINEERING PROJECTS
              </h2>

              <div className="space-y-4">
                {PROJECTS_ARCHIVE.slice(0, 3).map((proj) => (
                  <div key={proj.id} className="border border-zinc-800 bg-black/40 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-2 mb-2 gap-1">
                      <div>
                        <span className="font-bold text-white text-sm mr-2">{proj.name}</span>
                        <span className="text-xs font-mono-tech text-[#00E5FF]">{proj.classification}</span>
                      </div>
                      <span className="font-mono-tech text-xs text-zinc-500">{proj.year}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                      {proj.overview}
                    </p>

                    {/* Benchmark Metrics Highlight */}
                    {proj.benchmarkStats && (
                      <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono-tech text-[11px]">
                        {proj.benchmarkStats.details.map((b, idx) => (
                          <div key={idx} className={`p-2 border ${b.isRegression ? 'border-[#FF2E93]/40 bg-[#FF2E93]/10 text-[#FF2E93]' : 'border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]'}`}>
                            <span className="block text-[10px] text-zinc-400">{b.label}</span>
                            <span className="font-bold block">{b.before} &rarr; {b.after}</span>
                            <span className="text-[10px]">{b.change}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 font-mono-tech text-[10px] text-zinc-400">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="bg-zinc-900 px-2 py-0.5 border border-zinc-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills & Problem Solving */}
            <div>
              <h2 className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#FF2E93] uppercase tracking-wider mb-3">
                <Code2 className="h-4 w-4" />
                TECHNICAL SKILLS & PROBLEM SOLVING
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-zinc-800 bg-black/40 p-4 font-mono-tech text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">PROGRAMMING LANGUAGES:</span>
                  <span className="text-white font-bold">C++ (Primary), C, Python, SQL</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">DATABASES & DATA TOOLS:</span>
                  <span className="text-[#00E5FF] font-bold">PostgreSQL, MySQL, Firebase, exceljs, json2csv</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">FRAMEWORKS & LIBRARIES:</span>
                  <span className="text-zinc-300">Polars, FastAPI, Pandas, NumPy, scikit-learn, Matplotlib</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">ALGORITHMIC PROBLEM SOLVING:</span>
                  <span className="text-[#EFFF00] font-bold">{AKSHAT_PROFILE.dsaCount} LeetCode Problems Solved</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">AI & DEVELOPER APIS:</span>
                  <span className="text-zinc-300">Gemini API, OpenAI API, Ollama, Claude API, Antigravity</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">DEVELOPER TOOLS:</span>
                  <span className="text-zinc-300">Git, GitHub, Docker, Tableau, VS Code</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#EFFF00] uppercase tracking-wider mb-2">
                <Award className="h-4 w-4" />
                VERIFIED CERTIFICATIONS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-tech text-xs">
                {CERTIFICATIONS_ARCHIVE.map((c) => (
                  <div key={c.id} className="border border-zinc-800/80 bg-zinc-950 p-2.5">
                    <span className="font-bold text-white block text-xs truncate">{c.title}</span>
                    <span className="text-[10px] text-[#00E5FF]">{c.issuer} ({c.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
