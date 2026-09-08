import React from 'react';
import { motion } from 'framer-motion';

// --- Home Animated Icon ---
export const AnimatedHomeIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    animate={isActive ? { scale: [1, 1.25, 0.95, 1.08, 1], y: [0, -3, 0] } : { scale: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
    className="relative flex items-center justify-center w-5 h-5"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <motion.path
        d="M3 9.5L12 2.5L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        animate={isActive ? { strokeWidth: [2.3, 2.7, 2.3] } : { strokeWidth: 2.3 }}
      />
      <motion.path
        d="M9 21V12H15V21"
        animate={isActive ? { y: [0, -1, 0] } : { y: 0 }}
      />
    </svg>
    {isActive && (
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 0], opacity: [1, 0.8, 0], y: [-2, -8] }}
        transition={{ duration: 0.5 }}
        className="absolute -top-1 w-1 h-1 bg-white rounded-full"
      />
    )}
  </motion.div>
);

// --- Messages Animated Icon ---
export const AnimatedMessagesIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    animate={isActive ? { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.2, 1] } : { scale: 1, rotate: 0 }}
    transition={{ duration: 0.45 }}
    className="relative flex items-center justify-center w-5 h-5"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="16" x="2" y="4" rx="3" />
      <motion.path
        d="M22 7L13.03 12.7C12.4 13.1 11.6 13.1 10.97 12.7L2 7"
        animate={isActive ? { pathLength: [0.8, 1] } : { pathLength: 1 }}
      />
    </svg>
  </motion.div>
);

// --- Wishlist Animated Icon with Cardiac Pulse ---
export const AnimatedWishlistIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    animate={isActive ? {
      scale: [1, 1.35, 0.9, 1.2, 1],
      rotate: [0, -6, 6, 0]
    } : { scale: 1, rotate: 0 }}
    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    className="relative flex items-center justify-center w-5 h-5"
  >
    <svg
      viewBox="0 0 24 24"
      fill={isActive ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>

    {/* Cardiac ring pulse on active */}
    {isActive && (
      <motion.div
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-white pointer-events-none"
      />
    )}
  </motion.div>
);

// --- Chat Animated Icon with Bouncing Typing Dots ---
export const AnimatedChatIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    animate={isActive ? { scale: [1, 1.22, 1], y: [0, -2, 0] } : { scale: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="relative flex items-center justify-center w-5 h-5"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
    {/* Inside typing dots */}
    <div className="absolute inset-0 flex items-center justify-center space-x-[2px] pb-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={isActive ? { y: [0, -2, 0], opacity: [0.6, 1, 0.6] } : { y: 0, opacity: 0.8 }}
          transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, delay: i * 0.15 }}
          className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-current'}`}
        />
      ))}
    </div>
  </motion.div>
);

// --- Facebook Animated Icon with Bouncy Pop & Thumb-Up Micro Reaction ---
export const AnimatedFacebookIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    animate={
      isActive
        ? {
            scale: [1, 1.22, 0.94, 1.08, 1],
            rotate: [0, -10, 10, -5, 5, 0],
          }
        : { scale: 1, rotate: 0 }
    }
    whileHover={{ scale: 1.15, rotate: 5 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
    className="relative flex items-center justify-center w-5 h-5"
  >
    {/* Authentic Facebook 'f' in circle badge */}
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-[#1877F2] hover:brightness-110'
      }`}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>

    {/* Floating Like/Thumbs-Up Micro-Burst Reaction on Active */}
    {isActive && (
      <motion.div
        initial={{ scale: 0, y: 2, opacity: 0 }}
        animate={{ scale: [0, 1.25, 1], y: [0, -10, -12], opacity: [0, 1, 0] }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="absolute -top-1 right-0 w-3 h-3 bg-white text-[#1877F2] rounded-full flex items-center justify-center shadow-xs pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      </motion.div>
    )}
  </motion.div>
);

// --- Social Animated Icon (Legacy fallback) ---
export const AnimatedSocialIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <AnimatedFacebookIcon isActive={isActive} />
);

// --- Bell Icon with Swinging Ringer ---
export const AnimatedBell: React.FC<{ hasUnread?: boolean }> = ({ hasUnread = true }) => {
  return (
    <motion.div
      whileHover={{ rotate: [0, -15, 15, -10, 10, -5, 5, 0] }}
      whileTap={{ scale: 0.88 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      {hasUnread && (
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FF6B00] rounded-full ring-2 ring-white"
        />
      )}
    </motion.div>
  );
};
