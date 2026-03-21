const skills = [
  "React", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "AWS", "Docker", "GraphQL",
  "Next.js", "Tailwind CSS", "Git", "REST APIs",
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              A developer who cares about craft
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With 5+ years of experience building web applications, I specialize in creating 
                performant, accessible, and well-architected solutions. I'm passionate about 
                clean code, developer experience, and shipping products that users love.
              </p>
              <p>
                I've worked across early-stage startups and established teams, 
                wearing many hats from frontend architecture to DevOps. I thrive in 
                collaborative environments where I can both learn and mentor.
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
