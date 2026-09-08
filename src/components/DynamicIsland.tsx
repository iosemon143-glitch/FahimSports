import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Package,
  Music,
  Play,
  Pause,
  SkipForward,
  Headphones,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  Navigation,
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface DynamicIslandProps {
  cartNotice?: string | null;
  onOpenOrders?: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ cartNotice, onOpenOrders }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'delivery' | 'music'>('delivery');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [deliveryProgress, setDeliveryProgress] = useState<number>(68);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // When a cart notice arrives, trigger dynamic island alert briefly
  useEffect(() => {
    if (cartNotice) {
      setShowNotification(cartNotice);
      triggerHaptic('success');
      const timer = setTimeout(() => {
        setShowNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [cartNotice]);

  // Handle tap to toggle expansion
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('medium');
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Backdrop overlay to collapse on click outside */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              triggerHaptic('light');
              setIsExpanded(false);
            }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Dynamic Island Physical Pill & Expanded Container */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1.5 z-50 pointer-events-auto">
        <motion.div
          layout
          onClick={handleToggleExpand}
          title={isExpanded ? undefined : 'Dynamic Island • Tap to expand'}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 30,
            mass: 0.8,
          }}
          className={`relative bg-black text-white overflow-hidden cursor-pointer select-none transition-shadow ${
            isExpanded
              ? 'w-[350px] min-h-[172px] rounded-[36px] p-4 shadow-[0_26px_65px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)]'
              : 'w-[124px] h-[34px] rounded-[20px] flex items-center justify-between px-3 shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_0.8px_rgba(255,255,255,0.15)] active:scale-[0.97]'
          }`}
        >
          {/* Subtle Top Specular Glass Reflection */}
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/12 to-transparent pointer-events-none rounded-t-[inherit]" />

          {/* ================= COMPACT STATE ================= */}
          {!isExpanded && (
            <div className="w-full flex items-center justify-between pointer-events-none">
              {/* Left Wing (Leading Content) */}
              <div className="flex items-center space-x-1.5">
                {showNotification ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                ) : activeTab === 'delivery' ? (
                  <div className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center shadow-xs">
                    <Truck className="w-2.5 h-2.5 text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-[4px] bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-xs">
                    <Music className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              {/* Physical TrueDepth Camera & Sensor Assembly */}
              <div className="flex items-center space-x-1">
                {/* Ambient sensor */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
                {/* Camera lens with anti-reflective glass glare */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#0c1220] ring-1 ring-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#1e3a8a]/80 shadow-[0_0_2px_rgba(30,58,138,0.8)]" />
                </div>
              </div>

              {/* Right Wing (Trailing Content) */}
              <div className="flex items-center">
                {showNotification ? (
                  <span className="text-[10px] font-bold text-emerald-400 truncate max-w-[42px]">
                    Saved
                  </span>
                ) : activeTab === 'delivery' ? (
                  <div className="flex items-center space-x-1">
                    <span className="text-[11px] font-black text-[#FF6B00] tracking-tight">12m</span>
                  </div>
                ) : (
                  /* Animated Real Sound Waveform Equalizer */
                  <div className="flex items-end space-x-0.5 h-3">
                    <motion.div
                      animate={isPlaying ? { height: ['3px', '11px', '5px', '9px', '3px'] } : { height: '3px' }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                      className="w-[2.5px] bg-emerald-400 rounded-full"
                    />
                    <motion.div
                      animate={isPlaying ? { height: ['7px', '3px', '12px', '4px', '7px'] } : { height: '3px' }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.15 }}
                      className="w-[2.5px] bg-emerald-400 rounded-full"
                    />
                    <motion.div
                      animate={isPlaying ? { height: ['11px', '4px', '8px', '2px', '11px'] } : { height: '3px' }}
                      transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut', delay: 0.3 }}
                      className="w-[2.5px] bg-emerald-400 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= EXPANDED STATE ================= */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full flex flex-col justify-between h-full relative z-10 space-y-3.5"
            >
              {/* Header: Segmented Pill Tab Switcher + Close Pill */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center space-x-1 bg-white/10 p-0.5 rounded-full border border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic('selection');
                      setActiveTab('delivery');
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1.5 transition ${
                      activeTab === 'delivery'
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Truck className="w-3 h-3" />
                    <span>Express Order</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic('selection');
                      setActiveTab('music');
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1.5 transition ${
                      activeTab === 'music'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Music className="w-3 h-3" />
                    <span>Workout Beats</span>
                  </button>
                </div>

                {/* Collapse Button */}
                <button
                  onClick={handleToggleExpand}
                  className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/80 transition cursor-pointer"
                  title="Collapse Dynamic Island"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tab 1: Live Order Delivery Activity */}
              {activeTab === 'delivery' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#FF6B00]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-xs font-black text-white">Nike Air Zoom Delivery</h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <p className="text-[11px] text-white/60 font-medium">Order #SP-8924 • On the Way</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#FF6B00] tracking-tight">12 MIN</span>
                      <p className="text-[10px] text-white/50 font-medium">1.4 km away</p>
                    </div>
                  </div>

                  {/* Animated Progress Track */}
                  <div className="relative pt-1 pb-0.5">
                    <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FFA000] rounded-full"
                        style={{ width: `${deliveryProgress}%` }}
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>
                    {/* Courier Moving Icon */}
                    <div
                      className="absolute -top-1 transition-all duration-500"
                      style={{ left: `calc(${deliveryProgress}% - 10px)` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                        <Truck className="w-3 h-3 text-[#FF6B00]" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center space-x-2 pt-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic('light');
                        if (onOpenOrders) onOpenOrders();
                        setIsExpanded(false);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-[11px] font-bold text-white flex items-center justify-center space-x-1.5 border border-white/10"
                    >
                      <Navigation className="w-3 h-3 text-[#FF6B00]" />
                      <span>Track Courier</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic('light');
                        alert('Connecting to courier Antony Delivery Partner (+1 800 555-NIKE)...');
                      }}
                      className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-[11px] font-bold text-white flex items-center justify-center space-x-1.5 border border-white/10"
                    >
                      <PhoneCall className="w-3 h-3 text-emerald-400" />
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Now Playing Workout Beats */}
              {activeTab === 'music' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
                        <Music className="w-5 h-5 text-white" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-black text-white truncate max-w-[170px]">
                          Nike Speed Run - High BPM
                        </h4>
                        <div className="flex items-center space-x-1.5 text-[10px] text-white/60">
                          <Headphones className="w-3 h-3 text-emerald-400" />
                          <span>AirPods Pro • 98%</span>
                        </div>
                      </div>
                    </div>

                    {/* Play/Pause & Next Controls */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic('selection');
                          setIsPlaying(!isPlaying);
                        }}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-md cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic('light');
                        }}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 active:scale-95 transition cursor-pointer"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Audio Track Scrubber Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: '42%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-white/50 font-mono">
                      <span>1:28</span>
                      <span>3:42</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Apple Dynamic Island Grab Bar */}
              <div className="w-9 h-1 rounded-full bg-white/25 mx-auto" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};
