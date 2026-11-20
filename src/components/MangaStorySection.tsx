import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Zap, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const MangaStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2PinRef = useRef<HTMLDivElement>(null);
  const scene3HorizRef = useRef<HTMLDivElement>(null);
  const scene4SpreadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE 1: Dynamic diagonal panels entering from left and right
      if (scene1Ref.current) {
        gsap.from('.scene-1-left', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          },
          x: -120,
          rotation: -8,
          opacity: 0,
        });

        gsap.from('.scene-1-right', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          },
          x: 120,
          rotation: 8,
          opacity: 0,
        });

        gsap.from('.scene-1-fx', {
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          scale: 0.2,
          rotation: -25,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
        });
      }

      // SCENE 2: PINNED SCENE - Talisman Ignition & Reality Distortion
      if (scene2PinRef.current) {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: scene2PinRef.current,
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        pinTl
          .to('.ofuda-parchment', {
            scale: 1.25,
            rotation: 12,
            boxShadow: '0 0 60px #FF2E93',
            duration: 1,
          })
          .to(
            '.curse-kanji-burst',
            {
              scale: 2.2,
              opacity: 1,
              filter: 'drop-shadow(0 0 30px #EFFF00)',
              duration: 1.2,
            },
            '-=0.5'
          )
          .to(
            '.scene-2-shatter',
            {
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
              duration: 1,
            },
            '-=0.8'
          )
          .to('.scene-2-dialogue', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
          });
      }

      // SCENE 3: Horizontal Scroll Progression inside vertical container
      if (scene3HorizRef.current) {
        const horizContainer = scene3HorizRef.current.querySelector('.horiz-track');
        if (horizContainer) {
          gsap.to(horizContainer, {
            x: () => -(horizContainer.scrollWidth - window.innerWidth + 100),
            ease: 'none',
            scrollTrigger: {
              trigger: scene3HorizRef.current,
              start: 'top top',
              end: '+=2000',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
        }
      }

      // SCENE 4: Double Page Spread Climax Clashing
      if (scene4SpreadRef.current) {
        gsap.from('.spread-left', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.2,
          },
          x: -160,
          scale: 0.85,
        });

        gsap.from('.spread-right', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.2,
          },
          x: 160,
          scale: 0.85,
        });

        gsap.from('.climax-boom', {
          scrollTrigger: {
            trigger: scene4SpreadRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          rotation: 360,
          opacity: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full bg-[#050505] border-b border-[#17171C] overflow-hidden"
    >
      {/* Background Halftone & Scanlines */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Intro Section Header */}
      <div className="relative z-20 max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-8 text-left">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#FF2E93] tracking-wider mb-2">
          <BookOpen className="h-4 w-4" />
          <span>// 04. CHRONICLES OF SECTOR-IV: THE MANGA LOGS</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          INTERCEPTED <span className="text-[#EFFF00]">MANGA MANIFEST</span>
        </h2>
        <p className="mt-2 text-zinc-400 font-sans-tech max-w-2xl text-sm sm:text-base">
          Scroll-driven sequential panels tracking the collision between extraterrestrial scout fleets
          and urban Japanese cursed anomalies. Witness the breach as it unfolds.
        </p>
      </div>

      {/* ========================================================= */}
      {/* SCENE 01: MIDNIGHT HIGHWAY PURSUIT */}
      {/* ========================================================= */}
      <div
        ref={scene1Ref}
        className="relative z-20 max-w-6xl mx-auto py-20 px-4 sm:px-8 space-y-12"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-mono-tech text-xs text-zinc-500">
          <span>CHAPTER 01 // OVERPASS PURSUIT AT 03:00 AM</span>
          <span className="text-[#FF2E93]">STATUS: PURSUIT ACTIVE</span>
        </div>

        {/* Dynamic Asymmetric Manga Panels */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Onomatopoeia FX Floating */}
          <div className="scene-1-fx absolute -top-8 right-6 z-30 pointer-events-none">
            <span className="manga-fx-text text-5xl sm:text-7xl text-[#EFFF00]">
              ドドドドド!!
            </span>
          </div>

          {/* Left Panel: Vehicle Tunnel Chase */}
          <div className="scene-1-left md:col-span-7 border-4 border-white bg-black p-5 shadow-[12px_12px_0px_#FF2E93] relative overflow-hidden">
            <div className="absolute inset-0 manga-speedlines opacity-40" />
            <div className="relative z-10 space-y-4 text-left">
              <div className="inline-block bg-white text-black px-2 py-0.5 font-manga text-xs">
                PAGE 04
              </div>
              <div className="h-56 bg-zinc-900 border border-zinc-700 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-halftone opacity-50" />
                <span className="font-manga text-8xl text-white/10 select-none">爆速</span>
                <div className="relative z-10 text-center">
                  <span className="text-6xl filter drop-shadow-[0_0_15px_#EFFF00]">🏎️💨</span>
                  <div className="mt-2 font-mono-tech text-xs text-[#EFFF00] font-bold">
                    VELOCITY: MACH 1.4 // OVERPASS B6
                  </div>
                </div>
              </div>

              {/* Dialogue Balloon */}
              <div className="relative inline-block border-2 border-black bg-white p-3 text-black font-manga text-sm max-w-sm rounded-xl shadow-[4px_4px_0px_#00E5FF]">
                「追いつかれるぞッ！！ あれは普通の星人じゃねぇ…時速100キロのババアだ！！」
                <p className="mt-1 font-mono-tech text-[10px] text-zinc-600">
                  "It's catching up!! That's no standard alien... that's Turbo Granny at Mach speed!!"
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Rearview Mirror Ghost Encounter */}
          <div className="scene-1-right md:col-span-5 border-4 border-[#00E5FF] bg-black p-5 shadow-[10px_10px_0px_#EFFF00] relative overflow-hidden">
            <div className="relative z-10 space-y-4 text-left">
              <div className="h-64 bg-[#09090D] border border-zinc-700 relative flex flex-col items-center justify-center p-4">
                <div className="font-manga text-7xl text-[#FF2E93] opacity-25 select-none absolute">
                  怪死
                </div>
                <span className="text-6xl filter drop-shadow-[0_0_15px_#FF2E93]">👁️⚡</span>
                <div className="mt-4 font-mono-tech text-xs text-[#00E5FF] text-center">
                  REARVIEW RADAR: PROXIMITY CRITICAL
                </div>
              </div>

              {/* Character Dialogue */}
              <div className="relative border-2 border-white bg-black p-3 text-white font-mono-tech text-xs rounded shadow-[4px_4px_0px_#FF2E93]">
                <span className="text-[#FF2E93] font-bold">&gt; SIGNAL WARNING:</span>
                <p className="text-zinc-200 mt-1">
                  "Optical sensors blinded by spiritual static. Brace for physical collision!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCENE 02: PINNED OFUDA TALISMAN IGNITION */}
      {/* ========================================================= */}
      <div
        ref={scene2PinRef}
        className="relative z-20 min-h-screen w-full flex flex-col items-center justify-center bg-[#09090D] p-6 border-y-2 border-[#17171C]"
      >
        <div className="absolute top-8 left-8 flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00]">
          <Zap className="h-4 w-4" />
          <span>CHAPTER 02 // PINNED INCIDENT: THE SACRED SEAL IGNITION</span>
        </div>

        {/* Central Ofuda Parchment Talisman */}
        <div className="relative flex flex-col items-center justify-center my-auto">
          {/* Sound FX Typography */}
          <div className="absolute -top-16 font-manga text-6xl sm:text-8xl text-[#FF2E93] tracking-tighter manga-fx-text pointer-events-none">
            バチチチチッ!!
          </div>

          {/* Talisman Body */}
          <div className="ofuda-parchment relative w-56 sm:w-72 h-80 sm:h-96 border-4 border-black bg-[#FAF7EE] text-black p-6 flex flex-col justify-between items-center shadow-[15px_15px_0px_#00E5FF] transition-all">
            {/* Top Talisman Header */}
            <div className="font-manga text-sm tracking-widest text-red-700">
              急急如律令
            </div>

            {/* Central Mystical Kanji Column */}
            <div className="curse-kanji-burst font-manga text-5xl sm:text-6xl text-red-900 tracking-wider select-none">
              怨霊<br />封滅
            </div>

            {/* Bottom Cursed Seal Stamp */}
            <div className="border-2 border-red-700 p-1 text-center font-manga text-[10px] text-red-700">
              超常現象対策課之印
            </div>
          </div>

          {/* Sequential Animated Dialogue Lines */}
          <div className="mt-10 max-w-xl text-center space-y-3">
            <div className="scene-2-dialogue opacity-0 translate-y-4 font-manga text-xl sm:text-2xl text-[#EFFF00] glow-yellow">
              「オイ！ 札を剥がすなッ！ 霊が全解放されるぞ！！」
            </div>
            <div className="scene-2-dialogue opacity-0 translate-y-4 font-mono-tech text-xs sm:text-sm text-zinc-300">
              "DON'T TEAR OFF THE TALISMAN! YOU'RE UNLEASHING THE ENTIRE SUBTERRANEAN SPIRIT SWARM!!"
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCENE 03: HORIZONTAL PINNED TRACK (UFO ABDUCTION FLEET) */}
      {/* ========================================================= */}
      <div
        ref={scene3HorizRef}
        className="relative z-20 min-h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-center"
      >
        <div className="px-8 py-4 flex items-center justify-between font-mono-tech text-xs text-zinc-500 border-b border-zinc-800">
          <span className="text-[#00E5FF] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            CHAPTER 03 // HORIZONTAL PAN: THE SERPO INVASION MOTHERSHIP
          </span>
          <span className="text-[#EFFF00]">SCROLL DOWN TO ADVANCE TIMELINE &rarr;</span>
        </div>

        {/* Horizontal Track Container */}
        <div className="horiz-track flex items-center gap-8 px-12 py-12">
          {/* Panel A: The Approaching Saucer */}
          <div className="w-[360px] sm:w-[480px] shrink-0 border-4 border-white bg-black p-6 shadow-[10px_10px_0px_#00E5FF]">
            <div className="font-manga text-sm text-[#00E5FF] mb-2">SEQUENCE 01</div>
            <div className="h-64 bg-zinc-900 border border-zinc-700 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-halftone opacity-40" />
              <div className="text-center">
                <span className="text-7xl filter drop-shadow-[0_0_20px_#00E5FF]">🛸</span>
                <div className="mt-3 font-mono-tech text-xs text-[#00E5FF] font-bold">
                  ALTITUDE: 1,200M // TRACTOR FIELD READY
                </div>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-xs text-zinc-300">
              "The sky turned electric magenta. The clouds folded inwards like origami."
            </p>
          </div>

          {/* Panel B: Sound Effect Onomatopoeia */}
          <div className="w-[280px] shrink-0 border-4 border-[#FF2E93] bg-[#09090D] p-6 flex flex-col items-center justify-center text-center shadow-[10px_10px_0px_#EFFF00]">
            <span className="manga-fx-text text-6xl text-[#FF2E93]">ゴゴゴゴ!!</span>
            <div className="mt-4 font-manga text-xs text-white">GRAVITATIONAL PRESSURE INTENSIFIES</div>
          </div>

          {/* Panel C: Serpo Alien Telepathic Dialogue */}
          <div className="w-[380px] sm:w-[500px] shrink-0 border-4 border-[#EFFF00] bg-black p-6 shadow-[10px_10px_0px_#FF2E93]">
            <div className="font-manga text-sm text-[#EFFF00] mb-2">SEQUENCE 02</div>
            <div className="h-64 bg-zinc-900 border border-zinc-700 relative flex items-center justify-center p-4">
              <div className="font-manga text-8xl text-white/5 select-none absolute">侵略</div>
              <div className="relative z-10 text-center space-y-3">
                <span className="text-6xl">👽👽👽</span>
                <div className="border border-[#EFFF00] bg-black/80 p-3 text-left">
                  <p className="font-mono-tech text-xs text-[#EFFF00]">
                    「地球人のバナナ器官を回収する…契約に従いなさい。」
                  </p>
                  <p className="font-mono-tech text-[10px] text-zinc-400 mt-1">
                    "Surrender the anatomical organs of reproduction... comply with Serpo protocol."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel D: Spectral Counter-Attack */}
          <div className="w-[360px] sm:w-[480px] shrink-0 border-4 border-white bg-black p-6 shadow-[10px_10px_0px_#00E5FF]">
            <div className="font-manga text-sm text-[#FF2E93] mb-2">SEQUENCE 03</div>
            <div className="h-64 bg-zinc-900 border border-zinc-700 relative flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl filter drop-shadow-[0_0_20px_#FF2E93]">🔥👻</span>
                <div className="mt-3 font-mono-tech text-xs text-[#FF2E93] font-bold">
                  TURBO SPIRIT REVERSAL ENGAGED
                </div>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-xs text-zinc-300">
              "Turbo Granny kicks through the tractor beam at 120km/h!"
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCENE 04: DOUBLE PAGE SPREAD CLIMAX */}
      {/* ========================================================= */}
      <div
        ref={scene4SpreadRef}
        className="relative z-20 max-w-6xl mx-auto py-24 px-4 sm:px-8 text-center space-y-12"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-mono-tech text-xs text-zinc-500">
          <span>CHAPTER 04 // DOUBLE PAGE CLIMAX: SPIRIT VS EXTRATERRESTRIAL</span>
          <span className="text-[#00E5FF]">DIMENSIONAL RIFT RUPTURE</span>
        </div>

        {/* Central Explosive Manga Boom */}
        <div className="climax-boom relative z-30 inline-block">
          <span className="manga-fx-text text-6xl sm:text-9xl text-[#EFFF00] filter drop-shadow-[0_0_35px_#FF2E93]">
            ドォォォォン!!
          </span>
        </div>

        {/* Clashing Double Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Spread Left: The Ghost Exorcism Kick */}
          <div className="spread-left border-4 border-white bg-black p-6 shadow-[14px_14px_0px_#FF2E93] text-left">
            <div className="font-manga text-xs text-[#FF2E93] mb-2">PAGE 18 [LEFT SPREAD]</div>
            <div className="h-72 bg-[#09090D] border border-zinc-700 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 manga-speedlines opacity-50" />
              <div className="text-center relative z-10">
                <span className="font-manga text-6xl text-white block mb-2">神速</span>
                <span className="font-mono-tech text-xs text-[#EFFF00]">TURBO SPIRIT HYPERSONIC IMPACT</span>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-sm text-zinc-300">
              "The ghost fist collides with the saucer's forcefield, ripping the dimensional fabric wide open!"
            </p>
          </div>

          {/* Spread Right: Alien Quantum Disintegration */}
          <div className="spread-right border-4 border-[#00E5FF] bg-black p-6 shadow-[14px_14px_0px_#EFFF00] text-left">
            <div className="font-manga text-xs text-[#00E5FF] mb-2">PAGE 19 [RIGHT SPREAD]</div>
            <div className="h-72 bg-[#09090D] border border-zinc-700 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-halftone opacity-40" />
              <div className="text-center relative z-10">
                <span className="font-manga text-6xl text-[#00E5FF] block mb-2">次元崩落</span>
                <span className="font-mono-tech text-xs text-[#FF2E93]">COSMIC WARP FIELD OVERLOAD</span>
              </div>
            </div>
            <p className="mt-4 font-sans-tech text-sm text-zinc-300">
              "All frequencies spike to maximum. Reality glitches into pure monochromatic screentone."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
