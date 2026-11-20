import React, { useEffect, useRef, useState } from 'react';
import { Application, Graphics, Container } from 'pixi.js';
import { Radio, AlertOctagon, Target, Zap, RotateCw, ShieldCheck, Crosshair } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface SignalBlip {
  id: string;
  code: string;
  name: string;
  angle: number; // in radians
  distance: number; // 0.1 to 0.9 (normalized radius)
  intensity: number; // 0 to 100 dB
  category: 'EXTRATERRESTRIAL' | 'SPIRIT' | 'CURSED ANOMALY';
  frequency: string;
  hazardLevel: 'ALPHA' | 'BETA' | 'OMEGA';
  lastPingTime: number;
}

const INITIAL_BLIPS: SignalBlip[] = [
  {
    id: 'blip-1',
    code: '#SIG-881',
    name: 'FLATWOODS SPEED ANOMALY',
    angle: 0.85,
    distance: 0.65,
    intensity: 94,
    category: 'EXTRATERRESTRIAL',
    frequency: '92.4 GHz',
    hazardLevel: 'OMEGA',
    lastPingTime: 0,
  },
  {
    id: 'blip-2',
    code: '#SIG-404',
    name: 'SUBWAY SHADOW VORTEX',
    angle: 2.4,
    distance: 0.42,
    intensity: 88,
    category: 'SPIRIT',
    frequency: '104.1 GHz',
    hazardLevel: 'OMEGA',
    lastPingTime: 0,
  },
  {
    id: 'blip-3',
    code: '#SIG-019',
    name: 'LEVITATING OFUDA RESIDUE',
    angle: 4.1,
    distance: 0.78,
    intensity: 65,
    category: 'CURSED ANOMALY',
    frequency: '44.8 GHz',
    hazardLevel: 'BETA',
    lastPingTime: 0,
  },
  {
    id: 'blip-4',
    code: '#SIG-332',
    name: 'IONIZED MANTIS SCOUT',
    angle: 5.6,
    distance: 0.88,
    intensity: 98,
    category: 'EXTRATERRESTRIAL',
    frequency: '128.6 GHz',
    hazardLevel: 'OMEGA',
    lastPingTime: 0,
  },
];

