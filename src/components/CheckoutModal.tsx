import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  MapPin,
  Package,
  Minus,
  Plus,
} from 'lucide-react';
import { Product, Order, PaymentMethod } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { formatBDT } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedSize: string;
  quantity: number;
  onOrderSuccess: (orderId: string, newOrder: Order) => void;
  onViewOrders?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  quantity,
  onOrderSuccess,
  onViewOrders,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [currentSize, setCurrentSize] = useState<string>(selectedSize || product.sizes?.[0] || 'M');
  const [currentQty, setCurrentQty] = useState<number>(quantity || 1);

  useEffect(() => {
    setCurrentSize(selectedSize || product.sizes?.[0] || 'M');
    setCurrentQty(quantity || 1);
  }, [product.id, selectedSize, quantity]);

  const totalPrice = product.price * currentQty;

  const handlePay = () => {
    triggerHaptic('payment_start');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);

      const newOrder: Order = {
        id: generatedId,
        date: 'Just now',
        status: 'placed',
        estimatedDelivery: 'Tomorrow, by 2:00 PM',
        paymentMethod: paymentMethod,
        shippingAddress: 'House 14, Road 7, Banani, Dhaka',
        courierName: 'RedX Express Priority',
        trackingNumber: `RX-${Math.floor(1000000 + Math.random() * 9000000)}-BD`,
        totalAmount: totalPrice,
        items: [
          {
            product,
            size: currentSize,
            quantity: currentQty,
            price: product.price,
          },
        ],
      };

      onOrderSuccess(generatedId, newOrder);
      triggerHaptic('order_success');
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-auto">
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* iOS Bottom Sheet / Modal Dialog */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative w-full max-w-[420px] bg-white rounded-t-[36px] sm:rounded-[36px] shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto no-scrollbar select-none"
          >
            {/* Grab Handle for iOS Sheet */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

            {!isSuccess ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
                    <h3 className="text-[18px] font-black text-[#141416] tracking-tight">
                      Instant Checkout
                    </h3>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Summary Card */}
                <div className="bg-[#F8F9FD] rounded-2xl p-3.5 border border-[#E9ECF2] space-y-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-16 h-16 bg-white rounded-xl p-1.5 shadow-xs flex items-center justify-center flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-[#141416] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#777E90] truncate font-medium">
                        {product.subtitle}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-[#FF6B00]/10 text-[#FF6B00] font-extrabold px-2 py-0.5 rounded-md">
                          Size: {currentSize}
                        </span>
                        <span className="text-xs font-semibold text-[#777E90]">
                          Qty: {currentQty}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[16px] font-black text-[#FF6B00]">
                        {formatBDT(totalPrice)}
                      </span>
                      <p className="text-[10px] text-emerald-600 font-bold">Free Express</p>
                    </div>
                  </div>

                  {/* Quick Size Switcher & Quantity Stepper */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    {/* Sizes */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
                      <span className="text-[10px] font-bold text-gray-400 mr-0.5 uppercase tracking-wider">Size:</span>
                      {(product.sizes || ['S', 'M', 'L', 'XL']).map((sz) => {
                        const isSelected = currentSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => {
                              triggerHaptic('selection');
                              setCurrentSize(sz);
                            }}
                            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF6B00] text-white shadow-xs'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg p-0.5 border border-gray-200/80 flex-shrink-0">
                      <button
                        type="button"
                        disabled={currentQty <= 1}
                        onClick={() => {
                          triggerHaptic('light');
                          setCurrentQty((q) => Math.max(1, q - 1));
                        }}
                        className={`w-6 h-6 rounded flex items-center justify-center text-gray-600 ${
                          currentQty <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
                        }`}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="text-xs font-black text-gray-900 w-4 text-center">
                        {currentQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setCurrentQty((q) => q + 1);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 rounded-2xl p-3 flex items-start space-x-3 border border-gray-100">
                  <MapPin className="w-4 h-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Delivery Address (Bangladesh)</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      NEXT LEVEL • House 14, Road 7, Banani, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2">
                  <p className="text-xs font-extrabold text-gray-900 tracking-tight">
                    Select Payment Method
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* bKash Button */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E] shadow-sm font-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
                      <span className="text-xs font-black tracking-tight">bKash (বিকাশ)</span>
                    </button>

                    {/* Cash on Delivery Button */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm font-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-bold">Cash on Delivery</span>
                    </button>

                    {/* Nagad Button */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        paymentMethod === 'nagad'
                          ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D] shadow-sm font-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                      <span className="text-xs font-black tracking-tight">Nagad (নগদ)</span>
                    </button>

                    {/* Credit Card Button */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00] shadow-sm font-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Visa / Card</span>
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>{formatBDT(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Express Delivery (Dhaka)</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-extrabold text-sm pt-1 border-t border-gray-100">
                    <span>Total Payable</span>
                    <span className="text-[17px] font-black text-[#FF6B00]">
                      {formatBDT(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Pay Action Button with Liquid Waves and Specular Glass Reflection */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isProcessing}
                  onClick={handlePay}
                  className="w-full h-14 rounded-full bg-gradient-to-r from-[#FF5E00] via-[#FF6B00] to-[#FF8500] text-white font-black text-base shadow-[0_8px_26px_rgba(255,107,0,0.45)] flex items-center justify-center space-x-2 cursor-pointer relative overflow-hidden group"
                >
                  {/* Liquid Wave Animation Layer */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                    <motion.div
                      animate={{ x: ['0%', '-50%'] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      className="absolute -bottom-2 -left-2 w-[240%] h-[140%] opacity-35 flex"
                    >
                      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/30">
                        <path d="M 0 50 Q 100 20, 200 50 T 400 50 T 600 50 T 800 50 L 800 200 L 0 200 Z" />
                      </svg>
                      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-1/2 h-full fill-white/30">
                        <path d="M 0 50 Q 100 20, 200 50 T 400 50 T 600 50 T 800 50 L 800 200 L 0 200 Z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Specular Liquid Meniscus Sheen */}
                  <div className="absolute top-[1px] left-[8px] right-[8px] h-[45%] rounded-t-full bg-gradient-to-b from-white/55 via-white/15 to-transparent pointer-events-none" />

                  {/* Shimmer sweep */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                  />

                  {isProcessing ? (
                    <div className="relative z-10 flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center space-x-2">
                      <span>
                        {paymentMethod === 'bkash'
                          ? 'Pay with bKash'
                          : paymentMethod === 'cod'
                          ? 'Confirm Order (COD)'
                          : paymentMethod === 'nagad'
                          ? 'Pay with Nagad'
                          : 'Confirm & Pay'}{' '}
                        • {formatBDT(totalPrice)}
                      </span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </motion.button>

                {/* Secure Badge */}
                <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit Encrypted Secure Sports Checkout</span>
                </div>
              </div>
            ) : (
              /* Success Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                {/* Celebration Icon with Ripple */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.8, 2.2], opacity: [0.8, 0.4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-emerald-500"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#141416] tracking-tight">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs font-bold text-[#FF6B00] mt-1">
                    Order ID: {orderId}
                  </p>
                  <p className="text-xs text-[#777E90] mt-2 max-w-[280px] mx-auto">
                    Thank you, Antony! Your order for {currentQty}x {product.name} (Size: {currentSize}) has been confirmed and is being prepped for dispatch.
                  </p>
                </div>

                <div className="bg-[#F8F9FD] rounded-2xl p-3 border border-gray-100 flex items-center justify-center space-x-2 text-xs font-bold text-gray-700">
                  <Truck className="w-4 h-4 text-[#FF6B00]" />
                  <span>Estimated Delivery: Tomorrow, by 2:00 PM</span>
                </div>

                <div className="space-y-2 pt-1">
                  {onViewOrders && (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        triggerHaptic('light');
                        handleClose();
                        onViewOrders();
                      }}
                      className="w-full h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-sm rounded-full shadow-[0_4px_16px_rgba(255,107,0,0.35)] hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4" />
                      <span>Track in My Orders</span>
                    </motion.button>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={handleClose}
                    className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-[#141416] font-bold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
