import { ArrowDownRight, Check, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const INTRO =
  "I design and build accessible web products, from reusable interfaces to the systems behind them. Full-stack engineering, with a product mindset and an eye for the details.";

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
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    const finish = () => {
      clearInterval(interval);
      setTyped(INTRO);
      setDone(true);
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    let i = 0;
    if (preference.matches) finish();
    else
      interval = setInterval(() => {
        i++;
        setTyped(INTRO.slice(0, i));
        if (i >= INTRO.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 18);
    return () => {
      clearInterval(interval);
      preference.removeEventListener("change", onPreferenceChange);
      clearTimeout(resetTimer.current);
    };
  }, []);

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
    <section id="hero" className="portfolio-intro">
      <div className="w-full max-w-[100rem] mx-auto px-5 md:px-10">
        <div className="max-w-5xl">
          <h1 className="intro-name font-bold text-foreground mb-8">
            <span className="block text-xl md:text-2xl font-normal mb-4">Hi, I'm</span>
            <span className="text-primary-strong">{fullName}</span>
          </h1>

          <p className="font-read text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative">
            <span className="sr-only">{INTRO}</span>
            {/* Hidden copy reserves the final height so typing never shifts the page */}
            <span className="invisible" aria-hidden="true">
              {INTRO}{" "}
              <span className="text-primary-strong font-medium underline underline-offset-4">See my experience</span>
            </span>
            <span className="hero-typed absolute inset-0">
              <span aria-hidden="true">{typed}</span>
              {!done && <span aria-hidden="true" className="hero-caret inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-middle" />}
              {done && (
                <>
                  {" "}
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

          <div className="flex items-center gap-2">
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
        <dl className="intro-practice grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-16 pt-6 border-t border-border">
          {[
            ["01 / Interfaces", "Reusable component systems"],
            ["02 / Inclusion", "Accessibility & performance"],
            ["03 / Engineering", "Front-end to full-stack"],
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
