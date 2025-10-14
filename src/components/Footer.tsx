import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © {currentYear} Your Name. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using React & TypeScript
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
