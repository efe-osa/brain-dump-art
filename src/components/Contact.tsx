import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Let's connect
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I'm currently open to new opportunities. Whether you have a role in mind or just want to chat, 
            I'd love to hear from you.
          </p>

          <a
            href="mailto:eosawaruoyelade@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity mb-10"
          >
            <Mail className="h-4 w-4" />
            Say Hello
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
