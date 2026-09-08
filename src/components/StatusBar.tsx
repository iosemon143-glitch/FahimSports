import React from 'react';
import { Wifi } from 'lucide-react';
import { DynamicIsland } from './DynamicIsland';

interface StatusBarProps {
  darkText?: boolean;
  onScrollToTop?: () => void;
  cartNotice?: string | null;
  onOpenOrders?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  darkText = true,
  onScrollToTop,
  cartNotice,
  onOpenOrders,
}) => {
  const textColor = darkText ? 'text-[#141416]' : 'text-white';
  const fillColor = darkText ? '#141416' : '#FFFFFF';

  return (
    <div className={`relative w-full pt-3 pb-2 px-7 flex items-center justify-between z-30 select-none ${textColor}`}>
      {/* Real Interactive Apple Dynamic Island */}
      <DynamicIsland cartNotice={cartNotice} onOpenOrders={onOpenOrders} />

      {/* Time (Tap to Scroll to Top) */}
      <button
        onClick={onScrollToTop}
        title="Tap to scroll to top"
        className="text-[14px] font-semibold tracking-tight font-sans cursor-pointer hover:opacity-80 active:scale-95 transition"
      >
        9:41
      </button>

      {/* Spacer to balance between Time and Status Icons */}
      <div className="w-[124px] h-[34px] pointer-events-none" />

      {/* Signal, Wifi, Battery (Tap to Scroll to Top) */}
      <button
        onClick={onScrollToTop}
        title="Tap to scroll to top"
        className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80 active:scale-95 transition"
      >
        {/* Cellular Signal Bars */}
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-[3px] h-[4px] rounded-xs" style={{ backgroundColor: fillColor }} />
          <div className="w-[3px] h-[6px] rounded-xs" style={{ backgroundColor: fillColor }} />
          <div className="w-[3px] h-[8px] rounded-xs" style={{ backgroundColor: fillColor }} />
          <div className="w-[3px] h-[11px] rounded-xs" style={{ backgroundColor: fillColor }} />
        </div>

        {/* Wifi Icon */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.4]" />

        {/* Battery Icon */}
        <div className="flex items-center">
          <div className="w-5 h-[11px] border border-current rounded-[3px] p-[1px] flex items-center">
            <div className="w-full h-full rounded-[1.5px]" style={{ backgroundColor: fillColor }} />
          </div>
          <div className="w-[1.5px] h-[4px] bg-current rounded-r-[1px] ml-[0.5px]" />
        </div>
      </button>
    </div>
  );
};

