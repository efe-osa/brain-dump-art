import { useEffect, useRef } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import lemurImg from "@/assets/lemur.jpg";
import everyfarmerImg from "@/assets/everyfarmer.jpg";
import equalmeasuresImg from "@/assets/equalmeasures.jpg";
import readitImg from "@/assets/readit.jpg";

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
      "Built the customer portal designed to enable game developers to configure our flagship game engine and release multiplayer games faster. Delivered project configurations and deployment module development for codebase connection and automated code releases.",
    url: "https://www.br.ink/lemur",
    image: lemurImg,
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API"],
  },
  {
    title: "Everyfarmer — Service Provider",
    role: "Front-End Engineer",
    description:
      "Led service-provider workflows with JavaScript, React and Redux. Built a Google Maps farm-mapping tool that automated assessments for 100,000+ service providers, reducing operating expenses by $10,000.",
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
      "Contributed to a JavaScript and WordPress advocacy website using Web Components, making gender-equality metrics across the Sustainable Development Goals accessible to policymakers and campaigners.",
    url: "https://equalmeasures2030.org/",
    image: equalmeasuresImg,
    tags: ["JavaScript", "Web Components", "WordPress", "Accessibility", "CI/CD"],
  },
  {
    title: "Read it",
    role: "Full Stack Developer",
    description:
      "Built a responsive JavaScript blog using the Reddit API and deployed it on Netlify, bringing Reddit posts into a standalone reading experience.",
    url: "https://fervent-bhabha-e5febb.netlify.app/",
    image: readitImg,
    tags: ["JavaScript", "Reddit API", "Responsive web design", "Netlify", "CI/CD"],
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const titleId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={titleId}
      className="group flex flex-col md:flex-row md:min-h-[320px] overflow-hidden rounded-xl bg-card border border-transparent shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer"
    >
      <img
        src={project.image}
        alt=""
        loading="lazy"
        width={1280}
        height={800}
        className="w-full h-44 md:h-auto md:w-[36%] lg:w-[380px] md:self-stretch shrink-0 object-cover object-top border-b md:border-b-0 md:border-r border-border"
      />

      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-primary-strong">
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wider">Live Site</span>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground group-hover:text-primary-strong transition-colors shrink-0"
          />
        </div>

        <h3
          id={titleId}
          className="text-xl md:text-2xl font-semibold text-card-foreground mb-2 group-hover:text-primary-strong transition-colors"
        >
          {project.title}
          <span className="sr-only"> (opens in a new tab)</span>
        </h3>

        <span className="inline-flex self-start text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary-strong mb-4">
          {project.role}
        </span>

        <p className="font-read text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

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
  // Equalise card heights so a covering card fully hides the one beneath it;
  // unequal heights would leave slivers of the previous card peeking out.
  const deckRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const deck = deckRef.current;
    const cards = deck?.querySelectorAll<HTMLElement>("a.group");
    if (!deck || !cards?.length) return;
    const equalise = () => {
      const max = Math.max(...Array.from(cards, (card) => card.getBoundingClientRect().height));
      cards.forEach((card) => {
        card.style.minHeight = `${Math.ceil(max)}px`;
      });
    };
    equalise();
    const observer = new ResizeObserver(equalise);
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="page-shell">
        <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">Selected work</h2>

        <div className="project-deck" ref={deckRef}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-deck__item"
              style={{ top: `calc(5.5rem + ${index * 0.875}rem)` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
