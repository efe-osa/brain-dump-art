import { ArrowUpRight, Globe } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Project {
  title: string;
  role: string;
  description: string;
  url: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Ringtail Interactive - Lemur Cloud Portal",
    role: "Software Engineer",
    description:
      "A scalable cloud-hosted SaaS portal built with .NET and Blazor, providing SDK provisioning, customer journey workflows, and secure secrets management. Includes a Deployment module designed to enable game developers to manage deployment operations (automate builds, deploys, and redeploys) across different environments, with promotion to manual environments unlocking wider configuration scope.",
    url: "https://www.br.ink/lemur",
    tags: ["C#", ".NET", "Blazor", "Fluxor", "Azure", "Salesforce API"],
  },
  {
    title: "Everyfarmer - Service Provider",
    role: "Front-End Engineer",
    description:
      "Led front-end work on the agribusiness side of EveryFarmer's value chain enabling providers to manage products and services (inputs, implements, extension, storage, transport, logistics, and processing) offered to farmers. Built an interactive geospatial mapping tool with Google Maps that automated farm mapping assessment conducted by agents across 100,000+ service providers.",
    url: "https://everyfarmer.farm/",
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
    tags: ["JavaScript", "Web Components", "WordPress", "Accessibility", "CI/CD"],
  },
  {
    title: "Read it",
    role: "Full Stack Developer",
    description: "A Reddit blog",
    url: "https://fervent-bhabha-e5febb.netlify.app//",
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
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-primary">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Live Site</span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-1" />
      </div>

      <h3 className="text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      <p className="text-xs text-primary font-medium mb-3">{project.role}</p>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-border">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-secondary/60 text-secondary-foreground">
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
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">Selected work</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <ProjectCard project={project} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 bg-card text-card-foreground border-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-[var(--shadow-medium)] z-10 -translate-x-1/2 md:-translate-x-0" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 bg-card text-card-foreground border-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-[var(--shadow-medium)] z-10 translate-x-1/2 md:translate-x-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
