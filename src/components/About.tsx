const skillGroups = [
  {
    label: "Programming Languages",
    items: ["JavaScript", "TypeScript", "C#", "SQL", "Python", "Semantic HTML5/CSS3"],
  },
  {
    label: "Web Technologies",
    items: ["React", "Next.js", "Redux", "React Query", "Web Components", "Blazor"],
  },
  {
    label: "Tools & Platforms",
    items: [
      "Node.js", "GraphQL", ".NET", "PostgreSQL", "Jest", "xUnit",
      "Git", "GitHub Actions", "GitHub Copilot", "Cypress", "Turbo",
      "AWS", "Azure", "Docker", "Sentry", "Grafana", "Fluxor",
    ],
  },
  {
    label: "Core Competencies",
    items: [
      "Technical Ownership & Communication",
      "Agile Development",
      "Accessibility & Performance Optimisation",
      "Internationalisation",
      "DevOps & Testing",
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Product-minded engineer who ships with purpose
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Software Engineer with 7+ years of front-end and full-stack experience across gaming,
                healthcare and agriculture — designing and delivering secure web applications,
                cloud-hosted services, and modernising legacy platforms serving 250,000+ users.
              </p>
              <p>
                I bring deep expertise in JavaScript, TypeScript, React, Next.js, Node.js, and .NET
                to building responsive, reusable, and WCAG-compliant component systems, optimising web
                performance across multi-platform environments, and improving developer experience.
              </p>
              <p>
                An agile collaborator skilled at translating complex requirements into reliable,
                performant, user-focused solutions that balance technical quality, accessibility,
                and real business impact.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-medium text-primary tracking-widest uppercase">Tech Stack</p>
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-foreground/80 mb-2 uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
