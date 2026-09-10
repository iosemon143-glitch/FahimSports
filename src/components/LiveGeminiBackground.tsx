import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type GeminiPreset = 'gemini-official' | 'gemini-aurora' | 'gemini-sunset' | 'gemini-midnight';
export type GeminiTheme = 'cosmic-dark' | 'aurora-frost';

interface LiveGeminiBackgroundProps {
  theme?: GeminiTheme;
  preset?: GeminiPreset;
  speed?: 'calm' | 'normal' | 'dynamic';
  className?: string;
  intensity?: 'vibrant' | 'medium' | 'ambient';
  showSparkles?: boolean;
  interactive?: boolean;
}

interface Orb {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  colorStops: { stop: number; color: string }[];
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
  speedMultiplier: number;
}

const PALETTES: Record<GeminiPreset, { dark: string[][]; light: string[][] }> = {
  'gemini-official': {
    dark: [
      ['rgba(26, 115, 232, 0.85)', 'rgba(37, 99, 235, 0.45)', 'rgba(26, 115, 232, 0)'], // Gemini Cobalt
      ['rgba(124, 58, 237, 0.80)', 'rgba(147, 51, 234, 0.40)', 'rgba(124, 58, 237, 0)'], // Cosmic Violet
      ['rgba(0, 242, 254, 0.85)', 'rgba(6, 182, 212, 0.45)', 'rgba(0, 242, 254, 0)'],   // Neon Cyan
      ['rgba(255, 94, 54, 0.75)', 'rgba(255, 107, 0, 0.35)', 'rgba(255, 94, 54, 0)'],   // Coral Solar
      ['rgba(138, 180, 248, 0.70)', 'rgba(99, 102, 241, 0.30)', 'rgba(138, 180, 248, 0)'], // Starlight Blue
      ['rgba(168, 85, 247, 0.65)', 'rgba(236, 72, 153, 0.30)', 'rgba(168, 85, 247, 0)'], // Magenta Plasma
    ],
    light: [
      ['rgba(59, 130, 246, 0.55)', 'rgba(147, 197, 253, 0.25)', 'rgba(59, 130, 246, 0)'],
      ['rgba(139, 92, 246, 0.50)', 'rgba(196, 181, 253, 0.20)', 'rgba(139, 92, 246, 0)'],
      ['rgba(14, 165, 233, 0.55)', 'rgba(186, 230, 253, 0.25)', 'rgba(14, 165, 233, 0)'],
      ['rgba(249, 115, 22, 0.45)', 'rgba(254, 215, 170, 0.20)', 'rgba(249, 115, 22, 0)'],
      ['rgba(99, 102, 241, 0.40)', 'rgba(199, 210, 254, 0.20)', 'rgba(99, 102, 241, 0)'],
      ['rgba(217, 70, 239, 0.40)', 'rgba(245, 208, 254, 0.18)', 'rgba(217, 70, 239, 0)'],
    ],
  },
  'gemini-aurora': {
    dark: [
      ['rgba(16, 185, 129, 0.85)', 'rgba(5, 150, 105, 0.45)', 'rgba(16, 185, 129, 0)'],  // Emerald Aurora
      ['rgba(6, 182, 212, 0.85)', 'rgba(14, 165, 233, 0.45)', 'rgba(6, 182, 212, 0)'],   // Polar Cyan
      ['rgba(99, 102, 241, 0.80)', 'rgba(79, 70, 229, 0.40)', 'rgba(99, 102, 241, 0)'],   // Royal Indigo
      ['rgba(168, 85, 247, 0.75)', 'rgba(147, 51, 234, 0.35)', 'rgba(168, 85, 247, 0)'], // Violet Glow
      ['rgba(45, 212, 191, 0.70)', 'rgba(20, 184, 166, 0.35)', 'rgba(45, 212, 191, 0)'], // Teal Flare
      ['rgba(37, 99, 235, 0.65)', 'rgba(29, 78, 216, 0.30)', 'rgba(37, 99, 235, 0)'],    // Deep Sea
    ],
    light: [
      ['rgba(52, 211, 153, 0.50)', 'rgba(167, 243, 208, 0.25)', 'rgba(52, 211, 153, 0)'],
      ['rgba(56, 189, 248, 0.50)', 'rgba(186, 230, 253, 0.25)', 'rgba(56, 189, 248, 0)'],
      ['rgba(129, 140, 248, 0.45)', 'rgba(199, 210, 254, 0.20)', 'rgba(129, 140, 248, 0)'],
      ['rgba(192, 132, 252, 0.45)', 'rgba(233, 213, 255, 0.20)', 'rgba(192, 132, 252, 0)'],
      ['rgba(45, 212, 191, 0.45)', 'rgba(204, 251, 241, 0.20)', 'rgba(45, 212, 191, 0)'],
      ['rgba(96, 165, 250, 0.40)', 'rgba(219, 234, 254, 0.20)', 'rgba(96, 165, 250, 0)'],
    ],
  },
  'gemini-sunset': {
    dark: [
      ['rgba(255, 81, 47, 0.85)', 'rgba(244, 63, 94, 0.45)', 'rgba(255, 81, 47, 0)'],    // Hot Coral
      ['rgba(221, 36, 118, 0.80)', 'rgba(219, 39, 119, 0.40)', 'rgba(221, 36, 118, 0)'], // Neon Fuchsia
      ['rgba(121, 40, 202, 0.80)', 'rgba(147, 51, 234, 0.40)', 'rgba(121, 40, 202, 0)'], // Velvet Purple
      ['rgba(255, 142, 83, 0.75)', 'rgba(249, 115, 22, 0.35)', 'rgba(255, 142, 83, 0)'], // Golden Amber
      ['rgba(244, 114, 182, 0.70)', 'rgba(236, 72, 153, 0.30)', 'rgba(244, 114, 182, 0)'],// Soft Rose
      ['rgba(79, 70, 229, 0.65)', 'rgba(67, 56, 202, 0.30)', 'rgba(79, 70, 229, 0)'],    // Dusk Indigo
    ],
    light: [
      ['rgba(251, 113, 133, 0.50)', 'rgba(254, 205, 211, 0.25)', 'rgba(251, 113, 133, 0)'],
      ['rgba(244, 114, 182, 0.50)', 'rgba(251, 207, 232, 0.25)', 'rgba(244, 114, 182, 0)'],
      ['rgba(192, 132, 252, 0.45)', 'rgba(233, 213, 255, 0.20)', 'rgba(192, 132, 252, 0)'],
      ['rgba(251, 146, 60, 0.50)', 'rgba(254, 215, 170, 0.25)', 'rgba(251, 146, 60, 0)'],
      ['rgba(248, 113, 113, 0.45)', 'rgba(254, 202, 202, 0.20)', 'rgba(248, 113, 113, 0)'],
      ['rgba(167, 139, 250, 0.40)', 'rgba(221, 214, 254, 0.20)', 'rgba(167, 139, 250, 0)'],
    ],
  },
  'gemini-midnight': {
    dark: [
      ['rgba(59, 130, 246, 0.85)', 'rgba(30, 64, 175, 0.45)', 'rgba(59, 130, 246, 0)'],   // Electric Sapphire
      ['rgba(236, 72, 153, 0.80)', 'rgba(190, 24, 93, 0.40)', 'rgba(236, 72, 153, 0)'],   // Hot Magenta
      ['rgba(139, 92, 246, 0.80)', 'rgba(109, 40, 217, 0.40)', 'rgba(139, 92, 246, 0)'],  // Ultraviolet
      ['rgba(6, 182, 212, 0.75)', 'rgba(14, 116, 144, 0.35)', 'rgba(6, 182, 212, 0)'],   // Electric Cyan
      ['rgba(16, 185, 129, 0.65)', 'rgba(4, 120, 87, 0.30)', 'rgba(16, 185, 129, 0)'],    // Matrix Teal
      ['rgba(99, 102, 241, 0.70)', 'rgba(67, 56, 202, 0.30)', 'rgba(99, 102, 241, 0)'],   // Deep Void
    ],
    light: [
      ['rgba(96, 165, 250, 0.50)', 'rgba(219, 234, 254, 0.25)', 'rgba(96, 165, 250, 0)'],
      ['rgba(244, 114, 182, 0.50)', 'rgba(251, 207, 232, 0.25)', 'rgba(244, 114, 182, 0)'],
      ['rgba(167, 139, 250, 0.45)', 'rgba(221, 214, 254, 0.20)', 'rgba(167, 139, 250, 0)'],
      ['rgba(56, 189, 248, 0.45)', 'rgba(186, 230, 253, 0.20)', 'rgba(56, 189, 248, 0)'],
      ['rgba(52, 211, 153, 0.40)', 'rgba(167, 243, 208, 0.18)', 'rgba(52, 211, 153, 0)'],
      ['rgba(129, 140, 248, 0.40)', 'rgba(199, 210, 254, 0.18)', 'rgba(129, 140, 248, 0)'],
    ],
  },
};

