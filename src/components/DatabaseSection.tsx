import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Filter, Search, Terminal } from 'lucide-react';
import { PARANORMAL_ENTITIES } from '../data/entities';
import type { ParanormalEntity } from '../data/entities';
import { EntityCard } from './EntityCard';
import { DossierModal } from './DossierModal';
import { soundFX } from '../utils/audio';

type CategoryFilter = 'ALL' | 'EXTRATERRESTRIAL' | 'SPIRIT' | 'CURSED OBJECT' | 'ANOMALY';

const CATEGORIES: CategoryFilter[] = ['ALL', 'EXTRATERRESTRIAL', 'SPIRIT', 'CURSED OBJECT', 'ANOMALY'];

export const DatabaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<ParanormalEntity | null>(null);

  const filteredEntities = PARANORMAL_ENTITIES.filter((entity) => {
    const matchesCategory = activeCategory === 'ALL' || entity.category === activeCategory;
    const matchesSearch =
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.japaneseName.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (category: CategoryFilter) => {
    soundFX.playTypingClick();
    setActiveCategory(category);
  };

  return (
    <section
      id="database"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17171C] pb-8 mb-10 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#00E5FF] tracking-wider mb-2">
              <Database className="h-4 w-4" />
              <span>// 02. ARCHIVE RECORD: CLASSIFIED FREQUENCIES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              PARANORMAL <span className="text-[#FF2E93]">DATABASE</span>
            </h2>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm sm:text-base">
              Encrypted index of extraterrestrial vanguard vessels, unsealed Edo-period curses,
              and subterranean spiritual manifestations. Select a case file for tactical analysis.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3 font-mono-tech text-xs">
            <div className="border border-zinc-800 bg-[#09090D] px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">TOTAL CATALOGED:</span>
              <span className="text-xl font-bold text-[#EFFF00]">{PARANORMAL_ENTITIES.length} ENTITIES</span>
            </div>
            <div className="border border-[#FF2E93]/40 bg-[#FF2E93]/10 px-4 py-2">
              <span className="text-zinc-500 block text-[10px]">ALERT STATUS:</span>
              <span className="text-xl font-bold text-[#FF2E93] animate-pulse">BREACH ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono-tech text-xs text-zinc-500 mr-2">
              <Filter className="h-3 w-3" />
              FILTER:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 font-mono-tech text-xs font-semibold tracking-wider rounded-xs transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'border border-[#EFFF00] bg-[#EFFF00] text-black shadow-[0_0_12px_rgba(239,255,0,0.3)]'
                    : 'border border-zinc-800 bg-[#09090D] text-zinc-400 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CODE / NAME / KANJI..."
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

        {/* Entities Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredEntities.map((entity) => (
              <motion.div
                key={entity.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <EntityCard entity={entity} onSelect={setSelectedEntity} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEntities.length === 0 && (
          <div className="border border-zinc-800 bg-[#09090D] p-12 text-center font-mono-tech text-sm text-zinc-500">
            <Terminal className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
            NO PARANORMAL ANOMALY MATCHED QUERY: "{searchQuery}"
          </div>
        )}
      </div>

      {/* Dossier Modal */}
      <DossierModal
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />
    </section>
  );
};
