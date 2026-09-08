import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Heart,
  ArrowRight,
  Zap,
  Package,
} from 'lucide-react';
import { Product, CategoryId, Order } from '../types';
import { CATEGORIES } from '../data/mockData';
import { AnimatedBell } from './AnimatedIcons';
import { triggerHaptic } from '../utils/haptics';
import { formatBDT } from '../utils/currency';
import { LiquidProductButton } from './LiquidProductButton';
import {
  AllCategoryIcon,
  JerseyCategoryIcon,
  TrouserCategoryIcon,
  FootballCategoryIcon,
  CricketCategoryIcon,
  ShoesCategoryIcon,
  AccessoriesCategoryIcon,
} from './CategoryIcons';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onShopNowBanner: () => void;
  onInstantBuy?: (product: Product) => void;
  onQuickBuyNow?: (product: Product) => void;
  onOpenOrders?: () => void;
  ordersCount?: number;
  latestOrder?: Order;
}

export const HomeScreen = React.memo<HomeScreenProps>(({
  products,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  onShopNowBanner,
  onInstantBuy,
  onQuickBuyNow,
  onOpenOrders,
  ordersCount,
  latestOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [filterRotation, setFilterRotation] = useState(0);
  const [activeHeartId, setActiveHeartId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Handle wishlist with animated particle burst
  const handleHeartClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setActiveHeartId(productId);
    onToggleWishlist(productId);
    setTimeout(() => setActiveHeartId(null), 600);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((prod) => {
      const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
      return 0; // featured
    });

  // Category Real Sports Icon Renderer
  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    switch (iconName) {
      case 'grid':
        return <AllCategoryIcon isSelected={isSelected} />;
      case 'shirt':
        return <JerseyCategoryIcon isSelected={isSelected} />;
      case 'layers':
        return <TrouserCategoryIcon isSelected={isSelected} />;
      case 'circle':
        return <FootballCategoryIcon isSelected={isSelected} />;
      case 'activity':
        return <CricketCategoryIcon isSelected={isSelected} />;
      case 'footprints':
        return <ShoesCategoryIcon isSelected={isSelected} />;
      case 'watch':
        return <AccessoriesCategoryIcon isSelected={isSelected} />;
      default:
        return <AllCategoryIcon isSelected={isSelected} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full pt-1 px-4 pb-6 space-y-5 select-none"
    >
      {/* 1. Header Section */}
      <header className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-3">
          {/* Circular User Profile with Pulsing Ring */}
          <div className="relative cursor-pointer group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
            >
              <img
                src="/images/avatar.jpg"
                alt="Antony Thomas"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
            {/* Pulsing Online Radar Dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
            </span>
          </div>

          <div>
            <h1 className="text-[20px] font-black text-[#141416] tracking-tight">
              Antony Thomas
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* My Orders Header Button Option */}
          {onOpenOrders && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                triggerHaptic('selection');
                onOpenOrders();
              }}
              className="flex items-center space-x-1.5 px-3 py-2 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E9ECF2]/80 hover:border-[#FF6B00]/40 transition-all cursor-pointer text-xs font-bold text-[#141416]"
              aria-label="My Orders"
            >
              <div className="relative flex items-center justify-center">
                <Package className="w-4 h-4 text-[#FF6B00]" />
                {latestOrder && (latestOrder.status === 'shipped' || latestOrder.status === 'placed' || latestOrder.status === 'processing') && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6B00] rounded-full ring-1.5 ring-white animate-pulse" />
                )}
              </div>
              <span className="text-[12px] font-black">My Orders</span>
              {ordersCount !== undefined && ordersCount > 0 && (
                <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-1.5 py-0.2 rounded-full text-[10px] font-black">
                  {ordersCount}
                </span>
              )}
            </motion.button>
          )}

          {/* White Circular Notification Bell with Interactive Ringing Soundwave */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              setShowNotificationToast(true);
              setTimeout(() => setShowNotificationToast(false), 2800);
            }}
            className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E9ECF2]/80 hover:shadow-md transition-all cursor-pointer flex-shrink-0"
            aria-label="Notifications"
          >
            <AnimatedBell hasUnread={true} />
          </motion.button>
        </div>
      </header>

      {/* Notification Toast Alert */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            className="bg-[#141416] text-white px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs shadow-xl border border-white/10"
          >
            <div className="flex items-center space-x-2.5">
              <Zap className="w-4 h-4 text-[#FF7A1A] fill-[#FF7A1A]" />
              <span className="font-medium">Special 30% Flash drop active on athletic gear!</span>
            </div>
            <span className="text-[#FF7A1A] font-bold text-[11px] ml-2">Active</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Search & Filter Row */}
      <div className="flex items-center space-x-3">
        {/* Rounded Search Bar */}
        <div className="flex-1 relative flex items-center group">
          <Search className="absolute left-4 w-4 h-4 text-[#777E90] stroke-[2.4] group-focus-within:text-[#FF6B00] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for sports products..."
            className="w-full h-12 pl-11 pr-8 bg-[#F3F4F8] text-[#141416] placeholder-[#777E90] text-sm font-medium rounded-full border border-transparent focus:border-[#FF6B00]/40 focus:bg-white focus:shadow-[0_4px_16px_rgba(255,107,0,0.08)] focus:outline-none transition-all duration-200"
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs flex items-center justify-center font-bold transition-colors cursor-pointer"
            >
              ×
            </motion.button>
          )}
        </div>

        {/* Circular Filter / Settings Button with Smooth 180° Spin */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          animate={{ rotate: filterRotation }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          onClick={() => {
            triggerHaptic('selection');
            setFilterRotation((prev) => prev + 180);
            setIsFilterModalOpen(true);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] border transition-colors cursor-pointer ${
            sortBy !== 'featured' || selectedCategory !== 'all'
              ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-[0_4px_16px_rgba(255,107,0,0.35)]'
              : 'bg-white border-[#E9ECF2]/80 text-[#141416] hover:border-[#FF6B00]/40 hover:text-[#FF6B00]'
          }`}
          aria-label="Filter Options"
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
        </motion.button>
      </div>

      {/* 2.5 Quick Live "My Order" Card on Home Screen */}
      {latestOrder && onOpenOrders && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            triggerHaptic('light');
            onOpenOrders();
          }}
          className="bg-white rounded-2xl p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-orange-100 hover:border-[#FF6B00]/40 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-black text-[#141416]">
                  Order #{latestOrder.id}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    latestOrder.status === 'delivered'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border border-amber-200 animate-pulse'
                  }`}
                >
                  {latestOrder.status === 'shipped'
                    ? 'Out for Delivery'
                    : latestOrder.status === 'delivered'
                    ? 'Delivered'
                    : 'In Transit'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium truncate">
                {latestOrder.items[0]?.product.name} • {latestOrder.estimatedDelivery}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-xs font-bold text-[#FF6B00] group-hover:translate-x-0.5 transition-transform flex-shrink-0 pl-2">
            <span>Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      )}

      {/* 3. Promotional Banner Card with Shimmer & Floating Imagery */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1E1B6B] via-[#35259C] to-[#5B3FD9] text-white p-5 shadow-[0_16px_36px_rgba(30,27,107,0.32)] group"
      >
        {/* Animated Shimmer Light Reflection Sweep */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Background glow orbs */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#5B3FD9]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#FF6B00]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          {/* Left Text Content */}
          <div className="w-[58%] pr-1">
            <span className="inline-block text-[10px] font-black tracking-widest text-[#C7B9FF] uppercase mb-1">
              NEW SEASON COLLECTION
            </span>

            <h2 className="text-[22px] leading-tight font-black text-white tracking-tight">
              Up to <span className="text-[#FF7A1A] drop-shadow-[0_2px_8px_rgba(255,122,26,0.5)]">30% OFF</span>
            </h2>

            <p className="text-[12px] font-medium text-white/80 mt-1 mb-3.5">
              Premium Sports Wear
            </p>

            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={onShopNowBanner}
              className="bg-white text-[#141416] hover:text-[#FF6B00] text-[12px] font-extrabold px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.18)] flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
            </motion.button>
          </div>

          {/* Right Floating Imagery */}
          <div className="w-[42%] flex items-center justify-end relative">
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
              onClick={onShopNowBanner}
            >
              <img
                src="/images/banner_gear.jpg"
                alt="Sports Gear Collection"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 4. Categories Section with Real Animated Sports Icons */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-extrabold text-[#141416] tracking-tight">
            Categories
          </h3>
          <span className="text-xs font-bold text-[#777E90]">
            {CATEGORIES.length} Items
          </span>
        </div>

        {/* Horizontal Scrollable Categories */}
        <div className="flex items-start space-x-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 scroll-smooth overscroll-x-contain">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  triggerHaptic('selection');
                  setSelectedCategory(cat.id);
                }}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                className="flex flex-col items-center space-y-2 flex-shrink-0 group focus:outline-none cursor-pointer select-none"
              >
                {/* Circular Icon Container with Real Depth & Glass Sheen */}
                <div
                  className={`w-[58px] h-[58px] rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#FF5E00] via-[#FF6B00] to-[#FF8500] shadow-[0_10px_24px_rgba(255,107,0,0.42)] ring-4 ring-[#FF6B00]/25'
                      : 'bg-white/90 backdrop-blur-md hover:bg-white border border-black/[0.07] shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-md'
                  }`}
                >
                  {/* Top Specular Liquid Glass Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

                  {/* Selected Energetic Pulse Ring */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 bg-white/15 rounded-2xl pointer-events-none"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                  )}

                  {/* Real Animated Sports Icon */}
                  <div className="relative z-10">
                    {renderCategoryIcon(cat.iconName, isSelected)}
                  </div>
                </div>

                {/* Category Label */}
                <span
                  className={`text-[12px] tracking-tight transition-all duration-200 ${
                    isSelected
                      ? 'text-[#FF6B00] font-black scale-105'
                      : 'text-[#777E90] font-semibold group-hover:text-[#141416]'
                  }`}
                >
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 5. Popular Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-extrabold text-[#141416] tracking-tight">
            Popular
          </h3>
          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => setSelectedCategory('all')}
            className="text-[13px] font-bold text-[#FF6B00] hover:text-[#FF7A1A] transition-colors cursor-pointer"
          >
            View all
          </motion.button>
        </div>

        {/* Horizontal Scrollable Product Cards */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center shadow-card border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">No items found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-2 text-xs font-bold text-[#FF6B00] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex items-stretch space-x-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 scroll-smooth overscroll-x-contain">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const isBursting = activeHeartId === product.id;

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  onClick={() => onSelectProduct(product)}
                  className="w-[205px] flex-shrink-0 bg-white rounded-[24px] p-3 shadow-[0_8px_26px_rgba(0,0,0,0.06)] border border-[#E9ECF2]/80 flex flex-col justify-between cursor-pointer group hover:border-[#FF6B00]/30 transition-colors"
                >
                  {/* Product Image Area with Heart */}
                  <div className="relative w-full h-[155px] bg-[#F3F4F8] rounded-[20px] overflow-hidden flex items-center justify-center p-3">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                    />

                    {/* Wishlist Heart Button with Burst Animation */}
                    <div className="absolute top-2.5 right-2.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.7 }}
                        onClick={(e) => handleHeartClick(e, product.id)}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                          isWishlisted
                            ? 'bg-[#FF6B00] text-white shadow-[0_4px_12px_rgba(255,107,0,0.4)]'
                            : 'bg-white/95 text-[#777E90] hover:text-[#141416]'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform ${
                            isWishlisted ? 'fill-current stroke-[#FF6B00] scale-110' : 'stroke-[2.2]'
                          }`}
                        />

                        {/* Heart Particle Burst on Tap */}
                        {isBursting && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="absolute inset-0 rounded-full border-2 border-[#FF6B00] pointer-events-none"
                          />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Name & Subtitle */}
                  <div className="mt-3 px-1">
                    <p className="text-[11px] font-semibold text-[#777E90] uppercase tracking-wider">
                      {product.subtitle}
                    </p>
                    <h4 className="text-[15px] font-extrabold text-[#141416] tracking-tight line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>

                    {/* Price and Instant Buy Button */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-[17px] font-black text-[#FF6B00]">
                          {formatBDT(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] font-semibold text-[#777E90] line-through ml-1">
                            {formatBDT(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Liquid Animated Quick Buy Button */}
                      <LiquidProductButton
                        variant="medium"
                        color="orange"
                        label="Buy"
                        icon="zap"
                        onClick={(e) => {
                          e.stopPropagation();
                          const buyAction = onQuickBuyNow || onInstantBuy;
                          if (buyAction) {
                            buyAction(product);
                          } else {
                            onSelectProduct(product);
                          }
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. All Gear Grid Section */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-extrabold text-[#141416] tracking-tight">
              All Sports Gear
            </h3>
            <p className="text-xs text-[#777E90] font-medium">
              {sortBy !== 'featured' ? `Sorted by: ${sortBy.replace('_', ' ')}` : 'Handpicked for high performance'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#FF6B00]">
            {filteredProducts.length} Items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isBursting = activeHeartId === product.id;

            return (
              <motion.div
                key={`grid-${product.id}`}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-[22px] p-3 shadow-[0_6px_20px_rgba(0,0,0,0.05)] border border-[#E9ECF2]/80 flex flex-col justify-between cursor-pointer group hover:border-[#FF6B00]/30 transition-all"
              >
                <div className="relative w-full h-[120px] bg-[#F3F4F8] rounded-[18px] overflow-hidden flex items-center justify-center p-2.5">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                  />

                  <div className="absolute top-2 right-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.7 }}
                      onClick={(e) => handleHeartClick(e, product.id)}
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-white/95 text-[#777E90] hover:text-[#141416]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted ? 'fill-current stroke-[#FF6B00]' : 'stroke-[2.2]'
                        }`}
                      />
                      {isBursting && (
                        <motion.span
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ duration: 0.45 }}
                          className="absolute inset-0 rounded-full border-2 border-[#FF6B00] pointer-events-none"
                        />
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="mt-2.5 px-0.5">
                  <p className="text-[10px] font-bold text-[#777E90] uppercase tracking-wider line-clamp-1">
                    {product.subtitle}
                  </p>
                  <h4 className="text-[13px] font-extrabold text-[#141416] tracking-tight line-clamp-1 mt-0.5">
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-[15px] font-black text-[#FF6B00]">
                      {formatBDT(product.price)}
                    </span>

                    {/* Liquid Animated Quick Buy Button */}
                    <LiquidProductButton
                      variant="compact"
                      color="orange"
                      label="Buy"
                      icon="zap"
                      onClick={(e) => {
                        e.stopPropagation();
                        const buyAction = onQuickBuyNow || onInstantBuy;
                        if (buyAction) {
                          buyAction(product);
                        } else {
                          onSelectProduct(product);
                        }
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Filter & Sort Bottom Sheet Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="relative w-full max-w-[420px] bg-white rounded-t-[32px] shadow-2xl p-6 z-10 select-none max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-lg font-black text-[#141416] tracking-tight">
                  Sort & Filter Gear
                </h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Sort By Options */}
              <div className="mt-4 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#777E90]">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'featured', label: 'Featured / Best' },
                    { id: 'price_low', label: 'Price: Low to High' },
                    { id: 'price_high', label: 'Price: High to Low' },
                    { id: 'rating', label: 'Highest Rated' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        triggerHaptic('selection');
                        setSortBy(option.id as any);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left ${
                        sortBy === option.id
                          ? 'bg-orange-50 border-[#FF6B00] text-[#FF6B00] shadow-xs'
                          : 'bg-[#F8F9FD] border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#777E90]">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        triggerHaptic('selection');
                        setSelectedCategory(cat.id);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#FF6B00] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center space-x-3">
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedCategory('all');
                    setSortBy('featured');
                  }}
                  className="flex-1 py-3 rounded-full text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    setIsFilterModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-full text-xs font-bold bg-[#FF6B00] text-white hover:bg-[#e05f00] shadow-md transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

HomeScreen.displayName = 'HomeScreen';