export const LiveGeminiBackground = React.memo<LiveGeminiBackgroundProps>(({
  theme = 'cosmic-dark',
  preset = 'gemini-official',
  speed = 'normal',
  className = '',
  intensity = 'vibrant',
  showSparkles = true,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const isDark = theme === 'cosmic-dark';

  // Twinkling organic Gemini constellation sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: `${(i * 17 + 9) % 94 + 3}%`,
      y: `${(i * 27 + 13) % 91 + 4}%`,
      size: (i % 3) * 1.5 + 2,
      duration: 2.8 + (i % 5) * 1.1,
      delay: (i % 6) * 0.6,
    }));
  }, []);

  // Intensity opacity multiplier
  const opacityMultiplier =
    intensity === 'vibrant'
      ? isDark ? 1.0 : 0.85
      : intensity === 'ambient'
      ? isDark ? 0.5 : 0.4
      : isDark ? 0.75 : 0.65;

  const speedFactor = speed === 'calm' ? 0.5 : speed === 'dynamic' ? 1.6 : 1.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = containerRef.current || canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const isAndroidWebView = /Android/i.test(navigator.userAgent);
      const dpr = Math.min(window.devicePixelRatio || 1, isAndroidWebView ? 1 : 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Configure chromatic orbs based on current preset and mode
    const paletteStops = isDark ? PALETTES[preset].dark : PALETTES[preset].light;

    const orbs: Orb[] = [
      {
        baseX: 0.25,
        baseY: 0.25,
        x: 0.25,
        y: 0.25,
        radius: 0.48,
        colorStops: [
          { stop: 0, color: paletteStops[0][0] },
          { stop: 0.5, color: paletteStops[0][1] },
          { stop: 1, color: paletteStops[0][2] },
        ],
        freqX: 0.00065,
        freqY: 0.0005,
        phaseX: 0,
        phaseY: Math.PI * 0.25,
        speedMultiplier: 1.0,
      },
      {
        baseX: 0.75,
        baseY: 0.35,
        x: 0.75,
        y: 0.35,
        radius: 0.52,
        colorStops: [
          { stop: 0, color: paletteStops[1][0] },
          { stop: 0.55, color: paletteStops[1][1] },
          { stop: 1, color: paletteStops[1][2] },
        ],
        freqX: 0.0005,
        freqY: 0.0007,
        phaseX: Math.PI * 0.5,
        phaseY: Math.PI * 0.75,
        speedMultiplier: 0.85,
      },
      {
        baseX: 0.35,
        baseY: 0.75,
        x: 0.35,
        y: 0.75,
        radius: 0.46,
        colorStops: [
          { stop: 0, color: paletteStops[2][0] },
          { stop: 0.5, color: paletteStops[2][1] },
          { stop: 1, color: paletteStops[2][2] },
        ],
        freqX: 0.00075,
        freqY: 0.00055,
        phaseX: Math.PI * 0.75,
        phaseY: 0,
        speedMultiplier: 1.15,
      },
      {
        baseX: 0.7,
        baseY: 0.8,
        x: 0.7,
        y: 0.8,
        radius: 0.50,
        colorStops: [
          { stop: 0, color: paletteStops[3][0] },
          { stop: 0.5, color: paletteStops[3][1] },
          { stop: 1, color: paletteStops[3][2] },
        ],
        freqX: 0.00045,
        freqY: 0.00065,
        phaseX: Math.PI * 1.2,
        phaseY: Math.PI * 0.4,
        speedMultiplier: 0.95,
      },
      {
        baseX: 0.5,
        baseY: 0.5,
        x: 0.5,
        y: 0.5,
        radius: 0.58,
        colorStops: [
          { stop: 0, color: paletteStops[4][0] },
          { stop: 0.6, color: paletteStops[4][1] },
          { stop: 1, color: paletteStops[4][2] },
        ],
        freqX: 0.0004,
        freqY: 0.0004,
        phaseX: Math.PI * 0.1,
        phaseY: Math.PI * 0.9,
        speedMultiplier: 0.7,
      },
      {
        baseX: 0.15,
        baseY: 0.6,
        x: 0.15,
        y: 0.6,
        radius: 0.42,
        colorStops: [
          { stop: 0, color: paletteStops[5][0] },
          { stop: 0.5, color: paletteStops[5][1] },
          { stop: 1, color: paletteStops[5][2] },
        ],
        freqX: 0.0008,
        freqY: 0.0006,
        phaseX: Math.PI * 1.5,
        phaseY: Math.PI * 1.1,
        speedMultiplier: 1.2,
      },
    ];

    let startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * speedFactor;

      ctx.clearRect(0, 0, width, height);

      // Draw dark or light base gradient
      const baseGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      if (isDark) {
        baseGrad.addColorStop(0, '#060914');
        baseGrad.addColorStop(0.65, '#04060E');
        baseGrad.addColorStop(1, '#020308');
      } else {
        baseGrad.addColorStop(0, '#FFFFFF');
        baseGrad.addColorStop(0.7, '#F3F6FD');
        baseGrad.addColorStop(1, '#EBF0FA');
      }
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Set blend mode for pure chromatic luminosity
      ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
      ctx.globalAlpha = opacityMultiplier;

      const maxDim = Math.max(width, height);

      // Render each moving chromatic orb
      orbs.forEach((orb) => {
        // Natural harmonic Lissajous movement
        const waveX = Math.sin(elapsed * orb.freqX + orb.phaseX) * 0.28;
        const waveY = Math.cos(elapsed * orb.freqY + orb.phaseY) * 0.28;

        let targetX = (orb.baseX + waveX) * width;
        let targetY = (orb.baseY + waveY) * height;

        // Pointer gravity attraction
        if (interactive && pointerRef.current.active) {
          const dx = pointerRef.current.x - targetX;
          const dy = pointerRef.current.y - targetY;
          const dist = Math.hypot(dx, dy);
          const maxPull = maxDim * 0.4;
          if (dist < maxPull) {
            const force = (1 - dist / maxPull) * 0.35;
            targetX += dx * force;
            targetY += dy * force;
          }
        }

        // Smooth damping
        orb.x += (targetX - orb.x) * 0.08;
        orb.y += (targetY - orb.y) * 0.08;

        // Breathing pulsation
        const pulse = 1 + Math.sin(elapsed * 0.0012 + orb.phaseX) * 0.12;
        const currentRadius = orb.radius * maxDim * pulse;

        const radial = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        orb.colorStops.forEach((cs) => {
          radial.addColorStop(cs.stop, cs.color);
        });

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restore normal composite
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [preset, isDark, speedFactor, opacityMultiplier, interactive]);

  // Pointer move handlers
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${
        isDark ? 'bg-[#050711]' : 'bg-[#F4F6FC]'
      } transition-colors duration-700 ${className}`}
      aria-hidden="true"
    >
      {/* Real-time High Performance Fluid Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0 filter blur-[8px] sm:blur-[12px]"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Dynamic Cosmic Base Vignette */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(8,12,24,0)_0%,_rgba(4,6,14,0.65)_70%,_rgba(2,3,8,0.92)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(235,240,252,0.5)_75%,_rgba(225,232,248,0.85)_100%)]'
        } z-10`}
      />

      {/* Living Chromatic Color Grading Conic Wave */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] ${
          isDark
            ? 'bg-[conic-gradient(from_0deg_at_50%_50%,_rgba(66,133,244,0.1)_0deg,_rgba(147,51,234,0.12)_90deg,_rgba(6,182,212,0.09)_180deg,_rgba(255,107,0,0.08)_270deg,_rgba(66,133,244,0.1)_360deg)]'
            : 'bg-[conic-gradient(from_0deg_at_50%_50%,_rgba(59,130,246,0.08)_0deg,_rgba(168,85,247,0.08)_90deg,_rgba(14,165,233,0.07)_180deg,_rgba(249,115,22,0.07)_270deg,_rgba(59,130,246,0.08)_360deg)]'
        } mix-blend-overlay z-15 pointer-events-none filter blur-xl`}
      />

      {/* Gemini Starlight Sparkles (Micro-constellation) */}
      {showSparkles && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{
                opacity: [0.15, 0.9, 0.2],
                scale: [0.8, 1.45, 0.85],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: 'easeInOut',
              }}
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
              }}
              className={`absolute rounded-full ${
                isDark
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.95),0_0_16px_rgba(66,133,244,0.7)]'
                  : 'bg-[#4285F4] shadow-[0_0_6px_rgba(66,133,244,0.6)]'
              }`}
            />
          ))}
        </div>
      )}

      {/* Fine Filmic Grain Layer for Ultra-Smooth Band-Free Gradient Rendering */}
      <div
        className="absolute inset-0 z-25 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
});

LiveGeminiBackground.displayName = 'LiveGeminiBackground';
