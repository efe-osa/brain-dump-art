const experiences = [
  {
    role: "Senior JavaScript Engineer (RoW Team)",
    company: "LeoVegas Group | MGM Resorts International",
    period: "Nov 2025 – Feb 2026",
    bullets: [
      "Developed a geolocation consent monitoring system with the Data Analytics team, using Google Tag Manager and Imperva, enabling user behaviour tracking across various North American markets",
      "Leveraged AI solutions like GitHub Copilot, feature flagging and synthetic user data to lift test coverage to 80% (Jest, RTL), ensuring reliability and GDPR compliance",
    ],
    tools: ["Next.js", "TypeScript", "GraphQL", "Relay", "Jest", "RTL", "Turbo", "Grafana", "LaunchDarkly", "GTM"],
  },
  {
    role: "Software Engineer (Lemur Team)",
    company: "Ringtail Interactive (Now Brink Gaming), Stockholm",
    period: "Jan 2023 – Jan 2025",
    bullets: [
      "Built a responsive Blazor Component Library adopted across 90% of the interface, accelerating development velocity and enforcing WCAG and UI consistency at scale",
      "Delivered and optimised cloud-hosted .NET/C# services for scalable SaaS provisioning, with secure secrets management via Azure Key Vault for production-grade security",
      "Led Salesforce API integration for customer journey workflows, establishing a data pipeline between engineering and business teams to improve manual handoffs",
      "Implemented Flux architecture to improve state predictability and reduce client-side logic complexity across the flagship cloud portal",
      "Executed a Playwright + xUnit proof-of-concept to assess integration ease, tooling, and test coverage requirements",
    ],
    tools: ["C#", ".NET", "Blazor", "Fluxor", "Bootstrap", "SQL", "SCSS", "xUnit", "RTL", "Azure", "Docker"],
  },
  {
    role: "Senior Front-End Engineer (Provider Relations Team)",
    company: "Reliance HMO, Abuja",
    period: "Oct 2021 – Jun 2022",
    bullets: [
      "Migrated a legacy platform serving 250,000+ users and 4,000+ businesses to a component-based JavaScript architecture, improving performance and scalability in a high-traffic production environment",
      "Built an intuitive WYSIWYG contract review and signing tool using CKEditor, achieving a 25% improvement in data accuracy",
      "Debugged and resolved erroneous progression in the providers' acquisition tracker, preventing bad data from advancing through the workflow and unblocking affected users",
      "Collaborated with a cross-functional scrum team to implement a responsive, accessible audit workflow",
    ],
    tools: ["JavaScript", "React", "React Native", "PHP/Laravel", "Bootstrap", "REST API", "RTL", "CKEditor"],
  },
  {
    role: "Full Stack Developer",
    company: "Studio 14, Birmingham",
    period: "Dec 2019 – Aug 2022",
    bullets: [
      "Drove web performance scores from 52% to 98% and supervised W3C accessibility compliance using Axe DevTools while hardening security (XSS/CSRF prevention)",
      "Led adoption of the Web Components API for a community forum with WordPress CMS integration, reducing development time by 25% and enabling UI reusability",
      "Partnered with product owners and PMs to scope tickets and optimise Kanban workflows, accelerating delivery timelines by 28%",
      "Developed a scalable e-commerce PWA and an admin dashboard for managing engagement and commercial activities across 100+ businesses",
    ],
    tools: ["JavaScript", "TypeScript", "React", "Redux", "Next.js", "Web Components", "GraphQL", "Tailwind CSS", "Storybook", "WordPress", "RTL", "AWS", "Docker"],
  },
  {
    role: "Front-End Engineer (Service Provider Module)",
    company: "EveryFarmer, Abuja",
    period: "Mar 2019 – Jul 2020",
    bullets: [
      "Owned front-end delivery on the Service Provider module, powering agribusinesses that supply inputs, implements, extension, storage, transport, logistics, and produce processing across the EveryFarmer value chain",
      "Built product and service management flows plus an interactive geospatial farm mapping tool (Google Maps API) that automated farm mapping assessment for 100,000+ service providers, reducing operating expenses by $10,000",
      "Introduced static analysis testing and CI/CD pipelines with GitHub Actions, accelerating development pace by 50%",
      "Improved reliability and maintainability by introducing Redux Saga for state management and authoring comprehensive unit and integration tests (Jest, RTL) for 80% coverage",
    ],
    tools: ["JavaScript", "React", "Redux", "Redux-Saga", "Bootstrap", "RTL", "Jest", "Google Maps"],
  },
  {
    role: "JavaScript Intern",
    company: "Hotels.ng (HNG Internship)",
    period: "Mar 2018 – Jun 2018",
    bullets: [
      "Created a chatbot service built on PHP with an HTML/CSS/JavaScript interface for conversational interactions, including hint commands like \"help\" to surface registered questions",
    ],
    tools: ["PHP", "HTML5", "CSS3", "JavaScript"],
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
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden md:block" />

          {experiences.map((exp, i) => (
            <div key={i} className="relative md:pl-10 pb-12 last:pb-0">
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background hidden md:block" />

              <div className="p-6 rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">{exp.role}</h3>
                    <p className="text-primary font-medium text-sm">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 sm:mt-0">{exp.period}</p>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                  {exp.tools.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary/60 text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
