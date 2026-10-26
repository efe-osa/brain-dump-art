import { Check } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 7, suffix: "+", label: "Years shipping production software" },
  { value: 250, suffix: "K+", label: "Users on platforms I've modernised" },
  { value: 90, suffix: "%", label: "UI coverage with reusable components" },
  { value: 80, suffix: "%", label: "Test coverage on recent projects" },
];

type Tone = "skill-pill--lang" | "skill-pill--web" | "skill-pill--tool";

type SkillGroup = {
  label: string;
  tone: Tone;
  clusters: { label?: string; items: string[] }[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Programming Languages",
    tone: "skill-pill--lang",
    clusters: [
      { items: ["JavaScript", "TypeScript", "C#", "SQL", "Python", "Semantic HTML5/CSS3"] },
    ],
  },
  {
    label: "Web Technologies",
    tone: "skill-pill--web",
    clusters: [{ items: ["React", "Next.js", "Redux", "React Query", "Web Components", "Blazor"] }],
  },
  {
    label: "Tools & Platforms",
    tone: "skill-pill--tool",
    clusters: [
      { label: "Runtime & Build", items: ["Node.js", ".NET", "Fluxor", "Turbo", "Git", "GitHub Copilot"] },
      { label: "Data & APIs", items: ["GraphQL", "PostgreSQL"] },
      { label: "Testing & Quality", items: ["Jest", "React Testing Library (RTL)", "xUnit", "Cypress"] },
      { label: "Cloud & Observability", items: ["AWS", "Azure", "Docker", "GitHub Actions", "Sentry", "Grafana"] },
    ],
  },
];

const competencies = [
  "Technical ownership & communication",
  "Agile development",
  "Accessibility & performance optimisation",
  "Internationalisation",
  "DevOps & testing",
  "CI/CD",
];

const StatCard = ({ value, suffix, label }: Stat) => {
  const { ref, display } = useCountUp(value);

  return (
    <div className="flex h-full flex-col p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-soft)] text-center md:text-left">
      <p
        ref={ref}
        className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight"
      >
        <span aria-hidden="true">
          {display}
          {suffix}
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 items-stretch">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-medium text-primary-strong mb-2 tracking-widest uppercase">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Product-minded engineer who ships with purpose
            </h2>
            <div className="space-y-4 font-read text-[17px] text-muted-foreground leading-relaxed">
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
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-primary-strong mb-4 tracking-widest uppercase">
                How I work
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {competencies.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary-strong" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-7">
            <p className="text-sm font-medium text-primary-strong tracking-widest uppercase">Tech Stack</p>
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-foreground/80 mb-3 uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="space-y-4">
                  {group.clusters.map((cluster) => (
                    <div key={cluster.label ?? group.label}>
                      {cluster.label && (
                        <p className="text-[11px] text-muted-foreground mb-2">{cluster.label}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {cluster.items.map((skill) => (
                          <span key={skill} className={`skill-pill ${group.tone}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
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
