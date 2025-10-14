import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <a 
              href="mailto:contact@example.com"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-[var(--shadow-card)]"
            >
              <Mail className="h-5 w-5" />
              Send me an email
            </a>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-secondary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-foreground" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-secondary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-foreground" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-secondary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
