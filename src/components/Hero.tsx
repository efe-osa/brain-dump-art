import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const fullName = "Efe Jessye";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(fullName);
      setDone(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullName.slice(0, i));
      if (i >= fullName.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/40 blur-3xl" />

      <div className="container mx-auto px-6 py-32 relative z-10 flex flex-col lg:flex-row lg:items-center gap-16">
        <div className="max-w-3xl flex-1">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Hi, I'm{" "}
            <span className="text-primary">
              <span className="sr-only">{fullName}</span>
              <span aria-hidden="true">
                {displayed}
                {!done && <span className="inline-block w-[25px] h-[0.6em] bg-primary ml-1 align-middle" />}
              </span>
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Domain-agnostic by design: I learn the business, then build for it. Delivering production-grade web
            applications and SaaS products, across front-end and full-stack.{" "}
            <Link
              to="/experience"
              className="text-primary-strong font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              See my experience
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              View work
            </button>

            <a
              href="mailto:eosawaruoyelade@gmail.com"
              className="px-6 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Email me
            </a>
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

      <button
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
};

const CodeCard = () => (
  <div
    aria-hidden="true"
    className="hidden lg:block w-[420px] shrink-0 rounded-xl bg-card border border-border shadow-[var(--shadow-medium)] overflow-hidden"
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
