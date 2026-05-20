import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
};

export default Index;
