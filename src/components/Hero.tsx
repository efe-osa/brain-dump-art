import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const fullName = "Efe-osa Jessye";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
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
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/40 blur-3xl" />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary mb-4 tracking-widest uppercase">
            Product (Full-Stack) Engineer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Hi, I'm{" "}
            <span className="text-primary">
              {displayed}
              <span
                className={`inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle ${done ? "animate-pulse" : ""}`}
              />
            </span>
          </h1>
          <div className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed space-y-4">
            <p>
              My work tends to live where complexity meets interface: designing component libraries that development
              teams actually want to use, building location-aware systems that handle real regulatory stakes, and
              migrating legacy codebases so that 250,000 users never feel the disruption. I care about performance,
              accessibility, and developer experience, not as checklist items but as measures of respect for the people
              using what I build.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Learn More
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
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/efe-osa-osawaru-oyelade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:eosawaruoyelade@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
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
