import { useEffect, useState } from "react";
import { Accessibility, Minus, Plus, Contrast, RotateCcw, Moon, Sun } from "lucide-react";

type Size = "sm" | "base" | "lg" | "xl";
const SIZES: Size[] = ["sm", "base", "lg", "xl"];
const SCALE: Record<Size, string> = {
  sm: "93.75%",
  base: "100%",
  lg: "112.5%",
  xl: "125%",
};

const AccessibilityMenu = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size>("base");
  const [highContrast, setHighContrast] = useState(false);
  const [dark, setDark] = useState(false);

  // Load persisted prefs
  useEffect(() => {
    const s = (localStorage.getItem("a11y-size") as Size) || "base";
    const hc = localStorage.getItem("a11y-contrast") === "true";
    const dm = localStorage.getItem("a11y-dark") === "true";
    setSize(s);
    setHighContrast(hc);
    setDark(dm);
  }, []);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = SCALE[size];
    localStorage.setItem("a11y-size", size);
  }, [size]);

  // Apply high contrast
  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("a11y-contrast", String(highContrast));
  }, [highContrast]);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("a11y-dark", String(dark));
  }, [dark]);

  const bump = (dir: 1 | -1) => {
    const i = SIZES.indexOf(size);
    const next = Math.min(SIZES.length - 1, Math.max(0, i + dir));
    setSize(SIZES[next]);
  };

  const reset = () => {
    setSize("base");
    setHighContrast(false);
    setDark(false);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="fixed bottom-[5.25rem] right-6 z-50 w-64 rounded-2xl border border-border bg-card p-4 shadow-lifted"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Accessibility</h2>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Font size</span>
              <span className="text-xs font-medium text-foreground">{SCALE[size]}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bump(-1)}
                disabled={size === SIZES[0]}
                aria-label="Decrease font size"
                className="flex-1 inline-flex items-center justify-center min-h-11 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => bump(1)}
                disabled={size === SIZES[SIZES.length - 1]}
                aria-label="Increase font size"
                className="flex-1 inline-flex items-center justify-center min-h-11 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setDark((v) => !v)}
              aria-pressed={dark}
              className="w-full inline-flex items-center justify-between min-h-11 px-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-sm text-foreground">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                Dark mode
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  dark ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {dark ? "On" : "Off"}
              </span>
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setHighContrast((v) => !v)}
              aria-pressed={highContrast}
              className="w-full inline-flex items-center justify-between min-h-11 px-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-sm text-foreground">
                <Contrast className="h-4 w-4" />
                High contrast
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  highContrast ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {highContrast ? "On" : "Off"}
              </span>
            </button>
          </div>

          <button
            onClick={reset}
            className="w-full inline-flex items-center justify-center gap-2 min-h-11 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to defaults
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="fixed bottom-12 right-6 z-50 inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lifted hover:opacity-90 transition-opacity"
      >
        <Accessibility className="h-5 w-5" />
      </button>
    </>
  );
};

export default AccessibilityMenu;
