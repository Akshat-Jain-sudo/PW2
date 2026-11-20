import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [coords, setCoords] = useState({ lat: '28.6139', lng: '77.2090' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Calculate Delhi spatial coordinates with subtle interactive offset
      const mockLat = (28.6139 + (e.clientY / window.innerHeight) * 0.02).toFixed(4);
      const mockLng = (77.2090 + (e.clientX / window.innerWidth) * 0.02).toFixed(4);
      setCoords({ lat: mockLat, lng: mockLng });

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-target');
        const isEntityTarget =
          target.closest('.project-card') ||
          target.closest('.radar-canvas') ||
          target.closest('.identity-card');

        setIsHovering(Boolean(isClickable));
        setIsLocked(Boolean(isEntityTarget));
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Smooth lagging trailing crosshair
  useEffect(() => {
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.22),
        y: lerp(prev.y, position.y, 0.22),
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Precision Core Reticle */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
            isLocked
              ? 'bg-[#a78bfa] scale-125 ring-2 ring-[#a78bfa]/40'
              : isHovering
              ? 'bg-[#38bdf8] scale-125'
              : 'bg-zinc-400'
          }`}
        />
      </div>

      {/* Trailing Cybernetic Crosshair HUD */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${
            isLocked
              ? 'h-12 w-12 rotate-45 border border-[#a78bfa]'
              : isHovering
              ? 'h-10 w-10 border border-[#38bdf8]'
              : 'h-8 w-8 border border-zinc-700/60 rounded-full'
          }`}
        >
          {/* Crosshair ticks */}
          <span className="absolute -top-1.5 left-1/2 h-1 w-[1px] -translate-x-1/2 bg-zinc-500" />
          <span className="absolute -bottom-1.5 left-1/2 h-1 w-[1px] -translate-x-1/2 bg-zinc-500" />
          <span className="absolute -left-1.5 top-1/2 h-[1px] w-1 -translate-y-1/2 bg-zinc-500" />
          <span className="absolute -right-1.5 top-1/2 h-[1px] w-1 -translate-y-1/2 bg-zinc-500" />

          {/* Coordinate Tag */}
          <div className="absolute left-6 top-6 whitespace-nowrap rounded bg-black/85 px-1.5 py-0.5 text-[9px] font-mono-tech tracking-tighter text-zinc-400 backdrop-blur-sm border border-zinc-800">
            {isLocked ? (
              <span className="text-[#a78bfa] font-bold">CASE FILE LOCKED</span>
            ) : (
              <span>
                DELHI // {coords.lat}°N, {coords.lng}°E
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
