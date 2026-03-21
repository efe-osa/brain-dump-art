import ProjectCard from "./ProjectCard";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const projects = [
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with customizable widgets, role-based access, and automated reporting.",
    image: project1,
    tags: ["React", "TypeScript", "D3.js", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with Stripe integration, inventory management, and order tracking system.",
    image: project2,
    tags: ["Next.js", "Stripe", "Prisma", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "AI Task Manager",
    description: "Intelligent task management tool with NLP-powered prioritization and smart scheduling.",
    image: project3,
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">
          Selected work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
