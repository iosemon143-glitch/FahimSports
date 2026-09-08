/**
 * Super smooth physics-based cubic ease scroll controller
 */
export function smoothScrollTo(
  element: HTMLElement | null,
  targetTop: number,
  duration: number = 420
) {
  if (!element) return;

  const start = element.scrollTop;
  const change = targetTop - start;
  if (Math.abs(change) < 2) return;

  const startTime = performance.now();

  // Cubic bezier easing for Apple-grade silky deceleration
  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScroll(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    element.scrollTop = start + change * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
