import React from 'react';
import { motion } from 'framer-motion';

interface CategoryIconProps {
  isSelected: boolean;
  className?: string;
}

// ==========================================
// 1. ALL: Dynamic Multi-Sport Energy Crest
// ==========================================
export const AllCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? { scale: [1, 1.16, 0.94, 1], rotate: [0, -8, 8, 0] }
          : { scale: 1, rotate: 0 }
      }
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="allGradPrimary" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#FF6B00'} />
            <stop offset="1" stopColor={isSelected ? '#FFE0B2' : '#FF9100'} />
          </linearGradient>
          <linearGradient id="allGradDark" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#141416'} />
            <stop offset="1" stopColor={isSelected ? '#F5F5F5' : '#2D3139'} />
          </linearGradient>
          <radialGradient id="allGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FF8500" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FF8500" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Energy Glow on Selection */}
        {isSelected && (
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#allGlow)"
            animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        )}

        {/* Orbiting Speed Particle Ring */}
        <motion.circle
          cx="20"
          cy="20"
          r="16"
          stroke={isSelected ? '#FFFFFF' : '#FF6B00'}
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          style={{ originX: '20px', originY: '20px' }}
        />

        {/* 4 Quadrants representing multi-sport arenas */}
        {/* Top-Left Quadrant */}
        <motion.rect
          x="7"
          y="7"
          width="11"
          height="11"
          rx="3.5"
          fill="url(#allGradPrimary)"
          animate={
            isSelected
              ? { scale: [1, 1.15, 1], x: [0, -1, 0], y: [0, -1, 0] }
              : { scale: [1, 1.04, 1] }
          }
          transition={{ repeat: isSelected ? 0 : Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
        {/* Top-Right Quadrant */}
        <motion.rect
          x="22"
          y="7"
          width="11"
          height="11"
          rx="3.5"
          fill="url(#allGradDark)"
          animate={
            isSelected
              ? { scale: [1, 1.15, 1], x: [0, 1, 0], y: [0, -1, 0] }
              : { scale: [1, 1.04, 1] }
          }
          transition={{ repeat: isSelected ? 0 : Infinity, duration: 2.4, delay: 0.2, ease: 'easeInOut' }}
        />
        {/* Bottom-Left Quadrant */}
        <motion.rect
          x="7"
          y="22"
          width="11"
          height="11"
          rx="3.5"
          fill="url(#allGradDark)"
          animate={
            isSelected
              ? { scale: [1, 1.15, 1], x: [0, -1, 0], y: [0, 1, 0] }
              : { scale: [1, 1.04, 1] }
          }
          transition={{ repeat: isSelected ? 0 : Infinity, duration: 2.4, delay: 0.4, ease: 'easeInOut' }}
        />
        {/* Bottom-Right Quadrant */}
        <motion.rect
          x="22"
          y="22"
          width="11"
          height="11"
          rx="3.5"
          fill="url(#allGradPrimary)"
          animate={
            isSelected
              ? { scale: [1, 1.15, 1], x: [0, 1, 0], y: [0, 1, 0] }
              : { scale: [1, 1.04, 1] }
          }
          transition={{ repeat: isSelected ? 0 : Infinity, duration: 2.4, delay: 0.6, ease: 'easeInOut' }}
        />

        {/* Central Golden Core Diamond */}
        <motion.polygon
          points="20,15 25,20 20,25 15,20"
          fill={isSelected ? '#FF6B00' : '#FFFFFF'}
          stroke={isSelected ? '#FFFFFF' : '#FF6B00'}
          strokeWidth="1.5"
          animate={{ scale: [0.95, 1.15, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ originX: '20px', originY: '20px' }}
        />
      </svg>
    </motion.div>
  );
};

// ==========================================
// 2. JERSEY: Real Pro Athletic Match Kit
// ==========================================
export const JerseyCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? {
              y: [0, -4, 0],
              rotate: [0, -9, 9, -4, 4, 0],
              scale: [1, 1.18, 1],
            }
          : {
              y: [0, -1.5, 0],
              rotate: [0, -1.5, 1.5, 0],
            }
      }
      transition={
        isSelected
          ? { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }
          : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
      }
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="jerseyBodyGrad" x1="10" y1="6" x2="30" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#141416'} />
            <stop offset="0.7" stopColor={isSelected ? '#F8FAFC' : '#1E2026'} />
            <stop offset="1" stopColor={isSelected ? '#E2E8F0' : '#0B0C0E'} />
          </linearGradient>
          <linearGradient id="jerseyAccentGrad" x1="12" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B00" />
            <stop offset="1" stopColor="#FF9100" />
          </linearGradient>
        </defs>

        {/* Dynamic Jersey Fabric Shadow */}
        <ellipse cx="20" cy="35" rx="11" ry="2" fill="rgba(0,0,0,0.18)" />

        {/* Pro Athletic Kit Main Silhouette (Body + Aerodynamic Raglan Sleeves) */}
        <path
          d="M12 8L4 13.5L7.5 19.5L11.5 17.5V34H28.5V17.5L32.5 19.5L36 13.5L28 8C27 10.5 24 12 20 12C16 12 13 10.5 12 8Z"
          fill="url(#jerseyBodyGrad)"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.2"
        />

        {/* Contrast Ribbed V-Neck / Collar */}
        <path
          d="M15 8C16 10.5 17.8 12 20 12C22.2 12 24 10.5 25 8"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Gold Champion Star Above Crest */}
        <polygon
          points="15,14 16,16 18,16 16.5,17.2 17,19 15,17.8 13,19 13.5,17.2 12,16 14,16"
          fill="#FFB800"
          transform="scale(0.55) translate(8, 7)"
        />

        {/* Left Chest Athletic Crest Badge */}
        <rect
          x="14"
          y="15"
          width="3.5"
          height="4.5"
          rx="1"
          fill={isSelected ? '#FF6B00' : '#FF6B00'}
        />

        {/* Sleek Racing Side Mesh Stripes */}
        <path
          d="M12.5 18L12.5 32M27.5 18L27.5 32"
          stroke={isSelected ? '#FF6B00' : '#38BDF8'}
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Center Iconic Number "10" */}
        {/* '1' */}
        <path
          d="M18 22L19.5 20.5V27M18 27H21"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* '0' */}
        <rect
          x="22"
          y="20.5"
          width="4"
          height="6.5"
          rx="2"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="1.6"
        />

        {/* Sleeve Cuffs Stripes */}
        <line
          x1="5"
          y1="15.5"
          x2="8"
          y2="19"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="35"
          y1="15.5"
          x2="32"
          y2="19"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

