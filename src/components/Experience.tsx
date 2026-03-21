const experiences = [
  {
    role: "Senior JavaScript Engineer",
    company: "LeoVegas Group | MGM",
    period: "Nov 2025 – Feb 2026",
    bullets: [
      "Aided the Data Analytics team with monitoring customer behaviour around geolocation permissions, integrating external APIs and third-party services",
      "Optimised and tested the service with 80% coverage for retrieving and verifying customers' location and permission activities",
    ],
  },
  {
    role: "Software Engineer (Lemur)",
    company: "Ringtail Interactive (Now Brink Labs), Stockholm",
    period: "Jan 2023 – Jan 2025",
    bullets: [
      "Developed a proprietary responsive Razor Component Library (Blazor + Bootstrap), used for 90% of Cloud SaaS Portal UIs, improving consistency and WCAG accessibility",
      "Implemented Flux architecture with Fluxor; integrated Azure Key Vault, Storage, and B2C for secure identity and CI/CD via Azure DevOps",
      "Spearheaded an agile epic for Salesforce integration, reducing bottlenecks and improving cross-functional communication",
      "Created containerised executable versions of Lemur services and converted them to cloud services",
    ],
  },
  {
    role: "JavaScript Engineer Consultant",
    company: "Tretton 37 AB",
    period: "Aug 2022 – Nov 2022",
    bullets: [
      "Served as a JavaScript Engineer consultant, engaging in continuous learning and professional development in JavaScript/TypeScript technologies",
    ],
  },
  {
    role: "Senior Front-End Engineer",
    company: "Reliance HMO, Abuja",
    period: "Oct 2021 – Jun 2022",
    bullets: [
      "Led frontend engineering efforts in the health sector, building high-quality user experiences with React and TypeScript",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Studio 14, Birmingham",
    period: "Dec 2019 – Aug 2022",
    bullets: [
      "Mentored developers in web components on mobile-first websites with WordPress CMS integration",
      "Introduced W3C accessibility standards and performance optimisations, improving one project's Lighthouse score from 52% to 98%",
      "Built a scalable e-commerce PWA with offline functionalities and an IT admin dashboard managing 100+ businesses",
      "Partnered with product owner and PM to define ticket scopes, facilitating prompt delivery improvement by 28%",
    ],
  },
  {
    role: "Front-End Engineer",
    company: "EveryFarmer, Abuja",
    period: "Mar 2019 – Jul 2020",
    bullets: [
      "Migrated legacy code serving 250,000+ users to a component-based architecture, achieving 25% improvement in data accuracy",
      "Debugged and resolved erroneous progression in the acquisition tracker, unblocking affected users",
      "Bridged the gap between technical and non-technical stakeholders by communicating complex solutions clearly",
    ],
  },
  {
    role: "JavaScript Intern",
    company: "Hotels.ng (HNG Internship)",
    period: "Mar 2018 – Jun 2018",
    bullets: [
      "Created a chatbot service built on PHP with an HTML/CSS/JavaScript interface for conversational interactions",
    ],
  },
];
const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Experience</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">
          Where I've worked
        </h2>

        <div className="space-y-0 relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden md:block" />

          {experiences.map((exp, i) => (
            <div key={i} className="relative md:pl-10 pb-12 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background hidden md:block" />

              <div className="p-6 rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">{exp.role}</h3>
                    <p className="text-primary font-medium text-sm">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 sm:mt-0">{exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
