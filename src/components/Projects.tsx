import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import lemurImg from "@/assets/lemur.jpg";
import everyfarmerImg from "@/assets/everyfarmer.jpg";
import equalmeasuresImg from "@/assets/equalmeasures.jpg";
import readitImg from "@/assets/readit.jpg";
import innovationCatalystImg from "@/assets/innovation-catalyst.jpg";

interface Project {
  title: string;
  role: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Lemur Cloud Portal",
    role: "Software Engineer",
    description:
      "Customer portal designed to enable game developers to configure our flagship game engine and release multiplayer games faster.",
    url: "https://www.br.ink/lemur",
    image: lemurImg,
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API"],
  },
  {
    title: "The Innovation Catalyst",
    role: "Full Stack Developer",
    description:
      "Accessibility-first innovation hub for Stoke-on-Trent & Staffordshire, with high-contrast mode and adjustable text size built in.",
    url: "https://stokecity-innovation-hub.pages.dev/",
    image: innovationCatalystImg,
    tags: ["JavaScript", "Accessibility", "Cloudflare Pages"],
  },
  {
    title: "Everyfarmer — Service Provider",
    role: "Front-End Engineer",
    description: "Platform connecting farmers and other actors in the farming cycle",
    url: "https://everyfarmer.farm/",
    image: everyfarmerImg,
    tags: [
      "Geospatial Mapping",
      "Product & Service Management",
      "JavaScript",
      "React",
      "Redux",
      "Google Maps API",
      "CI/CD",
    ],
  },
  {
    title: "Equal Measures 2030",
    role: "Full Stack Developer",
    description:
      "Advocacy website making gender-equality metrics across the Sustainable Development Goals accessible to policymakers and campaigners.",
    url: "https://equalmeasures2030.org/",
    image: equalmeasuresImg,
    tags: ["JavaScript", "Web Components", "WordPress", "Accessibility", "CI/CD"],
  },
  {
    title: "Read it",
    role: "Full Stack Developer",
    description: "Reddit posts into a standalone reading experience.",
    url: "https://fervent-bhabha-e5febb.netlify.app/",
    image: readitImg,
    tags: ["JavaScript", "Reddit API", "Responsive web design", "Netlify", "CI/CD"],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const titleId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={titleId}
      className="project-stack-card group bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300  cursor-pointer"
    >
      <img
        src={project.image}
        alt=""
        loading="lazy"
        width={1280}
        height={800}
        className="project-stack-image border border-border rounded-lg"
      />

      <div className="flex min-w-0 flex-col p-4 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-primary-strong">
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wider">Live Site</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-muted-foreground group-hover:text-primary-strong transition-colors shrink-0"
            />
          </div>
        </div>

        <h3 id={titleId} className="sr-only">
          {project.title}
          <span className="sr-only"> (opens in a new tab)</span>
        </h3>

        <span className="inline-flex self-start text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary-strong mb-4">
          {project.role}
        </span>

        <p className="font-read text-base text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-border">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLOListElement>(null);
  const [canStack, setCanStack] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const list = stackRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    if (!list || !track || !heading) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(list.querySelectorAll<HTMLElement>(".project-stack-card"));
    const update = () => {
      const largestCard = Math.max(...cards.map((card) => card.getBoundingClientRect().height));
      // Leave room for the fixed navigation, focus outline and floating settings.
      const inset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5;
      const stageHeight = largestCard + heading.getBoundingClientRect().height;
      track.style.setProperty("--stage-height", `${stageHeight}px`);
      track.style.setProperty("--project-scroll-distance", `${(projects.length - 1) * window.innerHeight * 0.65}px`);
      setCanStack(!motion.matches && stageHeight <= window.innerHeight - inset - 64);
    };
    const observer = new ResizeObserver(update);
    cards.forEach((card) => observer.observe(card));
    observer.observe(heading);
    window.addEventListener("resize", update);
    motion.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const list = stackRef.current;
    if (!track || !list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const update = () => {
      const inset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5;
      if (canStack) {
        const progress = Math.max(
          0,
          Math.min(projects.length - 1, (inset - track.getBoundingClientRect().top) / (window.innerHeight * 0.65)),
        );
        items.forEach((item, index) => {
          const revealed = index === 0 ? 1 : Math.max(0, Math.min(1, progress - index + 1));
          item.style.setProperty("--reveal-top", `${(1 - revealed) * 100}%`);
        });
        setActiveProject(list.getBoundingClientRect().top < window.innerHeight * 0.8 ? Math.round(progress) : null);
      } else {
        const visible = items.findIndex((item) => {
          const bounds = item.getBoundingClientRect();
          return bounds.bottom > inset && bounds.top < window.innerHeight * 0.8;
        });
        setActiveProject(visible >= 0 ? visible : null);
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [canStack]);

  const focusProject = (index: number) => {
    const track = trackRef.current;
    if (canStack && track) {
      const inset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5;
      window.scrollTo({
        top: window.scrollY + track.getBoundingClientRect().top - inset + index * window.innerHeight * 0.65,
        behavior: "instant",
      });
    }
    setActiveProject(index);
  };

  return (
    <section id="projects" className="py-24">
      <div className="page-shell">
        <div ref={trackRef} className={`project-track ${canStack ? "project-track--pinned" : ""}`}>
          <div ref={stageRef} className="project-stage">
            <div ref={headingRef} className="project-stack-heading">
              <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">Projects</p>
              <h2
                className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${activeProject === null ? "text-foreground" : "text-primary-strong"}`}
              >
                <span className="sr-only">Selected work</span>
                <span aria-hidden="true">
                  {activeProject === null ? "Selected work" : projects[activeProject]?.title}
                </span>
              </h2>
            </div>

            <ol
              ref={stackRef}
              className={`project-stack ${canStack ? "project-stack--sticky" : ""}`}
              aria-label="Selected projects"
            >
              {projects.map((project, index) => (
                <li key={project.title} className="project-stack-item" onFocus={() => focusProject(index)}>
                  {!canStack && (
                    <h3 className="text-xl md:text-2xl font-semibold text-primary-strong mb-3">{project.title}</h3>
                  )}
                  <ProjectCard project={project} index={index} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
