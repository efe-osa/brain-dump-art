import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }, [location.pathname, location.hash, location.key]);

  const links = [
    { label: "Work", id: "projects" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
    <Button asChild className="fixed left-6 top-3 z-[60] -translate-y-24 focus:translate-y-0 focus-visible:ring-primary-strong">
      <a href="#main-content">Skip to main content</a>
    </Button>
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Button asChild variant="ghost" className="px-0 text-xl font-bold text-foreground" >
          <Link to="/" aria-label="Efe Jessye home" onClick={() => setMobileOpen(false)}>
            ÈJO<span className="text-primary-strong">.</span>
          </Link>
        </Button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Button asChild variant="ghost"
              key={l.id}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link to={`/#${l.id}`}>{l.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link to="/experience" aria-current={location.pathname === "/experience" ? "page" : undefined}>Experience</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button ref={menuTrigger} variant="ghost" size="icon" className="md:hidden min-h-11 min-w-11 text-foreground"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen} aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {/* Mobile menu */}
        <div id="mobile-navigation" hidden={!mobileOpen}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            setMobileOpen(false);
            menuTrigger.current?.focus();
          }}
          className={`${mobileOpen ? "flex" : "hidden"} md:hidden border-t border-border bg-background px-6 py-4 flex-col gap-3`}>
          {links.map((l) => (
            <Button asChild variant="ghost"
              key={l.id}
              className="min-h-11 justify-start text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link to={`/#${l.id}`} onClick={() => setMobileOpen(false)}>{l.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost"
            className="min-h-11 justify-start text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link to="/experience" onClick={() => setMobileOpen(false)} aria-current={location.pathname === "/experience" ? "page" : undefined}>Experience</Link>
          </Button>
        </div>
    </nav>
    </>
  );
};

export default Navbar;
