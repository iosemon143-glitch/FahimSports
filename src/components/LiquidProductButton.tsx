import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { formatBDT } from '../utils/currency';

interface LiquidRipple {
  id: number;
  x: number;
  y: number;
}

export interface LiquidProductButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'compact' | 'medium' | 'large' | 'secondary-liquid';
  label?: string;
  price?: number;
  icon?: 'zap' | 'bag' | 'check' | 'none';
  color?: 'orange' | 'dark' | 'glass';
  className?: string;
  isSuccess?: boolean;
  disabled?: boolean;
}

export const LiquidProductButton: React.FC<LiquidProductButtonProps> = ({
  onClick,
  variant = 'compact',
  label = 'Buy',
  price,
  icon = 'zap',
  color = 'orange',
  className = '',
  isSuccess = false,
  disabled = false,
}) => {
  const [ripples, setRipples] = useState<LiquidRipple[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;

    triggerHaptic('medium');

    // Calculate exact click coordinates relative to button for fluid ripple
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple: LiquidRipple = { id: Date.now() + Math.random(), x, y };

      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 750);
    }

    onClick(e);
  };

  // Dimensions & typography based on variant
  const sizeClasses =
    variant === 'compact'
      ? 'h-[28px] px-2.5 text-[10px]'
      : variant === 'medium'
      ? 'h-[32px] px-3 text-[11px]'
      : variant === 'large'
      ? 'h-[48px] px-5 text-[13px] sm:text-[14px]'
      : 'h-[48px] px-4 text-[12px]';

  // Base themes
  const colorBg =
    color === 'orange'
      ? 'bg-gradient-to-r from-[#FF5E00] via-[#FF6B00] to-[#FF8500] text-white shadow-[0_4px_14px_rgba(255,107,0,0.35)]'
      : color === 'dark'
      ? 'bg-gradient-to-r from-[#141416] via-[#1E2026] to-[#141416] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]'
      : 'bg-white/80 backdrop-blur-md text-[#141416] border border-white/40 shadow-[0_4px_14px_rgba(0,0,0,0.06)]';

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.91, y: 0.5 }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 20,
        mass: 0.6,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative group overflow-hidden rounded-full font-black flex items-center justify-center select-none cursor-pointer tracking-tight transition-shadow ${sizeClasses} ${colorBg} ${className}`}
    >
      {/* 1. Fluid Liquid Background Simulation with Dual Layer Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
        {/* Deep Fluid Layer */}
        <div className="absolute -bottom-2 -left-2 w-[240%] h-[140%] opacity-40 pointer-events-none flex animate-liquid-wave-a">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/25">
            <path d="M 0 50 Q 100 20, 200 50 T 400 50 T 600 50 T 800 50 L 800 200 L 0 200 Z" />
          </svg>
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/25">
            <path d="M 0 50 Q 100 20, 200 50 T 400 50 T 600 50 T 800 50 L 800 200 L 0 200 Z" />
          </svg>
        </div>

        {/* Dynamic Foreground Liquid Wave */}
        <div className="absolute -bottom-1 -left-2 w-[240%] h-[130%] opacity-35 pointer-events-none flex animate-liquid-wave-b">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/40">
            <path d="M 0 65 Q 100 85, 200 65 T 400 65 T 600 65 T 800 65 L 800 200 L 0 200 Z" />
          </svg>
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/40">
            <path d="M 0 65 Q 100 85, 200 65 T 400 65 T 600 65 T 800 65 L 800 200 L 0 200 Z" />
          </svg>
        </div>

        {/* Floating Liquid Effervescence Bubbles */}
        <span className="absolute left-[25%] w-1.5 h-1.5 rounded-full bg-white/70 pointer-events-none animate-bubble-1" />
        <span className="absolute left-[70%] w-1.5 h-1.5 rounded-full bg-white/60 pointer-events-none animate-bubble-2" />
        <span className="absolute left-[45%] w-1 h-1 rounded-full bg-white/75 pointer-events-none animate-bubble-3" />
      </div>

      {/* 2. Top Specular Curved Liquid Meniscus Highlight (Liquid Glass Sheen) */}
      <div className="absolute top-[1px] left-[6px] right-[6px] h-[44%] rounded-t-full bg-gradient-to-b from-white/55 via-white/18 to-transparent pointer-events-none" />

      {/* 3. Sweeping Liquid Light Flare on Hover/Resting */}
      <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-liquid-sheen" />

      {/* 4. Interactive Fluid Droplet Tap Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 3.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              left: ripple.x - 24,
              top: ripple.y - 24,
              width: 48,
              height: 48,
            }}
            className="absolute rounded-full bg-radial from-white/90 to-white/10 pointer-events-none z-20"
          />
        ))}
      </AnimatePresence>

      {/* 5. Foreground Label & Icon Content with Spring Morphing */}
      <div className="relative z-10 flex items-center space-x-1.5 pointer-events-none">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
              <span>Added!</span>
            </motion.div>
          ) : (
            <motion.div
              key="normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-1"
            >
              {icon === 'zap' && (
                <motion.div
                  animate={isHovered ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Zap
                    className={`fill-current ${
                      variant === 'compact'
                        ? 'w-2.5 h-2.5 text-white'
                        : variant === 'medium'
                        ? 'w-3 h-3 text-white'
                        : 'w-4 h-4 text-white'
                    }`}
                  />
                </motion.div>
              )}

              {icon === 'bag' && (
                <ShoppingBag
                  className={
                    variant === 'compact'
                      ? 'w-2.5 h-2.5'
                      : variant === 'medium'
                      ? 'w-3 h-3'
                      : 'w-4 h-4'
                  }
                />
              )}

              <span className="leading-none">{label}</span>

              {price !== undefined && (
                <span className="opacity-90 font-mono text-[90%] font-bold">
                  • {formatBDT(price)}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
