import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeAsset from "@/assets/resume.pdf.asset.json";

const experiences = [
  {
    role: "Senior JavaScript Engineer",
    company: "LeoVegas Group | MGM Resorts International",
    location: "Stockholm",
    period: "Nov 2025 – Feb 2026",
    bullets: [
      "Designed a cross-browser geolocation permission measurement system with Data Analytics, capturing permission status to support regulatory compliance for Canadian markets.",
      "Accelerated testing with GitHub Copilot and Backoffice-generated data, increasing geolocation system test coverage to 80% using Jest and React Testing Library.",
    ],
    tools: ["Next.js", "TypeScript", "GraphQL", "Jest", "RTL", "Turbo", "Grafana", "LaunchDarkly", "Google Tag Manager"],
  },
  {
    role: "Software Engineer",
    company: "Ringtail Interactive (now Brink Gaming)",
    location: "Stockholm",
    period: "Jan 2023 – Jan 2025",
    bullets: [
      "Designed and shipped the Cloud Portal deployment management module, enabling multiplayer game developers to automate and manually launch code releases.",
      "Architected a WCAG-aligned, responsive UI component library with Blazor and Bootstrap, adopted across 90% of the customer portal to standardize UI consistency and accelerate frontend delivery.",
      "Implemented predictable state management with Fluxor; integrated Azure Key Vault, Storage and AD B2C to secure enterprise secrets, cloud assets and identity federation.",
      "Led the Salesforce integration epic with customer journey teams, providing a knowledge base for game developers and improving customer support communication.",
    ],
    tools: ["C#", "ASP.NET Core", "Blazor", "Fluxor", "Bootstrap", "Postgres", "EF Core", "SQL", "SCSS", "xUnit", "Azure", "Docker"],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Reliance Health",
    location: "Abuja",
    period: "Oct 2021 – Jun 2022",
    bullets: [
      "Owned the migration of a legacy platform to a component-based JavaScript architecture, scaling performance for 250,000+ active users and 4,000+ businesses.",
      "Built a CKEditor-based contract review and signing tool, increasing user data accuracy by 25% during provider acquisition.",
      "Redesigned the audit system and provider acquisition tracker with a cross-functional team, contributing to product maturity ahead of a successful $40 million Series B funding round.",
      "Translated stakeholder feedback into product improvements, ensuring 100% alignment with design specifications and improving user adoption.",
    ],
    tools: ["JavaScript", "React", "React Native", "PHP/Laravel", "Bootstrap", "REST API", "CKEditor"],
  },
  {
    role: "Full Stack Developer",
    company: "Studio 14",
    location: "Birmingham",
    period: "Dec 2019 – Aug 2022",
    bullets: [
      "Developed an e-commerce PWA and dashboard for 100+ businesses; optimized Core Web Vitals and network payloads, improving performance scores from 52% to 98%.",
      "Architected a mobile-first frontend using Web Components and a headless CMS, adopted DevOps practices and mentored the team in the new architecture.",
      "Accelerated Kanban delivery by 28% through technical ticket scoping, clear timelines and workflow improvements.",
      "Integrated automated WCAG accessibility and HTML validation into CI/CD, and hardened application security against XSS and CSRF.",
    ],
    tools: ["JavaScript", "TypeScript", "Web Components", "React", "Redux", "Next.js", "GraphQL", "SWR", "Styled Components", "Tailwind CSS", "Storybook", "SCSS", "WordPress CMS", "Brotli", "AWS"],
  },
  {
    role: "Frontend Engineer",
    company: "EveryFarmer",
    location: "Abuja",
    period: "Mar 2019 – Jul 2020",
    bullets: [
      "Built a Google Maps geospatial mapping tool with the product design team and CTO, automating farm mapping assessments for 100,000+ service providers and reducing operating expenses by $10,000.",
      "Introduced static analysis and GitHub Actions CI/CD pipelines, improving developer experience through automated quality checks and delivery.",
      "Strengthened reliability with Redux Saga and comprehensive Jest and React Testing Library tests, achieving 80% test coverage.",
    ],
    tools: ["JavaScript", "React", "Redux", "Redux Saga", "Bootstrap", "RTL", "Jest", "Java REST API", "Google Maps", "Cypress"],
  },
];

const education = [
  { institution: "Stockholm University", degree: "M.Sc. Strategic Information Systems Management", period: "2023–2026" },
  { institution: "University of Lagos", degree: "B.Sc. Business Administration & Management", period: "2012–2015" },
];

