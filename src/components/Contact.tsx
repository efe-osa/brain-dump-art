import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Let's connect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently open to new opportunities. Drop me a note and I'll get back to you.
            </p>
          </div>

          <a
            href="mailto:eosawaruoyelade@gmail.com"
            className="inline-block mb-10"
          >
            <Button className="rounded-full px-8">
              <Mail className="h-4 w-4" />
              Send Message
            </Button>
          </a>

          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/efe-osa", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/efe-osa-osawaru-oyelade", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
