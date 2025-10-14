import ProjectCard from "./ProjectCard";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Analytics Dashboard",
      description: "A comprehensive analytics platform with real-time data visualization and reporting capabilities.",
      image: project1,
      tags: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern shopping experience with seamless checkout and inventory management system.",
      image: project2,
      tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "AI Task Manager",
      description: "Intelligent task management tool with AI-powered prioritization and automation features.",
      image: project3,
      tags: ["React", "OpenAI", "Node.js", "MongoDB"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing various technologies and problem-solving approaches.
          </p>
        </div>

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
