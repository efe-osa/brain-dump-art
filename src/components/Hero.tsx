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

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Hi, I'm{" "}
            <span className="text-primary">
              <span className="sr-only">{fullName}</span>
              <span aria-hidden="true">
                {displayed}
                <span
                  className={`inline-block w-[25px] h-[0.6em] bg-primary ml-1 align-middle ${done ? "animate-pulse" : ""}`}
                />
              </span>
            </span>
          </h1>
          <div className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed space-y-4">
            <p>
              <Link
                to="/experience"
                className="text-primary font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                My work
              </Link>{" "}
              tends to live where complexity meets interface
            </p>
            <p>
              I build production grade web platforms — TypeScript, React and Next.js on the front, C#/.NET and Blazor on
              the back, shipped on Azure and AWS. Domain-agnostic by design: I learn the business, then build for it.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm text-muted-foreground">
            {["7+ years shipping production software", "Open to new domains", "Stockholm, Sweden"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              See my work
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Get in Touch
            </button>
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

export default Hero;
