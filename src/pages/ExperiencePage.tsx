import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const ExperiencePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 scroll-mt-24">
        <Experience />
      </main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
};

export default ExperiencePage;
