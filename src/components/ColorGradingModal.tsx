import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Sliders, Moon, Sun, Wind, Zap } from 'lucide-react';
import { GeminiPreset, GeminiTheme } from './LiveGeminiBackground';
import { triggerHaptic } from '../utils/haptics';

interface ColorGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: GeminiPreset;
  onSelectPreset: (preset: GeminiPreset) => void;
  theme: GeminiTheme;
  onToggleTheme: () => void;
  speed: 'calm' | 'normal' | 'dynamic';
  onSelectSpeed: (speed: 'calm' | 'normal' | 'dynamic') => void;
}

const PRESET_OPTIONS: {
  id: GeminiPreset;
  name: string;
  desc: string;
  gradient: string;
}[] = [
  {
    id: 'gemini-official',
    name: 'Gemini Signature',
    desc: 'Deep Cobalt, Violet, Neon Cyan & Solar Flare',
    gradient: 'from-[#1A73E8] via-[#7C3AED] to-[#00F2FE]',
  },
  {
    id: 'gemini-aurora',
    name: 'Polar Aurora',
    desc: 'Emerald Lights, Polar Cyan & Royal Indigo',
    gradient: 'from-[#10B981] via-[#06B6D4] to-[#6366F1]',
  },
  {
    id: 'gemini-sunset',
    name: 'Solar Plasma',
    desc: 'Hot Coral, Fuchsia, Velvet Purple & Amber',
    gradient: 'from-[#FF512F] via-[#DD2476] to-[#FF8E53]',
  },
  {
    id: 'gemini-midnight',
    name: 'Cyber Midnight',
    desc: 'Electric Sapphire, Hot Magenta & Neon Mint',
    gradient: 'from-[#3B82F6] via-[#EC4899] to-[#8B5CF6]',
  },
];

export const ColorGradingModal: React.FC<ColorGradingModalProps> = ({
  isOpen,
  onClose,
  preset,
  onSelectPreset,
  theme,
  onToggleTheme,
  speed,
  onSelectSpeed,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="w-full max-w-sm rounded-[32px] bg-[#0E1324]/90 border border-white/20 text-white shadow-[0_25px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl p-6 overflow-hidden relative"
          >
            {/* Top Gloss Lens */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1A73E8] to-[#00F2FE] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.5)]">
                  <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-white flex items-center space-x-1.5">
                    <span>Gemini Color Grading</span>
                  </h3>
                  <p className="text-[11px] text-white/60 font-medium">Live Dynamic Plasma Fluid Engine</p>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic('light');
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Switcher Row */}
            <div className="relative z-10 mb-4 bg-white/5 rounded-2xl p-1.5 border border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  if (theme !== 'cosmic-dark') onToggleTheme();
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition ${
                  theme === 'cosmic-dark'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Cosmic Dark</span>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('selection');
                  if (theme !== 'aurora-frost') onToggleTheme();
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition ${
                  theme === 'aurora-frost'
                    ? 'bg-white text-slate-900 shadow-md font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Aurora Frost</span>
              </button>
            </div>

            {/* Presets List */}
            <div className="relative z-10 space-y-2 mb-4">
              <label className="text-[11px] uppercase tracking-wider font-bold text-white/50 block">
                Chromatic Spectrums
              </label>

              {PRESET_OPTIONS.map((opt) => {
                const isSelected = preset === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      triggerHaptic('selection');
                      onSelectPreset(opt.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-white/15 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ring-1 ring-white/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Gradient Swatch */}
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${opt.gradient} p-0.5 shadow-md flex items-center justify-center shrink-0`}
                      >
                        <div className="w-full h-full rounded-[10px] bg-black/20 flex items-center justify-center">
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white">{opt.name}</span>
                          {isSelected && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/50 font-medium">{opt.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Speed Control */}
            <div className="relative z-10 mb-5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-white/50 block mb-2">
                Fluid Motion Cadence
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'calm', label: 'Calm', icon: Wind },
                  { id: 'normal', label: 'Fluid', icon: Sliders },
                  { id: 'dynamic', label: 'Dynamic', icon: Zap },
                ].map((s) => {
                  const isSelected = speed === s.id;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        triggerHaptic('selection');
                        onSelectSpeed(s.id as 'calm' | 'normal' | 'dynamic');
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center space-y-1 border transition ${
                        isSelected
                          ? 'bg-blue-600/40 border-blue-400 text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition cursor-pointer relative z-10"
            >
              Apply Live Color Grading
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
