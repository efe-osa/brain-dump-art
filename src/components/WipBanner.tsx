import { useState, useEffect } from "react";
import { X, Construction } from "lucide-react";

const WipBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("wip-banner-dismissed");
    if (dismissed) setVisible(false);
  }, []);

  const dismiss = () => {
    localStorage.setItem("wip-banner-dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-primary/90 text-primary-foreground backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Construction className="h-4 w-4 shrink-0" />
          <span>This site is a work in progress — some things may still be evolving.</span>
        </div>
        <button
          onClick={dismiss}
          className="shrink-0 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WipBanner;
