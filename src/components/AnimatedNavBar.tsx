import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavTab } from '../types';
import {
  AnimatedHomeIcon,
  AnimatedMessagesIcon,
  AnimatedWishlistIcon,
  AnimatedChatIcon,
  AnimatedFacebookIcon,
} from './AnimatedIcons';
import { triggerHaptic } from '../utils/haptics';

interface AnimatedNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  wishlistCount?: number;
}

interface TabItem {
  id: NavTab;
  label: string;
  badge?: number | string;
}

export const AnimatedNavBar = React.memo<AnimatedNavBarProps>(({
  activeTab,
  onTabChange,
  wishlistCount = 0,
}) => {
  const tabs: TabItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'messages', label: 'Messages' },
    { id: 'wishlist', label: 'Wishlist', badge: wishlistCount > 0 ? wishlistCount : undefined },
    { id: 'chat', label: 'Chat' },
    { id: 'facebook', label: 'Facebook' },
  ];

  const renderIcon = (tabId: NavTab, isActive: boolean) => {
    switch (tabId) {
      case 'home':
        return <AnimatedHomeIcon isActive={isActive} />;
      case 'messages':
        return <AnimatedMessagesIcon isActive={isActive} />;
      case 'wishlist':
        return <AnimatedWishlistIcon isActive={isActive} />;
      case 'chat':
        return <AnimatedChatIcon isActive={isActive} />;
      case 'facebook':
      case 'social':
        return <AnimatedFacebookIcon isActive={isActive} />;
      default:
        return <AnimatedHomeIcon isActive={isActive} />;
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center flex-shrink-0 select-none z-30 pb-2 pt-1"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}
    >
      {/* iPhone Liquid Glass Pill Container */}
      <nav
        className="relative overflow-hidden iphone-liquid-glass rounded-full px-2 py-1.5 flex items-center justify-between gap-1 w-[92%] max-w-[372px]"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Curved Liquid Glass Specular Lens Reflection */}
        <div className="liquid-glass-lens" />

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => {
                triggerHaptic('selection');
                onTabChange(tab.id);
              }}
              whileTap={{ scale: 0.84 }}
              whileHover={{ scale: 1.03 }}
              className={`relative flex items-center justify-center h-12 rounded-full select-none cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'px-4 text-white'
                  : 'w-11 text-[#5E6472] hover:text-[#141416] hover:bg-white/40 active:bg-white/50'
              }`}
            >
              {/* Animated Liquid Spring Capsule Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavigationPill"
                  className="absolute inset-0 rounded-full liquid-pill-active -z-10 overflow-hidden"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 28,
                    mass: 0.75,
                  }}
                >
                  {/* Viscous Liquid Specular Highlight */}
                  <div className="liquid-pill-sheen" />
                </motion.div>
              )}

              {/* Animated Icon with Fluid Motion */}
              <div className="relative flex items-center justify-center">
                {renderIcon(tab.id, isActive)}

                {/* Badge Indicator for Inactive Tabs */}
                {tab.badge && !isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 bg-gradient-to-b from-[#FF7A1A] to-[#E64C00] text-white text-[9px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center ring-1.5 ring-white/90 shadow-[0_2px_8px_rgba(255,107,0,0.5)]"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </div>

              {/* Animated Label Slide-in */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -6, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: -6, width: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="ml-1.5 text-xs font-bold tracking-tight text-white whitespace-nowrap overflow-hidden drop-shadow-xs"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* iOS Frosted Glass Home Indicator Bar */}
      <div className="w-32 h-1 bg-black/75 rounded-full mt-2 pointer-events-auto shadow-[0_1px_2px_rgba(255,255,255,0.4)]" />
    </div>
  );
});

AnimatedNavBar.displayName = 'AnimatedNavBar';