// ==========================================
// 3. TROUSER: Pro Athletic Track Pants / Joggers
// ==========================================
export const TrouserCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? { y: [0, -5, 0], scale: [1, 1.16, 1] }
          : { y: [0, -1.2, 0] }
      }
      transition={
        isSelected
          ? { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
          : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
      }
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="pantsFabricGrad" x1="10" y1="5" x2="30" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#141416'} />
            <stop offset="0.8" stopColor={isSelected ? '#F1F5F9' : '#1C1F26'} />
            <stop offset="1" stopColor={isSelected ? '#CBD5E1' : '#0E0F12'} />
          </linearGradient>
        </defs>

        {/* Cast Ground Shadow */}
        <ellipse cx="20" cy="36.5" rx="10" ry="1.8" fill="rgba(0,0,0,0.18)" />

        {/* Ribbed Elastic Waistband */}
        <rect
          x="10"
          y="6"
          width="20"
          height="4.5"
          rx="2.2"
          fill={isSelected ? '#FFFFFF' : '#1E2026'}
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.2"
        />

        {/* Swinging Aglet Drawstrings */}
        <motion.path
          d="M18 10.5V14M22 10.5V14"
          stroke={isSelected ? '#FF6B00' : '#FF8500'}
          strokeWidth="1.4"
          strokeLinecap="round"
          animate={
            isSelected
              ? { rotate: [-15, 15, -10, 10, 0] }
              : { rotate: [-4, 4, -4] }
          }
          transition={{ repeat: isSelected ? 0 : Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ originX: '20px', originY: '10px' }}
        />

        {/* Tapered Athletic Legs Silhouette with Ergonomic Knee Articulation */}
        <path
          d="M10.5 10.5L8.5 29C8.5 30.5 9.5 31.5 11 31.5H15C16.2 31.5 17 30.5 17 29L18.8 17L21.2 17L23 29C23 30.5 23.8 31.5 25 31.5H29C30.5 31.5 31.5 30.5 31.5 29L29.5 10.5H10.5Z"
          fill="url(#pantsFabricGrad)"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.2"
        />

        {/* Contrast High-Visibility Racing Side Stripes */}
        <path
          d="M11 13L9.5 28.5M29 13L30.5 28.5"
          stroke={isSelected ? '#FF6B00' : '#FF6B00'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Zipped Pocket Detail on Right Hip */}
        <line
          x1="24"
          y1="12.5"
          x2="28"
          y2="14.5"
          stroke={isSelected ? '#FF6B00' : '#777E90'}
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Ergonomic Articulated Knee Seams */}
        <path
          d="M11.5 21C13 22 15 22 16.5 21M23.5 21C25 22 27 22 28.5 21"
          stroke={isSelected ? '#CBD5E1' : '#3E4450'}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Ribbed Ankle Cuffs */}
        <rect x="9.5" y="31.5" width="5.5" height="3" rx="1.2" fill={isSelected ? '#FF6B00' : '#141416'} />
        <rect x="25" y="31.5" width="5.5" height="3" rx="1.2" fill={isSelected ? '#FF6B00' : '#141416'} />
      </svg>
    </motion.div>
  );
};

