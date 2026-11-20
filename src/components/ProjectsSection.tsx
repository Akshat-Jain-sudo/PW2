import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, Terminal } from 'lucide-react';
import { PROJECTS_ARCHIVE } from '../data/portfolioData';
import type { ProjectCaseFile } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseFile | null>(null);

  const filteredProjects = PROJECTS_ARCHIVE.filter((proj) => {
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17171C] pb-8 mb-10 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] tracking-wider mb-2">
              <FolderGit2 className="h-4 w-4" />
              <span>// 03. ENGINEERING ARCHIVE: CASE FILES & SYSTEMS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              PROJECTS // <span className="text-white">BUILD ARCHIVE</span>
            </h2>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm sm:text-base">
              Classified engineering records of high-throughput PostgreSQL query optimization (797× gain),
              ML win-probability engines, 8-platform price intelligence, and developer extensions.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3 font-mono-tech text-xs">
            <div className="border border-zinc-800 bg-[#09090D] px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">CASE FILES:</span>
              <span className="text-xl font-bold text-[#EFFF00]">{PROJECTS_ARCHIVE.length} ACTIVE</span>
            </div>
            <div className="border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">VERIFIED CODEBASE:</span>
              <span className="text-xl font-bold text-[#00E5FF]">PRODUCTION READY</span>
            </div>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-mono-tech text-xs text-zinc-400">
            SELECT A CASE FILE TO INSPECT ARCHITECTURE & SOURCE CODE
          </span>

          <div className="relative min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PROJECT OR TECH..."
              className="w-full border border-zinc-800 bg-[#09090D] py-2 pl-9 pr-3 text-xs font-mono-tech text-white placeholder-zinc-600 focus:border-[#00E5FF] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="border border-zinc-800 bg-[#09090D] p-12 text-center font-mono-tech text-sm text-zinc-500">
            <Terminal className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
            NO ENGINEERING PROJECT MATCHED QUERY: "{searchQuery}"
          </div>
        )}
      </div>

      {/* Case File Detailed Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
