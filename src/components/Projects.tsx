import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      "Customer portal designed to enable game developers to configure our flagship game engine and release multiplayer games faster.",
    url: "https://www.br.ink/lemur",
    image: lemurImg,
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API"],
  },
  {
    title: "Everyfarmer — Service Provider",
    role: "Front-End Engineer",
    description:
      "Platform connecting farmers and other actors in the farming cycle",
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
    description:
      "Reddit posts into a standalone reading experience.",
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
      className="project-stack-card group bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={project.image}
        alt=""
        loading="lazy"
        width={1280}
        height={800}
        className="project-stack-image border border-border rounded-lg"
      />

      <div className="flex min-w-0 flex-col p-5 md:p-8">
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

      <h3
        id={titleId}
        className="sr-only"
      >
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
  const [activeTitle, setActiveTitle] = useState(projects[0].title);

  return (
    <section id="projects" className="py-24">
      <div className="page-shell">
        <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-strong min-h-[2.4em] mb-4">
          {activeTitle}
        </h2>
        <Tabs value={activeTitle} onValueChange={setActiveTitle}>
          <TabsList aria-label="Selected projects" className="grid h-auto w-full grid-cols-2 md:grid-cols-4 items-stretch gap-3 bg-transparent p-0 mb-6">
            {projects.map((project) => (
              <TabsTrigger
                key={project.title}
                value={project.title}
                className="group flex min-w-0 flex-col items-stretch justify-start gap-2 whitespace-normal rounded-lg border border-border bg-card p-2 text-left text-foreground data-[state=active]:border-primary-strong data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground focus-visible:ring-primary-strong"
              >
                <img src={project.image} alt="" width={1280} height={800} className="h-16 w-full rounded object-cover object-top" />
                <span className="text-xs leading-relaxed break-words">{project.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {projects.map((project, index) => (
            <TabsContent key={project.title} value={project.title} className="mt-0 focus-visible:ring-primary-strong">
              <ProjectCard project={project} index={index} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
