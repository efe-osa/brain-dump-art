import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const INTRO =
  "Domain-agnostic by design: I learn the business, then build for it. Delivering production-grade web applications and SaaS products, across front-end and full-stack.";

const Hero = () => {
  const fullName = "Efe Jessye";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

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
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/40 blur-3xl" />

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center gap-16 py-32 w-full max-w-[100rem] mx-auto px-4 md:px-6 xl:px-0">
        <div className="max-w-3xl flex-1">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Hi, I'm <span className="text-primary">{fullName}</span>
          </h1>

          <p className="font-read text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative">
            <span className="sr-only">{INTRO}</span>
            {/* Hidden copy reserves the final height so typing never shifts the page */}
            <span className="invisible" aria-hidden="true">
              {INTRO} <span className="text-primary-strong font-medium underline underline-offset-4">See my experience</span>
            </span>
            <span className="hero-typed absolute inset-0" aria-hidden="true">
              {typed}
              {!done && <span className="hero-caret inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-middle" />}
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

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/#projects">View work</Link>
            </Button>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/efe-osa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/efe-osa-osawaru-oyelade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:eosawaruoyelade@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email Efe-osa"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <CodeCard />
      </div>
    </section>
  );
};

const CodeCard = () => (
  <div
    aria-hidden="true"
    className="hidden xl:block w-full max-w-[420px] shrink-0 rounded-xl bg-card border border-border shadow-[var(--shadow-medium)] overflow-hidden"
  >
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
      <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
      <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
      <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
      <span className="ml-3 text-xs text-muted-foreground">efe.config.ts</span>
    </div>
    <pre className="px-5 py-5 text-[13px] leading-7 whitespace-pre text-foreground">
      <code>
        <span className="text-primary-strong">const</span> efe = {"{"}
        {"\n"}
        {"  "}years: <span className="text-primary-strong">7</span>,{"\n"}
        {"  "}role: <span className="text-primary-strong">"Product-minded engineer"</span>,{"\n"}
        {"  "}stack: [<span className="text-primary-strong">"TypeScript"</span>,{" "}
        <span className="text-primary-strong">"React"</span>, <span className="text-primary-strong">"C#/.NET"</span>],
        {"\n"}
        {"  "}focus: [<span className="text-primary-strong">"Design systems"</span>,{" "}
        <span className="text-primary-strong">"Accessibility"</span>],{"\n"}
        {"  "}location: <span className="text-primary-strong">"Stockholm, Sweden"</span>,{"\n"}
        {"  "}status: <span className="text-primary-strong">"open to new domains"</span>,{"\n"}
        {"}"};
      </code>
    </pre>
  </div>
);

export default Hero;