// ==========================================
// 4. FOOTBALL: Real 3D 32-Panel Match Soccer Ball
// ==========================================
export const FootballCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? {
              rotate: [0, 360],
              y: [0, -7, 0],
              scale: [1, 1.25, 0.95, 1],
            }
          : {
              rotate: [0, 15, -15, 0],
              y: [0, -2, 0],
            }
      }
      transition={
        isSelected
          ? { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }
          : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
      }
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          {/* Real 3D Spherical Volume Lighting */}
          <radialGradient id="ballSphereGrad" cx="35%" cy="32%" r="65%">
            <stop stopColor={isSelected ? '#FFFFFF' : '#FFFFFF'} />
            <stop offset="0.6" stopColor={isSelected ? '#FFF3E8' : '#ECEEF2'} />
            <stop offset="0.88" stopColor={isSelected ? '#FFE0C2' : '#CBD2DC'} />
            <stop offset="1" stopColor={isSelected ? '#FFCCA0' : '#94A3B8'} />
          </radialGradient>
          {/* Pentagon Panel Gradient */}
          <linearGradient id="pentagonGrad" x1="14" y1="13" x2="26" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FF6B00' : '#141416'} />
            <stop offset="1" stopColor={isSelected ? '#FF8A00' : '#2D3139'} />
          </linearGradient>
        </defs>

        {/* Dynamic Ground Squash Shadow */}
        <motion.ellipse
          cx="20"
          cy="36"
          rx="12"
          ry="2.4"
          fill="rgba(0,0,0,0.22)"
          animate={
            isSelected
              ? { scale: [1, 0.6, 1.1, 1], opacity: [0.3, 0.1, 0.4, 0.3] }
              : { scale: [1, 0.9, 1] }
          }
          transition={isSelected ? { duration: 0.75 } : { repeat: Infinity, duration: 4 }}
        />

        {/* 3D Ball Sphere Base */}
        <circle
          cx="20"
          cy="19"
          r="15"
          fill="url(#ballSphereGrad)"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.6"
        />

        {/* Central Pentagon Panel */}
        <polygon
          points="20,13 25.5,17 23.5,23.5 16.5,23.5 14.5,17"
          fill="url(#pentagonGrad)"
          stroke={isSelected ? '#FFFFFF' : '#141416'}
          strokeWidth="1.4"
        />

        {/* Surrounding Seam Lines joining Outer Hexagons */}
        <path
          d="M20 13V6M25.5 17L32 13.5M23.5 23.5L28.5 29M16.5 23.5L11.5 29M14.5 17L8 13.5"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Outer Perimeter Pentagons/Hexagons for 3D Perspective */}
        <path
          d="M16 5.5C18.5 4.8 21.5 4.8 24 5.5M34 16C34.8 18.5 34.8 21.5 34 24M26.5 31.5C24.5 32.8 21.5 33.2 19 33.2C16.5 33.2 13.5 32.8 11.5 31.5M6 24C5.2 21.5 5.2 18.5 6 16"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top Specular Curved Highlight */}
        <ellipse cx="16" cy="11" rx="4" ry="2" fill="white" opacity={0.65} />
      </svg>
    </motion.div>
  );
};