const highlightMetrics = (text: string) =>
  text.split(/(\$[\d,]+(?: million)?|[\d,]+\+|\d+%)/g).map((part, index) =>
    /^(\$[\d,]+(?: million)?|[\d,]+\+|\d+%)$/.test(part)
      ? <strong key={index} className="font-semibold text-primary-strong">{part}</strong>
      : part,
  );

const Experience = () => (
  <section id="experience" aria-labelledby="experience-heading" className="bg-background pb-16 pt-8 md:pb-24 md:pt-12">
    <div className="container mx-auto max-w-5xl px-6">
      <header className="mb-10 md:mb-14">
        <p className="mb-2 text-sm font-medium uppercase text-primary-strong">Experience</p>
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <h1 id="experience-heading" className="text-3xl font-bold tracking-normal text-foreground md:text-4xl">Where I've worked</h1>
          <Button asChild size="lg" variant="outline" className="h-auto min-h-11 shrink-0 whitespace-normal px-4">
            <a href={resumeAsset.url} download="Efe-Jessye-Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Download aria-hidden="true" /> Download résumé (PDF)
              <span className="sr-only"> — opens in a new tab if not downloaded</span>
            </a>
          </Button>
        </div>
        <p className="font-read mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          7+ years delivering consumer and SaaS products across frontend and full-stack roles. Based in Stockholm, with experience in Sweden, the UK and Nigeria.
        </p>
      </header>

      <ol className="relative space-y-10 md:space-y-12">
        {experiences.map((exp, index) => (
          <li key={exp.company} className="relative border-b border-border pb-10 last:border-b-0 last:pb-0 md:pl-8">
            <span aria-hidden="true" className="absolute bottom-0 left-1 top-0 hidden w-px bg-border md:block" />
            <span aria-hidden="true" className="absolute left-0 top-2 hidden h-2.5 w-2.5 rounded-full bg-primary-strong md:block" />
            <article aria-labelledby={`role-${index}`}>
              <header className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
                <div className="min-w-0">
                  <h2 id={`role-${index}`} className="text-xl font-semibold tracking-normal text-foreground">{exp.role}</h2>
                  <p className="mt-1 text-sm font-medium text-primary-strong">{exp.company}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.location}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground sm:pt-1">{exp.period}</p>
              </header>
              <ul className="list-disc space-y-3 pl-5 marker:text-primary-strong">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="font-read pl-1 text-lg leading-relaxed text-muted-foreground">{highlightMetrics(bullet)}</li>
                ))}
              </ul>
              <ul aria-label={`${exp.company} technologies`} className="mt-5 flex flex-wrap gap-2">
                {exp.tools.map((tool) => <li key={tool} className="skill-pill skill-pill--tool">{tool}</li>)}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <section aria-labelledby="earlier-experience-heading" className="mt-12 border-t border-border pt-8">
        <h2 id="earlier-experience-heading" className="mb-3 text-xl font-semibold tracking-normal">Earlier experience</h2>
        <p className="text-sm text-primary-strong">JavaScript Intern · Hotels.ng (HNG Internship) · Mar 2018 – Jun 2018</p>
        <p className="font-read mt-2 text-lg leading-relaxed text-muted-foreground">Built a PHP chatbot with an HTML, CSS and JavaScript interface for conversational interactions.</p>
      </section>

      <section aria-labelledby="education-heading" className="mt-12 border-t border-border pt-8">
        <h2 id="education-heading" className="mb-6 text-2xl font-semibold tracking-normal">Education</h2>
        <ul className="space-y-6">
          {education.map((item) => (
            <li key={item.institution} className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
              <div>
                <h3 className="text-base font-semibold tracking-normal">{item.degree}</h3>
                <p className="font-read mt-1 text-lg text-muted-foreground">{item.institution}</p>
              </div>
              <p className="shrink-0 text-sm text-muted-foreground">{item.period}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="certifications-heading" className="mt-10 border-t border-border pt-8">
        <h2 id="certifications-heading" className="mb-5 text-xl font-semibold tracking-normal">Certifications</h2>
        <ul className="font-read space-y-3 text-lg leading-relaxed text-muted-foreground">
          <li>Microsoft GitHub Copilot <span className="text-sm">· September 2025</span></li>
          <li>Treford Fundamentals Training in Product Management <span className="text-sm">· August 2021</span></li>
          <li>Google Mobile Web Specialist <span className="text-sm">· April 2018</span></li>
        </ul>
      </section>
    </div>
  </section>
);

export default Experience;
