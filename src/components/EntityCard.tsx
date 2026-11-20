import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ShieldAlert, Radio, FileText } from 'lucide-react';
import type { ParanormalEntity } from '../data/entities';
import { soundFX } from '../utils/audio';

interface EntityCardProps {
  entity: ParanormalEntity;
  onSelect: (entity: ParanormalEntity) => void;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity, onSelect }) => {
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
    onSelect(entity);
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
      className="entity-card group relative flex flex-col justify-between overflow-hidden border border-[#17171C] bg-[#09090D] p-5 cursor-pointer transition-colors duration-300 hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] select-none"
    >
      {/* Halftone Screentone Texture & Corner Accents */}
      <div className="absolute inset-0 bg-halftone opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" />
      
      {/* Decorative Manga Corner Brackets */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[#EFFF00] pointer-events-none" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[#FF2E93] pointer-events-none" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#00E5FF] pointer-events-none" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white pointer-events-none" />

      {/* Card Header: Entity Code & Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-xs font-mono-tech">
        <div className="flex items-center gap-2">
          <span
            className="font-bold px-2 py-0.5 rounded text-[11px]"
            style={{
              backgroundColor: `${entity.visualTheme.accent}20`,
              color: entity.visualTheme.accent,
              border: `1px solid ${entity.visualTheme.accent}`,
            }}
          >
            {entity.code}
          </span>
          <span className="text-zinc-500">{entity.category}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full animate-ping"
            style={{ backgroundColor: entity.visualTheme.accent }}
          />
          <span className="text-[10px] text-zinc-400 font-semibold">{entity.status}</span>
        </div>
      </div>

      {/* Stylized Manga Artwork Chamber */}
      <div className="relative z-10 mb-4 h-48 w-full overflow-hidden border border-zinc-800 bg-[#050505] flex items-center justify-center group-hover:border-zinc-600 transition-colors">
        {/* Background Speedlines */}
        <div className="absolute inset-0 manga-speedlines opacity-20 group-hover:opacity-40 transition-opacity" />
        
        {/* Kanji Seal Stamp */}
        <div
          className="absolute -right-4 -bottom-4 font-manga text-8xl opacity-15 select-none pointer-events-none transition-transform duration-500 group-hover:scale-125"
          style={{ color: entity.visualTheme.accent }}
        >
          {entity.visualTheme.kanji}
        </div>

        {/* Center Animated Entity Symbol */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
            style={{
              borderColor: entity.visualTheme.accent,
              boxShadow: `0 0 20px ${entity.visualTheme.accent}40`,
            }}
          >
            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              {entity.visualTheme.symbol}
            </span>
          </div>
          <span className="mt-2 font-manga text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors">
            {entity.japaneseName}
          </span>
        </div>

        {/* Glitch Overlay on Hover */}
        <div className="absolute inset-0 bg-[#00E5FF]/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity pointer-events-none" />
      </div>

      {/* Entity Title & Threat Level */}
      <div className="relative z-10 mb-3 text-left">
        <h3 className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-[#EFFF00] transition-colors">
          {entity.name}
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-sans-tech line-clamp-2 leading-relaxed">
          {entity.shortDesc}
        </p>
      </div>

      {/* Threat Level Meter & Specs */}
      <div className="relative z-10 space-y-2 border-t border-zinc-800/80 pt-3 text-left">
        <div className="flex justify-between items-center text-[11px] font-mono-tech">
          <span className="text-zinc-500 flex items-center gap-1">
            <ShieldAlert className="h-3 w-3 text-[#FF2E93]" />
            THREAT LEVEL:
          </span>
          <span
            className="font-bold tracking-wider"
            style={{ color: entity.visualTheme.accent }}
          >
            {entity.threatLevel}
          </span>
        </div>

        {/* Hazard Progress Gauge */}
        <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${entity.threatGauge}%`,
              backgroundColor: entity.visualTheme.accent,
              boxShadow: `0 0 8px ${entity.visualTheme.accent}`,
            }}
          />
        </div>

        {/* Telemetry info row */}
        <div className="flex justify-between items-center text-[10px] font-mono-tech text-zinc-500 pt-1">
          <span className="flex items-center gap-1">
            <Radio className="h-3 w-3 text-[#00E5FF]" />
            {entity.frequency}
          </span>
          <span className="flex items-center gap-1 text-zinc-400 group-hover:text-[#EFFF00] transition-colors">
            <FileText className="h-3 w-3" />
            OPEN DOSSIER &rarr;
          </span>
        </div>
      </div>
    </animated.div>
  );
};
