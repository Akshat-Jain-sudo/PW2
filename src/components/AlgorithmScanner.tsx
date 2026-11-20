import React, { useEffect, useRef, useState } from 'react';
import { Application, Graphics, Container } from 'pixi.js';
import { Radio, Target, Zap, RotateCw, Crosshair, Award, ExternalLink, Code2 } from 'lucide-react';
import { DSA_TOPIC_NODES, CP_PLATFORMS } from '../data/portfolioData';
import type { DSATopicNode } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const AlgorithmScanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockedTopic, setLockedTopic] = useState<DSATopicNode | null>(DSA_TOPIC_NODES[0]);
  const [sweepSpeed, setSweepSpeed] = useState(1);
  const [scanPulseActive, setScanPulseActive] = useState(false);

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
          gridGfx.stroke({ width: 1.5, color: 0x38bdf8, alpha: 0.5 });
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
        sweepGfx.stroke({ width: 2, color: 0x38bdf8, alpha: 0.9 });

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

        // Render Algorithmic Nodes & Trigger Sound on Beam Intersection
        blipsGfx.clear();
        DSA_TOPIC_NODES.forEach((node) => {
          const bx = centerX + Math.cos(node.angle) * (radius * node.distance);
          const by = centerY + Math.sin(node.angle) * (radius * node.distance);

          // Check if beam just passed over this node
          const angleDiff = (currentAngle - node.angle + Math.PI * 2) % (Math.PI * 2);
          const isJustHit = angleDiff >= 0 && angleDiff < 0.1;

          if (isJustHit && Date.now() - node.lastPingTime > 1500) {
            node.lastPingTime = Date.now();
            soundFX.playRadarPing(1.1);
          }

          const timeSincePing = Date.now() - node.lastPingTime;
          const pingGlow = Math.max(0, 1 - timeSincePing / 1200);

          // Node core dot
          const nodeColor = node.status === 'COMFORTABLE' ? 0x38bdf8 : 0xa78bfa;
          blipsGfx.circle(bx, by, 5 + pingGlow * 3);
          blipsGfx.fill({ color: nodeColor, alpha: 0.8 + pingGlow * 0.2 });

          // Expanding Ripple Ring when swept
          if (pingGlow > 0) {
            const rippleRadius = (1 - pingGlow) * 26 + 6;
            blipsGfx.circle(bx, by, rippleRadius);
            blipsGfx.stroke({
              width: 1.5,
              color: 0x38bdf8,
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

  const handleSelectNode = (node: DSATopicNode) => {
    soundFX.playWarningAlarm();
    setLockedTopic(node);
  };

  const triggerDeepScan = () => {
    soundFX.playGlitch();
    soundFX.playWarningAlarm();
    setScanPulseActive(true);
    setTimeout(() => setScanPulseActive(false), 2000);
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      <div id="radar" className="absolute -top-20" />
      {/* Background Halftone & Scanlines */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-8 mb-8 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8] tracking-wider mb-2">
              <Radio className="h-4 w-4 animate-pulse" />
              <span>// 04. ALGORITHMIC RADAR & MULTI-PLATFORM CP TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              ALGORITHM <span className="text-[#38bdf8]">SCANNER</span>
            </h2>
            <div className="mt-3 font-mono-tech text-xs sm:text-sm text-zinc-300 font-semibold border-l-2 border-[#38bdf8] pl-3 py-0.5">
              "1,200+ PROBLEMS ACROSS LEETCODE, CODEFORCES, CODECHEF & GFG."
            </div>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm">
              Real-time telemetry tracking solved algorithmic questions across competitive programming platforms,
              alongside interactive 2D canvas radar for C++ topic mastery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://leetcode.com/u/Akshat-Jain-sudo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-700 bg-zinc-900/90 px-4 py-2 font-mono-tech text-xs font-bold text-zinc-200 hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all cursor-pointer rounded-xs"
            >
              <ExternalLink className="h-4 w-4 text-[#38bdf8]" />
              <span>LEETCODE PROFILE</span>
            </a>

            <button
              onClick={triggerDeepScan}
              className="flex items-center gap-2 border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-4 py-2 font-mono-tech text-xs font-bold text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all cursor-pointer rounded-xs"
            >
              <Zap className="h-4 w-4" />
              <span>DEEP REPOSITORY SCAN</span>
            </button>
          </div>
        </div>

        {/* Multi-Platform Competitive Programming Telemetry Grid */}
        <div className="mb-8 text-left">
          <div className="flex items-center justify-between mb-3 text-xs font-mono-tech text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider">
              <Code2 className="h-3.5 w-3.5 text-[#38bdf8]" />
              SIMULTANEOUS PLATFORM TRACKING (LEETCODE // CODEFORCES // CODECHEF // GFG)
            </span>
            <span className="text-zinc-500 hidden sm:inline">LIVE PROFILES LINKED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {CP_PLATFORMS.map((plat) => (
              <a
                key={plat.platform}
                href={plat.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-zinc-800 bg-[#0e0e13] hover:border-zinc-600 p-4 transition-all duration-200 block text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 flex items-center justify-center border border-zinc-800 bg-zinc-900 text-xs font-mono-tech font-bold text-white rounded">
                      {plat.iconName}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors flex items-center gap-1">
                        {plat.platform}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                      </div>
                      <div className="text-[10px] font-mono-tech text-zinc-500">@{plat.handle}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono-tech px-1.5 py-0.5 border ${plat.badgeBorder} ${plat.badgeColor} bg-black/40 rounded`}>
                    {plat.rating}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono-tech text-zinc-500 block">SOLVED:</span>
                    <span className="text-xl font-mono-tech font-extrabold text-white">
                      {plat.solvedCount}+
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono-tech text-zinc-500 block">STATUS:</span>
                    <span className="text-[11px] font-mono-tech text-zinc-300">
                      {plat.status}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Telemetry Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8 font-mono-tech text-xs text-left">
          <div className="border border-zinc-800 bg-[#0e0e13] p-3.5">
            <span className="text-zinc-500 block text-[10px]">TOTAL SOLVED:</span>
            <span className="text-2xl font-bold text-white">1,200+ PROBLEMS</span>
          </div>
          <div className="border border-zinc-800 bg-[#0e0e13] p-3.5">
            <span className="text-zinc-500 block text-[10px]">PRIMARY WEAPON:</span>
            <span className="text-2xl font-bold text-[#38bdf8]">C++ (STL)</span>
          </div>
          <div className="border border-zinc-800 bg-[#0e0e13] p-3.5">
            <span className="text-zinc-500 block text-[10px]">PARADIGMS:</span>
            <span className="text-2xl font-bold text-white">6 CORE DOMAINS</span>
          </div>
          <div className="border border-zinc-800 bg-[#0e0e13] p-3.5">
            <span className="text-zinc-500 block text-[10px]">CONTEST STATUS:</span>
            <span className="text-2xl font-bold text-[#a78bfa]">ACTIVE DIV. 2</span>
          </div>
        </div>

        {scanPulseActive && (
          <div className="mb-6 flex items-center justify-between border-2 border-[#00E5FF] bg-[#00E5FF]/20 p-3 font-mono-tech text-xs text-[#00E5FF] animate-pulse">
            <span className="font-bold">[+] DEEP SCAN INITIATED: 650+ ALGORITHMIC NODES SYNCHRONIZED</span>
            <span className="text-black bg-[#00E5FF] px-2 py-0.5 font-bold">OPTIMAL TIME</span>
          </div>
        )}

        {/* Interactive Layout: Pixi Radar on Left, Telemetry HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* PixiJS Radar Canvas Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center border border-[#17171C] bg-[#09090D] p-6 relative overflow-hidden group">
            <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none" />

            {/* Top Bar on Radar Box */}
            <div className="w-full flex justify-between items-center text-xs font-mono-tech text-zinc-500 border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[#00E5FF] flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#00E5FF]" />
                PIXI_ENGINE://DSA_TOPIC_SONAR
              </span>
              <span className="text-zinc-400">SCANNING 650+ SOLVED NODES</span>
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
                <span>SONAR SWEEP VELOCITY:</span>
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

          {/* Telemetry Telemetry Sidebar: Locked Node & Topic List */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Locked Target Dossier Card */}
            {lockedTopic ? (
              <div className="border border-zinc-700 bg-[#0e0e13] p-5 shadow-[0_0_20px_rgba(56,189,248,0.08)] relative rounded-sm">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tech">
                    <Crosshair className="h-4 w-4 text-[#38bdf8] animate-spin" />
                    <span className="font-bold text-[#38bdf8]">ALGORITHMIC NODE LOCKED</span>
                  </div>
                  <span className="text-xs font-mono-tech px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded">
                    {lockedTopic.code}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-manga text-xl text-white">{lockedTopic.name}</h3>
                  <span className="font-manga text-xs text-zinc-500">{lockedTopic.hindiName}</span>
                </div>

                <div className="space-y-2.5 font-mono-tech text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">SOLVED COUNT:</span>
                    <span className="text-white font-bold">{lockedTopic.problemsSolved}+ Questions</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">MASTERY STATUS:</span>
                    <span
                      className={`font-bold ${
                        lockedTopic.status === 'COMFORTABLE' ? 'text-[#38bdf8]' : 'text-[#a78bfa]'
                      }`}
                    >
                      {lockedTopic.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">COMPLEXITY TARGET:</span>
                    <span className="text-white">{lockedTopic.complexityFocus}</span>
                  </div>
                </div>

                {/* Key Patterns & Techniques */}
                <div className="mt-4 pt-3 border-t border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] font-mono-tech uppercase mb-2">
                    KEY PATTERNS & TECHNIQUES:
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px]">
                    {lockedTopic.keyTechniques.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-zinc-800 bg-[#0e0e13] p-6 text-center font-mono-tech text-xs text-zinc-500">
                CLICK A TOPIC NODE BELOW TO LOCK FOCUS
              </div>
            )}

            {/* Detected Topic Nodes Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-[#38bdf8]" />
                  ALGORITHMIC DOMAINS ({DSA_TOPIC_NODES.length})
                </span>
                <span>C++ / STL ENGINES</span>
              </div>

              <div className="space-y-2">
                {DSA_TOPIC_NODES.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    className={`w-full flex items-center justify-between p-3 border font-mono-tech text-xs transition-all cursor-pointer rounded-xs ${
                      lockedTopic?.id === node.id
                        ? 'border-[#38bdf8] bg-[#38bdf8]/10 text-white shadow-[0_0_10px_rgba(56,189,248,0.15)]'
                        : 'border-zinc-800 bg-[#0e0e13] text-zinc-400 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
                      <div>
                        <div className="font-bold text-white">{node.name}</div>
                        <div className="text-[10px] text-zinc-500">{node.code} // {node.hindiName}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[#38bdf8] font-bold">{node.problemsSolved}+</span>
                      <div className="text-[10px] text-zinc-500">{node.status}</div>
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
