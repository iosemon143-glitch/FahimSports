/**
 * Utility for triggering tactile vibration feedback on supported mobile devices.
 * Uses the Web Vibration API (navigator.vibrate) with safe feature detection.
 */

export type HapticType =
  | 'light'
  | 'medium'
  | 'selection'
  | 'wishlist_add'
  | 'wishlist_remove'
  | 'buy_now'
  | 'add_to_cart'
  | 'order_success'
  | 'payment_start'
  | 'success'
  | 'error';

export const triggerHaptic = (type: HapticType = 'light'): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  if (!('vibrate' in navigator) || typeof navigator.vibrate !== 'function') {
    return false;
  }

  try {
    switch (type) {
      case 'light':
      case 'selection':
        return navigator.vibrate(18);
      case 'medium':
        return navigator.vibrate(28);
      case 'wishlist_add':
        // Energetic double-tap pattern: buzz (30ms), pause (40ms), buzz (45ms)
        return navigator.vibrate([30, 40, 45]);
      case 'wishlist_remove':
        // Single brief tap
        return navigator.vibrate(22);
      case 'buy_now':
        // Firm, decisive tactile buzz for instant checkout
        return navigator.vibrate([40, 35, 50]);
      case 'add_to_cart':
        // Dual tactile clicks confirming item added to bag
        return navigator.vibrate([30, 40, 30]);
      case 'payment_start':
        return navigator.vibrate(35);
      case 'order_success':
      case 'success':
        // Celebratory success rhythm
        return navigator.vibrate([35, 45, 35, 45, 90]);
      case 'error':
        return navigator.vibrate([50, 50, 50]);
      default:
        return navigator.vibrate(20);
    }
  } catch {
    return false;
  }
};
