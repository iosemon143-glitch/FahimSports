import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  MoreVertical,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Heart,
  Share2,
  Zap,
} from 'lucide-react';
import { Product, Order } from '../types';
import { CheckoutModal } from './CheckoutModal';
import { LiquidProductButton } from './LiquidProductButton';
import { formatBDT } from '../utils/currency';

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onBuyNow?: (product: Product, size: string, quantity: number) => void;
  onOrderSuccess?: (orderId: string, newOrder: Order) => void;
  onViewOrders?: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onBuyNow,
  onOrderSuccess,
  onViewOrders,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isHoveredImage, setIsHoveredImage] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Sync selected size and reset quantity when product changes
  useEffect(() => {
    setSelectedSize(product.sizes?.[0] || 'M');
    setQuantity(1);
    setShowMenu(false);
  }, [product.id, product.sizes]);

  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL', 'XXL'];

  // Animated feature icons
  const renderFeatureIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-[#FF6B00] stroke-[2.3]';
    switch (iconName) {
      case 'wind':
        return (
          <motion.svg
            whileHover={{ x: [0, 4, 0] }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={iconClass}
          >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
          </motion.svg>
        );
      case 'droplets':
        return (
          <motion.svg
            whileHover={{ y: [0, -3, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={iconClass}
          >
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
          </motion.svg>
        );
      case 'feather':
        return (
          <motion.svg
            whileHover={{ rotate: [0, -12, 12, 0] }}
            transition={{ duration: 0.6 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={iconClass}
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
            <line x1="16" x2="2" y1="8" y2="22" />
            <line x1="17.5" x2="9" y1="15" y2="15" />
          </motion.svg>
        );
      case 'shield':
        return (
          <motion.svg
            whileHover={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={iconClass}
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2200);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedSize, quantity);
    }
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.28 }}
        className="w-full min-h-full flex flex-col justify-between pb-10 pt-1 px-4 select-none"
      >
        {/* 1. Top Bar */}
        <header className="flex items-center justify-between pt-1 relative z-20">
          {/* Circular Back Arrow Button with Spring Push */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ x: -2 }}
            onClick={onBack}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[#E9ECF2]/80 text-[#141416] hover:bg-gray-50 transition-all cursor-pointer"
            aria-label="Back to Home"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.6]" />
          </motion.button>

          {/* Details Title */}
          <h1 className="text-[18px] font-extrabold text-[#141416] tracking-tight">
            Details
          </h1>

          {/* Circular Three-Dot Menu Button */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setShowMenu(!showMenu)}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[#E9ECF2]/80 text-[#141416] hover:bg-gray-50 transition-all cursor-pointer"
              aria-label="More Options"
            >
              <MoreVertical className="w-5 h-5 stroke-[2.2]" />
            </motion.button>

            {/* Quick Menu Popover */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -6 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  className="absolute right-0 top-12 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-30 min-w-[160px] space-y-1"
                >
                  <button
                    onClick={() => {
                      onToggleWishlist(product.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF6B00] text-[#FF6B00]' : ''}`} />
                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Product</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="space-y-4 mt-3">
          {/* 2. Large Centered Product Image Card with Float & Depth */}
          <motion.div
            onHoverStart={() => setIsHoveredImage(true)}
            onHoverEnd={() => setIsHoveredImage(false)}
            className="relative w-full h-[245px] bg-[#F3F4F8] rounded-[26px] p-6 flex items-center justify-center overflow-hidden shadow-inner group cursor-pointer"
          >
            {/* Subtle brand watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] select-none pointer-events-none font-black text-8xl text-black">
              ATHLETIC
            </div>

            {/* Floating Product Imagery */}
            <motion.img
              animate={{
                y: isHoveredImage ? -8 : [0, -4, 0],
                scale: isHoveredImage ? 1.08 : 1,
              }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.3 },
              }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.14)] z-10"
            />

            {/* Floating Heart Button */}
            <motion.button
              whileTap={{ scale: 0.75 }}
              onClick={() => onToggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-20 cursor-pointer ${
                isWishlisted ? 'bg-[#FF6B00] text-white shadow-[0_4px_14px_rgba(255,107,0,0.4)]' : 'bg-white/95 text-gray-700 hover:text-black'
              }`}
            >
              <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : 'stroke-[2.3]'}`} />
            </motion.button>
          </motion.div>

          {/* 3. Product Name (Bold, Large) + Price Aligned Right */}
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-[25px] font-black text-[#141416] tracking-tight">
                {product.name}
              </h2>
              <motion.span
                key={product.price}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[26px] font-black text-[#FF6B00]"
              >
                {formatBDT(product.price)}
              </motion.span>
            </div>

            {/* Subtitle "Premium Quality" */}
            <p className="text-[13px] font-bold text-[#777E90] mt-0.5 tracking-wide">
              {product.subtitle || 'Premium Quality'}
            </p>
          </div>

          {/* 4. Row of 4 Feature Icons in Circular Outlined Containers with Labels */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {product.features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3, scale: 1.03 }}
                className="flex flex-col items-center space-y-1.5 p-2 rounded-2xl bg-white border border-[#E9ECF2] shadow-[0_2px_12px_rgba(0,0,0,0.02)] cursor-default transition-shadow"
              >
                <div className="w-11 h-11 rounded-full border border-[#FF6B00]/30 bg-[#FFF0E6]/60 flex items-center justify-center shadow-inner">
                  {renderFeatureIcon(feat.iconName)}
                </div>
                <span className="text-[11px] font-extrabold text-[#141416] text-center tracking-tight leading-tight">
                  {feat.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* 5. "Description" Section */}
          <section className="space-y-1.5">
            <h3 className="text-[16px] font-extrabold text-[#141416] tracking-tight">
              Description
            </h3>
            <p className="text-[13px] leading-relaxed text-[#777E90] font-medium">
              {product.description}
            </p>
          </section>

          {/* 6. "Select Size" Section with Smooth Sliding Pill Indicator */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#141416] tracking-tight">
                Select Size
              </h3>
              <span className="text-xs font-bold text-[#FF6B00] cursor-pointer hover:underline">
                Size Guide
              </span>
            </div>

            <div className="relative flex items-center space-x-2 bg-[#F3F4F8] p-1.5 rounded-full">
              {sizes.map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative flex-1 h-10 rounded-full text-xs font-black transition-colors duration-200 flex items-center justify-center z-10 cursor-pointer ${
                      isSelected ? 'text-white' : 'text-[#141416] hover:text-[#FF6B00]'
                    }`}
                  >
                    {/* Sliding Background Pill Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeSizePill"
                        className="absolute inset-0 bg-[#FF6B00] rounded-full shadow-[0_4px_16px_rgba(255,107,0,0.4)]"
                        transition={{
                          type: 'spring',
                          stiffness: 480,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{size}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* 7. Bottom Action Row with Quantity, Add to Cart & Buy Now Options */}
        <div className="sticky bottom-0 left-0 right-0 -mx-4 px-4 pb-3 pt-2 z-40">
          <div className="bg-white/98 p-2 rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] border border-[#E9ECF2] flex items-center gap-2">
            {/* Quantity Selector: Rounded Pill with Pop Animation */}
            <div className="h-12 bg-[#F3F4F8] rounded-full px-2 py-1 flex items-center space-x-1.5 border border-gray-200/70 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.78 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className={`w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#141416] shadow-xs cursor-pointer ${
                  quantity <= 1 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
                aria-label="Decrease Quantity"
              >
                <Minus className="w-3 h-3 stroke-[2.8]" />
              </motion.button>

              {/* Smooth Sliding Number Counter */}
              <div className="w-4 text-center overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={quantity}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-xs font-black text-[#141416] block"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.button
                whileTap={{ scale: 0.78 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#141416] shadow-xs hover:bg-gray-100 cursor-pointer"
                aria-label="Increase Quantity"
              >
                <Plus className="w-3 h-3 stroke-[2.8]" />
              </motion.button>
            </div>

            {/* "Add to Cart" Button with Liquid Ripple and Glass Specular Reflection */}
            <LiquidProductButton
              variant="secondary-liquid"
              color="glass"
              label={isAdded ? 'Added' : 'Cart'}
              icon={isAdded ? 'check' : 'bag'}
              isSuccess={isAdded}
              onClick={handleAddToCart}
              className="flex-shrink-0"
            />

            {/* "Buy Now" Primary High-Impact Button with Animated Liquid Waves */}
            <LiquidProductButton
              variant="large"
              color="orange"
              label="Buy Now"
              price={product.price * quantity}
              icon="zap"
              onClick={handleBuyNowClick}
              className="flex-1 shadow-[0_8px_25px_rgba(255,107,0,0.45)]"
            />
          </div>

          {/* iOS Home indicator */}
          <div className="w-32 h-1 bg-black/80 rounded-full mx-auto mt-2 shadow-xs" />
        </div>
      </motion.div>

      {/* Instant Checkout Sheet / Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        selectedSize={selectedSize}
        quantity={quantity}
        onOrderSuccess={(orderId, newOrder) => {
          onOrderSuccess?.(orderId, newOrder);
        }}
        onViewOrders={onViewOrders}
      />
    </>
  );
};
