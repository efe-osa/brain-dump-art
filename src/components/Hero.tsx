import { ArrowDownRight, Check, Github, Linkedin, Mail, Orbit } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import marsImage from "@/assets/mars-timeline.jpg";
import earthImage from "@/assets/earth-timeline.jpg";

const MISSION =
  "In this timeline, I design and build accessible web products, from sharp interfaces to resilient full-stack systems.";
const GLYPHS = "✦✧⟐⌬⍟ᚠᚱᛟ◈⊹∴";
const STYLES = [
  ["decode", "Rune decode"],
  ["weave", "Starlight weave"],
  ["phase", "Phase shift"],
  ["inscribe", "Astral inscription"],
] as const;
type RevealStyle = (typeof STYLES)[number][0];

// Second line reveal; previews four sci-fi/fantasy treatments. Text stays in DOM for layout.
const MissionLine = ({ style, reduced }: { style: RevealStyle; reduced: boolean }) => {
  const [decoded, setDecoded] = useState(style === "decode" && !reduced ? "" : MISSION);
  useEffect(() => {
    if (style !== "decode" || reduced) { setDecoded(MISSION); return; }
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame++;
      const lock = Math.floor((frame / total) * MISSION.length);
      setDecoded(MISSION.split("").map((c, i) => (i < lock || c === " " ? c : GLYPHS[(i + frame) % GLYPHS.length])).join(""));
      if (frame >= total) { clearInterval(id); setDecoded(MISSION); }
    }, 35);
    return () => clearInterval(id);
  }, [style, reduced]);
  if (style === "phase")
    return <span aria-hidden="true">{MISSION.split(" ").map((w, i) => <span key={i} className="reveal-phase-word" style={{ animationDelay: `${i * 70}ms` }}>{w} </span>)}</span>;
  if (style === "decode") return <span aria-hidden="true" className="reveal-decode">{decoded}</span>;
  return <span aria-hidden="true" className={`reveal-${style}`}>{MISSION}</span>;
};

const EMAIL = "eosawaruoyelade@gmail.com";

// The clipboard API only works in a secure context, so keep a legacy path for
// older browsers and plain-http previews.
async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or unavailable — fall through to the legacy path.
  }
  try {
    const scratch = document.createElement("textarea");
    scratch.value = text;
    scratch.setAttribute("readonly", "");
    scratch.style.position = "fixed";
    scratch.style.top = "-1000px";
    document.body.appendChild(scratch);
    scratch.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(scratch);
    return copied;
  } catch {
    return false;
  }
}

const Hero = () => {
  const fullName = "Efe Jessye";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [earth, setEarth] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timeline = earth ? "Earth-2337" : "Mars-0321";
  const intro = `Welcome to my corner of the multiverse — ${timeline}.`;
  const [revealStyle, setRevealStyle] = useState<RevealStyle>("decode");
  const [reduced, setReduced] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setTyped("");
    setDone(false);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    const finish = () => {
      clearInterval(interval);
      setTyped(intro);
      setDone(true);
    };
    setReduced(preference.matches);
    const onPreferenceChange = () => {
      setReduced(preference.matches);
      if (preference.matches) finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    let i = 0;
    if (preference.matches) finish();
    else
      interval = setInterval(() => {
        i++;
        setTyped(intro.slice(0, i));
        if (i >= intro.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 18);
    return () => {
      clearInterval(interval);
      preference.removeEventListener("change", onPreferenceChange);
      clearTimeout(resetTimer.current);
    };
  }, [intro]);

  const handleCopyEmail = async () => {
    if (await copyToClipboard(EMAIL)) {
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2500);
      toast.success("Email copied to clipboard", { description: EMAIL });
    } else {
      toast.error("Couldn't copy the email automatically", {
        description: `You can reach me at ${EMAIL}`,
      });
    }
  };

  return (
    <section id="hero" className="portfolio-intro timeline-intro">
      <div className="timeline-scenery" aria-hidden="true">
        <img src={marsImage} width={1920} height={1024} alt="" className={earth ? "timeline-image" : "timeline-image timeline-image--active"} fetchPriority="high" />
        <img src={earthImage} width={1920} height={1024} alt="" className={earth ? "timeline-image timeline-image--active" : "timeline-image"} />
        <div className="timeline-veil" />
        <div className="timeline-stars"><span>✦</span><span>·</span><span>✧</span><span>·</span></div>
      </div>
      <div className="relative w-full max-w-[100rem] mx-auto px-5 md:px-10">
        <div className="timeline-broadcast flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
          <p className="text-xs text-primary-strong flex items-center gap-2"><span className="transmission-dot" aria-hidden="true" />TRANSMITTING FROM {timeline}</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-primary-strong" aria-label={`Switch timeline to ${earth ? "Mars-0321" : "Earth-2337"}`} onClick={() => { setEarth(!earth); setAnnouncement(`Timeline changed to ${earth ? "Mars-0321" : "Earth-2337"}.`); }}>
                <Orbit aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Switch timeline</TooltipContent>
          </Tooltip>
        </div>
        <span role="status" aria-live="polite" className="sr-only">{announcement}</span>
        <div className="max-w-5xl">
          <h1 className="intro-name font-bold text-foreground mb-8">
            <span className="block text-xl md:text-2xl font-normal mb-4">Hi, I'm</span>
            <span className="text-primary-strong">{fullName}</span>
          </h1>

          <p className="font-read text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative">
            <span className="sr-only">{intro} {MISSION}</span>
            {/* Hidden copy reserves the final height so typing never shifts the page */}
            <span className="invisible" aria-hidden="true">
              {intro} {MISSION}{" "}
              <span className="text-primary-strong font-medium underline underline-offset-4">See my experience</span>
            </span>
            <span className="hero-typed absolute inset-0">
              <span aria-hidden="true">{typed}</span>
              {!done && <span aria-hidden="true" className="hero-caret inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-middle" />}
              {done && (
                <>
                  {" "}
                  <MissionLine key={revealStyle + timeline} style={revealStyle} reduced={reduced} />
                  <Link
                    to="/experience"
                    className="hero-fade-in text-primary-strong font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    See my experience
                  </Link>
                </>
              )}
            </span>
          </p>

          <div role="group" aria-label="Preview intro animation" className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-primary-strong">Preview animation:</span>
            {STYLES.map(([id, label]) => (
              <Button key={id} size="sm" variant={revealStyle === id ? "default" : "outline"} aria-pressed={revealStyle === id} onClick={() => setRevealStyle(id)}>{label}</Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button asChild size="lg">
              <Link to="/#projects">View work <ArrowDownRight aria-hidden="true" /></Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCopyEmail}
              aria-label={`Copy email address ${EMAIL} to clipboard`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              {copied ? "Email copied" : "Copy email"}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-primary-strong">
            <a
              href="https://github.com/efe-osa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-primary-strong">
            <a
              href="https://linkedin.com/in/efe-osa-osawaru-oyelade"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            </Button>
            <span className="text-xs text-muted-foreground ml-3">Stockholm, Sweden</span>
          </div>
        </div>
        <dl aria-label="Mission log" className="intro-practice grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 pt-5 border-t border-border">
          {[
            ["01 / Coordinates", `${timeline} · Stockholm`],
            ["02 / Mission", "Accessible web products"],
            ["03 / Flight log", "7+ years shipping software"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-primary-strong mb-2">{label}</dt>
              <dd className="text-sm text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
