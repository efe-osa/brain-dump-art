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
    title: "Ringtail Interactive - Lemur Cloud Portal",
    role: "Software Engineer",
    description:
      "A scalable cloud-hosted SaaS portal built with .NET and Blazor, providing SDK provisioning, customer journey workflows, and secure secrets management. Includes a Deployment module designed to facilitate deployment operations (automate builds, deploys, and redeploys) across different environments, with promotion to manual environments unlocking wider configuration scope.",
    url: "https://www.br.ink/lemur",
    image: lemurImg,
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API"],
  },
  {
    title: "Everyfarmer - Service Provider",
    role: "Front-End Engineer",
    description:
      "A platform fostering easier management across the farming value chain, for products and services (inputs, implements, extension, storage, transport, logistics, and processing) offered to farmers. Led front-end delivery and built an interactive geospatial mapping tool with Google Maps that automated farm mapping assessment conducted by agents from 100,000+ service providers.",
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
    title: "Studio 14 - Equal Measures 2030",
    role: "Full Stack Developer",
    description:
      "A data-driven advocacy platform visualising gender equality metrics across the Sustainable Development Goals for global policymakers and campaigners.",
    url: "https://equalmeasures2030.org/",
    image: equalmeasuresImg,
    tags: ["JavaScript", "Web Components", "WordPress", "Accessibility", "CI/CD"],
  },
  {
    title: "Read it",
    role: "Full Stack Developer",
    description: "A Reddit blog",
    url: "https://fervent-bhabha-e5febb.netlify.app//",
    image: readitImg,
    tags: ["JavaScript", "Reddit API", "Responsive web design", "Netlify", "CI/CD"],
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full p-6 rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer"
    >
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        width={1280}
        height={800}
        className="w-full h-40 object-cover object-top rounded-lg border border-border mb-4"
      />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-primary-strong">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Live Site</span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-1" />
      </div>

      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      <span className="inline-flex self-start text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary-strong mb-4">
        {project.role}
      </span>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-border">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">Selected work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
