const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "TechCorp",
    period: "2023 – Present",
    bullets: [
      "Led migration of legacy jQuery app to React, improving load times by 40%",
      "Built design system used across 3 product teams (12 engineers)",
      "Implemented CI/CD pipeline reducing deploy time from 45min to 8min",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 – 2023",
    bullets: [
      "Shipped core product features serving 50K+ monthly active users",
      "Designed and built RESTful API layer with Node.js and PostgreSQL",
      "Reduced API response times by 60% through query optimization",
    ],
  },
  {
    role: "Junior Developer",
    company: "AgencyOne",
    period: "2019 – 2021",
    bullets: [
      "Developed responsive web applications for 15+ client projects",
      "Introduced automated testing, achieving 80% code coverage",
      "Mentored 2 interns through onboarding and pair programming",
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
