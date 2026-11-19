import { ArrowDownRight, Check, Github, Linkedin, Mail, Orbit } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import marsImage from "@/assets/mars-timeline.jpg";
import earthImage from "@/assets/earth-timeline.jpg";

const MISSION =
  "In this timeline, I design and build accessible web products, from sharp interfaces to resilient full-stack systems.";
const GLYPHS = "✦✧⟐⌬⍟ᚠᚱᛟ◈⊹∴";
const STYLES = [
  ["weave", "Starlight weave"],
  ["phase", "Phase shift"],
  ["inscribe", "Astral inscription"],
] as const;
type RevealStyle = (typeof STYLES)[number][0];

// Rune-decode: characters flicker through glyphs and lock in left to right.
// Returns the final text immediately when disabled (reduced motion).
const useRuneDecode = (text: string, enabled: boolean, total = 40, tick = 35) => {
  const [decoded, setDecoded] = useState(text);
  useEffect(() => {
    if (!enabled) {
      setDecoded(text);
      return;
    }
    let frame = 0;
    const render = () => {
      const lock = Math.floor((frame / total) * text.length);
      setDecoded(
        text
          .split("")
          .map((c, i) => (i < lock || c === " " ? c : GLYPHS[(i + frame) % GLYPHS.length]))
          .join(""),
      );
    };
    render();
    const id = setInterval(() => {
      frame++;
      render();
      if (frame >= total) {
        clearInterval(id);
        setDecoded(text);
      }
    }, tick);
    return () => clearInterval(id);
  }, [text, enabled, total, tick]);
  return decoded;
};

// Transmission tag: decodes on arrival and re-decodes when the timeline changes.
const BroadcastLine = ({ timeline, reduced }: { timeline: string; reduced: boolean }) => {
  const text = `TRANSMITTING FROM ${timeline}`;
  return (
    <p className="text-xs text-primary-strong flex items-center gap-2">
      <span className="transmission-dot" aria-hidden="true" />
      <span className="broadcast-text font-mono tabular-nums whitespace-nowrap">{text}</span>
    </p>
  );
};

// Phase shift: words drift up out of a blur, left to right. Under reduced
// motion the plain text is returned so nothing has to animate.
const PHASE_STEP = 60;
const PHASE_RUN = 700;
const RUNE_FRAMES = 40;
const RUNE_TICK = 35;
const RuneIntro = ({ text, reduced }: { text: string; reduced: boolean }) => {
  const decoded = useRuneDecode(text, !reduced, RUNE_FRAMES, RUNE_TICK);
  return <span aria-hidden="true" className="intro-rune">{decoded}</span>;
};
const PhaseWords = ({ text, reduced }: { text: string; reduced: boolean }) => {
  if (reduced) return <span aria-hidden="true">{text}</span>;
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="reveal-phase-word" style={{ animationDelay: `${i * PHASE_STEP}ms` }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
};

// Second line reveal; previews three sci-fi/fantasy treatments. Text stays in DOM for layout.
const MissionLine = ({ style, reduced }: { style: RevealStyle; reduced: boolean }) => {
  if (style === "phase")
    return <span aria-hidden="true">{MISSION.split(" ").map((w, i) => <span key={i} className="reveal-phase-word" style={{ animationDelay: `${i * 70}ms` }}>{w} </span>)}</span>;
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
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [earth, setEarth] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timeline = earth ? "Earth-0407" : "Mars-0321";
  const intro = `Welcome to my corner of the multiverse — ${timeline}.`;
  const revealStyle: RevealStyle = "weave";
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The intro phase-reveals word by word; the mission line lands once it settles.
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(preference.matches);
    setRevealed(false);
    const finish = () => setRevealed(true);
    const onPreferenceChange = () => {
      setReduced(preference.matches);
      if (preference.matches) finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (preference.matches) finish();
    else timer = setTimeout(finish, RUNE_FRAMES * RUNE_TICK + 100);
    return () => {
      clearTimeout(timer);
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
      <div className="relative page-shell">
        <div className="timeline-broadcast flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
          <BroadcastLine timeline={timeline} reduced={reduced} />
          <Button variant="outline" size="sm" className="min-h-11 gap-2 rounded-full bg-transparent font-mono text-xs text-primary-strong hover:bg-accent hover:text-primary-strong" aria-label={`Switch timeline to ${earth ? "Mars-0321" : "Earth-0407"} (currently ${timeline})`} onClick={() => { setEarth(!earth); setAnnouncement(`Timeline changed to ${earth ? "Mars-0321" : "Earth-0407"}.`); }}>
            <Orbit aria-hidden="true" />
            Switch timeline
          </Button>
        </div>
        <span role="status" aria-live="polite" className="sr-only">{announcement}</span>
        <div className="max-w-5xl">
          <h1 className="intro-name font-bold text-foreground mb-8">
            <span className="block text-xl md:text-2xl font-normal mb-4">Hi, I'm</span>
            <span className="text-primary-strong">{fullName}</span>
          </h1>

          <p className="font-read text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative">
            <span className="sr-only">{intro} {MISSION}</span>
            {/* Hidden copy reserves the final height so the reveal never shifts the page */}
            <span className="invisible">
              <span aria-hidden="true">{intro} {MISSION}</span>{" "}
              <Link
                to="/experience"
                aria-hidden={false}
                className={`visible relative z-10 text-primary-strong font-medium underline underline-offset-4 transition-opacity duration-500 hover:opacity-80 ${revealed ? "opacity-100" : "opacity-0"}`}
              >
                See my experience
              </Link>
            </span>
            <span className="hero-typed absolute inset-0 pointer-events-none">
              <RuneIntro key={intro} text={intro} reduced={reduced} />
              {revealed && (
                <>
                  {" "}
                  <MissionLine key={revealStyle + timeline} style={revealStyle} reduced={reduced} />
                </>
              )}
            </span>
          </p>

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
          </div>
        </div>
        <dl aria-label="Mission log" className="intro-practice grid grid-cols-1 min-[480px]:grid-cols-3 gap-5 mt-8 pt-5 border-t border-border">
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