export const ParanormalRadar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blips, setBlips] = useState<SignalBlip[]>(INITIAL_BLIPS);
  const [lockedTarget, setLockedTarget] = useState<SignalBlip | null>(INITIAL_BLIPS[0]);
  const [sweepSpeed, setSweepSpeed] = useState(1);
  const [alertActive, setAlertActive] = useState(false);
  const [radarFreq, setRadarFreq] = useState('84.73 GHz');

  useEffect(() => {
    let app: Application | null = null;
    let isDestroyed = false;

    const initPixi = async () => {
      if (!containerRef.current) return;

      const size = Math.min(containerRef.current.clientWidth, 600);
      const width = size;
      const height = size;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = size * 0.44;

      app = new Application();
      await app.init({
        width,
        height,
        backgroundAlpha: 0,
        antialias: true,
      });

      if (isDestroyed || !containerRef.current) {
        app.destroy(true);
        return;
      }

      containerRef.current.appendChild(app.canvas);

      // Radar Stage Hierarchy
      const radarContainer = new Container();
      app.stage.addChild(radarContainer);

      // Static Grid Layer
      const gridGfx = new Graphics();
      radarContainer.addChild(gridGfx);

      // Draw Range Circles
      const drawStaticGrid = () => {
        gridGfx.clear();

        // 4 Concentric Circles
        [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
          gridGfx.circle(centerX, centerY, radius * ratio);
          gridGfx.stroke({ width: 1, color: 0x00E5FF, alpha: ratio === 1.0 ? 0.6 : 0.25 });
        });

        // Crosshairs Axis
        gridGfx.moveTo(centerX - radius, centerY);
        gridGfx.lineTo(centerX + radius, centerY);
        gridGfx.stroke({ width: 1, color: 0x00E5FF, alpha: 0.3 });

        gridGfx.moveTo(centerX, centerY - radius);
        gridGfx.lineTo(centerX, centerY + radius);
        gridGfx.stroke({ width: 1, color: 0x00E5FF, alpha: 0.3 });

        // 30 Degree Radial Ticks
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI) / 6;
          const x1 = centerX + Math.cos(a) * (radius - 8);
          const y1 = centerY + Math.sin(a) * (radius - 8);
          const x2 = centerX + Math.cos(a) * radius;
          const y2 = centerY + Math.sin(a) * radius;

          gridGfx.moveTo(x1, y1);
          gridGfx.lineTo(x2, y2);
          gridGfx.stroke({ width: 1.5, color: 0xEFFF00, alpha: 0.5 });
        }
      };
      drawStaticGrid();

      // Dynamic Sweep & Phosphor Trails Layer
      const sweepGfx = new Graphics();
      radarContainer.addChild(sweepGfx);

      // Blips Layer
      const blipsGfx = new Graphics();
      radarContainer.addChild(blipsGfx);

      let currentAngle = 0;

      // Animation Ticker Loop
      app.ticker.add((ticker) => {
        const delta = ticker.deltaTime * 0.03 * sweepSpeed;
        currentAngle = (currentAngle + delta) % (Math.PI * 2);

        // Render Sonar Sweep Beam with Pie / Arc sector trail
        sweepGfx.clear();

        // Sweep Lead Line
        const leadX = centerX + Math.cos(currentAngle) * radius;
        const leadY = centerY + Math.sin(currentAngle) * radius;
        sweepGfx.moveTo(centerX, centerY);
        sweepGfx.lineTo(leadX, leadY);
        sweepGfx.stroke({ width: 2, color: 0xEFFF00, alpha: 0.9 });

        // Trailing Sector Glow
        const trailSteps = 16;
        for (let s = 1; s <= trailSteps; s++) {
          const trailAngle = currentAngle - (s * 0.04);
          const tx = centerX + Math.cos(trailAngle) * radius;
          const ty = centerY + Math.sin(trailAngle) * radius;
          sweepGfx.moveTo(centerX, centerY);
          sweepGfx.lineTo(tx, ty);
          sweepGfx.stroke({
            width: 2.5,
            color: 0x00E5FF,
            alpha: Math.max(0, 0.4 - s * 0.025),
          });
        }

        // Render Blips & Trigger Sound on Beam Intersection
        blipsGfx.clear();
        INITIAL_BLIPS.forEach((blip) => {
          const bx = centerX + Math.cos(blip.angle) * (radius * blip.distance);
          const by = centerY + Math.sin(blip.angle) * (radius * blip.distance);

          // Check if beam just passed over this blip
          const angleDiff = (currentAngle - blip.angle + Math.PI * 2) % (Math.PI * 2);
          const isJustHit = angleDiff >= 0 && angleDiff < 0.1;

          if (isJustHit && Date.now() - blip.lastPingTime > 1500) {
            blip.lastPingTime = Date.now();
            soundFX.playRadarPing(blip.intensity / 80);
          }

          const timeSincePing = Date.now() - blip.lastPingTime;
          const pingGlow = Math.max(0, 1 - timeSincePing / 1200);

          // Blip core dot
          const blipColor = blip.category === 'EXTRATERRESTRIAL' ? 0xFF2E93 : 0x00E5FF;
          blipsGfx.circle(bx, by, 4 + pingGlow * 3);
          blipsGfx.fill({ color: blipColor, alpha: 0.7 + pingGlow * 0.3 });

          // Expanding Ripple Ring when swept
          if (pingGlow > 0) {
            const rippleRadius = (1 - pingGlow) * 26 + 6;
            blipsGfx.circle(bx, by, rippleRadius);
            blipsGfx.stroke({
              width: 1.5,
              color: 0xEFFF00,
              alpha: pingGlow * 0.8,
            });
          }
        });
      });
    };

    initPixi();

    return () => {
      isDestroyed = true;
      if (app) {
        try {
          app.destroy(true);
        } catch {
          // Ignore
        }
      }
    };
  }, [sweepSpeed]);

  const handleSelectBlip = (blip: SignalBlip) => {
    soundFX.playWarningAlarm();
    setLockedTarget(blip);
    setAlertActive(true);
    setTimeout(() => setAlertActive(false), 2400);
  };

  const triggerDeepScan = () => {
    soundFX.playGlitch();
    soundFX.playWarningAlarm();
    setAlertActive(true);
    setRadarFreq(`${(80 + Math.random() * 50).toFixed(2)} GHz`);

    // Add a temporary anomalous spike
    const newAnomalousBlip: SignalBlip = {
      id: `blip-${Date.now()}`,
      code: `#ANOM-${Math.floor(Math.random() * 900 + 100)}`,
      name: 'UNREGISTERED HARVESTER CONTACT',
      angle: Math.random() * Math.PI * 2,
      distance: 0.3 + Math.random() * 0.55,
      intensity: 99,
      category: 'EXTRATERRESTRIAL',
      frequency: `${(90 + Math.random() * 30).toFixed(1)} GHz`,
      hazardLevel: 'OMEGA',
      lastPingTime: Date.now(),
    };

    setBlips((prev) => [newAnomalousBlip, ...prev.slice(0, 4)]);
    setLockedTarget(newAnomalousBlip);
    setTimeout(() => setAlertActive(false), 2500);
  };

  return (
    <section
      id="radar"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Halftone & Scanlines */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17171C] pb-8 mb-10 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00] tracking-wider mb-2">
              <Radio className="h-4 w-4 animate-pulse" />
              <span>// 03. INTERACTIVE SURVEILLANCE & SONAR</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              PARANORMAL <span className="text-[#00E5FF]">RADAR</span>
            </h2>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm sm:text-base">
              Live PixiJS 2D canvas radar tracking electromagnetic anomalies, spectral distortions,
              and low-orbit alien vanguard scouts within a 500km radius.
            </p>
          </div>

          {/* Alert Status Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={triggerDeepScan}
              className="flex items-center gap-2 border-2 border-[#EFFF00] bg-[#EFFF00]/15 px-4 py-2.5 font-mono-tech text-xs font-bold text-[#EFFF00] hover:bg-[#EFFF00] hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(239,255,0,0.3)]"
            >
              <Zap className="h-4 w-4" />
              <span>FORCE DEEP SCAN</span>
            </button>
          </div>
        </div>

        {/* Warning Alert Banner */}
        {alertActive && (
          <div className="mb-8 flex items-center justify-between border-2 border-[#FF2E93] bg-[#FF2E93]/20 p-4 text-[#FF2E93] font-mono-tech animate-pulse">
            <div className="flex items-center gap-3">
              <AlertOctagon className="h-5 w-5" />
              <span className="font-bold text-sm tracking-wider">
                WARNING: HIGH-INTENSITY ENTITY SIGNATURE LOCKED IN SECTOR IV!
              </span>
            </div>
            <span className="text-xs bg-[#FF2E93] text-black px-2 py-0.5 font-bold">
              OMEGA-CRITICAL
            </span>
          </div>
        )}

        {/* Interactive Layout: Radar Canvas on Left, Telemetry HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* PixiJS Radar Canvas Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center border border-[#17171C] bg-[#09090D] p-6 relative overflow-hidden group">
            {/* Speedlines & CRT corners */}
            <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none" />
            
            {/* Top Bar on Radar Box */}
            <div className="w-full flex justify-between items-center text-xs font-mono-tech text-zinc-500 border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[#00E5FF] flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#00E5FF]" />
                PIXI_ENGINE://SONAR_SWEEP_2D
              </span>
              <span className="text-zinc-400">RANGE: 500 KM // 360° AZIMUTH</span>
            </div>

            {/* Pixi Canvas Mounting Node */}
            <div
              ref={containerRef}
              className="relative flex items-center justify-center w-full max-w-[500px] aspect-square rounded-full border border-zinc-800/80 bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-crosshair"
            />

            {/* Sweep Control Slider */}
            <div className="w-full mt-6 flex items-center justify-between gap-4 font-mono-tech text-xs text-zinc-400 border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-2">
                <RotateCw className="h-3.5 w-3.5 text-[#EFFF00]" />
                <span>SWEEP VELOCITY:</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSweepSpeed(0.5)}
                  className={`px-2 py-0.5 border ${
                    sweepSpeed === 0.5 ? 'border-[#EFFF00] text-[#EFFF00]' : 'border-zinc-800 text-zinc-500'
                  }`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => setSweepSpeed(1)}
                  className={`px-2 py-0.5 border ${
                    sweepSpeed === 1 ? 'border-[#EFFF00] text-[#EFFF00]' : 'border-zinc-800 text-zinc-500'
                  }`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setSweepSpeed(2)}
                  className={`px-2 py-0.5 border ${
                    sweepSpeed === 2 ? 'border-[#EFFF00] text-[#EFFF00]' : 'border-zinc-800 text-zinc-500'
                  }`}
                >
                  2.0x
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Telemetry Sidebar: Target Lock & Blip List */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Locked Target Dossier Card */}
            {lockedTarget ? (
              <div className="border border-[#00E5FF] bg-[#09090D] p-5 shadow-[0_0_20px_rgba(0,229,255,0.15)] relative">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tech">
                    <Crosshair className="h-4 w-4 text-[#FF2E93] animate-spin" />
                    <span className="font-bold text-[#FF2E93]">TARGET LOCK ACQUIRED</span>
                  </div>
                  <span className="text-xs font-mono-tech px-2 py-0.5 bg-[#FF2E93]/20 border border-[#FF2E93] text-[#FF2E93]">
                    {lockedTarget.code}
                  </span>
                </div>

                <h3 className="font-manga text-xl text-white mb-2">{lockedTarget.name}</h3>

                <div className="space-y-2.5 font-mono-tech text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">CATEGORY:</span>
                    <span className="text-[#00E5FF] font-bold">{lockedTarget.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">CARRIER FREQUENCY:</span>
                    <span className="text-[#EFFF00] font-bold">{lockedTarget.frequency}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">SIGNAL INTENSITY:</span>
                    <span className="text-[#FF2E93] font-bold">{lockedTarget.intensity} dB</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">ESTIMATED RANGE:</span>
                    <span className="text-white">{(lockedTarget.distance * 500).toFixed(0)} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">HAZARD RATING:</span>
                    <span className="text-[#FF2E93] font-bold">{lockedTarget.hazardLevel}</span>
                  </div>
                </div>

                {/* Spectral Intensity Meter */}
                <div className="mt-4 pt-3 border-t border-zinc-800">
                  <div className="flex justify-between text-[11px] font-mono-tech mb-1">
                    <span className="text-zinc-400">DOPPLER DEVIATION</span>
                    <span className="text-[#00E5FF]">{lockedTarget.intensity}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00E5FF] via-[#EFFF00] to-[#FF2E93]"
                      style={{ width: `${lockedTarget.intensity}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-zinc-800 bg-[#09090D] p-6 text-center font-mono-tech text-xs text-zinc-500">
                CLICK A BLIP BELOW TO ENGAGE TARGET LOCK
              </div>
            )}

            {/* Detected Blip Quick Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#EFFF00]" />
                  ACTIVE CONTACTS ({blips.length})
                </span>
                <span>CARRIER: {radarFreq}</span>
              </div>

              <div className="space-y-2">
                {blips.map((blip) => (
                  <button
                    key={blip.id}
                    onClick={() => handleSelectBlip(blip)}
                    className={`w-full flex items-center justify-between p-3 border font-mono-tech text-xs transition-all cursor-pointer ${
                      lockedTarget?.id === blip.id
                        ? 'border-[#FF2E93] bg-[#FF2E93]/10 text-white shadow-[0_0_10px_rgba(255,46,147,0.2)]'
                        : 'border-zinc-800 bg-[#09090D] text-zinc-400 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
                      <div>
                        <div className="font-bold text-white">{blip.name}</div>
                        <div className="text-[10px] text-zinc-500">{blip.code} // {blip.category}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[#EFFF00] font-bold">{blip.frequency}</span>
                      <div className="text-[10px] text-zinc-500">{(blip.distance * 500).toFixed(0)} km</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
