import { ArrowUpRight, Globe } from "lucide-react";
import { LaptopMockup } from "./LaptopMockup";
import { PhoneMockup } from "./PhoneMockup";
import lemurScreenshot from "@/assets/lemur-portal-screenshot.png";
import everyFarmerScreenshot from "@/assets/everyfarmer-screenshot.png";
import equalMeasuresScreenshot from "@/assets/equal-measures-screenshot.png";

interface Project {
  title: string;
  role: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** If true, render the image plainly (no laptop frame). */
  rawImage?: boolean;
  /** Optional mobile-app screenshot rendered inside a phone mockup. */
  mobileImage?: string;
  mobileImageAlt?: string;
}

const projects: Project[] = [
  {
    title: "Lemur Cloud Portal",
    role: "Software Engineer — Ringtail Interactive / Brink",
    description:
      "A scalable cloud-hosted SaaS portal built with .NET and Blazor, providing provisioning, customer journey workflows, and secure secrets management. Includes a Deployment module that lets games developers connect their codebases for automated build, deploy, and redeploy across relay and automatic environments, with promotion to manual environments unlocking wider configuration scope.",
    url: "https://www.br.ink/lemur",
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API", "Deployment", "CI/CD"],
    image: lemurScreenshot,
    imageAlt: "Lemur Cloud Portal screenshot",
  },
  {
    title: "EveryFarmer — Service Provider Platform",
    role: "Front-End Engineer — Service Provider Module",
    description:
      "Led front-end work on the agribusiness side of EveryFarmer's value chain enabling providers to manage products and services (inputs, implements, extension, storage, transport, logistics, and processing) offered to farmers. Built an interactive geospatial mapping tool with Google Maps that automated farm mapping assessment conducted by agents across 100,000+ service providers.",
    url: "https://everyfarmer.farm/",
    tags: [
      "Service Provider Module",
      "Geospatial Mapping",
      "Product & Service Management",
      "JavaScript",
      "React",
      "Redux",
      "Google Maps API",
      "CI/CD",
    ],
    image: everyFarmerScreenshot,
    imageAlt: "EveryFarmer Service Provider Platform screenshot",
    rawImage: true,
  },
  {
    title: "Equal Measures 2030",
    role: "Full Stack Developer — Studio 14",
    description:
      "A data-driven advocacy platform visualising gender equality metrics across the Sustainable Development Goals for global policymakers and campaigners.",
    url: "https://equalmeasures2030.org/",
    tags: ["JavaScript", "Web Components", "WordPress", "Accessibility"],
    image: equalMeasuresScreenshot,
    imageAlt: "Equal Measures 2030 screenshot",
  },
];

const ProjectVisual = ({ project }: { project: Project }) => {
  if (project.rawImage) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt}
        className="w-full h-auto rounded-lg shadow-md"
        loading="lazy"
      />
    );
  }
  return (
    <div className="flex items-end justify-center gap-4 w-full">
      <div className="flex-1">
        <LaptopMockup imageSrc={project.image} alt={project.imageAlt} />
      </div>
      {project.mobileImage && (
        <div className="hidden sm:block -ml-8 -mb-2">
          <PhoneMockup
            imageSrc={project.mobileImage}
            alt={project.mobileImageAlt ?? project.imageAlt}
          />
        </div>
      )}
    </div>
  );
};

const FeaturedProjectCard = ({ project, reverse }: { project: Project; reverse: boolean }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Visual Side */}
        <div
          className={`p-8 bg-gradient-to-br from-[#1a1a2e]/5 to-[#16213e]/5 flex items-center justify-center ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <ProjectVisual project={project} />
        </div>

        {/* Content Side */}
        <div className={`p-8 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-primary">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Live Site</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-1" />
          </div>

          <h3 className="text-xl font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-primary font-medium mb-4">{project.role}</p>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-secondary/60 text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">Selected work</h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
