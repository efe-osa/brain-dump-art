import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import PortfolioFinder from "@/components/PortfolioFinder";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="scroll-mt-24">
        <Hero />
        {/* <PortfolioFinder /> */}
        <Projects />
        <Experience />
        <About />
        <Blog />
      </main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
};

export default Index;