// ==========================================
// 5. CRICKET: English Willow Bat & Leather Ball
// ==========================================
export const CricketCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? {
              rotate: [0, -32, 18, -10, 0],
              scale: [1, 1.24, 1],
            }
          : {
              rotate: [0, -4, 4, 0],
            }
      }
      transition={
        isSelected
          ? { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }
          : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
      }
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          {/* Authentic English Willow Wood Grain Gradient */}
          <linearGradient id="willowWoodGrad" x1="12" y1="6" x2="30" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#E8C59A'} />
            <stop offset="0.5" stopColor={isSelected ? '#F8FAFC' : '#D4A373'} />
            <stop offset="1" stopColor={isSelected ? '#E2E8F0' : '#BC8A5F'} />
          </linearGradient>
          {/* Red Leather Cricket Ball Radial Gradient */}
          <radialGradient id="redLeatherGrad" cx="35%" cy="35%" r="65%">
            <stop stopColor={isSelected ? '#FF7A1A' : '#FF4B4B'} />
            <stop offset="0.75" stopColor={isSelected ? '#FF5500' : '#C1121F'} />
            <stop offset="1" stopColor={isSelected ? '#D94400' : '#780000'} />
          </radialGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="20" cy="36" rx="11" ry="2" fill="rgba(0,0,0,0.18)" />

        {/* Cricket Bat Blade */}
        <path
          d="M22 6L28 11.5L14 34.5C12.8 36 10.5 36.5 8.8 35.2C7.2 34 6.8 31.8 7.8 30L22 6Z"
          fill="url(#willowWoodGrad)"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.4"
        />

        {/* Bat Spine / Sweet Spot Contour */}
        <path
          d="M25 8.5L12 32"
          stroke={isSelected ? '#FF6B00' : '#8B5A2B'}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Branded Shoulder / Blade Decal */}
        <rect
          x="19"
          y="8"
          width="4"
          height="7"
          rx="1"
          transform="rotate(-40 19 8)"
          fill={isSelected ? '#FF6B00' : '#FF6B00'}
        />

        {/* Spiral Rubber Grip Handle */}
        <line
          x1="23"
          y1="6.5"
          x2="32"
          y2="-2"
          stroke={isSelected ? '#FFFFFF' : '#141416'}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* Handle Grip Ribs */}
        <line
          x1="24.5"
          y1="5"
          x2="25.5"
          y2="4"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="2.8"
        />
        <line
          x1="27"
          y1="2.5"
          x2="28"
          y2="1.5"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="2.8"
        />

        {/* 4-Piece Match Leather Cricket Ball */}
        <motion.circle
          cx="28"
          cy="26"
          r="6.5"
          fill="url(#redLeatherGrad)"
          stroke={isSelected ? '#FFFFFF' : '#141416'}
          strokeWidth="1.4"
          animate={
            isSelected
              ? { scale: [1, 1.25, 1], rotate: [0, 360] }
              : { scale: 1 }
          }
          transition={isSelected ? { duration: 0.6 } : {}}
          style={{ originX: '28px', originY: '26px' }}
        />

        {/* Raised White Cricket Ball Stitched Seam */}
        <motion.path
          d="M23 26C25.5 28.5 30.5 28.5 33 26"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeDasharray="1.2 1"
          strokeLinecap="round"
          animate={isSelected ? { rotate: [0, 180] } : {}}
          style={{ originX: '28px', originY: '26px' }}
        />

        {/* Impact Light Spark */}
        {isSelected && (
          <motion.circle
            cx="21"
            cy="24"
            r="2"
            fill="#FFFFFF"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 0] }}
            transition={{ duration: 0.4 }}
          />
        )}
      </svg>
    </motion.div>
  );
};

// ==========================================
// 6. SHOES: Pro Aerodynamic Football Cleat / Running Sneaker
// ==========================================
export const ShoesCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? {
              x: [0, 5, -2, 0],
              y: [0, -5, 0],
              rotate: [0, -12, 8, 0],
              scale: [1, 1.22, 1],
            }
          : {
              y: [0, -2, 0],
              rotate: [0, -3, 3, 0],
            }
      }
      transition={
        isSelected
          ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
          : { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }
      }
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="shoeUpperGrad" x1="4" y1="12" x2="36" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#141416'} />
            <stop offset="0.65" stopColor={isSelected ? '#F1F5F9' : '#1E2026'} />
            <stop offset="1" stopColor={isSelected ? '#E2E8F0' : '#0F1014'} />
          </linearGradient>
          <linearGradient id="swooshGrad" x1="10" y1="22" x2="28" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5E00" />
            <stop offset="1" stopColor="#FF9100" />
          </linearGradient>
        </defs>

        {/* Cast Ground Shadow */}
        <ellipse cx="20" cy="35" rx="14" ry="2" fill="rgba(0,0,0,0.2)" />

        {/* Spiked Cleat Outsole Studs */}
        <path
          d="M7 29.5L6 33M12 29.5L12 33.5M25 29.5L25 33.5M30 29L31 32.5"
          stroke={isSelected ? '#FF6B00' : '#FF6B00'}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Rigid Carbon Fiber Outsole Plate */}
        <path
          d="M4 27.5C8 27.5 13 28.5 19 28C25 27.5 32 28 36 26.5C36.5 28.5 34.5 30 31 30H7C4.5 30 3.5 29 4 27.5Z"
          fill={isSelected ? '#FFFFFF' : '#141416'}
          stroke={isSelected ? '#FF6B00' : '#0B0C0E'}
          strokeWidth="1.2"
        />

        {/* Dynamic Aerodynamic Upper Body */}
        <path
          d="M6 27L8 19C9 16.5 11.5 15 14.5 15H18L24 19L33 21.5C35 22 36 24 36 25.5L35 27H6Z"
          fill="url(#shoeUpperGrad)"
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.3"
        />

        {/* Iconic High-Velocity Athletic Swoosh */}
        <path
          d="M10 23.5C15 25 23 23 29 18.5"
          stroke="url(#swooshGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Criss-Cross Performance Lacing System */}
        <path
          d="M16 16L18.5 18.5M18.5 15.5L21 18M21 15L23.5 17.5"
          stroke={isSelected ? '#FF6B00' : '#FFFFFF'}
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Ergonomic Heel Counter Collar */}
        <path
          d="M8 19C7 17 7.5 15 9.5 14.5C11 14 12 14.5 12.5 16"
          stroke={isSelected ? '#FFFFFF' : '#777E90'}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Forefoot Micro-Grip Control Ribs */}
        <line x1="28" y1="23" x2="33" y2="24" stroke={isSelected ? '#FF6B00' : '#3E4450'} strokeWidth="1" strokeLinecap="round" />
        <line x1="29" y1="25" x2="34" y2="26" stroke={isSelected ? '#FF6B00' : '#3E4450'} strokeWidth="1" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// ==========================================
