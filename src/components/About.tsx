const skills = [
  "JavaScript (ES6+)", "TypeScript", "React", "Next.js",
  "C#", ".NET / Blazor", "Node.js", "GraphQL",
  "PostgreSQL", "SQL", "Python", "Redux / Fluxor",
  "Web Components", "Tailwind CSS", "Docker", "AWS / Azure",
  "Git / GitHub Actions", "Cypress", "Jest", "Storybook",
  "Sentry / Grafana", "WCAG Accessibility",
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
                With nearly a decade of experience owning features from architecture through to delivery 
                across health, agriculture, gaming, and consulting sectors, I specialise in React, TypeScript, 
                and full-stack JavaScript/C# with a strong emphasis on frontend engineering.
              </p>
              <p>
                I'm passionate about high-quality user experiences, performance optimisation, web security, 
                and WCAG accessibility. I actively adopt agile methodologies and thrive in collaborative 
                environments, driving projects that significantly enhance performance metrics and user engagement.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-primary mb-4 tracking-widest uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm rounded-full bg-secondary text-secondary-foreground font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
