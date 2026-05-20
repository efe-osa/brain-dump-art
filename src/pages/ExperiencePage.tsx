import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const ExperiencePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Experience />
      </main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
};

export default ExperiencePage;