// 7. ACCESSORIES: Ultra GPS Sports Smartwatch
// ==========================================
export const AccessoriesCategoryIcon: React.FC<CategoryIconProps> = ({ isSelected, className = '' }) => {
  return (
    <motion.div
      animate={
        isSelected
          ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -10, 10, 0] }
          : { scale: 1, rotate: 0 }
      }
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative flex items-center justify-center w-8 h-8 ${className}`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="watchBezelGrad" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor={isSelected ? '#FFFFFF' : '#2D3139'} />
            <stop offset="0.5" stopColor={isSelected ? '#FFE0C2' : '#1A1C23'} />
            <stop offset="1" stopColor={isSelected ? '#FF6B00' : '#0F1014'} />
          </linearGradient>
        </defs>

        {/* Perforated Silicone Athletic Strap */}
        <rect
          x="15"
          y="2"
          width="10"
          height="36"
          rx="4"
          fill={isSelected ? '#FFFFFF' : '#1E2026'}
          stroke={isSelected ? '#FF6B00' : '#141416'}
          strokeWidth="1.2"
        />
        {/* Strap Perforations */}
        <circle cx="20" cy="5.5" r="1" fill={isSelected ? '#FF6B00' : '#3E4450'} />
        <circle cx="20" cy="34.5" r="1" fill={isSelected ? '#FF6B00' : '#3E4450'} />

        {/* Watch Outer Dial Bezel */}
        <circle
          cx="20"
          cy="20"
          r="12.5"
          fill="url(#watchBezelGrad)"
          stroke={isSelected ? '#FFFFFF' : '#141416'}
          strokeWidth="2"
        />

        {/* Orange Sports Action Button (Apple Ultra style) */}
        <rect
          x="6.5"
          y="16"
          width="2.2"
          height="5"
          rx="1"
          fill="#FF6B00"
        />
        {/* Knurled Digital Crown on Right */}
        <rect
          x="31.5"
          y="15.5"
          width="2.5"
          height="5.5"
          rx="1"
          fill={isSelected ? '#FFFFFF' : '#3E4450'}
        />

        {/* Deep AMOLED Black Screen */}
        <circle cx="20" cy="20" r="10" fill="#0A0B0E" />

        {/* Concentric Activity Rings (Move / Exercise) */}
        <circle cx="20" cy="20" r="8.5" stroke="#FF2D55" strokeWidth="1" strokeDasharray="14 30" />
        <circle cx="20" cy="20" r="7" stroke="#30D158" strokeWidth="1" strokeDasharray="18 25" />

        {/* Live Animated ECG / Heartbeat Wave */}
        <motion.path
          d="M13 20H15L16.5 17L18 23L19.5 19L21 21H23"
          stroke="#00E5FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />

        {/* Continuous Sweeping Orange Seconds Hand */}
        <motion.line
          x1="20"
          y1="20"
          x2="20"
          y2="12"
          stroke="#FF6B00"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          style={{ originX: '20px', originY: '20px' }}
        />

        {/* Center Pivot Pin */}
        <circle cx="20" cy="20" r="1.8" fill="#FFFFFF" />
        <circle cx="20" cy="20" r="0.9" fill="#FF6B00" />
      </svg>
    </motion.div>
  );
};
