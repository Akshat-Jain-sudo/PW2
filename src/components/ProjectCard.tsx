import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FileText, Code2, Zap } from 'lucide-react';
import type { ProjectCaseFile } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface ProjectCardProps {
  project: ProjectCaseFile;
  onSelect: (project: ProjectCaseFile) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  // 3D physics tilt spring with React Spring
  const [{ xys }, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1.2, tension: 350, friction: 30 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    api.start({ xys: [rotateX, rotateY, 1.03] });
  };

  const handleMouseEnter = () => {
    soundFX.playCardHover();
  };

  const handleMouseLeave = () => {
    api.start({ xys: [0, 0, 1] });
  };

  const handleClick = () => {
    soundFX.playOpenDossier();
    onSelect(project);
  };

  return (
    <animated.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: xys.to(
          (rx, ry, s) =>
            `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
        ),
      }}
      className={`project-card group relative flex flex-col justify-between overflow-hidden border bg-[#09090D] p-5 cursor-pointer transition-colors duration-300 select-none ${
        project.id === 'postgres-benchmarking'
          ? 'border-[#00E5FF]/70 shadow-[0_0_25px_rgba(0,229,255,0.2)]'
          : 'border-[#17171C] hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]'
      }`}
    >
      {/* Halftone Screentone Texture & Corner Accents */}
      <div className="absolute inset-0 bg-halftone opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" />

      {/* Decorative Manga Corner Brackets */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[#EFFF00] pointer-events-none" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[#FF2E93] pointer-events-none" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#00E5FF] pointer-events-none" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white pointer-events-none" />

      {/* Card Header: Project Code & Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-xs font-mono-tech">
        <div className="flex items-center gap-2">
          <span
            className="font-bold px-2 py-0.5 rounded text-[11px]"
            style={{
              backgroundColor: `${project.accentColor}20`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}`,
            }}
          >
            {project.code}
          </span>
          <span className="text-zinc-400 font-semibold truncate max-w-[170px]">{project.classification}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 font-mono-tech">{project.year}</span>
          <span
            className="h-2 w-2 rounded-full animate-ping"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>
      </div>

      {/* Stylized Visual Chamber */}
      <div className="relative z-10 mb-4 h-48 w-full overflow-hidden border border-zinc-800 bg-[#050505] flex items-center justify-center group-hover:border-zinc-600 transition-colors">
        <div className="absolute inset-0 manga-speedlines opacity-20 group-hover:opacity-40 transition-opacity" />

        {/* Devanagari Stamp Watermark */}
        <div
          className="absolute -right-4 -bottom-4 font-manga text-8xl opacity-15 select-none pointer-events-none transition-transform duration-500 group-hover:scale-125"
          style={{ color: project.accentColor }}
        >
          {project.devanagariStamp}
        </div>

        {/* Highlight Banner if Benchmark Flagship */}
        {project.benchmarkStats && (
          <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-[#00E5FF] text-black px-2 py-0.5 font-mono-tech text-[10px] font-extrabold shadow-[0_0_10px_#00E5FF]">
            <Zap className="h-3 w-3 fill-black text-black" />
            <span>{project.benchmarkStats.primaryGain}</span>
          </div>
        )}

        {/* Center Animated Project Symbol */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
              borderColor: project.accentColor,
              boxShadow: `0 0 20px ${project.accentColor}40`,
            }}
          >
            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              {project.symbol}
            </span>
          </div>
          <span className="mt-2 font-manga text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors">
            {project.name}
          </span>
        </div>

        {/* Glitch Overlay on Hover */}
        <div className="absolute inset-0 bg-[#00E5FF]/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity pointer-events-none" />
      </div>

      {/* Project Title & Tagline */}
      <div className="relative z-10 mb-3 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-[#EFFF00] transition-colors">
            {project.name}
          </h3>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            {project.status}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-zinc-300 font-sans-tech line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Tech Stack Chips & Action Link */}
      <div className="relative z-10 space-y-3 border-t border-zinc-800/80 pt-3 text-left">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 font-mono-tech text-[10px] text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-1.5 py-0.5 font-mono-tech text-[10px] text-zinc-500">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Telemetry info row */}
        <div className="flex justify-between items-center text-[10px] font-mono-tech text-zinc-500 pt-1">
          <span className="flex items-center gap-1 text-[#00E5FF]">
            <Code2 className="h-3 w-3" />
            ENGINEERING CASE FILE
          </span>
          <span className="flex items-center gap-1 text-zinc-300 group-hover:text-[#EFFF00] transition-colors">
            <FileText className="h-3 w-3" />
            INSPECT CASE STUDY &rarr;
          </span>
        </div>
      </div>
    </animated.div>
  );
};
