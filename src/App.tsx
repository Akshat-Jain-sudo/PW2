import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BootSequence } from './components/BootSequence';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IdentitySection } from './components/IdentitySection';
import { ProjectsSection } from './components/ProjectsSection';
import { AlgorithmScanner } from './components/AlgorithmScanner';
import { JourneySection } from './components/JourneySection';
import { HackerTerminal } from './components/HackerTerminal';
import { TransmissionSection } from './components/TransmissionSection';
import { ResumeModal } from './components/ResumeModal';
import { soundFX } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      anchors: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top when boot completes to prevent starting at the bottom
  useEffect(() => {
    if (bootCompleted) {
      // Reset scroll position immediately when main content mounts
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [bootCompleted]);

  const handleTriggerGlitch = () => {
    setIsGlitching(true);
    soundFX.playGlitch();
    setTimeout(() => {
      setIsGlitching(false);
    }, 400);
  };

  const handleReboot = () => {
    setBootCompleted(false);
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden selection:bg-[#FF2E93] selection:text-white">
      {/* Global Interactive Reticle / Crosshair HUD */}
      <CustomCursor />

      {/* Screen Glitch Filter Burst */}
      {isGlitching && (
        <div className="fixed inset-0 z-99999 pointer-events-none bg-[#00E5FF]/20 mix-blend-color-dodge backdrop-invert animate-pulse" />
      )}

      {/* Boot Loading Experience */}
      {!bootCompleted ? (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      ) : (
        <>
          {/* Persistent Indian Cyberpunk Navbar */}
          <Navbar
            onTriggerGlitch={handleTriggerGlitch}
            onResumeClick={() => setIsResumeOpen(true)}
          />

          {/* Main Experience Flow */}
          <main className="relative z-10 w-full">
            {/* 1. Hero 3D Section */}
            <HeroSection onResumeClick={() => setIsResumeOpen(true)} />

            {/* 2. Developer Identity Dossier & Technical Capabilities */}
            <IdentitySection />

            {/* 3. Engineering Projects Archive */}
            <ProjectsSection />

            {/* 4. Interactive DSA Algorithm Radar (PixiJS 2D Canvas) */}
            <AlgorithmScanner />

            {/* 5. Scroll-Driven Manga Journey: India to Engineering (GSAP ScrollTrigger) */}
            <JourneySection />

            {/* 6. Functional Hacker Terminal */}
            <HackerTerminal />

            {/* 7. Transmission & Direct Communication Channels */}
            <TransmissionSection
              onReboot={handleReboot}
              onResumeClick={() => setIsResumeOpen(true)}
            />
          </main>

          {/* Recruiter Verified Resume Dossier Modal */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
