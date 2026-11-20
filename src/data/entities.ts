export interface ParanormalEntity {
  id: string;
  code: string;
  name: string;
  japaneseName: string;
  category: 'EXTRATERRESTRIAL' | 'SPIRIT' | 'CURSED OBJECT' | 'ANOMALY' | 'UNKNOWN';
  threatLevel: 'CLASS II' | 'CLASS IV' | 'CLASS V' | 'CLASS HARVESTER' | 'CLASS CALAMITY' | 'CLASS OMEGA';
  threatGauge: number; // 0 - 100
  location: string;
  status: 'UNCONTAINED' | 'ACTIVE SEAL' | 'PHASE SHIFTING' | 'DORMANT RESIDUE' | 'TRACKED';
  shortDesc: string;
  fullDossier: string;
  containmentProtocol: string;
  frequency: string;
  attributes: {
    speed: string;
    psychicResonance: string;
    lethality: string;
    dimensions: string;
  };
  visualTheme: {
    accent: string; // hex
    secondary: string;
    symbol: string;
    kanji: string;
  };
}

export const PARANORMAL_ENTITIES: ParanormalEntity[] = [
  {
    id: 'turbo-flatwoods',
    code: '#ET-099',
    name: 'TURBO FLATWOODS',
    japaneseName: 'ターボ・フラットウッズ星人',
    category: 'EXTRATERRESTRIAL',
    threatLevel: 'CLASS OMEGA',
    threatGauge: 96,
    location: 'Shizuoka Expressway Overpass, Sector 7',
    status: 'UNCONTAINED',
    shortDesc: 'A hyper-kinetic extraterrestrial entity capable of sprinting at Mach 1.4 while projecting an electromagnetic saucer canopy.',
    fullDossier: 'Observed during midnight radar sweeps. Entity exhibits both high-speed biological locomotion and gravitational levitation. Intercepted signals indicate an affinity for subterranean tunnel racing and bio-kinetic absorption. Target has repeatedly evaded Sector-IV psychic interceptors.',
    containmentProtocol: 'Deploy quantum decelerator barriers across all highway exits. Do not engage at close quarters without high-frequency talisman dampeners.',
    frequency: '92.44 GHz',
    attributes: {
      speed: 'Mach 1.4',
      psychicResonance: '98 dB',
      lethality: 'EXTREME',
      dimensions: '2.4m H x 1.8m W',
    },
    visualTheme: {
      accent: '#FF2E93',
      secondary: '#EFFF00',
      symbol: '⚡',
      kanji: '速',
    },
  },
  {
    id: 'serpo-subterranean',
    code: '#SP-666',
    name: 'SERPO SUBTERRANEAN',
    japaneseName: 'セルポ地下霊性体',
    category: 'SPIRIT',
    threatLevel: 'CLASS CALAMITY',
    threatGauge: 89,
    location: 'Underground Metro Tunnel B6, Tokyo Core',
    status: 'DORMANT RESIDUE',
    shortDesc: 'Multi-faceted telepathic wraith that materialized after a failed alien teleportation ritual beneath the subway line.',
    fullDossier: 'Possesses severe psychic distortion waves that disable surrounding surveillance gear. Commuters reported hallucinations of clones with uniform monochrome visages attempting to bargain for genetic tissue. Can fold into 2D shadows across concrete walls.',
    containmentProtocol: 'Subway lines 4 through 8 must be flooded with concentrated salt-ionized mist between 02:00 AM and 04:30 AM.',
    frequency: '104.12 GHz',
    attributes: {
      speed: 'Variable (Shadow Step)',
      psychicResonance: '142 dB',
      lethality: 'CRITICAL',
      dimensions: 'Amorphous (up to 12m)',
    },
    visualTheme: {
      accent: '#00E5FF',
      secondary: '#FF2E93',
      symbol: '👁️',
      kanji: '霊',
    },
  },
  {
    id: 'acrobatic-ofuda',
    code: '#CO-013',
    name: 'ACROBATIC OFUDA',
    japaneseName: '跳躍重力封印札',
    category: 'CURSED OBJECT',
    threatLevel: 'CLASS IV',
    threatGauge: 74,
    location: 'Kamakura Shrine Crypt Vault, Chamber 3',
    status: 'ACTIVE SEAL',
    shortDesc: 'An Edo-period parchment talisman saturated with alien anti-matter ink. Causes erratic gravitational shifts in its vicinity.',
    fullDossier: 'Discovered affixed to an unexploded meteor fragment dating back to 1782. When disturbed, the talisman performs acrobatic aerial loops while inverting the gravitational polarity of all human bodies within a 25-meter radius.',
    containmentProtocol: 'Housed within a lead-lined magnetic vacuum bell jar. Requires daily recitation of cleansing mantras by two synchronized monks.',
    frequency: '44.80 GHz',
    attributes: {
      speed: 'Stationary / Kinetic Burst',
      psychicResonance: '68 dB',
      lethality: 'MODERATE-HIGH',
      dimensions: '18cm x 7cm',
    },
    visualTheme: {
      accent: '#EFFF00',
      secondary: '#00E5FF',
      symbol: '📜',
      kanji: '封',
    },
  },
  {
    id: 'dimensional-cricket',
    code: '#AN-404',
    name: 'DIMENSIONAL CRICKET',
    japaneseName: '四次元異界コオロギ',
    category: 'ANOMALY',
    threatLevel: 'CLASS II',
    threatGauge: 62,
    location: 'Akihabara Radio Kaikan, 4th Floor Ceiling Void',
    status: 'PHASE SHIFTING',
    shortDesc: 'A semi-transparent bio-metallic insectoid whose rhythmic chirping dissolves microprocessors and creates temporal micro-loops.',
    fullDossier: 'First reported when arcade cabinets in District 3 began repeating the same 12-second game loop for 72 consecutive hours. Analysis revealed the chirp generates micro-wormholes that consume local radio waves and Wi-Fi packets.',
    containmentProtocol: 'Sub-zero acoustic dampening domes. Use analog brass cages with harmonic tuning forks.',
    frequency: '18.91 GHz',
    attributes: {
      speed: 'Phase Hop (Instant)',
      psychicResonance: '54 dB',
      lethality: 'LOW-SELECTIVE',
      dimensions: '14cm',
    },
    visualTheme: {
      accent: '#00E5FF',
      secondary: '#EFFF00',
      symbol: '🦗',
      kanji: '異',
    },
  },
  {
    id: 'nebula-mantis',
    code: '#ET-777',
    name: 'NEBULA MANTIS',
    japaneseName: '星雲カマキリ航宙艦',
    category: 'EXTRATERRESTRIAL',
    threatLevel: 'CLASS HARVESTER',
    threatGauge: 94,
    location: 'Hokkaido Upper Stratosphere (Orbit Sync)',
    status: 'TRACKED',
    shortDesc: 'Gigantic bio-mechanical vanguard vessel mimicking insect biology, projecting tractor scythes to siphon atmospheric ley energy.',
    fullDossier: 'Radar cross-section resembles a praying mantis measuring 800 meters across. Emits deep ultraviolet pulses that trigger spontaneous spiritual manifestations across northern Japan. Believed to be searching for the golden extraterrestrial sphere.',
    containmentProtocol: 'Global orbital satellite jamming. Maintain false meteorological weather radar disguises.',
    frequency: '128.60 GHz',
    attributes: {
      speed: 'Mach 8.2 (Orbital)',
      psychicResonance: '210 dB',
      lethality: 'GLOBAL THREAT',
      dimensions: '820m Wingspan',
    },
    visualTheme: {
      accent: '#FF2E93',
      secondary: '#00E5FF',
      symbol: '🛸',
      kanji: '宙',
    },
  },
  {
    id: 'subway-metro-hydra',
    code: '#SP-108',
    name: 'SUBWAY METRO HYDRA',
    japaneseName: '百鬼夜行メトロ蛇神',
    category: 'SPIRIT',
    threatLevel: 'CLASS V',
    threatGauge: 88,
    location: 'Oedo Line Abandoned Maintenance Spur',
    status: 'UNCONTAINED',
    shortDesc: 'A cursed phantom train engine composed of intertwining spectral faces and glowing alien tentacles that manifests at 02:44 AM.',
    fullDossier: 'Legend describes a ghost train that never stops at any station. Passengers who board find themselves trapped in an infinite loop of distorted manga panels and neon-lit CRT reflections. It feeds on anxiety and unread smartphone notifications.',
    containmentProtocol: 'Physical tracks severed at Junction 14. High-voltage spiritual circuit breakers installed along third rail.',
    frequency: '76.22 GHz',
    attributes: {
      speed: '160 km/h (Trackless)',
      psychicResonance: '115 dB',
      lethality: 'SEVERE',
      dimensions: '140m Length',
    },
    visualTheme: {
      accent: '#EFFF00',
      secondary: '#FF2E93',
      symbol: '🚇',
      kanji: '怨',
    },
  },
];
