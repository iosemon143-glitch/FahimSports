import React from 'react';
import { CheckCircle2, Truck } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface DynamicIslandProps {
  cartNotice?: string | null;
  onOpenOrders?: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ cartNotice, onOpenOrders }) => (
  <button
    type="button"
    onClick={() => {
      triggerHaptic('light');
      if (cartNotice && onOpenOrders) onOpenOrders();
    }}
    className="absolute left-1/2 -translate-x-1/2 top-1.5 z-50 w-[124px] h-[34px] rounded-[20px] bg-black text-white flex items-center justify-between px-3 shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_0.8px_rgba(255,255,255,0.15)] select-none"
    aria-label={cartNotice ? 'Open orders' : 'Dynamic Island'}
  >
    <span>
      {cartNotice ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <span className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center">
          <Truck className="w-2.5 h-2.5 text-white" />
        </span>
      )}
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#0c1220] ring-1 ring-white/10" />
    </span>
    {cartNotice && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-400/70 rounded-full" />}
  </button>
);
