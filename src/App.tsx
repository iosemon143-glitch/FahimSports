import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusBar } from './components/StatusBar';
import { AnimatedNavBar } from './components/AnimatedNavBar';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { OtherTabs } from './components/OtherTabs';
import { CheckoutModal } from './components/CheckoutModal';
import { PRODUCTS } from './data/mockData';
import { Product, NavTab, Order } from './types';
import { Smartphone, Maximize2, ShoppingCart, Sparkles, Sliders } from 'lucide-react';
import { triggerHaptic } from './utils/haptics';
import { smoothScrollTo } from './utils/smoothScroll';
import { INITIAL_ORDERS } from './data/mockOrders';
import { MyOrdersModal } from './components/MyOrdersModal';
import { LiveGeminiBackground, GeminiTheme, GeminiPreset } from './components/LiveGeminiBackground';
import { ColorGradingModal } from './components/ColorGradingModal';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'details'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [wishlist, setWishlist] = useState<string[]>(['prod-jersey']);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);
  const [geminiTheme, setGeminiTheme] = useState<GeminiTheme>('cosmic-dark');
  const [geminiPreset, setGeminiPreset] = useState<GeminiPreset>('gemini-official');
  const [geminiSpeed, setGeminiSpeed] = useState<'calm' | 'normal' | 'dynamic'>('normal');
  const [isColorGradingModalOpen, setIsColorGradingModalOpen] = useState<boolean>(false);
  const [quickCheckoutProduct, setQuickCheckoutProduct] = useState<Product | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState<boolean>(false);

  const mainRef = useRef<HTMLElement>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('fahim_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Add new placed order to orders list & localStorage
  const handleAddOrder = useCallback((newOrder: Order) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('fahim_orders', JSON.stringify(updated));
      } catch {
        // storage error safe ignore
      }
      return updated;
    });
  }, []);

  // Toggle wishlist item with tactile vibration
  const handleToggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const willAdd = !prev.includes(productId);
      triggerHaptic(willAdd ? 'wishlist_add' : 'wishlist_remove');
      return willAdd ? [...prev, productId] : prev.filter((id) => id !== productId);
    });
  }, []);

  // Select a product to view details
  const handleSelectProduct = useCallback((product: Product) => {
    triggerHaptic('light');
    setSelectedProduct(product);
    setCurrentScreen('details');
  }, []);

  // Quick Buy Now handler from Home Screen with decisive vibration
  const handleQuickBuyNow = useCallback((product: Product) => {
    triggerHaptic('buy_now');
    setSelectedProduct(product);
    setQuickCheckoutProduct(product);
  }, []);

  // Add to cart handler with tactile double pulse
  const handleAddToCart = useCallback((product: Product, size: string, quantity: number) => {
    triggerHaptic('add_to_cart');
    setCartCount((prev) => prev + quantity);
    setCartNotice(`Added ${quantity}x ${product.name} (Size: ${size}) to cart!`);
    setTimeout(() => setCartNotice(null), 3000);
  }, []);

  const handleTabChange = useCallback((tab: NavTab) => {
    triggerHaptic('light');
    setActiveTab(tab);
    setCurrentScreen('home');
  }, []);

  const handleScrollToTop = useCallback(() => {
    triggerHaptic('light');
    smoothScrollTo(mainRef.current, 0, 400);
  }, []);

  const handleScrollToBottom = useCallback(() => {
    triggerHaptic('light');
    if (mainRef.current) {
      smoothScrollTo(mainRef.current, mainRef.current.scrollHeight, 420);
    }
  }, []);

  // Smoothly glide back to top when switching between screens or tabs
  useEffect(() => {
    if (mainRef.current) {
      smoothScrollTo(mainRef.current, 0, 200);
    }
  }, [currentScreen, activeTab]);

  return (
    <div className="min-h-screen h-[100dvh] relative text-[#141416] flex flex-col items-center justify-center p-0 sm:p-4 overflow-hidden select-none font-sans">
      {/* Global Live Gemini Background with Fluid Chromatic Color Grading */}
      <LiveGeminiBackground
        theme={geminiTheme}
        preset={geminiPreset}
        speed={geminiSpeed}
        intensity="vibrant"
        showSparkles={true}
        interactive={true}
      />

      {/* Top Floating Control Bar for Device View, Gemini Grading & Cart */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-[420px] mb-3 px-2 text-white/80 text-xs relative z-30">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wide text-white drop-shadow-xs">iOS Sports Store</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Live Gemini Color Grading Studio Button */}
          <button
            onClick={() => {
              triggerHaptic('selection');
              setIsColorGradingModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white transition text-[11px] cursor-pointer border border-white/25 backdrop-blur-md shadow-sm group"
            title="Configure Live Gemini Background & Color Grading"
          >
            <Sparkles className="w-3 h-3 text-[#38BDF8] group-hover:rotate-45 transition-transform" />
            <span className="font-bold">
              {geminiPreset === 'gemini-official'
                ? 'Gemini ✦'
                : geminiPreset === 'gemini-aurora'
                ? 'Aurora 🌿'
                : geminiPreset === 'gemini-sunset'
                ? 'Plasma 🌅'
                : 'Midnight 🌌'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          </button>

          <button
            onClick={() => setIsFrameMode(!isFrameMode)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-[11px] cursor-pointer"
            title="Toggle Device Frame"
          >
            {isFrameMode ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFrameMode ? 'iPhone Frame' : 'Full Width'}</span>
          </button>

          {cartCount > 0 && (
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#FF6B00] text-white font-bold text-[11px] shadow-sm">
              <ShoppingCart className="w-3 h-3" />
              <span>{cartCount}</span>
            </div>
          )}
        </div>
      </header>

      {/* Cart Confirmation Toast */}
      <AnimatePresence>
        {cartNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 z-50 bg-[#141416] text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl border border-white/20 flex items-center space-x-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            <span>{cartNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container / iPhone Bezel */}
      <div
        className={`relative transition-all duration-300 z-20 ${
          isFrameMode
            ? 'w-full max-w-[395px] h-screen h-[100dvh] sm:h-[844px] sm:max-h-[calc(100dvh-50px)] rounded-none sm:rounded-[52px] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_12px_#1F2128,0_0_0_14px_#323642] ring-1 ring-white/10 overflow-hidden'
            : 'w-full max-w-[440px] h-screen h-[100dvh] sm:h-[844px] sm:max-h-[calc(100dvh-50px)] rounded-none sm:rounded-[36px] shadow-2xl overflow-hidden'
        } ${geminiTheme === 'cosmic-dark' ? 'gemini-dark-mode bg-[#080C18]' : 'bg-[#F8F9FD]'} flex flex-col`}
      >
        {/* Ambient In-App Live Gemini Color Grading Atmosphere */}
        <LiveGeminiBackground
          theme={geminiTheme}
          preset={geminiPreset}
          speed={geminiSpeed}
          intensity={geminiTheme === 'cosmic-dark' ? 'medium' : 'ambient'}
          showSparkles={false}
          interactive={false}
          className={geminiTheme === 'cosmic-dark' ? 'opacity-80' : 'opacity-40'}
        />

        {/* iOS Status Bar (9:41, Real Dynamic Island, Signal, Wifi, Battery) */}
        <StatusBar
          darkText={geminiTheme !== 'cosmic-dark'}
          onScrollToTop={handleScrollToTop}
          cartNotice={cartNotice}
          onOpenOrders={() => setIsOrdersModalOpen(true)}
        />

        {/* Screen Content Container with super smooth momentum scrolling */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative overscroll-contain"
        >
          <AnimatePresence mode="wait">
            {currentScreen === 'details' ? (
              <motion.div
                key="details-screen"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="w-full min-h-full"
              >
                <ProductDetailsScreen
                  product={selectedProduct}
                  onBack={() => setCurrentScreen('home')}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.includes(selectedProduct.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onOrderSuccess={(_, newOrder) => handleAddOrder(newOrder)}
                  onViewOrders={() => {
                    setCurrentScreen('home');
                    setIsOrdersModalOpen(true);
                  }}
                />
              </motion.div>
            ) : activeTab === 'home' ? (
              <motion.div
                key="home-screen"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="w-full"
              >
                <HomeScreen
                  products={PRODUCTS}
                  onSelectProduct={handleSelectProduct}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickBuyNow={handleQuickBuyNow}
                  onOpenOrders={() => setIsOrdersModalOpen(true)}
                  ordersCount={orders.length}
                  latestOrder={orders[0]}
                  onShopNowBanner={() => {
                    setSelectedProduct(PRODUCTS[0]);
                    setCurrentScreen('details');
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <OtherTabs
                  activeTab={activeTab}
                  products={PRODUCTS}
                  wishlist={wishlist}
                  onSelectProduct={handleSelectProduct}
                  onRemoveWishlist={handleToggleWishlist}
                  onGoHome={() => setActiveTab('home')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Animated Bottom Navigation Bar - Continuously mounted in top-level layout */}
        <div className={currentScreen === 'home' ? 'w-full' : 'hidden'}>
          <AnimatedNavBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            wishlistCount={wishlist.length}
          />
        </div>
      </div>

      {/* Global Quick Checkout Sheet for Home Screen Quick Buy */}
      {quickCheckoutProduct && (
        <CheckoutModal
          isOpen={true}
          onClose={() => setQuickCheckoutProduct(null)}
          product={quickCheckoutProduct}
          selectedSize={quickCheckoutProduct.sizes?.[0] || 'M'}
          quantity={1}
          onOrderSuccess={(_, newOrder) => {
            handleAddOrder(newOrder);
          }}
          onViewOrders={() => {
            setQuickCheckoutProduct(null);
            setIsOrdersModalOpen(true);
          }}
        />
      )}

      {/* My Orders Interactive Sheet */}
      <MyOrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders}
        onSelectProduct={handleSelectProduct}
        onQuickReorder={(product) => {
          setIsOrdersModalOpen(false);
          handleQuickBuyNow(product);
        }}
      />

      {/* Live Gemini Color Grading Studio Modal */}
      <ColorGradingModal
        isOpen={isColorGradingModalOpen}
        onClose={() => setIsColorGradingModalOpen(false)}
        preset={geminiPreset}
        onSelectPreset={setGeminiPreset}
        theme={geminiTheme}
        onToggleTheme={() => setGeminiTheme((t) => (t === 'cosmic-dark' ? 'aurora-frost' : 'cosmic-dark'))}
        speed={geminiSpeed}
        onSelectSpeed={setGeminiSpeed}
      />
    </div>
  );
}

export default App;
