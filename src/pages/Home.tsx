import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { StatsSection } from "@/sections/StatsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { FoundersSection } from "@/sections/FoundersSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-dark-bg">
      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <ProjectsSection />
        <FoundersSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
