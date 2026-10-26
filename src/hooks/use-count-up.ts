import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `target` once the returned ref enters the viewport.
 * Honours prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current || preference.matches) return;
        started.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    const onPreferenceChange = () => {
      if (!preference.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      started.current = true;
      setDisplay(target);
    };
    preference.addEventListener("change", onPreferenceChange);
    if (preference.matches) onPreferenceChange();
    else observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [target, duration]);

  return { ref, display };
}
