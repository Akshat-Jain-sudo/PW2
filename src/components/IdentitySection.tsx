import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, GraduationCap, Code2, CheckCircle2, Award, Globe2 } from 'lucide-react';
import { AKSHAT_PROFILE, ACADEMIC_SEMESTERS, ACADEMIC_HONORS, TECHNICAL_SKILLS, CERTIFICATIONS_ARCHIVE } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const IdentitySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('PROGRAMMING LANGUAGES');
  const [activeSemIndex, setActiveSemIndex] = useState<number>(3); // Default to latest Sem IV

  const handleCategoryClick = (cat: string) => {
    soundFX.playTypingClick();
    setActiveCategory(cat);
  };

  const currentCategoryData = TECHNICAL_SKILLS.find((c) => c.category === activeCategory) || TECHNICAL_SKILLS[0];

  return (
    <section
      id="identity"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-8 mb-12 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] tracking-wider mb-2">
              <Shield className="h-4 w-4" />
              <span>// 02. INTERCEPTED DOSSIER: DEVELOPER PROFILE & EDUCATION</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              IDENTITY // <span className="text-[#38bdf8]">AKSHAT JAIN</span>
            </h2>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm sm:text-base">
              {AKSHAT_PROFILE.positioning}
            </p>
          </div>

          {/* Real Status Badge */}
          <div className="flex items-center gap-3 font-mono-tech text-xs">
            <div className="border border-zinc-800 bg-[#0e0e13] px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">CUMULATIVE CGPA:</span>
              <span className="text-xl font-bold text-white">{AKSHAT_PROFILE.cgpa} / 10.0</span>
            </div>
            <div className="border border-zinc-800 bg-[#0e0e13] px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">TOTAL CP SOLVED:</span>
              <span className="text-xl font-bold text-[#38bdf8]">1,200+ PROBLEMS</span>
            </div>
          </div>
        </div>

        {/* Top Grid: Bio Left + Interactive Academic Semester Breakdown Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left: Intercepted Bio Dossier Card */}
          <div className="lg:col-span-7 border border-[#17171C] bg-[#09090D] p-6 sm:p-8 text-left relative overflow-hidden identity-card shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 p-4 font-manga text-7xl text-white/[0.03] select-none pointer-events-none">
              अभि
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="font-mono-tech text-xs text-zinc-300 font-bold">
                  DOSSIER #001 // CLASSIFICATION: SOFTWARE ENGINEER IN PROGRESS
                </span>
              </div>
              <span className="text-[10px] font-mono-tech bg-white/5 border border-zinc-700 px-2 py-0.5 text-zinc-400">
                VERIFIED RESUME RECORD
              </span>
            </div>

            {/* Core Bio Content verbatim from prompt */}
            <div className="space-y-4 text-zinc-200 font-sans-tech text-sm sm:text-base leading-relaxed mb-6">
              <p className="border-l-2 border-[#38bdf8] pl-4 bg-white/2 py-1">
                {AKSHAT_PROFILE.shortIntro}
              </p>
            </div>

            {/* Key Relevant Coursework */}
            <div className="mb-6 border-t border-zinc-800 pt-4">
              <span className="text-zinc-500 block text-[10px] font-mono-tech uppercase mb-2">
                VERIFIED ACADEMIC COURSEWORK:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono-tech text-[11px]">
                {AKSHAT_PROFILE.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 rounded bg-black/60 border border-zinc-800 text-zinc-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-2.5 p-2.5 bg-black/50 border border-zinc-800/80">
                <MapPin className="h-4 w-4 text-[#FF2E93] shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[10px]">LOCATION</span>
                  <span className="text-white font-bold">{AKSHAT_PROFILE.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-black/50 border border-zinc-800/80">
                <Globe2 className="h-4 w-4 text-[#00E5FF] shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[10px]">LANGUAGES</span>
                  <span className="text-[#00E5FF] font-bold">{AKSHAT_PROFILE.languages.join(' • ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Academic Matrix & Semester Performance Visualization */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-[#17171C] bg-[#09090D] p-6 sm:p-8 text-left space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 font-mono-tech text-xs">
                <span className="text-[#00E5FF] flex items-center gap-1.5 font-bold">
                  <GraduationCap className="h-4 w-4 text-[#00E5FF]" />
                  DELHI TECHNOLOGICAL UNIVERSITY
                </span>
                <span className="text-[#EFFF00] font-bold">CGPA: {AKSHAT_PROFILE.cgpa}</span>
              </div>

              <div className="mb-2">
                <h3 className="font-manga text-xl text-white">
                  B.TECH IN INFORMATION TECHNOLOGY
                </h3>
                <p className="font-mono-tech text-xs text-zinc-400">
                  {AKSHAT_PROFILE.universityFormer} | {AKSHAT_PROFILE.duration}
                </p>
              </div>

              {/* Interactive Semester Performance Graph / Bars */}
              <div className="mt-4 border border-zinc-800 bg-black/60 p-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono-tech">
                  <span className="text-zinc-400 font-bold">SEMESTER PERFORMANCE BREAKDOWN</span>
                  <span className="text-[#00E5FF]">{ACADEMIC_SEMESTERS[activeSemIndex].period}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {ACADEMIC_SEMESTERS.map((sem, idx) => (
                    <button
                      key={sem.semester}
                      onClick={() => {
                        soundFX.playTypingClick();
                        setActiveSemIndex(idx);
                      }}
                      className={`p-2 border text-center transition-all cursor-pointer font-mono-tech ${
                        activeSemIndex === idx
                          ? 'border-[#38bdf8] bg-[#38bdf8]/15 text-white shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <span className="block text-[10px] text-zinc-400">{sem.semester.replace('Semester ', 'Sem ')}</span>
                      <span className="block text-sm font-bold text-white">{sem.sgpa.toFixed(2)}</span>
                    </button>
                  ))}
                </div>

                {/* Progress Visual Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-mono-tech mb-1">
                    <span className="text-zinc-400">{ACADEMIC_SEMESTERS[activeSemIndex].semester} SGPA</span>
                    <span className="font-bold text-[#38bdf8]">
                      {ACADEMIC_SEMESTERS[activeSemIndex].sgpa.toFixed(2)} / 10.0
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-linear-to-r from-[#38bdf8] to-[#a78bfa] transition-all duration-300"
                      style={{ width: `${(ACADEMIC_SEMESTERS[activeSemIndex].sgpa / 10.0) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Entrance Honors & High School */}
            <div className="space-y-2 border-t border-zinc-800 pt-4 font-mono-tech text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">
                COMPETITIVE EXAMINATIONS & SCHOOLING:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-zinc-800 bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">JEE MAIN 2024:</span>
                  <span className="text-[#38bdf8] font-bold block">{ACADEMIC_HONORS.jeeMain.rank}</span>
                  <span className="text-[10px] text-zinc-400">{ACADEMIC_HONORS.jeeMain.percentile}</span>
                </div>
                <div className="p-2 border border-zinc-800 bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">JEE ADVANCED 2024:</span>
                  <span className="text-white font-bold block">{ACADEMIC_HONORS.jeeAdvanced.rank}</span>
                  <span className="text-[10px] text-zinc-400">{ACADEMIC_HONORS.jeeAdvanced.percentile}</span>
                </div>
              </div>

              <div className="p-2 border border-zinc-800/80 bg-black/40 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white font-bold">{ACADEMIC_HONORS.schoolClass12.school}</span>
                  <span className="text-[#00E5FF] font-bold">{ACADEMIC_HONORS.schoolClass12.aggregate}</span>
                </div>
                <div className="text-zinc-400 text-[10px] mt-0.5">
                  {ACADEMIC_HONORS.schoolClass12.highlights.join(' • ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Technical Capabilities (5 Verified Categories) */}
        <div id="skills" className="border-t border-[#17171C] pt-12 text-left mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] tracking-wider mb-1">
                <Code2 className="h-4 w-4" />
                <span>// 03. VERIFIED TECHNICAL STACK: SKILLS MATRIX</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                TECHNICAL <span className="text-[#38bdf8]">CAPABILITIES</span>
              </h3>
            </div>
            <span className="font-mono-tech text-xs text-zinc-500">
              C++, SQL, PYTHON & POSTGRESQL PROMINENTLY VERIFIED
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TECHNICAL_SKILLS.map((cat) => (
              <button
                key={cat.category}
                onClick={() => handleCategoryClick(cat.category)}
                className={`px-3.5 py-1.5 font-mono-tech text-xs font-semibold tracking-wider rounded-xs transition-all cursor-pointer ${
                  activeCategory === cat.category
                    ? 'border border-[#38bdf8] bg-[#38bdf8]/15 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'border border-zinc-800 bg-[#09090D] text-zinc-400 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <span>{cat.category}</span>
                <span className="ml-1.5 text-[10px] opacity-75">({cat.devanagariTag})</span>
              </button>
            ))}
          </div>

          {/* Active Skills Display Card */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="border border-zinc-800 bg-[#09090D] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
              <p className="font-mono-tech text-xs sm:text-sm text-zinc-400">
                {currentCategoryData.description}
              </p>
              <span className="font-manga text-sm text-[#38bdf8]">
                {currentCategoryData.devanagariTag}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCategoryData.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`border p-4 flex flex-col justify-between transition-colors group ${
                    skill.isCore
                      ? 'border-[#38bdf8]/50 bg-[#38bdf8]/5 hover:border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.06)]'
                      : 'border-zinc-800/80 bg-[#050505] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono-tech font-bold text-sm ${skill.isCore ? 'text-white' : 'text-zinc-300'}`}>
                      {skill.name}
                    </span>
                    <CheckCircle2 className={`h-3.5 w-3.5 ${skill.isCore ? 'text-[#38bdf8]' : 'text-zinc-600'}`} />
                  </div>

                  <div className="mt-3 flex items-center justify-between font-mono-tech text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-zinc-800 text-zinc-300">
                      {skill.badge}
                    </span>
                    {skill.isCore && (
                      <span className="text-[#38bdf8] font-bold">CORE FOCUS</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications Archive */}
        <div className="border-t border-[#17171C] pt-12 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00] tracking-wider mb-1">
                <Award className="h-4 w-4" />
                <span>// 04. VERIFIED CREDENTIALS: CERTIFICATIONS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                CERTIFICATIONS & <span className="text-[#00E5FF]">TRAINING</span>
              </h3>
            </div>
            <span className="font-mono-tech text-xs text-zinc-500">
              DEEPLEARNING.AI • IBM • KAGGLE • PHYSICS WALLAH
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS_ARCHIVE.map((cert) => (
              <div
                key={cert.id}
                className="border border-zinc-800 bg-[#09090D] p-5 flex flex-col justify-between hover:border-[#00E5FF] transition-all group"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono-tech text-zinc-500 mb-2">
                    <span className="text-[#00E5FF] font-bold">{cert.platform}</span>
                    <span>{cert.year}</span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-white group-hover:text-[#EFFF00] transition-colors leading-snug mb-2">
                    {cert.title}
                  </h4>
                  <p className="font-mono-tech text-xs text-zinc-400 mb-4">
                    {cert.issuer}
                  </p>
                </div>

                <div className="border-t border-zinc-900 pt-3 flex flex-wrap gap-1 font-mono-tech text-[9px] text-zinc-400">
                  {cert.skillsCovered.slice(0, 3).map((s) => (
                    <span key={s} className="bg-black/80 px-1.5 py-0.5 border border-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
