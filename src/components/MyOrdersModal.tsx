import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  RotateCcw,
  Copy,
  MapPin,
  ShieldCheck,
  ExternalLink,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { formatBDT } from '../utils/currency';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectProduct: (product: Product) => void;
  onQuickReorder: (product: Product) => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectProduct,
  onQuickReorder,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [expandedTrackingId, setExpandedTrackingId] = useState<string | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return order.status === 'placed' || order.status === 'processing' || order.status === 'shipped';
    if (activeFilter === 'delivered') return order.status === 'delivered';
    return true;
  });

  const activeCount = orders.filter(
    (o) => o.status === 'placed' || o.status === 'processing' || o.status === 'shipped'
  ).length;

  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('light');
    navigator.clipboard?.writeText(id);
    setCopiedOrderId(id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'shipped':
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-200',
          icon: <Truck className="w-3.5 h-3.5" />,
          label: 'Out for Delivery',
        };
      case 'processing':
        return {
          bg: 'bg-blue-50 text-blue-600 border-blue-200',
          icon: <Clock className="w-3.5 h-3.5" />,
          label: 'Processing',
        };
      case 'placed':
        return {
          bg: 'bg-purple-50 text-purple-600 border-purple-200',
          icon: <Package className="w-3.5 h-3.5" />,
          label: 'Order Placed',
        };
      case 'delivered':
        return {
          bg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'Delivered',
        };
      default:
        return {
          bg: 'bg-gray-50 text-gray-600 border-gray-200',
          icon: <Package className="w-3.5 h-3.5" />,
          label: 'Order Placed',
        };
    }
  };

  const getStepProgress = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
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
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="nl-orders-modal relative w-full max-w-[420px] bg-[#F8F9FD] rounded-t-[36px] sm:rounded-[36px] shadow-2xl p-5 sm:p-6 z-10 max-h-[88vh] flex flex-col no-scrollbar select-none"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-black text-[#141416] tracking-tight">
                      My Orders
                    </h3>
                    <span className="bg-[#FF6B00] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      {orders.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Live delivery status & past order history
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  triggerHaptic('light');
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Close orders"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center space-x-2 py-3 flex-shrink-0">
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  setActiveFilter('all');
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#141416] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  setActiveFilter('active');
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                  activeFilter === 'active'
                    ? 'bg-[#FF6B00] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Active ({activeCount})</span>
              </button>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  setActiveFilter('delivered');
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'delivered'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Delivered ({deliveredCount})
              </button>
            </div>

            {/* Orders List / Scrollable Body */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-0.5 no-scrollbar pb-4 smooth-scroll-container overscroll-contain">
              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-700">No orders in this tab</h4>
                  <p className="text-xs text-gray-400 max-w-[220px] mx-auto">
                    Browse our pro jerseys, boots, and sports gear to place your first order.
                  </p>
                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      onClose();
                    }}
                    className="mt-2 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-full shadow-sm hover:bg-[#ff7a1a] transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  const step = getStepProgress(order.status);
                  const isExpanded = expandedTrackingId === order.id;

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="nl-order-card bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 space-y-3.5"
                    >
                      {/* Order Header info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-black text-[#141416]">
                              #{order.id}
                            </span>
                            <button
                              onClick={(e) => handleCopyId(order.id, e)}
                              className="text-gray-400 hover:text-black p-0.5 transition cursor-pointer"
                              title="Copy Order ID"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {copiedOrderId === order.id && (
                              <span className="text-[10px] text-[#FF6B00] font-bold">
                                Copied!
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                            {order.date}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center space-x-1 shadow-xs ${statusBadge.bg}`}
                        >
                          {statusBadge.icon}
                          <span>{statusBadge.label}</span>
                        </div>
                      </div>

                      {/* 4-Step Visual Progress Stepper */}
                      <div className="bg-[#F8F9FD] rounded-2xl p-3 border border-gray-100 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 px-0.5">
                          <span className={step >= 1 ? 'text-[#FF6B00]' : ''}>Placed</span>
                          <span className={step >= 2 ? 'text-[#FF6B00]' : ''}>Confirmed</span>
                          <span className={step >= 3 ? 'text-[#FF6B00]' : ''}>On The Way</span>
                          <span className={step >= 4 ? 'text-emerald-600' : ''}>Delivered</span>
                        </div>
                        {/* Progress line */}
                        <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              order.status === 'delivered' ? 'bg-emerald-500' : 'bg-[#FF6B00]'
                            }`}
                            style={{ width: `${(step / 4) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-600 pt-0.5 font-medium">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#FF6B00]" />
                            <span>ETA: {order.estimatedDelivery}</span>
                          </span>
                          {order.courierName && (
                            <span className="text-[10px] text-gray-400 font-semibold truncate max-w-[150px]">
                              {order.courierName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              triggerHaptic('light');
                              onSelectProduct(item.product);
                              onClose();
                            }}
                            className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 transition cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-black text-[#141416] truncate group-hover:text-[#FF6B00] transition-colors">
                                {item.product.name}
                              </h5>
                              <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-0.5">
                                <span className="bg-gray-100 px-1.5 py-0.2 rounded font-bold text-gray-700">
                                  Size {item.size}
                                </span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-[#141416]">
                                {formatBDT(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Address & Payment Info */}
                      <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-gray-500">
                        <div className="flex items-center space-x-1 truncate max-w-[210px]">
                          <MapPin className="w-3 h-3 text-[#FF6B00] flex-shrink-0" />
                          <span className="truncate">{order.shippingAddress}</span>
                        </div>
                        <div className="font-bold text-[#141416]">
                          Total: <span className="text-[#FF6B00]">{formatBDT(order.totalAmount)}</span>
                        </div>
                      </div>

                      {/* Expandable Live Tracking Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pt-1"
                          >
                            <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-3 space-y-2 text-xs">
                              <div className="flex items-center justify-between font-bold text-amber-900">
                                <span>Courier Dispatch Updates</span>
                                <span className="text-[10px] text-amber-700">
                                  Tracking: {order.trackingNumber || 'BD-TRK-9901'}
                                </span>
                              </div>
                              <div className="space-y-1.5 pl-2 border-l-2 border-amber-300 text-[11px] text-gray-700">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-black">Rider assigned for delivery</span>
                                  <span className="text-[10px] text-gray-400">11:15 AM</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Sorted at Banani Central Hub</span>
                                  <span className="text-[10px] text-gray-400">09:30 AM</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Package dispatched from warehouse</span>
                                  <span className="text-[10px] text-gray-400">08:00 AM</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Card Action Buttons */}
                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => {
                            triggerHaptic('light');
                            setExpandedTrackingId(isExpanded ? null : order.id);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-gray-600" />
                          <span>{isExpanded ? 'Hide Live Details' : 'Track Order'}</span>
                        </button>

                        <button
                          onClick={() => {
                            triggerHaptic('buy_now');
                            onQuickReorder(order.items[0].product);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#141416] hover:bg-black text-white text-xs font-bold transition flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Buy Again</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Notice */}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 flex-shrink-0">
              <div className="flex items-center space-x-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Genuine Sport Gear Guarantee</span>
              </div>
              <span className="font-bold text-[#FF6B00]">NEXT LEVEL</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
