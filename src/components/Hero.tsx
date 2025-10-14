import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Name</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              Full Stack Developer & Creative Problem Solver
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              I build exceptional digital experiences that combine beautiful design with robust functionality.
              Passionate about creating solutions that make a difference.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2"
            >
              View My Work <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:contact@example.com" className="text-white hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
